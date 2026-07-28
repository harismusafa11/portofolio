import { NextResponse } from "next/server";
import { db } from "@/db";
import { blogs } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  try {
    const list = await db.select().from(blogs).orderBy(desc(blogs.createdAt));
    return NextResponse.json(list);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Error fetching blogs";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slug, title, category, readTime, author, summary, contentJson, imageUrl, isPublished } = body;

    const inserted = await db
      .insert(blogs)
      .values({
        slug: slug || `article-${Date.now()}`,
        title: title || "Judul Artikel Baru",
        category: category || "Strategi Bisnis",
        readTime: readTime || "3 Menit Baca",
        author: author || "Haris Musafa",
        summary: summary || "",
        contentJson: typeof contentJson === "string" ? contentJson : JSON.stringify(contentJson || {}),
        imageUrl: imageUrl || "/images/blog/umkm_website_2026.png",
        isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
      })
      .returning();

    return NextResponse.json(inserted[0]);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Error creating blog";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, slug, title, category, readTime, author, summary, contentJson, imageUrl, isPublished } = body;

    if (!id) return NextResponse.json({ error: "Missing article ID" }, { status: 400 });

    const updated = await db
      .update(blogs)
      .set({
        slug,
        title,
        category,
        readTime,
        author,
        summary,
        contentJson: typeof contentJson === "string" ? contentJson : JSON.stringify(contentJson || {}),
        imageUrl,
        isPublished: Boolean(isPublished),
      })
      .where(eq(blogs.id, Number(id)))
      .returning();

    return NextResponse.json(updated[0]);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Error updating blog";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    await db.delete(blogs).where(eq(blogs.id, Number(id)));
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Error deleting blog";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
