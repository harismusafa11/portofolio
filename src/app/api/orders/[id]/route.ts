import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq, desc } from "drizzle-orm";
import * as schema from "@/db/schema";

const databaseUrl =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_PIF2fXtn3yOr@ep-spring-leaf-az5wqh8i-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

// GET /api/orders/[id]
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const sql = neon(databaseUrl);
    const db = drizzle({ client: sql, schema });

    const orderRows = await db
      .select()
      .from(schema.orders)
      .where(eq(schema.orders.id, id));

    if (orderRows.length === 0) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const logs = await db
      .select()
      .from(schema.projectLogs)
      .where(eq(schema.projectLogs.orderId, id))
      .orderBy(desc(schema.projectLogs.createdAt));

    return NextResponse.json({
      order: orderRows[0],
      logs,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to fetch order details" },
      { status: 500 }
    );
  }
}

// PUT /api/orders/[id]
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, receiptUrl, logText } = body;

    const sql = neon(databaseUrl);
    const db = drizzle({ client: sql, schema });

    const updateData: Record<string, any> = { updatedAt: new Date() };
    if (status) updateData.status = status;
    if (receiptUrl) updateData.receiptUrl = receiptUrl;

    await db
      .update(schema.orders)
      .set(updateData)
      .where(eq(schema.orders.id, id));

    if (logText) {
      await db.insert(schema.projectLogs).values({
        orderId: id,
        statusTag: status || "update",
        logText,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Order updated successfully",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to update order" },
      { status: 500 }
    );
  }
}
