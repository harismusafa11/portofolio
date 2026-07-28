"use client";

import React, { memo } from "react";
import {
  FileText,
  Briefcase,
  Folder,
  PhoneCall,
  Terminal,
  Settings,
  BookOpen,
  HelpCircle,
  Sliders,
  Activity,
  Brush,
  MessageSquare,
  LucideIcon,
} from "lucide-react";
import { useWindowStore } from "@/store/windowStore";

const ICON_MAP: Record<string, LucideIcon> = {
  FileText,
  Briefcase,
  Folder,
  PhoneCall,
  Terminal,
  Settings,
  BookOpen,
  HelpCircle,
  Sliders,
  Activity,
  Brush,
  MessageSquare,
};

// Rich & Distinct Windows Native App Color Themes
const APP_GRADIENTS: Record<string, string> = {
  about: "from-emerald-500 to-teal-700",
  livechat: "from-sky-400 to-blue-600",
  taskmanager: "from-blue-600 to-cyan-700",
  paint: "from-purple-500 to-pink-600",
  services: "from-amber-400 to-orange-600",
  portfolio: "from-yellow-400 to-amber-600",
  blog: "from-sky-500 to-blue-700",
  faq: "from-purple-500 to-violet-700",
  contact: "from-emerald-500 to-green-600",
  terminal: "from-purple-600 to-indigo-800",
  settings: "from-slate-600 to-blue-700",
};

interface DesktopIconProps {
  id: string;
  title: string;
  iconName: string;
}

export const DesktopIcon = memo(function DesktopIcon({ id, title, iconName }: DesktopIconProps) {
  const selectedDesktopIconId = useWindowStore((state) => state.selectedDesktopIconId);
  const selectDesktopIcon = useWindowStore((state) => state.selectDesktopIcon);
  const openWindow = useWindowStore((state) => state.openWindow);
  const focusWindow = useWindowStore((state) => state.focusWindow);

  const isSelected = selectedDesktopIconId === id;
  const IconComponent = ICON_MAP[iconName] || Folder;
  const gradientClass = APP_GRADIENTS[id] || "from-sky-500 to-blue-600";

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectDesktopIcon(null);
    openWindow(id);
    focusWindow(id);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectDesktopIcon(id);
  };

  return (
    <div
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      className={`group w-24 p-2 rounded flex flex-col items-center justify-center cursor-pointer transition-all duration-150 select-none transform-gpu ${
        isSelected
          ? "bg-white/20 dark:bg-white/15 backdrop-blur-sm border border-white/30 shadow-md ring-1 ring-white/30"
          : "hover:bg-white/10 dark:hover:bg-white/5 border border-transparent"
      }`}
    >
      <div className="relative w-12 h-12 flex items-center justify-center mb-1 transition-transform group-hover:scale-105">
        {/* Distinct Windows Native App Icon */}
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-b ${gradientClass} shadow-md border border-white/20 flex items-center justify-center text-white`}>
          <IconComponent className="w-6 h-6 stroke-[1.75]" />
        </div>
      </div>
      <span className="text-[12px] font-medium text-white text-center leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] px-1 line-clamp-2">
        {title.replace(".exe", "")}
      </span>
    </div>
  );
});
