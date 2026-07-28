"use client";

import React, { useState, useEffect } from "react";
import { DesktopEnvironment } from "@/components/desktop/DesktopEnvironment";
import { AndroidEnvironment } from "@/components/mobile/AndroidEnvironment";
import { PromoModal } from "@/components/modals/PromoModal";
import { VisitorTracker } from "@/components/VisitorTracker";
import { useWindowStore } from "@/store/windowStore";

interface MainEnvironmentProps {
  initialApp?: string;
}

export const MainEnvironment: React.FC<MainEnvironmentProps> = ({ initialApp }) => {
  const [isMobileMode, setIsMobileMode] = useState<boolean | null>(null);
  const openWindow = useWindowStore((state) => state.openWindow);
  const focusWindow = useWindowStore((state) => state.focusWindow);

  // Initial App Deep Linking & Popstate URL Sync
  useEffect(() => {
    let targetApp = initialApp;

    if (!targetApp && typeof window !== "undefined") {
      const path = window.location.pathname.replace(/^\//, "").toLowerCase();
      if (path && ["about", "services", "portfolio", "blog", "faq", "contact", "terminal", "settings"].includes(path)) {
        targetApp = path;
      }
    }

    if (targetApp) {
      openWindow(targetApp);
      focusWindow(targetApp);
    }

    const handlePopState = () => {
      if (typeof window !== "undefined") {
        const path = window.location.pathname.replace(/^\//, "").toLowerCase();
        if (path && ["about", "services", "portfolio", "blog", "faq", "contact", "terminal", "settings"].includes(path)) {
          openWindow(path);
          focusWindow(path);
        }
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [initialApp]);

  useEffect(() => {
    const checkIsMobile = () => {
      const mobileWidth = window.innerWidth < 768;
      const mobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      return mobileWidth || mobileUA;
    };

    setIsMobileMode(checkIsMobile());

    const handleResize = () => {
      setIsMobileMode(checkIsMobile());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobileMode === null) {
    return (
      <div className="w-screen h-screen bg-[#0a0a0a] flex items-center justify-center text-gray-400 font-mono text-xs">
        Initializing Arjuna OS...
      </div>
    );
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <VisitorTracker />
      <PromoModal />
      {isMobileMode ? <AndroidEnvironment /> : <DesktopEnvironment />}
    </div>
  );
};
