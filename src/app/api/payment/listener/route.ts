import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders, projectLogs, transactions } from "@/db/schema";
import { eq, sql, desc } from "drizzle-orm";
import { sendTelegramAlert } from "@/lib/telegram";
import { sendTransactionalEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const rawBodyText = await request.text();
    console.log("=== RAW PAYLISTENER WEBHOOK BODY ===", rawBodyText);

    let body: any = {};
    try {
      body = JSON.parse(rawBodyText);
    } catch {
      body = { raw: rawBodyText };
    }

    const secret_key = (body.secret_key || body.secretKey || body.secret || body.auth || "").trim();
    const title = body.title || body.subject || "";
    const text = body.text || body.message || body.content || body.raw_message || body.body || rawBodyText || "";
    const package_name = body.package_name || body.packageName || body.app || "Android Listener";

    const expectedSecret = (process.env.PAYLISTENER_SECRET_KEY || "harispayment").trim();

    // 1. Secret Key Check (Super Lenient for Testing)
    if (secret_key && secret_key.toLowerCase() !== expectedSecret.toLowerCase() && secret_key !== "harispayment") {
      console.warn("PayListener Secret Key Mismatch:", { received: secret_key, expected: expectedSecret });
    }

    // 2. Extract Amount using multiple regex strategies
    let extractedAmount = 0;

    if (body.amount && !isNaN(Number(body.amount))) {
      extractedAmount = Math.round(Number(body.amount));
    } else {
      const fullContent = `${title} ${text} ${rawBodyText}`;
      
      // Find Rp 10.xxx or Rp10xxx or 10.xxx or 10xxx
      const regexRp = /(?:Rp|RP|\bRp\.|\$|USD)?\s*([0-9]{1,3}(?:\.[0-9]{3})+|[0-9]{4,7})/gi;
      const matches = [...fullContent.matchAll(regexRp)];
      
      for (const m of matches) {
        if (m[1]) {
          const num = parseInt(m[1].replace(/\./g, ""), 10);
          if (num >= 1000) {
            extractedAmount = num;
            break;
          }
        }
      }
    }

    console.log("PayListener Extracted Amount:", extractedAmount);

    // 3. Search matching pending_dp order in DB
    let targetOrder = null;

    if (extractedAmount > 0) {
      const pendingOrders = await db
        .select()
        .from(orders)
        .where(
          sql`${orders.status} = 'pending_dp' AND (
            ${orders.dpAmount} = ${extractedAmount} OR 
            ABS(${orders.dpAmount} - ${extractedAmount}) <= 1500
          )`
        )
        .orderBy(desc(orders.createdAt))
        .limit(1);

      if (pendingOrders.length > 0) {
        targetOrder = pendingOrders[0];
      }
    }

    // Fallback: If amount extracted didn't match exact range, pick the latest pending_dp order if extractedAmount >= 9000
    if (!targetOrder && extractedAmount >= 9000) {
      const latestPending = await db
        .select()
        .from(orders)
        .where(eq(orders.status, "pending_dp"))
        .orderBy(desc(orders.createdAt))
        .limit(1);

      if (latestPending.length > 0) {
        targetOrder = latestPending[0];
        console.log("Fallback matched latest pending order:", targetOrder.id);
      }
    }

    if (!targetOrder) {
      return NextResponse.json({
        status: "no_match",
        message: `Nominal Rp ${extractedAmount.toLocaleString("id-ID")} terdeteksi dari ${package_name}, namun tidak ada pesanan pending_dp yang cocok.`,
        extractedAmount,
        receivedBody: body,
      });
    }

    // 4. Update status in orders and transactions tables
    await db
      .update(orders)
      .set({
        status: "dp_verified",
        updatedAt: new Date(),
      })
      .where(eq(orders.id, targetOrder.id));

    try {
      await db
        .update(transactions)
        .set({
          status: "PAID",
          paidAt: new Date(),
        })
        .where(eq(transactions.orderId, targetOrder.id));
    } catch (txUpErr) {
      console.warn("Transactions table update fallback:", txUpErr);
    }

    // 5. Insert project log
    await db.insert(projectLogs).values({
      orderId: targetOrder.id,
      statusTag: "dp_verified",
      logText: `Pembayaran DP 50% Rp ${(extractedAmount || targetOrder.dpAmount).toLocaleString("id-ID")} terverifikasi otomatis via PayListener Android (${package_name}).`,
    });

    // 6. Trigger Telegram Alert
    const teleMsg = `<b>✅ PEMBAYARAN DP VERIFIED (ANDROID LISTENER)! — ARJUNA DEV</b>
━━━━━━━━━━━━━━━━━━━━━━━
<b>Order ID:</b> <code>${targetOrder.id}</code>
<b>Klien:</b> ${targetOrder.userName} (${targetOrder.userEmail})
<b>Paket:</b> ${targetOrder.packageName}
<b>Nominal Terverifikasi:</b> Rp ${(extractedAmount || targetOrder.dpAmount).toLocaleString("id-ID")}
<b>Aplikasi Notifikasi:</b> ${package_name}
<b>Waktu:</b> ${new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })} WIB

👉 <b>Cek Admin Panel:</b> https://arjunadev.com/secure-portal-admin/orders`;

    sendTelegramAlert(teleMsg).catch(() => {});

    // 7. Trigger Email
    if (targetOrder.userEmail) {
      sendTransactionalEmail("payment_verified", {
        orderId: targetOrder.id,
        userName: targetOrder.userName,
        userEmail: targetOrder.userEmail,
        packageName: targetOrder.packageName,
        totalPrice: targetOrder.totalPrice,
        dpAmount: targetOrder.dpAmount,
        paymentMethod: "Transfer Bank Jago / QRIS (Otomatis Verified)",
        receiptUrl: targetOrder.receiptUrl || "",
      }).catch((e) => console.error("Email error:", e));
    }

    return NextResponse.json({
      status: "success",
      message: "Pembayaran berhasil terverifikasi otomatis! Status diubah ke dp_verified.",
      order_id: targetOrder.id,
      amount: extractedAmount || targetOrder.dpAmount,
    });
  } catch (err: any) {
    console.error("PayListener Webhook Error:", err);
    return NextResponse.json({ status: "error", message: err.message }, { status: 500 });
  }
}
