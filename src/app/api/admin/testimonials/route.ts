import { NextResponse } from "next/server";
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const list = await db.select().from(testimonials);
    return NextResponse.json(list);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Error fetching testimonials";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { clientName, clientRole, company, metric, review, category, avatarUrl, isActive } = body;

    const inserted = await db
      .insert(testimonials)
      .values({
        clientName: clientName || "Klien Verified",
        clientRole: clientRole || "Owner",
        company: company || "Perusahaan Klien",
        metric: metric || "Satisfaction 100%",
        review: review || "",
        category: category || "landing",
        avatarUrl: avatarUrl || null,
        isActive: isActive !== undefined ? Boolean(isActive) : true,
      })
      .returning();

    return NextResponse.json(inserted[0]);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Error creating testimonial";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, clientName, clientRole, company, metric, review, category, avatarUrl, isActive } = body;

    if (!id) return NextResponse.json({ error: "Missing testimonial ID" }, { status: 400 });

    const updated = await db
      .update(testimonials)
      .set({
        clientName,
        clientRole,
        company,
        metric,
        review,
        category,
        avatarUrl,
        isActive: Boolean(isActive),
      })
      .where(eq(testimonials.id, Number(id)))
      .returning();

    return NextResponse.json(updated[0]);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Error updating testimonial";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    await db.delete(testimonials).where(eq(testimonials.id, Number(id)));
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Error deleting testimonial";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
