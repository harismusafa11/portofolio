import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import * as schema from "./schema";
import bcrypt from "bcryptjs";

const databaseUrl = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_PIF2fXtn3yOr@ep-spring-leaf-az5wqh8i-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

async function main() {
  console.log("🚀 Initializing & Seeding Neon DB with 100% Authentic Frontend Data...");
  const sql = neon(databaseUrl);
  const db = drizzle({ client: sql, schema });

  // 1. Admin Account
  const defaultEmail = process.env.ADMIN_DEFAULT_EMAIL || "admin@arjunadev.com";
  const defaultPass = process.env.ADMIN_DEFAULT_PASSWORD || "Admin2026@";
  const hashedPassword = await bcrypt.hash(defaultPass, 10);

  const existingAdmin = await db.select().from(schema.adminUsers);
  if (existingAdmin.length === 0) {
    await db.insert(schema.adminUsers).values({
      email: defaultEmail,
      passwordHash: hashedPassword,
    });
    console.log(`✅ Seeded Admin User: ${defaultEmail}`);
  } else {
    await db
      .update(schema.adminUsers)
      .set({ passwordHash: hashedPassword })
      .where(eq(schema.adminUsers.email, defaultEmail));
    console.log(`✅ Updated Admin Password for: ${defaultEmail}`);
  }

  // 2. Promo Banner & Voucher
  await sql`ALTER TABLE promos ADD COLUMN IF NOT EXISTS service_id VARCHAR(100) DEFAULT 'starter';`;
  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id VARCHAR(100) PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      user_name VARCHAR(255) NOT NULL,
      user_email VARCHAR(255) NOT NULL,
      user_photo TEXT,
      package_id VARCHAR(100) NOT NULL,
      package_name VARCHAR(255) NOT NULL,
      total_price INTEGER NOT NULL,
      dp_amount INTEGER NOT NULL,
      payment_method VARCHAR(50) NOT NULL DEFAULT 'manual_transfer',
      status VARCHAR(50) NOT NULL DEFAULT 'pending_dp',
      form_data_json TEXT NOT NULL,
      receipt_url TEXT,
      paywuz_trx_id VARCHAR(255),
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS project_logs (
      id SERIAL PRIMARY KEY,
      order_id VARCHAR(100) NOT NULL,
      status_tag VARCHAR(50) NOT NULL,
      log_text TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `;

  await db.delete(schema.promos);
  await db.insert(schema.promos).values({
    serviceId: "basic",
    title: "Voucher Diskon Rp 250.000 — Paket Basic!",
    badgeText: "PROMO SPESIAL PERDANA",
    discountAmount: 250000,
    originalPrice: 750000,
    promoPrice: 500000,
    slotsRemaining: 2,
    isActive: true,
  });
  console.log("✅ Seeded Promo Banner & Voucher");

  // 3. Services & Pricing Packages
  await sql`ALTER TABLE services ADD COLUMN IF NOT EXISTS original_price INTEGER;`;
  await sql`ALTER TABLE services ADD COLUMN IF NOT EXISTS is_promo_active BOOLEAN NOT NULL DEFAULT FALSE;`;

  await db.delete(schema.services);
  await db.insert(schema.services).values([
    {
      id: "basic",
      name: "Paket Basic",
      category: "Landing Page",
      priceMin: 500000,
      priceMax: 500000,
      originalPrice: 750000,
      isPromoActive: true,
      baseDays: 7,
      desc: "Landing Page Profesional untuk Bisnis & Validasi Produk",
      featuresJson: JSON.stringify([
        "1 Halaman Utama dengan struktur yang disesuaikan dengan kebutuhan bisnis",
        "Section Tidak Terbatas sesuai kebutuhan konten",
        "Desain Modern & Responsive untuk tampilan optimal di desktop, tablet, dan mobile",
        "Free Hosting dengan bantuan konfigurasi hosting gratis tanpa biaya bulanan",
        "Tombol WhatsApp untuk memudahkan pelanggan menghubungi bisnis Anda",
        "Optimasi Performa agar website cepat dan nyaman digunakan",
        "No Bugs Guarantee — website diuji sebelum diserahkan untuk memastikan fungsi berjalan dengan baik",
        "Revisi Tidak Terbatas"
      ]),
      isPopular: false,
      isActive: true,
    },
    {
      id: "advanced",
      name: "Paket Advanced",
      category: "Website CMS",
      priceMin: 900000,
      priceMax: 900000,
      originalPrice: 1300000,
      isPromoActive: true,
      baseDays: 7,
      desc: "Website Profesional dengan CMS & Optimasi SEO",
      featuresJson: JSON.stringify([
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
      ]),
      isPopular: false,
      isActive: true,
    },
    {
      id: "business",
      name: "Paket Business",
      category: "Website Bisnis",
      priceMin: 1500000,
      priceMax: 1500000,
      originalPrice: 2200000,
      isPromoActive: true,
      baseDays: 14,
      desc: "Website Bisnis dengan Katalog Produk Dinamis",
      featuresJson: JSON.stringify([
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
      ]),
      isPopular: true,
      isActive: true,
    },
    {
      id: "ecommerce",
      name: "Paket E-Commerce",
      category: "E-Commerce",
      priceMin: 5000000,
      priceMax: 5000000,
      originalPrice: 7000000,
      isPromoActive: true,
      baseDays: 21,
      desc: "Solusi E-Commerce Full-Stack untuk Bisnis yang Siap Berkembang",
      featuresJson: JSON.stringify([
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
      ]),
      isPopular: false,
      isActive: true,
    }
  ]);
  console.log("✅ Seeded Services Packages");

  // 4. Portfolio Projects
  await db.delete(schema.portfolios);
  await db.insert(schema.portfolios).values([
    {
      slug: "phototor-studio",
      title: "Phototor Studio — Free Online Photo Editor & PSD Web Tool",
      category: "web",
      categoryLabel: "Custom Web App / SaaS",
      description: "Edit PSD files online, crop with Slice Tool & Grid Cutter, auto remove backgrounds with AI, layer styles & 4K upscaling directly in browser.",
      clientName: "Phototor Studio",
      techStackJson: JSON.stringify(["React", "TypeScript", "Canvas API", "AI Engine", "Tailwind CSS"]),
      imageUrl: "/images/portfolio/logistic_hero.png",
      liveUrl: "https://www.phototorstudio.com",
      isFeatured: true,
    },
    {
      slug: "invitation-builder",
      title: "invitationbuilder.net — Buat Undangan Digital Pernikahan Online Gratis & Elegan",
      category: "saas",
      categoryLabel: "SaaS & Web App",
      description: "Platform pembuat undangan digital online terpercaya di Indonesia. Pilih template elegan, kelola RSVP tamu secara real-time, dan bagikan tautan instan.",
      clientName: "Rafi Kurnia",
      techStackJson: JSON.stringify(["Next.js", "TypeScript", "Tailwind CSS", "Canvas API", "Google Tag Manager"]),
      imageUrl: "/images/portfolio/kopi_hero.png",
      liveUrl: "https://www.invitationbuilder.net",
      isFeatured: true,
    },
    {
      slug: "fl-streams",
      title: "FL Streams — Live Sport Streaming Gratis",
      category: "web",
      categoryLabel: "Web Application",
      description: "Nonton pertandingan olahraga live secara gratis. Sepak bola, basket, tenis, MMA dan 20+ cabang olahraga dalam kualitas HD.",
      clientName: "FL Streams",
      techStackJson: JSON.stringify(["Next.js", "React", "HLS.js", "Video.js", "Tailwind CSS"]),
      imageUrl: "/images/portfolio/logistic_hero.png",
      liveUrl: "https://www.flstreams.my.id",
      isFeatured: true,
    },
    {
      slug: "kicktv-streams",
      title: "kickTvStreams — Live Sports Streaming",
      category: "web",
      categoryLabel: "Web Application",
      description: "Watch live sports events for free. Soccer, Basketball, Hockey, Baseball, Tennis, Cricket, Combat, and Racing — all in one place.",
      clientName: "KickTV Media",
      techStackJson: JSON.stringify(["Next.js", "TypeScript", "Video Engine", "Lucide React", "Tailwind CSS"]),
      imageUrl: "/images/portfolio/kopi_hero.png",
      liveUrl: "https://www.kicktvstreams.my.id",
      isFeatured: true,
    }
  ]);
  console.log("✅ Seeded Portfolio Projects");

  // 5. Blog Articles
  await db.delete(schema.blogs);
  await db.insert(schema.blogs).values([
    {
      slug: "gmaps-website-umkm",
      title: "5 Cara Membantu Usaha Kuliner & Toko Lokal Kebanjiran Orderan dari Google & WA",
      category: "Tips UMKM",
      readTime: "4 Menit Baca",
      author: "Haris Musafa",
      summary: "Banyak pemilik toko lokal dan restoran mengeluhkan sepinya pembeli offline. Padahal, mengintegrasikan Google Maps dengan Website profesional bisa mendatangkan puluhan chat calon pembeli setiap hari secara gratis.",
      contentJson: JSON.stringify({
        intro: "Di era serba digital saat ini, lebih dari 80% konsumen Indonesia selalu mencari lokasi toko lokal, menu resto, atau layanan jasa terdekat melalui smartphone mereka sebelum memutuskan datang atau membeli.",
        keyPoints: [
          "Optimasi Profil Bisnis Google (Google Maps) dengan nama lokasi yang jelas.",
          "Sediakan Website Landing Page yang langsung memuat tombol WhatsApp Direct.",
          "Tampilkan daftar produk/menu dengan foto asli dan harga transparan.",
          "Pasang ulasan & garansi kepuasan pembeli untuk membangun kepercayaan instan.",
          "Pastikan website memuat dalam waktu kurang dari 2 detik di HP Android calon pembeli."
        ],
        body: [
          "Langkah pertama yang paling krusial adalah memastikan bahwa saat calon pelanggan mengetik 'resto terdekat' atau 'jasa servis terdekat', lokasi toko Anda muncul di posisi teratas Google Maps.",
          "Namun tidak cukup hanya berhenti di Google Maps. Calon pembeli seringkali ingin melihat legalitas, harga resmi, atau daftar katalog lengkap. Di sinilah peran penting Website Resmi UMKM."
        ],
        conclusion: "Jangan tunda lagi untuk memasarkan usaha lokal Anda secara profesional. Arjuna Dev siap membantu membuatkan Landing Page UMKM terima beres."
      }),
      imageUrl: "/images/blog/umkm_gmaps.png",
      isPublished: true,
    },
    {
      slug: "website-lemot-pembeli-kabur",
      title: "Kenapa Website Lemot Bisa Membuat 70% Calon Pembeli Kabur Sebelum Belanja?",
      category: "Web & App",
      readTime: "3 Menit Baca",
      author: "Haris Musafa",
      summary: "Studi membuktikan bahwa pengguna smartphone di Indonesia hanya toleran menunggu loading website maksimal 3 detik. Jika lebih dari itu, mereka akan langsung menekan tombol Back dan beralih ke kompetitor Anda.",
      contentJson: JSON.stringify({
        intro: "Memiliki desain website yang cantik saja tidak cukup jika pembukaannya terasa sangat berat saat diakses dari jaringan seluler 4G HP biasa.",
        keyPoints: [
          "Setiap penundaan 1 detik pada loading mengurangi konversi penjualan hingga 7%.",
          "Google memberikan peringkat ranking lebih tinggi pada website berkategori Fast Loading.",
          "Kompresi gambar dan kode efisien berbasis Next.js memotong waktu muat hingga 80%."
        ],
        body: [
          "Banyak pemilik UMKM yang tergiur dengan pembuat website murah berbasis CMS berat yang membuat ukuran file membengkak.",
          "Di Arjuna Dev, setiap kode disusun secara bersih (Clean Code Architecture) menggunakan Next.js dan akselerasi GPU."
        ],
        conclusion: "Pastikan investasi website Anda tidak terbuang sia-sia akibat performa yang lambat."
      }),
      imageUrl: "/images/blog/speed_optimization.png",
      isPublished: true,
    },
    {
      slug: "panduan-paket-web-umkm",
      title: "Panduan Memilih Paket Website UMKM yang Tepat Tanpa Takut Kemahalan",
      category: "SEO & Google",
      readTime: "5 Menit Baca",
      author: "Haris Musafa",
      summary: "Bingung memilih antara Paket Basic, Advanced, Business, atau E-Commerce? Simak panduan praktis ini untuk menyesuaikan jenis website dengan skala usaha dan budget bisnis Anda.",
      contentJson: JSON.stringify({
        intro: "Banyak pengusaha UMKM pemula yang ragu membuat website karena takut biaya perawatannya mahal atau terlalu rumit dikelola.",
        keyPoints: [
          "Paket Basic (Rp 500.000): Sangat ideal untuk landing page bisnis sederhana, personal branding, & validasi produk.",
          "Paket Advanced (Rp 900.000): Website profesional dengan dashboard admin (CMS) dan optimasi SEO.",
          "Paket Business (Rp 1.500.000): Website bisnis yang dilengkapi dengan katalog produk dinamis terhubung Google Sheets.",
          "Paket E-Commerce (Rp 5.000.000): Toko online full-stack premium dengan login pelanggan, keranjang, dan payment gateway."
        ],
        body: [
          "Jika tujuan Anda hanya memiliki landing page untuk promosi produk dengan tombol WhatsApp, maka Paket Basic sudah sangat cukup.",
          "Namun jika Anda memiliki banyak varian produk katalog, Paket Business adalah investasi jangka panjang terbaik."
        ],
        conclusion: "Konsultasikan kebutuhan bisnis Anda secara gratis dengan tim Arjuna Dev."
      }),
      imageUrl: "/images/blog/pricing_guide.png",
      isPublished: true,
    },
    {
      slug: "keuntungan-landing-page-vs-medsos",
      title: "Kenapa Toko Online di Instagram & TikTok Saja Tidak Cukup Tanpa Website Resmi?",
      category: "Tips UMKM",
      readTime: "4 Menit Baca",
      author: "Haris Musafa",
      summary: "Banyak UMKM yang usahanya tiba-tiba sepi atau terkena suspend di media sosial. Memiliki website resmi memberikan kepemilikan aset digital 100% yang aman dari perubahan algoritma.",
      contentJson: JSON.stringify({
        intro: "Media sosial memang sangat bagus untuk menjangkau perhatian pembeli pertama kali. Namun mengandalkan 100% jualan hanya di medsos memiliki risiko bisnis tinggi.",
        keyPoints: [
          "Media sosial adalah tempat menyapa calon pembeli, tetapi website adalah 'toko fisik digital' milik Anda sendiri.",
          "Akun sosial media dapat terkena pemblokiran tanpa pemberitahuan sebelumnya.",
          "Domain .com memberikan kepastian kredibilitas di mata calon pembeli."
        ],
        body: [
          "Banyak kasus pemilik toko fashion atau kuliner yang akun sosial medianya tiba-tiba tidak bisa diakses.",
          "Dengan memiliki Website Resmi Arjuna Dev, seluruh database calon pembeli dan katalog produk tersimpan aman."
        ],
        conclusion: "Amankan aset bisnis digital Anda sekarang bersama website resmi Arjuna Dev."
      }),
      imageUrl: "/images/blog/social_vs_website.png",
      isPublished: true,
    },
    {
      slug: "cara-optimasi-seo-lokal-google",
      title: "Strategi SEO Lokal: Cara Agar Toko & Resto Kamu Rangking 1 di Pencarian Google",
      category: "SEO & Google",
      readTime: "5 Menit Baca",
      author: "Haris Musafa",
      summary: "Ingin usaha toko, klinik, atau restoran kamu muncul paling atas saat orang mencari jasa terdekat? Pelajari teknik SEO lokal sederhana yang terbukti ampuh mendatangkan pembeli nyata.",
      contentJson: JSON.stringify({
        intro: "Pencarian berbasis lokasi memiliki tingkat pembeli yang paling tinggi karena calon pelanggan sudah memegang uang dan siap melakukan transaksi.",
        keyPoints: [
          "Gunakan kata kunci geografis daerah Anda di judul utama website.",
          "Hubungkan alamat Google Maps resmi dengan tombol arah lokasi di website.",
          "Sajikan ulasan kepuasan pembeli nyata tanpa manipulasi rating palsu."
        ],
        body: [
          "Google sangat mengutamakan website yang memiliki struktur schema lokasi yang valid.",
          "Setiap paket pembuatan website di Arjuna Dev sudah dikonfigurasi dengan standar SEO Lokal Google."
        ],
        conclusion: "Tingkatkan kehadiran toko fisik Anda di era digital."
      }),
      imageUrl: "/images/blog/local_seo_strategy.png",
      isPublished: true,
    },
    {
      slug: "fitur-wajib-web-toko-online-2026",
      title: "7 Fitur Wajib Website Toko Online 2026 Yang Bikin Checkout Pembeli 3x Lebih Cepat",
      category: "Web & App",
      readTime: "4 Menit Baca",
      author: "Haris Musafa",
      summary: "Pembayaran QRIS otomatis, cek ongkir otomatis seluruh Indonesia, dan tombol order WhatsApp tanpa ribet adalah kunci meningkatkan omset penjualan toko online Anda.",
      contentJson: JSON.stringify({
        intro: "Proses checkout yang rumit seringkali membuat calon pembeli membatalkan niat belanjanya di menit-menit terakhir.",
        keyPoints: [
          "Integrasi pembayaran QRIS mempermudah pembayaran sekali scan.",
          "Perhitungan ongkir otomatis RajaOngkir API memotong waktu tanya jawab ongkir.",
          "Sistem manajemen stok real-time mencegah pembeli memesan barang habis."
        ],
        body: [
          "Di tahun 2026, kemudahan transaksi adalah raja.",
          "Paket E-Commerce Arjuna Dev dirancang khusus dengan workflow checkout otomatis yang ringkas."
        ],
        conclusion: "Tingkatkan konversi penjualan toko online Anda sekarang."
      }),
      imageUrl: "/images/blog/qris_checkout_features.png",
      isPublished: true,
    }
  ]);
  console.log("✅ Seeded Blog Articles");

  // 6. Testimonials
  await db.delete(schema.testimonials);
  await db.insert(schema.testimonials).values([
    {
      clientName: "Rian Saputra",
      clientRole: "Owner",
      company: "GlowSkin Official Store",
      metric: "+70% Konversi transaksi dari TikTok Ads",
      review: "Toko online skincare kami dibuat sangat kencang. Pembeli dari iklan TikTok & IG Ads bisa checkout dalam hitungan detik tanpa lemot. Omset penjualan produk naik drastis sejak migrasi ke website baru ini.",
      category: "ecommerce",
      avatarUrl: "/avatars/client1.png",
      isActive: true,
    },
    {
      clientName: "Anita Rahma",
      clientRole: "Founder",
      company: "UrbanStyle Fashion Studio",
      metric: "3.500+ pengunjung unik per hari tanpa lag",
      review: "Desain landing page-nya sangat mewah, estetis, dan pengerjaannya presisi. Tombol pemesanan langsung terhubung ke WhatsApp customer service tanpa kendala sama sekali.",
      category: "landing",
      avatarUrl: "/avatars/client2.png",
      isActive: true,
    },
    {
      clientName: "Rafi Kurnia",
      clientRole: "Owner",
      company: "Kopi Nusantara Roastery",
      metric: "1.200+ transaksi pesanan kopi per bulan",
      review: "Mas Haris sangat paham kebutuhan bisnis toko online. Sistem keranjang belanja dan hitung kurir otomatis bekerja sangat akurat. Pelanggan kami memuji tampilan web yang bersih dan kencang.",
      category: "ecommerce",
      avatarUrl: "/avatars/client3.png",
      isActive: true,
    },
    {
      clientName: "Faris Syahputra",
      clientRole: "Owner",
      company: "Gadgetpedia Store",
      metric: "Stok produk promo habis terjual dalam 3 hari",
      review: "Pembuatan landing page promo gadget memuaskan sekali. Desainnya responsif di HP, animasinya halus, dan waktu muat halaman sangat cepat di koneksi seluler.",
      category: "landing",
      avatarUrl: "/avatars/client4.png",
      isActive: true,
    },
    {
      clientName: "Devi Megawati",
      clientRole: "Founder",
      company: "Organic Care Skincare",
      metric: "2x lipat peningkatan pembeli baru di bulan pertama",
      review: "Website buatan Mas Haris sangat profesional. Fitur pembayaran otomatis dan integrasi resi kurir lancar jaya. Sangat membantu menaikkan kepercayaan pembeli baru.",
      category: "ecommerce",
      avatarUrl: "/avatars/client5.png",
      isActive: true,
    }
  ]);
  console.log("✅ Seeded Testimonials");

  // 7. FAQs
  await db.delete(schema.faqs);
  await db.insert(schema.faqs).values([
    {
      faqId: "proses-pengerjaan",
      category: "Waktu & Proses",
      question: "Berapa lama proses pengerjaan pembuatan websitenya?",
      answer: "Estimasi pengerjaan bergantung pada jenis paket yang dipilih:\n• Paket Starter: 2 – 4 Hari Kerja\n• Paket Business: 5 – 7 Hari Kerja\n• Paket Toko Online: 7 – 14 Hari Kerja\n• Custom Web App: 3 – 6 Minggu\nProses pengerjaan dihitung sejak materi (logo, teks, & foto produk) lengkap diserahkan.",
      sortOrder: 1,
      isActive: true,
    },
    {
      faqId: "biaya-domain-hosting",
      category: "Biaya & Paket",
      question: "Apakah saya perlu membayar sewa domain & hosting lagi tahun depan?",
      answer: "Semua paket pembuatan website di Arjuna Dev sudah GRATIS Domain .com dan Hosting Premium untuk 1 tahun pertama. Untuk perpanjangan tahun kedua dan seterusnya, biayanya sangat terjangkau (transparan sesuai harga sewa domain & hosting resmi tanpa komisi tersembunyi).",
      sortOrder: 2,
      isActive: true,
    },
    {
      faqId: "edit-sendiri-cms",
      category: "Pengelolaan",
      question: "Saya tidak paham coding teknis, apakah websitenya bisa saya edit sendiri?",
      answer: "Tentu saja! Pada Paket Business dan Toko Online, Anda akan mendapatkan akses ke Admin Panel (CMS) yang sangat mudah digunakan seperti mengetik postingan sosial media di HP. Anda bisa menambah produk, mengubah harga, dan menulis artikel kapan saja tanpa bantuan programmer.",
      sortOrder: 3,
      isActive: true,
    },
    {
      faqId: "garansi-bug-support",
      category: "Garansi & Support",
      question: "Bagaimana sistem garansi dan pemeliharaannya setelah website selesai?",
      answer: "Setiap pembuatan website mendapatkan garansi pemeliharaan bug 30 hingga 90 hari penuh. Jika terdapat kendala eror atau kesalahan teknis, tim kami akan memperbaikinya secara GRATIS tanpa biaya tambahan. Anda juga bisa langsung chat kami via WhatsApp.",
      sortOrder: 4,
      isActive: true,
    },
    {
      faqId: "muncul-di-google-seo",
      category: "SEO & Google",
      question: "Apakah website saya sudah bisa langsung ditemukan di Google?",
      answer: "Ya! Setiap paket pembuatan website di Arjuna Dev sudah dilengkapi optimasi struktur SEO (Meta Title, Meta Description, OpenGraph) serta pendaftaran resmi ke Google Search Console agar website Anda cepat di-index dan dapat ditemukan calon pembeli di Google.",
      sortOrder: 5,
      isActive: true,
    },
    {
      faqId: "alur-pembayaran",
      category: "Pembayaran",
      question: "Bagaimana alur pembayaran dan pemesanannya?",
      answer: "Sistem pembayaran kami sangat aman dan fleksibel:\n1. Pembayaran DP (Down Payment) sebesar 50% di awal proyek.\n2. Proses pembuatan & preview hasil website oleh Anda.\n3. Pelunasan sisa 50% setelah website dites, disetujui, dan siap diluncurkan secara resmi.",
      sortOrder: 6,
      isActive: true,
    },
    {
      faqId: "materi-belum-siap",
      category: "Waktu & Proses",
      question: "Bagaimana jika saya belum memiliki materi foto atau teks untuk website?",
      answer: "Jangan khawatir! Tim Arjuna Dev siap membantu pembuatan draf copywriting naskah penjualan dan menyediakan foto ilustrasi stok berkualitas tinggi secara GRATIS untuk bisnis Anda.",
      sortOrder: 7,
      isActive: true,
    }
  ]);
  console.log("✅ Seeded FAQs");

  console.log("🎉 All 5 Admin Modules & Database Tables Seeded Perfectly with Authentic Frontend Data!");
}

main().catch((err) => {
  console.error("❌ Error Seeding Neon DB:", err);
  process.exit(1);
});
