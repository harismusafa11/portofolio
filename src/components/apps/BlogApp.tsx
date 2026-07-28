"use client";

import React, { useState, useEffect, memo } from "react";
import { Search, Clock, Calendar, User, Tag, ArrowRight, BookOpen, X, Share2, ArrowLeft, CheckCircle2, ChevronRight, Eye } from "lucide-react";
import { WhatsAppLogo } from "@/components/icons/BrandIcons";
import confetti from "canvas-confetti";

export interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  summary: string;
  imageUrl: string;
  tags: string[];
  content: {
    intro: string;
    keyPoints: string[];
    body: string[];
    conclusion: string;
  };
}

export const ARTICLES_DATA: Article[] = [
  {
    id: "gmaps-website-umkm",
    title: "5 Cara Membantu Usaha Kuliner & Toko Lokal Kebanjiran Orderan dari Google & WA",
    category: "Tips UMKM",
    readTime: "4 Menit Baca",
    date: "24 Juli 2026",
    author: "Haris Musafa",
    summary: "Banyak pemilik toko lokal dan restoran mengeluhkan sepinya pembeli offline. Padahal, mengintegrasikan Google Maps dengan Website profesional bisa mendatangkan puluhan chat calon pembeli setiap hari secara gratis.",
    imageUrl: "/images/blog/umkm_gmaps.png",
    tags: ["Google Maps", "Website UMKM", "Order WA"],
    content: {
      intro: "Di era serba digital saat ini, lebih dari 80% konsumen Indonesia selalu mencari lokasi toko lokal, menu resto, atau layanan jasa terdekat melalui smartphone mereka sebelum memutuskan datang atau membeli. Jika bisnis Anda belum memiliki kehadiran digital yang solid, Anda kehilangan potensi omset puluhan juta setiap bulannya.",
      keyPoints: [
        "Optimasi Profil Bisnis Google (Google Maps) dengan nama lokasi yang jelas.",
        "Sediakan Website Landing Page yang langsung memuat tombol WhatsApp Direct.",
        "Tampilkan daftar produk/menu dengan foto asli dan harga transparan.",
        "Pasang ulasan & garansi kepuasan pembeli untuk membangun kepercayaan instan.",
        "Pastikan website memuat dalam waktu kurang dari 2 detik di HP Android calon pembeli."
      ],
      body: [
        "Langkah pertama yang paling krusial adalah memastikan bahwa saat calon pelanggan mengetik 'resto terdekat' atau 'jasa servis terdekat', lokasi toko Anda muncul di posisi teratas Google Maps.",
        "Namun tidak cukup hanya berhenti di Google Maps. Calon pembeli seringkali ingin melihat legalitas, harga resmi, atau daftar katalog lengkap. Di sinilah peran penting Website Resmi UMKM. Website bertindak sebagai 'Salesman 24 Jam' yang tidak pernah lelah menjawab pertanyaan calon pembeli.",
        "Dengan mengintegrasikan tombol WhatsApp otomatis yang telah terisi pesan pembeli (misal: 'Halo, saya mau order menu A'), proses konversi dari sekadar melihat di HP menjadi pembeli bayar terjadi hanya dalam hitungan detik!"
      ],
      conclusion: "Jangan tunda lagi untuk memasarkan usaha lokal Anda secara profesional. Arjuna Dev siap membantu membuatkan Landing Page UMKM terima beres lengkap dengan domain .com dan hosting gratis."
    }
  },
  {
    id: "website-lemot-pembeli-kabur",
    title: "Kenapa Website Lemot Bisa Membuat 70% Calon Pembeli Kabur Sebelum Belanja?",
    category: "Web & App",
    readTime: "3 Menit Baca",
    date: "20 Juli 2026",
    author: "Haris Musafa",
    summary: "Studi membuktikan bahwa pengguna smartphone di Indonesia hanya toleran menunggu loading website maksimal 3 detik. Jika lebih dari itu, mereka akan langsung menekan tombol Back dan beralih ke kompetitor Anda.",
    imageUrl: "/images/blog/speed_optimization.png",
    tags: ["Loading Speed", "Conversion Rate", "Performa Web"],
    content: {
      intro: "Memiliki desain website yang cantik saja tidak cukup jika pembukaannya terasa sangat berat saat diakses dari jaringan seluler 4G HP biasa. Performa kecepatan loading adalah salah satu faktor utama keberhasilan penjualan digital.",
      keyPoints: [
        "Setiap penundaan 1 detik pada loading mengurangi konversi penjualan hingga 7%.",
        "Google memberikan peringkat ranking lebih tinggi pada website berkategori Fast Loading (Lighthouse Score > 90).",
        "Kompresi gambar dan kode efisien berbasis framework modern (seperti Next.js) mampu memotong waktu muat hingga 80%."
      ],
      body: [
        "Banyak pemilik UMKM yang tergiur dengan pembuat website murah berbasis CMS berat atau template tumpuk plugin yang membuat ukuran file membengkak hingga puluhan megabyte.",
        "Di Arjuna Dev, setiap kode disusun secara bersih (Clean Code Architecture) menggunakan Next.js dan akselerasi GPU, memastikan website bisnis Anda dapat terbuka seketika bahkan saat koneksi HP calon pembeli sedang lambat."
      ],
      conclusion: "Pastikan investasi website Anda tidak terbuang sia-sia akibat performa yang lambat. Pilih tim developer profesional yang peduli pada kecepatan dan pengalaman pengguna."
    }
  },
  {
    id: "panduan-paket-web-umkm",
    title: "Panduan Memilih Paket Website UMKM yang Tepat Tanpa Takut Kemahalan",
    category: "SEO & Google",
    readTime: "5 Menit Baca",
    date: "15 Juli 2026",
    author: "Haris Musafa",
    summary: "Bingung memilih antara Paket Starter, Business, atau Toko Online? Simak panduan praktis ini untuk menyesuaikan jenis website dengan skala usaha dan budget bisnis Anda.",
    imageUrl: "/images/blog/pricing_guide.png",
    tags: ["Panduan UMKM", "Harga Website", "Arjuna Dev"],
    content: {
      intro: "Banyak pengusaha UMKM pemula yang ragu membuat website karena takut biaya perawatannya mahal atau terlalu rumit dikelola. Padahal, kebutuhan website setiap jenis usaha sangatlah berbeda.",
      keyPoints: [
        "Paket Starter (Rp 1.299.000): Sangat ideal untuk UMKM baru, jasa lokal, klinik, atau personal branding yang butuh profil 1 halaman serba cepat.",
        "Paket Business (Rp 2.999.000): Pilihan paling populer untuk perusahaan & usaha berkembang yang butuh Admin Panel CMS untuk update artikel & produk secara mandiri.",
        "Paket Toko Online (Rp 5.999.000): Solusi lengkap untuk toko retail yang butuh sistem keranjang belanja, checkout QRIS/Transfer, dan hitung ongkir otomatis."
      ],
      body: [
        "Jika tujuan Anda hanya agar pelanggan bisa menemukan lokasi toko, daftar harga, dan tombol WhatsApp, maka Paket Starter sudah sangat cukup.",
        "Namun jika Anda memiliki banyak varian produk, ingin menulis artikel promosi SEO, atau memiliki tim admin, Paket Business adalah investasi jangka panjang terbaik karena sudah termasuk garansi bug 90 hari dan bonus banner promosi."
      ],
      conclusion: "Konsultasikan kebutuhan bisnis Anda secara gratis dengan tim Arjuna Dev untuk mendapatkan rekomendasi paket yang paling hemat dan berdaya guna tinggi."
    }
  },
  {
    id: "keuntungan-landing-page-vs-medsos",
    title: "Kenapa Toko Online di Instagram & TikTok Saja Tidak Cukup Tanpa Website Resmi?",
    category: "Tips UMKM",
    readTime: "4 Menit Baca",
    date: "25 Juli 2026",
    author: "Haris Musafa",
    summary: "Banyak UMKM yang usahanya tiba-tiba sepi atau terkena suspend di media sosial. Memiliki website resmi memberikan kepemilikan aset digital 100% yang aman dari perubahan algoritma.",
    imageUrl: "/images/blog/social_vs_website.png",
    tags: ["Aset Digital", "Medsos vs Web", "Branding UMKM"],
    content: {
      intro: "Media sosial memang sangat bagus untuk menjangkau perhatian pembeli pertama kali. Namun mengandalkan 100% jualan hanya di Instagram atau TikTok memiliki risiko bisnis yang sangat tinggi.",
      keyPoints: [
        "Media sosial adalah tempat menyapa calon pembeli, tetapi website adalah 'toko fisik digital' milik Anda sendiri.",
        "Akun sosial media dapat terkena pemblokiran atau perubahan algoritma tanpa pemberitahuan sebelumnya.",
        "Domain .com memberikan kepastian kredibilitas di mata bank, mitra bisnis, dan calon pembeli kakap."
      ],
      body: [
        "Banyak kasus pemilik toko fashion atau kuliner yang akun sosial medianya tiba-tiba tidak bisa diakses atau jangkauannya merosot drastis akibat perubahan algoritma.",
        "Dengan memiliki Website Resmi Arjuna Dev, seluruh database calon pembeli dan katalog produk tersimpan aman di server milik Anda sendiri. Anda bebas mengarahkan promosi dari media sosial langsung ke landing page yang siap menghasilkan orderan WhatsApp 24 jam nonstop."
      ],
      conclusion: "Amankan aset bisnis digital Anda sekarang. Gabungkan kekuatan promosi media sosial dengan kepastian transaksi di website resmi."
    }
  },
  {
    id: "cara-optimasi-seo-lokal-google",
    title: "Strategi SEO Lokal: Cara Agar Toko & Resto Kamu Rangking 1 di Pencarian Google",
    category: "SEO & Google",
    readTime: "5 Menit Baca",
    date: "22 Juli 2026",
    author: "Haris Musafa",
    summary: "Ingin usaha toko, klinik, atau restoran kamu muncul paling atas saat orang mencari jasa terdekat? Pelajari teknik SEO lokal sederhana yang terbukti ampuh mendatangkan pembeli nyata.",
    imageUrl: "/images/blog/local_seo_strategy.png",
    tags: ["SEO Lokal", "Google Maps", "Pemasaran Usaha"],
    content: {
      intro: "Pencarian berbasis lokasi seperti 'toko baju terdekat' atau 'jasa AC terdekat' memiliki tingkat pembeli yang paling tinggi karena calon pelanggan sudah memegang uang dan siap melakukan transaksi.",
      keyPoints: [
        "Gunakan kata kunci geografis daerah Anda di judul utama website.",
        "Hubungkan alamat Google Maps resmi dengan tombol arah lokasi di website.",
        "Sajikan ulasan kepuasan pembeli nyata tanpa manipulasi rating palsu."
      ],
      body: [
        "Google sangat mengutamakan website yang memiliki struktur schema lokasi yang valid dan kecepatan akses tinggi dari HP Android lokal.",
        "Setiap paket pembuatan website di Arjuna Dev sudah dikonfigurasi dengan standar SEO Lokal Google, memastikan usaha Anda lebih diprioritaskan dibanding pesaing di kota Anda."
      ],
      conclusion: "Tingkatkan kehadiran toko fisik Anda di era digital. Dapatkan bantuan konsultasi SEO Lokal gratis bersama Haris Musafa."
    }
  },
  {
    id: "fitur-wajib-web-toko-online-2026",
    title: "7 Fitur Wajib Website Toko Online 2026 Yang Bikin Checkout Pembeli 3x Lebih Cepat",
    category: "Web & App",
    readTime: "4 Menit Baca",
    date: "18 Juli 2026",
    author: "Haris Musafa",
    summary: "Pembayaran QRIS otomatis, cek ongkir otomatis seluruh Indonesia, dan tombol order WhatsApp tanpa ribet adalah kunci meningkatkan omset penjualan toko online Anda.",
    imageUrl: "/images/blog/qris_checkout_features.png",
    tags: ["Toko Online", "Payment QRIS", "E-Commerce"],
    content: {
      intro: "Proses checkout yang rumit atau memerlukan banyak pengisian form seringkali membuat calon pembeli membatalkan niat belanjanya di menit-menit terakhir.",
      keyPoints: [
        "Integrasi pembayaran QRIS (GoPay, ShopeePay, OVO, QRIS Bank) mempermudah pembayaran sekali scan.",
        "Perhitungan ongkir otomatis RajaOngkir API memotong waktu tanya jawab ongkir di WA.",
        "Sistem manajemen stok real-time mencegah pembeli memesan barang yang sudah habis."
      ],
      body: [
        "Di tahun 2026, kemudahan transaksi adalah raja. Pembeli menginginkan proses belanja yang instan dari layar HP mereka.",
        "Paket Toko Online Arjuna Dev dirancang khusus dengan workflow checkout otomatis yang ringkas, aman, dan langsung terhubung ke dashboard admin toko Anda."
      ],
      conclusion: "Tingkatkan konversi penjualan toko online Anda dengan fitur checkout QRIS & ongkir otomatis masa kini."
    }
  }
];

