"use client";

import React, { useEffect, useRef } from "react";
import { useWindowStore } from "@/store/windowStore";
import { X, ShieldCheck, CheckCircle2 } from "lucide-react";
import { WhatsAppLogo } from "@/components/icons/BrandIcons";

const BUYERS_POOL = [
  { name: "Rayhan Kurnia", city: "Bandung", package: "Paket Business (Rp 2.999.000)" },
  { name: "Devi Megawati", city: "Surabaya", package: "Paket Toko Online (Rp 5.999.000)" },
  { name: "Faris Syahputra", city: "Semarang", package: "Paket Starter (Rp 1.299.000)" },
  { name: "Rafi K.", city: "Jakarta Selatan", package: "Paket Business (Rp 2.999.000)" },
  { name: "Fitri Handayani", city: "Yogyakarta", package: "Paket Business (Rp 2.999.000)" },
  { name: "Hendra Wijaya", city: "Medan", package: "Paket Custom Web App" },
  { name: "Dina Lestari", city: "Denpasar", package: "Paket Toko Online (Rp 5.999.000)" },
  { name: "Rian Prasetya", city: "Malang", package: "Paket Starter (Rp 1.299.000)" },
];

export const ToastNotification: React.FC = () => {
  const toasts = useWindowStore((state) => state.toasts);
  const addToast = useWindowStore((state) => state.addToast);
  const removeToast = useWindowStore((state) => state.removeToast);

  const hasTriggeredWelcomeRef = useRef(false);
  const hasTriggeredOrderRef = useRef(false);

  // Initial welcome toast (after 2 seconds)
  useEffect(() => {
    if (hasTriggeredWelcomeRef.current) return;
    hasTriggeredWelcomeRef.current = true;

    const timer = setTimeout(() => {
      addToast(
        "Arjuna Dev System Online",
        "Haris Musafa (Senior Fullstack Developer) online & siap berkonsultasi mengenai proyek website/app Anda."
      );
    }, 2000);

    return () => clearTimeout(timer);
  }, [addToast]);

  // Natural Randomized Order Toast (Triggers EXACTLY ONCE per visit after user explores site for 18-25 seconds)
  useEffect(() => {
    if (hasTriggeredOrderRef.current) return;
    hasTriggeredOrderRef.current = true;

    const randomDelay = Math.floor(Math.random() * 7000) + 18000; // 18-25 seconds delay

    const randomOrderTimer = setTimeout(() => {
      // Pick random buyer, city, and package from authentic pool
      const randomBuyer = BUYERS_POOL[Math.floor(Math.random() * BUYERS_POOL.length)];
      
      addToast(
        "🛒 Order Klien Terbaru",
        `${randomBuyer.name} (${randomBuyer.city}) baru saja memesan ${randomBuyer.package} untuk digitalisasi usahanya.`
      );
    }, randomDelay);

    return () => clearTimeout(randomOrderTimer);
  }, [addToast]);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-14 right-4 z-[9995] flex flex-col gap-2 max-w-sm w-full select-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="p-4 rounded-2xl bg-[#1e2230]/95 backdrop-blur-2xl border border-white/15 shadow-2xl text-gray-100 animate-in slide-in-from-right duration-300 flex flex-col gap-2.5 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{toast.title}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-400">{toast.time}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="p-1 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                title="Tutup Notifikasi"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <p className="text-xs text-gray-200 leading-relaxed">{toast.message}</p>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Garansi 90 Hari Bug</span>
            </span>
            <a
              href="https://wa.me/6285693366142?text=Halo%20Haris%20Musafa,%20saya%20tertarik%20bekerja%20sama%20membuat%20website."
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow transition-all flex items-center gap-1.5 border border-white/10 active:scale-95 cursor-pointer"
            >
              <WhatsAppLogo className="w-4 h-4" />
              <span>Order WA</span>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};
