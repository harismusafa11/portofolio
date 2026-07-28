"use client";

import React, { useEffect, memo } from "react";
import { useWindowStore } from "@/store/windowStore";
import { soundEngine } from "@/utils/soundEngine";
import { Wallpaper } from "./Wallpaper";
import { DesktopIcon } from "./DesktopIcon";
import { ContextMenu } from "./ContextMenu";
import { MarqueeSelect } from "./MarqueeSelect";
import { Taskbar } from "../taskbar/Taskbar";
import { WindowFrame } from "../windows/WindowFrame";
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
import { LockScreen } from "./LockScreen";
import { WidgetsPanel } from "./WidgetsPanel";
import { ToastNotification } from "./ToastNotification";
import { TaskSwitcher } from "./TaskSwitcher";
import { HeroWelcomeBanner } from "./HeroWelcomeBanner";

import {
  CreditCard,
  Briefcase,
  Folder,
  TrendingUp,
  PhoneCall,
  ChevronRight,
  Zap,
} from "lucide-react";

// 1. PRIMARY CORE BUSINESS APPS (Primer — Hero Cards)
const PRIMARY_BUSINESS_APPS = [
  {
    id: "order_wizard",
    title: "Order Website",
    subtitle: "Form Pemesanan & DP 50%",
    badge: "⚡ INSTANT ORDER",
    icon: CreditCard,
    accentBorder: "border-emerald-500/40 hover:border-emerald-400 bg-emerald-500/10 shadow-emerald-500/10",
    textAccent: "text-emerald-400",
    badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  },
  {
    id: "services",
    title: "Services & Pricing",
    subtitle: "Pilihan Paket & Fitur",
    badge: "🚀 POPULAR",
    icon: Briefcase,
    accentBorder: "border-sky-500/40 hover:border-sky-400 bg-sky-500/10 shadow-sky-500/10",
    textAccent: "text-sky-400",
    badgeBg: "bg-sky-500/20 text-sky-300 border-sky-500/30",
  },
  {
    id: "portfolio",
    title: "Portfolio Explorer",
    subtitle: "Bukti Karya & Live Demo",
    badge: "PROOF OF WORK",
    icon: Folder,
    accentBorder: "border-blue-500/40 hover:border-blue-400 bg-blue-500/10 shadow-blue-500/10",
    textAccent: "text-blue-400",
    badgeBg: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  },
  {
    id: "project_tracker",
    title: "Tracking Proyek",
    subtitle: "Dashboard Status Progress",
    badge: "🟢 LIVE TRACKER",
    icon: TrendingUp,
    accentBorder: "border-indigo-500/40 hover:border-indigo-400 bg-indigo-500/10 shadow-indigo-500/10",
    textAccent: "text-indigo-400",
    badgeBg: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  },
  {
    id: "contact",
    title: "Contact Direct WA",
    subtitle: "Konsultasi Haris Musafa",
    badge: "FAST RESPONSE",
    icon: PhoneCall,
    accentBorder: "border-teal-500/40 hover:border-teal-400 bg-teal-500/10 shadow-teal-500/10",
    textAccent: "text-teal-400",
    badgeBg: "bg-teal-500/20 text-teal-300 border-teal-500/30",
  },
];

// 2. SECONDARY UTILITY APPS (Sekunder — Compact Grid)
const SECONDARY_UTILITY_SHORTCUTS = [
  { id: "about", title: "About_Me.exe", iconName: "FileText" },
  { id: "blog", title: "Blog_&_Insights.exe", iconName: "BookOpen" },
  { id: "faq", title: "FAQ_Help.exe", iconName: "HelpCircle" },
  { id: "livechat", title: "LiveChat_Realtime.exe", iconName: "MessageSquare" },
  { id: "terminal", title: "Terminal_CMD.exe", iconName: "Terminal" },
  { id: "paint", title: "Paint_Notes.exe", iconName: "Brush" },
  { id: "taskmanager", title: "Task_Manager.exe", iconName: "Activity" },
  { id: "settings", title: "Settings.exe", iconName: "Settings" },
];

