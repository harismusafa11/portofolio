"use client";

import React, { useEffect } from "react";
import { useWindowStore } from "@/store/windowStore";
import { LayoutGrid, X } from "lucide-react";

export const TaskSwitcher: React.FC = () => {
  const isTaskSwitcherOpen = useWindowStore((state) => state.isTaskSwitcherOpen);
  const toggleTaskSwitcher = useWindowStore((state) => state.toggleTaskSwitcher);
  const closeTaskSwitcher = useWindowStore((state) => state.closeTaskSwitcher);
  const windows = useWindowStore((state) => state.windows);
  const focusWindow = useWindowStore((state) => state.focusWindow);

  // Keyboard shortcut listener for Alt+Tab or Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === "Tab") {
        e.preventDefault();
        toggleTaskSwitcher();
      } else if (e.key === "Escape" && isTaskSwitcherOpen) {
        closeTaskSwitcher();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleTaskSwitcher, closeTaskSwitcher, isTaskSwitcherOpen]);

  if (!isTaskSwitcherOpen) return null;

  const openWindowsList = Object.values(windows).filter((w) => w.isOpen);

  return (
    <div
      onClick={closeTaskSwitcher}
      className="fixed inset-0 z-[99990] bg-black/60 backdrop-blur-xl flex flex-col items-center justify-center p-8 select-none animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[840px] max-w-[95vw] rounded-2xl bg-[#1c1c1c]/90 border border-white/20 shadow-2xl p-6 flex flex-col gap-6 text-gray-100"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2 font-bold text-sm text-sky-400">
            <LayoutGrid className="w-5 h-5 text-sky-400" />
            <span>Task View — Active Windows (Alt + Tab)</span>
          </div>
          <button
            onClick={closeTaskSwitcher}
            className="p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Windows Cards Grid */}
        {openWindowsList.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-xs">
            Tidak ada jendela yang sedang terbuka. Klik ikon aplikasi di desktop untuk membuka.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {openWindowsList.map((win) => (
              <div
                key={win.id}
                onClick={() => {
                  focusWindow(win.id);
                  closeTaskSwitcher();
                }}
                className="p-4 rounded-xl bg-[#242424] hover:bg-[#2c2c2c] border border-white/10 hover:border-[#0078d4] transition-all cursor-pointer flex flex-col justify-between gap-3 group shadow"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-xs font-bold text-white truncate">{win.title}</span>
                  <span
                    className={`text-[9px] px-2 py-0.5 rounded font-mono ${
                      win.isMinimized ? "bg-amber-500/20 text-amber-300" : "bg-emerald-500/20 text-emerald-300"
                    }`}
                  >
                    {win.isMinimized ? "Minimized" : "Active"}
                  </span>
                </div>

                <div className="h-24 rounded-lg bg-[#181818] border border-white/5 p-3 flex items-center justify-center text-center text-xs font-mono text-gray-400 group-hover:text-sky-300 transition-colors">
                  <span>{win.title}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center text-[11px] text-gray-400 font-mono">
          Klik jendela untuk beralih fokus | Tekan <code className="text-white bg-white/10 px-1 rounded">Esc</code> untuk menutup
        </div>
      </div>
    </div>
  );
};
