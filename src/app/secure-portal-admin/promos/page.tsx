"use client";

import React, { useState, useEffect } from "react";
import { Tag, Save, RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";

export default function AdminPromosPage() {
  const [serviceId, setServiceId] = useState("basic");
  const [servicesList, setServicesList] = useState<any[]>([]);
  const [title, setTitle] = useState("Voucher Diskon Rp 500.000 + Free Domain .COM!");
  const [badgeText, setBadgeText] = useState("PROMO SPESIAL PERDANA");
  const [discountAmount, setDiscountAmount] = useState(500000);
  const [originalPrice, setOriginalPrice] = useState(1999000);
  const [promoPrice, setPromoPrice] = useState(1499000);
  const [slotsRemaining, setSlotsRemaining] = useState(2);
  const [isActive, setIsActive] = useState(true);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/admin/services");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setServicesList(data);
      }
    } catch {
      // ignore
    }
  };

  const fetchPromo = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/promos");
      if (res.ok) {
        const data = await res.json();
        if (data) {
          setServiceId(data.serviceId || "basic");
          setTitle(data.title || title);
          setBadgeText(data.badgeText || badgeText);
          setDiscountAmount(data.discountAmount || discountAmount);
          setOriginalPrice(data.originalPrice || originalPrice);
          setPromoPrice(data.promoPrice || promoPrice);
          setSlotsRemaining(data.slotsRemaining !== undefined ? data.slotsRemaining : slotsRemaining);
          setIsActive(data.isActive !== undefined ? Boolean(data.isActive) : true);
        }
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
    fetchPromo();
  }, []);

  const handleSelectService = (selectedId: string) => {
    setServiceId(selectedId);
    const targetService = servicesList.find((s) => s.id === selectedId);
    if (targetService) {
      const orig = targetService.originalPrice || targetService.priceMin * 1.5;
      const promo = targetService.priceMin;
      const discount = Math.max(0, orig - promo);
      setOriginalPrice(orig);
      setPromoPrice(promo);
      setDiscountAmount(discount);
      setTitle(`Voucher Diskon Rp ${discount.toLocaleString("id-ID")} — ${targetService.name} + Free Domain .COM!`);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/promos", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId,
          title,
          badgeText,
          discountAmount,
          originalPrice,
          promoPrice,
          slotsRemaining,
          isActive,
        }),
      });

      if (res.ok) {
        setMessage("✅ Banner & Voucher Promo berhasil disimpan dan tersinkronkan!");
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage("❌ Gagal menyimpan data promo.");
      }
    } catch {
      setMessage("❌ Terjadi kesalahan jaringan.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-sans select-none">
      {/* Page Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#141924] border border-white/10 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-sky-400" />
            <h1 className="text-lg font-extrabold text-white">Kelola Banner &amp; Voucher Diskon Frontend</h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Ubah judul penawaran, nominal diskon, harga promo, kuota sisa slot, dan status penayangan modal promo real-time.
          </p>
        </div>

        <button
          onClick={fetchPromo}
          disabled={loading}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-gray-200 transition-all active:scale-95 flex items-center gap-2 shrink-0 border border-white/10 cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-sky-400" : ""}`} />
          <span>Muat Ulang Data</span>
        </button>
      </div>

      {/* Message Alert */}
      {message && (
        <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-between shadow-lg">
          <span>{message}</span>
          <button onClick={() => setMessage(null)} className="text-gray-400 hover:text-white">&times;</button>
        </div>
      )}

      {/* Main Promo Form Card */}
      <div className="p-6 sm:p-7 rounded-2xl bg-[#141924] border border-white/10 shadow-xl space-y-5">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/20 space-y-2">
            <label className="block text-xs font-mono font-bold text-sky-300">
              🔗 Pilih Paket Layanan Terkait Voucher Promo:
            </label>
            <select
              value={serviceId}
              onChange={(e) => handleSelectService(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#0f131c] border border-sky-500/40 text-xs font-bold text-amber-300 focus:outline-none focus:border-amber-400"
            >
              {servicesList.length > 0 ? (
                servicesList.map((svc) => (
                  <option key={svc.id} value={svc.id}>
                    {svc.name} — Rp {svc.priceMin.toLocaleString("id-ID")} ({svc.category})
                  </option>
                ))
              ) : (
                <>
                  <option value="basic">Paket Basic — Rp 500.000</option>
                  <option value="advanced">Paket Advanced — Rp 900.000</option>
                  <option value="business">Paket Business — Rp 1.500.000</option>
                  <option value="ecommerce">Paket E-Commerce — Rp 5.000.000</option>
                </>
              )}
            </select>
            <p className="text-[11px] text-gray-400">
              Memilih paket akan otomatis menyesuaikan harga promo, harga coret, dan kalkulasi nominal voucher diskon.
            </p>
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold text-gray-300 mb-1.5">Judul Utama Penawaran Promo</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold text-gray-300 mb-1.5">Teks Badge Header (Misal: PROMO SPESIAL PERDANA)</label>
            <input
              type="text"
              required
              value={badgeText}
              onChange={(e) => setBadgeText(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-semibold text-gray-300 mb-1.5">Nominal Potongan Diskon (Rp)</label>
              <input
                type="number"
                required
                value={discountAmount}
                onChange={(e) => setDiscountAmount(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold text-gray-300 mb-1.5">Sisa Slot Kuota Klien</label>
              <input
                type="number"
                required
                value={slotsRemaining}
                onChange={(e) => setSlotsRemaining(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-semibold text-gray-300 mb-1.5">Harga Coret Normal (Rp)</label>
              <input
                type="number"
                required
                value={originalPrice}
                onChange={(e) => setOriginalPrice(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold text-gray-300 mb-1.5">Harga Bersih Promo (Rp)</label>
              <input
                type="number"
                required
                value={promoPrice}
                onChange={(e) => setPromoPrice(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div className="pt-3 flex items-center justify-between border-t border-white/10">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 rounded text-sky-500 focus:ring-sky-500 bg-white/10 border-white/20 cursor-pointer"
              />
              <span className="text-xs font-semibold text-gray-200">Aktifkan Penayangan Modal Banner di Website</span>
            </label>

            <button
              type="submit"
              disabled={saving}
              className="py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg border border-emerald-400/30 flex items-center gap-2 cursor-pointer active:scale-95 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? "Menyimpan ke DB..." : "Simpan Perubahan Live"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
