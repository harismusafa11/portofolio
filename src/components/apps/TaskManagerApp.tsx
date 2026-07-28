"use client";

import React, { useState, memo } from "react";
import { Activity, Gauge, Cpu, CheckCircle2, ShieldCheck, Zap, Server, BarChart3, Award } from "lucide-react";

export const TaskManagerApp: React.FC = memo(function TaskManagerApp() {
  const [activeTab, setActiveTab] = useState<"performance" | "processes" | "metrics">("performance");

  const lighthouseMetrics = [
    { label: "Performance", score: 100, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
    { label: "Accessibility", score: 100, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
    { label: "Best Practices", score: 100, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
    { label: "SEO Optimization", score: 100, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
  ];

  const processes = [
    { name: "Next.js App Router (React 18+)", category: "Core Framework", status: "Running", memory: "12.4 MB", cpu: "0.1%" },
    { name: "Zustand Window State Engine", category: "State Management", status: "Active", memory: "2.1 MB", cpu: "0.0%" },
    { name: "Framer Motion Physics Engine", category: "Animation Engine", status: "Active", memory: "4.8 MB", cpu: "0.2%" },
    { name: "Tailwind CSS & Module Styling", category: "Styling Engine", status: "Optimized", memory: "1.5 MB", cpu: "0.0%" },
    { name: "Vercel Global Edge Network", category: "CDN & Hosting", status: "Connected", memory: "0.8 MB", cpu: "0.0%" },
    { name: "TypeScript Strict Type Safety", category: "Compiler", status: "Verified", memory: "0.0 MB", cpu: "0.0%" },
  ];

  const verificationMetrics = [
    { title: "Delivery Success Rate", value: "100%", desc: "Proyek selesai tepat waktu sesuai deadline yang disepakati." },
    { title: "Client Retention Rate", value: "99.8%", desc: "Klien merasa puas dan mempercayakan proyek berkala." },
    { title: "First Contentful Paint (FCP)", value: "< 0.8s", desc: "Halaman pertama langsung terbuka tanpa penundaan." },
    { title: "Cumulative Layout Shift (CLS)", value: "0.00", desc: "Tata letak tampilan 100% stabil saat dimuat di berbagai perangkat." },
    { title: "SEO Indexability Score", value: "100/100", desc: "Struktur HTML5 & metadata dioptimasi penuh untuk Google." },
  ];

  return (
    <div className="flex flex-col gap-5 max-w-4xl mx-auto font-sans select-text text-gray-100 pb-4">
      {/* Task Manager Top Bar */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-gray-900 to-zinc-900 border border-white/15 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">
              Task Manager — Diagnostics & Performance Status
            </h2>
            <div className="text-xs text-gray-400 flex items-center gap-2 mt-0.5 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Arjuna Dev OS v2.0 &bull; All Systems Optimal</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10 shrink-0 text-xs font-medium">
          <button
            onClick={() => setActiveTab("performance")}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === "performance" ? "bg-sky-500 text-black font-bold" : "text-gray-300 hover:text-white"
            }`}
          >
            <Gauge className="w-3.5 h-3.5" />
            <span>Lighthouse</span>
          </button>
          <button
            onClick={() => setActiveTab("processes")}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === "processes" ? "bg-sky-500 text-black font-bold" : "text-gray-300 hover:text-white"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Processes</span>
          </button>
          <button
            onClick={() => setActiveTab("metrics")}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === "metrics" ? "bg-sky-500 text-black font-bold" : "text-gray-300 hover:text-white"
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Quality Metrics</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Lighthouse Scores */}
      {activeTab === "performance" && (
        <div className="flex flex-col gap-4">
          <div className="text-xs text-gray-300 font-mono flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-sky-400" />
            <span>GOOGLE LIGHTHOUSE AUDIT REPORT (PRODUCTION LEVEL)</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {lighthouseMetrics.map((item, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl ${item.bg} border ${item.border} flex flex-col items-center justify-center text-center`}
              >
                <div className="w-20 h-20 rounded-full border-4 border-emerald-500/40 flex items-center justify-center relative">
                  <span className={`text-2xl font-black ${item.color}`}>{item.score}</span>
                  <div className="absolute inset-0 rounded-full border-4 border-emerald-400 border-t-transparent animate-spin-slow opacity-60" />
                </div>
                <span className="text-xs font-bold text-white mt-3">{item.label}</span>
                <span className="text-[10px] text-emerald-400 font-mono mt-0.5">Grade A+ (Passed)</span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-white">Standar Kualitas Tanpa Kompromi</div>
              <div className="mt-1 text-gray-400 leading-relaxed">
                Setiap situs dan aplikasi web yang dibangun oleh Arjuna Dev (Haris Musafa) diuji menggunakan standar audit resmi Google Lighthouse untuk menjamin kecepatan pemuatan instan, aksesibilitas lengkap, dan optimasi SEO maksimal di Google Search.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: System Processes */}
      {activeTab === "processes" && (
        <div className="flex flex-col gap-3">
          <div className="text-xs text-gray-300 font-mono flex items-center gap-2">
            <Server className="w-4 h-4 text-sky-400" />
            <span>ACTIVE TECH STACK ARCHITECTURE</span>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden text-xs">
            <div className="grid grid-cols-12 p-3 bg-white/5 font-mono text-[11px] font-bold text-gray-400 border-b border-white/10">
              <div className="col-span-5">PROCESS / MODULE</div>
              <div className="col-span-3">CATEGORY</div>
              <div className="col-span-2 text-center">STATUS</div>
              <div className="col-span-2 text-right">MEM USAGE</div>
            </div>

            <div className="divide-y divide-white/5">
              {processes.map((proc, idx) => (
                <div key={idx} className="grid grid-cols-12 p-3 items-center hover:bg-white/5 transition-colors">
                  <div className="col-span-5 font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{proc.name}</span>
                  </div>
                  <div className="col-span-3 text-gray-400">{proc.category}</div>
                  <div className="col-span-2 text-center font-mono">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold">
                      {proc.status}
                    </span>
                  </div>
                  <div className="col-span-2 text-right font-mono text-gray-300">{proc.memory}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Quality Metrics */}
      {activeTab === "metrics" && (
        <div className="flex flex-col gap-4">
          <div className="text-xs text-gray-300 font-mono flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>VERIFIED DELIVERY & QUALITY METRICS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {verificationMetrics.map((metric, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-gray-300">{metric.title}</div>
                  <div className="text-2xl font-black text-sky-400 mt-1">{metric.value}</div>
                </div>
                <p className="text-[11px] text-gray-400 mt-2 border-t border-white/10 pt-2">{metric.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});
