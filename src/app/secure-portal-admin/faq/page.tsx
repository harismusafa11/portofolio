"use client";

import React, { useState, useEffect } from "react";
import { HelpCircle, Plus, Edit2, Trash2, RefreshCw, X, Save } from "lucide-react";

interface FaqItem {
  id: number;
  faqId: string;
  category: string;
  question: string;
  answer: string;
  sortOrder: number;
  isActive: boolean;
}

export default function AdminFaqPage() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FaqItem | null>(null);

  const [formData, setFormData] = useState({
    id: 0,
    faqId: "",
    category: "Waktu & Proses",
    question: "",
    answer: "",
    sortOrder: 1,
    isActive: true,
  });

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/faqs");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setFaqs(data);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      id: 0,
      faqId: `faq-${Date.now()}`,
      category: "Waktu & Proses",
      question: "",
      answer: "",
      sortOrder: faqs.length + 1,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: FaqItem) => {
    setEditingItem(item);
    setFormData({
      id: item.id,
      faqId: item.faqId,
      category: item.category,
      question: item.question,
      answer: item.answer,
      sortOrder: item.sortOrder,
      isActive: item.isActive,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus item FAQ ini?")) return;
    try {
      const res = await fetch(`/api/admin/faqs?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setFaqs((prev) => prev.filter((f) => f.id !== id));
      }
    } catch {
      // ignore
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = editingItem ? "PUT" : "POST";

    try {
      const res = await fetch("/api/admin/faqs", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchFaqs();
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
            <HelpCircle className="w-5 h-5 text-purple-400" />
            <h1 className="text-lg font-extrabold text-white">Kelola FAQ &amp; Pertanyaan Klien</h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Tambah, urutkan, dan perbarui pertanyaan yang sering diajukan calon pelanggan di website.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchFaqs}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-gray-200 transition-all active:scale-95 flex items-center gap-2 border border-white/10 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-sky-400" : ""}`} />
            <span>Refresh Data</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow border border-purple-400/30 flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah FAQ Baru</span>
          </button>
        </div>
      </div>

      {/* Main Table List */}
      <div className="p-6 rounded-2xl bg-[#141924] border border-white/10 shadow-xl space-y-4">
        {faqs.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-xs font-mono">
            {loading ? "Memuat FAQ dari Neon DB..." : "Belum ada item FAQ tersimpan."}
          </div>
        ) : (
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="text-[10px] font-mono uppercase bg-white/5 text-gray-400">
                <tr>
                  <th className="p-3 rounded-l-lg">No. Urut</th>
                  <th className="p-3">Kategori FAQ</th>
                  <th className="p-3">Pertanyaan</th>
                  <th className="p-3">Jawaban Ringkas</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 rounded-r-lg text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {faqs.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-3 font-mono font-bold text-purple-400">#{item.sortOrder}</td>
                    <td className="p-3 text-sky-400 font-semibold">{item.category}</td>
                    <td className="p-3 font-bold text-white max-w-[240px]">{item.question}</td>
                    <td className="p-3 text-gray-300 max-w-[280px] line-clamp-2">{item.answer}</td>
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
                        title="Edit FAQ"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                        title="Hapus FAQ"
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

      {/* Modal Form Edit / Tambah FAQ */}
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
              {editingItem ? "Edit Pertanyaan FAQ" : "Tambah FAQ Baru"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-gray-300 mb-1">Kategori FAQ</label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Waktu & Proses"
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block font-mono text-gray-300 mb-1">Urutan Tampil (Sort Order)</label>
                  <input
                    type="number"
                    required
                    value={formData.sortOrder}
                    onChange={(e) => setFormData({ ...formData, sortOrder: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-mono focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-gray-300 mb-1">Pertanyaan</label>
                <input
                  type="text"
                  required
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="Berapa lama estimasi pembuatan website?"
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block font-mono text-gray-300 mb-1">Jawaban Lengkap</label>
                <textarea
                  rows={4}
                  required
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  placeholder="Estimasi pengerjaan bergantung paket yang dipilih..."
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 rounded text-purple-500 focus:ring-purple-500 bg-white/10 border-white/20"
                  />
                  <span className="text-gray-200">Tampilkan FAQ di Website</span>
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
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold flex items-center gap-1.5 shadow"
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
