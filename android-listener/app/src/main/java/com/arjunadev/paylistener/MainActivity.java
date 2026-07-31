package com.arjunadev.paylistener;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class MainActivity extends AppCompatActivity {

    private TextView txtPermissionStatus;
    private TextView txtLogMonitor;
    private Button btnGrantPermission;
    private Button btnTestWebhook;

    private final OkHttpClient client = new OkHttpClient();
    private final ExecutorService executor = Executors.newSingleThreadExecutor();
    private final StringBuilder logHistory = new StringBuilder();

    private final BroadcastReceiver logReceiver = new BroadcastReceiver() {
        @Override.OnReceive(Context context, Intent intent) {
            if (intent != null && "com.arjunadev.paylistener.LOG_EVENT".equals(intent.getAction())) {
                String pkg = intent.getStringExtra("packageName");
                String title = intent.getStringExtra("title");
                String text = intent.getStringExtra("text");
                String status = intent.getStringExtra("status");
                long ts = intent.getLongExtra("timestamp", System.currentTimeMillis());

                String timeStr = new SimpleDateFormat("HH:mm:ss", Locale.getDefault()).format(new Date(ts));
                String newLog = "[" + timeStr + "] " + status + "\nApp: " + pkg + "\nTitle: " + title + "\nText: " + text + "\n-------------------------\n";

                logHistory.insert(0, newLog);
                txtLogMonitor.setText(logHistory.toString());
            }
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Simple programmatic UI layout
        android.widget.LinearLayout rootLayout = new android.widget.LinearLayout(this);
        rootLayout.setOrientation(android.widget.LinearLayout.VERTICAL);
        rootLayout.setPadding(40, 60, 40, 40);
        rootLayout.setBackgroundColor(0xFF0F172A); // Dark theme

        TextView txtHeader = new TextView(this);
        txtHeader.setText("⚡ Arjuna PayListener v1.0");
        txtHeader.setTextSize(20);
        txtHeader.setTextColor(0xFF38BDF8);
        txtHeader.setTypeface(null, android.graphics.Typeface.BOLD);
        rootLayout.addView(txtHeader);

        TextView txtSubHeader = new TextView(this);
        txtSubHeader.setText("Target Server: https://arjunadev.com/api/payment/listener");
        txtSubHeader.setTextSize(12);
        txtSubHeader.setTextColor(0xFF94A3B8);
        txtSubHeader.setPadding(0, 8, 0, 32);
        rootLayout.addView(txtSubHeader);

        txtPermissionStatus = new TextView(this);
        txtPermissionStatus.setTextSize(14);
        txtPermissionStatus.setPadding(0, 0, 0, 24);
        rootLayout.addView(txtPermissionStatus);

        btnGrantPermission = new Button(this);
        btnGrantPermission.setText("🔑 Buka Izin Akses Notifikasi HP");
        btnGrantPermission.setBackgroundColor(0xFF0284C7);
        btnGrantPermission.setTextColor(0xFFFFFFFF);
        btnGrantPermission.setOnClickListener(v -> openNotificationAccessSettings());
        rootLayout.addView(btnGrantPermission);

        btnTestWebhook = new Button(this);
        btnTestWebhook.setText("🧪 Tes Kirim Webhook (Test Ping)");
        btnTestWebhook.setBackgroundColor(0xFF059669);
        btnTestWebhook.setTextColor(0xFFFFFFFF);
        btnTestWebhook.setOnClickListener(v -> sendTestWebhookPing());
        android.widget.LinearLayout.LayoutParams btnParams = new android.widget.LinearLayout.LayoutParams(
                android.widget.LinearLayout.LayoutParams.MATCH_PARENT,
                android.widget.LinearLayout.LayoutParams.WRAP_CONTENT
        );
        btnParams.setMargins(0, 16, 0, 32);
        btnTestWebhook.setLayoutParams(btnParams);
        rootLayout.addView(btnTestWebhook);

        TextView txtLogLabel = new TextView(this);
        txtLogLabel.setText("📋 Real-time Captured Logs:");
        txtLogLabel.setTextSize(14);
        txtLogLabel.setTextColor(0xFFF8FAFC);
        txtLogLabel.setTypeface(null, android.graphics.Typeface.BOLD);
        rootLayout.addView(txtLogLabel);

        android.widget.ScrollView scrollView = new android.widget.ScrollView(this);
        txtLogMonitor = new TextView(this);
        txtLogMonitor.setText("Menunggu notifikasi masuk dari Bank Jago / DANA...");
        txtLogMonitor.setTextSize(11);
        txtLogMonitor.setTextColor(0xFFCBD5E1);
        txtLogMonitor.setTypeface(android.graphics.Typeface.MONOSPACE);
        txtLogMonitor.setPadding(16, 16, 16, 16);
        txtLogMonitor.setBackgroundColor(0xFF1E293B);
        scrollView.addView(txtLogMonitor);

        rootLayout.addView(scrollView);

        setContentView(rootLayout);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            registerReceiver(logReceiver, new IntentFilter("com.arjunadev.paylistener.LOG_EVENT"), Context.RECEIVER_EXPORTED);
        } else {
            registerReceiver(logReceiver, new IntentFilter("com.arjunadev.paylistener.LOG_EVENT"));
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        checkNotificationPermission();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        try {
            unregisterReceiver(logReceiver);
        } catch (Exception e) {
            // ignore
        }
    }

    private void checkNotificationPermission() {
        boolean isGranted = false;
        String pkgName = getPackageName();
        String flat = Settings.Secure.getString(getContentResolver(), "enabled_notification_listeners");
        if (flat != null) {
            isGranted = flat.contains(pkgName);
        }

        if (isGranted) {
            txtPermissionStatus.setText("✅ STATUS IZIN: AKTIF (Akses Notifikasi Diizinkan)");
            txtPermissionStatus.setTextColor(0xFF34D399);
            btnGrantPermission.setEnabled(false);
            btnGrantPermission.setText("✅ Izin Akses Notifikasi Sudah Aktif");
        } else {
            txtPermissionStatus.setText("❌ STATUS IZIN: BELUM AKTIF! Klik tombol di bawah untuk mengaktifkan.");
            txtPermissionStatus.setTextColor(0xFFF87171);
            btnGrantPermission.setEnabled(true);
        }
    }

    private void openNotificationAccessSettings() {
        try {
            startActivity(new Intent(Settings.ACTION_NOTIFICATION_LISTENER_SETTINGS));
        } catch (Exception e) {
            Toast.makeText(this, "Tidak dapat membuka pengaturan notifikasi", Toast.LENGTH_SHORT).show();
        }
    }

    private void sendTestWebhookPing() {
        Toast.makeText(this, "Mengirim Test Webhook Ping...", Toast.LENGTH_SHORT).show();
        executor.execute(() -> {
            try {
                JSONObject jsonBody = new JSONObject();
                jsonBody.put("secret_key", "harispayment");
                jsonBody.put("package_name", "com.jago.app");
                jsonBody.put("title", "Transfer masuk");
                jsonBody.put("text", "Transfer masuk Rp 10.687 dari Pengetesan PayListener Android");

                String jsonString = jsonBody.toString();
                RequestBody body = RequestBody.create(jsonString, MediaType.parse("application/json; charset=utf-8"));

                Request request = new Request.Builder()
                        .url("https://arjunadev.com/api/payment/listener")
                        .post(body)
                        .build();

                try (Response response = client.newCall(request).execute()) {
                    String respStr = response.body() != null ? response.body().string() : "";
                    runOnUiThread(() -> {
                        Toast.makeText(MainActivity.this, "Test Response (HTTP " + response.code() + "): " + respStr, Toast.LENGTH_LONG).show();
                        String timeStr = new SimpleDateFormat("HH:mm:ss", Locale.getDefault()).format(new Date());
                        logHistory.insert(0, "[" + timeStr + "] PING TEST SUCCESS (HTTP " + response.code() + ")\nResponse: " + respStr + "\n-------------------------\n");
                        txtLogMonitor.setText(logHistory.toString());
                    });
                }
            } catch (Exception e) {
                runOnUiThread(() -> Toast.makeText(MainActivity.this, "Test Gagal: " + e.getMessage(), Toast.LENGTH_LONG).show());
            }
        });
    }
}
