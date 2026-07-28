"use client";

import React, { useState, memo } from "react";
import { Monitor, Volume2, VolumeX, Check, Palette, Info } from "lucide-react";
import { useWindowStore, WallpaperType } from "@/store/windowStore";

export const SettingsApp: React.FC = memo(function SettingsApp() {
  const [activeTab, setActiveTab] = useState<"personalization" | "sound" | "about">("personalization");
  const wallpaper = useWindowStore((state) => state.wallpaper);
  const setWallpaper = useWindowStore((state) => state.setWallpaper);
  const soundEnabled = useWindowStore((state) => state.soundEnabled);
  const toggleSound = useWindowStore((state) => state.toggleSound);

  const wallpapers: { id: WallpaperType; name: string; desc: string; previewColor: string }[] = [
    {
      id: "video-auto",
      name: "Auto-Rotate Video Wallpapers (Recommended)",
      desc: "Rotasi otomatis video 1 & video 2 secara bergantian dengan transisi crossfade mulus.",
      previewColor: "from-teal-900 via-slate-900 to-sky-950",
    },
    {
      id: "video-aesthetic",
      name: "Aesthetic Motion Video 1",
      desc: "Live video wallpaper bergerak estetik edisi 1 (wallpaper.mp4).",
      previewColor: "from-sky-900 via-slate-900 to-emerald-950",
    },
    {
      id: "video-aesthetic-2",
      name: "Aesthetic Motion Video 2",
      desc: "Live video wallpaper bergerak estetik edisi 2 (wallpaper2.mp4).",
      previewColor: "from-purple-900 via-slate-900 to-indigo-950",
    },
    {
      id: "bloom-dark",
      name: "Deep Midnight Slate",
      desc: "Latar belakang dark metallic slate dengan pendaran Cobalt & Indigo.",
      previewColor: "from-blue-950 to-slate-950",
    },
    {
      id: "bloom-light",
      name: "Pearl Cloud Light",
      desc: "Tema terang serba bersih dengan pendaran Soft Sky & Pearl Lavender.",
      previewColor: "from-sky-200 to-indigo-100",
    },
    {
      id: "sunset-glow",
      name: "Sunset Glow Horizon",
      desc: "Pendaran hangat Sunset Amber, Rose Pink, dan Royal Purple.",
      previewColor: "from-amber-700 to-purple-950",
    },
    {
      id: "emerald-forest",
      name: "Emerald Forest Aurora",
      desc: "Pendaran hijau segar Obsidian Emerald & Cyan Mint.",
      previewColor: "from-emerald-800 to-slate-950",
    },
    {
      id: "retro-xp",
      name: "Windows XP Bliss Classic (Retro)",
      desc: "Suasana nostalgia wallpaper bukit hijau Bliss khas Windows XP.",
      previewColor: "from-blue-600 via-sky-400 to-green-600",
    },
    {
      id: "cyberpunk-blueprint",
      name: "Cyberpunk Dark Tech Blueprint",
      desc: "Tampilan arsitektur grid garis blueprint futuristik minim aksen.",
      previewColor: "from-sky-900 via-slate-900 to-blue-950",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row h-full gap-4 text-gray-200 font-sans select-none overflow-hidden">
      {/* Mobile Horizontal Navigation Bar */}
      <div className="flex md:hidden items-center gap-1.5 p-1 rounded-xl bg-[#141414] border border-white/10 text-xs font-semibold overflow-x-auto custom-scrollbar no-scrollbar shrink-0">
        <button
          onClick={() => setActiveTab("personalization")}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-all ${
            activeTab === "personalization"
              ? "bg-[#0078d4] text-white font-bold shadow"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Personalization</span>
        </button>

        <button
          onClick={() => setActiveTab("sound")}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-all ${
            activeTab === "sound"
              ? "bg-[#0078d4] text-white font-bold shadow"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>Sound & Audio FX</span>
        </button>

        <button
          onClick={() => setActiveTab("about")}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-all ${
            activeTab === "about"
              ? "bg-[#0078d4] text-white font-bold shadow"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <Info className="w-3.5 h-3.5" />
          <span>System Information</span>
        </button>
      </div>

      {/* Left Navigation Sidebar (Desktop) */}
      <div className="w-52 p-2 rounded-xl bg-[#202020] border border-white/10 flex-col gap-1 shrink-0 hidden md:flex">
        <div className="px-3 py-2 text-xs font-bold text-white flex items-center gap-2 border-b border-white/10 mb-1">
          <Monitor className="w-4 h-4 text-[#0078d4]" />
          <span>Settings</span>
        </div>

        <button
          onClick={() => setActiveTab("personalization")}
          className={`w-full px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2.5 transition-all text-left ${
            activeTab === "personalization"
              ? "bg-[#0078d4] text-white font-bold shadow"
              : "hover:bg-white/10 text-gray-300"
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>Personalization</span>
        </button>

        <button
          onClick={() => setActiveTab("sound")}
          className={`w-full px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2.5 transition-all text-left ${
            activeTab === "sound"
              ? "bg-[#0078d4] text-white font-bold shadow"
              : "hover:bg-white/10 text-gray-300"
          }`}
        >
          <Volume2 className="w-4 h-4" />
          <span>Sound & Audio FX</span>
        </button>

        <button
          onClick={() => setActiveTab("about")}
          className={`w-full px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2.5 transition-all text-left ${
            activeTab === "about"
              ? "bg-[#0078d4] text-white font-bold shadow"
              : "hover:bg-white/10 text-gray-300"
          }`}
        >
          <Info className="w-4 h-4" />
          <span>System Information</span>
        </button>
      </div>

      {/* Right Content View */}
      <div className="flex-1 p-4 rounded-xl bg-[#1e1e1e] border border-white/10 overflow-y-auto custom-scrollbar">
        {activeTab === "personalization" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white">Personalization — Wallpaper Theme</h3>
              <p className="text-xs text-gray-400 mt-0.5">Pilih wallpaper tema desktop Windows 11 pilihan Anda.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {wallpapers.map((wp) => {
                const isActive = wallpaper === wp.id;
                return (
                  <div
                    key={wp.id}
                    onClick={() => setWallpaper(wp.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                      isActive
                        ? "bg-[#0078d4]/10 border-[#0078d4] shadow-md ring-1 ring-[#0078d4]"
                        : "bg-[#141414] border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className={`h-24 rounded-lg bg-gradient-to-br ${wp.previewColor} border border-white/10 relative overflow-hidden flex items-center justify-center`}>
                      {isActive && (
                        <div className="w-7 h-7 rounded-full bg-[#0078d4] flex items-center justify-center text-white shadow">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="text-xs font-bold text-white">{wp.name}</div>
                      <div className="text-[11px] text-gray-400 leading-relaxed mt-0.5">{wp.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "sound" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white">Sound & Audio FX Settings</h3>
              <p className="text-xs text-gray-400 mt-0.5">Atur efek suara interaksi Windows 11 UI.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#141414] border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {soundEnabled ? <Volume2 className="w-5 h-5 text-sky-400" /> : <VolumeX className="w-5 h-5 text-gray-500" />}
                <div>
                  <div className="text-xs font-bold text-white">Efek Suara UI Synthesizer</div>
                  <div className="text-[11px] text-gray-400">Mainkan efek suara Web Audio API saat klik, buka window, & notifikasi.</div>
                </div>
              </div>

              <button
                onClick={toggleSound}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  soundEnabled ? "bg-sky-600 text-white" : "bg-white/10 text-gray-400"
                }`}
              >
                {soundEnabled ? "Aktif" : "Non-Aktif"}
              </button>
            </div>
          </div>
        )}

        {activeTab === "about" && (
          <div className="space-y-4 text-xs">
            <div>
              <h3 className="text-sm font-bold text-white">System Information — Arjuna Dev OS</h3>
              <p className="text-xs text-gray-400 mt-0.5">Spesifikasi sistem lingkungan portofolio interaktif.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#141414] border border-white/10 space-y-3 font-mono">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-400">OS Edition:</span>
                <span className="text-sky-300 font-bold">Windows 11 Pro (Web Edition)</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-400">Developer:</span>
                <span className="text-emerald-400 font-bold">Haris Musafa (Arjuna Dev)</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-400">Core Engine:</span>
                <span className="text-amber-300">Next.js 16 + React 19 + Tailwind CSS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Audio Synth:</span>
                <span className="text-purple-300">Web Audio API Native Oscillator</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
