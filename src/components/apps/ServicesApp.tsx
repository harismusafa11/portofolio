"use client";

import React, { useState, useEffect, memo } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Layers,
  ShieldCheck,
  Gift,
  Clock,
  Globe,
  Server,
  Search,
  Smartphone,
  Zap,
  Check,
  MessageSquare,
  HelpCircle,
  Tag,
} from "lucide-react";
import { SERVICES_DATA, ServicePackage, UMKM_ADVANTAGES } from "@/data/services";
import { WhatsAppLogo } from "@/components/icons/BrandIcons";
import { TestimonialsApp } from "./TestimonialsApp";

import { WaOrderModal } from "@/components/modals/WaOrderModal";

const ADVANTAGE_ICONS: Record<string, React.FC<{ className?: string }>> = {
  Globe,
  Server,
  Search,
  Smartphone,
  Zap,
  ShieldCheck,
};

const ACCENT_STYLES: Record<
  string,
  {
    border: string;
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    iconColor: string;
    btnClass: string;
    cardBg: string;
  }
> = {
  green: {
    border: "border-emerald-500/30 hover:border-emerald-500/60 shadow-lg shadow-emerald-950/20",
    badgeBg: "bg-emerald-500/10",
    badgeText: "text-emerald-400",
    badgeBorder: "border-emerald-500/30",
    iconColor: "text-emerald-400",
    btnClass: "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-emerald-950/50 border border-emerald-400/30 tracking-wide text-xs flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 group cursor-pointer",
    cardBg: "bg-[#181818]",
  },
  cyan: {
    border: "border-sky-500/60 shadow-[0_0_35px_rgba(14,165,233,0.2)] ring-2 ring-sky-500/40",
    badgeBg: "bg-[#0078d4]",
    badgeText: "text-white font-bold",
    badgeBorder: "border-sky-400/40",
    iconColor: "text-sky-400",
    btnClass: "bg-gradient-to-r from-sky-500 via-[#0078d4] to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-extrabold py-3.5 px-5 rounded-xl shadow-xl shadow-sky-950/60 border border-sky-300/40 tracking-wide text-xs flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-95 group cursor-pointer",
    cardBg: "bg-[#1c1c1c]",
  },
  purple: {
    border: "border-purple-500/30 hover:border-purple-500/60 shadow-lg shadow-purple-950/20",
    badgeBg: "bg-purple-500/10",
    badgeText: "text-purple-400",
    badgeBorder: "border-purple-500/30",
    iconColor: "text-purple-400",
    btnClass: "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-purple-950/50 border border-purple-400/30 tracking-wide text-xs flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 group cursor-pointer",
    cardBg: "bg-[#181818]",
  },
  red: {
    border: "border-rose-500/30 hover:border-rose-500/60 shadow-lg shadow-rose-950/20",
    badgeBg: "bg-rose-500/10",
    badgeText: "text-rose-400",
    badgeBorder: "border-rose-500/30",
    iconColor: "text-rose-400",
    btnClass: "bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-rose-950/50 border border-rose-400/30 tracking-wide text-xs flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 group cursor-pointer",
    cardBg: "bg-[#181818]",
  },
};

import { useWindowStore } from "@/store/windowStore";

