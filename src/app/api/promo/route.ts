import { NextResponse } from "next/server";
import { db } from "@/db";
import { promos } from "@/db/schema";

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
  } catch {
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
}
