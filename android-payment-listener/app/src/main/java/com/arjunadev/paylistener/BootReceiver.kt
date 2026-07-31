package com.arjunadev.paylistener

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.util.Log

class BootReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context?, intent: Intent?) {
        if (intent?.action == Intent.ACTION_BOOT_COMPLETED || intent?.action == "android.intent.action.QUICKBOOT_POWERON") {
            Log.d("BootReceiver", "Device boot completed. Arjuna Pay Listener ready.")
            context?.let {
                val prefs = PreferencesManager(it)
                prefs.appendLog("[System] Device restarted. Arjuna Pay Notification Listener is active.")
            }
        }
    }
}
