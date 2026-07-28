import { NextResponse } from "next/server";
import { db } from "@/db";
import { visitorLogs } from "@/db/schema";
import { desc, gte } from "drizzle-orm";

export async function GET() {
  try {
    const threeMinutesAgo = new Date(Date.now() - 3 * 60 * 1000);

    // 1. Fetch active online visitors (last ping within 3 mins)
    const activeVisitors = await db
      .select()
      .from(visitorLogs)
      .where(gte(visitorLogs.lastPingAt, threeMinutesAgo));

    // 2. Fetch all visitor logs for statistics
    const allLogs = await db
      .select()
      .from(visitorLogs)
      .orderBy(desc(visitorLogs.lastPingAt))
      .limit(100);

    // Calculate Desktop vs Mobile breakdown
    let desktopCount = 0;
    let mobileCount = 0;
    const pageCounts: Record<string, number> = {};

    allLogs.forEach((log) => {
      if (log.deviceType === "mobile") {
        mobileCount++;
      } else {
        desktopCount++;
      }

      const p = log.pagePath || "/";
      pageCounts[p] = (pageCounts[p] || 0) + 1;
    });

    const totalLogs = allLogs.length;
    const desktopPercent = totalLogs > 0 ? Math.round((desktopCount / totalLogs) * 100) : 50;
    const mobilePercent = totalLogs > 0 ? Math.round((mobileCount / totalLogs) * 100) : 50;

    // Format top visited pages
    const topPages = Object.entries(pageCounts)
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return NextResponse.json({
      activeCount: activeVisitors.length,
      totalPageViews: totalLogs,
      deviceBreakdown: {
        desktopCount,
        mobileCount,
        desktopPercent,
        mobilePercent,
      },
      topPages,
      recentPings: allLogs.slice(0, 15),
    });
  } catch (err) {
    console.error("Admin analytics error:", err);
    return NextResponse.json(
      {
        activeCount: 1,
        totalPageViews: 1,
        deviceBreakdown: { desktopCount: 1, mobileCount: 0, desktopPercent: 100, mobilePercent: 0 },
        topPages: [{ path: "/", count: 1 }],
        recentPings: [],
      },
      { status: 500 }
    );
  }
}
