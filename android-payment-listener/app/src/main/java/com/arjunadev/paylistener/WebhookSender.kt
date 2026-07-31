package com.arjunadev.paylistener

import android.content.Context
import android.os.Handler
import android.os.Looper
import android.util.Log
import com.google.gson.JsonObject
import okhttp3.*
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.RequestBody.Companion.toRequestBody
import java.io.IOException
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale
import java.util.regex.Pattern

class WebhookSender(private val context: Context) {
    private val client = OkHttpClient.Builder()
        .connectTimeout(15, java.util.concurrent.TimeUnit.SECONDS)
        .readTimeout(15, java.util.concurrent.TimeUnit.SECONDS)
        .build()

    private val prefsManager = PreferencesManager(context)

    interface WebhookCallback {
        fun onSuccess(responseBody: String)
        fun onError(errorMessage: String)
    }

    fun sendNotification(
        packageName: String,
        title: String,
        text: String,
        callback: WebhookCallback? = null
    ) {
        val webhookUrl = prefsManager.webhookUrl
        val secretKey = prefsManager.secretKey

        val extractedAmount = parseAmountFromText("$title $text")

        val jsonPayload = JsonObject().apply {
            addProperty("secret_key", secretKey)
            addProperty("package_name", packageName)
            addProperty("title", title)
            addProperty("text", text)
            addProperty("amount", extractedAmount)
            addProperty("timestamp", System.currentTimeMillis())
        }

        val requestBody = jsonPayload.toString().toRequestBody("application/json; charset=utf-8".toMediaType())

        val request = Request.Builder()
            .url(webhookUrl)
            .post(requestBody)
            .addHeader("User-Agent", "ArjunaPayListener/1.0.0 (Android)")
            .addHeader("Content-Type", "application/json")
            .build()

        val timeStr = SimpleDateFormat("HH:mm:ss", Locale.getDefault()).format(Date())

        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                val errorMsg = "[$timeStr] ❌ FAIL ($packageName): ${e.localizedMessage}"
                Log.e("WebhookSender", errorMsg, e)
                prefsManager.appendLog(errorMsg)
                
                Handler(Looper.getMainLooper()).post {
                    callback?.onError(e.localizedMessage ?: "Network error")
                }
            }

            override fun onResponse(call: Call, response: Response) {
                val responseStr = response.body?.string() ?: ""
                val statusMsg: String
                if (response.isSuccessful) {
                    statusMsg = "[$timeStr] ✅ SUCCESS (${response.code}) [$packageName]: Rp $extractedAmount"
                } else {
                    statusMsg = "[$timeStr] ⚠️ HTTP ${response.code} [$packageName]: $responseStr"
                }
                Log.d("WebhookSender", statusMsg)
                prefsManager.appendLog(statusMsg)

                Handler(Looper.getMainLooper()).post {
                    if (response.isSuccessful) {
                        callback?.onSuccess(responseStr)
                    } else {
                        callback?.onError("HTTP ${response.code}: $responseStr")
                    }
                }
            }
        })
    }

    private fun parseAmountFromText(fullText: String): Long {
        try {
            val pattern = Pattern.compile("(?:Rp|RP|Rp\\.|\\$)?\\s*([0-9]{1,3}(?:\\.[0-9]{3})+|[0-9]{4,7})", Pattern.CASE_INSENSITIVE)
            val matcher = pattern.matcher(fullText)
            if (matcher.find()) {
                val match = matcher.group(1) ?: return 0
                val cleanNum = match.replace(".", "")
                val parsed = cleanNum.toLongOrNull() ?: 0L
                if (parsed >= 1000) return parsed
            }
        } catch (e: Exception) {
            Log.e("WebhookSender", "Amount parse exception", e)
        }
        return 0L
    }
}
