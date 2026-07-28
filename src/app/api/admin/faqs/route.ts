import { NextResponse } from "next/server";
import { db } from "@/db";
import { faqs } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

export async function GET() {
  try {
    const list = await db.select().from(faqs).orderBy(asc(faqs.sortOrder));
    return NextResponse.json(list);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Error fetching FAQs";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { faqId, category, question, answer, sortOrder, isActive } = body;

    const inserted = await db
      .insert(faqs)
      .values({
        faqId: faqId || `faq-${Date.now()}`,
        category: category || "Umum",
        question: question || "Pertanyaan Baru?",
        answer: answer || "Jawaban...",
        sortOrder: Number(sortOrder) || 0,
        isActive: isActive !== undefined ? Boolean(isActive) : true,
      })
      .returning();

    return NextResponse.json(inserted[0]);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Error creating FAQ";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, faqId, category, question, answer, sortOrder, isActive } = body;

    if (!id) return NextResponse.json({ error: "Missing FAQ ID" }, { status: 400 });

    const updated = await db
      .update(faqs)
      .set({
        faqId,
        category,
        question,
        answer,
        sortOrder: Number(sortOrder),
        isActive: Boolean(isActive),
      })
      .where(eq(faqs.id, Number(id)))
      .returning();

    return NextResponse.json(updated[0]);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Error updating FAQ";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    await db.delete(faqs).where(eq(faqs.id, Number(id)));
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Error deleting FAQ";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