export const BlogApp: React.FC = memo(function BlogApp() {
  const [articlesList, setArticlesList] = useState<Article[]>(ARTICLES_DATA);
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped: Article[] = data.map((item: any) => {
            let contentObj = { intro: item.summary || "", keyPoints: [], body: [item.summary || ""], conclusion: "" };
            try {
              if (item.contentJson) {
                contentObj = typeof item.contentJson === "string" ? JSON.parse(item.contentJson) : item.contentJson;
              }
            } catch {}
            return {
              id: item.slug || String(item.id),
              title: item.title,
              category: item.category || "Tips UMKM",
              readTime: item.readTime || "4 Menit Baca",
              date: item.createdAt ? new Date(item.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) : "Terbaru",
              author: item.author || "Haris Musafa",
              summary: item.summary,
              imageUrl: item.imageUrl || "/images/blog/umkm_gmaps.png",
              tags: [item.category || "UMKM"],
              content: contentObj,
            };
          });
          setArticlesList(mapped);
        }
      })
      .catch(() => {});
  }, []);

  const categories = ["Semua", "Tips UMKM", "SEO & Google", "Web & App"];

  const filteredArticles = articlesList.filter((art) => {
    const matchesCat = selectedCategory === "Semua" || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleConsult = (articleTitle: string) => {
    confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    const msg = `Halo Haris Musafa (Arjuna Dev), saya membaca artikel "${articleTitle}" di blog dan berminat konsultasi website untuk bisnis saya.`;
    window.open(`https://wa.me/6285693366142?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="relative flex flex-col h-full gap-3 text-gray-200 font-sans select-text pb-4 overflow-hidden">
      {/* Top Banner Header */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-[#161d2b] via-[#1a2336] to-[#121622] border border-white/10 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
              Blog & Insight Bisnis — Arjuna Dev
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-sky-500/20 text-sky-300 font-bold border border-sky-500/30">
              Tips Digital UMKM
            </span>
          </div>
          <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">
            Artikel praktis & strategi pengembangan website bisnis untuk meningkatkan penjualan UMKM Indonesia.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-56 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari topik artikel..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-sky-500"
          />
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar no-scrollbar shrink-0">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border shrink-0 cursor-pointer ${
              selectedCategory === cat
                ? "bg-[#0078d4] text-white border-sky-400 shadow-md"
                : "bg-[#161a24] text-gray-300 border-white/10 hover:bg-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid (Horizontal Layout with 100% Unobstructed Title & Metadata Visibility) */}
      <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-3.5 custom-scrollbar p-0.5">
        {filteredArticles.map((art) => (
          <div
            key={art.id}
            onClick={() => setActiveArticle(art)}
            className="p-3.5 rounded-2xl bg-[#161a24] border border-white/10 hover:border-sky-500/50 shadow-lg flex flex-col sm:flex-row items-start sm:items-center gap-3.5 transition-all duration-200 hover:scale-[1.01] cursor-pointer group"
          >
            {/* Generated Image Thumbnail (Left Side) */}
            <div className="w-full sm:w-36 h-28 sm:h-28 rounded-xl border border-white/10 relative overflow-hidden shadow-inner shrink-0">
              <img
                src={art.imageUrl}
                alt={art.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold bg-black/80 backdrop-blur-md text-sky-300 border border-white/20">
                {art.category}
              </span>
            </div>

            {/* Article Info & Title (Right Side - 100% Unobstructed Visibility) */}
            <div className="flex-1 min-w-0 flex flex-col justify-between h-full space-y-1.5">
              <div>
                <div className="flex items-center gap-2 text-[10px] text-gray-400 font-mono">
                  <span>{art.date}</span>
                  <span>&bull;</span>
                  <span>{art.readTime}</span>
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-sky-300 transition-colors leading-snug line-clamp-2 mt-1">
                  {art.title}
                </h3>

                <p className="text-[11px] text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                  {art.summary}
                </p>
              </div>

              {/* Footer Link */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10 mt-1">
                <span className="text-[10px] text-gray-400 font-mono">Oleh {art.author}</span>
                <span className="text-sky-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1 text-[11px]">
                  Baca Artikel <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Article Detail Modal Reader (Scoped 100% Inside Blog Window Canvas) */}
      {activeArticle && (
        <div className="absolute inset-0 z-50 bg-[#121622] flex flex-col justify-between text-gray-200 animate-in fade-in duration-150 overflow-hidden rounded-2xl">
          {/* Sticky Top Header Navigation Bar */}
          <div className="px-4 py-3 bg-[#1a2030] border-b border-white/10 flex items-center justify-between shrink-0 z-20 shadow-md">
            <button
              onClick={() => setActiveArticle(null)}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer active:scale-95 border border-white/10"
            >
              <ArrowLeft className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Kembali ke Daftar Artikel</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                {activeArticle.category}
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
                title="Tutup Artikel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Article Content Body (Centered Editorial Max-Width Container & Proper 16:9 Image Aspect Ratio) */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar text-xs leading-relaxed">
            <div className="max-w-4xl mx-auto w-full space-y-5">
              {/* Title & Metadata Header */}
              <div className="space-y-2 border-b border-white/10 pb-4">
                <h1 className="text-base sm:text-2xl font-bold text-white tracking-tight leading-snug">
                  {activeArticle.title}
                </h1>
                <div className="text-[11px] sm:text-xs text-sky-400 font-mono">
                  Dipublikasikan oleh {activeArticle.author} pada {activeArticle.date} &bull; {activeArticle.readTime}
                </div>
              </div>

              {/* Generated Realistic Featured Image (Proper Aspect Ratio 16:9) */}
              <div className="w-full aspect-[16/9] max-h-[420px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl my-4">
                <img
                  src={activeArticle.imageUrl}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-medium">
                {activeArticle.content.intro}
              </p>

              {/* Key Takeaways Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-sky-500/10 border border-sky-500/20 space-y-2">
                <div className="text-xs sm:text-sm font-bold text-sky-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Poin Kunci Yang Perlu Diingat:</span>
                </div>
                <div className="space-y-2 pl-1">
                  {activeArticle.content.keyPoints.map((kp, i) => (
                    <div key={i} className="text-xs sm:text-sm text-sky-100 flex items-start gap-2.5">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{kp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Article Paragraphs */}
              <div className="space-y-4 text-gray-300 text-xs sm:text-sm leading-relaxed">
                {activeArticle.content.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* Conclusion Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#1a2233] border border-white/10 space-y-2">
                <h4 className="text-xs sm:text-sm font-bold text-white">Kesimpulan:</h4>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {activeArticle.content.conclusion}
                </p>
              </div>

              {/* WhatsApp Consultation Banner CTA */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
                <div className="space-y-0.5">
                  <div className="text-sm font-bold">Ingin Konsultasi Website Bisnis Anda?</div>
                  <div className="text-xs text-emerald-100">Diskusikan kebutuhan pembuatan website secara gratis bersama Haris Musafa.</div>
                </div>

                <button
                  onClick={() => handleConsult(activeArticle.title)}
                  className="px-5 py-2.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-800 text-xs font-bold shadow-md shrink-0 transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <WhatsAppLogo className="w-4 h-4 text-emerald-600" />
                  <span>Konsultasi WA</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
