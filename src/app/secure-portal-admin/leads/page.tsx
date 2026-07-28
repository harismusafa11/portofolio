"use client";

import React, { useState, useEffect } from "react";
import { PhoneCall, RefreshCw, CheckCircle2, Clock, Filter, Trash2 } from "lucide-react";

interface LeadData {
  id: number;
  name: string;
  city: string;
  packageTitle: string;
  notes?: string;
  status: string;
  createdAt: string;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<LeadData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/leads");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setLeads(data);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleUpdateStatus = async (id: number, status: string) => {
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status } : l))
        );
      }
    } catch {
      // ignore
    }
  };

  const filteredLeads = leads.filter(
    (l) => filterStatus === "all" || l.status === filterStatus
  );

  return (
    <div className="space-y-6 font-sans select-none">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#141924] border border-white/10 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <PhoneCall className="w-5 h-5 text-emerald-400" />
            <h1 className="text-lg font-extrabold text-white">Log Pesanan WA &amp; Leads Pengunjung</h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Pantau daftar pengunjung yang mengklik order konsultasi WA dan perbarui status pengerjaan proyeknya.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchLeads}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-gray-200 transition-all active:scale-95 flex items-center gap-2 border border-white/10 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-sky-400" : ""}`} />
            <span>Refresh Log</span>
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="p-6 rounded-2xl bg-[#141924] border border-white/10 shadow-xl space-y-4">
        {/* Table Header Filter Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-sky-400" />
            <span className="text-xs font-bold text-white">Filter Status Lead:</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            {["all", "pending", "contacted", "deal"].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1 rounded-lg font-mono capitalize transition-all cursor-pointer ${
                  filterStatus === st
                    ? "bg-sky-500/20 text-sky-300 border border-sky-500/30 font-bold"
                    : "bg-white/5 text-gray-400 hover:text-white"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {filteredLeads.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-xs font-mono">
            Belum ada log pesanan WA sesuai filter.
          </div>
        ) : (
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="text-[10px] font-mono uppercase bg-white/5 text-gray-400">
                <tr>
                  <th className="p-3 rounded-l-lg">ID</th>
                  <th className="p-3">Nama Klien / Usaha</th>
                  <th className="p-3">Kota / Lokasi</th>
                  <th className="p-3">Paket Layanan</th>
                  <th className="p-3">Status Lead</th>
                  <th className="p-3 rounded-r-lg text-right">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-3 font-mono text-gray-400">#{lead.id}</td>
                    <td className="p-3 font-bold text-white">{lead.name}</td>
                    <td className="p-3 text-gray-300">{lead.city}</td>
                    <td className="p-3 font-mono text-sky-400">{lead.packageTitle}</td>
                    <td className="p-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold capitalize ${
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
                    <td className="p-3 text-right space-x-1.5">
                      <button
                        onClick={() => handleUpdateStatus(lead.id, "pending")}
                        className="px-2.5 py-1 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-[10px] font-mono border border-amber-500/20 cursor-pointer"
                      >
                        Pending
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(lead.id, "contacted")}
                        className="px-2.5 py-1 rounded bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 text-[10px] font-mono border border-sky-500/20 cursor-pointer"
                      >
                        Contacted
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(lead.id, "deal")}
                        className="px-2.5 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/20 cursor-pointer"
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
  );
}
