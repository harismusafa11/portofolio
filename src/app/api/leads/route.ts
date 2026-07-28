import { NextResponse } from "next/server";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { sendTelegramAlert } from "@/lib/telegram";

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

    // Trigger Telegram push alert to Haris Musafa's phone
    const teleMsg = `<b>💬 LOG PESAN / KONSULTASI WA MASUK!</b>
━━━━━━━━━━━━━━━━━━━━━━━
<b>Nama Klien:</b> ${name || "Pengunjung Website"}
<b>Kota/Lokasi:</b> ${city || "Indonesia"}
<b>Layanan/Voucher:</b> ${packageTitle || "Paket Custom"}
<b>Catatan:</b> ${notes || "-"}

👉 <b>Cek Admin Panel:</b> https://arjunadev.com/secure-portal-admin`;

    sendTelegramAlert(teleMsg).catch(() => {});

    return NextResponse.json(newLead[0]);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Error logging lead";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
