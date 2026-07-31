package com.arjunadev.paylistener;

import android.app.Notification;
import android.content.Intent;
import android.os.Bundle;
import android.service.notification.NotificationListenerService;
import android.service.notification.StatusBarNotification;
import android.util.Log;

import org.json.JSONObject;

import java.io.IOException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class PayNotificationListenerService extends NotificationListenerService {

    private static final String TAG = "PayListenerService";
    private static final String WEBHOOK_URL_1 = "https://arjunadev.com/api/payment/listener";
    private static final String WEBHOOK_URL_2 = "https://arjunadev.com/api/paylistener-webhook";
    private static final String SECRET_KEY = "harispayment";

    private final OkHttpClient client = new OkHttpClient();
    private final ExecutorService executor = Executors.newSingleThreadExecutor();

    @Override.Listener
    public void onNotificationPosted(StatusBarNotification sbn) {
        if (sbn == null) return;

        String packageName = sbn.getPackageName();
        Notification notification = sbn.getNotification();
        if (notification == null) return;

        Bundle extras = notification.extras;
        if (extras == null) return;

        String title = extras.getString(Notification.EXTRA_TITLE, "");
        CharSequence textChar = extras.getCharSequence(Notification.EXTRA_TEXT);
        String text = textChar != null ? textChar.toString() : "";

        Log.d(TAG, "Notification Captured from: " + packageName + " | Title: " + title + " | Text: " + text);

        // Filter: Bank Jago (com.jago.app), DANA (id.dana), BCA, BRI, Mandiri, GoPay, or any finance text
        boolean isFinanceApp = packageName.contains("jago") ||
                               packageName.contains("dana") ||
                               packageName.contains("bca") ||
                               packageName.contains("bri") ||
                               packageName.contains("mandiri") ||
                               packageName.contains("gojek") ||
                               packageName.contains("paypal");

        boolean containsMoneyText = (title + " " + text).toLowerCase().contains("rp") ||
                                    (title + " " + text).toLowerCase().contains("transfer") ||
                                    (title + " " + text).toLowerCase().contains("masuk") ||
                                    (title + " " + text).toLowerCase().contains("berhasil") ||
                                    (title + " " + text).matches(".*[0-9]{4,}.*");

        if (isFinanceApp || containsMoneyText) {
            broadcastToActivity(packageName, title, text, "CAPTURED");
            sendWebhookToWebsite(packageName, title, text);
        }
    }

    private void sendWebhookToWebsite(String packageName, String title, String text) {
        executor.execute(() -> {
            try {
                JSONObject jsonBody = new JSONObject();
                jsonBody.put("secret_key", SECRET_KEY);
                jsonBody.put("package_name", packageName);
                jsonBody.put("title", title);
                jsonBody.put("text", text);

                String jsonString = jsonBody.toString();
                RequestBody body = RequestBody.create(jsonString, MediaType.parse("application/json; charset=utf-8"));

                Request request1 = new Request.Builder()
                        .url(WEBHOOK_URL_1)
                        .post(body)
                        .addHeader("Content-Type", "application/json")
                        .build();

                try (Response response1 = client.newCall(request1).execute()) {
                    String respStr = response1.body() != null ? response1.body().string() : "";
                    Log.d(TAG, "Webhook 1 Response Code: " + response1.code() + " | Body: " + respStr);
                    broadcastToActivity(packageName, title, text, "SENT_OK (HTTP " + response1.code() + ")");
                }

            } catch (Exception e) {
                Log.e(TAG, "Webhook Send Error", e);
                broadcastToActivity(packageName, title, text, "ERROR: " + e.getMessage());
            }
        });
    }

    private void broadcastToActivity(String packageName, String title, String text, String status) {
        Intent intent = new Intent("com.arjunadev.paylistener.LOG_EVENT");
        intent.putExtra("packageName", packageName);
        intent.putExtra("title", title);
        intent.putExtra("text", text);
        intent.putExtra("status", status);
        intent.putExtra("timestamp", System.currentTimeMillis());
        sendBroadcast(intent);
    }
}
