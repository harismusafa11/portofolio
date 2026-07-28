"use client";

import React from "react";
import { useWindowStore } from "@/store/windowStore";
import { LayoutGrid, Gauge, Clock, ShieldCheck, X, CheckCircle2 } from "lucide-react";
import { WhatsAppLogo } from "@/components/icons/BrandIcons";

export const WidgetsPanel: React.FC = () => {
  const isWidgetsOpen = useWindowStore((state) => state.isWidgetsOpen);
  const closeWidgets = useWindowStore((state) => state.closeWidgets);

  if (!isWidgetsOpen) return null;

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed top-0 left-0 bottom-12 z-[9985] w-96 max-w-[90vw] bg-[#161616]/95 backdrop-blur-2xl border-r border-white/10 shadow-2xl p-6 flex flex-col justify-between select-none text-gray-200 animate-in slide-in-from-left duration-250 overflow-y-auto custom-scrollbar"
    >
      <div className="space-y-6">
        {/* Widgets Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-sky-400" />
            <h2 className="text-base font-bold text-white">Windows 11 Widgets</h2>
          </div>
          <button
            onClick={closeWidgets}
            className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Widget 1: System Performance Meter */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-sky-300 flex items-center gap-1.5">
              <Gauge className="w-4 h-4 text-sky-400" />
              <span>System Performance Score</span>
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
              Optimal
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center pt-1">
            <div className="p-2 rounded-xl bg-black/30 border border-white/5">
              <div className="text-lg font-black text-emerald-400">98/100</div>
              <div className="text-[10px] text-gray-400">Lighthouse</div>
            </div>
            <div className="p-2 rounded-xl bg-black/30 border border-white/5">
              <div className="text-lg font-black text-sky-400">&lt; 0.9s</div>
              <div className="text-[10px] text-gray-400">FCP Speed</div>
            </div>
            <div className="p-2 rounded-xl bg-black/30 border border-white/5">
              <div className="text-lg font-black text-purple-400">60 FPS</div>
              <div className="text-[10px] text-gray-400">Smooth Motion</div>
            </div>
          </div>
        </div>

        {/* Widget 2: Developer Availability Status */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-slate-900/60 border border-emerald-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Dev Commission Status</span>
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          </div>

          <p className="text-xs text-gray-300 leading-relaxed">
            Haris Musafa (Arjuna Dev) saat ini **Open for Hire** untuk proyek Pembuatan Website & Aplikasi Mobile.
          </p>

          <div className="flex items-center gap-2 pt-1">
            <span className="text-[11px] text-emerald-300 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Available for New Projects</span>
            </span>
          </div>
        </div>

        {/* Widget 3: Live Time & Location */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Location & Timezone</span>
            </span>
            <span className="text-xs text-gray-400">WIB (UTC+7)</span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div>
              <div className="text-sm font-bold text-white">Jakarta, Indonesia</div>
              <div className="text-xs text-gray-400">Remote / On-site Available</div>
            </div>
            <div className="text-right">
              <div className="text-xs font-bold text-sky-400">28°C Clearsky</div>
              <div className="text-[10px] text-gray-400">Optimal Coding Weather</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="pt-4 border-t border-white/10">
        <a
          href="https://wa.me/6285693366142?text=Halo%20Haris%20Musafa,%20saya%20tertarik%20bekerja%20sama."
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 rounded-xl bg-[#107c41] hover:bg-[#0f6cbd] text-white text-xs font-bold shadow-lg transition-all flex items-center justify-center gap-2 border border-white/10"
        >
          <WhatsAppLogo className="w-4 h-4" />
          <span>Hubungi Haris via WA</span>
        </a>
      </div>
    </div>
  );
};
