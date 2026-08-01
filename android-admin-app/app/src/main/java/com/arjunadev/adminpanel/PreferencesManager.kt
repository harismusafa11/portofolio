package com.arjunadev.adminpanel

import android.content.Context
import android.content.SharedPreferences

class PreferencesManager(context: Context) {
    private val prefs: SharedPreferences =
        context.getSharedPreferences("arjuna_admin_prefs", Context.MODE_PRIVATE)

    var baseUrl: String
        get() = prefs.getString("base_url", "https://arjunadev.com") ?: "https://arjunadev.com"
        set(value) = prefs.edit().putString("base_url", value).apply()

    var lastOrderId: String
        get() = prefs.getString("last_order_id", "") ?: ""
        set(value) = prefs.edit().putString("last_order_id", value).apply()

    var lastChatTime: Long
        get() = prefs.getLong("last_chat_time", 0L)
        set(value) = prefs.edit().putLong("last_chat_time", value).apply()

    var isNotificationEnabled: Boolean
        get() = prefs.getBoolean("notif_enabled", true)
        set(value) = prefs.edit().putBoolean("notif_enabled", value).apply()
}
