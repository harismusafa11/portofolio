import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders, projectLogs } from "@/db/schema";
import { eq, or, sql } from "drizzle-orm";
import { sendTelegramAlert } from "@/lib/telegram";
import { sendTransactionalEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { secret_key, title, text, package_name } = body;

    const expectedSecret = process.env.PAYLISTENER_SECRET_KEY || "harispayment";

    // 1. Validasi Secret Key
    if (secret_key !== expectedSecret) {
      return NextResponse.json({ status: "error", message: "Unauthorized secret key" }, { status: 401 });
    }

    // 2. Ekstrak Nominal Rupiah / USD dengan RegEx
    const regex = /(?:Rp|RP|\bRp\.|\$|USD)\s*([0-9]{1,3}(?:\.[0-9]{3})+|[0-9]+)/i;
    const match = text?.match(regex) || title?.match(regex);

    if (!match) {
      return NextResponse.json({ status: "ignored", message: "Nominal tidak ditemukan dalam notifikasi" });
    }

    const extractedAmount = parseInt(match[1].replace(/\./g, ""), 10);

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
      return NextResponse.json({
        status: "no_match",
        message: `Nominal Rp ${extractedAmount.toLocaleString("id-ID")} terdeteksi dari ${package_name || "Notification Listener"}, namun tidak ada pesanan pending_dp yang cocok.`
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
