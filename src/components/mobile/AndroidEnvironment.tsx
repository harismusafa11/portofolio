"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wifi,
  Battery,
  Signal,
  Search,
  Mic,
  ArrowLeft,
  FileText,
  Briefcase,
  Folder,
  PhoneCall,
  Terminal,
  Settings,
  BookOpen,
  HelpCircle,
  LucideIcon,
  Sun,
  Laptop,
  ChevronUp,
  Volume2,
  Bell,
  Check,
  Palette,
  Tag,
  ArrowRight,
  CreditCard,
  TrendingUp,
  Home,
  ChevronRight,
  Zap,
} from "lucide-react";
import { useWindowStore, WallpaperType } from "@/store/windowStore";
import { soundEngine } from "@/utils/soundEngine";
import { WhatsAppLogo, InstagramLogo } from "@/components/icons/BrandIcons";
import { Wallpaper } from "../desktop/Wallpaper";
import { Activity, Brush } from "lucide-react";
import { AboutApp } from "../apps/AboutApp";
import { ServicesApp } from "../apps/ServicesApp";
import { PortfolioApp } from "../apps/PortfolioApp";
import { BlogApp } from "../apps/BlogApp";
import { FaqApp } from "../apps/FaqApp";
import { ContactApp } from "../apps/ContactApp";
import { TerminalApp } from "../apps/TerminalApp";
import { SettingsApp } from "../apps/SettingsApp";
import { TaskManagerApp } from "../apps/TaskManagerApp";
import { PaintApp } from "../apps/PaintApp";
import { LiveChatApp } from "../apps/LiveChatApp";
import { OrderWizardApp } from "../apps/OrderWizardApp";
import { ProjectTrackerApp } from "../apps/ProjectTrackerApp";
import { MessageSquare } from "lucide-react";

const APP_ICONS: Record<string, LucideIcon> = {
  about: FileText,
  livechat: MessageSquare,
  taskmanager: Activity,
  paint: Brush,
  services: Briefcase,
  portfolio: Folder,
  order_wizard: CreditCard,
  project_tracker: TrendingUp,
  blog: BookOpen,
  faq: HelpCircle,
  contact: PhoneCall,
  terminal: Terminal,
  settings: Settings,
};

const APP_GRADIENTS: Record<string, string> = {
  about: "from-[#107c41] to-[#044e26]",
  livechat: "from-[#0284c7] to-[#0369a1]",
  taskmanager: "from-blue-600 to-cyan-800",
  paint: "from-purple-500 to-pink-600",
  services: "from-[#f59e0b] to-[#d97706]",
  portfolio: "from-[#3b82f6] to-[#1d4ed8]",
  order_wizard: "from-emerald-500 to-teal-700",
  project_tracker: "from-sky-500 to-indigo-700",
  blog: "from-[#0284c7] to-[#0369a1]",
  faq: "from-[#8b5cf6] to-[#6d28d9]",
  contact: "from-[#10b981] to-[#059669]",
  terminal: "from-[#7c3aed] to-[#5b21b6]",
  settings: "from-[#64748b] to-[#334155]",
};

const APP_NAMES: Record<string, string> = {
  about: "About Me",
  livechat: "Live Chat",
  taskmanager: "Task Manager",
  paint: "Paint Notes",
  services: "Services",
  portfolio: "Portfolio",
  order_wizard: "Order Website",
  project_tracker: "Tracking Proyek",
  blog: "Blog",
  faq: "FAQ",
  contact: "Contact",
  terminal: "Terminal",
  settings: "Settings",
};

const WALLPAPER_LIST: { id: WallpaperType; name: string; previewColor: string }[] = [
  { id: "bloom-dark", name: "Midnight Slate", previewColor: "from-blue-950 to-slate-950" },
  { id: "bloom-light", name: "Pearl Light", previewColor: "from-sky-200 to-indigo-100" },
  { id: "sunset-glow", name: "Sunset Amber", previewColor: "from-amber-700 to-purple-950" },
  { id: "emerald-forest", name: "Emerald Mint", previewColor: "from-emerald-800 to-slate-950" },
  { id: "retro-xp", name: "Retro XP Bliss", previewColor: "from-blue-600 to-green-600" },
  { id: "cyberpunk-blueprint", name: "Cyberpunk Blueprint", previewColor: "from-sky-900 to-slate-950" },
];

