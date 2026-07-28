"use client";

import React, { useState, memo } from "react";
import {
  LayoutGrid,
  FileText,
  Briefcase,
  Folder,
  PhoneCall,
  Terminal,
  Settings,
  Volume2,
  VolumeX,
  Wifi,
  Gauge,
  Lock,
  Layers,
  BookOpen,
  HelpCircle,
  Sliders,
  Activity,
  Brush,
  MessageSquare,
  TrendingUp,
} from "lucide-react";
import { useWindowStore } from "@/store/windowStore";
import { SystemClock } from "./SystemClock";
import { StartMenu } from "./StartMenu";
import { QuickSettings } from "./QuickSettings";
import { CalendarDropdown } from "./CalendarDropdown";
import { WhatsAppLogo } from "@/components/icons/BrandIcons";

export const Taskbar: React.FC = memo(function Taskbar() {
  const windows = useWindowStore((state) => state.windows);
  const activeWindowId = useWindowStore((state) => state.activeWindowId);
  const openWindow = useWindowStore((state) => state.openWindow);
  const focusWindow = useWindowStore((state) => state.focusWindow);
  const minimizeWindow = useWindowStore((state) => state.minimizeWindow);
  const toggleStartMenu = useWindowStore((state) => state.toggleStartMenu);
  const toggleQuickSettings = useWindowStore((state) => state.toggleQuickSettings);
  const toggleWidgets = useWindowStore((state) => state.toggleWidgets);
  const toggleCalendar = useWindowStore((state) => state.toggleCalendar);
  const toggleTaskSwitcher = useWindowStore((state) => state.toggleTaskSwitcher);
  const toggleLock = useWindowStore((state) => state.toggleLock);
  const soundEnabled = useWindowStore((state) => state.soundEnabled);

  const [hoveredApp, setHoveredApp] = useState<string | null>(null);

  const appIcons: Record<string, React.ReactNode> = {
    about: <FileText className="w-5 h-5 text-emerald-400" />,
    project_tracker: <TrendingUp className="w-5 h-5 text-emerald-400" />,
    livechat: <MessageSquare className="w-5 h-5 text-sky-400" />,
    taskmanager: <Activity className="w-5 h-5 text-blue-400" />,
    paint: <Brush className="w-5 h-5 text-purple-400" />,
    services: <Briefcase className="w-5 h-5 text-amber-400" />,
    portfolio: <Folder className="w-5 h-5 text-yellow-400" />,
    blog: <BookOpen className="w-5 h-5 text-sky-400" />,
    faq: <HelpCircle className="w-5 h-5 text-purple-400" />,
    contact: <PhoneCall className="w-5 h-5 text-green-400" />,
    terminal: <Terminal className="w-5 h-5 text-purple-400" />,
    settings: <Settings className="w-5 h-5 text-sky-400" />,
  };

  const appActiveColors: Record<string, string> = {
    about: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]",
    project_tracker: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]",
    livechat: "bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]",
    taskmanager: "bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]",
    paint: "bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]",
    services: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]",
    portfolio: "bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.8)]",
    blog: "bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]",
    faq: "bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]",
    contact: "bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]",
    terminal: "bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]",
    settings: "bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]",
  };

  const handleTaskbarClick = (id: string) => {
    const win = windows[id];
    if (!win.isOpen) {
      openWindow(id);
    } else if (activeWindowId === id && !win.isMinimized) {
      minimizeWindow(id);
    } else {
      focusWindow(id);
    }
  };

  return (
    <>
      <StartMenu />
      <QuickSettings />
      <CalendarDropdown />

      <div className="fixed bottom-0 left-0 right-0 z-[9980] h-12 bg-[#181818]/85 backdrop-blur-xl border-t border-white/10 flex items-center justify-between px-3 select-none">
        {/* Left Widgets Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleWidgets}
            className="p-1.5 px-2.5 rounded-md hover:bg-white/10 text-gray-300 hover:text-white transition-all flex items-center gap-2 text-xs border border-transparent hover:border-white/10"
            title="Open Windows Widgets Panel"
          >
            <Gauge className="w-4 h-4 text-emerald-400" />
            <span className="text-[11px] font-semibold text-emerald-300 hidden sm:inline-block">
              Widgets
            </span>
          </button>
        </div>

        {/* Center Icons (Taskbar Pinned & Active Apps) */}
        <div className="flex items-center gap-1.5">
          {/* Start Button with Official Arjuna WebDev Logo */}
          <button
            onClick={toggleStartMenu}
            className="p-1.5 rounded-md hover:bg-white/10 transition-all active:scale-95 flex items-center justify-center"
            title="Start Menu — Arjuna WebDev"
          >
            <img src="/images/logo.png" alt="Arjuna WebDev Logo" className="w-6 h-6 object-contain filter drop-shadow" />
          </button>

          {/* Task View / Alt+Tab Switcher Button */}
          <button
            onClick={toggleTaskSwitcher}
            className="p-2 rounded-md hover:bg-white/10 text-gray-400 hover:text-white transition-all active:scale-95"
            title="Task View (Alt + Tab)"
          >
            <Layers className="w-4.5 h-4.5" />
          </button>

          <div className="h-5 w-[1px] bg-white/10 mx-1" />

          {/* Running & Pinned Window Icons with Hover Preview Tooltips */}
          {Object.values(windows).map((win) => {
            if (win.id === "order_wizard" && !win.isOpen) return null;
            const isActive = activeWindowId === win.id && !win.isMinimized;
            const isOpen = win.isOpen;

            return (
              <div
                key={win.id}
                className="relative"
                onMouseEnter={() => setHoveredApp(win.id)}
                onMouseLeave={() => setHoveredApp(null)}
              >
                <button
                  onClick={() => handleTaskbarClick(win.id)}
                  className={`relative p-2 rounded-md transition-all group hover:bg-white/10 ${
                    isActive ? "bg-white/15 shadow-sm" : ""
                  }`}
                  title={win.title}
                >
                  <div className="transition-transform group-hover:scale-110">
                    {appIcons[win.id]}
                  </div>

                  {isOpen && (
                    <span
                      className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 rounded-full transition-all ${
                        isActive
                          ? `w-4 h-1 ${appActiveColors[win.id] || "bg-sky-400"}`
                          : "w-1.5 h-1 bg-gray-400"
                      }`}
                    />
                  )}
                </button>

                {/* Live Taskbar Hover Preview Tooltip Card */}
                {hoveredApp === win.id && isOpen && (
                  <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-[9999] w-48 p-2.5 rounded-xl bg-[#202020]/95 backdrop-blur-2xl border border-white/20 shadow-2xl flex flex-col gap-1.5 text-xs text-gray-200 animate-in fade-in zoom-in-95 duration-100 pointer-events-none">
                    <div className="flex items-center gap-2 border-b border-white/10 pb-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-[11px] font-bold text-white truncate">{win.title}</span>
                    </div>
                    <div className="h-16 rounded bg-black/40 border border-white/5 flex items-center justify-center text-[10px] font-mono text-sky-300 p-2 text-center">
                      {win.isMinimized ? "Window Minimized" : "Active Running Window"}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right System Tray */}
        <div className="flex items-center gap-2">
          {/* Lock Screen Shortcut */}
          <button
            onClick={toggleLock}
            className="p-1.5 rounded-md hover:bg-white/10 text-amber-400 hover:text-amber-300 transition-all"
            title="Lock Screen"
          >
            <Lock className="w-4 h-4" />
          </button>

          {/* Direct WA Quick Contact */}
          <a
            href="https://wa.me/6285693366142?text=Halo%20Haris%20Musafa,%20saya%20tertarik%20bekerja%20sama."
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-md hover:bg-emerald-500/20 text-emerald-400 transition-all flex items-center gap-1.5 text-xs font-medium border border-emerald-500/20 hidden md:flex"
            title="Chat WhatsApp Direct"
          >
            <WhatsAppLogo className="w-4 h-4" />
            <span>WA Direct</span>
          </a>

          {/* System Control Toggle */}
          <button
            onClick={toggleQuickSettings}
            className="p-1.5 px-2 rounded-md hover:bg-white/10 text-gray-300 hover:text-white transition-all flex items-center gap-2 text-xs border border-transparent hover:border-white/10"
          >
            <Wifi className="w-4 h-4 text-sky-400" />
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-gray-500" />}
          </button>

          {/* Clock & Calendar Trigger */}
          <div
            onClick={toggleCalendar}
            className="px-2 py-1 rounded-md hover:bg-white/10 cursor-pointer transition-colors"
            title="Open Calendar & Agenda"
          >
            <SystemClock />
          </div>
        </div>
      </div>
    </>
  );
});
