"use client";

import React, { useRef } from "react";
import {
  Printer,
  X,
  ShieldCheck,
  CheckCircle2,
  Building,
  Mail,
  Phone,
  Clock,
  Download,
  Minus,
  Maximize2,
  Minimize2,
} from "lucide-react";

export interface OrderInvoiceData {
  orderId: string;
  createdAt: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  businessName: string;
  domainRequest: string;
  packageName: string;
  totalPrice: number;
  dpAmount: number;
  uniqueCode: number;
  paymentMethod: string;
  receiptUrl?: string;
  status: string;
}

interface OrderInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: OrderInvoiceData;
}

export const OrderInvoiceModal: React.FC<OrderInvoiceModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [isMinimized, setIsMinimized] = React.useState(false);
  const [isMaximized, setIsMaximized] = React.useState(false);

  if (!isOpen || !data) return null;

  const handlePrint = () => {
    window.print();
  };

  const totalDpWithCode = data.dpAmount + (data.uniqueCode || 0);

  // Minimized Floating Badge View
  if (isMinimized) {
    return (
      <div className="fixed bottom-5 left-5 z-50 p-3.5 bg-[#0f141f] border border-emerald-500/50 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold text-white">Invoice Resmi ({data.orderId})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsMinimized(false)}
            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-[10px] font-bold shadow transition-all cursor-pointer"
          >
            Buka Kembali
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 select-none">
      {/* Printable Invoice Container */}
      <div
        className={`relative w-full bg-[#0f141f] border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-200 ${
          isMaximized ? "max-w-5xl h-[94vh]" : "max-w-2xl max-h-[90vh]"
        }`}
      >
        {/* Modal Header & Actions Bar (Hidden on print) */}
        <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2 min-w-0">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[11px] font-bold border border-emerald-500/30 shrink-0">
              Kwitansi / Invoice Resmi
            </span>
            <span className="text-xs text-gray-400 font-mono truncate">{data.orderId}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow transition-all cursor-pointer active:scale-95"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / PDF</span>
            </button>

            {/* Window Controls Trio */}
            <button
              type="button"
              onClick={() => setIsMinimized(true)}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-amber-500/30 text-gray-300 hover:text-amber-300 flex items-center justify-center transition-all cursor-pointer"
              title="Minimize (Kecilkan)"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => setIsMaximized(!isMaximized)}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-sky-500/30 text-gray-300 hover:text-sky-300 flex items-center justify-center transition-all cursor-pointer"
              title={isMaximized ? "Restore (Kecilkan Layar)" : "Maximize (Perbesar Layar)"}
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-rose-500/40 text-gray-300 hover:text-rose-200 flex items-center justify-center transition-all cursor-pointer"
              title="Close (Tutup)"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Printable Body Content Area */}
        <div
          ref={printRef}
          className="p-6 sm:p-8 overflow-y-auto custom-scrollbar space-y-6 text-gray-100 bg-[#0f141f] print:bg-white print:text-black print:p-0 print:overflow-visible"
        >
          {/* Header Letterhead: Arjuna Dev Brand */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-white/10 print:border-black/20 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center font-black text-white text-base shadow">
                  A
                </div>
                <div>
                  <h1 className="text-lg font-black tracking-tight text-white print:text-black">
                    ARJUNA DEV
                  </h1>
                  <p className="text-[10px] text-sky-400 font-mono font-semibold print:text-sky-800">
                    Web &amp; Software Engineering Studio
                  </p>
                </div>
              </div>
              <p className="text-[11px] text-gray-400 print:text-gray-600 mt-2 leading-relaxed">
                Ds. Pamutih, Kec. Ulujami, Kab. Pemalang, Jawa Tengah
                <br />
                Haris Musafa (Lead Engineer) &bull; WA: +62 856-9336-6142 &bull; arjunadev.com
              </p>
            </div>

            <div className="text-left sm:text-right font-mono">
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 print:text-emerald-700 font-bold text-xs border border-emerald-500/20 print:border-emerald-700/30">
                [ PAID DP 50% ]
              </div>
              <div className="text-sm font-bold text-white print:text-black mt-2">
                INVOICE: {data.orderId}
              </div>
              <div className="text-[11px] text-gray-400 print:text-gray-600 mt-0.5">
                Tanggal: {data.createdAt}
              </div>
            </div>
          </div>

          {/* Client & Project Details Table */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-white/5 print:bg-gray-100 border border-white/10 print:border-gray-300 text-xs">
            <div className="space-y-1">
              <div className="text-[10px] font-mono text-gray-400 print:text-gray-600 uppercase font-bold">
                Ditujukan Kepada (Klien):
              </div>
              <div className="font-bold text-white print:text-black text-sm">{data.userName}</div>
              <div className="text-gray-300 print:text-gray-700">{data.businessName || "Bisnis Klien"}</div>
              <div className="text-gray-400 print:text-gray-600 font-mono">{data.userEmail}</div>
              <div className="text-gray-400 print:text-gray-600 font-mono">{data.userPhone}</div>
            </div>

            <div className="space-y-1 sm:text-right">
              <div className="text-[10px] font-mono text-gray-400 print:text-gray-600 uppercase font-bold">
                Detail Proyek &amp; Domain:
              </div>
              <div className="font-bold text-sky-400 print:text-sky-800 font-mono">{data.packageName}</div>
              <div className="text-gray-300 print:text-gray-700 font-mono">
                Domain: {data.domainRequest || "Request Domain Klien"}
              </div>
              <div className="text-gray-400 print:text-gray-600">
                Metode DP: {data.paymentMethod === "paywuz" ? "QRIS / VA Instant" : "Transfer Manual Bank Jago"}
              </div>
            </div>
          </div>

          {/* Financial Item Breakdown Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-white/10 print:bg-gray-200 text-gray-300 print:text-gray-800 font-mono uppercase text-[10px]">
                  <th className="p-3 rounded-l-lg print:rounded-none">Deskripsi Layanan</th>
                  <th className="p-3 text-right">Harga Total</th>
                  <th className="p-3 text-right rounded-r-lg print:rounded-none">DP 50% + Unik</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 print:divide-gray-300">
                <tr>
                  <td className="p-3">
                    <div className="font-bold text-white print:text-black">{data.packageName}</div>
                    <div className="text-[10px] text-gray-400 print:text-gray-600 mt-0.5">
                      Pengembangan Website, Setup Server, Domain, SSL &amp; Garansi 90 Hari Bug-Free
                    </div>
                  </td>
                  <td className="p-3 text-right font-mono font-semibold text-gray-300 print:text-gray-800">
                    Rp {data.totalPrice.toLocaleString("id-ID")}
                  </td>
                  <td className="p-3 text-right font-mono font-bold text-emerald-400 print:text-emerald-700">
                    Rp {totalDpWithCode.toLocaleString("id-ID")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Payment Summary Totals */}
          <div className="flex flex-col items-end pt-4 border-t border-white/10 print:border-gray-300 space-y-1 text-xs font-mono">
            <div className="flex justify-between w-64 text-gray-400 print:text-gray-600">
              <span>Subtotal Paket:</span>
              <span>Rp {data.totalPrice.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between w-64 text-gray-400 print:text-gray-600">
              <span>Nominal DP (50%):</span>
              <span>Rp {data.dpAmount.toLocaleString("id-ID")}</span>
            </div>
            {data.uniqueCode > 0 && (
              <div className="flex justify-between w-64 text-sky-400 print:text-sky-800">
                <span>Kode Unik Transfer:</span>
                <span>+ Rp {data.uniqueCode.toLocaleString("id-ID")}</span>
              </div>
            )}
            <div className="flex justify-between w-64 pt-2 border-t border-white/10 print:border-gray-300 font-bold text-sm text-emerald-400 print:text-emerald-700">
              <span>Total Terbayar DP:</span>
              <span>Rp {totalDpWithCode.toLocaleString("id-ID")}</span>
            </div>
          </div>

          {/* Guarantee Seal & Signature */}
          <div className="p-4 rounded-xl bg-emerald-500/10 print:bg-emerald-50 border border-emerald-500/20 print:border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-emerald-400 print:text-emerald-700 shrink-0" />
              <div>
                <div className="font-bold text-emerald-300 print:text-emerald-900">
                  Resmi Bergaransi 90 Hari Bug-Free &amp; On-Time Delivery
                </div>
                <p className="text-[10px] text-gray-300 print:text-gray-700 mt-0.5 leading-snug">
                  Kwitansi ini adalah bukti pembayaran DP 50% yang sah dari Arjuna Dev. Pelacakan progress dapat diakses di arjunadev.com/tracker.
                </p>
              </div>
            </div>

            <div className="text-center font-mono text-[10px] text-gray-400 print:text-gray-700 shrink-0">
              <div className="font-bold text-white print:text-black">Haris Musafa</div>
              <div className="text-emerald-400 print:text-emerald-700">Lead Engineer &amp; Founder</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