interface AndroidEnvironmentProps {
  onSwitchToDesktop?: () => void;
}

export const AndroidEnvironment: React.FC<AndroidEnvironmentProps> = ({ onSwitchToDesktop }) => {
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const [isQuickSettingsOpen, setIsQuickSettingsOpen] = useState(false);
  const [timeStr, setTimeStr] = useState("");
  const [dateStr, setDateStr] = useState("");

  const wallpaper = useWindowStore((state) => state.wallpaper);
  const setWallpaper = useWindowStore((state) => state.setWallpaper);
  const soundEnabled = useWindowStore((state) => state.soundEnabled);
  const windows = useWindowStore((state) => state.windows);
  const openWindow = useWindowStore((state) => state.openWindow);
  const closeWindow = useWindowStore((state) => state.closeWindow);

  // Sync window store states with mobile activeApp state based on highest zIndex with stable tie-breaker
  useEffect(() => {
    const validMobileApps = Object.keys(APP_ICONS);
    const openWindows = Object.values(windows).filter(
      (w) => w.isOpen && validMobileApps.includes(w.id)
    );

    if (openWindows.length === 0) {
      setActiveApp((prev) => (prev !== null ? null : prev));
      return;
    }

    openWindows.sort((a, b) => {
      const diff = (b.zIndex || 0) - (a.zIndex || 0);
      if (diff !== 0) return diff;
      return a.id.localeCompare(b.id);
    });

    const topAppId = openWindows[0].id;
    setActiveApp((prev) => (prev !== topAppId ? topAppId : prev));
  }, [windows]);

  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
      setDateStr(
        now.toLocaleDateString("id-ID", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenApp = (id: string) => {
    if (soundEnabled) soundEngine.playClick();
    openWindow(id);
  };

  const handleCloseApp = () => {
    if (soundEnabled) soundEngine.playClick();
    if (activeApp) {
      closeWindow(activeApp);
    }
  };

  const isLightWallpaper = wallpaper === "bloom-light";

  // Touch Swipe Notification Down Handler
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    touchStartRef.current = { x: clientX, y: clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (!touchStartRef.current) return;
    const clientY = "changedTouches" in e ? e.changedTouches[0].clientY : e.clientY;
    const deltaY = clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    if (deltaY > 60) {
      if (soundEnabled) soundEngine.playClick();
      setIsQuickSettingsOpen(true);
    }
  };

  return (
    <div className="relative w-screen h-[100dvh] overflow-hidden select-none font-sans bg-black flex flex-col justify-between">
      {/* Background Wallpaper */}
      <Wallpaper />

      {/* Top Status Bar (Swipe Down Trigger Area) */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseUp={handleTouchEnd}
        className="w-full h-7 sm:h-8 px-4 flex items-center justify-between z-30 shrink-0 cursor-pointer text-xs font-semibold"
      >
        <div className="flex items-center gap-2">
          <span className={isLightWallpaper ? "text-gray-900" : "text-white"}>
            {timeStr || "12:00"}
          </span>
          <span className="text-[9px] px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-400 font-mono">
            5G
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Signal className={`w-3.5 h-3.5 ${isLightWallpaper ? "text-gray-900" : "text-white"}`} />
          <Wifi className={`w-3.5 h-3.5 ${isLightWallpaper ? "text-gray-900" : "text-white"}`} />
          <Battery className={`w-4 h-4 ${isLightWallpaper ? "text-gray-900" : "text-white"}`} />
        </div>
      </div>

      {/* Slide-Down Android Quick Settings & Notification Shade Overlay */}
      <AnimatePresence>
        {isQuickSettingsOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl p-5 flex flex-col justify-between text-gray-100 select-none border-b border-white/10"
          >
            {/* Shade Top Header */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-black">{timeStr || "12:00"}</span>
                <span className="text-xs font-mono text-gray-400">{dateStr}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const nextIndex = (WALLPAPER_LIST.findIndex((w) => w.id === wallpaper) + 1) % WALLPAPER_LIST.length;
                    setWallpaper(WALLPAPER_LIST[nextIndex].id);
                  }}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-200"
                  title="Ganti Wallpaper"
                >
                  <Palette className="w-4 h-4 text-sky-400" />
                </button>
              </div>
            </div>

            {/* Android Quick Tiles Grid */}
            <div className="grid grid-cols-2 gap-3 my-4">
              <div className="p-3.5 rounded-2xl bg-sky-600 text-white flex items-center gap-3 shadow">
                <Wifi className="w-5 h-5 shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate">Wi-Fi</div>
                  <div className="text-[10px] text-sky-100 truncate">Arjuna5G_Fast</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#202738] text-gray-200 flex items-center gap-3 border border-white/10">
                <Sun className="w-5 h-5 text-amber-400 shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate">Kecerahan</div>
                  <div className="text-[10px] text-gray-400 truncate">Otomatis (100%)</div>
                </div>
              </div>

              <a
                href="https://wa.me/6285693366142"
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-2 p-3.5 rounded-2xl bg-[#25D366] text-white flex items-center justify-center gap-3 shadow"
              >
                <WhatsAppLogo className="w-5 h-5 shrink-0 text-white" />
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate">Direct WA Consultation</div>
                  <div className="text-[10px] text-emerald-100 truncate">Hubungi Haris Musafa untuk Proyek & Konsultasi</div>
                </div>
              </a>
            </div>

            {/* Drag Handle Pull Bar to Close */}
            <div
              onClick={() => setIsQuickSettingsOpen(false)}
              className="w-full py-2 flex flex-col items-center justify-center gap-1 cursor-pointer group border-t border-white/10 mt-1"
            >
              <div className="w-16 h-1 rounded-full bg-white/40 group-hover:bg-white/80 transition-colors" />
              <div className="flex items-center gap-1 text-[10px] font-mono text-gray-400">
                <ChevronUp className="w-3 h-3 text-sky-400" />
                <span>Geser ke atas untuk menutup</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 relative z-10 overflow-hidden flex flex-col justify-between py-1 px-3 sm:py-3 sm:px-4 max-w-md mx-auto w-full">
        {/* Top Material You Clock & Weather Widget */}
        <div className="mt-1 sm:mt-2 flex flex-col items-center justify-center text-center shrink-0">
          <div className={`text-4xl sm:text-5xl font-black tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] ${isLightWallpaper ? "text-gray-900 drop-shadow-sm" : "text-white"}`}>
            {timeStr || "12:00"}
          </div>
          <div className={`text-[10px] sm:text-xs font-semibold mt-0.5 uppercase tracking-wider font-mono ${isLightWallpaper ? "text-sky-800" : "text-sky-300"}`}>
            {dateStr || "Jumat, 24 Juli"} &bull; Jakarta 29°C
          </div>

          {/* Google Search Bar Widget */}
          <div className={`w-full max-w-xs sm:max-w-sm mt-2.5 px-3 py-1.5 sm:py-2 rounded-full backdrop-blur-xl border shadow-lg flex items-center justify-between text-[11px] ${
            isLightWallpaper ? "bg-white/60 border-black/10 text-gray-900" : "bg-white/10 border-white/20 text-gray-200"
          }`}>
            <div className="flex items-center gap-2 min-w-0">
              <Search className="w-3.5 h-3.5 text-sky-500 shrink-0" />
              <span className={isLightWallpaper ? "text-gray-700 truncate" : "text-gray-300 truncate"}>Cari proyek atau jasa...</span>
            </div>
            <Mic className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          </div>
        </div>

        {/* Dual-Zone Mobile Home Screen Content */}
        <div className="my-auto py-1 max-w-xs sm:max-w-sm mx-auto w-full px-1 z-20 relative pointer-events-auto space-y-3">
          
          {/* SECTION 1: PRIMARY BUSINESS APPS (2-COLUMN HERO CARDS) */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 px-0.5">
              <Zap className="w-3 h-3 text-amber-400" />
              <span className={`text-[9px] font-mono font-extrabold uppercase tracking-wider ${isLightWallpaper ? "text-sky-900" : "text-sky-300"}`}>
                LAYANAN &amp; ORDER UTAMA (PRIMER)
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                {
                  id: "order_wizard",
                  name: "Order Website",
                  sub: "Form & DP 50%",
                  badge: "⚡ INSTANT ORDER",
                  icon: CreditCard,
                  gradient: "from-emerald-500 to-teal-700",
                  badgeClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
                },
                {
                  id: "services",
                  name: "Services & Pricing",
                  sub: "Paket & Fitur",
                  badge: "🚀 POPULAR",
                  icon: Briefcase,
                  gradient: "from-sky-500 to-blue-700",
                  badgeClass: "bg-sky-500/20 text-sky-300 border-sky-500/30",
                },
                {
                  id: "portfolio",
                  name: "Portfolio Explorer",
                  sub: "Bukti Karya Demo",
                  badge: "PROOF OF WORK",
                  icon: Folder,
                  gradient: "from-blue-500 to-indigo-700",
                  badgeClass: "bg-blue-500/20 text-blue-300 border-blue-500/30",
                },
                {
                  id: "project_tracker",
                  name: "Tracking Proyek",
                  sub: "Status Progress",
                  badge: "🟢 LIVE TRACKER",
                  icon: TrendingUp,
                  gradient: "from-indigo-500 to-purple-700",
                  badgeClass: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
                },
                {
                  id: "contact",
                  name: "Contact Direct WA",
                  sub: "Konsultasi Haris",
                  badge: "FAST RESPONSE",
                  icon: PhoneCall,
                  gradient: "from-teal-500 to-emerald-700",
                  badgeClass: "bg-teal-500/20 text-teal-300 border-teal-500/30",
                },
              ].map((pApp) => {
                const PIcon = pApp.icon;
                return (
                  <button
                    key={pApp.id}
                    onClick={() => handleOpenApp(pApp.id)}
                    className="p-2.5 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/20 hover:border-white/40 text-left transition-all active:scale-95 cursor-pointer touch-manipulation flex items-center justify-between group shadow-lg"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <div className={`w-6 h-6 rounded-lg bg-gradient-to-b ${pApp.gradient} flex items-center justify-center text-white shrink-0 shadow-sm`}>
                          <PIcon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[11px] font-extrabold text-white truncate">{pApp.name}</span>
                      </div>
                      <div className="text-[9px] text-gray-300 font-mono mt-0.5 truncate">{pApp.sub}</div>
                      <span className={`inline-block mt-1 px-1.5 py-0.2 rounded text-[8px] font-mono font-bold border ${pApp.badgeClass}`}>
                        {pApp.badge}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION DIVIDER LINE */}
          <div className="py-0.5 flex items-center gap-2">
            <div className="h-px flex-1 bg-white/20" />
            <span className={`text-[8.5px] font-mono font-bold tracking-wider uppercase ${isLightWallpaper ? "text-gray-800" : "text-gray-400"}`}>
              --- APLIKASI PELENGKAP &amp; UTILITY ---
            </span>
            <div className="h-px flex-1 bg-white/20" />
          </div>

          {/* SECTION 2: SECONDARY UTILITY APPS (4-COLUMN COMPACT GRID) */}
          <div className="grid grid-cols-4 gap-2">
            {["about", "blog", "faq", "livechat", "terminal", "paint", "taskmanager", "settings"].map((id) => {
              const Icon = APP_ICONS[id];
              const gradient = APP_GRADIENTS[id];
              const name = APP_NAMES[id];

              return (
                <button
                  key={id}
                  onClick={() => handleOpenApp(id)}
                  className="flex flex-col items-center gap-1 group active:scale-95 transition-transform cursor-pointer relative z-20 touch-manipulation pointer-events-auto"
                >
                  <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-[14px] sm:rounded-[16px] bg-gradient-to-b ${gradient} shadow-lg border border-white/20 flex items-center justify-center text-white shrink-0 group-hover:shadow-xl transition-all`}>
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.75]" />
                  </div>
                  <span className={`text-[8.5px] sm:text-[9px] font-semibold text-center line-clamp-1 max-w-[60px] ${isLightWallpaper ? "text-gray-900 drop-shadow-sm font-bold" : "text-white drop-shadow"}`}>
                    {name}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Bottom Dock Apps Bar */}
        <div className={`w-full max-w-xs sm:max-w-sm mx-auto p-2 sm:p-2.5 rounded-2xl sm:rounded-3xl backdrop-blur-2xl border shadow-2xl flex items-center justify-around shrink-0 mb-1 sm:mb-2 z-20 relative pointer-events-auto ${
          isLightWallpaper ? "bg-black/10 border-black/10" : "bg-white/10 border-white/20"
        }`}>
          <a
            href="https://wa.me/6285693366142"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#25D366] flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform shrink-0 border border-white/20 cursor-pointer"
            title="WhatsApp Direct Contact"
          >
            <WhatsAppLogo className="w-6 h-6 text-white" />
          </a>

          <button
            onClick={() => handleOpenApp("portfolio")}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#0078d4] flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform shrink-0 border border-white/20 cursor-pointer"
            title="Portfolio Explorer"
          >
            <Folder className="w-6 h-6" />
          </button>

          <button
            onClick={() => handleOpenApp("services")}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-amber-500 flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform shrink-0 border border-white/20 cursor-pointer"
            title="Services"
          >
            <Briefcase className="w-6 h-6" />
          </button>

          <a
            href="https://instagram.com/haris_musafa_"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform shrink-0 border border-white/20 cursor-pointer"
            title="Instagram Profile"
          >
            <InstagramLogo className="w-6 h-6 text-white" />
          </a>
        </div>
      </div>

      {/* Full Screen Android App View Overlay */}
      {activeApp && (
        <div className="fixed inset-0 z-50 bg-[#10141e] flex flex-col justify-between text-gray-100 animate-in slide-in-from-bottom duration-200 select-text overflow-hidden">
          {/* Android App Top Header Bar */}
          <div className="px-4 py-3 bg-[#181d2a] border-b border-white/10 flex items-center justify-between shrink-0 shadow z-10">
            <button
              onClick={handleCloseApp}
              className="p-1.5 rounded-xl hover:bg-white/10 text-gray-300 hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 text-sky-400 shrink-0" />
              <span className="text-xs font-bold text-white capitalize truncate">{APP_NAMES[activeApp] || activeApp || "Aplikasi"}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCloseApp}
                className="px-3 py-1.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30 text-xs font-extrabold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-sm"
                title="Kembali ke Menu Utama Mobile"
              >
                <Home className="w-3.5 h-3.5 text-sky-400" />
                <span>Menu Utama</span>
              </button>
            </div>
          </div>

          {/* Android App Active Content Canvas */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-5 custom-scrollbar relative">
            {activeApp === "about" && <AboutApp />}
            {activeApp === "livechat" && <LiveChatApp />}
            {activeApp === "taskmanager" && <TaskManagerApp />}
            {activeApp === "paint" && <PaintApp />}
            {activeApp === "services" && <ServicesApp />}
            {activeApp === "portfolio" && <PortfolioApp />}
            {activeApp === "order_wizard" && <OrderWizardApp />}
            {activeApp === "project_tracker" && <ProjectTrackerApp />}
            {activeApp === "blog" && <BlogApp />}
            {activeApp === "faq" && <FaqApp />}
            {activeApp === "contact" && <ContactApp />}
            {activeApp === "terminal" && <TerminalApp />}
            {activeApp === "settings" && <SettingsApp />}
          </div>

          {/* Android App Bottom Navigation Bar */}
          <div className="h-10 bg-[#121622] border-t border-white/10 flex items-center justify-center shrink-0">
            <button
              onClick={handleCloseApp}
              className="w-32 h-1.5 rounded-full bg-white/40 hover:bg-white/70 transition-colors cursor-pointer"
              title="Android Home Gesture Bar"
            />
          </div>
        </div>
      )}

      {/* Bottom Android Gesture Navigation Bar (When Home Screen) */}
      {!activeApp && (
        <div className={`w-full py-2 backdrop-blur-md flex items-center justify-center z-40 shrink-0 ${
          isLightWallpaper ? "bg-black/10" : "bg-black/30"
        }`}>
          <div className={`w-32 h-1.5 rounded-full ${isLightWallpaper ? "bg-gray-800" : "bg-white/30"}`} />
        </div>
      )}
    </div>
  );
};
