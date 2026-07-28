"use client";

import React, { useState, useEffect } from "react";
import { Folder, Plus, Edit2, Trash2, RefreshCw, X, Save, ExternalLink } from "lucide-react";

interface PortfolioItem {
  id: number;
  slug: string;
  title: string;
  category: string;
  categoryLabel: string;
  description: string;
  clientName: string;
  techStackJson: string;
  imageUrl: string;
  liveUrl?: string;
  isFeatured: boolean;
}

export default function AdminPortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);

  const [formData, setFormData] = useState({
    id: 0,
    slug: "",
    title: "",
    category: "web",
    categoryLabel: "Web Development",
    description: "",
    clientName: "",
    techStackStr: "Next.js, React, TypeScript, Tailwind CSS",
    imageUrl: "/images/portfolio/kopi_hero.png",
    liveUrl: "",
    isFeatured: true,
  });

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/portfolios");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setItems(data);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      id: 0,
      slug: `proj-${Date.now()}`,
      title: "",
      category: "web",
      categoryLabel: "E-Commerce & Branding",
      description: "",
      clientName: "Rafi Kurnia",
      techStackStr: "Next.js, React, TypeScript, Tailwind CSS",
      imageUrl: "/images/portfolio/kopi_hero.png",
      liveUrl: "https://example.com",
      isFeatured: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    let stack = [];
    try {
      stack = JSON.parse(item.techStackJson);
    } catch {
      stack = [];
    }
    setFormData({
      id: item.id,
      slug: item.slug,
      title: item.title,
      category: item.category,
      categoryLabel: item.categoryLabel,
      description: item.description,
      clientName: item.clientName,
      techStackStr: Array.isArray(stack) ? stack.join(", ") : "",
      imageUrl: item.imageUrl,
      liveUrl: item.liveUrl || "",
      isFeatured: item.isFeatured,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus proyek portfolio ini?")) return;
    try {
      const res = await fetch(`/api/admin/portfolios?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setItems((prev) => prev.filter((p) => p.id !== id));
      }
    } catch {
      // ignore
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const stackArray = formData.techStackStr
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      ...formData,
      techStackJson: JSON.stringify(stackArray),
    };

    const method = editingItem ? "PUT" : "POST";

    try {
      const res = await fetch("/api/admin/portfolios", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchItems();
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
            <Folder className="w-5 h-5 text-yellow-400" />
            <h1 className="text-lg font-extrabold text-white">Kelola Portfolio Proyek Klien</h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Tambah showcase karya website, nama klien verified, tech stack, dan link preview live.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchItems}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-gray-200 transition-all active:scale-95 flex items-center gap-2 border border-white/10 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-sky-400" : ""}`} />
            <span>Refresh Data</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 via-[#0078d4] to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs shadow border border-sky-400/30 flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Proyek Baru</span>
          </button>
        </div>
      </div>

      {/* Main Table List */}
      <div className="p-6 rounded-2xl bg-[#141924] border border-white/10 shadow-xl space-y-4">
        {items.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-xs font-mono">
            {loading ? "Memuat proyek dari Neon DB..." : "Belum ada karya portfolio tersimpan."}
          </div>
        ) : (
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="text-[10px] font-mono uppercase bg-white/5 text-gray-400">
                <tr>
                  <th className="p-3 rounded-l-lg">Judul Proyek</th>
                  <th className="p-3">Kategori Label</th>
                  <th className="p-3">Nama Klien Verified</th>
                  <th className="p-3">Tech Stack</th>
                  <th className="p-3">Featured</th>
                  <th className="p-3 rounded-r-lg text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-3 font-bold text-white">
                      <div>{item.title}</div>
                      <div className="text-[10px] text-sky-400 font-mono">{item.slug}</div>
                    </td>
                    <td className="p-3 text-gray-300">{item.categoryLabel}</td>
                    <td className="p-3 text-emerald-400 font-semibold">{item.clientName}</td>
                    <td className="p-3 font-mono text-[11px] text-gray-300 max-w-[200px] truncate">
                      {item.techStackJson}
                    </td>
                    <td className="p-3">
                      {item.isFeatured && (
                        <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 text-[10px] font-mono border border-sky-500/30">
                          FEATURED
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-right space-x-1.5">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-1.5 rounded bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 transition-colors"
                        title="Edit Proyek"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                        title="Hapus Proyek"
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

      {/* Modal Form Edit / Tambah Portfolio */}
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
              {editingItem ? "Edit Proyek Portfolio" : "Tambah Proyek Portfolio Baru"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-mono text-gray-300 mb-1">Judul Proyek</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-gray-300 mb-1">URL Slug Unik</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-mono focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block font-mono text-gray-300 mb-1">Kategori Label</label>
                  <input
                    type="text"
                    required
                    value={formData.categoryLabel}
                    onChange={(e) => setFormData({ ...formData, categoryLabel: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-gray-300 mb-1">Nama Klien Verified (Gunakan Nama Otentik)</label>
                <input
                  type="text"
                  required
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  placeholder="Contoh: Rafi Kurnia"
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block font-mono text-gray-300 mb-1">Deskripsi Hasil Proyek</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block font-mono text-gray-300 mb-1">Tech Stack (Dipisahkan koma)</label>
                <input
                  type="text"
                  required
                  value={formData.techStackStr}
                  onChange={(e) => setFormData({ ...formData, techStackStr: e.target.value })}
                  placeholder="Next.js, React, TypeScript, Tailwind CSS"
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-mono focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-gray-300 mb-1">URL Gambar / Screenshot</label>
                  <input
                    type="text"
                    required
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-mono focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block font-mono text-gray-300 mb-1">URL Live Preview (Opsional)</label>
                  <input
                    type="text"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-mono focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 rounded text-sky-500 focus:ring-sky-500 bg-white/10 border-white/20"
                  />
                  <span className="text-gray-200">Tampilkan di Halaman Utama Portfolio</span>
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
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-sky-500 via-[#0078d4] to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold flex items-center gap-1.5 shadow"
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
