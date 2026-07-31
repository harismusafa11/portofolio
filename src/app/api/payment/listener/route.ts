import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders, projectLogs } from "@/db/schema";
import { eq, or, sql } from "drizzle-orm";
import { sendTelegramAlert } from "@/lib/telegram";
import { sendTransactionalEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("=== PAYLISTENER WEBHOOK RECEIVED ===", JSON.stringify(body, null, 2));

    const secret_key = (body.secret_key || body.secretKey || body.secret || body.auth || "").trim();
    const title = body.title || body.subject || "";
    const text = body.text || body.message || body.content || body.raw_message || body.body || "";
    const package_name = body.package_name || body.packageName || body.app || "Android Listener";

    const expectedSecret = (process.env.PAYLISTENER_SECRET_KEY || "harispayment").trim();

    // 1. Validasi Secret Key (Toleran terhadap spasi / case)
    if (secret_key && secret_key.toLowerCase() !== expectedSecret.toLowerCase()) {
      console.warn("PayListener Webhook Secret Key Mismatch:", { received: secret_key, expected: expectedSecret });
      return NextResponse.json({ status: "error", message: "Unauthorized secret key" }, { status: 401 });
    }

    // 2. Ekstrak Nominal Rupiah / Angka dari notifikasi
    let extractedAmount = 0;

    if (body.amount && !isNaN(Number(body.amount))) {
      extractedAmount = Math.round(Number(body.amount));
    } else {
      const fullContent = `${title} ${text}`;
      const regex = /(?:Rp|RP|\bRp\.|\$|USD)?\s*([0-9]{1,3}(?:\.[0-9]{3})+|[0-9]{4,7})/i;
      const match = fullContent.match(regex);

      if (match && match[1]) {
        extractedAmount = parseInt(match[1].replace(/\./g, ""), 10);
      }
    }

    console.log("PayListener Extracted Amount:", extractedAmount);

    if (!extractedAmount || extractedAmount < 1000) {
      return NextResponse.json({
        status: "ignored",
        message: "Nominal valid tidak ditemukan dalam notifikasi",
        received_body: body,
      });
    }

    // 3. Query DB untuk order pending_dp yang cocok dengan nominal DP (atau DP + kode unik)
    const pendingOrders = await db
      .select()
      .from(orders)
      .where(
        sql`${orders.status} = 'pending_dp' AND (
          ${orders.dpAmount} = ${extractedAmount} OR 
          ABS(${orders.dpAmount} - ${extractedAmount}) < 1000
        )`
      )
      .orderBy(sql`${orders.createdAt} DESC`)
      .limit(1);

    if (pendingOrders.length === 0) {
      console.warn("PayListener No Matching Pending Order for Amount:", extractedAmount);
      return NextResponse.json({
        status: "no_match",
        message: `Nominal Rp ${extractedAmount.toLocaleString("id-ID")} terdeteksi dari ${package_name}, namun tidak ada pesanan pending_dp yang cocok.`,
        extractedAmount,
      });
    }

    const targetOrder = pendingOrders[0];

    // 4. Update status order ke dp_verified
    await db
      .update(orders)
      .set({
        status: "dp_verified",
        updatedAt: new Date(),
      })
      .where(eq(orders.id, targetOrder.id));

    // 5. Tambahkan log timeline proyek
    await db.insert(projectLogs).values({
      orderId: targetOrder.id,
      statusTag: "dp_verified",
      logText: `Pembayaran DP 50% Rp ${extractedAmount.toLocaleString("id-ID")} terverifikasi otomatis via PayListener Android (${package_name || "m-banking"}).`,
    });

    // 6. Kirim Notifikasi Telegram Real-Time
    const teleMsg = `<b>✅ PEMBAYARAN DP VERIFIED (ANDROID LISTENER)! — ARJUNA DEV</b>
━━━━━━━━━━━━━━━━━━━━━━━
<b>Order ID:</b> <code>${targetOrder.id}</code>
<b>Klien:</b> ${targetOrder.userName} (${targetOrder.userEmail})
<b>Paket:</b> ${targetOrder.packageName}
<b>Nominal Terverifikasi:</b> Rp ${extractedAmount.toLocaleString("id-ID")}
<b>Aplikasi Notifikasi:</b> ${package_name || "m-Banking / E-Wallet"}
<b>Waktu:</b> ${new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })} WIB

👉 <b>Cek Admin Panel:</b> https://arjunadev.com/secure-portal-admin/orders`;

    sendTelegramAlert(teleMsg).catch(() => {});

    // 7. Kirim Email Konfirmasi Transaksi ke Klien
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
      }).catch((e) => console.error("Email trigger error:", e));
    }

    return NextResponse.json({
      status: "success",
      message: "Pembayaran berhasil terverifikasi otomatis! Status diubah ke dp_verified.",
      order_id: targetOrder.id,
      amount: extractedAmount,
    });
  } catch (err: any) {
    console.error("PayListener Webhook Error:", err);
    return NextResponse.json({ status: "error", message: err.message }, { status: 500 });
  }
}
