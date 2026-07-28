"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useWindowStore } from "@/store/windowStore";

export const VisitorTracker = () => {
  const pathname = usePathname();
  const activeWindowId = useWindowStore((state) => state.activeWindowId);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Get or generate persistent visitorId
    let visitorId = localStorage.getItem("arjuna_visitor_id");
    if (!visitorId) {
      visitorId = "vis_" + Math.random().toString(36).substring(2, 11) + "_" + Date.now();
      localStorage.setItem("arjuna_visitor_id", visitorId);
    }

    const detectDevice = () => {
      const mobileWidth = window.innerWidth < 768;
      const mobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      return mobileWidth || mobileUA ? "mobile" : "desktop";
    };

    const sendPing = () => {
      const currentPath = activeWindowId ? `App: ${activeWindowId}` : pathname || "/";
      const deviceType = detectDevice();

      fetch("/api/analytics/ping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitorId,
          pagePath: currentPath,
          deviceType,
          city: "Indonesia",
        }),
      }).catch(() => {});
    };

    // Send initial ping immediately
    sendPing();

    // Send periodic ping every 30 seconds to maintain online status
    const interval = setInterval(sendPing, 30000);
    return () => clearInterval(interval);
  }, [pathname, activeWindowId]);

  return null;
};
