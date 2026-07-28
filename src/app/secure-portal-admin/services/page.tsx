"use client";

import React, { useState, useEffect } from "react";
import { Briefcase, Plus, Edit2, Trash2, RefreshCw, CheckCircle2, X, Save, Star } from "lucide-react";

interface ServiceItem {
  id: string;
  name: string;
  category: string;
  priceMin: number;
  priceMax: number;
  originalPrice?: number | null;
  isPromoActive?: boolean;
  baseDays: number;
  desc: string;
  featuresJson: string;
  isPopular: boolean;
  isActive: boolean;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ServiceItem | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category: "Landing Page",
    priceMin: 1299000,
    priceMax: 1299000,
    originalPrice: 1999000,
    isPromoActive: true,
    baseDays: 4,
    desc: "",
    featuresStr: "",
    isPopular: false,
    isActive: true,
  });

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/services");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setServices(data);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      id: `pkg-${Date.now()}`,
      name: "",
      category: "Landing Page",
      priceMin: 1299000,
      priceMax: 1299000,
      originalPrice: 1999000,
      isPromoActive: true,
      baseDays: 4,
      desc: "",
      featuresStr: "Landing Page Premium\nDesain Responsif Mobile & Desktop\nTombol WA Direct\nGratis Domain .COM 1 Tahun",
      isPopular: false,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: ServiceItem) => {
    setEditingItem(item);
    let featList = [];
    try {
      featList = JSON.parse(item.featuresJson);
    } catch {
      featList = [];
    }
    setFormData({
      id: item.id,
      name: item.name,
      category: item.category,
      priceMin: item.priceMin,
      priceMax: item.priceMax,
      originalPrice: item.originalPrice || 1999000,
      isPromoActive: item.isPromoActive !== undefined ? item.isPromoActive : true,
      baseDays: item.baseDays,
      desc: item.desc,
      featuresStr: Array.isArray(featList) ? featList.join("\n") : "",
      isPopular: item.isPopular,
      isActive: item.isActive,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus paket layanan ini?")) return;
    try {
      const res = await fetch(`/api/admin/services?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setServices((prev) => prev.filter((s) => s.id !== id));
      }
    } catch {
      // ignore
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const featuresArray = formData.featuresStr
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);

    const payload = {
      ...formData,
      featuresJson: JSON.stringify(featuresArray),
    };

    const method = editingItem ? "PUT" : "POST";

    try {
      const res = await fetch("/api/admin/services", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchServices();
      }
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-6 font-sans select-none">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#141924] border border-white/10 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-amber-400" />
            <h1 className="text-lg font-extrabold text-white">Kelola Layanan &amp; Paket Harga (Services)</h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Atur nama paket, harga promo, harga coret, status aktif promo, durasi, dan fitur layanan Arjuna Dev.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchServices}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-gray-200 transition-all active:scale-95 flex items-center gap-2 border border-white/10 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-sky-400" : ""}`} />
            <span>Refresh Data</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-xs shadow border border-amber-400/30 flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Paket Baru</span>
          </button>
        </div>
      </div>

      {/* Main Table List */}
      <div className="p-6 rounded-2xl bg-[#141924] border border-white/10 shadow-xl space-y-4">
        {services.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-xs font-mono">
            {loading ? "Memuat paket layanan dari Neon DB..." : "Belum ada paket layanan tersimpan."}
          </div>
        ) : (
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="text-[10px] font-mono uppercase bg-white/5 text-gray-400">
                <tr>
                  <th className="p-3 rounded-l-lg">ID Paket</th>
                  <th className="p-3">Nama Layanan</th>
                  <th className="p-3">Harga Promo (Rp)</th>
                  <th className="p-3">Harga Coret (Rp)</th>
                  <th className="p-3">Status Promo</th>
                  <th className="p-3">Populer</th>
                  <th className="p-3">Status Layanan</th>
                  <th className="p-3 rounded-r-lg text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {services.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-3 font-mono text-amber-400 font-bold">{item.id}</td>
                    <td className="p-3 font-bold text-white">{item.name}</td>
                    <td className="p-3 font-mono text-emerald-400 font-bold">
                      Rp {item.priceMin.toLocaleString("id-ID")}
                    </td>
                    <td className="p-3 font-mono text-gray-400 line-through">
                      {item.originalPrice ? `Rp ${item.originalPrice.toLocaleString("id-ID")}` : "-"}
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                        item.isPromoActive ? "bg-rose-500/20 text-rose-300 border-rose-500/30" : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                      }`}>
                        {item.isPromoActive ? "PROMO AKTIF" : "NORMAL"}
                      </span>
                    </td>
                    <td className="p-3">
                      {item.isPopular && (
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono border border-amber-500/30">
                          BEST SELLER
                        </span>
                      )}
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        item.isActive ? "bg-emerald-500/20 text-emerald-300" : "bg-rose-500/20 text-rose-300"
                      }`}>
                        {item.isActive ? "Aktif" : "Non-Aktif"}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-1.5">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-1.5 rounded bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 transition-colors"
                        title="Edit Paket"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                        title="Hapus Paket"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Form Edit / Tambah Paket */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#181e2b] border border-white/15 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative text-gray-100 font-sans max-h-[92vh] overflow-y-auto custom-scrollbar">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-base font-extrabold text-white mb-4">
              {editingItem ? "Edit Paket Layanan & Seting Promo" : "Tambah Paket Layanan Baru"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-mono text-gray-300 mb-1">ID Unik Paket</label>
                <input
                  type="text"
                  required
                  disabled={Boolean(editingItem)}
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-mono focus:outline-none focus:border-amber-500 disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block font-mono text-gray-300 mb-1">Nama Layanan</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-gray-300 mb-1">Harga Promo (Rp)</label>
                  <input
                    type="number"
                    required
                    value={formData.priceMin}
                    onChange={(e) => setFormData({ ...formData, priceMin: Number(e.target.value), priceMax: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-emerald-400 font-extrabold font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-mono text-rose-300 mb-1">Harga Coret / Normal (Rp)</label>
                  <input
                    type="number"
                    value={formData.originalPrice || ""}
                    onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                    placeholder="Contoh: 1999000"
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-rose-300 font-mono focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-gray-300 mb-1">Estimasi Hari Kerja</label>
                  <input
                    type="number"
                    required
                    value={formData.baseDays}
                    onChange={(e) => setFormData({ ...formData, baseDays: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-mono text-gray-300 mb-1">Kategori</label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-gray-300 mb-1">Deskripsi Singkat Paket</label>
                <textarea
                  rows={2}
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-mono text-gray-300 mb-1">Daftar Fitur (1 fitur per baris)</label>
                <textarea
                  rows={4}
                  value={formData.featuresStr}
                  onChange={(e) => setFormData({ ...formData, featuresStr: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-mono focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <label className="flex items-center gap-2 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPromoActive}
                    onChange={(e) => setFormData({ ...formData, isPromoActive: e.target.checked })}
                    className="w-4 h-4 rounded text-rose-500 focus:ring-rose-500 bg-white/10 border-white/20"
                  />
                  <span className="text-rose-300 font-bold text-[11px]">Aktifkan Promo Spesial (Tampilkan Harga Coret)</span>
                </label>

                <label className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPopular}
                    onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 bg-white/10 border-white/20"
                  />
                  <span className="text-amber-300 font-bold text-[11px]">Tandai Paling Populer (Best Seller)</span>
                </label>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 bg-white/10 border-white/20"
                  />
                  <span className="text-emerald-300 font-bold text-[11px]">Aktifkan Layanan di Website</span>
                </label>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-gray-300 hover:bg-white/15"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold flex items-center gap-1.5 shadow"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan ke Neon DB</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
