import { NextResponse } from "next/server";
import { db } from "@/db";
import { services } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

export async function GET() {
  try {
    const list = await db.select().from(services).where(eq(services.isActive, true)).orderBy(asc(services.priceMin));
    return NextResponse.json(list);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Error fetching services";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
