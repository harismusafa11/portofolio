"use client";

import React, { useEffect, useState } from "react";
import {
  RotateCw,
  Image as ImageIcon,
  Briefcase,
  Folder,
  Activity,
  Terminal,
} from "lucide-react";
import { useWindowStore, WallpaperType } from "@/store/windowStore";
import { WhatsAppLogo } from "@/components/icons/BrandIcons";

interface ContextMenuPos {
  x: number;
  y: number;
}

export const ContextMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pos, setPos] = useState<ContextMenuPos>({ x: 0, y: 0 });
  const openWindow = useWindowStore((state) => state.openWindow);
  const setWallpaper = useWindowStore((state) => state.setWallpaper);
  const currentWallpaper = useWindowStore((state) => state.wallpaper);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      // Calculate position so menu doesn't overflow screen boundary
      const x = Math.min(e.clientX, window.innerWidth - 220);
      const y = Math.min(e.clientY, window.innerHeight - 280);
      setPos({ x, y });
      setIsOpen(true);
    };

    const handleClick = () => {
      setIsOpen(false);
    };

    const desktopEl = document.getElementById("desktop-area");
    if (desktopEl) {
      desktopEl.addEventListener("contextmenu", handleContextMenu);
    }
    window.addEventListener("click", handleClick);

    return () => {
      if (desktopEl) {
        desktopEl.removeEventListener("contextmenu", handleContextMenu);
      }
      window.removeEventListener("click", handleClick);
    };
  }, []);

  if (!isOpen) return null;

  const cycleWallpaper = () => {
    const wall: WallpaperType[] = ["bloom-dark", "bloom-light", "sunset-glow", "emerald-forest"];
    const nextIdx = (wall.indexOf(currentWallpaper) + 1) % wall.length;
    setWallpaper(wall[nextIdx]);
  };

  return (
    <div
      style={{ top: pos.y, left: pos.x }}
      className="fixed z-[9999] w-56 p-1.5 rounded-lg bg-[#202020]/90 backdrop-blur-xl border border-white/10 shadow-2xl text-gray-200 text-xs animate-in fade-in zoom-in-95 duration-100 select-none"
    >
      <button
        onClick={() => window.location.reload()}
        className="w-full px-2.5 py-1.5 rounded flex items-center gap-2.5 hover:bg-white/10 transition-colors text-left"
      >
        <RotateCw className="w-4 h-4 text-sky-400" />
        <span>Refresh Desktop</span>
      </button>

      <button
        onClick={cycleWallpaper}
        className="w-full px-2.5 py-1.5 rounded flex items-center gap-2.5 hover:bg-white/10 transition-colors text-left"
      >
        <ImageIcon className="w-4 h-4 text-emerald-400" />
        <span>Change Wallpaper</span>
      </button>

      <div className="my-1 border-t border-white/10" />

      <button
        onClick={() => openWindow("services")}
        className="w-full px-2.5 py-1.5 rounded flex items-center gap-2.5 hover:bg-white/10 transition-colors text-left"
      >
        <Briefcase className="w-4 h-4 text-amber-400" />
        <span>Open Services & Pricing</span>
      </button>

      <button
        onClick={() => openWindow("portfolio")}
        className="w-full px-2.5 py-1.5 rounded flex items-center gap-2.5 hover:bg-white/10 transition-colors text-left"
      >
        <Folder className="w-4 h-4 text-blue-400" />
        <span>Open Portfolio Explorer</span>
      </button>

      <button
        onClick={() => openWindow("terminal")}
        className="w-full px-2.5 py-1.5 rounded flex items-center gap-2.5 hover:bg-white/10 transition-colors text-left"
      >
        <Terminal className="w-4 h-4 text-purple-400" />
        <span>Open Terminal CMD</span>
      </button>

      <div className="my-1 border-t border-white/10" />

      <a
        href="https://wa.me/6285693366142?text=Halo%20Haris%20Musafa%20(Arjuna%20Dev),%20saya%20menghubungi%20via%20Website%20Portofolio."
        target="_blank"
        rel="noopener noreferrer"
        className="w-full px-2.5 py-1.5 rounded flex items-center gap-2.5 hover:bg-white/10 transition-colors text-left text-emerald-400 font-medium"
      >
        <WhatsAppLogo className="w-4 h-4" />
        <span>Direct WA Chat (085693366142)</span>
      </a>

      <button
        onClick={() => openWindow("settings")}
        className="w-full px-2.5 py-1.5 rounded flex items-center gap-2.5 hover:bg-white/10 transition-colors text-left text-gray-400 hover:text-white"
      >
        <Activity className="w-4 h-4" />
        <span>System Status & Display</span>
      </button>
    </div>
  );
};
