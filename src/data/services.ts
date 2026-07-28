export interface ServicePackage {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  originalPrice?: string;
  isPromoActive?: boolean;
  priceNote: string;
  badge?: string;
  popular?: boolean;
  accentColor: "green" | "cyan" | "purple" | "red";
  features: string[];
  bonuses?: string[];
  estimatedTime: string;
  ctaText: string;
  waMessage: string;
}

export const SERVICES_DATA: ServicePackage[] = [
  {
    id: "basic",
    title: "Paket Basic",
    subtitle: "Landing Page Profesional untuk Bisnis & Validasi Produk",
    price: "Rp 500.000",
    originalPrice: "Rp 750.000",
    isPromoActive: true,
    priceNote: "Sudah termasuk free hosting",
    badge: "Landing Page",
    accentColor: "green",
    estimatedTime: "7 Hari Kerja",
    features: [
      "1 Halaman Utama dengan struktur yang disesuaikan dengan kebutuhan bisnis",
      "Section Tidak Terbatas sesuai kebutuhan konten",
      "Desain Modern & Responsive untuk tampilan optimal di desktop, tablet, dan mobile",
      "Free Hosting dengan bantuan konfigurasi hosting gratis tanpa biaya bulanan",
      "Tombol WhatsApp untuk memudahkan pelanggan menghubungi bisnis Anda",
      "Optimasi Performa agar website cepat dan nyaman digunakan",
      "No Bugs Guarantee — website diuji sebelum diserahkan untuk memastikan fungsi berjalan dengan baik",
      "Revisi Tidak Terbatas"
    ],
    ctaText: "Pilih Paket & Isi Form Order",
    waMessage: "Halo Arjuna Dev, saya berminat dengan Paket Basic Rp 500.000. Mohon informasi kelanjutannya."
  },
  {
    id: "advanced",
    title: "Paket Advanced",
    subtitle: "Website Profesional dengan CMS & Optimasi SEO",
    price: "Rp 900.000",
    originalPrice: "Rp 1.300.000",
    isPromoActive: true,
    priceNote: "Sudah termasuk free hosting",
    badge: "CMS & SEO",
    accentColor: "purple",
    estimatedTime: "7 Hari Kerja",
    features: [
      "Hingga 5 Halaman Utama",
      "Section Tidak Terbatas sesuai kebutuhan konten",
      "Desain Modern & Responsive",
      "Free Hosting tanpa biaya hosting bulanan",
      "CMS & Dashboard Admin untuk mengelola konten website dengan mudah",
      "SEO On-Page Optimization untuk membantu meningkatkan visibilitas website",
      "Konfigurasi Google Search Console & Indexing",
      "Tombol WhatsApp untuk komunikasi langsung dengan pelanggan",
      "Optimasi Performa Website",
      "No Bugs Guarantee — website diuji sebelum diserahkan",
      "Revisi Tidak Terbatas"
    ],
    ctaText: "Pilih Paket & Isi Form Order",
    waMessage: "Halo Arjuna Dev, saya berminat dengan Paket Advanced Rp 900.000. Mohon informasi kelanjutannya."
  },
  {
    id: "business",
    title: "Paket Business",
    subtitle: "Website Bisnis dengan Katalog Produk Dinamis",
    price: "Rp 1.500.000",
    originalPrice: "Rp 2.200.000",
    isPromoActive: true,
    priceNote: "Domain .COM & hosting gratis 1 tahun",
    badge: "PALING POPULER",
    popular: true,
    accentColor: "cyan",
    estimatedTime: "14 Hari Kerja",
    features: [
      "Hingga 5 Halaman Utama",
      "Section Tidak Terbatas",
      "Desain Modern & Responsive",
      "Free Hosting",
      "Domain .COM Gratis selama 1 Tahun",
      "CMS & Dashboard Admin",
      "Katalog Produk Dinamis",
      "Filter & Kategori Produk",
      "Detail Produk, Harga, Gambar, dan Informasi Produk",
      "Integrasi Google Sheets untuk mengelola data produk",
      "Sinkronisasi Data Produk yang lebih praktis",
      "SEO On-Page Optimization",
      "Konfigurasi Google Search Console & Indexing",
      "Tombol WhatsApp",
      "Optimasi Performa Website",
      "No Bugs Guarantee",
      "Revisi Tidak Terbatas"
    ],
    ctaText: "Pilih Paket & Isi Form Order",
    waMessage: "Halo Arjuna Dev, saya berminat dengan Paket Business Rp 1.500.000 (PALING POPULER). Saya ingin konsultasi gratis."
  },
  {
    id: "ecommerce",
    title: "Paket E-Commerce",
    subtitle: "Solusi E-Commerce Full-Stack untuk Bisnis yang Siap Berkembang",
    price: "Rp 5.000.000",
    originalPrice: "Rp 7.000.000",
    isPromoActive: true,
    priceNote: "Free VPS 1 Bulan & Server Config",
    badge: "E-Commerce",
    accentColor: "red",
    estimatedTime: "21 Hari Kerja",
    features: [
      "Semua Fitur Paket Sebelumnya",
      "Website E-Commerce Full-Stack",
      "Sistem Login & Register",
      "Manajemen Profil Pelanggan",
      "Keranjang Belanja & Checkout",
      "Riwayat Transaksi Pelanggan",
      "Database Production-Ready yang aman dan dapat dikembangkan",
      "Integrasi Payment Gateway",
      "Pembayaran Otomatis melalui Bank & E-Wallet",
      "Update Status Pembayaran Secara Otomatis",
      "Dashboard Admin Profesional",
      "Manajemen Produk & Kategori",
      "Manajemen Pesanan dan Status Pengiriman",
      "Grafik Penjualan & Ringkasan Bisnis",
      "Laporan Transaksi",
      "Free VPS selama 1 Bulan",
      "Deploy & Konfigurasi Server",
      "SSL & Optimasi Keamanan Dasar",
      "Optimasi Performa Website",
      "No Bugs Guarantee — sistem diuji secara menyeluruh sebelum diserahkan",
      "Revisi Tidak Terbatas"
    ],
    ctaText: "Pilih Paket & Isi Form Order",
    waMessage: "Halo Arjuna Dev, saya tertarik dengan Paket E-Commerce Rp 5.000.000. Mohon info penawaran resminya."
  }
];

export const UMKM_ADVANTAGES = [
  {
    title: "Gratis Domain .com 1 Tahun",
    desc: "Nama alamat website resmi (.com) diberikan gratis tanpa ada biaya tersembunyi.",
    iconName: "Globe"
  },
  {
    title: "Gratis Hosting 1 Tahun",
    desc: "Server kencang & stabil dengan uptime 99.9% tanpa perlu bayar sewa hosting lagi.",
    iconName: "Server"
  },
  {
    title: "SEO Friendly",
    desc: "Dibuat dengan struktur SEO terbaik agar usaha Anda mudah ditemukan calon pembeli di Google.",
    iconName: "Search"
  },
  {
    title: "Mobile Friendly",
    desc: "Tampilan otomatis menyesuaikan layar HP, tablet, dan laptop dengan sangat rapi dan ramah sentuhan.",
    iconName: "Smartphone"
  },
  {
    title: "Loading Super Cepat",
    desc: "Performa maksimal membuat pembeli betah dan tidak kabur karena web lemot.",
    iconName: "Zap"
  },
  {
    title: "Garansi Bug hingga 90 Hari",
    desc: "Jaminan perbaikan bug gratis hingga 3 bulan penuh demi ketenangan bisnis Anda.",
    iconName: "ShieldCheck"
  }
];
