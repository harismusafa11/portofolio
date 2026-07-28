"use client";

import React, { useState, useEffect } from "react";
import {
  Activity,
  CheckCircle2,
  Clock,
  FileText,
  Globe,
  Lock,
  RefreshCw,
  ChevronRight,
  Download,
  Building2,
  User as UserIcon,
  Phone,
  Mail,
  ShieldCheck,
  CreditCard,
  MessageSquare,
  Brush,
} from "lucide-react";
import { auth, onAuthStateChanged, User } from "@/lib/firebase";
import { useWindowStore } from "@/store/windowStore";
import { WhatsAppLogo } from "@/components/icons/BrandIcons";

interface OrderData {
  id: string;
  packageName: string;
  totalPrice: number;
  dpAmount: number;
  status: string;
  paymentMethod: string;
  formDataJson: string;
  receiptUrl?: string;
  createdAt: string;
}

interface LogData {
  id: number;
  statusTag: string;
  logText: string;
  createdAt: string;
}

export const ProjectTrackerApp: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);
  const [logs, setLogs] = useState<LogData[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const openWindow = useWindowStore((state) => state.openWindow);
  const focusWindow = useWindowStore((state) => state.focusWindow);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  // Fetch User Orders
  const fetchUserOrders = async (showLoading = true) => {
    if (!currentUser) return;
    if (showLoading) setLoadingOrders(true);
    try {
      const res = await fetch(`/api/orders?userId=${currentUser.uid}`);
      const data = await res.json();
      if (data.orders) {
        setOrders(data.orders);
        if (data.orders.length > 0) {
          // If no order selected or updated, set selected order
          setSelectedOrder((prev) => {
            if (!prev) return data.orders[0];
            const updated = data.orders.find((o: OrderData) => o.id === prev.id);
            return updated || data.orders[0];
          });
        }
      }
    } catch (err) {
      console.error("Error fetching user orders:", err);
    } finally {
      if (showLoading) setLoadingOrders(false);
    }
  };

  // Real-Time Polling (3 Seconds) for User Orders
  useEffect(() => {
    if (currentUser) {
      fetchUserOrders(true);
      const interval = setInterval(() => {
        fetchUserOrders(false);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [currentUser]);

  // Real-Time Polling (3 Seconds) for Single Order Details & Logs
  useEffect(() => {
    if (!selectedOrder?.id) return;

    const fetchLogsSilent = async () => {
      try {
        const res = await fetch(`/api/orders/${selectedOrder.id}`);
        const data = await res.json();
        if (data.order) {
          setSelectedOrder(data.order);
        }
        if (data.logs) {
          setLogs(data.logs);
        }
      } catch (err) {
        console.error("Error polling order logs:", err);
      }
    };

    fetchLogsSilent();
    const interval = setInterval(() => {
      fetchLogsSilent();
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedOrder?.id]);

  if (authLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-[#0d111a] text-gray-400 font-mono text-xs select-none">
        <RefreshCw className="w-5 h-5 animate-spin text-sky-400 mr-2" />
        <span>Memuat Dashboard Proyek Klien...</span>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="h-full w-full bg-[#0d111a] text-gray-100 font-sans flex items-center justify-center p-6 text-center select-none">
        <div className="space-y-3 max-w-sm">
          <Lock className="w-8 h-8 text-sky-400 mx-auto" />
          <h3 className="text-sm font-bold text-white">Login Diperlukan</h3>
          <p className="text-xs text-gray-400">Silakan login via Google untuk memantau progress pengerjaan proyek Anda.</p>
        </div>
      </div>
    );
  }

  let parsedFormData: Record<string, any> = {};
  try {
    parsedFormData = selectedOrder?.formDataJson ? (typeof selectedOrder.formDataJson === "string" ? JSON.parse(selectedOrder.formDataJson) : selectedOrder.formDataJson) : {};
  } catch (err) {
    parsedFormData = {};
  }

  // Status Progress Mapping
  const STATUS_PIPELINE = [
    { key: "pending_dp", label: "Menunggu DP 50%", color: "text-amber-400" },
    { key: "pending_verification", label: "Menunggu Verifikasi Admin", color: "text-amber-400" },
    { key: "dp_verified", label: "DP Diverifikasi", color: "text-blue-400" },
    { key: "design_phase", label: "Desain UI/UX", color: "text-purple-400" },
    { key: "dev_phase", label: "Coding & Dev", color: "text-sky-400" },
    { key: "revision_phase", label: "Tahap Revisi", color: "text-indigo-400" },
    { key: "completed", label: "Selesai & Live", color: "text-emerald-400" },
  ];

  const currentStatusIndex = STATUS_PIPELINE.findIndex((s) => s.key === selectedOrder?.status);

  return (
    <div className="h-full w-full bg-[#0d111a] text-gray-100 font-sans flex flex-col justify-between overflow-hidden select-none">
      {/* Top Header Bar */}
      <div className="p-4 bg-[#141924] border-b border-white/10 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-md">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-extrabold text-white">Dashboard Progress Proyek Klien</h2>
            <p className="text-[10px] text-gray-400 font-mono">Arjuna Dev Live Project Tracker</p>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            openWindow("livechat");
            focusWindow("livechat");
          }}
          className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-sky-500/20 hover:text-sky-300 text-gray-300 text-xs font-bold transition-all border border-white/10 flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Konsultasi Live Chat</span>
        </button>
      </div>

      {/* Main Grid View */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar bg-gradient-to-b from-[#0d111a] to-[#111624]">
        {loadingOrders ? (
          <div className="py-16 text-center text-xs font-mono text-gray-400">Memuat data proyek...</div>
        ) : orders.length === 0 ? (
          <div className="py-16 text-center text-xs text-gray-400 space-y-3">
            <p>Anda belum memiliki proyek aktif.</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                openWindow("services");
                focusWindow("services");
              }}
              className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs cursor-pointer shadow-md transition-all active:scale-95"
            >
              Mulai Order Website Baru
            </button>
          </div>
        ) : (
          selectedOrder && (
            <div className="space-y-4 max-w-4xl mx-auto">
              {/* Order Card Summary */}
              <div className="p-4 rounded-2xl bg-[#141924] border border-white/10 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-sky-400">{selectedOrder.id}</span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {selectedOrder.packageName}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-white mt-1">
                    {parsedFormData.businessName || "Proyek Website"}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Total: Rp {selectedOrder.totalPrice.toLocaleString("id-ID")} &bull; DP 50%: Rp {selectedOrder.dpAmount.toLocaleString("id-ID")}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-left sm:text-right">
                    <div className="text-[10px] font-mono text-gray-400">Status Pengerjaan:</div>
                    <div className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider mt-0.5">
                      {STATUS_PIPELINE.find((s) => s.key === selectedOrder.status)?.label || selectedOrder.status}
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/6285693366142?text=${encodeURIComponent(
                      `Halo Admin Arjuna Dev, saya ingin bertanya mengenai status pengerjaan order saya dengan ID ${selectedOrder.id} (${parsedFormData.businessName || selectedOrder.packageName}).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-[#25D366] border border-emerald-500/20 transition-all flex items-center justify-center shrink-0 active:scale-95 cursor-pointer"
                    title="Hubungi Admin via WhatsApp"
                  >
                    <WhatsAppLogo className="w-4 h-4 text-[#25D366]" />
                  </a>
                </div>
              </div>

              {/* Progress Bar Pipeline Visual */}
              <div className="p-4 rounded-2xl bg-[#141924] border border-white/10 shadow-lg space-y-3">
                <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider">Pipeline Progress Timeline</h4>

                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                  {STATUS_PIPELINE.map((step, idx) => {
                    const isPassed = currentStatusIndex >= idx;
                    const isCurrent = currentStatusIndex === idx;

                    return (
                      <div
                        key={step.key}
                        className={`p-2.5 rounded-xl border text-center text-[10px] font-bold font-mono transition-all ${
                          isCurrent
                            ? "bg-sky-500/20 border-sky-400 text-sky-300 shadow"
                            : isPassed
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                            : "bg-white/5 border-white/10 text-gray-500 opacity-60"
                        }`}
                      >
                        <div>{idx + 1}. {step.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Project Logs & Updates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left: Logs */}
                <div className="p-4 rounded-2xl bg-[#141924] border border-white/10 shadow-lg space-y-3">
                  <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-sky-400" />
                    Log Perkembangan Harian
                  </h4>

                  <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                    {logs.length === 0 ? (
                      <div className="text-[11px] text-gray-500 font-mono">Belum ada log perkembangan baru.</div>
                    ) : (
                      logs.map((log) => (
                        <div key={log.id} className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs space-y-1">
                          <div className="text-[9px] font-mono text-sky-400 flex items-center justify-between">
                            <span>Tag: {log.statusTag}</span>
                            <span>{new Date(log.createdAt).toLocaleDateString("id-ID")}</span>
                          </div>
                          <p className="text-gray-300 leading-relaxed">{log.logText}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Right: Uploaded Assets & Details */}
                <div className="p-4 rounded-2xl bg-[#141924] border border-white/10 shadow-lg space-y-3">
                  <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-emerald-400" />
                    Aset &amp; Spesifikasi Proyek
                  </h4>

                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex items-center justify-between text-gray-300 p-2 rounded-xl bg-white/5">
                      <span>Logo Bisnis:</span>
                      {parsedFormData.logoUrl ? (
                        <a href={parsedFormData.logoUrl} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">
                          Lihat Logo Cloudinary
                        </a>
                      ) : (
                        <span className="text-gray-500">Tidak ada</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-gray-300 p-2 rounded-xl bg-white/5">
                      <span>Warna Utama:</span>
                      <span style={{ color: parsedFormData.primaryColor }}>{parsedFormData.primaryColor || "-"}</span>
                    </div>

                    <div className="flex items-center justify-between text-gray-300 p-2 rounded-xl bg-white/5">
                      <span>Metode Pembayaran:</span>
                      <span className="text-emerald-400 uppercase">{selectedOrder.paymentMethod}</span>
                    </div>

                    <div className="pt-2 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => {
                          openWindow("paint");
                          focusWindow("paint");
                        }}
                        className="w-full p-2.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-400/30 text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow"
                      >
                        <Brush className="w-3.5 h-3.5" />
                        <span>🎨 Buka Paint Studio Canvas untuk Revisi Visual (Opsional)</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
