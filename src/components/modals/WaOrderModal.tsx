"use client";

import React, { useState, useEffect } from "react";
import { X, Send, ShieldCheck, CheckCircle2, Building2, MapPin } from "lucide-react";
import { WhatsAppLogo } from "@/components/icons/BrandIcons";
import confetti from "canvas-confetti";

interface WaOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackageTitle?: string;
}

export const WaOrderModal: React.FC<WaOrderModalProps> = ({
  isOpen,
  onClose,
  initialPackageTitle = "Paket Business — Rp 2.999.000",
}) => {
  const [businessName, setBusinessName] = useState("");
  const [city, setCity] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(initialPackageTitle);
  const [notes, setNotes] = useState("");

  const [prevTitle, setPrevTitle] = useState(initialPackageTitle);
  if (prevTitle !== initialPackageTitle) {
    setPrevTitle(initialPackageTitle);
    setSelectedPackage(initialPackageTitle);
  }

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Trigger celebration confetti
    try {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch {
      // ignore
    }

    // Log lead to Neon DB
    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: businessName || "Pengunjung Website",
        city: city || "Indonesia",
        packageTitle: selectedPackage,
        notes: notes || null,
      }),
    }).catch(() => {});

    const message = `Halo Haris Musafa (Arjuna Dev),%0A%0ASaya berminat memesan *${encodeURIComponent(
      selectedPackage
    )}* untuk usaha saya:%0A%0A• *Nama Usaha/Pemilik*: ${encodeURIComponent(
      businessName || "-"
    )}%0A• *Kota/Lokasi*: ${encodeURIComponent(city || "-")}${
      notes ? `%0A• *Kebutuhan Khusus*: ${encodeURIComponent(notes)}` : ""
    }%0A%0AMohon informasi langkah pengerjaan dan pembayaran selengkapnya. Terima kasih!`;

    window.open(`https://wa.me/6285693366142?text=${message}`, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#181d29] border border-white/15 rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl relative text-gray-100 font-sans overflow-hidden">
        {/* Top Decorative Gradient */}
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shrink-0">
              <WhatsAppLogo className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                Form Konsultasi WA Arjuna Dev
              </h3>
              <p className="text-[11px] text-emerald-400 font-medium">
                Poin kebutuhan akan otomatis terformat rapi di WA
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
            title="Tutup Modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-3.5 relative z-10 text-xs">
          {/* Package Selection Dropdown */}
          <div>
            <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1.5">
              Pilihan Paket Website:
            </label>
            <select
              value={selectedPackage}
              onChange={(e) => setSelectedPackage(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white font-medium focus:outline-none focus:border-emerald-500"
            >
              <option value="Paket Starter — Rp 1.299.000">Paket Starter — Rp 1.299.000 (UMKM Baru)</option>
              <option value="Paket Business — Rp 2.999.000">Paket Business — Rp 2.999.000 (PALING POPULER)</option>
              <option value="Paket Toko Online — Rp 5.999.000">Paket Toko Online — Rp 5.999.000 (Retail & Catalog)</option>
              <option value="Paket Custom Web App — Mulai Rp 10.000.000">Paket Custom Web App — Mulai Rp 10.000.000</option>
            </select>
          </div>

          {/* Business Name */}
          <div>
            <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1.5">
              Nama Usaha / Pemilik Toko: <span className="text-emerald-400">*</span>
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Contoh: Rayhan - Kopi Kenangan Resto"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* City Location */}
          <div>
            <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1.5">
              Kota / Lokasi Bisnis: <span className="text-emerald-400">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Contoh: Bandung / Surabaya / Jakarta"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Optional Notes */}
          <div>
            <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1.5">
              Catatan / Kebutuhan Tambahan (Opsional):
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Contoh: Saya butuh web dengan tombol order WA dan peta Google Maps..."
              className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 leading-relaxed resize-none"
            />
          </div>

          {/* Guarantee Note */}
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Konsultasi 100% Gratis & Kemitraan Dilengkapi Garansi Bug 90 Hari.</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer border border-white/10 mt-2"
          >
            <WhatsAppLogo className="w-4.5 h-4.5 text-white" />
            <span>Lanjutkan Order via WhatsApp ➔</span>
          </button>
        </form>
      </div>
    </div>
  );
};
