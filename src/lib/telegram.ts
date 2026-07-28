export async function sendTelegramAlert(message: string) {
  try {
    const token = process.env.TELEGRAM_BOT_TOKEN || "7858181117:AAEV8TNRXq3A8V1vsWvFBoNbA2MtpLtaSSE";
    const chatId = process.env.TELEGRAM_CHAT_ID || "8938763921";

    console.log("[Telegram] Sending alert...");
    console.log("[Telegram] Token:", token ? `${token.slice(0, 10)}...` : "MISSING");
    console.log("[Telegram] Chat ID:", chatId || "MISSING");

    if (!token || !chatId) {
      console.warn("[Telegram] ❌ Bot token or chat ID missing — alert NOT sent.");
      return false;
    }

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
        disable_web_page_preview: false,
      }),
    });

    const data = await response.json();
    if (!data.ok) {
      console.error("[Telegram] ❌ API Error:", JSON.stringify(data));
      return false;
    }

    console.log("[Telegram] ✅ Alert sent! message_id:", data.result?.message_id);
    return true;
  } catch (err) {
    console.error("[Telegram] ❌ Exception:", err);
    return false;
  }
}
