"use client";

import React, { useState, useEffect, memo } from "react";
import { Search, ChevronDown, HelpCircle, ChevronRight, MessageSquare, ShieldCheck, Zap } from "lucide-react";
import { WhatsAppLogo } from "@/components/icons/BrandIcons";
import confetti from "canvas-confetti";

export interface FaqItem {
  id: string;
  question: string;
  category: string;
  answer: string;
}

export const FAQ_DATA: FaqItem[] = [
  {
    id: "tutorial-cara-order",
    question: "Bagaimana tutorial & alur cara memesan website di Arjuna Dev?",
    category: "Tutorial & Order",
    answer: "Pemesanan website sangat cepat dan mudah melalui 6 langkah:\n1. Buka aplikasi Order Wizard di website / hubungi WhatsApp Admin.\n2. Pilih paket yang sesuai kebutuhan (Basic, Advanced, Business, E-Commerce, atau Custom).\n3. Lakukan pembayaran DP 50% via Transfer Bank Jago (103965597312 a.n Haris Musafa) atau Automatic QRIS/VA.\n4. Tim developer memulai pengerjaan & memberikan akses link Staging Preview & Project Tracker App.\n5. Sesi peninjauan tampilan & revisi penyesuaian hingga Anda puas.\n6. Pelunasan sisa 50%, serah terima akses CMS Admin, dan peluncuran resmi website beserta aktivasi Garansi 90 Hari."
  },
  {
    id: "kontak-official",
    question: "Berapa nomor WhatsApp & akun Instagram resmi Arjuna Dev?",
    category: "Kontak Resmi",
    answer: "Anda dapat menghubungi tim resmi Arjuna Dev (Founder: Haris Musafa) melalui:\n• WhatsApp Business: 085693366142 (https://wa.me/6285693366142)\n• Instagram Official: @haris_musafa_ (https://instagram.com/haris_musafa_)\n• Email Consultation: arjunawebdev@gmail.com\nJam Operasional CS: Live AI Assistant 24 Jam Non-Stop & Admin Live Chat (Senin – Sabtu, 08.00 – 22.00 WIB)."
  },
  {
    id: "no-rekening-pembayaran",
    question: "Berapa nomor rekening dan apa saja pilihan metode pembayarannya?",
    category: "Pembayaran & Bank",
    answer: "Metode Pembayaran Resmi Arjuna Dev Studio:\n1. Transfer Bank Manual: Bank Jago (103965597312 a.n Haris Musafa). Bank lain (BCA, Mandiri, BRI) tersedia via Virtual Account Admin.\n2. Payment Gateway Otomatis: QRIS Instant (GoPay, OVO, Dana, ShopeePay, LinkAja) & Virtual Account (BCA, Mandiri, BRI, BNI, Jago).\nSkema Bayar: DP 50% di awal proyek & Pelunasan 50% setelah website disetujui 100% sebelum rilis live."
  },
  {
    id: "proses-pengerjaan",
    question: "Berapa lama estimasi waktu proses pengerjaan website?",
    category: "Waktu & Proses",
    answer: "Estimasi pengerjaan bergantung pada jenis paket yang dipilih:\n• Paket Basic (1 Halaman): 3 – 5 Hari Kerja\n• Paket Advanced (Up to 5 Halaman + CMS): 5 – 7 Hari Kerja\n• Paket Business (Katalog Dinamis + Domain .COM): 7 – 10 Hari Kerja\n• Paket E-Commerce (Full-Stack Toko Online): 14 – 21 Hari Kerja\n• Custom Web App / Mobile App (iOS & Android): 3 – 6 Minggu\nProses pengerjaan dihitung sejak DP 50% dan materi diserahkan. Ada Garansi Tepat Waktu dengan kompensasi cashback jika terjadi keterlambatan."
  },
  {
    id: "garansi-bug-support",
    question: "Bagaimana sistem garansi 90 hari dan pemeliharaannya?",
    category: "Garansi & Support",
    answer: "Setiap pembuatan website di Arjuna Dev dilindungi Garansi Resmi:\n1. Garansi 90 Hari Bug-Free: Setiap eror sistem, tombol rusak, atau kendala teknis diperbaiki gratis selama 3 bulan penuh.\n2. Garansi Bebas Biaya Server Bulanan: Server kencang tanpa iuran sewa bulanan.\n3. Panduan CMS Admin: Edukasi video/bantuan pengoperasian CMS agar Anda dapat mengubah naskah & menambah produk secara mandiri."
  },
  {
    id: "biaya-domain-hosting",
    question: "Apakah saya perlu membayar sewa domain & hosting lagi tahun depan?",
    category: "Biaya & Paket",
    answer: "Semua paket pembuatan website di Arjuna Dev sudah GRATIS Hosting Premium tanpa biaya sewa server bulanan. Khusus Paket Business & E-Commerce sudah termasuk GRATIS Domain .COM 1 Tahun Pertama. Perpanjangan domain di tahun ke-2 dst sangat transparan (sekitar Rp 160rb - Rp 190rb/tahun sesuai harga sewa resmi tanpa markup)."
  },
  {
    id: "edit-sendiri-cms",
    question: "Saya tidak paham coding teknis, apakah websitenya bisa saya edit sendiri?",
    category: "Pengelolaan",
    answer: "Tentu saja! Pada Paket Advanced, Business, dan E-Commerce, Anda akan mendapatkan akses ke Admin Panel (CMS) yang sangat mudah digunakan seperti mengetik postingan sosial media di HP. Anda bisa menambah produk, mengubah harga, dan menulis artikel kapan saja tanpa bantuan programmer."
  },
  {
    id: "muncul-di-google-seo",
    question: "Apakah website saya sudah bisa langsung ditemukan di Google?",
    category: "SEO & Google",
    answer: "Ya! Setiap paket pembuatan website di Arjuna Dev sudah dilengkapi optimasi struktur SEO (Meta Title, Meta Description, OpenGraph) serta pendaftaran resmi ke Google Search Console agar website Anda cepat di-index dan dapat ditemukan calon pembeli di Google."
  },
  {
    id: "materi-belum-siap",
    question: "Bagaimana jika saya belum memiliki materi foto atau teks untuk website?",
    category: "Waktu & Proses",
    answer: "Jangan khawatir! Tim Arjuna Dev siap membantu pembuatan draf copywriting naskah penjualan dan menyediakan foto ilustrasi stok berkualitas tinggi secara GRATIS untuk bisnis Anda."
  }
];

