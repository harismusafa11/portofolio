"use client";

import React, { useState } from "react";
import { useWindowStore } from "@/store/windowStore";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

export const CalendarDropdown: React.FC = () => {
  const isCalendarOpen = useWindowStore((state) => state.isCalendarOpen);

  const [currentDate] = useState(new Date(2026, 6, 24)); // July 2026

  if (!isCalendarOpen) return null;

  const daysOfWeek = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed bottom-14 right-4 z-[9990] w-80 rounded-xl bg-[#1c1c1c]/90 backdrop-blur-2xl border border-white/10 shadow-2xl p-4 flex flex-col gap-4 text-gray-200 select-none animate-in fade-in slide-in-from-bottom-3 duration-200"
    >
      {/* Calendar Header */}
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <span className="text-xs font-bold text-white flex items-center gap-1.5">
          <CalendarIcon className="w-4 h-4 text-sky-400" />
          <span>Juli 2026</span>
        </span>
        <div className="flex items-center gap-1">
          <button className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {daysOfWeek.map((day, idx) => (
          <span key={idx} className="text-[10px] font-bold text-gray-400 py-1">
            {day}
          </span>
        ))}
        {daysInMonth.map((day) => {
          const isToday = day === 24;
          return (
            <div
              key={day}
              className={`py-1.5 rounded-lg text-xs font-medium transition-colors ${
                isToday
                  ? "bg-sky-500 text-white font-bold shadow"
                  : "hover:bg-white/10 text-gray-300"
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* Agenda & Availability Slot */}
      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 space-y-1">
        <div className="flex items-center gap-1.5 font-bold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Status Slot Pengerjaan</span>
        </div>
        <p className="text-[11px] text-gray-300">
          Slot Pengerjaan Proyek Bulan Juli & Agustus 2026 **Tersedia (Open)**.
        </p>
      </div>
    </div>
  );
};
