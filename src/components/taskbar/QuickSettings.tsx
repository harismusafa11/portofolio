"use client";

import React from "react";
import { Volume2, VolumeX, Wifi, Monitor, ShieldCheck, Check } from "lucide-react";
import { useWindowStore, WallpaperType } from "@/store/windowStore";

export const QuickSettings: React.FC = () => {
  const isQuickSettingsOpen = useWindowStore((state) => state.isQuickSettingsOpen);
  const soundEnabled = useWindowStore((state) => state.soundEnabled);
  const toggleSound = useWindowStore((state) => state.toggleSound);
  const wallpaper = useWindowStore((state) => state.wallpaper);
  const setWallpaper = useWindowStore((state) => state.setWallpaper);

  if (!isQuickSettingsOpen) return null;

  const wallpapers: { id: WallpaperType; label: string; colorDot: string }[] = [
    { id: "bloom-dark", label: "Windows Bloom Dark", colorDot: "bg-blue-500" },
    { id: "bloom-light", label: "Windows Bloom Light", colorDot: "bg-sky-200" },
    { id: "sunset-glow", label: "Sunset Glow Bloom", colorDot: "bg-amber-500" },
    { id: "emerald-forest", label: "Emerald Mint Bloom", colorDot: "bg-emerald-500" },
  ];

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed bottom-14 right-4 z-[9990] w-80 rounded-xl bg-[#1c1c1c]/90 backdrop-blur-2xl border border-white/10 shadow-2xl p-4 flex flex-col gap-4 text-gray-200 select-none animate-in fade-in slide-in-from-bottom-3 duration-200"
    >
      {/* Quick Action Tiles */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={toggleSound}
          className={`p-3 rounded-lg border flex items-center gap-3 transition-all ${
            soundEnabled
              ? "bg-emerald-600/30 border-emerald-500/40 text-emerald-300"
              : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
          }`}
        >
          {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          <div className="text-left">
            <div className="text-xs font-semibold">{soundEnabled ? "Audio On" : "Audio Muted"}</div>
            <div className="text-[10px] opacity-75">UI Sound FX</div>
          </div>
        </button>

        <div className="p-3 rounded-lg bg-sky-600/30 border border-sky-500/40 text-sky-300 flex items-center gap-3">
          <Wifi className="w-5 h-5" />
          <div className="text-left">
            <div className="text-xs font-semibold">Online</div>
            <div className="text-[10px] opacity-75">Arjuna Dev Net</div>
          </div>
        </div>
      </div>

      {/* System Status Banner */}
      <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2.5 text-emerald-300">
        <ShieldCheck className="w-4 h-4 shrink-0" />
        <span className="text-[11px]">System Status: All Services Operational</span>
      </div>

      {/* Wallpaper Switcher */}
      <div className="border-t border-white/10 pt-3">
        <span className="text-xs font-semibold text-gray-300 flex items-center gap-1.5 mb-2">
          <Monitor className="w-3.5 h-3.5 text-amber-400" />
          <span>Desktop Theme & Wallpaper</span>
        </span>
        <div className="flex flex-col gap-1.5">
          {wallpapers.map((wp) => (
            <button
              key={wp.id}
              onClick={() => setWallpaper(wp.id)}
              className={`w-full px-3 py-2 rounded-md text-xs text-left flex items-center justify-between transition-colors ${
                wallpaper === wp.id
                  ? "bg-white/15 text-white font-medium border border-white/20"
                  : "hover:bg-white/10 text-gray-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${wp.colorDot}`} />
                <span>{wp.label}</span>
              </div>
              {wallpaper === wp.id && <Check className="w-4 h-4 text-emerald-400" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
