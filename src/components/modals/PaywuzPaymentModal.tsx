"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Copy,
  CheckCircle2,
  Clock,
  ShieldCheck,
  QrCode,
  CreditCard,
  Zap,
  RefreshCw,
  ExternalLink,
  Minus,
  Maximize2,
  Minimize2,
} from "lucide-react";

interface PaywuzModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  amount: number;
  packageName: string;
  clientName: string;
  clientEmail: string;
  onPaymentSuccess: () => void;
}

export const PaywuzPaymentModal: React.FC<PaywuzModalProps> = ({
  isOpen,
  onClose,
  orderId,
  amount,
  packageName,
  clientName,
  clientEmail,
  onPaymentSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<"qris" | "va">("qris");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const [paymentData, setPaymentData] = useState<{
    paywuzTrxId: string;
    paymentLinkUrl?: string;
    qrisUrl: string;
    virtualAccounts: { bca: string; mandiri: string; bri: string; bank_jago: string };
  } | null>(null);

  useEffect(() => {
    if (isOpen && orderId) {
      fetch("/api/payment/paywuz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, amount, customerName: clientName, customerEmail: clientEmail }),
      })
        .then((res) => res.json())
        .then((resData) => { if (resData.data) setPaymentData(resData.data); })
        .catch((err) => console.error("Error init payment:", err));
    }
  }, [isOpen, orderId, amount, clientName, clientEmail]);

  useEffect(() => {
    if (!isOpen || paymentSuccess) return;
    const timer = setInterval(() => setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, [isOpen, paymentSuccess]);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleVerifyPayment = async () => {
    setVerifying(true);
    try {
      const res = await fetch("/api/payment/paywuz", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: "PAID" }),
      });
      const data = await res.json();
      if (data.success) setPaymentSuccess(true);
    } catch (err) {
      console.error("Payment verify error:", err);
    } finally {
      setVerifying(false);
    }
  };

  if (!isOpen) return null;

  // ── Minimized Badge ──
  if (isMinimized) {
    return (
      <div className="fixed bottom-5 right-5 z-[9999] p-3 bg-[#0f1420] border border-purple-500/50 rounded-2xl shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-bottom-5">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
        <span className="text-xs font-bold text-white">Pembayaran Instan — Rp {amount.toLocaleString("id-ID")}</span>
        <button type="button" onClick={() => setIsMinimized(false)} className="px-2 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-mono text-[10px] font-bold cursor-pointer transition-all">Buka</button>
        <button type="button" onClick={onClose} className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white transition-all cursor-pointer"><X className="w-3.5 h-3.5" /></button>
      </div>
    );
  }

  // ── Shared VA list ──
  const vaList = [
    { bank: "BCA", full: "BCA Virtual Account", va: paymentData?.virtualAccounts.bca || "88012026812" },
    { bank: "Mandiri", full: "Mandiri Virtual Account", va: paymentData?.virtualAccounts.mandiri || "89022026812" },
    { bank: "BRI", full: "BRI Virtual Account", va: paymentData?.virtualAccounts.bri || "88032026812" },
    { bank: "Bank Jago", full: "Bank Jago Direct", va: paymentData?.virtualAccounts.bank_jago || "103965597312" },
  ];

  // ── Shared Header ──
  const Header = () => (
    <div className="px-4 py-3 bg-gradient-to-r from-[#1a1035] via-[#0f1420] to-[#0d1630] border-b border-white/8 flex items-center justify-between shrink-0 rounded-t-2xl">
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/30 text-white shrink-0">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <div className="text-[11px] font-black text-white flex items-center gap-1.5">
            <span>Pembayaran Otomatis — Arjuna Dev Studio</span>
            <span className="px-1.5 py-px rounded bg-emerald-500/20 text-emerald-300 text-[8px] font-mono border border-emerald-500/30 shrink-0">SSL</span>
          </div>
          <p className="text-[9px] text-gray-500 font-mono">
            TRX: {paymentData?.paywuzTrxId ? paymentData.paywuzTrxId.replace("PWZ", "TRX") : "TRX-PENDING"}&nbsp;•&nbsp;{packageName}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1 shrink-0 ml-2">
        <button type="button" onClick={() => setIsMinimized(true)} className="w-6 h-6 rounded-full bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 flex items-center justify-center transition-all cursor-pointer" title="Minimize"><Minus className="w-3 h-3" /></button>
        <button type="button" onClick={() => setIsMaximized(!isMaximized)} className="w-6 h-6 rounded-full bg-sky-500/20 hover:bg-sky-500/40 text-sky-300 flex items-center justify-center transition-all cursor-pointer" title="Maximize">{isMaximized ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}</button>
        <button type="button" onClick={onClose} className="w-6 h-6 rounded-full bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 flex items-center justify-center transition-all cursor-pointer" title="Tutup"><X className="w-3 h-3" /></button>
      </div>
    </div>
  );

  // ── Footer ──
  const Footer = () => (
    <div className="px-4 py-3 bg-[#0a0d14] border-t border-white/6 flex items-center justify-between gap-2 rounded-b-2xl shrink-0">
      <div className="flex items-center gap-1.5 text-[9px] text-gray-500 font-mono">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span>Enkripsi SSL 256-bit • Bank Grade Security</span>
      </div>
      <button
        type="button"
        onClick={handleVerifyPayment}
        disabled={verifying}
        className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-[11px] flex items-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-500/20 transition-all border border-white/15 active:scale-95 disabled:opacity-50 shrink-0"
      >
        {verifying ? <><RefreshCw className="w-3.5 h-3.5 animate-spin" /><span>Verifikasi...</span></> : <><Zap className="w-3.5 h-3.5 text-amber-300" /><span>Sudah Bayar? Verifikasi</span></>}
      </button>
    </div>
  );

  // ── Success view ──
  if (paymentSuccess) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
        <div className="w-full max-w-md bg-[#0c1018] border border-purple-500/25 rounded-2xl shadow-2xl flex flex-col">
          <Header />
          <div className="p-6 space-y-4 animate-in zoom-in-95">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 animate-bounce" />
              </div>
              <h3 className="text-base font-black text-white">Pembayaran DP Terverifikasi!</h3>
              <p className="text-[11px] text-gray-400">Konfirmasi pembayaran diterima sistem. Lanjutkan ke WhatsApp untuk memulai pengerjaan proyek.</p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-[10px] font-mono">
              <div className="p-2.5 rounded-xl bg-white/4 border border-white/8 space-y-0.5"><div className="text-gray-500">Order ID</div><div className="text-emerald-400 font-bold truncate">{orderId}</div></div>
              <div className="p-2.5 rounded-xl bg-white/4 border border-white/8 space-y-0.5"><div className="text-gray-500">Paket</div><div className="text-white font-bold truncate">{packageName}</div></div>
              <div className="p-2.5 rounded-xl bg-white/4 border border-white/8 space-y-0.5"><div className="text-gray-500">Status DP</div><div className="text-emerald-400 font-bold">LUNAS ✓</div></div>
            </div>
            <a
              href={`https://wa.me/6285693366142?text=${encodeURIComponent(`Halo Haris Musafa (Arjuna Dev),\nPembayaran DP 50% saya sudah berhasil via Payment Gateway!\n\n📋 ID Order: ${orderId}\n👤 Nama: ${clientName}\n📧 Email: ${clientEmail}\n📦 Paket: ${packageName}\n💰 DP Dibayar: Rp ${amount.toLocaleString("id-ID")}\n\nMohon konfirmasi agar pengerjaan bisa dimulai. Terima kasih!`)}`}
              target="_blank" rel="noopener noreferrer" onClick={onPaymentSuccess}
              className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all border border-white/15 active:scale-95 cursor-pointer"
            >
              <span>📲 Konfirmasi &amp; Mulai Proyek via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════
  // MAXIMIZED MODE — True full-screen, adaptive layout
  // ══════════════════════════════════════════════════
  if (isMaximized) {
    return (
      <div className="fixed inset-3 z-[9999] bg-[#0c1018] border border-purple-500/25 rounded-2xl shadow-2xl flex flex-col animate-in fade-in duration-200 overflow-hidden">
        <Header />

        <div className="flex flex-col sm:flex-row flex-1 min-h-0 overflow-hidden">
          {/* ── LEFT PANEL: full width on mobile, 260px on desktop ── */}
          <div className="w-full sm:w-[260px] shrink-0 p-4 sm:p-5 border-b sm:border-b-0 sm:border-r border-white/6 flex flex-col gap-3 sm:gap-4 bg-gradient-to-b from-[#110d24] to-[#0c1018] overflow-y-auto">
            <div>
              <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mb-1">Total DP 50%</p>
              <p className="text-2xl sm:text-3xl font-black text-white leading-none">Rp {amount.toLocaleString("id-ID")}</p>
              <p className="text-[10px] font-mono text-gray-400 mt-0.5">{packageName}</p>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/8 border border-amber-500/20 flex items-center gap-3">
              <Clock className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <p className="text-[9px] font-mono text-amber-400">Sisa Waktu</p>
                <p className="text-xl sm:text-2xl font-mono font-black text-amber-300 leading-none">{formatTimer(timeLeft)}</p>
              </div>
            </div>

            <div className="text-[10px] font-mono divide-y divide-white/6">
              {[
                { label: "Order ID", value: orderId, color: "text-white" },
                { label: "Klien", value: clientName, color: "text-white" },
                { label: "Status", value: "Menunggu Bayar", color: "text-amber-300" },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex justify-between py-2">
                  <span className="text-gray-500">{label}</span>
                  <span className={`${color} font-bold truncate ml-2 max-w-[130px]`}>{value}</span>
                </div>
              ))}
            </div>

            <a
              href={paymentData?.paymentLinkUrl || "https://paywuz.id/pay/563d267b-052d-49c3-9756-0d60f4b0f4b3"}
              target="_blank" rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 transition-all border border-white/15 active:scale-95 cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" /><span>Bayar Sekarang</span>
            </a>
            <p className="text-[9px] text-center text-gray-500 font-mono -mt-2">QRIS / Bank Transfer / E-Wallet</p>

            <div className="mt-auto hidden sm:flex items-center gap-1.5 text-[9px] text-gray-500 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>SSL 256-bit · Bank Grade Security</span>
            </div>
          </div>

          {/* ── RIGHT PANEL: flex-1, scrollable ── */}
          <div className="flex-1 flex flex-col gap-4 p-4 sm:p-5 min-w-0 overflow-y-auto">
            {/* Tabs */}
            <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-white/4 border border-white/8 shrink-0">
              <button type="button" onClick={() => setActiveTab("qris")}
                className={`py-2.5 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${activeTab === "qris" ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md" : "text-gray-500 hover:text-gray-200"}`}>
                <QrCode className="w-4 h-4" /><span>QRIS Instant</span>
              </button>
              <button type="button" onClick={() => setActiveTab("va")}
                className={`py-2.5 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${activeTab === "va" ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md" : "text-gray-500 hover:text-gray-200"}`}>
                <CreditCard className="w-4 h-4" /><span>Virtual Account</span>
              </button>
            </div>

            {/* ─ QRIS: QR center top + 2×2 step grid below ─ */}
            {activeTab === "qris" && (
              <div className="flex flex-col items-center gap-4 sm:gap-5">
                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 bg-white rounded-2xl shadow-xl border-2 border-purple-500/30">
                    {paymentData?.qrisUrl
                      ? <img src={paymentData.qrisUrl} alt="QRIS" className="w-36 h-36 sm:w-44 sm:h-44 object-contain" />
                      : <div className="w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center"><RefreshCw className="w-7 h-7 animate-spin text-purple-400" /></div>
                    }
                  </div>
                  <p className="text-[10px] font-mono text-gray-400">Scan QR dengan kamera HP Anda</p>
                </div>

                <div className="w-full">
                  <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest text-center mb-3">Langkah Pembayaran</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {[
                      { n: "1", t: "Buka Mobile Banking, GoPay, OVO, atau Dana" },
                      { n: "2", t: "Pilih menu Scan QR / QRIS" },
                      { n: "3", t: "Arahkan kamera ke QR Code di atas" },
                      { n: "4", t: `Konfirmasi Rp ${amount.toLocaleString("id-ID")} lalu bayar` },
                    ].map((s) => (
                      <div key={s.n} className="flex items-start gap-2.5 p-2.5 sm:p-3 rounded-xl bg-white/4 border border-white/8">
                        <span className="w-5 h-5 rounded-full bg-purple-600/30 border border-purple-500/40 text-purple-300 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">{s.n}</span>
                        <span className="text-[11px] sm:text-[12px] text-gray-300 leading-snug">{s.t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full">
                  <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest text-center mb-2">Didukung semua aplikasi QRIS</p>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {["GoPay", "OVO", "Dana", "ShopeePay", "LinkAja", "BCA Mobile", "Livin Mandiri", "BRImo", "Jago"].map((a) => (
                      <span key={a} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-gray-400">{a}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ─ VA: clean rows ─ */}
            {activeTab === "va" && (
              <div className="flex flex-col gap-2">
                {vaList.map((item) => (
                  <div key={item.bank} className="flex items-center gap-4 px-4 py-4 rounded-xl bg-white/4 border border-white/8 hover:bg-white/6 transition-colors">
                    <div className="w-[90px] shrink-0">
                      <p className="text-[8px] font-mono text-gray-500 uppercase tracking-wider mb-0.5">Bank</p>
                      <p className="text-sm font-black text-white">{item.bank}</p>
                    </div>
                    <div className="w-px self-stretch bg-white/8 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[8px] font-mono text-gray-500 mb-0.5">Nomor Virtual Account</p>
                      <p className="text-lg font-mono font-black text-white tracking-widest">{item.va}</p>
                    </div>
                    <button
                      type="button" onClick={() => copyToClipboard(item.va, item.bank)}
                      className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/20 text-[11px] font-mono font-bold transition-all cursor-pointer"
                    >
                      {copiedKey === item.bank
                        ? <><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /><span className="text-emerald-400">Tersalin</span></>
                        : <><Copy className="w-3.5 h-3.5" /><span>Salin</span></>
                      }
                    </button>
                  </div>
                ))}
                <p className="text-[10px] text-amber-300 font-mono mt-1">⚠ Transfer sesuai nominal tepat. Batas H+1 setelah order dibuat.</p>
              </div>
            )}

            {/* Verify */}
            <div className="mt-auto pt-2">
              <button
                type="button" onClick={handleVerifyPayment} disabled={verifying}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20 transition-all border border-white/15 active:scale-95 disabled:opacity-50"
              >
                {verifying
                  ? <><RefreshCw className="w-4 h-4 animate-spin" /><span>Memverifikasi...</span></>
                  : <><Zap className="w-4 h-4 text-amber-300" /><span>Sudah Bayar? Klik Konfirmasi &amp; Verifikasi</span></>
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════
  // NORMAL MODE — Compact single column
  // ══════════════════════════════════════════════════
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#0c1018] border border-purple-500/25 rounded-2xl shadow-2xl flex flex-col">
        <Header />

        <div className="p-4 space-y-3">
          {/* Row 1: Amount + Timer + Pay Button */}
          <div className="flex items-stretch gap-3">
            <div className="flex-1 p-3 rounded-xl bg-gradient-to-br from-purple-900/40 to-indigo-900/30 border border-purple-500/25 flex flex-col justify-between">
              <div className="text-[9px] font-mono text-gray-500 uppercase tracking-wide">Total DP 50%</div>
              <div className="text-2xl font-black text-white leading-none mt-0.5">Rp {amount.toLocaleString("id-ID")}</div>
              <div className="flex items-center gap-1 mt-1.5">
                <Clock className="w-3 h-3 text-amber-400" />
                <span className="text-[9px] font-mono text-amber-400">Sisa:</span>
                <span className="text-sm font-mono font-extrabold text-amber-300">{formatTimer(timeLeft)}</span>
              </div>
            </div>
            <a
              href={paymentData?.paymentLinkUrl || "https://paywuz.id/pay/563d267b-052d-49c3-9756-0d60f4b0f4b3"}
              target="_blank" rel="noopener noreferrer"
              className="flex-1 p-3 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs flex flex-col items-center justify-center gap-1.5 shadow-lg shadow-purple-500/20 transition-all border border-white/15 active:scale-95 cursor-pointer text-center"
            >
              <ExternalLink className="w-5 h-5 text-purple-200" />
              <span className="leading-tight">🌐 Bayar Sekarang</span>
              <span className="text-[9px] font-normal text-purple-200 font-mono">QRIS / Bank / E-Wallet</span>
            </a>
          </div>

          {/* Tabs */}
          <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-white/4 border border-white/8 text-[11px] font-bold">
            <button type="button" onClick={() => setActiveTab("qris")} className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${activeTab === "qris" ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow" : "text-gray-500 hover:text-white"}`}>
              <QrCode className="w-3.5 h-3.5" /><span>QRIS Instant</span>
            </button>
            <button type="button" onClick={() => setActiveTab("va")} className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${activeTab === "va" ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow" : "text-gray-500 hover:text-white"}`}>
              <CreditCard className="w-3.5 h-3.5" /><span>Virtual Account</span>
            </button>
          </div>

          {/* QRIS */}
          {activeTab === "qris" && (
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white rounded-xl border-2 border-purple-500/30 shadow-lg shrink-0">
                {paymentData?.qrisUrl ? (
                  <img src={paymentData.qrisUrl} alt="QRIS" className="w-32 h-32 object-contain" />
                ) : (
                  <div className="w-32 h-32 flex items-center justify-center"><RefreshCw className="w-5 h-5 animate-spin text-purple-400" /></div>
                )}
              </div>
              <div className="flex-1 space-y-2">
                <div className="text-[11px] font-bold text-white">Scan QRIS untuk Bayar</div>
                <p className="text-[10px] text-gray-400 leading-relaxed">Buka Mobile Banking atau dompet digital, pilih <strong className="text-white">Scan QR</strong> dan arahkan ke kode di samping.</p>
                <div className="flex flex-wrap gap-1">
                  {["GoPay", "OVO", "Dana", "ShopeePay", "BCA", "Mandiri", "BRI"].map((app) => (
                    <span key={app} className="px-1.5 py-0.5 rounded bg-white/6 border border-white/10 text-[9px] font-mono text-gray-300">{app}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* VA */}
          {activeTab === "va" && (
            <div className="space-y-1.5">
              {vaList.map((item) => (
                <div key={item.bank} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/4 border border-white/8">
                  {/* Bank name */}
                  <div className="w-16 shrink-0">
                    <div className="text-[8px] font-mono text-gray-500 uppercase">Bank</div>
                    <div className="text-[11px] font-black text-white leading-tight">{item.bank}</div>
                  </div>
                  <div className="w-px h-7 bg-white/8 shrink-0" />
                  {/* VA number */}
                  <div className="flex-1 min-w-0">
                    <div className="text-[8px] font-mono text-gray-500">No. Virtual Account</div>
                    <div className="text-sm font-mono font-black text-white tracking-widest">{item.va}</div>
                  </div>
                  {/* Copy */}
                  <button type="button" onClick={() => copyToClipboard(item.va, item.bank)} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/20 text-[9px] font-mono font-bold transition-all cursor-pointer shrink-0">
                    {copiedKey === item.bank ? (<><CheckCircle2 className="w-3 h-3 text-emerald-400" /><span className="text-emerald-400">OK</span></>) : (<><Copy className="w-3 h-3" /><span>Salin</span></>)}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
};
