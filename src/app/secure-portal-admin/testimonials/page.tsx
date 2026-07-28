"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, Plus, Edit2, Trash2, RefreshCw, X, Save, ShieldCheck } from "lucide-react";

interface TestimonialItem {
  id: number;
  clientName: string;
  clientRole: string;
  company: string;
  metric: string;
  review: string;
  category: string;
  avatarUrl?: string;
  isActive: boolean;
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);

  const [formData, setFormData] = useState({
    id: 0,
    clientName: "Rafi Kurnia",
    clientRole: "Founder",
    company: "Solusi Kopi Nusantara",
    metric: "Omset Naik +180%",
    review: "",
    category: "ecommerce",
    isActive: true,
  });

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/testimonials");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setTestimonials(data);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      id: 0,
      clientName: "",
      clientRole: "Owner & CEO",
      company: "",
      metric: "100% Delivery Score",
      review: "",
      category: "landing",
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: TestimonialItem) => {
    setEditingItem(item);
    setFormData({
      id: item.id,
      clientName: item.clientName,
      clientRole: item.clientRole,
      company: item.company,
      metric: item.metric,
      review: item.review,
      category: item.category,
      isActive: item.isActive,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus ulasan ini?")) return;
    try {
      const res = await fetch(`/api/admin/testimonials?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setTestimonials((prev) => prev.filter((t) => t.id !== id));
      }
    } catch {
      // ignore
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = editingItem ? "PUT" : "POST";

    try {
      const res = await fetch("/api/admin/testimonials", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchTestimonials();
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
            <MessageSquare className="w-5 h-5 text-emerald-400" />
            <h1 className="text-lg font-extrabold text-white">Kelola Testimonial &amp; Ulasan Klien Verified</h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Tambah &amp; kelola ulasan otentik klien beserta metrik keberhasilan (tanpa star rating slop).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchTestimonials}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-gray-200 transition-all active:scale-95 flex items-center gap-2 border border-white/10 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-sky-400" : ""}`} />
            <span>Refresh Data</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow border border-emerald-400/30 flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Ulasan Baru</span>
          </button>
        </div>
      </div>

      {/* Main Table List */}
      <div className="p-6 rounded-2xl bg-[#141924] border border-white/10 shadow-xl space-y-4">
        {testimonials.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-xs font-mono">
            {loading ? "Memuat ulasan dari Neon DB..." : "Belum ada ulasan tersimpan."}
          </div>
        ) : (
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="text-[10px] font-mono uppercase bg-white/5 text-gray-400">
                <tr>
                  <th className="p-3 rounded-l-lg">Nama Klien &amp; Jabatan</th>
                  <th className="p-3">Perusahaan / Brand</th>
                  <th className="p-3">Metrik Kinerja</th>
                  <th className="p-3">Isi Testimonial</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 rounded-r-lg text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {testimonials.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-3 font-bold text-white">
                      <div>{item.clientName}</div>
                      <div className="text-[10px] text-gray-400 font-mono">{item.clientRole}</div>
                    </td>
                    <td className="p-3 text-sky-400 font-semibold">{item.company}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/30">
                        {item.metric}
                      </span>
                    </td>
                    <td className="p-3 text-gray-300 max-w-[280px] line-clamp-2">{item.review}</td>
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
                        title="Edit Ulasan"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                        title="Hapus Ulasan"
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

      {/* Modal Form Edit / Tambah Ulasan */}
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
              {editingItem ? "Edit Ulasan Klien" : "Tambah Ulasan Klien Baru"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-gray-300 mb-1">Nama Klien (Otentik)</label>
                  <input
                    type="text"
                    required
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="Contoh: Rafi Kurnia"
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-mono text-gray-300 mb-1">Jabatan / Peran</label>
                  <input
                    type="text"
                    required
                    value={formData.clientRole}
                    onChange={(e) => setFormData({ ...formData, clientRole: e.target.value })}
                    placeholder="Founder & CEO"
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-gray-300 mb-1">Perusahaan / Brand</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Solusi Kopi Nusantara"
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-mono text-gray-300 mb-1">Metrik Hasil Kinerja</label>
                  <input
                    type="text"
                    required
                    value={formData.metric}
                    onChange={(e) => setFormData({ ...formData, metric: e.target.value })}
                    placeholder="Omset Naik +180%"
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-gray-300 mb-1">Isi Testimonial / Ulasan</label>
                <textarea
                  rows={4}
                  required
                  value={formData.review}
                  onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                  placeholder="Pengalaman kerjasama pembuatan website..."
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-mono text-gray-300 mb-1">Kategori Layanan</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#141924] border border-white/10 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="landing font-sans bg-[#141924]">Landing Page</option>
                  <option value="ecommerce font-sans bg-[#141924]">E-Commerce</option>
                  <option value="custom font-sans bg-[#141924]">Custom Web App</option>
                </select>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 bg-white/10 border-white/20"
                  />
                  <span className="text-gray-200">Tampilkan Ulasan di Website</span>
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
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold flex items-center gap-1.5 shadow"
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
