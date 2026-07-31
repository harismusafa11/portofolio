package com.arjunadev.paylistener

import android.content.Context
import android.content.SharedPreferences

class PreferencesManager(context: Context) {
    private val prefs: SharedPreferences =
        context.getSharedPreferences("ArjunaPayListenerPrefs", Context.MODE_PRIVATE)

    companion object {
        private const val KEY_WEBHOOK_URL = "key_webhook_url"
        private const val KEY_SECRET_KEY = "key_secret_key"
        private const val KEY_LOGS = "key_notification_logs"

        const val DEFAULT_WEBHOOK_URL = "https://arjunadev.com/api/payment/listener"
        const val DEFAULT_SECRET_KEY = "harispayment"
    }

    var webhookUrl: String
        get() = prefs.getString(KEY_WEBHOOK_URL, DEFAULT_WEBHOOK_URL) ?: DEFAULT_WEBHOOK_URL
        set(value) = prefs.edit().putString(KEY_WEBHOOK_URL, value.trim()).apply()

    var secretKey: String
        get() = prefs.getString(KEY_SECRET_KEY, DEFAULT_SECRET_KEY) ?: DEFAULT_SECRET_KEY
        set(value) = prefs.edit().putString(KEY_SECRET_KEY, value.trim()).apply()

    fun appendLog(logEntry: String) {
        val currentLogs = prefs.getString(KEY_LOGS, "") ?: ""
        val updatedLogs = "$logEntry\n$currentLogs"
        // Keep max 50 lines of logs
        val lines = updatedLogs.split("\n").take(50).joinToString("\n")
        prefs.edit().putString(KEY_LOGS, lines).apply()
    }

    fun getLogs(): String {
        return prefs.getString(KEY_LOGS, "[System] Menunggu notifikasi masuk...") ?: ""
    }

    fun clearLogs() {
        prefs.edit().remove(KEY_LOGS).apply()
    }
}
