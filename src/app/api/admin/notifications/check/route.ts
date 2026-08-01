import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { desc } from "drizzle-orm";
import * as schema from "@/db/schema";

const databaseUrl =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_PIF2fXtn3yOr@ep-spring-leaf-az5wqh8i-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

export async function GET(request: Request) {
  try {
    const sql = neon(databaseUrl);
    const db = drizzle({ client: sql, schema });

    // Fetch latest orders
    const latestOrders = await db
      .select()
      .from(schema.orders)
      .orderBy(desc(schema.orders.createdAt))
      .limit(5);

    const latestOrder = latestOrders[0] || null;

    return NextResponse.json({
      success: true,
      timestamp: Date.now(),
      latestOrder: latestOrder
        ? {
            id: latestOrder.id,
            userName: latestOrder.userName,
            packageName: latestOrder.packageName,
            totalPrice: latestOrder.totalPrice,
            dpAmount: latestOrder.dpAmount,
            status: latestOrder.status,
            createdAt: latestOrder.createdAt,
          }
        : null,
      totalOrders: latestOrders.length,
    });
  } catch (err: any) {
    console.error("GET /api/admin/notifications/check error:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to check admin notifications" },
      { status: 500 }
    );
  }
}