export const FaqApp: React.FC = memo(function FaqApp() {
  const [faqList, setFaqList] = useState<FaqItem[]>(FAQ_DATA);
  const [openId, setOpenId] = useState<string | null>("proses-pengerjaan");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    fetch("/api/faqs")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped: FaqItem[] = data.map((item: any) => ({
            id: item.faqId || String(item.id),
            question: item.question,
            category: item.category || "Umum",
            answer: item.answer,
          }));
          setFaqList(mapped);
        }
      })
      .catch(() => {});
  }, []);

  const filteredFaqs = faqList.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const handleAskWA = () => {
    confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    const msg = "Halo Haris Musafa (Arjuna Dev), saya ingin bertanya mengenai pembuatan website untuk bisnis saya.";
    window.open(`https://wa.me/6285693366142?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="flex flex-col h-full gap-4 text-gray-200 font-sans select-text pb-4">
      {/* Header Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#181818] via-[#1c1c1c] to-[#222222] border border-white/10 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              FAQ — Pertanyaan Sering Ditanyakan
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
              Jawaban Cepat
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
            Temukan jawaban lengkap seputar alur pengerjaan, domain, hosting, garansi, dan pembuatan website di Arjuna Dev.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-60 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari pertanyaan..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-sky-500"
          />
        </div>
      </div>

      {/* Accordion Questions List */}
      <div className="flex-1 overflow-y-auto space-y-2.5 custom-scrollbar p-0.5">
        {filteredFaqs.map((faq) => {
          const isOpen = openId === faq.id;

          return (
            <div
              key={faq.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? "bg-[#181d28] border-sky-500/50 shadow-md"
                  : "bg-[#161a24] border-white/10 hover:border-white/20"
              }`}
            >
              <button
                onClick={() => toggleAccordion(faq.id)}
                className="w-full px-4 py-3.5 flex items-center justify-between text-left gap-3 text-xs font-bold text-white cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-500/10 text-sky-300 border border-sky-500/20 shrink-0">
                    {faq.category}
                  </span>
                  <span>{faq.question}</span>
                </div>

                <div className={`p-1 rounded-full bg-white/5 transition-transform ${isOpen ? "rotate-180 bg-sky-500/20 text-sky-300" : "text-gray-400"}`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 text-xs text-gray-300 border-t border-white/5 leading-relaxed font-sans animate-in fade-in duration-150 whitespace-pre-line">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Direct Contact Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#25D366] to-emerald-600 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg shrink-0">
        <div>
          <div className="text-xs font-bold">Punya Pertanyaan Lain Yang Belum Terjawab?</div>
          <div className="text-[11px] text-emerald-100 mt-0.5">Tim Arjuna Dev siap membantu menjawab pertanyaan bisnis Anda via WhatsApp.</div>
        </div>

        <button
          onClick={handleAskWA}
          className="px-4 py-2 rounded-xl bg-white hover:bg-emerald-50 text-emerald-800 text-xs font-bold shadow shrink-0 transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
        >
          <WhatsAppLogo className="w-4 h-4 text-emerald-600" />
          <span>Tanya via WhatsApp</span>
        </button>
      </div>
    </div>
  );
});
