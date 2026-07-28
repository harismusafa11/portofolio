"use client";

import React, { useState, useEffect } from "react";
import { useWindowStore } from "@/store/windowStore";
import { Lock, Unlock, ShieldCheck, ArrowRight } from "lucide-react";

export const LockScreen: React.FC = () => {
  const isLocked = useWindowStore((state) => state.isLocked);
  const toggleLock = useWindowStore((state) => state.toggleLock);

  const [timeStr, setTimeStr] = useState("");
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
      setDateStr(
        now.toLocaleDateString("id-ID", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isLocked) return null;

  return (
    <div
      onClick={toggleLock}
      className="fixed inset-0 z-[99999] bg-[#070c18] flex flex-col justify-between p-12 select-none cursor-pointer text-white animate-in fade-in duration-300"
    >
      {/* Dynamic Ambient Background Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full opacity-40 blur-[180px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0, 120, 212, 0.6) 0%, rgba(99, 102, 241, 0.3) 50%, transparent 80%)" }}
      />

      {/* Top Header */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2 text-xs text-sky-400 font-semibold bg-sky-500/10 px-3 py-1.5 rounded-full border border-sky-500/20">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Arjuna Dev OS — Secure Session</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Lock className="w-4 h-4 text-amber-400" />
          <span>Click anywhere or press any key to unlock</span>
        </div>
      </div>

      {/* Center Clock & Date */}
      <div className="flex flex-col items-center justify-center text-center z-10 my-auto">
        <h1 className="text-8xl font-black tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
          {timeStr || "12:00"}
        </h1>
        <p className="text-xl font-medium text-sky-200 mt-2 capitalize drop-shadow">
          {dateStr || "Jumat, 24 Juli 2026"}
        </p>

        {/* User Card */}
        <div className="mt-8 p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center gap-4 shadow-2xl animate-bounce">
          <img
            src="/images/logo.png"
            alt="Arjuna WebDev Logo"
            className="w-12 h-12 rounded-full bg-white/10 p-1 object-contain shadow border border-white/30"
          />
          <div className="text-left">
            <div className="text-sm font-bold text-white">Haris Musafa</div>
            <div className="text-xs text-sky-300 font-mono">Arjuna WebDev — Fullstack</div>
          </div>
          <button className="p-2 rounded-full bg-sky-500 text-white ml-2">
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Footer Hint */}
      <div className="text-center text-xs text-gray-400 z-10 flex items-center justify-center gap-2">
        <Unlock className="w-4 h-4 text-emerald-400" />
        <span>Tekan layar atau klik mouse untuk masuk ke Desktop</span>
      </div>
    </div>
  );
};
