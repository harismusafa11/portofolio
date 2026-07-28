"use client";

import React, { useState } from "react";
import {
  Search,
  FileText,
  Briefcase,
  Folder,
  PhoneCall,
  Terminal,
  Settings,
  BookOpen,
  HelpCircle,
  Activity,
  Brush,
  User,
  Power,
  Lock,
  MessageSquare,
  TrendingUp,
} from "lucide-react";
import { useWindowStore } from "@/store/windowStore";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { WhatsAppLogo, InstagramLogo } from "@/components/icons/BrandIcons";

export const StartMenu: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const isStartMenuOpen = useWindowStore((state) => state.isStartMenuOpen);
  const openWindow = useWindowStore((state) => state.openWindow);
  const closeStartMenu = useWindowStore((state) => state.closeStartMenu);
  const toggleLock = useWindowStore((state) => state.toggleLock);

  if (!isStartMenuOpen) return null;

  const apps = [
    { id: "about", name: "About Me", icon: FileText, desc: "Bio & Tech Stack" },
    { id: "project_tracker", name: "Project Tracker", icon: TrendingUp, desc: "Live Progress Proyek Klien" },
    { id: "livechat", name: "Live Chat Real-Time", icon: MessageSquare, desc: "Konsultasi & Auth" },
    { id: "taskmanager", name: "Task Manager", icon: Activity, desc: "Diagnostics & Quality Metrics" },
    { id: "paint", name: "Paint Notes", icon: Brush, desc: "Kanvas Sketsa Ide Proyek" },
    { id: "services", name: "Services & Pricing", icon: Briefcase, desc: "Paket Jasa Web & App" },
    { id: "portfolio", name: "Portfolio Explorer", icon: Folder, desc: "Showcase Proyek" },
    { id: "blog", name: "Blog & Insights", icon: BookOpen, desc: "Tips & Artikel UMKM" },
    { id: "faq", name: "FAQ Help", icon: HelpCircle, desc: "Pertanyaan & Support" },
    { id: "contact", name: "Contact Haris", icon: PhoneCall, desc: "Direct WA & Instagram" },
    { id: "terminal", name: "Terminal CMD", icon: Terminal, desc: "Interaktif Command Text" },
    { id: "settings", name: "Settings", icon: Settings, desc: "Wallpaper & System" },
  ];

  const filteredApps = apps.filter((app) =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProjects = PORTFOLIO_DATA.filter((proj) =>
    proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    proj.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAppClick = (id: string) => {
    openWindow(id);
    closeStartMenu();
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed bottom-14 left-1/2 -translate-x-1/2 z-[9990] w-[540px] max-w-[92vw] h-[560px] rounded-2xl bg-[#1c1c1c]/90 backdrop-blur-2xl border border-white/10 shadow-2xl p-6 flex flex-col justify-between select-none text-gray-100 animate-in fade-in slide-in-from-bottom-5 duration-200 overflow-y-auto custom-scrollbar"
    >
      <div>
        {/* Search Input */}
        <div className="relative mb-5">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type here to search apps, skills, or portfolio projects..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/10 border border-white/10 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#0078d4] focus:ring-1 focus:ring-[#0078d4] transition-all"
            autoFocus
          />
        </div>

        {/* Live Search Results View */}
        {searchQuery ? (
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold text-sky-400 block mb-2">Matching Applications:</span>
              <div className="grid grid-cols-2 gap-2">
                {filteredApps.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => handleAppClick(app.id)}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-3 text-left transition-colors"
                  >
                    <app.icon className="w-5 h-5 text-sky-400" />
                    <div>
                      <div className="text-xs font-bold text-white">{app.name}</div>
                      <div className="text-[10px] text-gray-400">{app.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-400 block mb-2">Matching Portfolio Projects:</span>
              <div className="space-y-2">
                {filteredProjects.map((proj) => (
                  <div
                    key={proj.id}
                    onClick={() => handleAppClick("portfolio")}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between cursor-pointer text-xs"
                  >
                    <div>
                      <div className="font-bold text-white">{proj.title}</div>
                      <div className="text-[10px] text-sky-300 font-mono">{proj.techStack.join(", ")}</div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold">Open</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Pinned Apps Header */}
            <div className="flex items-center justify-between px-1 mb-4">
              <span className="text-xs font-semibold text-gray-300">Pinned Applications</span>
              <span className="text-[11px] text-gray-400 bg-white/10 px-2 py-0.5 rounded">All Apps</span>
            </div>

            {/* Apps Grid */}
            <div className="grid grid-cols-3 gap-3">
              {apps.map((app) => {
                const Icon = app.icon;
                return (
                  <button
                    key={app.id}
                    onClick={() => handleAppClick(app.id)}
                    className="p-3 rounded-xl flex flex-col items-center justify-center text-center gap-2 hover:bg-white/10 transition-all group border border-transparent hover:border-white/10"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#0078d4] flex items-center justify-center text-white shadow group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-200 group-hover:text-white leading-tight">
                        {app.name}
                      </div>
                      <div className="text-[10px] text-gray-400 line-clamp-1">{app.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Direct Contact Shortcuts with Real Logos */}
      {!searchQuery && (
        <div className="my-3 px-1 border-t border-white/10 pt-3">
          <span className="text-xs font-semibold text-gray-300 block mb-2">Direct Contact Shortcuts</span>
          <div className="grid grid-cols-2 gap-2">
            <a
              href="https://wa.me/6285693366142?text=Halo%20Haris%20Musafa,%20saya%20tertarik%20bekerja%20sama."
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 flex items-center gap-3 transition-colors"
            >
              <WhatsAppLogo className="w-5 h-5 shrink-0" />
              <div className="text-left overflow-hidden">
                <div className="text-xs font-medium text-emerald-300">WhatsApp Official</div>
                <div className="text-[10px] text-gray-400 truncate">085693366142</div>
              </div>
            </a>

            <a
              href="https://instagram.com/haris_musafa_"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 flex items-center gap-3 transition-colors"
            >
              <InstagramLogo className="w-5 h-5 shrink-0" />
              <div className="text-left overflow-hidden">
                <div className="text-xs font-medium text-purple-300">Instagram Official</div>
                <div className="text-[10px] text-gray-400 truncate">@haris_musafa_</div>
              </div>
            </a>
          </div>
        </div>
      )}

      {/* Bottom User Footer */}
      <div className="pt-3 border-t border-white/10 flex items-center justify-between px-1">
        <div className="flex items-center gap-3">
          <img
            src="/images/logo.png"
            alt="Arjuna WebDev Logo"
            className="w-9 h-9 rounded-full bg-white/10 p-0.5 object-contain shadow border border-white/20"
          />
          <div>
            <div className="text-xs font-semibold text-white">Haris Musafa</div>
            <div className="text-[10px] text-sky-400 font-mono">Arjuna WebDev — Fullstack</div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              closeStartMenu();
              toggleLock();
            }}
            className="p-2 rounded-lg hover:bg-white/10 text-amber-400 hover:text-amber-300 transition-colors"
            title="Lock Session"
          >
            <Lock className="w-4 h-4" />
          </button>
          <button
            onClick={() => window.location.reload()}
            className="p-2 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
            title="Restart Session"
          >
            <Power className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
