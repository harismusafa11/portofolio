import { NextResponse } from "next/server";
import { db } from "@/db";
import { faqs } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

export async function GET() {
  try {
    const list = await db.select().from(faqs).where(eq(faqs.isActive, true)).orderBy(asc(faqs.sortOrder));
    return NextResponse.json(list);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Error fetching FAQs";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
