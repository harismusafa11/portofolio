"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, Plus, Edit2, Trash2, RefreshCw, X, Save } from "lucide-react";

interface BlogItem {
  id: number;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  author: string;
  summary: string;
  contentJson: string;
  imageUrl: string;
  isPublished: boolean;
  createdAt: string;
}

export default function AdminBlogPage() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<BlogItem | null>(null);

  const [formData, setFormData] = useState({
    id: 0,
    slug: "",
    title: "",
    category: "Strategi Bisnis",
    readTime: "3 Menit Baca",
    author: "Haris Musafa",
    summary: "",
    imageUrl: "/images/blog/umkm_website_2026.png",
    isPublished: true,
  });

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/blogs");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setBlogs(data);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      id: 0,
      slug: `article-${Date.now()}`,
      title: "",
      category: "Strategi Bisnis",
      readTime: "4 Menit Baca",
      author: "Haris Musafa",
      summary: "",
      imageUrl: "/images/blog/umkm_website_2026.png",
      isPublished: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: BlogItem) => {
    setEditingItem(item);
    setFormData({
      id: item.id,
      slug: item.slug,
      title: item.title,
      category: item.category,
      readTime: item.readTime,
      author: item.author,
      summary: item.summary,
      imageUrl: item.imageUrl,
      isPublished: item.isPublished,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus artikel ini?")) return;
    try {
      const res = await fetch(`/api/admin/blogs?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setBlogs((prev) => prev.filter((b) => b.id !== id));
      }
    } catch {
      // ignore
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      contentJson: JSON.stringify({
        intro: formData.summary,
        keyPoints: ["Desain Premium Kencang", "Optimasi SEO Google", "Integrasi WA Order"],
        body: [formData.summary],
        conclusion: "Tingkatkan konversi penjualan bisnis Anda sekarang.",
      }),
    };

    const method = editingItem ? "PUT" : "POST";

    try {
      const res = await fetch("/api/admin/blogs", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchBlogs();
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
            <BookOpen className="w-5 h-5 text-sky-400" />
            <h1 className="text-lg font-extrabold text-white">Kelola Artikel Blog &amp; Insight Bisnis</h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Tulis dan kelola artikel edukasi SEO, tips pembuatan website toko online, &amp; strategi bisnis digital.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchBlogs}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-gray-200 transition-all active:scale-95 flex items-center gap-2 border border-white/10 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-sky-400" : ""}`} />
            <span>Refresh Data</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs shadow border border-sky-400/30 flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Tulis Artikel Baru</span>
          </button>
        </div>
      </div>

      {/* Main Table List */}
      <div className="p-6 rounded-2xl bg-[#141924] border border-white/10 shadow-xl space-y-4">
        {blogs.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-xs font-mono">
            {loading ? "Memuat artikel blog dari Neon DB..." : "Belum ada artikel blog tersimpan."}
          </div>
        ) : (
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="text-[10px] font-mono uppercase bg-white/5 text-gray-400">
                <tr>
                  <th className="p-3 rounded-l-lg">Judul Artikel</th>
                  <th className="p-3">Kategori</th>
                  <th className="p-3">Penulis &amp; Durasi</th>
                  <th className="p-3">Status Terbit</th>
                  <th className="p-3 rounded-r-lg text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {blogs.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-3 font-bold text-white max-w-[280px]">
                      <div>{item.title}</div>
                      <div className="text-[10px] text-sky-400 font-mono truncate">{item.slug}</div>
                    </td>
                    <td className="p-3 text-gray-300">{item.category}</td>
                    <td className="p-3 font-mono text-gray-300">
                      <div>{item.author}</div>
                      <div className="text-[10px] text-gray-400">{item.readTime}</div>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        item.isPublished ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"
                      }`}>
                        {item.isPublished ? "Terbit" : "Draf"}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-1.5">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-1.5 rounded bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 transition-colors"
                        title="Edit Artikel"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                        title="Hapus Artikel"
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

      {/* Modal Form Edit / Tambah Artikel */}
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
              {editingItem ? "Edit Artikel Blog" : "Tulis Artikel Blog Baru"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-mono text-gray-300 mb-1">Judul Artikel</label>
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
                  <label className="block font-mono text-gray-300 mb-1">Kategori Artikel</label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-gray-300 mb-1">Nama Penulis</label>
                  <input
                    type="text"
                    required
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block font-mono text-gray-300 mb-1">Estimasi Waktu Baca</label>
                  <input
                    type="text"
                    required
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    placeholder="3 Menit Baca"
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-mono focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-gray-300 mb-1">Ringkasan / Subtitle Artikel</label>
                <textarea
                  rows={3}
                  required
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block font-mono text-gray-300 mb-1">URL Gambar Header Artikel</label>
                <input
                  type="text"
                  required
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-mono focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="w-4 h-4 rounded text-sky-500 focus:ring-sky-500 bg-white/10 border-white/20"
                  />
                  <span className="text-gray-200">Terbitkan Artikel Secara Resmi</span>
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
