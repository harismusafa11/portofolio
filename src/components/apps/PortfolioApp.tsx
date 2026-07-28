"use client";

import React, { useState, useEffect, memo } from "react";
import {
  Folder,
  Globe,
  Smartphone,
  Cpu,
  Search,
  ExternalLink,
  ChevronRight,
  X,
  Laptop,
  Maximize2,
  FolderPlus,
  Scissors,
  Copy,
  Trash2,
  Filter,
  Grid,
  ArrowLeft,
} from "lucide-react";
import { PORTFOLIO_DATA, PortfolioProject } from "@/data/portfolio";
import { WhatsAppLogo } from "@/components/icons/BrandIcons";

const TiltProjectCard: React.FC<{
  proj: PortfolioProject;
  isSelected: boolean;
  onSelect: () => void;
  onDoubleClick: () => void;
}> = memo(function TiltProjectCard({ proj, isSelected, onSelect, onDoubleClick }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / rect.height) * 14;
    const rotateY = (x / rect.width) * 14;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const primaryStack = proj.techStack.slice(0, 3);
  const extraStackCount = proj.techStack.length - 3;

  return (
    <div
      onClick={onSelect}
      onDoubleClick={onDoubleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)`,
        transition: tilt.x === 0 && tilt.y === 0 ? "transform 0.5s ease" : "transform 0.1s ease-out",
      }}
      className={`h-[205px] p-4 rounded-xl border cursor-pointer flex flex-col justify-between group shadow-sm overflow-hidden relative transform-gpu ${
        isSelected
          ? "bg-[#0078d4]/10 border-[#0078d4] shadow-lg shadow-sky-500/10"
          : "bg-[#1c1c1c] border-white/10 hover:border-white/25 hover:bg-[#222222]"
      }`}
    >
      {/* Top Header Section */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-mono text-sky-400 font-medium tracking-wide uppercase truncate">
            {proj.categoryLabel}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDoubleClick();
            }}
            className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors shrink-0"
            title="Buka Detail Proyek"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <h3 className="text-xs font-semibold text-white group-hover:text-sky-300 transition-colors leading-snug line-clamp-1">
          {proj.title}
        </h3>
        <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">
          {proj.description}
        </p>
      </div>

      {/* Bottom Metric & Tech Stack Section */}
      <div className="pt-2">
        <div className="text-[11px] text-emerald-400 font-mono font-medium truncate mb-2.5 bg-emerald-500/5 px-2.5 py-1 rounded-md border border-emerald-500/10">
          Hasil: {proj.highlights}
        </div>

        <div className="flex items-center gap-1.5 pt-2 border-t border-white/10 overflow-hidden">
          {primaryStack.map((tech, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-gray-300 font-mono border border-white/10 whitespace-nowrap shrink-0"
            >
              {tech}
            </span>
          ))}
          {extraStackCount > 0 && (
            <span className="px-1.5 py-0.5 rounded bg-sky-500/10 text-[10px] text-sky-300 font-mono border border-sky-500/20 whitespace-nowrap shrink-0">
              +{extraStackCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
});

export const PortfolioApp: React.FC = memo(function PortfolioApp() {
  const [projectsList, setProjectsList] = useState<PortfolioProject[]>(PORTFOLIO_DATA);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<PortfolioProject>(PORTFOLIO_DATA[0]);
  const [activeModalProject, setActiveModalProject] = useState<PortfolioProject | null>(null);
  const [mockupFrame, setMockupFrame] = useState<"desktop" | "mobile">("desktop");

  useEffect(() => {
    fetch("/api/portfolios")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped: PortfolioProject[] = data.map((item: any) => {
            let parsedTechStack = [];
            try {
              parsedTechStack = typeof item.techStackJson === "string" ? JSON.parse(item.techStackJson) : (item.techStackJson || []);
            } catch (e) {
              parsedTechStack = [];
            }
            return {
              id: item.slug || String(item.id),
              title: item.title,
              category: (item.category as any) || "web",
              categoryLabel: item.categoryLabel || "Web & Mobile",
              description: item.description,
              longDescription: item.description,
              techStack: parsedTechStack,
              features: ["Responsive Mobile UI", "SEO Optimization", "Fast Load Speed"],
              imagePlaceholderColor: "from-sky-500/20 to-blue-600/20",
              highlights: "100% On-Time Delivery",
              demoUrl: item.liveUrl || undefined,
            };
          });
          setProjectsList(mapped);
          setSelectedProject(mapped[0]);
        }
      })
      .catch(() => {});
  }, []);

  const categories = [
    { id: "all", name: "All Projects", icon: Folder, count: projectsList.length },
    { id: "web", name: "Web Applications", icon: Globe, count: projectsList.filter((p) => p.category === "web").length },
    { id: "mobile", name: "Mobile Apps", icon: Smartphone, count: projectsList.filter((p) => p.category === "mobile").length },
    { id: "saas", name: "SaaS & Dashboards", icon: Cpu, count: projectsList.filter((p) => p.category === "saas").length },
  ];

  const filteredProjects = projectsList.filter((proj) => {
    const matchesCategory = selectedCategory === "all" || proj.category === selectedCategory;
    const matchesSearch =
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative flex flex-col h-full text-gray-200 gap-2.5 select-none font-sans overflow-hidden">
      {/* File Explorer Top Ribbon Command Bar */}
      <div className="flex items-center gap-3 px-3 py-1.5 rounded-xl bg-[#1e1e1e] border border-white/10 text-xs shrink-0 text-gray-300 shadow-sm overflow-x-auto custom-scrollbar no-scrollbar whitespace-nowrap">
        <button className="flex items-center gap-1.5 hover:text-white transition-colors">
          <FolderPlus className="w-4 h-4 text-amber-400" />
          <span>New</span>
        </button>
        <div className="h-4 w-[1px] bg-white/10" />
        <button className="flex items-center gap-1.5 hover:text-white transition-colors">
          <Scissors className="w-3.5 h-3.5 text-gray-400" />
          <span>Cut</span>
        </button>
        <button className="flex items-center gap-1.5 hover:text-white transition-colors">
          <Copy className="w-3.5 h-3.5 text-gray-400" />
          <span>Copy</span>
        </button>
        <button className="flex items-center gap-1.5 hover:text-white transition-colors">
          <Trash2 className="w-3.5 h-3.5 text-gray-400" />
          <span>Delete</span>
        </button>
        <div className="h-4 w-[1px] bg-white/10" />
        <button className="flex items-center gap-1.5 hover:text-white transition-colors">
          <Filter className="w-3.5 h-3.5 text-sky-400" />
          <span>Sort</span>
        </button>
        <button className="flex items-center gap-1.5 hover:text-white transition-colors">
          <Grid className="w-3.5 h-3.5 text-emerald-400" />
          <span>View</span>
        </button>
      </div>

      {/* Address Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2 rounded-xl bg-[#181818] border border-white/10 text-xs shrink-0">
        <div className="flex items-center gap-1 text-gray-400 font-mono px-2.5 py-1 rounded-lg bg-[#121212] border border-white/5 flex-1 overflow-x-auto">
          <span>This PC</span>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span>Portfolio</span>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span className="text-sky-300 font-semibold uppercase">{selectedCategory}</span>
        </div>

        <div className="relative w-full sm:w-60">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects or tech..."
            className="w-full pl-8 pr-3 py-1 rounded-lg bg-[#121212] border border-white/10 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#0078d4]"
          />
        </div>
      </div>

      {/* Mobile Horizontal Category Pills Filter */}
      <div className="flex md:hidden items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar shrink-0">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap shrink-0 border transition-all ${
                isSelected
                  ? "bg-[#0078d4] text-white border-sky-400 font-semibold shadow"
                  : "bg-[#1c1c1c] text-gray-300 border-white/10"
              }`}
            >
              {cat.name} ({cat.count})
            </button>
          );
        })}
      </div>

      {/* Main Body: Sidebar + Folder Content + Preview Pane */}
      <div className="flex flex-1 gap-3 overflow-hidden">
        {/* Left Navigation Pane Sidebar */}
        <div className="w-48 p-2 rounded-xl bg-[#1c1c1c] border border-white/10 flex flex-col gap-1 shrink-0 hidden md:flex">
          <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase px-2.5 py-1.5 font-medium">
            FOLDERS
          </span>
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`w-full px-3 py-2 rounded-lg flex items-center justify-between text-xs transition-all text-left ${
                  isSelected
                    ? "bg-[#0078d4]/20 text-sky-300 font-medium border border-[#0078d4]/40"
                    : "hover:bg-white/5 text-gray-300"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-amber-400" />
                  <span>{cat.name}</span>
                </div>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-black/40 text-gray-400">
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Center Project Files Grid (Interactive 3D Tilt Parallax Cards) */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-3.5 p-0.5 custom-scrollbar">
          {filteredProjects.map((proj) => (
            <TiltProjectCard
              key={proj.id}
              proj={proj}
              isSelected={selectedProject.id === proj.id}
              onSelect={() => setSelectedProject(proj)}
              onDoubleClick={() => setActiveModalProject(proj)}
            />
          ))}
        </div>

        {/* Right Preview Pane */}
        <div className="w-64 p-4 rounded-xl bg-[#1c1c1c] border border-white/10 flex flex-col justify-between shrink-0 hidden xl:flex">
          <div>
            <div className="text-[10px] font-mono tracking-widest text-sky-400 uppercase mb-3 pb-2 border-b border-white/10 font-medium">
              PREVIEW PANE
            </div>

            <div className="p-3.5 rounded-xl bg-[#121212] border border-white/10 flex flex-col justify-between mb-3 shadow-inner min-h-[96px]">
              <span className="text-[10px] font-mono text-sky-300">
                {selectedProject.categoryLabel}
              </span>
              <div className="text-xs font-bold text-white leading-tight mt-2">
                {selectedProject.title}
              </div>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed mb-3">
              {selectedProject.description}
            </p>

            <div className="space-y-1 text-xs">
              <span className="text-[10px] font-mono text-gray-400 block">HASIL PENGERJAAN:</span>
              <p className="text-[11px] text-emerald-400 font-mono bg-emerald-500/5 p-2 rounded border border-emerald-500/10">
                {selectedProject.highlights}
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveModalProject(selectedProject)}
            className="w-full py-2 rounded-lg bg-[#0078d4] hover:bg-[#006cbd] text-white text-xs font-semibold shadow transition-all flex items-center justify-center gap-2 border border-white/10"
          >
            <span>Buka Showcase Proyek</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Project Detail Showcase Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-150 select-text">
          <div className="bg-[#161922] border border-white/20 rounded-2xl max-w-2xl w-full max-h-[85vh] sm:max-h-[88vh] flex flex-col justify-between shadow-2xl overflow-hidden text-gray-200">
            {/* Modal Header */}
            <div className="px-3.5 py-2.5 bg-[#1a1f2c] border-b border-white/10 flex flex-wrap items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-2 min-w-0 pr-2">
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white transition-all text-xs font-bold flex items-center gap-1.5 shrink-0 border border-white/10 cursor-pointer"
                  title="Kembali ke Daftar Portofolio"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-sky-400" />
                  <span>Kembali</span>
                </button>

                <span className="h-4 w-[1px] bg-white/10 shrink-0" />

                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-sky-500/15 text-sky-300 border border-sky-500/30 font-semibold shrink-0">
                  {activeModalProject.categoryLabel}
                </span>
                <span className="text-xs font-bold text-white truncate max-w-[120px] sm:max-w-xs">
                  {activeModalProject.title}
                </span>
              </div>

              {/* Desktop vs Mobile Toggle Buttons (ALWAYS VISIBLE WITH TEXT) */}
              <div className="flex items-center gap-2 shrink-0">
                <div className="p-0.5 rounded-lg bg-black/60 border border-white/15 flex items-center text-xs shadow-inner">
                  <button
                    onClick={() => setMockupFrame("desktop")}
                    className={`px-2.5 py-1 rounded-md flex items-center gap-1.5 transition-all text-xs font-bold cursor-pointer ${
                      mockupFrame === "desktop" ? "bg-[#0078d4] text-white shadow" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <Laptop className="w-3.5 h-3.5 text-sky-300" />
                    <span>Desktop</span>
                  </button>
                  <button
                    onClick={() => setMockupFrame("mobile")}
                    className={`px-2.5 py-1 rounded-md flex items-center gap-1.5 transition-all text-xs font-bold cursor-pointer ${
                      mockupFrame === "mobile" ? "bg-[#0078d4] text-white shadow" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5 text-sky-300" />
                    <span>Mobile App</span>
                  </button>
                </div>

                <button
                  onClick={() => setActiveModalProject(null)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
                  title="Tutup Modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-4 custom-scrollbar text-xs leading-relaxed flex-1">
              {/* Top Controls Bar for Mockup Showcase */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-[10px] font-mono tracking-wider text-gray-400 uppercase font-medium">MODE TAMPILAN SHOWCASE:</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setMockupFrame("desktop")}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                      mockupFrame === "desktop" ? "bg-sky-500/20 text-sky-300 border border-sky-500/40" : "text-gray-400 hover:text-white border border-transparent"
                    }`}
                  >
                    <Laptop className="w-3.5 h-3.5" />
                    <span>Desktop View</span>
                  </button>
                  <button
                    onClick={() => setMockupFrame("mobile")}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                      mockupFrame === "mobile" ? "bg-sky-500/20 text-sky-300 border border-sky-500/40" : "text-gray-400 hover:text-white border border-transparent"
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Mobile App View</span>
                  </button>
                </div>
              </div>

              {/* Project Showcase Mockup Container */}
              <div className="flex justify-center bg-black/50 p-4 sm:p-6 rounded-2xl border border-white/10 shadow-inner">
                {mockupFrame === "desktop" ? (
                  <div className="w-full max-w-xl rounded-xl border border-white/20 overflow-hidden bg-[#121622] shadow-2xl">
                    <div className="px-3 py-2 bg-[#1b2030] border-b border-white/10 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      </div>
                      <div className="flex-1 px-3 py-0.5 rounded bg-black/50 text-[10px] font-mono text-gray-300 border border-white/10 truncate text-center">
                        https://{activeModalProject.id}.arjunadev.com
                      </div>
                      <div className="w-4" />
                    </div>
                    <div className="p-5 sm:p-6 bg-gradient-to-br from-[#121622] via-[#1a2030] to-[#141926] min-h-[190px] flex flex-col justify-center items-center text-center space-y-3">
                      <div className="text-sm font-bold text-white tracking-tight">{activeModalProject.title}</div>
                      <p className="text-xs text-gray-300 max-w-md leading-relaxed">{activeModalProject.description}</p>
                      <div className="px-3 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 text-xs font-mono font-semibold border border-emerald-500/30 shadow-sm">
                        Hasil: {activeModalProject.highlights}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Realistic Sleek iPhone 15 Pro Titanium Frame Mockup (Tall & Slim 19.5:9 Ratio) */
                  <div className="w-[175px] h-[355px] sm:w-[195px] sm:h-[395px] rounded-[38px] border-[5px] border-[#2e3646] bg-[#090c12] shadow-[0_25px_60px_rgba(0,0,0,0.85)] flex flex-col justify-between overflow-hidden relative border-t-[#48546e] shrink-0 transform-gpu">
                    {/* Top Notch Dynamic Island */}
                    <div className="pt-2 px-3 flex items-center justify-between text-[9px] font-mono text-gray-400 z-20 shrink-0 select-none">
                      <span className="font-bold text-white text-[8px]">9:41</span>
                      <div className="w-11 h-3 bg-black rounded-full mx-auto border border-white/10 flex items-center justify-end px-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-[7px] text-sky-400 font-bold">5G</span>
                      </div>
                    </div>

                    {/* Mobile App Canvas Screen Body */}
                    <div className="flex-1 px-2.5 py-2 flex flex-col justify-between my-0.5 overflow-y-auto no-scrollbar relative">
                      <div className="p-2.5 rounded-2xl bg-gradient-to-b from-sky-950/60 via-slate-900/80 to-indigo-950/60 border border-sky-500/25 text-center flex flex-col items-center gap-1.5 shadow-sm">
                        <div className="w-6 h-6 rounded-lg bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-300 text-[10px] font-bold">
                          📱
                        </div>
                        <div className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-[7.5px] font-mono font-bold uppercase tracking-wider">
                          {activeModalProject.categoryLabel}
                        </div>
                        <div className="text-[11px] font-extrabold text-white leading-snug tracking-tight px-1">{activeModalProject.title}</div>
                        <p className="text-[9px] text-gray-300 line-clamp-3 leading-relaxed">{activeModalProject.description}</p>
                      </div>

                      <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center mt-2">
                        <div className="text-[8.5px] text-emerald-300 font-mono font-semibold leading-tight">
                          Hasil: {activeModalProject.highlights}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Home Indicator Bar */}
                    <div className="pb-1.5 flex justify-center shrink-0 z-20">
                      <div className="w-14 h-1 bg-white/40 rounded-full" />
                    </div>
                  </div>
                )}
              </div>

              {/* Tech Stack Chips */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-wider text-gray-400 uppercase font-medium">TEKNOLOGI YANG DIGUNAKAN:</span>
                <div className="flex flex-wrap gap-2">
                  {activeModalProject.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-sky-500/10 text-sky-300 text-xs font-mono border border-sky-500/20 font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct Order WA Banner */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow shrink-0">
                <div>
                  <div className="text-xs font-bold">Tertarik Membuat Website Seperti Ini?</div>
                  <div className="text-[11px] text-emerald-100 mt-0.5">Konsultasikan konsep proyek bisnis Anda langsung bersama Haris Musafa.</div>
                </div>

                <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => setActiveModalProject(null)}
                    className="px-3.5 py-2 rounded-lg bg-black/30 hover:bg-black/50 text-white text-xs font-bold transition-all border border-white/20 cursor-pointer flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Kembali</span>
                  </button>

                  <a
                    href={`https://wa.me/6285693366142?text=${encodeURIComponent(`Halo Haris Musafa (Arjuna Dev), saya melihat portofolio "${activeModalProject.title}" dan tertarik membuat website serupa.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-white hover:bg-emerald-50 text-emerald-800 text-xs font-bold shadow transition-all active:scale-95 flex items-center gap-2"
                  >
                    <WhatsAppLogo className="w-4 h-4 text-emerald-600" />
                    <span>Konsultasi WA</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