export const DesktopEnvironment: React.FC = memo(function DesktopEnvironment() {
  const soundEnabled = useWindowStore((state) => state.soundEnabled);
  const selectDesktopIcon = useWindowStore((state) => state.selectDesktopIcon);
  const openWindow = useWindowStore((state) => state.openWindow);
  const focusWindow = useWindowStore((state) => state.focusWindow);

  // Play startup sound on initial page mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (soundEnabled) {
        soundEngine.playStartup();
      }
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleLaunchApp = (id: string) => {
    selectDesktopIcon(null);
    openWindow(id);
    focusWindow(id);
  };

  return (
    <div
      id="desktop-area"
      onClick={() => selectDesktopIcon(null)}
      className="relative w-screen h-screen overflow-hidden select-none font-sans bg-[#0a0a0a]"
    >
      {/* Windows 11 Lock Screen Overlay */}
      <LockScreen />

      {/* Windows 11 Alt+Tab Task View Overlay */}
      <TaskSwitcher />

      {/* Background Wallpaper */}
      <Wallpaper />

      {/* Hero Welcome Banner floating on top center */}
      <HeroWelcomeBanner />

      {/* Marquee Drag Selection Box */}
      <MarqueeSelect />

      {/* Right Click Context Menu */}
      <ContextMenu />

      {/* Windows 11 Left Widgets Panel */}
      <WidgetsPanel />

      {/* Windows Action Center Toast Notifications */}
      <ToastNotification />

      {/* Dual-Zone Desktop Shortcuts Area */}
      <div className="absolute top-4 left-4 z-10 space-y-4 max-w-xl pointer-events-auto max-h-[calc(100vh-85px)] overflow-y-auto custom-scrollbar p-1">
        
        {/* ZONA 1: PRIMARY BUSINESS SUITE (HERO CARDS) */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-sky-400 flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-amber-400" />
              <span>✦ LAYANAN &amp; ORDER UTAMA (PRIMER)</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {PRIMARY_BUSINESS_APPS.map((app) => {
              const AppIcon = app.icon;
              return (
                <button
                  key={app.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLaunchApp(app.id);
                  }}
                  className={`p-3.5 rounded-2xl border backdrop-blur-xl transition-all duration-200 cursor-pointer text-left group hover:scale-[1.02] shadow-lg flex items-center justify-between ${app.accentBorder}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-10 h-10 rounded-xl bg-black/40 border border-white/20 flex items-center justify-center ${app.textAccent} shrink-0 group-hover:scale-110 transition-transform`}>
                      <AppIcon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-white truncate">{app.title}</span>
                      </div>
                      <p className="text-[10px] text-gray-300 font-mono mt-0.5 truncate">{app.subtitle}</p>
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[9px] font-mono font-bold border ${app.badgeBg}`}>
                        {app.badge}
                      </span>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION DIVIDER LINE */}
        <div className="py-1 flex items-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <span className="text-[10px] font-mono font-bold text-gray-400 tracking-[0.25em] uppercase">
            ─────── ✦ APLIKASI UTILITY &amp; OS TOOLS ───────
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        {/* ZONA 2: SECONDARY UTILITY SUITE (COMPACT SHORTCUTS) */}
        <div className="space-y-2">
          <div className="grid grid-cols-4 gap-2">
            {SECONDARY_UTILITY_SHORTCUTS.map((sc) => (
              <DesktopIcon key={sc.id} id={sc.id} title={sc.title} iconName={sc.iconName} />
            ))}
          </div>
        </div>

      </div>

      {/* Active Windows Stack */}
      <WindowFrame id="about">
        <AboutApp />
      </WindowFrame>

      <WindowFrame id="order_wizard">
        <OrderWizardApp />
      </WindowFrame>

      <WindowFrame id="project_tracker">
        <ProjectTrackerApp />
      </WindowFrame>

      <WindowFrame id="livechat">
        <LiveChatApp />
      </WindowFrame>

      <WindowFrame id="taskmanager">
        <TaskManagerApp />
      </WindowFrame>

      <WindowFrame id="paint">
        <PaintApp />
      </WindowFrame>

      <WindowFrame id="services">
        <ServicesApp />
      </WindowFrame>

      <WindowFrame id="portfolio">
        <PortfolioApp />
      </WindowFrame>

      <WindowFrame id="blog">
        <BlogApp />
      </WindowFrame>

      <WindowFrame id="faq">
        <FaqApp />
      </WindowFrame>

      <WindowFrame id="contact">
        <ContactApp />
      </WindowFrame>

      <WindowFrame id="terminal">
        <TerminalApp />
      </WindowFrame>

      <WindowFrame id="settings">
        <SettingsApp />
      </WindowFrame>

      {/* Bottom Taskbar Navigation */}
      <Taskbar />
    </div>
  );
});
