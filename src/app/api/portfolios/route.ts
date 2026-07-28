import { NextResponse } from "next/server";
import { db } from "@/db";
import { portfolios } from "@/db/schema";
import { asc } from "drizzle-orm";

export async function GET() {
  try {
    const list = await db.select().from(portfolios).orderBy(asc(portfolios.id));
    return NextResponse.json(list);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Error fetching portfolios";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
