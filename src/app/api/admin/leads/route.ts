import { NextResponse } from "next/server";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  try {
    const list = await db.select().from(leads).orderBy(desc(leads.createdAt));
    return NextResponse.json(list);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Error fetching leads";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, city, packageTitle, notes } = body;

    const newLead = await db
      .insert(leads)
      .values({
        name: name || "Pengunjung Website",
        city: city || "Indonesia",
        packageTitle: packageTitle || "Paket Custom",
        notes: notes || null,
        status: "pending",
      })
      .returning();

    return NextResponse.json(newLead[0]);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Error logging lead";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
    }

    const updated = await db
      .update(leads)
      .set({ status })
      .where(eq(leads.id, Number(id)))
      .returning();

    return NextResponse.json(updated[0]);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Error updating lead status";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    await db.delete(leads).where(eq(leads.id, Number(id)));
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Error deleting lead";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
