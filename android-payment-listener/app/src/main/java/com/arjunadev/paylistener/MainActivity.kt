package com.arjunadev.paylistener

import android.content.ComponentName
import android.content.Intent
import android.os.Bundle
import android.provider.Settings
import android.text.TextUtils
import android.text.method.ScrollingMovementMethod
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import com.arjunadev.paylistener.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private lateinit var prefsManager: PreferencesManager
    private lateinit var webhookSender: WebhookSender

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        prefsManager = PreferencesManager(this)
        webhookSender = WebhookSender(this)

        initViews()
        loadSavedConfig()
    }

    override fun onResume() {
        super.onResume()
        updateServiceStatus()
        refreshLogs()
    }

    private fun initViews() {
        binding.tvLogsContent.movementMethod = ScrollingMovementMethod()

        binding.btnGrantPermission.setOnClickListener {
            startActivity(Intent(Settings.ACTION_NOTIFICATION_LISTENER_SETTINGS))
        }

        binding.btnSaveConfig.setOnClickListener {
            val url = binding.etWebhookUrl.text.toString().trim()
            val key = binding.etSecretKey.text.toString().trim()

            if (url.isEmpty()) {
                Toast.makeText(this, "URL Webhook tidak boleh kosong", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            prefsManager.webhookUrl = url
            prefsManager.secretKey = if (key.isNotEmpty()) key else PreferencesManager.DEFAULT_SECRET_KEY

            prefsManager.appendLog("[System] Konfigurasi Webhook disimpan.")
            Toast.makeText(this, "Konfigurasi Webhook Berhasil Disimpan!", Toast.LENGTH_SHORT).show()
            refreshLogs()
        }

        binding.btnTestWebhook.setOnClickListener {
            val testPkg = "tech.jago.app"
            val testTitle = "Transfer Masuk Bank Jago"
            val testText = "Transfer masuk sebesar Rp 150.000 via QRIS / Bank Transfer."

            Toast.makeText(this, "Mengirim uji coba koneksi ke server...", Toast.LENGTH_SHORT).show()
            prefsManager.appendLog("[System] Mengirim simulasi verifikasi ke server...")

            webhookSender.sendNotification(testPkg, testTitle, testText, object : WebhookSender.WebhookCallback {
                override fun onSuccess(responseBody: String) {
                    Toast.makeText(this@MainActivity, "✅ Uji Coba Koneksi Server Berhasil!", Toast.LENGTH_LONG).show()
                    refreshLogs()
                }

                override fun onError(errorMessage: String) {
                    Toast.makeText(this@MainActivity, "❌ Uji Coba Server Gagal: $errorMessage", Toast.LENGTH_LONG).show()
                    refreshLogs()
                }
            })
        }

        binding.btnClearLogs.setOnClickListener {
            prefsManager.clearLogs()
            refreshLogs()
            Toast.makeText(this, "Log berhasil dibersihkan", Toast.LENGTH_SHORT).show()
        }
    }

    private fun loadSavedConfig() {
        binding.etWebhookUrl.setText(prefsManager.webhookUrl)
        binding.etSecretKey.setText(prefsManager.secretKey)
    }

    private fun updateServiceStatus() {
        val isGranted = isNotificationServiceEnabled()
        if (isGranted) {
            binding.tvServiceStatus.text = "Service Aktif (Mendengar Notifikasi)"
            binding.tvServiceStatus.setTextColor(ContextCompat.getColor(this, R.color.accent_emerald))
            binding.viewStatusDot.setBackgroundResource(R.drawable.bg_dot_active)
            binding.btnGrantPermission.text = "Pengaturan Akses"
        } else {
            binding.tvServiceStatus.text = "Akses Notifikasi Belum Diizinkan"
            binding.tvServiceStatus.setTextColor(ContextCompat.getColor(this, R.color.accent_rose))
            binding.viewStatusDot.setBackgroundResource(R.drawable.bg_dot_inactive)
            binding.btnGrantPermission.text = "Aktifkan Izin"
        }
    }

    private fun refreshLogs() {
        binding.tvLogsContent.text = prefsManager.getLogs()
    }

    private fun isNotificationServiceEnabled(): Boolean {
        val pkgName = packageName
        val flat = Settings.Secure.getString(contentResolver, "enabled_notification_listeners")
        if (!TextUtils.isEmpty(flat)) {
            val names = flat.split(":").toTypedArray()
            for (name in names) {
                val cn = ComponentName.unflattenFromString(name)
                if (cn != null && TextUtils.equals(pkgName, cn.packageName)) {
                    return true
                }
            }
        }
        return false
    }
}
