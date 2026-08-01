"use client";

import React, { useState, useEffect } from "react";
import {
  Tag,
  PhoneCall,
  Briefcase,
  Folder,
  BookOpen,
  CheckCircle2,
  Clock,
  Save,
  RefreshCw,
  TrendingUp,
  ShieldCheck,
  AlertCircle,
  Users,
  Smartphone,
  Monitor,
  Activity,
  Eye,
  Zap,
} from "lucide-react";

interface PromoData {
  id?: number;
  title: string;
  badgeText: string;
  discountAmount: number;
  originalPrice: number;
  promoPrice: number;
  slotsRemaining: number;
  isActive: boolean;
}

interface LeadData {
  id: number;
  name: string;
  city: string;
  packageTitle: string;
  notes?: string;
  status: string;
  createdAt: string;
}

interface AnalyticsData {
  activeCount: number;
  totalPageViews: number;
  deviceBreakdown: {
    desktopCount: number;
    mobileCount: number;
    desktopPercent: number;
    mobilePercent: number;
  };
  topPages: { path: string; count: number }[];
  recentPings: {
    id: number;
    visitorId: string;
    pagePath: string;
    deviceType: string;
    city: string;
    lastPingAt: string;
  }[];
}

export default function AdminDashboardPage() {
  const [promo, setPromo] = useState<PromoData>({
    title: "Voucher Diskon Rp 500.000 + Free Domain .COM!",
    badgeText: "PROMO SPESIAL PERDANA",
    discountAmount: 500000,
    originalPrice: 1999000,
    promoPrice: 1499000,
    slotsRemaining: 2,
    isActive: true,
  });

  const [leads, setLeads] = useState<LeadData[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    activeCount: 1,
    totalPageViews: 1,
    deviceBreakdown: { desktopCount: 1, mobileCount: 0, desktopPercent: 100, mobilePercent: 0 },
    topPages: [{ path: "App: order_wizard", count: 1 }],
    recentPings: [],
  });
  const [loading, setLoading] = useState(true);
  const [savingPromo, setSavingPromo] = useState(false);
  const [submittingIndexNow, setSubmittingIndexNow] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Fetch initial dashboard data from API
  const fetchData = async () => {
    setLoading(true);
    try {
      const [promoRes, leadsRes, analyticsRes] = await Promise.all([
        fetch("/api/admin/promos"),
        fetch("/api/admin/leads"),
        fetch("/api/admin/analytics"),
      ]);

      if (promoRes.ok) {
        const promoJson = await promoRes.json();
        if (promoJson && !promoJson.error) setPromo(promoJson);
      }

      if (leadsRes.ok) {
        const leadsJson = await leadsRes.json();
        if (Array.isArray(leadsJson)) setLeads(leadsJson);
      }

      if (analyticsRes.ok) {
        const analyticsJson = await analyticsRes.json();
        if (analyticsJson && !analyticsJson.error) setAnalytics(analyticsJson);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Auto-refresh analytics every 10 seconds for real-time monitoring
    const interval = setInterval(() => {
      fetch("/api/admin/analytics")
        .then((res) => res.json())
        .then((data) => {
          if (data && !data.error) setAnalytics(data);
        })
        .catch(() => {});
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSavePromo = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingPromo(true);
    setToastMsg(null);

    try {
      const res = await fetch("/api/admin/promos", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(promo),
      });

      if (res.ok) {
        const updated = await res.json();
        setPromo(updated);
        setToastMsg("✅ Promo banner berhasil diperbarui di Neon DB!");
        setTimeout(() => setToastMsg(null), 3000);
      }
    } catch {
      setToastMsg("❌ Gagal menyimpan promo.");
    } finally {
      setSavingPromo(false);
    }
  };

  const handleUpdateLeadStatus = async (id: number, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
        );
      }
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-6 select-none font-sans">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-between shadow-lg animate-in fade-in duration-150">
          <span>{toastMsg}</span>
          <button onClick={() => setToastMsg(null)} className="text-gray-400 hover:text-white">
            &times;
          </button>
        </div>
      )}

      {/* Top Welcome & Refresh Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#181e2b] via-[#141924] to-[#1a202e] border border-white/10 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-extrabold text-white">Dashboard Kontrol &amp; Performa Utama</h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-400 font-mono font-bold border border-emerald-500/30">
              Live Database
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Kelola promo banner, paket harga, portfolio, ulasan klien, dan pantau log pesan masuk WA real-time.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={async () => {
              setSubmittingIndexNow(true);
              try {
                const res = await fetch("/api/indexnow", { method: "POST" });
                const data = await res.json();
                if (data.success) {
                  setToastMsg(`🚀 IndexNow Berhasil! ${data.submittedUrlsCount} URL Website terkirim ke Bing, Yandex, & IndexNow Network.`);
                  setTimeout(() => setToastMsg(null), 5000);
                } else {
                  setToastMsg("❌ Gagal mengirim IndexNow.");
                }
              } catch {
                setToastMsg("❌ Gagal terhubung ke IndexNow API.");
              } finally {
                setSubmittingIndexNow(false);
              }
            }}
            disabled={submittingIndexNow}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-xs font-bold text-white shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer border border-sky-400/30"
            title="Kirim semua URL website ke Google, Bing, Yandex, & IndexNow secara instan"
          >
            <Zap className={`w-3.5 h-3.5 ${submittingIndexNow ? "animate-spin text-amber-300" : "text-amber-300"}`} />
            <span>{submittingIndexNow ? "Mengirim..." : "🚀 IndexNow Push"}</span>
          </button>

          <button
            onClick={fetchData}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-gray-200 transition-all active:scale-95 flex items-center gap-2 shrink-0 border border-white/10 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-sky-400" : ""}`} />
            <span>Refresh Data</span>
          </button>
        </div>
      </div>

      {/* Real-Time Visitor Analytics Dashboard Section */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-[#121724] via-[#161c2c] to-[#111522] border border-sky-500/30 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                <span>Real-Time Visitor Analytics</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/30">
                  🟢 {analytics.activeCount} Online Saat Ini
                </span>
              </h2>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Pemantauan langsung lalu lintas pengunjung, perangkat, dan aplikasi favorit secara real-time.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-gray-300">
            <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
              <Monitor className="w-4 h-4 text-sky-400" />
              <span>Desktop: {analytics.deviceBreakdown.desktopPercent}%</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
              <Smartphone className="w-4 h-4 text-emerald-400" />
              <span>Mobile: {analytics.deviceBreakdown.mobilePercent}%</span>
            </div>
          </div>
        </div>

        {/* Analytics Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Top Visited Pages / Apps */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
            <div className="text-xs font-bold text-sky-300 flex items-center gap-1.5">
              <Eye className="w-4 h-4" />
              <span>Halaman &amp; Aplikasi Favorit Pengunjung</span>
            </div>

            <div className="space-y-2.5">
              {analytics.topPages.map((tp, idx) => {
                const maxVal = Math.max(...analytics.topPages.map((p) => p.count), 1);
                const percent = Math.round((tp.count / maxVal) * 100);

                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-white font-semibold truncate max-w-[200px]">{tp.path}</span>
                      <span className="text-sky-300 font-bold">{tp.count} Hits</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-sky-400 to-emerald-400 transition-all duration-500 rounded-full"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Visitor Activity Log Stream */}
          <div className="lg:col-span-2 p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-300">
              <div className="flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>Live Activity Stream Pengunjung</span>
              </div>
              <span className="text-[10px] text-gray-400 font-mono">Auto Update (10s)</span>
            </div>

            {analytics.recentPings.length === 0 ? (
              <div className="py-6 text-center text-xs text-gray-400 font-mono">
                Menunggu log aktivitas pengunjung terkini...
              </div>
            ) : (
              <div className="space-y-2 max-h-[180px] overflow-y-auto custom-scrollbar pr-1">
                {analytics.recentPings.map((ping) => {
                  const pingTime = new Date(ping.lastPingAt).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  });

                  return (
                    <div
                      key={ping.id}
                      className="p-2.5 rounded-lg bg-black/30 border border-white/5 flex items-center justify-between text-xs font-mono hover:border-white/20 transition-all"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {ping.deviceType === "mobile" ? (
                          <Smartphone className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <Monitor className="w-4 h-4 text-sky-400 shrink-0" />
                        )}
                        <div className="min-w-0">
                          <div className="text-white font-bold truncate">
                            {ping.pagePath || "/"}
                          </div>
                          <div className="text-[10px] text-gray-400">
                            ID: {ping.visitorId.substring(0, 14)}... &bull; {ping.city || "Indonesia"}
                          </div>
                        </div>
                      </div>

                      <span className="text-[10px] text-sky-300 font-bold bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20 shrink-0">
                        {pingTime}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid Section: Quick Promo Editor + Leads Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 1 Column: Quick Promo Banner Editor Form */}
        <div className="p-6 rounded-2xl bg-[#141924] border border-white/10 shadow-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-sky-400" />
              <h2 className="text-sm font-bold text-white">Kelola Banner Promo Live</h2>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 font-mono border border-sky-500/20">
              Neon Sync
            </span>
          </div>

          <form onSubmit={handleSavePromo} className="space-y-3.5">
            <div>
              <label className="block text-[11px] font-mono font-semibold text-gray-300 mb-1">
                Judul Banner Promo
              </label>
              <input
                type="text"
                value={promo.title}
                onChange={(e) => setPromo({ ...promo, title: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-semibold text-gray-300 mb-1">
                Badge Tag Header
              </label>
              <input
                type="text"
                value={promo.badgeText}
                onChange={(e) => setPromo({ ...promo, badgeText: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono font-semibold text-gray-300 mb-1">
                  Nominal Diskon (Rp)
                </label>
                <input
                  type="number"
                  value={promo.discountAmount}
                  onChange={(e) => setPromo({ ...promo, discountAmount: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-sky-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-semibold text-gray-300 mb-1">
                  Sisa Slot Kuota
                </label>
                <input
                  type="number"
                  value={promo.slotsRemaining}
                  onChange={(e) => setPromo({ ...promo, slotsRemaining: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-sky-500 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono font-semibold text-gray-300 mb-1">
                  Harga Coret (Rp)
                </label>
                <input
                  type="number"
                  value={promo.originalPrice}
                  onChange={(e) => setPromo({ ...promo, originalPrice: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-sky-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-semibold text-gray-300 mb-1">
                  Harga Promo (Rp)
                </label>
                <input
                  type="number"
                  value={promo.promoPrice}
                  onChange={(e) => setPromo({ ...promo, promoPrice: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-sky-500 font-mono"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={promo.isActive}
                  onChange={(e) => setPromo({ ...promo, isActive: e.target.checked })}
                  className="w-4 h-4 rounded text-sky-500 focus:ring-sky-500 bg-white/10 border-white/20 cursor-pointer"
                />
                <span className="text-xs font-semibold text-gray-200">Tampilkan Modal Promo</span>
              </label>

              <button
                type="submit"
                disabled={savingPromo}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow border border-emerald-400/30 flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Simpan Live</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right 2 Columns: WA Order Leads Log */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#141924] border border-white/10 shadow-md space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <h2 className="text-sm font-bold text-white">Log Pesanan &amp; Konsultasi WA Pengunjung</h2>
              </div>
              <span className="text-[10px] text-gray-400 font-mono">
                {leads.length} Leads Logged
              </span>
            </div>

            {leads.length === 0 ? (
              <div className="py-12 text-center text-gray-400 text-xs font-mono">
                Belum ada log pesanan WA tersimpan di database.
              </div>
            ) : (
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left text-xs text-gray-300">
                  <thead className="text-[10px] font-mono uppercase bg-white/5 text-gray-400">
                    <tr>
                      <th className="p-2.5 rounded-l-lg">Nama Klien</th>
                      <th className="p-2.5">Kota/Lokasi</th>
                      <th className="p-2.5">Paket Layanan</th>
                      <th className="p-2.5">Status</th>
                      <th className="p-2.5 rounded-r-lg text-right">Aksi Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {leads.slice(0, 5).map((lead) => (
                      <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-2.5 font-bold text-white">{lead.name}</td>
                        <td className="p-2.5 text-gray-300">{lead.city}</td>
                        <td className="p-2.5 font-mono text-sky-400 truncate max-w-[150px]">{lead.packageTitle}</td>
                        <td className="p-2.5">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                              lead.status === "deal"
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                : lead.status === "contacted"
                                ? "bg-sky-500/20 text-sky-300 border border-sky-500/30"
                                : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                            }`}
                          >
                            {lead.status}
                          </span>
                        </td>
                        <td className="p-2.5 text-right space-x-1">
                          <button
                            onClick={() => handleUpdateLeadStatus(lead.id, "contacted")}
                            className="px-2 py-1 rounded bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 text-[10px] font-mono border border-sky-500/20"
                          >
                            Contacted
                          </button>
                          <button
                            onClick={() => handleUpdateLeadStatus(lead.id, "deal")}
                            className="px-2 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/20"
                          >
                            Deal
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
