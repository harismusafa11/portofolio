import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq, desc } from "drizzle-orm";
import * as schema from "@/db/schema";
import { sendTelegramAlert } from "@/lib/telegram";
import { sendTransactionalEmail } from "@/lib/email";

const databaseUrl =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_PIF2fXtn3yOr@ep-spring-leaf-az5wqh8i-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

// GET /api/orders?userId=...
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const sql = neon(databaseUrl);
    const db = drizzle({ client: sql, schema });

    let result;
    if (userId) {
      result = await db
        .select()
        .from(schema.orders)
        .where(eq(schema.orders.userId, userId))
        .orderBy(desc(schema.orders.createdAt));
    } else {
      result = await db
        .select()
        .from(schema.orders)
        .orderBy(desc(schema.orders.createdAt));
    }

    return NextResponse.json({ orders: result });
  } catch (err: any) {
    console.error("GET /api/orders error:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

// POST /api/orders
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      userId,
      userName,
      userEmail,
      userPhoto,
      packageId,
      packageName,
      totalPrice,
      dpAmount,
      paymentMethod,
      formData,
      receiptUrl,
    } = body;

    if (!userId || !userEmail || !packageId || !totalPrice) {
      return NextResponse.json(
        { error: "Missing required order parameters" },
        { status: 400 }
      );
    }

    const sql = neon(databaseUrl);
    const db = drizzle({ client: sql, schema });

    // Generate unique order ID e.g. ORD-2026-X91
    const orderId = `ORD-${new Date().getFullYear()}-${Math.random()
      .toString(36)
      .substring(2, 7)
      .toUpperCase()}`;

    const initialStatus =
      paymentMethod === "manual_transfer" && receiptUrl
        ? "pending_verification"
        : "pending_dp";

    const initialLogText =
      paymentMethod === "manual_transfer" && receiptUrl
        ? "Bukti pembayaran DP telah diunggah. Menunggu verifikasi dari Admin."
        : "Pesanan berhasil dibuat. Menunggu pembayaran DP 50%.";

    // 1. Insert Order
    await db.insert(schema.orders).values({
      id: orderId,
      userId,
      userName: userName || userEmail.split("@")[0],
      userEmail,
      userPhoto: userPhoto || "",
      packageId,
      packageName: packageName || "Paket Custom",
      totalPrice: Number(totalPrice),
      dpAmount: Number(dpAmount || totalPrice * 0.5),
      paymentMethod: paymentMethod || "manual_transfer",
      status: initialStatus,
      formDataJson: JSON.stringify(formData || {}),
      receiptUrl: receiptUrl || "",
    });

    // 2. Insert Initial Project Log
    await db.insert(schema.projectLogs).values({
      orderId,
      statusTag: initialStatus,
      logText: initialLogText,
    });

    // 3. Trigger Instant Real-Time Push Notification to Haris Musafa's Telegram
    const teleMsg = `<b>🔔 PESANAN BARU MASUK! — ARJUNA DEV</b>
━━━━━━━━━━━━━━━━━━━━━━━
<b>Order ID:</b> <code>${orderId}</code>
<b>Pemesan:</b> ${userName || userEmail}
<b>Email:</b> ${userEmail}
<b>Paket:</b> ${packageName || "Paket Custom"}
<b>Total Harga:</b> Rp ${Number(totalPrice).toLocaleString("id-ID")}
<b>Nominal DP (50%):</b> Rp ${Number(dpAmount || totalPrice * 0.5).toLocaleString("id-ID")}
<b>Metode Bayar:</b> ${paymentMethod === "manual_transfer" ? "Manual Transfer Bank Jago" : "Otomatis QRIS/VA"}
${receiptUrl ? `📷 <b>Bukti Transfer:</b> <a href="${receiptUrl}">Lihat Struk Bukti</a>\n⏳ <b>Status:</b> MENUNGGU VERIFIKASI ADMIN` : "⏳ <b>Status:</b> Menunggu DP"}

👉 <b>Cek Admin Panel:</b> https://arjunadev.com/secure-portal-admin`;

    sendTelegramAlert(teleMsg).catch(() => {});

    // 4. Trigger Transactional Invoice Email to Client
    sendTransactionalEmail("order_created", {
      orderId,
      userName: userName || userEmail.split("@")[0],
      userEmail,
      packageName: packageName || "Paket Custom",
      totalPrice: Number(totalPrice),
      dpAmount: Number(dpAmount || totalPrice * 0.5),
      paymentMethod: paymentMethod || "manual_transfer",
      receiptUrl: receiptUrl || "",
    }).catch((e) => console.error("Email trigger error:", e));

    return NextResponse.json({
      success: true,
      orderId,
      message: "Order created successfully",
    });
  } catch (err: any) {
    console.error("POST /api/orders error:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to create order" },
      { status: 500 }
    );
  }
}
