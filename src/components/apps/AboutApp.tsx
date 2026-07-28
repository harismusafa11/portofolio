"use client";

import React, { useState, memo } from "react";
import {
  User,
  Code2,
  Cpu,
  CheckCircle2,
  MessageCircle,
  Globe,
  Smartphone,
  ShieldCheck,
  Briefcase,
  FileCode,
  Eye,
  FileText,
} from "lucide-react";
import { useWindowStore } from "@/store/windowStore";
import { WhatsAppLogo } from "@/components/icons/BrandIcons";

export const AboutApp: React.FC = memo(function AboutApp() {
  const openWindow = useWindowStore((state) => state.openWindow);
  const [viewMode, setViewMode] = useState<"formatted" | "raw">("formatted");

  const skills = [
    {
      name: "Web Development",
      level: "Senior Fullstack",
      icon: Globe,
      colorClass: "bg-sky-500/10 text-sky-400 border-sky-500/20",
      items: ["HTML5", "CSS3", "JavaScript (ES6+)", "Next.js (App Router)", "React 18+", "TypeScript", "Tailwind CSS", "Node.js", "REST / GraphQL"],
    },
    {
      name: "Mobile App Development",
      level: "Cross-Platform",
      icon: Smartphone,
      colorClass: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      items: ["Flutter", "React Native", "Firebase", "iOS & Android SDKs"],
    },
    {
      name: "Database & Architecture",
      level: "Backend Systems",
      icon: Cpu,
      colorClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      items: ["PHP", "PostgreSQL", "Supabase", "Express.js", "Redis Caching", "Database Design"],
    },
  ];

  const rawJsonData = {
    developer: "Haris Musafa (Arjuna Dev)",
    title: "Senior Fullstack Web & Mobile Application Developer",
    experience: "4+ Years Professional Experience",
    completedProjects: 35,
    status: "Available for Hire",
    contact: { whatsapp: "085693366142", instagram: "@haris_musafa_" },
    techStack: ["HTML5", "CSS3", "JavaScript", "PHP", "Next.js", "React", "TypeScript", "Flutter", "Node.js", "Tailwind CSS", "PostgreSQL"],
  };

  return (
    <div className="flex flex-col justify-between h-full text-gray-200 font-sans pb-1 select-text">
      <div className="space-y-4">
        {/* Windows 11 Notepad Menu Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 border-b border-white/10 pb-2 text-xs">
          <div className="hidden sm:flex items-center gap-4 text-gray-300 font-medium">
            <span className="hover:text-white cursor-pointer transition-colors">File</span>
            <span className="hover:text-white cursor-pointer transition-colors">Edit</span>
            <span className="hover:text-white cursor-pointer transition-colors">Format</span>
            <span className="hover:text-white cursor-pointer transition-colors">View</span>
            <span className="hover:text-white cursor-pointer transition-colors">Help</span>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1 bg-[#141414] p-1 rounded-lg border border-white/10 text-xs font-mono w-full sm:w-auto justify-stretch">
            <button
              onClick={() => setViewMode("formatted")}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded flex items-center justify-center gap-1.5 transition-all text-xs ${
                viewMode === "formatted"
                  ? "bg-[#0078d4] text-white font-bold shadow"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Formatted</span>
            </button>

            <button
              onClick={() => setViewMode("raw")}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded flex items-center justify-center gap-1.5 transition-all text-xs ${
                viewMode === "raw"
                  ? "bg-[#107c41] text-white font-bold shadow"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Raw JSON</span>
            </button>
          </div>
        </div>

        {viewMode === "raw" ? (
          <div className="p-4 rounded-xl bg-[#141414] border border-white/10 font-mono text-xs text-emerald-400 overflow-x-auto leading-relaxed">
            <pre>{JSON.stringify(rawJsonData, null, 2)}</pre>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Authentic Profile Card */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#242424] border border-white/10 shadow-lg flex flex-col lg:flex-row items-center lg:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 sm:gap-4 flex-1 min-w-0 w-full">
                <img
                  src="/images/logo.png"
                  alt="Arjuna WebDev Logo"
                  className="w-14 h-14 rounded-xl bg-white/10 p-1 object-contain shadow border border-white/20 shrink-0"
                />
                <div className="min-w-0 w-full">
                  <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                    <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">Haris Musafa</h2>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30 shrink-0">
                      Arjuna Dev
                    </span>
                  </div>
                  <p className="text-xs text-sky-300 font-medium mt-0.5 leading-snug">
                    Senior Fullstack Web & Mobile App Developer
                  </p>
                  <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                    Spesialis pengembangan aplikasi web performa tinggi & aplikasi mobile cross-platform.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-2.5 shrink-0 w-full lg:w-auto">
                <button
                  onClick={() => openWindow("services")}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-[#0078d4] hover:bg-[#006cbd] text-white text-xs font-semibold shadow transition-all flex items-center justify-center gap-2 border border-white/10 active:scale-95"
                >
                  <Briefcase className="w-4 h-4" />
                  <span className="whitespace-nowrap">Lihat Paket Jasa</span>
                </button>
                <a
                  href="https://wa.me/6285693366142?text=Halo%20Haris%20Musafa,%20saya%20tertarik%20bekerja%20sama."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-[#107c41] hover:bg-[#0f6cbd] text-white text-xs font-semibold shadow transition-all flex items-center justify-center gap-2 border border-white/10 active:scale-95"
                >
                  <WhatsAppLogo className="w-4 h-4" />
                  <span className="whitespace-nowrap">Hubungi WA</span>
                </a>
              </div>
            </div>

            {/* Metric Cards Section (3 Clean Columns) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#222222] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between gap-3">
                <div className="text-xs font-semibold text-gray-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400" />
                  <span>Pengalaman Professional</span>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white tracking-tight">4+ Tahun</div>
                  <div className="text-[11px] text-gray-400 mt-1">Pengembangan Web & App Skala Produksi</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#222222] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between gap-3">
                <div className="text-xs font-semibold text-gray-300 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-emerald-400" />
                  <span>Proyek Selesai</span>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white tracking-tight">35+ Web & App</div>
                  <div className="text-[11px] text-gray-400 mt-1">Landing Page, E-Commerce, SaaS & Mobile</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#222222] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between gap-3">
                <div className="text-xs font-semibold text-gray-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                  <span>Garansi Performa</span>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white tracking-tight">100% Guaranteed</div>
                  <div className="text-[11px] text-gray-400 mt-1">Lighthouse Score & Fast Mobile Responsiveness</div>
                </div>
              </div>
            </div>

            {/* Technical Skills Section */}
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-sky-400" />
                <span>Keahlian Utama & Tech Stack</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {skills.map((skill, idx) => {
                  const Icon = skill.icon;
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#222222] border border-white/10 flex flex-col justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 ${skill.colorClass}`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">{skill.name}</h4>
                          <span className="text-[10px] text-gray-400 font-mono">{skill.level}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                        {skill.items.map((item, itemIdx) => (
                          <span
                            key={itemIdx}
                            className="px-2.5 py-1 rounded bg-[#2a2a2a] text-[10px] text-gray-200 font-mono border border-white/10"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Notepad Status Bar */}
      <div className="mt-4 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-gray-400">
        <span>Ln 14, Col 28</span>
        <span>100%</span>
        <span>Windows (CRLF)</span>
        <span className="text-sky-300">UTF-8</span>
      </div>
    </div>
  );
});
