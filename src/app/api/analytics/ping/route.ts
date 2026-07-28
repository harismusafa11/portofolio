import { NextResponse } from "next/server";
import { db } from "@/db";
import { visitorLogs } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { visitorId, pagePath, deviceType, city } = body;

    if (!visitorId) {
      return NextResponse.json({ error: "visitorId required" }, { status: 400 });
    }

    const userAgent = req.headers.get("user-agent") || "unknown";
    const path = pagePath || "/";
    const device = deviceType || "desktop";
    const userCity = city || "Indonesia";

    // Check if visitor already exists in logs
    const existing = await db
      .select()
      .from(visitorLogs)
      .where(eq(visitorLogs.visitorId, visitorId))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(visitorLogs)
        .set({
          pagePath: path,
          deviceType: device,
          city: userCity,
          userAgent,
          lastPingAt: new Date(),
        })
        .where(eq(visitorLogs.visitorId, visitorId));
    } else {
      await db.insert(visitorLogs).values({
        visitorId,
        pagePath: path,
        deviceType: device,
        city: userCity,
        userAgent,
        lastPingAt: new Date(),
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error in analytics ping:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
