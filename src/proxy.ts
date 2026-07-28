import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || "arjunadev_super_secret_jwt_key_2026_x89a17f"
);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Allow public static assets and non-admin routes
  const isAdminRoute = pathname.startsWith("/secure-portal-admin");
  const isAdminApiRoute = pathname.startsWith("/api/admin");

  if (!isAdminRoute && !isAdminApiRoute) {
    return NextResponse.next();
  }

  // 2. Allow login endpoints without authentication
  if (pathname === "/secure-portal-admin/login" || pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  // 3. Verify session token for protected admin pages and APIs
  const token = request.cookies.get("admin_session")?.value;

  if (!token) {
    if (isAdminApiRoute) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/secure-portal-admin/login", request.url));
  }

  try {
    await jwtVerify(token, JWT_SECRET);
    return NextResponse.next();
  } catch {
    if (isAdminApiRoute) {
      return NextResponse.json({ error: "Invalid or expired session" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/secure-portal-admin/login", request.url));
  }
}

export const config = {
  matcher: ["/secure-portal-admin/:path*", "/api/admin/:path*"],
};
