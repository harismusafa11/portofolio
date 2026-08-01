package com.arjunadev.adminpanel

import android.app.*
import android.content.Context
import android.content.Intent
import android.media.RingtoneManager
import android.os.Build
import android.os.IBinder
import android.os.PowerManager
import androidx.core.app.NotificationCompat
import com.google.gson.JsonObject
import com.google.gson.JsonParser
import okhttp3.OkHttpClient
import okhttp3.Request
import java.util.concurrent.Executors
import java.util.concurrent.ScheduledExecutorService
import java.util.concurrent.TimeUnit

class AdminNotificationService : Service() {

    private val CHANNEL_ID = "arjuna_admin_notifications"
    private val FOREGROUND_CHANNEL_ID = "arjuna_admin_foreground_channel"
    private val FOREGROUND_NOTIF_ID = 1001

    private val client = OkHttpClient.Builder()
        .connectTimeout(10, TimeUnit.SECONDS)
        .readTimeout(10, TimeUnit.SECONDS)
        .build()

    private var scheduler: ScheduledExecutorService? = null
    private lateinit var prefs: PreferencesManager
    private var wakeLock: PowerManager.WakeLock? = null

    override fun onCreate() {
        super.onCreate()
        prefs = PreferencesManager(this)
        createNotificationChannels()
        startForeground(FOREGROUND_NOTIF_ID, createForegroundNotification())
        acquireWakeLock()
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        if (scheduler == null || scheduler!!.isShutdown) {
            scheduler = Executors.newSingleThreadScheduledExecutor()
            scheduler?.scheduleWithFixedDelay({
                checkAdminUpdates()
            }, 0, 15, TimeUnit.SECONDS)
        }
        return START_STICKY
    }

    private fun acquireWakeLock() {
        try {
            val pm = getSystemService(Context.POWER_SERVICE) as PowerManager
            wakeLock = pm.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "ArjunaAdmin::NotificationLock")
            wakeLock?.acquire(10 * 60 * 1000L) // 10 minutes timeout
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    private fun checkAdminUpdates() {
        try {
            val baseUrl = prefs.baseUrl.trimEnd('/')
            val requestUrl = "$baseUrl/api/admin/notifications/check"

            val request = Request.Builder()
                .url(requestUrl)
                .addHeader("User-Agent", "ArjunaAdminAPK/1.0")
                .build()

            client.newCall(request).execute().use { response ->
                if (response.isSuccessful) {
                    val body = response.body?.string() ?: return
                    val json = JsonParser.parseString(body).asJsonObject

                    if (json.has("latestOrder") && !json.get("latestOrder").isJsonNull) {
                        val latestOrder = json.getAsJsonObject("latestOrder")
                        val orderId = latestOrder.get("id").asString
                        val userName = latestOrder.get("userName").asString
                        val packageName = latestOrder.get("packageName").asString
                        val totalPrice = latestOrder.get("totalPrice").asLong

                        val lastSavedId = prefs.lastOrderId
                        if (lastSavedId.isNotEmpty() && lastSavedId != orderId) {
                            // New Order Trigger!
                            showNotification(
                                title = "📦 ORDERAN BARU MASUK!",
                                message = "Pesanan #$orderId dari $userName ($packageName - Rp ${formatRupiah(totalPrice)})",
                                targetUrl = "$baseUrl/secure-portal-admin/orders",
                                notifId = (System.currentTimeMillis() % 10000).toInt()
                            )
                        }
                        prefs.lastOrderId = orderId
                    }
                }
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    private fun showNotification(title: String, message: String, targetUrl: String, notifId: Int) {
        val intent = Intent(this, MainActivity::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP
            putExtra("TARGET_URL", targetUrl)
        }

        val pendingIntent = PendingIntent.getActivity(
            this,
            notifId,
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )

        val soundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION)

        val builder = NotificationCompat.Builder(this, CHANNEL_ID)
            .setSmallIcon(android.R.drawable.stat_notify_chat)
            .setContentTitle(title)
            .setContentText(message)
            .setStyle(NotificationCompat.BigTextStyle().bigText(message))
            .setPriority(NotificationCompat.PRIORITY_HIGH)
            .setDefaults(NotificationCompat.DEFAULT_ALL)
            .setSound(soundUri)
            .setAutoCancel(true)
            .setContentIntent(pendingIntent)

        val notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        notificationManager.notify(notifId, builder.build())
    }

    private fun createForegroundNotification(): Notification {
        val intent = Intent(this, MainActivity::class.java)
        val pendingIntent = PendingIntent.getActivity(
            this, 0, intent, PendingIntent.FLAG_IMMUTABLE
        )

        return NotificationCompat.Builder(this, FOREGROUND_CHANNEL_ID)
            .setContentTitle("Arjuna Admin Listener Active")
            .setContentText("Monitoring live chats and incoming orders in background...")
            .setSmallIcon(android.R.drawable.stat_notify_sync)
            .setPriority(NotificationCompat.PRIORITY_MIN)
            .setContentIntent(pendingIntent)
            .setOngoing(true)
            .build()
    }

    private fun createNotificationChannels() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

            val channel = NotificationChannel(
                CHANNEL_ID,
                "Admin Alert Notifications",
                NotificationManager.IMPORTANCE_HIGH
            ).apply {
                description = "Alerts for new orders and incoming chats"
                enableVibration(true)
            }

            val fgChannel = NotificationChannel(
                FOREGROUND_CHANNEL_ID,
                "Background Listener Status",
                NotificationManager.IMPORTANCE_LOW
            )

            notificationManager.createNotificationChannel(channel)
            notificationManager.createNotificationChannel(fgChannel)
        }
    }

    private fun formatRupiah(amount: Long): String {
        return String.format("%,d", amount).replace(',', '.')
    }

    override fun onDestroy() {
        scheduler?.shutdownNow()
        wakeLock?.let {
            if (it.isHeld) it.release()
        }
        super.onDestroy()
    }

    override fun onBind(intent: Intent?): IBinder? = null
}
