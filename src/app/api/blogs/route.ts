import { NextResponse } from "next/server";
import { db } from "@/db";
import { blogs } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  try {
    const list = await db.select().from(blogs).where(eq(blogs.isPublished, true)).orderBy(desc(blogs.createdAt));
    return NextResponse.json(list);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Error fetching blogs";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
