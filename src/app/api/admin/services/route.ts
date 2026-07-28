import { NextResponse } from "next/server";
import { db } from "@/db";
import { services } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

export async function GET() {
  try {
    const list = await db.select().from(services).orderBy(asc(services.priceMin));
    return NextResponse.json(list);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Error fetching services";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, name, category, priceMin, priceMax, originalPrice, isPromoActive, baseDays, desc, featuresJson, isPopular, isActive } = body;

    const newId = id || `pkg-${Date.now()}`;
    const inserted = await db
      .insert(services)
      .values({
        id: newId,
        name: name || "Paket Layanan Baru",
        category: category || "web",
        priceMin: Number(priceMin) || 1500000,
        priceMax: Number(priceMax) || 2500000,
        originalPrice: originalPrice ? Number(originalPrice) : null,
        isPromoActive: Boolean(isPromoActive),
        baseDays: Number(baseDays) || 4,
        desc: desc || "",
        featuresJson: typeof featuresJson === "string" ? featuresJson : JSON.stringify(featuresJson || []),
        isPopular: Boolean(isPopular),
        isActive: isActive !== undefined ? Boolean(isActive) : true,
      })
      .returning();

    return NextResponse.json(inserted[0]);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Error creating service";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, category, priceMin, priceMax, originalPrice, isPromoActive, baseDays, desc, featuresJson, isPopular, isActive } = body;

    if (!id) return NextResponse.json({ error: "Missing package ID" }, { status: 400 });

    const updated = await db
      .update(services)
      .set({
        name,
        category,
        priceMin: Number(priceMin),
        priceMax: Number(priceMax),
        originalPrice: originalPrice ? Number(originalPrice) : null,
        isPromoActive: Boolean(isPromoActive),
        baseDays: Number(baseDays),
        desc,
        featuresJson: typeof featuresJson === "string" ? featuresJson : JSON.stringify(featuresJson || []),
        isPopular: Boolean(isPopular),
        isActive: Boolean(isActive),
      })
      .where(eq(services.id, id))
      .returning();

    return NextResponse.json(updated[0]);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Error updating service";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    await db.delete(services).where(eq(services.id, id));
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Error deleting service";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
