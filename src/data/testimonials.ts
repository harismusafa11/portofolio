export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  brandName: string;
  category: "landing" | "ecommerce";
  categoryLabel: string;
  projectTitle: string;
  feedback: string;
  resultMetric: string;
  date: string;
  initials: string;
}

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "testi-1",
    clientName: "Rian Saputra",
    role: "Owner",
    brandName: "GlowSkin Official Store",
    category: "ecommerce",
    categoryLabel: "E-Commerce",
    projectTitle: "Website Toko Online Skincare & Fast Checkout",
    feedback:
      "Toko online skincare kami dibuat sangat kencang. Pembeli dari iklan TikTok & IG Ads bisa checkout dalam hitungan detik tanpa lemot. Omset penjualan produk naik drastis sejak migrasi ke website baru ini.",
    resultMetric: "+70% Konversi transaksi dari TikTok Ads",
    date: "Mei 2026",
    initials: "RS",
  },
  {
    id: "testi-2",
    clientName: "Anita Rahma",
    role: "Founder",
    brandName: "UrbanStyle Fashion Studio",
    category: "landing",
    categoryLabel: "Landing Page",
    projectTitle: "Landing Page Promosi Launching Koleksi Fashion",
    feedback:
      "Desain landing page-nya sangat mewah, estetis, dan pengerjaannya presisi. Tombol pemesanan langsung terhubung ke WhatsApp customer service tanpa kendala sama sekali.",
    resultMetric: "3.500+ pengunjung unik per hari tanpa lag",
    date: "April 2026",
    initials: "AR",
  },
  {
    id: "testi-3",
    clientName: "Rafi Kurnia",
    role: "Owner",
    brandName: "Kopi Nusantara Roastery",
    category: "ecommerce",
    categoryLabel: "E-Commerce",
    projectTitle: "Web Store Biji Kopi & Hitung Ongkir Otomatis",
    feedback:
      "Mas Haris sangat paham kebutuhan bisnis toko online. Sistem keranjang belanja dan hitung kurir otomatis bekerja sangat akurat. Pelanggan kami memuji tampilan web yang bersih dan kencang.",
    resultMetric: "1.200+ transaksi pesanan kopi per bulan",
    date: "Maret 2026",
    initials: "RK",
  },
  {
    id: "testi-4",
    clientName: "Faris Syahputra",
    role: "Owner",
    brandName: "Gadgetpedia Store",
    category: "landing",
    categoryLabel: "Landing Page",
    projectTitle: "Landing Page High-Converting Promo Event",
    feedback:
      "Pembuatan landing page promo gadget memuaskan sekali. Desainnya responsif di HP, animasinya halus, dan waktu muat halaman sangat cepat di koneksi seluler.",
    resultMetric: "Stok produk promo habis terjual dalam 3 hari",
    date: "Januari 2026",
    initials: "FS",
  },
  {
    id: "testi-5",
    clientName: "Devi Megawati",
    role: "Founder",
    brandName: "Organic Care Skincare",
    category: "ecommerce",
    categoryLabel: "E-Commerce",
    projectTitle: "Website E-Commerce Brand Skincare Organik",
    feedback:
      "Website buatan Mas Haris sangat profesional. Fitur pembayaran otomatis dan integrasi resi kurir lancar jaya. Sangat membantu menaikkan kepercayaan pembeli baru.",
    resultMetric: "2x lipat peningkatan pembeli baru di bulan pertama",
    date: "Desember 2025",
    initials: "DM",
  },
];
