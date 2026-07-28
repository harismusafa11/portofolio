import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders, projectLogs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { sendTelegramAlert } from "@/lib/telegram";
import { sendTransactionalEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Check if this is a Paywuz Webhook Payload
    const targetOrderId = body.orderId || body.order_id || body.reference_id;
    const webhookStatus = body.status || body.event || body.transaction_status;

    if (targetOrderId && (webhookStatus === "SUCCESS" || webhookStatus === "PAID" || webhookStatus === "COMPLETED" || webhookStatus === "dp_verified")) {
      // 1. Update Order Status
      await db
        .update(orders)
        .set({
          status: "dp_verified",
          paywuzTrxId: body.paywuzTrxId || body.transaction_id || body.id || "PWZ-WEBHOOK",
          updatedAt: new Date(),
        })
        .where(eq(orders.id, targetOrderId));

      // 2. Insert Project Log
      await db.insert(projectLogs).values({
        orderId: targetOrderId,
        statusTag: "dp_verified",
        logText: "Pembayaran DP 50% telah diterima & diverifikasi otomatis via Webhook Paywuz.id.",
      });

      // 3. Trigger Telegram Alert
      const teleMsg = `<b>✅ PEMBAYARAN PAYWUZ LUNAS DP (WEBHOOK)! — ARJUNA DEV</b>
━━━━━━━━━━━━━━━━━━━━━━━
<b>Order ID:</b> <code>${targetOrderId}</code>
<b>Status DP:</b> Terverifikasi Otomatis (Paywuz Gateway)
<b>Waktu:</b> ${new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })} WIB

👉 <b>Cek Admin Panel:</b> https://arjunadev.com/secure-portal-admin`;

      sendTelegramAlert(teleMsg).catch(() => {});

      return NextResponse.json({ success: true, message: "Paywuz Webhook processed successfully" });
    }

    // Standard Payment Initialization
    const { orderId, amount, customerName, customerEmail, packageName } = body;
    const paywuzTrxId = `PWZ-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const paywuzPayload = {
      amount: Number(amount),
      reference_id: String(orderId),
      customer_name: customerName || "Klien Arjuna Dev",
      customer_email: customerEmail || "klien@example.com",
      description: `Pembayaran DP 50% ${packageName || "Order Website"}`,
    };

    let apiResponseData = null;
    let paymentLinkUrl = "";
    let qrisUrl = "";

    // Call Real Paywuz API Endpoint if live key is configured
    if (process.env.PAYWUZ_API_KEY && !process.env.PAYWUZ_API_KEY.includes("placeholder")) {
      try {
        const paywuzRes = await fetch("https://api.paywuz.id/v1/transactions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.PAYWUZ_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paywuzPayload),
        });

        if (paywuzRes.ok) {
          const resJson = await paywuzRes.json();
          apiResponseData = resJson;
          paymentLinkUrl = resJson.payment_url || resJson.checkout_url || resJson.url || "";
          qrisUrl = resJson.qris_url || resJson.qris_code || "";
        }
      } catch (externalErr) {
        console.warn("Paywuz external API call fallback:", externalErr);
      }
    }

    // Fallback QRIS & VA data generation if external API response is pending key activation
    if (!qrisUrl) {
      qrisUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=00020101021226670016ID.CO.PAYWUZ.WWW011893600914396559731252045812530336054${amount}5802ID5914ARJUNA DEV WEB6007JAKARTA61051211062070703A016304FC2B`;
    }

    const livePaywuzUrl = process.env.PAYWUZ_PAYMENT_URL || "https://paywuz.id/pay/563d267b-052d-49c3-9756-0d60f4b0f4b3";

    const paymentDetails = {
      paywuzTrxId,
      amount,
      currency: "IDR",
      merchantName: "Arjuna Dev Web Studio",
      paymentLinkUrl: paymentLinkUrl || livePaywuzUrl,
      qrisUrl,
      virtualAccounts: {
        bca: `88012${Math.floor(10000000 + Math.random() * 90000000)}`,
        mandiri: `89022${Math.floor(10000000 + Math.random() * 90000000)}`,
        bri: `88032${Math.floor(10000000 + Math.random() * 90000000)}`,
        bank_jago: `103965597312`,
      },
      apiData: apiResponseData,
      expiredAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: paymentDetails,
    });
  } catch (error: any) {
    console.error("Paywuz API error:", error);
    return NextResponse.json({ error: error.message || "Failed to initialize Paywuz transaction" }, { status: 500 });
  }
}

// Manual Verify route via PUT (called when user clicks "Sudah Bayar? Verifikasi")
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const targetOrderId = body.orderId || body.order_id || body.reference_id;

    console.log("[Paywuz PUT] Request received. orderId:", targetOrderId);

    if (!targetOrderId) {
      console.warn("[Paywuz PUT] ❌ orderId missing. body:", JSON.stringify(body));
      return NextResponse.json({ error: "Order ID missing" }, { status: 400 });
    }

    // 1. Update order status
    const existingOrders = await db.select().from(orders).where(eq(orders.id, targetOrderId));
    const targetOrder = existingOrders[0];

    await db
      .update(orders)
      .set({ status: "dp_verified", updatedAt: new Date() })
      .where(eq(orders.id, targetOrderId));
    console.log("[Paywuz PUT] ✅ DB updated → dp_verified:", targetOrderId);

    // 2. Insert log
    await db.insert(projectLogs).values({
      orderId: targetOrderId,
      statusTag: "dp_verified",
      logText: "Pembayaran DP 50% diverifikasi manual oleh klien via tombol Verifikasi.",
    });
    console.log("[Paywuz PUT] ✅ Project log inserted.");

    // 3. Send Telegram
    const teleMsg = `<b>✅ PEMBAYARAN DP VERIFIED — ARJUNA DEV</b>
━━━━━━━━━━━━━━━━━━━━━━━
<b>Order ID:</b> <code>${targetOrderId}</code>
<b>Status DP:</b> LUNAS 50% (Klien klik Verifikasi)
<b>Waktu:</b> ${new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })} WIB

👉 <b>Cek Admin Panel:</b> https://arjunadev.com/secure-portal-admin`;

    console.log("[Paywuz PUT] Sending Telegram notification...");
    const teleResult = await sendTelegramAlert(teleMsg);
    console.log("[Paywuz PUT] Telegram result:", teleResult ? "✅ SENT" : "❌ FAILED");

    // 4. Send Transactional Email Confirmation to Client
    if (targetOrder && targetOrder.userEmail) {
      sendTransactionalEmail("payment_verified", {
        orderId: targetOrder.id,
        userName: targetOrder.userName,
        userEmail: targetOrder.userEmail,
        packageName: targetOrder.packageName,
        totalPrice: targetOrder.totalPrice,
        dpAmount: targetOrder.dpAmount,
        paymentMethod: targetOrder.paymentMethod,
        receiptUrl: targetOrder.receiptUrl || "",
      }).catch((e) => console.error("Email trigger error:", e));
    }

    return NextResponse.json({ success: true, message: "Payment status verified successfully" });
  } catch (error: any) {
    console.error("[Paywuz PUT] ❌ Exception:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
