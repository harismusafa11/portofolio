import { NextResponse } from "next/server";
import { db } from "@/db";
import { promos } from "@/db/schema";
import { eq } from "drizzle-orm";

// GET promo data
export async function GET() {
  try {
    const list = await db.select().from(promos).limit(1);
    if (list.length === 0) {
      return NextResponse.json({
        id: 1,
        title: "Voucher Diskon Rp 500.000 + Free Domain .COM!",
        badgeText: "PROMO SPESIAL PERDANA",
        discountAmount: 500000,
        originalPrice: 1999000,
        promoPrice: 1499000,
        slotsRemaining: 2,
        isActive: true,
      });
    }
    return NextResponse.json(list[0]);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Error fetching promo";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// PUT / POST update promo data
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { serviceId, title, badgeText, discountAmount, originalPrice, promoPrice, slotsRemaining, isActive } = body;

    const list = await db.select().from(promos).limit(1);
    if (list.length === 0) {
      const inserted = await db
        .insert(promos)
        .values({
          serviceId: serviceId || "basic",
          title: title || "Voucher Diskon Rp 500.000 + Free Domain .COM!",
          badgeText: badgeText || "PROMO SPESIAL PERDANA",
          discountAmount: Number(discountAmount) || 500000,
          originalPrice: Number(originalPrice) || 1999000,
          promoPrice: Number(promoPrice) || 1499000,
          slotsRemaining: Number(slotsRemaining) || 2,
          isActive: isActive !== undefined ? Boolean(isActive) : true,
        })
        .returning();
      return NextResponse.json(inserted[0]);
    }

    const updated = await db
      .update(promos)
      .set({
        serviceId: serviceId || list[0].serviceId || "basic",
        title: title || list[0].title,
        badgeText: badgeText || list[0].badgeText,
        discountAmount: discountAmount !== undefined ? Number(discountAmount) : list[0].discountAmount,
        originalPrice: originalPrice !== undefined ? Number(originalPrice) : list[0].originalPrice,
        promoPrice: promoPrice !== undefined ? Number(promoPrice) : list[0].promoPrice,
        slotsRemaining: slotsRemaining !== undefined ? Number(slotsRemaining) : list[0].slotsRemaining,
        isActive: isActive !== undefined ? Boolean(isActive) : list[0].isActive,
        updatedAt: new Date(),
      })
      .where(eq(promos.id, list[0].id))
      .returning();

    return NextResponse.json(updated[0]);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Error updating promo";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
