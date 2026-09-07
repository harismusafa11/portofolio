export interface PortfolioProject {
  id: string;
  title: string;
  category: "web" | "mobile" | "saas";
  categoryLabel: string;
  description: string;
  longDescription: string;
  techStack: string[];
  features: string[];
  imagePlaceholderColor: string;
  demoUrl?: string;
  repoUrl?: string;
  highlights: string;
}

export const PORTFOLIO_DATA: PortfolioProject[] = [
  {
    id: "bintang-pratama-spices",
    title: "PT Bintang Pratama Spices Indo — Premium Indonesian Spices Exporter & Supplier",
    category: "web",
    categoryLabel: "B2B Export & Corporate Platform",
    description: "Website profil perusahaan dan katalog ekspor rempah Indonesia ke pasar dunia. Menampilkan komoditas Biji Pala ABCD, Cengkeh Lal Pari, Kayu Manis Korintje, & Vanili Planifolia.",
    longDescription: "PT Bintang Pratama Spices Indo adalah platform digital profil perusahaan & katalog ekspor komoditas rempah-rempah nusantara kelas dunia. Dibangun dengan standar performa ekspor internasional, bilingual switcher (EN/ID), katalog parameter mutu (moisture, eugenol, ASTA clean), kalkulator logistik FCL/CIF, serta panduan sertifikasi fitosanitari & COA.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Schema.org JSON-LD"],
    features: [
      "Katalog Spesifikasi Mutu Ekspor (Biji Pala ABCD, Cengkeh Lal Pari, Kayu Manis, Vanili)",
      "Sistem Bilingual Otomatis (English & Bahasa Indonesia)",
      "Informasi Standar Sertifikasi Fitosanitari, Fumigasi & COA",
      "Integrasi Permintaan Inquiry B2B Global via WhatsApp & Email"
    ],
    imagePlaceholderColor: "from-amber-900 to-stone-950",
    demoUrl: "https://bintangpratamaspicesindo.com",
    highlights: "Platform B2B Ekspor Rempah Indonesia Berstandar Internasional"
  },
  {
    id: "phototor-studio",
    title: "Phototor Studio — Free Online Photo Editor & PSD Web Tool",
    category: "web",
    categoryLabel: "Custom Web App / SaaS",
    description: "Edit PSD files online, crop with Slice Tool & Grid Cutter, auto remove backgrounds with AI, layer styles & 4K upscaling directly in browser.",
    longDescription: "Phototor Studio is a powerful browser-based free online photo editor and PSD web tool. Features multi-layer editing, Slice Tool & Grid Cutter Pro, automatic AI background removal, adjustment curves, and instant PSD/WEBP/PNG export without software installation.",
    techStack: ["React", "TypeScript", "Canvas API", "AI Engine", "Tailwind CSS"],
    features: [
      "Multi-Layer Editing & PSD File Export",
      "Slice Tool & Grid Cutter Pro",
      "Automatic AI Background Remover",
      "AI Super Resolution & 4K Image Upscaler"
    ],
    imagePlaceholderColor: "from-blue-900 to-slate-900",
    demoUrl: "https://www.phototorstudio.com",
    highlights: "Free Browser-Based PSD Editor & AI Image Tools"
  },
  {
    id: "invitation-builder",
    title: "invitationbuilder.net — Buat Undangan Digital Pernikahan Online Gratis & Elegan",
    category: "saas",
    categoryLabel: "SaaS & Web App",
    description: "Platform pembuat undangan digital online terpercaya di Indonesia. Pilih template elegan, kelola RSVP tamu secara real-time, dan bagikan tautan instan.",
    longDescription: "invitationbuilder.net adalah platform pembuat undangan digital online terpercaya di Indonesia. Dilengkapi pilihan template elegan, fitur kelola RSVP tamu secara real-time, buku tamu digital, integrasi petunjuk arah Google Maps, serta pembagian tautan instan via WhatsApp.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Canvas API", "Google Tag Manager"],
    features: [
      "Pilihan Template Undangan Digital Elegan",
      "Kelola RSVP Tamu & Buku Tamu Real-Time",
      "Integrasi Petunjuk Arah Google Maps",
      "Bagikan Tautan Instan via WhatsApp & Sosmed"
    ],
    imagePlaceholderColor: "from-purple-900 to-slate-900",
    demoUrl: "https://www.invitationbuilder.net",
    highlights: "Platform Pembuat Undangan Digital Terpercaya & Gratis"
  },
  {
    id: "fl-streams",
    title: "FL Streams — Live Sport Streaming Gratis",
    category: "web",
    categoryLabel: "Web Application",
    description: "Nonton pertandingan olahraga live secara gratis. Sepak bola, basket, tenis, MMA dan 20+ cabang olahraga dalam kualitas HD.",
    longDescription: "FL Streams adalah portal nonton siaran langsung pertandingan olahraga favorit secara gratis. Menyajikan sepak bola, basket, tenis, MMA, dan 20+ cabang olahraga dalam kualitas HD tanpa iklan berlebihan, tanpa login, dan tanpa biaya.",
    techStack: ["Next.js", "React", "HLS.js", "Video.js", "Tailwind CSS"],
    features: [
      "Stream Olahraga Live Kualitas High Definition",
      "20+ Cabang Olahraga (Sepak Bola, Basket, MMA)",
      "Tanpa Login, Tanpa Biaya, & Tanpa Iklan Berlebihan",
      "Jadwal Pertandingan & Skor Real-Time"
    ],
    imagePlaceholderColor: "from-[#0078d4] to-slate-900",
    demoUrl: "https://www.flstreams.my.id",
    highlights: "Portal Live Sport Streaming High Definition & Low-Latency"
  },
  {
    id: "kicktv-streams",
    title: "kickTvStreams — Live Sports Streaming",
    category: "web",
    categoryLabel: "Web Application",
    description: "Watch live sports events for free. Soccer, Basketball, Hockey, Baseball, Tennis, Cricket, Combat, and Racing — all in one place.",
    longDescription: "kickTvStreams adalah platform streaming olahraga terlengkap yang menyediakan siaran sepak bola, basket, balapan, kriket, dan olahraga lainnya secara gratis dengan kualitas HD dan live chat interaktif untuk penggemar olahraga di seluruh dunia.",
    techStack: ["Next.js", "TypeScript", "Video Engine", "Lucide React", "Tailwind CSS"],
    features: [
      "Live Sports Streaming (Soccer, Basketball, Racing, Combat)",
      "Fitur Live Chat Interaktif Penonton",
      "Player Video Auto-Buffer Optimized",
      "Responsif & Ringan di Berbagai Perangkat"
    ],
    imagePlaceholderColor: "from-emerald-900 to-slate-900",
    demoUrl: "https://www.kicktvstreams.my.id",
    highlights: "Platform Streaming Olahraga Terlengkap dengan Live Chat"
  },
  {
    id: "nova-rental",
    title: "Nova Rental Mobil — Sistem Booking & Sewa Mobil Online",
    category: "web",
    categoryLabel: "Booking System & Web App",
    description: "Platform rental mobil terpercaya dengan sistem booking online harian/bulanan, opsi lepas kunci & dengan driver profesional.",
    longDescription: "Nova Rental Mobil adalah platform penyewaan armada kendaraan harian dan bulanan terpercaya di Indonesia. Dilengkapi kalkulator estimasi sewa, pilihan armada (Avanza, Innova Reborn, Xpander, Brio), sistem reservasi instan, serta integrasi layanan driver profesional.",
    techStack: ["React", "TypeScript", "Vite", "Framer Motion", "Tailwind CSS"],
    features: [
      "Sistem Booking Sewa Mobil Online (Harian & Bulanan)",
      "Pilihan Layanan Lepas Kunci & Driver Profesional",
      "Katalog Armada Transparan (Avanza, Innova, Xpander, Brio)",
      "Konfirmasi Reservasi & Interaksi Instant via WhatsApp"
    ],
    imagePlaceholderColor: "from-indigo-900 to-slate-900",
    demoUrl: "https://novarental-sigma.vercel.app/",
    highlights: "Landing Page & Sistem Booking Rental Mobil Real-Time"
  },
  {
    id: "arena-x-futsal",
    title: "ARENA X — Sistem Booking Lapangan Futsal 24 Jam",
    category: "web",
    categoryLabel: "Sports & Booking System",
    description: "Landing page & reservasi jadwal lapangan futsal rumput sintetis standar FIFA dengan pencahayaan LED 1000-Lux.",
    longDescription: "ARENA X adalah platform booking dan landing page interaktif untuk sewa lapangan futsal profesional 24 jam. Menyajikan sistem alokasi jam tanding real-time, pilihan lapangan sintetis & vinyl interlock, serta konfirmasi pemesanan cepat tanpa antre.",
    techStack: ["React", "TypeScript", "Vite", "Lucide React", "Tailwind CSS"],
    features: [
      "Sistem Reservasi Slot Jadwal Lapangan 24 Jam",
      "Pilihan Lapangan Rumput Sintetis FIFA & Vinyl",
      "Estimasi Biaya & Fitur Sewa Perlengkapan Tanding",
      "Visualisasi Fasilitas & Lighting LED 1000-Lux"
    ],
    imagePlaceholderColor: "from-emerald-900 to-slate-900",
    demoUrl: "https://futsal-futsal-landing-3a7b.vercel.app/",
    highlights: "Sistem Booking Lapangan Futsal Interaktif & Real-Time"
  },
  {
    id: "aura-beauty-clinic",
    title: "AURA Beauty Clinic — Sistem Booking Perawatan Klinik Kecantikan",
    category: "web",
    categoryLabel: "Medical & Service Booking",
    description: "Platform reservasi dokter spesialis & perawatan klinik kecantikan premium dengan jadwal konsultasi interaktif.",
    longDescription: "AURA Beauty Clinic adalah website klinik kecantikan premium yang menggabungkan desain editorial mewah dengan sistem booking jadwal dokter. Pasien dapat memilih paket treatment (Laser, Botox, PRP, Stem Cell), memilih slot waktu konsultasi, dan reservasi otomatis.",
    techStack: ["Next.js", "TypeScript", "GSAP ScrollTrigger", "CSS Modules", "Tailwind CSS"],
    features: [
      "Sistem Booking Jadwal Dokter & Waktu Konsultasi",
      "Katalog Perawatan Kecantikan & Estimasi Harga",
      "Profil Tim Dokter Spesialis & Jadwal Praktik",
      "Antarmuka Editorial Luxury dengan Motion Interaktif"
    ],
    imagePlaceholderColor: "from-amber-900 to-slate-900",
    demoUrl: "https://klinik-delta-lemon.vercel.app/",
    highlights: "Landing Page & Booking System Klinik Kecantikan Premium"
  }
];
