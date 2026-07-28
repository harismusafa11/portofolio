"use client";

import React, { useState, useEffect } from "react";
import {
  Briefcase,
  Search,
  RefreshCw,
  Clock,
  CheckCircle2,
  FileText,
  Globe,
  DollarSign,
  User as UserIcon,
  Phone,
  Mail,
  ShieldCheck,
  CreditCard,
  Edit,
  Plus,
} from "lucide-react";

interface OrderItem {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhoto?: string;
  packageId: string;
  packageName: string;
  totalPrice: number;
  dpAmount: number;
  paymentMethod: string;
  status: string;
  formDataJson: string;
  receiptUrl?: string;
  createdAt: string;
}

interface LogItem {
  id: number;
  statusTag: string;
  logText: string;
  createdAt: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [updating, setUpdating] = useState(false);
  const [newLogText, setNewLogText] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      if (data.orders) {
        setOrders(data.orders);
        if (data.orders.length > 0 && !selectedOrder) {
          setSelectedOrder(data.orders[0]);
        }
      }
    } catch (err) {
      console.error("Error fetching admin orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (!selectedOrder) return;
    const fetchLogs = async () => {
      try {
        const res = await fetch(`/api/orders/${selectedOrder.id}`);
        const data = await res.json();
        if (data.logs) {
          setLogs(data.logs);
        }
      } catch (err) {
        console.error("Error fetching order logs:", err);
      }
    };
    fetchLogs();
  }, [selectedOrder]);

  const handleUpdateStatus = async (newStatus: string) => {
    if (!selectedOrder || updating) return;
    setUpdating(true);
    try {
      await fetch(`/api/orders/${selectedOrder.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus,
          logText: `Admin mengubah status proyek menjadi: ${newStatus.toUpperCase()}`,
        }),
      });

      setSelectedOrder({ ...selectedOrder, status: newStatus });
      fetchOrders();
    } catch (err) {
      console.error("Error updating order status:", err);
    } finally {
      setUpdating(false);
    }
  };

  const handleAddLog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogText.trim() || !selectedOrder || updating) return;
    setUpdating(true);
    try {
      await fetch(`/api/orders/${selectedOrder.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          logText: newLogText.trim(),
        }),
      });

      setNewLogText("");
      // Refresh logs
      const res = await fetch(`/api/orders/${selectedOrder.id}`);
      const data = await res.json();
      if (data.logs) setLogs(data.logs);
    } catch (err) {
      console.error("Error adding log:", err);
    } finally {
      setUpdating(false);
    }
  };

  const filteredOrders = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.userEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const parsedFormData = selectedOrder?.formDataJson ? JSON.parse(selectedOrder.formDataJson) : {};

  const handleExportCSV = () => {
    if (orders.length === 0) return;
    const headers = ["ID Order", "Nama Klien", "Email", "Paket", "Total Biaya (IDR)", "DP 50% (IDR)", "Metode Pembayaran", "Status", "Tanggal"];
    const rows = orders.map((o) => [
      `"${o.id}"`,
      `"${o.userName.replace(/"/g, '""')}"`,
      `"${o.userEmail.replace(/"/g, '""')}"`,
      `"${o.packageName.replace(/"/g, '""')}"`,
      o.totalPrice,
      o.dpAmount,
      `"${o.paymentMethod}"`,
      `"${o.status}"`,
      `"${new Date(o.createdAt).toLocaleDateString("id-ID")}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Rekap_Laporan_Penjualan_ArjunaDev_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalOmset = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
  const totalDpVerified = orders
    .filter((o) => o.status !== "pending_dp" && o.status !== "pending_verification")
    .reduce((sum, o) => sum + (o.dpAmount || 0), 0);

  return (
    <div className="min-h-[calc(100vh-140px)] flex flex-col font-sans select-none space-y-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl bg-[#141924] border border-white/10 shadow-lg shrink-0 gap-3">
        <div>
          <h1 className="text-lg font-extrabold text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-sky-400" />
            Manajemen Order &amp; Progress Proyek Klien
          </h1>
          <p className="text-xs text-gray-400 mt-1">Kelola data pesanan masuk, verifikasi DP, dan update timeline proyek klien.</p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleExportCSV}
            className="px-3 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/30 text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            title="Download Rekap Spreadsheet CSV"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>📊 Export Excel (.csv)</span>
          </button>
          <button
            onClick={() => window.print()}
            className="px-3 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-400/30 text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            title="Cetak Laporan Penjualan"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>📄 Cetak Laporan PDF</span>
          </button>
          <button
            onClick={fetchOrders}
            className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/15 text-gray-300 text-xs font-bold transition-all border border-white/10 flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Financial Summary Metric Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 shrink-0">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#141924] to-[#1a2336] border border-white/10 shadow-md">
          <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Total Pesanan Masuk</p>
          <p className="text-2xl font-black text-white mt-1">{orders.length} <span className="text-xs font-normal text-gray-400 font-mono">Pesanan</span></p>
        </div>
        <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/40 to-teal-900/30 border border-emerald-500/25 shadow-md">
          <p className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">Total DP Terverifikasi</p>
          <p className="text-2xl font-black text-emerald-300 mt-1">Rp {totalDpVerified.toLocaleString("id-ID")}</p>
        </div>
        <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-950/40 to-indigo-900/30 border border-purple-500/25 shadow-md">
          <p className="text-[10px] font-mono text-purple-300 uppercase tracking-widest">Nilai Total Proyek (Omset)</p>
          <p className="text-2xl font-black text-purple-200 mt-1">Rp {totalOmset.toLocaleString("id-ID")}</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 min-h-0 overflow-hidden">
        {/* Left: Orders List */}
        <div className="p-4 rounded-2xl bg-[#141924] border border-white/10 shadow-xl flex flex-col justify-between overflow-hidden">
          <div className="space-y-3 shrink-0">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari ID Order / Nama Klien..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar my-3 pr-1">
            {loading ? (
              <div className="py-12 text-center text-xs font-mono text-gray-400">Memuat pesanan...</div>
            ) : filteredOrders.length === 0 ? (
              <div className="py-12 text-center text-xs text-gray-500">Belum ada pesanan masuk.</div>
            ) : (
              filteredOrders.map((ord) => {
                const isActive = selectedOrder?.id === ord.id;
                return (
                  <div
                    key={ord.id}
                    onClick={() => setSelectedOrder(ord)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                      isActive
                        ? "bg-sky-500/20 border-sky-400 text-white shadow"
                        : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono font-bold text-sky-400">{ord.id}</span>
                      <span className="text-[9px] font-mono uppercase font-bold text-emerald-400">{ord.status}</span>
                    </div>

                    <div className="font-bold text-white truncate">{ord.userName}</div>
                    <div className="text-[10px] text-gray-400 font-mono truncate">{ord.packageName}</div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right: Selected Order Detail & Status Control */}
        <div className="md:col-span-2 p-4 rounded-2xl bg-[#141924] border border-white/10 shadow-xl flex flex-col justify-between overflow-y-auto custom-scrollbar">
          {!selectedOrder ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 text-xs">
              Pilih pesanan di sebelah kiri untuk melihat detail.
            </div>
          ) : (
            <div className="space-y-5">
              {/* Top Order Header Info */}
              <div className="pb-3 border-b border-white/10 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-extrabold text-white">{selectedOrder.id} — {selectedOrder.packageName}</h2>
                  <p className="text-xs text-gray-400 font-mono">
                    Pemesan: {selectedOrder.userName} ({selectedOrder.userEmail})
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-emerald-400">Total: Rp {selectedOrder.totalPrice.toLocaleString("id-ID")}</div>
                  <div className="text-[10px] text-sky-300 font-mono">DP 50%: Rp {selectedOrder.dpAmount.toLocaleString("id-ID")}</div>
                </div>
              </div>

              {/* Status Update Control */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <label className="block text-xs font-mono font-bold text-sky-300">Ubah Status Progress Proyek Klien (1-Klik)</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { key: "pending_dp", label: "🔴 Menunggu DP" },
                    { key: "pending_verification", label: "🟠 Menunggu Verifikasi" },
                    { key: "dp_verified", label: "🟡 DP Diverifikasi" },
                    { key: "design_phase", label: "🔵 Desain UI/UX" },
                    { key: "dev_phase", label: "💻 Coding & Dev" },
                    { key: "revision_phase", label: "🟣 Tahap Revisi" },
                    { key: "completed", label: "🟢 Selesai & Live" },
                  ].map((st) => (
                    <button
                      key={st.key}
                      onClick={() => handleUpdateStatus(st.key)}
                      disabled={updating}
                      className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer ${
                        selectedOrder.status === st.key
                          ? "bg-sky-500/20 border-sky-400 text-white shadow"
                          : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add Progress Log */}
              <form onSubmit={handleAddLog} className="space-y-2">
                <label className="block text-xs font-mono text-gray-300">Tambah Catatan Progress Harian ke Dashboard Klien</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newLogText}
                    onChange={(e) => setNewLogText(e.target.value)}
                    placeholder="Tuliskan perkembangan pengerjaan hari ini..."
                    className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                  <button
                    type="submit"
                    disabled={!newLogText.trim() || updating}
                    className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs shadow flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Log</span>
                  </button>
                </div>
              </form>

              {/* Form Data Summary */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs font-mono">
                <h4 className="font-bold text-white mb-2">Detail Form Wizard Klien:</h4>
                <div>&bull; Nama Bisnis: {parsedFormData.businessName || "-"}</div>
                <div>&bull; WhatsApp: {parsedFormData.phone || "-"}</div>
                <div>&bull; Halaman: {parsedFormData.neededPages?.join(", ") || "-"}</div>
                <div>&bull; Fitur: {parsedFormData.neededFeatures?.join(", ") || "-"}</div>
                <div>&bull; Timeline: {parsedFormData.timeline || "-"}</div>
                {selectedOrder.receiptUrl && (
                  <div className="pt-2">
                    &bull; Bukti Transfer:{" "}
                    <a href={selectedOrder.receiptUrl} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">
                      Lihat Foto Bukti Transfer Cloudinary
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
