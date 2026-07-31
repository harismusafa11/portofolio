import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders, transactions } from "@/db/schema";
import { eq } from "drizzle-orm";

// GET /api/checkout/status?order_id=... or ?orderId=...
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("order_id") || searchParams.get("orderId");

    if (!orderId) {
      return NextResponse.json({ error: "Missing order_id parameter" }, { status: 400 });
    }

    // 1. Check orders table
    const orderRows = await db.select().from(orders).where(eq(orders.id, orderId));

    if (orderRows.length > 0) {
      const order = orderRows[0];
      const isPaid = order.status === "dp_verified" || order.status === "paid" || order.status === "completed";
      return NextResponse.json({
        status: isPaid ? "PAID" : "PENDING",
        order_id: order.id,
        dp_amount: order.dpAmount,
      });
    }

    // 2. Check transactions table
    const txRows = await db.select().from(transactions).where(eq(transactions.orderId, orderId));
    if (txRows.length > 0) {
      return NextResponse.json({
        status: txRows[0].status,
        order_id: txRows[0].orderId,
        amount: txRows[0].totalAmount,
      });
    }

    return NextResponse.json({ status: "NOT_FOUND" }, { status: 404 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
