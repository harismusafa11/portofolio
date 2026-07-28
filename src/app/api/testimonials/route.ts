import { NextResponse } from "next/server";
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const list = await db.select().from(testimonials).where(eq(testimonials.isActive, true));
    return NextResponse.json(list);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Error fetching testimonials";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
