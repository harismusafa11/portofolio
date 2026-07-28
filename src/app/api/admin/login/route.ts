import { NextResponse } from "next/server";
import { db } from "@/db";
import { adminUsers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verifyPassword, signAdminToken, ADMIN_COOKIE_NAME } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email dan password wajib diisi" }, { status: 400 });
    }

    const defaultEmail = process.env.ADMIN_DEFAULT_EMAIL || "admin@arjunadev.com";
    const defaultPass = process.env.ADMIN_DEFAULT_PASSWORD || "Admin2026@";

    let isValid = false;
    let userId = 1;

    // Check DB users
    try {
      const users = await db.select().from(adminUsers).where(eq(adminUsers.email, email.toLowerCase().trim()));
      if (users.length > 0) {
        isValid = await verifyPassword(password, users[0].passwordHash);
        userId = users[0].id;
      } else if (email.toLowerCase().trim() === defaultEmail.toLowerCase() && password === defaultPass) {
        isValid = true;
      }
    } catch {
      // Fallback check env default
      if (email.toLowerCase().trim() === defaultEmail.toLowerCase() && password === defaultPass) {
        isValid = true;
      }
    }

    if (!isValid) {
      return NextResponse.json({ error: "Email atau password admin salah!" }, { status: 401 });
    }

    // Sign JWT token
    const token = await signAdminToken({ email: email.toLowerCase().trim(), id: userId });

    const response = NextResponse.json({ success: true, message: "Login Admin Berhasil" });

    // Set secure HTTP-Only Cookie
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return response;
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Terjadi kesalahan server";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
