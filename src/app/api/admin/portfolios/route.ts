import { NextResponse } from "next/server";
import { db } from "@/db";
import { portfolios } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  try {
    const list = await db.select().from(portfolios).orderBy(desc(portfolios.id));
    return NextResponse.json(list);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Error fetching portfolios";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slug, title, category, categoryLabel, description, clientName, techStackJson, imageUrl, liveUrl, isFeatured } = body;

    const inserted = await db
      .insert(portfolios)
      .values({
        slug: slug || `proj-${Date.now()}`,
        title: title || "Judul Proyek Baru",
        category: category || "web",
        categoryLabel: categoryLabel || "Web Development",
        description: description || "",
        clientName: clientName || "Klien Verified",
        techStackJson: typeof techStackJson === "string" ? techStackJson : JSON.stringify(techStackJson || []),
        imageUrl: imageUrl || "/images/portfolio/kopi_hero.png",
        liveUrl: liveUrl || null,
        isFeatured: Boolean(isFeatured),
      })
      .returning();

    return NextResponse.json(inserted[0]);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Error creating portfolio";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, slug, title, category, categoryLabel, description, clientName, techStackJson, imageUrl, liveUrl, isFeatured } = body;

    if (!id) return NextResponse.json({ error: "Missing portfolio ID" }, { status: 400 });

    const updated = await db
      .update(portfolios)
      .set({
        slug,
        title,
        category,
        categoryLabel,
        description,
        clientName,
        techStackJson: typeof techStackJson === "string" ? techStackJson : JSON.stringify(techStackJson || []),
        imageUrl,
        liveUrl,
        isFeatured: Boolean(isFeatured),
      })
      .where(eq(portfolios.id, Number(id)))
      .returning();

    return NextResponse.json(updated[0]);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Error updating portfolio";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    await db.delete(portfolios).where(eq(portfolios.id, Number(id)));
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Error deleting portfolio";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
