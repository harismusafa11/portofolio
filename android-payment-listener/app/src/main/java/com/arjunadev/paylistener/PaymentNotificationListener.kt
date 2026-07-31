package com.arjunadev.paylistener

import android.app.Notification
import android.service.notification.NotificationListenerService
import android.service.notification.StatusBarNotification
import android.util.Log

class PaymentNotificationListener : NotificationListenerService() {

    private lateinit var webhookSender: WebhookSender

    companion object {
        var isServiceRunning = false
            private set

        // List of target packages for Indonesian Banking & E-Wallets
        val TARGET_PACKAGES = setOf(
            "tech.jago.app",           // Bank Jago
            "com.bca",                 // BCA Mobile / myBCA
            "com.bca.mybca",           // myBCA
            "id.bmri.livin",           // Livin by Mandiri
            "id.co.bri.brimo",         // BRImo
            "id.dana",                 // DANA
            "net.oneoryx.ovo",         // OVO
            "ovo.id",                  // OVO alternate
            "com.gojek.app",           // GoPay / Gojek
            "com.shopee.id"            // ShopeePay
        )
    }

    override fun onCreate() {
        super.onCreate()
        webhookSender = WebhookSender(applicationContext)
        isServiceRunning = true
        Log.d("PaymentNotifListener", "NotificationListenerService Created")
    }

    override fun onDestroy() {
        super.onDestroy()
        isServiceRunning = false
        Log.d("PaymentNotifListener", "NotificationListenerService Destroyed")
    }

    override fun onListenerConnected() {
        super.onListenerConnected()
        isServiceRunning = true
        Log.d("PaymentNotifListener", "NotificationListenerService Connected!")
    }

    override fun onListenerDisconnected() {
        super.onListenerDisconnected()
        isServiceRunning = false
        Log.d("PaymentNotifListener", "NotificationListenerService Disconnected!")
    }

    override fun onNotificationPosted(sbn: StatusBarNotification?) {
        if (sbn == null) return

        val packageName = sbn.packageName ?: return
        val extras = sbn.notification?.extras ?: return

        val title = extras.getString(Notification.EXTRA_TITLE) ?: ""
        val text = extras.getCharSequence(Notification.EXTRA_TEXT)?.toString() ?: ""

        if (title.isBlank() && text.isBlank()) return

        // Log notification entry
        Log.d("PaymentNotifListener", "Received Notif [$packageName] Title: $title | Text: $text")

        // Check if package matches bank/e-wallet or contains keywords
        val lowerPkg = packageName.lowercase()
        val isTargetApp = TARGET_PACKAGES.contains(lowerPkg) ||
                lowerPkg.contains("jago") ||
                lowerPkg.contains("bca") ||
                lowerPkg.contains("mandiri") ||
                lowerPkg.contains("bri") ||
                lowerPkg.contains("dana") ||
                lowerPkg.contains("ovo") ||
                lowerPkg.contains("gojek") ||
                lowerPkg.contains("shopee")

        val lowerContent = "$title $text".lowercase()
        val containsPaymentKeyword = lowerContent.contains("transfer") ||
                lowerContent.contains("masuk") ||
                lowerContent.contains("diterima") ||
                lowerContent.contains("berhasil") ||
                lowerContent.contains("rp") ||
                lowerContent.contains("kredit") ||
                lowerContent.contains("saldo")

        if (isTargetApp || containsPaymentKeyword) {
            Log.i("PaymentNotifListener", "Forwarding matching notification from $packageName to Webhook...")
            webhookSender.sendNotification(packageName, title, text)
        }
    }

    override fun onNotificationRemoved(sbn: StatusBarNotification?) {
        // Optional handling when notification is dismissed
    }
}
