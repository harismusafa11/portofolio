"use client";

import React, { useState, useRef, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Minus,
  Square,
  Copy,
  X,
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
  LucideIcon,
  Layout,
  Maximize2,
  TrendingUp,
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
  TrendingUp,
};

interface WindowFrameProps {
  id: string;
  children: React.ReactNode;
}

export const WindowFrame = memo(function WindowFrame({ id, children }: WindowFrameProps) {
  const win = useWindowStore((state) => state.windows[id]);
  const activeWindowId = useWindowStore((state) => state.activeWindowId);
  const focusWindow = useWindowStore((state) => state.focusWindow);
  const closeWindow = useWindowStore((state) => state.closeWindow);
  const minimizeWindow = useWindowStore((state) => state.minimizeWindow);
  const toggleMaximizeWindow = useWindowStore((state) => state.toggleMaximizeWindow);
  const snapWindow = useWindowStore((state) => state.snapWindow);
  const updateWindowPosition = useWindowStore((state) => state.updateWindowPosition);

  const [showSnapMenu, setShowSnapMenu] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);
  
  const isDraggingRef = useRef(false);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  // Zero-Latency Direct Hardware Mouse Dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!win) return;
    focusWindow(id);
    if (win.isMaximized) return;

    isDraggingRef.current = true;
    dragOffsetRef.current = {
      x: e.clientX - win.position.x,
      y: e.clientY - win.position.y,
    };
    posRef.current = { x: win.position.x, y: win.position.y };

    if (windowRef.current) {
      windowRef.current.style.transition = "none";
      windowRef.current.style.willChange = "left, top, transform";
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;

      const nextX = Math.max(0, Math.min(e.clientX - dragOffsetRef.current.x, window.innerWidth - 300));
      const nextY = Math.max(0, Math.min(e.clientY - dragOffsetRef.current.y, window.innerHeight - 120));
      posRef.current = { x: nextX, y: nextY };

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        if (windowRef.current && isDraggingRef.current) {
          windowRef.current.style.left = `${nextX}px`;
          windowRef.current.style.top = `${nextY}px`;
        }
      });
    };

    const handleMouseUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        if (windowRef.current) {
          windowRef.current.style.willChange = "auto";
        }
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
        updateWindowPosition(id, posRef.current);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [id, updateWindowPosition]);

  if (!win) return null;

  const isActive = activeWindowId === id;
  const isVisible = win.isOpen && !win.isMinimized;
  const IconComponent = ICON_MAP[win.iconName] || Folder;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={windowRef}
          initial={{ scale: 0.88, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 80 }}
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
          style={{
            zIndex: win.zIndex,
            left: win.isMaximized ? 0 : win.position.x,
            top: win.isMaximized ? 0 : win.position.y,
            width: win.isMaximized ? "100vw" : win.size.width,
            height: win.isMaximized ? "calc(100vh - 48px)" : win.size.height,
          }}
          onClick={() => focusWindow(id)}
          onMouseDownCapture={() => focusWindow(id)}
          className={`fixed rounded-xl flex flex-col overflow-hidden select-none border transform-gpu ${
            isActive
              ? "border-white/20 bg-[#1c1c1c]/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
              : "border-white/10 bg-[#181818]/92 backdrop-blur-md opacity-95 shadow-[0_10px_25px_rgba(0,0,0,0.4)]"
          } ${win.isMaximized ? "rounded-none border-none" : ""}`}
        >
          {/* Title Bar - Double click restores / maximizes window */}
          <div
            onMouseDown={handleMouseDown}
            onDoubleClick={() => toggleMaximizeWindow(id)}
            className={`h-9 px-3 flex items-center justify-between cursor-move border-b transition-colors ${
              isActive ? "border-white/10 bg-white/5" : "border-transparent bg-transparent"
            }`}
          >
            {/* Left Title & Icon */}
            <div className="flex items-center gap-2 overflow-hidden">
              <IconComponent className="w-4 h-4 text-sky-400 shrink-0" />
              <span className="text-xs font-medium text-gray-200 truncate">{win.title}</span>
            </div>

            {/* Right Window Control Buttons */}
            <div
              className="flex items-center relative"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Minimize Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  minimizeWindow(id);
                }}
                className="w-11 h-9 flex items-center justify-center text-gray-300 hover:bg-white/10 transition-colors cursor-pointer"
                title="Minimize"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>

              {/* Maximize / Restore Toggle Button */}
              <div
                className="relative"
                onMouseEnter={() => setShowSnapMenu(true)}
                onMouseLeave={() => setShowSnapMenu(false)}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMaximizeWindow(id);
                  }}
                  className="w-11 h-9 flex items-center justify-center text-gray-300 hover:bg-white/10 transition-colors cursor-pointer"
                  title={win.isMaximized ? "Restore Down" : "Maximize / Full Screen"}
                >
                  {win.isMaximized ? (
                    <Copy className="w-3.5 h-3.5 text-sky-400 rotate-180" />
                  ) : (
                    <Square className="w-3 h-3" />
                  )}
                </button>

                {/* Windows 11 Snap Layouts Hover Menu */}
                {showSnapMenu && (
                  <div className="absolute top-9 right-0 z-[9999] w-52 p-2 rounded-xl bg-[#222222]/95 backdrop-blur-2xl border border-white/20 shadow-2xl flex flex-col gap-2 text-xs select-none animate-in fade-in zoom-in-95 duration-100">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-1">
                      Snap & Layout Options
                    </span>
                    <div className="grid grid-cols-3 gap-1">
                      <button
                        onClick={() => {
                          snapWindow(id, "left");
                          setShowSnapMenu(false);
                        }}
                        className="p-2 rounded bg-white/10 hover:bg-sky-600/40 border border-white/10 flex flex-col items-center gap-1 text-[10px] font-medium"
                        title="Snap to Left Half"
                      >
                        <Layout className="w-3.5 h-3.5 text-sky-400" />
                        <span>Left</span>
                      </button>
                      <button
                        onClick={() => {
                          snapWindow(id, "right");
                          setShowSnapMenu(false);
                        }}
                        className="p-2 rounded bg-white/10 hover:bg-sky-600/40 border border-white/10 flex flex-col items-center gap-1 text-[10px] font-medium"
                        title="Snap to Right Half"
                      >
                        <Layout className="w-3.5 h-3.5 text-sky-400 rotate-180" />
                        <span>Right</span>
                      </button>
                      <button
                        onClick={() => {
                          toggleMaximizeWindow(id);
                          setShowSnapMenu(false);
                        }}
                        className="p-2 rounded bg-white/10 hover:bg-sky-600/40 border border-white/10 flex flex-col items-center gap-1 text-[10px] font-medium"
                        title="Toggle Full Screen / Restore"
                      >
                        <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{win.isMaximized ? "Restore" : "Full"}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeWindow(id);
                }}
                className="w-11 h-9 flex items-center justify-center text-gray-300 hover:bg-[#e81123] hover:text-white transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Window Content Body with Smooth Custom Scrollbar */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 md:p-6 text-gray-100 font-sans custom-scrollbar h-full">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