export const ServicesApp: React.FC = memo(function ServicesApp() {
  const [servicesList, setServicesList] = useState<ServicePackage[]>(SERVICES_DATA);
  const [activeTab, setActiveTab] = useState<"matrix" | "testimonials">("matrix");
  const openWindow = useWindowStore((state) => state.openWindow);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped: ServicePackage[] = data.map((item: any) => {
            const fallback = SERVICES_DATA.find((s) => s.id === item.id);
            const accentColor = fallback?.accentColor || (item.id === "ecommerce" ? "red" : item.id === "advanced" ? "purple" : item.isPopular ? "cyan" : "green");
            let parsedFeatures = [];
            try {
              parsedFeatures = typeof item.featuresJson === "string" ? JSON.parse(item.featuresJson) : (item.featuresJson || fallback?.features || []);
            } catch (e) {
              parsedFeatures = fallback?.features || [];
            }
            return {
              id: item.id,
              title: item.name,
              subtitle: item.desc,
              price: item.priceMin >= 10000000 
                ? "Mulai Rp 10.000.000" 
                : `Rp ${item.priceMin.toLocaleString("id-ID")}`,
              isPromoActive: item.isPromoActive ?? fallback?.isPromoActive ?? false,
              originalPrice: item.originalPrice 
                ? `Rp ${item.originalPrice.toLocaleString("id-ID")}` 
                : (fallback?.originalPrice || undefined),
              priceNote: fallback?.priceNote || "Sudah termasuk free hosting",
              badge: fallback?.badge || (item.isPopular ? "PALING POPULER" : undefined),
              popular: item.isPopular ?? fallback?.popular ?? false,
              accentColor: accentColor as any,
              features: parsedFeatures,
              estimatedTime: fallback?.estimatedTime || `~${item.baseDays} Hari Kerja`,
              ctaText: "Pilih Paket & Isi Form Order",
              waMessage: `Halo Arjuna Dev, saya berminat dengan ${item.name}. Mohon informasi kelanjutannya.`,
            };
          });
          setServicesList(mapped);
        }
      })
      .catch(() => {});
  }, []);

  // Wa Order Modal State
  const [isWaModalOpen, setIsWaModalOpen] = useState(false);
  const [selectedPkgTitle, setSelectedPkgTitle] = useState("");

  const openOrderWizard = useWindowStore((state) => state.openOrderWizard);
  const focusWindow = useWindowStore((state) => state.focusWindow);

  const handleOrder = (e: React.MouseEvent, pkg: ServicePackage) => {
    e.stopPropagation();
    let pkgKey = "basic";
    const idLower = (pkg.id || "").toLowerCase();
    const titleLower = (pkg.title || "").toLowerCase();

    if (idLower === "basic" || idLower === "starter" || titleLower.includes("basic") || titleLower.includes("starter")) {
      pkgKey = "basic";
    } else if (idLower === "advanced" || titleLower.includes("advanced")) {
      pkgKey = "advanced";
    } else if (idLower === "business" || titleLower.includes("business")) {
      pkgKey = "business";
    } else if (idLower.includes("ecommerce") || idLower.includes("toko") || titleLower.includes("ecommerce") || titleLower.includes("e-commerce")) {
      pkgKey = "ecommerce";
    }

    openOrderWizard(pkgKey);
    focusWindow("order_wizard");
  };

  return (
    <div className="flex flex-col gap-5 text-gray-200 font-sans pb-6 select-text">
      {/* Top Segmented Tabs Switcher (High-End Glass Segmented Control) */}
      <div className="grid grid-cols-2 gap-1.5 p-1.5 rounded-2xl bg-[#121212]/90 backdrop-blur-md border border-white/10 w-full text-xs font-semibold shrink-0 shadow-inner">
        <button
          onClick={() => setActiveTab("matrix")}
          className={`px-2 sm:px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all text-[11px] sm:text-xs cursor-pointer ${
            activeTab === "matrix"
              ? "bg-gradient-to-r from-[#0078d4] to-sky-600 text-white shadow-md font-extrabold border border-white/20"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <Layers className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Paket & Harga<span className="hidden sm:inline"> UMKM</span></span>
        </button>

        <button
          onClick={() => setActiveTab("testimonials")}
          className={`px-2 sm:px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all text-[11px] sm:text-xs cursor-pointer ${
            activeTab === "testimonials"
              ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md font-extrabold border border-white/20"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Testimoni<span className="hidden sm:inline"> Klien</span></span>
        </button>
      </div>

      {/* Tab 3: Testimonials */}
      {activeTab === "testimonials" && <TestimonialsApp />}

      {/* Tab 1: Services Packages & Matrix */}
      {activeTab === "matrix" && (
        <div className="space-y-6">
          {/* Main Hero Header */}
          <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-r from-[#141b26] via-[#1a2333] to-[#111722] border border-white/10 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden">
            <div className="space-y-2 relative z-10">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Resmi Arjuna Dev
                </span>
              </div>
              <p className="text-xs text-gray-300 max-w-2xl leading-relaxed">
                Investasi terbaik untuk bisnis Anda. Website profesional, kencang, langsung terhubung ke WhatsApp, dan mudah ditemukan calon pelanggan di Google.
              </p>
            </div>

            <a
              href="https://wa.me/6285693366142?text=Halo%20Arjuna%20Dev,%20saya%20mau%20konsultasi%20paket%20pembuatan%20website%20UMKM."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#25D366] to-emerald-600 hover:from-[#20bd5a] hover:to-emerald-500 text-white text-xs font-extrabold shadow-lg shadow-emerald-950/50 transition-all flex items-center justify-center gap-2.5 shrink-0 border border-white/20 active:scale-95 w-full md:w-auto group cursor-pointer"
            >
              <WhatsAppLogo className="w-4 h-4 text-white shrink-0" />
              <span>Konsultasi Gratis via WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5 text-white shrink-0 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Microcopy Conversion Assurance Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-2 text-[11px] text-gray-300 font-medium">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Konsultasi gratis tanpa komitmen</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-2 text-[11px] text-gray-300 font-medium">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Sudah termasuk Domain .com & Hosting 1 thn</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-2 text-[11px] text-gray-300 font-medium">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Garansi perbaikan bug hingga 90 hari</span>
            </div>
          </div>

          {/* 4 High-Conversion Pricing Cards Grid (Spacious 2 Columns on Floating Window / 4 Columns on Widescreen) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 items-stretch">
            {servicesList.map((pkg) => {
              const style = ACCENT_STYLES[pkg.accentColor] || ACCENT_STYLES.cyan;

              return (
                <div
                  key={pkg.id}
                  className={`p-4 sm:p-5 rounded-2xl flex flex-col justify-between transition-all duration-300 transform-gpu hover:scale-[1.01] relative ${style.cardBg} ${style.border} shadow-xl`}
                >
                  {/* Paling Populer Badge Header (Strictly NO Star Icons) */}
                  {pkg.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-sky-500 to-[#0078d4] text-white text-[10px] font-black tracking-wider shadow-lg border border-white/40 uppercase shrink-0 z-10 whitespace-nowrap flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                      <span>{pkg.badge}</span>
                    </div>
                  )}

                  <div>
                    {/* Header Title & Subtitle */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-base font-bold text-white tracking-tight leading-snug">
                          {pkg.title}
                        </h3>
                        <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed min-h-[30px]">
                          {pkg.subtitle}
                        </p>
                      </div>

                      {!pkg.popular && pkg.badge && (
                        <span
                          className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border shrink-0 whitespace-nowrap ${style.badgeBg} ${style.badgeText} ${style.badgeBorder}`}
                        >
                          {pkg.badge}
                        </span>
                      )}
                    </div>

                    {/* Prominent Price & Sub-Price Microcopy */}
                    <div className="my-3 p-3 rounded-xl bg-black/40 border border-white/5">
                      {pkg.isPromoActive && pkg.originalPrice && (
                        <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-white/10">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase tracking-wider flex items-center gap-1">
                            <Tag className="w-3 h-3 text-rose-400" />
                            <span>PROMO DISKON</span>
                          </span>
                          <span className="text-xs text-gray-400 line-through font-mono font-semibold">
                            {pkg.originalPrice}
                          </span>
                        </div>
                      )}
                      <div className="text-xl sm:text-2xl font-black text-white tracking-tight font-mono">
                        {pkg.price}
                      </div>
                      <div className="text-[10px] text-emerald-400 font-mono mt-0.5 flex items-center gap-1 font-medium">
                        <Check className="w-3 h-3 shrink-0" />
                        <span>{pkg.priceNote}</span>
                      </div>
                    </div>

                    {/* Estimasi Pengerjaan */}
                    <div className="flex items-center gap-2 text-xs text-gray-300 font-mono mb-3.5 px-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Estimasi: {pkg.estimatedTime}</span>
                    </div>

                    {/* Features List */}
                    <div className="space-y-1.5 mb-4">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                        Fitur Utama Bisnis:
                      </span>
                      {pkg.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-gray-300 leading-snug">
                          <CheckCircle2 className={`w-3.5 h-3.5 ${style.iconColor} shrink-0 mt-0.5`} />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Paket Business Bonuses */}
                    {pkg.bonuses && (
                      <div className="mt-3 p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 space-y-1">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-sky-300">
                          <Gift className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>BONUS SPESIAL:</span>
                        </div>
                        {pkg.bonuses.map((b, idx) => (
                          <div key={idx} className="text-[10px] text-sky-200 flex items-center gap-1.5 pl-1">
                            <span className="text-amber-400 font-bold">•</span>
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Ultra-Editorial High-Conversion CTA Button */}
                  <div className="pt-3.5 border-t border-white/10 mt-4">
                    <button
                      onClick={(e) => handleOrder(e, pkg)}
                      className={`w-full ${style.btnClass}`}
                    >
                      <WhatsAppLogo className="w-4 h-4 text-white shrink-0" />
                      <span>{pkg.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Section Tambahan: "Kenapa UMKM Memilih Arjuna Dev?" */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#181818] border border-white/10 shadow-lg space-y-5">
            <div className="text-center max-w-xl mx-auto space-y-1">
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Kenapa UMKM & Bisnis Memilih Arjuna Dev?
              </h2>
              <p className="text-xs text-gray-400 leading-relaxed">
                Kami memahami kebutuhan pemilik usaha di Indonesia: website yang langsung menghasilkan pelanggan tanpa pusing masalah teknis.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {UMKM_ADVANTAGES.map((adv, idx) => {
                const Icon = ADVANTAGE_ICONS[adv.iconName] || ShieldCheck;
                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#222222] border border-white/10 hover:border-sky-500/40 transition-all flex items-start gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors">
                        {adv.title}
                      </h3>
                      <p className="text-[11px] text-gray-400 leading-relaxed">
                        {adv.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Interactive Order Modal */}
      <WaOrderModal
        isOpen={isWaModalOpen}
        onClose={() => setIsWaModalOpen(false)}
        initialPackageTitle={selectedPkgTitle}
      />
    </div>
  );
});
