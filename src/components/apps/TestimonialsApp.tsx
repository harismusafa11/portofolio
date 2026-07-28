"use client";

import React, { useState, useEffect, memo } from "react";
import { TESTIMONIALS_DATA, Testimonial } from "@/data/testimonials";
import { WhatsAppLogo } from "@/components/icons/BrandIcons";

export const TestimonialsApp: React.FC = memo(function TestimonialsApp() {
  const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>(TESTIMONIALS_DATA);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeModalTesti, setActiveModalTesti] = useState<Testimonial | null>(null);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped: Testimonial[] = data.map((item: any) => ({
            id: String(item.id),
            clientName: item.clientName,
            role: item.clientRole || "Owner",
            brandName: item.company || "Toko / Bisnis",
            category: (item.category as any) || "landing",
            categoryLabel: item.category === "ecommerce" ? "E-Commerce" : "Landing Page",
            projectTitle: `Project Pembuatan ${item.category === "ecommerce" ? "Toko Online" : "Landing Page"}`,
            feedback: item.review,
            resultMetric: item.metric || "100% Delivery Score",
            date: "Terbaru 2026",
            initials: item.clientName ? item.clientName.split(" ").map((n: string) => n[0]).join("").slice(0, 2) : "CL",
          }));
          setTestimonialsList(mapped);
        }
      })
      .catch(() => {});
  }, []);

  const categories = [
    { id: "all", label: "Semua Ulasan" },
    { id: "landing", label: "Landing Page" },
    { id: "ecommerce", label: "E-Commerce" },
  ];

  const filteredTestimonials = testimonialsList.filter(
    (t) => selectedCategory === "all" || t.category === selectedCategory
  );

  return (
    <div className="flex flex-col h-full text-gray-200 font-sans pb-4 select-text overflow-y-auto custom-scrollbar">
      {/* Top Header */}
      <div className="mb-5 pb-3 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-sky-400 uppercase block mb-1">
            CLIENT REPUTATION & REVIEWS
          </span>
          <h2 className="text-lg font-semibold text-white tracking-tight">
            Ulasan Klien Landing Page & E-Commerce
          </h2>
        </div>

        {/* Minimal Category Filter Tabs */}
        <div className="flex items-center gap-1 bg-[#141414] p-1 rounded-xl border border-white/10 text-xs shrink-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                selectedCategory === cat.id
                  ? "bg-white/15 text-white font-medium shadow-sm"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Editorial Testimonials Grid (Strictly NO Star Icons) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        {filteredTestimonials.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveModalTesti(item)}
            className="p-5 rounded-2xl bg-[#1d1d1d] border border-white/10 hover:border-white/30 transition-all cursor-pointer flex flex-col justify-between group shadow-sm hover:shadow-md"
          >
            <div>
              {/* Category & Project Date */}
              <div className="flex items-center justify-between text-xs text-gray-400 mb-2 font-mono">
                <span className="text-sky-300 font-medium">{item.categoryLabel}</span>
                <span>{item.date}</span>
              </div>

              <h3 className="text-xs font-semibold text-white group-hover:text-sky-300 transition-colors mb-2.5 leading-snug">
                {item.projectTitle}
              </h3>

              {/* Clean Editorial Quote Text */}
              <p className="text-xs text-gray-300 leading-relaxed mb-3">
                &ldquo;{item.feedback}&rdquo;
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 space-y-3">
              {/* Subtle Metric Result */}
              <div className="text-xs text-emerald-400 font-mono">
                Hasil: {item.resultMetric}
              </div>

              {/* Minimal Client Signature (Individual Business Owner) */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#282828] border border-white/10 flex items-center justify-center text-white font-mono text-xs font-bold shrink-0">
                  {item.initials}
                </div>
                <div>
                  <div className="text-xs font-semibold text-white leading-tight">{item.clientName}</div>
                  <div className="text-[11px] text-gray-400">
                    {item.role}, <span className="text-gray-300">{item.brandName}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Clean Detail Modal */}
      {activeModalTesti && (
        <div className="fixed inset-0 z-[9999] bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-[540px] max-w-[95vw] rounded-2xl bg-[#1e1e1e] border border-white/20 shadow-2xl p-6 relative flex flex-col gap-4 text-gray-200 select-text">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#282828] border border-white/10 flex items-center justify-center text-white font-mono text-sm font-bold">
                  {activeModalTesti.initials}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{activeModalTesti.clientName}</h3>
                  <p className="text-xs text-gray-400">
                    {activeModalTesti.role}, {activeModalTesti.brandName}
                  </p>
                </div>
              </div>
              <span className="text-[11px] text-sky-400 font-mono">{activeModalTesti.categoryLabel}</span>
            </div>

            {/* Project & Quote */}
            <div>
              <div className="text-[11px] text-gray-400 font-mono mb-1">NAMA PROYEK:</div>
              <div className="text-xs font-semibold text-white mb-2.5">{activeModalTesti.projectTitle}</div>
              <p className="text-xs text-gray-300 leading-relaxed bg-[#161616] p-4 rounded-xl border border-white/10 italic">
                &ldquo;{activeModalTesti.feedback}&rdquo;
              </p>
            </div>

            {/* Impact Metric */}
            <div className="text-xs text-emerald-400 font-mono bg-emerald-950/30 p-3 rounded-xl border border-emerald-500/20">
              Hasil: {activeModalTesti.resultMetric}
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
              <button
                onClick={() => setActiveModalTesti(null)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-gray-300 transition-colors"
              >
                Tutup
              </button>

              <a
                href="https://wa.me/6285693366142?text=Halo%20Haris%20Musafa,%20saya%20tertarik%20bekerja%20sama%20pembuatan%20website."
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#107c41] hover:bg-[#0f6cbd] text-xs font-semibold text-white shadow transition-all flex items-center gap-2 border border-white/10"
              >
                <WhatsAppLogo className="w-4 h-4" />
                <span>Konsultasi Proyek WA</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
