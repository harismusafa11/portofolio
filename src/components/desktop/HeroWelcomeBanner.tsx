"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export const HeroWelcomeBanner: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isVisible) return null;

  return (
    <div className="absolute top-5 left-1/2 -translate-x-1/2 z-[2] w-[90%] max-w-2xl pointer-events-auto animate-in fade-in slide-in-from-top-4 duration-300">
      {/* Editorial Floating Card (Anti-AI Slop Design) */}
      <div className="relative rounded-2xl bg-[#121622]/90 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-5 text-gray-100 overflow-hidden">
        {/* Subtle Close Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsVisible(false);
          }}
          className="absolute top-3.5 right-3.5 p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white transition-all cursor-pointer border border-white/10 group"
          title="Tutup Banner Welcome"
        >
          <X className="w-4 h-4 group-hover:scale-110 transition-transform" />
        </button>

        <div className="flex items-start gap-4 sm:gap-5">
          {/* Website Official Logo */}
          <img
            src="/images/logo.png"
            alt="Arjuna Dev Logo"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-contain bg-white/5 p-1 border border-white/10 shadow-sm shrink-0 mt-0.5"
          />

          {/* Editorial Content Text with Modern Character Typography */}
          <div className="flex-1 pr-6 space-y-1.5 font-outfit">
            <div>
              <span className="text-[10px] font-mono font-semibold text-sky-400 tracking-[0.2em] uppercase block mb-1">
                Arjuna Dev &bull; Software &amp; Web Agency
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug font-space">
                Selamat Datang di Arjuna Dev
              </h1>
            </div>

            <p className="text-xs sm:text-[13.5px] text-gray-300 leading-relaxed font-normal pt-0.5">
              Partner digital terpercaya untuk pembuatan website modern, aplikasi web custom, dan solusi teknologi bisnis. Untuk mengakses berbagai fitur, silakan klik menu atau ikon aplikasi yang tersedia di layar desktop ini.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
