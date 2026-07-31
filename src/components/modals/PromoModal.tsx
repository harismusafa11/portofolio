"use client";

import React, { useState, useEffect } from "react";
import { X, Clock, CheckCircle2, ShieldCheck, ArrowRight, Tag } from "lucide-react";
import { WhatsAppLogo } from "@/components/icons/BrandIcons";
import confetti from "canvas-confetti";

export const PromoModal: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const [promoData, setPromoData] = useState({
    title: "Voucher Diskon Rp 500.000 + Free Domain .COM!",
    badgeText: "PROMO SPESIAL PERDANA",
    discountAmount: 500000,
    originalPrice: 1999000,
    promoPrice: 1499000,
    slotsRemaining: 2,
    isActive: false,
  });

  useEffect(() => {
    setMounted(true);
    fetch("/api/promo")
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setPromoData(data);
          if (data.isActive !== false) {
            setIsOpen(true);
          } else {
            setIsOpen(false);
          }
        }
      })
      .catch(() => {})
      .finally(() => {
        setHasLoaded(true);
      });
  }, []);

  // Listen for custom trigger events to force open promo modal (e.g. from mobile widget)
  useEffect(() => {
    const handleForceOpen = () => setIsOpen(true);
    window.addEventListener("open_promo_modal", handleForceOpen);
    return () => window.removeEventListener("open_promo_modal", handleForceOpen);
  }, []);

  const handleClose = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("promo_modal_closed"));
    }
    setIsOpen(false);
  };

  const handleClaim = () => {
    try {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    } catch {
      // ignore
    }

    // Log lead to Neon DB
    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Klien Claim Voucher Promo",
        city: "Indonesia",
        packageTitle: promoData.title,
        notes: `Klaim voucher promo diskon Rp ${promoData.discountAmount.toLocaleString("id-ID")}`,
      }),
    }).catch(() => {});

    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("promo_modal_closed"));
    }
    setIsOpen(false);

    const message = encodeURIComponent(
      `Halo Haris Musafa (Arjuna Dev), saya ingin mengklaim ${promoData.title}!`
    );
    window.open(`https://wa.me/6285693366142?text=${message}`, "_blank");
  };

  if (!mounted || !hasLoaded || !isOpen || !promoData.isActive) return null;

  const discountPercent = Math.round((promoData.discountAmount / promoData.originalPrice) * 100);

  return (
    <div className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200 select-none">
      <div className="bg-gradient-to-b from-[#1c2230] to-[#121622] border border-sky-500/40 rounded-3xl max-w-md sm:max-w-lg w-full p-4 sm:p-6 shadow-[0_25px_70px_rgba(0,0,0,0.85)] relative text-gray-100 font-sans overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Subtle Ambient Background Lighting */}
        <div className="absolute -top-20 -left-20 w-56 h-56 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button Top-Right */}
        <button
          onClick={handleClose}
          className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-all cursor-pointer z-20"
          title="Tutup Promo"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Header Badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 shadow-sm">
            <Tag className="w-3 h-3" />
            <span>{promoData.badgeText}</span>
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-sky-500/10 text-sky-300 border border-sky-500/20 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>Sisa {promoData.slotsRemaining} Slot</span>
          </span>
        </div>

        {/* Promo Title & Main Value Prop */}
        <div className="space-y-1.5 mb-3.5">
          <h2 className="text-lg sm:text-2xl font-extrabold text-white leading-tight tracking-tight">
            {promoData.title}
          </h2>
          <p className="text-xs text-gray-300 leading-relaxed">
            Dapatkan opsi pembuatan website profesional ultra-kencang, responsive, &amp; siap pakai untuk bisnis/UMKM Anda minggu ini.
          </p>
        </div>

        {/* Special Pricing Box */}
        <div className="mb-3.5 p-3 sm:p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Harga Paket Promo</div>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-lg sm:text-2xl font-extrabold text-emerald-400">
                Rp {promoData.promoPrice.toLocaleString("id-ID")}
              </span>
              <span className="text-xs text-gray-400 line-through">
                Rp {promoData.originalPrice.toLocaleString("id-ID")}
              </span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold font-mono border border-emerald-500/30">
            HEMAT {discountPercent}%
          </span>
        </div>

        {/* Key Included Features List */}
        <div className="space-y-2 mb-4 text-xs text-gray-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Gratis Domain .COM + HTTPS SSL + Cloud Hosting Speed High</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Tampilan 100% Mobile &amp; Desktop OS-Native Responsive</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Integrasi Tombol WhatsApp Direct + SEO Google Rich Snippet</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Garansi Pengerjaan 3-5 Hari Kerja Tepat Waktu</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          <button
            onClick={handleClaim}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-600 to-sky-600 hover:from-emerald-400 hover:to-sky-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-950/50 border border-emerald-400/30 flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <WhatsAppLogo className="w-4 h-4 text-white" />
            <span>Klaim Voucher Promo WA</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleClose}
            className="w-full sm:w-auto py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-gray-300 text-xs font-semibold transition-colors cursor-pointer text-center"
          >
            Nanti Saja
          </button>
        </div>

        {/* Footer Guarantee */}
        <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] text-gray-400 font-mono">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>Konsultasi Gratis Tanpa Komitmen</span>
          </span>
          <span className="text-gray-400">Arjuna Dev 2026</span>
        </div>

      </div>
    </div>
  );
};
