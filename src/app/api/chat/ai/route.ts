import { NextResponse } from "next/server";

// Dynamic Environment Variables & Defaults
const BANK_NAME = process.env.NEXT_PUBLIC_BANK_NAME || "Bank Jago";
const BANK_ACCOUNT_NUMBER = process.env.NEXT_PUBLIC_BANK_ACCOUNT_NUMBER || "103965597312";
const BANK_ACCOUNT_HOLDER = process.env.NEXT_PUBLIC_BANK_ACCOUNT_HOLDER || "Haris Musafa";
const WHATSAPP_NUMBER = "085693366142";
const WHATSAPP_LINK = "https://wa.me/6285693366142";
const INSTAGRAM_HANDLE = "@haris_musafa_";
const INSTAGRAM_LINK = "https://instagram.com/haris_musafa_";
const OFFICIAL_EMAIL = "arjunawebdev@gmail.com";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userMessage, conversationHistory } = body;

    if (!userMessage || !userMessage.trim()) {
      return NextResponse.json({ error: "Pesan tidak boleh kosong" }, { status: 400 });
    }

    const trimmedMsg = userMessage.trim();
    const lowerMsg = trimmedMsg.toLowerCase();
    const apiKey = process.env.GEMINI_API_KEY || "";

    // =========================================================================
    // 1. GEMINI AI DENGAN MEMORI RIWAYAT LENGKAP & KNOWLEDGE BASE TERAMAT KOMPLEKS
    // =========================================================================
    if (apiKey) {
      try {
        const systemInstructionText = `
Anda adalah "Arjuna AI", Asisten Konsultan Utama & CS Senior dari Arjuna Dev Studio.
Founder & Lead Engineer: Haris Musafa (Full-Stack & Mobile Application Developer).

PRINSIP UTAMA MEMORI & RESPONS:
1. INGAT SELURUH RIWAYAT PERCAKAPAN DENGAN PENGGUNA. Jika pengguna sebelumnya menyebutkan nama mereka, jenis bisnis mereka, paket yang mereka minati, atau detail khusus, INGAT DAN GUNAKAN INFORMASI TERSEBUT secara kontinyu.
2. JAWAB PERTANYAAN PENGGUNA SECARA AKURAT, LANGSUNG, SPESIFIK, DAN PRESISI sesuai konteks.
3. FORMAT BALASAN: Gunakan Bahasa Indonesia yang sangat sopan, profesional, lugas, ramah, dan terstruktur rapi (menggunakan bold & poin jika perlu).
4. DILARANG KERAS menggunakan emoji bintang atau rating bintang (seperti ★, ⭐, ✨). Gunakan metrik bersih seperti "100% Delivery Score", "Lighthouse 100/100", atau "99.9% Server Uptime".

KNOWLEDGE BASE EKSTRA KOMPREHENSIF (ARJUNA DEV STUDIO):

1. BRAND & IDENTITAS RESMI:
   - Nama Studio: Arjuna Dev Studio
   - Founder & Lead Developer: Haris Musafa (Spesialis Next.js, React, Node.js, PostgreSQL, Flutter).
   - WhatsApp Official: ${WHATSAPP_NUMBER} (${WHATSAPP_LINK})
   - Instagram Official: ${INSTAGRAM_HANDLE} (${INSTAGRAM_LINK})
   - Email Official: ${OFFICIAL_EMAIL}
   - Jam Operasional: Live Chat Admin Mas Haris (Senin–Sabtu 08.00–22.00 WIB). Arjuna AI (24/7 Non-stop).
   - Lokasi & Layanan: Remote & Online Consultation untuk seluruh Indonesia dan Mancanegara.

2. KATALOG LAYANAN & JENIS WEBSITE/APLIKASI YANG BISA DIBUAT:
   a. Landing Page & Promo Produk (Paket Basic - Rp 500rb | DP Rp 250rb):
      - 1 Halaman Utama Landing Page dengan section bebas.
      - Desain modern, ultra-responsive di mobile & desktop.
      - Free Hosting (tanpa iuran bulanan), Tombol WA Direct.
      - Garansi 90 Hari Bug-Free. Estimasi: 3 - 5 Hari Kerja.
      - Cocok untuk: Promo produk tunggal, validasi bisnis baru, event, personal brand.

   b. Company Profile & Web Profil (Paket Advanced - Rp 900rb | DP Rp 450rb):
      - Up to 5 Halaman Utama (Home, About, Services, Gallery, Contact).
      - CMS / Admin Panel untuk mengedit naskah & foto sendiri tanpa koding.
      - SEO On-Page Optimization + Google Search Console Indexing.
      - Free Hosting, Garansi 90 Hari Bug-Free. Estimasi: 5 - 7 Hari Kerja.
      - Cocok untuk: Profil perusahaan, agensi, portofolio profesional, sekolah/yayasan.

   c. Web Bisnis & Katalog Dinamis (Paket Business - Rp 1.500.000 | DP Rp 750rb) [PALING POPULER / BEST VALUE]:
      - Up to 5-10 Halaman Utama + **GRATIS DOMAIN .COM 1 TAHUN**.
      - Katalog Produk Dinamis dengan integrasi Google Sheets / Database & Filter Kategori.
      - Dashboard Admin Panel CMS Lengkap + Complete SEO Optimization & Google Indexing.
      - Free Hosting, Garansi 90 Hari Bug-Free. Estimasi: 7 - 10 Hari Kerja.
      - Cocok untuk: Bisnis berkembang, katalog barang/jasa, showroom online, distributor.

   d. Full-Stack E-Commerce System (Paket E-Commerce - Rp 5.000.000 | DP Rp 2.5jt):
      - Web Toko Online Full-Stack + Sistem Login/Register Member + Profil Pelanggan.
      - Keranjang Belanja & Checkout + Automatic Payment Gateway (QRIS Instant & Virtual Account All Bank).
      - Dashboard Admin Manajemen Produk, Stok, Status Pesanan, & Laporan Penjualan.
      - Free VPS Server 1 Bulan + Server Config + SSL Keamanan + Garansi 90 Hari. Estimasi: 14 - 21 Hari Kerja.
      - Cocok untuk: Brand fashion, retail modern, toko online berskala sedang-besar.

   e. Custom Web Application / SaaS & Mobile App (Mulai Rp 3.000.000+):
      - Sistem Web Custom (SaaS, Multi-role Admin, Internal Dashboard, API Integration).
      - Mobile Application Cross-Platform (iOS & Android) menggunakan Flutter & React Native.
      - Push Notifications, Firebase Auth, Geolocation, In-App Payment. Estimasi: 3 - 6 Minggu.

3. KEBUTUHAN/SYARAT & BANTUAN KONTEN:
   - Dokumen disiapin klien: Nama bisnis/domain, logo, teks deskripsi, foto produk/tim, no WA & sosmed.
   - Belum punya materi?: Arjuna Dev menyediakan draf copywriting naskah promosi gratis, draf penataan halaman, dan stok foto lisensi komersial resolusi tinggi gratis.

4. ALUR TUTORIAL CARA ORDER (6 LANGKAH):
   1. Form Order Wizard: Buka aplikasi Order Wizard di web / chat WA Admin untuk tentukan paket & isi brief.
   2. Pembayaran DP 50%: Transfer DP 50% via Bank Jago (${BANK_ACCOUNT_NUMBER} a.n ${BANK_ACCOUNT_HOLDER}) atau QRIS/VA Otomatis.
   3. Pengerjaan & Live Staging: Tim memproses & memberikan link Staging Preview + akses Project Tracker App.
   4. Review & Revisi: Klien meninjau hasil tampilan & mengajukan revisi penyesuaian hingga puas.
   5. Pelunasan 50% & Handover: Pelunasan sisa 50%, serah terima akses CMS Admin, peluncuran domain .COM live, & source code.
   6. Garansi 90 Hari Bug-Free: Garansi resmi 3 bulan otomatis aktif.

5. METODE PEMBAYARAN & REKENING RESMI:
   - Skema Pembayaran: DP 50% di awal proyek & Pelunasan 50% setelah website disetujui.
   - Bank Manual: Bank Jago (Nomor: ${BANK_ACCOUNT_NUMBER} a.n ${BANK_ACCOUNT_HOLDER}). (VA BCA/Mandiri/BRI tersedia via konfirmasi Admin).
   - Payment Gateway Otomatis: QRIS Instant (GoPay, OVO, Dana, ShopeePay, LinkAja) & Virtual Account All Bank.

6. GARANSI & KEPEMILIKAN WEBSITE:
   - Hak Milik: 100% Hak Milik Klien. Diberikan akses Admin CMS, domain/hosting, & repository Source Code.
   - Garansi 90 Hari Bug-Free: Perbaikan gratis eror teknis / bug selama 3 bulan.
   - Garansi Tepat Waktu: Kompensasi diskon/cashback 5% per hari jika pengerjaan terlambat melampaui deadline tanpa konfirmasi.
   - Policy Revisi: Unlimited revisi minor dalam cakupan brief kesepakatan awal.
   - Free Server Hosting: Tanpa iuran sewa server bulanan (menggunakan Vercel/Cloudflare Edge).

7. INTEGRASI FITUR TAMBAHAN (ADD-ONS):
   - Integrasi WhatsApp Gateway & Auto Responder.
   - Integrasi Payment Gateway (QRIS, VA, E-Wallet, Kartu Kredit).
   - Integrasi Cek Ongkir Otomatis (RajaOngkir API: JNE, TIKI, POS, J&T, SiCepat).
   - Multi-Bahasa / Multilingual (Bahasa Indonesia & English).
   - Analytics & Pixel (Google Analytics 4, Facebook Pixel, TikTok Pixel).

Gunakan seluruh riwayat obrolan di bawah ini untuk memahami konteks pengguna secara utuh:
`;

        const contentsPayload = [];
        // MENGIRIM HINGGA 30 RIWAYAT CHAT TERAKHIR UNTUK MEMORI KONTEKSTUAL YANG SANGAT KUAT
        if (Array.isArray(conversationHistory)) {
          for (const msg of conversationHistory.slice(-30)) {
            contentsPayload.push({
              role: msg.role === "assistant" ? "model" : "user",
              parts: [{ text: msg.text }],
            });
          }
        }
        contentsPayload.push({
          role: "user",
          parts: [{ text: trimmedMsg }],
        });

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: systemInstructionText }] },
            contents: contentsPayload,
            generationConfig: { temperature: 0.3, maxOutputTokens: 1200 },
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (aiText && aiText.trim()) {
            return NextResponse.json({ success: true, reply: aiText.trim() });
          }
        } else {
          const errBody = await response.text();
          console.error("[Gemini API Error] HTTP Status:", response.status, errBody);
        }
      } catch (geminiErr) {
        console.error("[Gemini API Error Exception]:", geminiErr);
      }
    }

    // =========================================================================
    // 2. OFFLINE SMART INTENT ENGINE (SANGAT LENGKAP LOKAL)
    // =========================================================================
    let matchedReply = "";

    // 1. Jenis Website / Layanan ("bisa bikin website apa saja?", "bisa buat apa aja", "layanan", dll)
    if (
      lowerMsg.includes("bisa bikin website apa") ||
      lowerMsg.includes("bisa buat website apa") ||
      lowerMsg.includes("bisa bikin apa") ||
      lowerMsg.includes("bisa buat apa") ||
      lowerMsg.includes("jenis website") ||
      lowerMsg.includes("layanan apa") ||
      lowerMsg.includes("buat web apa") ||
      lowerMsg.includes("bisa bikin web apa") ||
      lowerMsg.includes("produk apa") ||
      lowerMsg.includes("terima pembuatan apa")
    ) {
      matchedReply = `Arjuna Dev Studio melayani berbagai jenis pembuatan **Website & Aplikasi Mobile**:

1. **Landing Page & Sales Page**
   Cocok untuk promosi produk tunggal, validasi bisnis, dan UMKM. (Paket Basic Rp 500rb)

2. **Company Profile & Portofolio**
   Website profil perusahaan, agensi, atau organisasi dengan tampilan profesional & CMS Admin. (Paket Advanced Rp 900rb)

3. **Toko Online & Katalog Produk**
   Toko online dengan katalog dinamis, integrasi WA/Google Sheets, & Gratis Domain .COM. (Paket Business Rp 1.5jt — [PALING POPULER])

4. **Full-Stack E-Commerce System**
   Toko online lengkap dengan sistem member, keranjang checkout, & Payment Gateway otomatis (QRIS & VA). (Paket E-Commerce Rp 5jt)

5. **Custom Web Application & Mobile App (iOS & Android)**
   Sistem web custom (SaaS/Dashboard internal) dan Aplikasi HP berbasis Flutter & React Native. (Mulai Rp 3jt+)

Jenis website apa yang ingin Anda bangun untuk bisnis Anda saat ini?`;
    }

    // 2. Kebutuhan / Materi belum siap ("belum punya materi", "foto belum ada", "teks belum ada", "logo", "syarat")
    else if (
      lowerMsg.includes("belum punya") ||
      lowerMsg.includes("materi") ||
      lowerMsg.includes("syarat") ||
      lowerMsg.includes("persyaratan") ||
      lowerMsg.includes("disiapkan") ||
      lowerMsg.includes("copywriting")
    ) {
      matchedReply = `Syarat & Bantuan Materi Pembuatan Website:

📋 **Dokumen yang Perlu Disiapkan**:
1. Nama Bisnis / Alamat Domain pilihan.
2. Deskripsi singkat bidang usaha & layanan/produk Anda.
3. Nomor WhatsApp & Link Sosial Media.

💡 **Bagaimana Jika Belum Memiliki Teks/Foto/Logo?**
Jangan khawatir! Tim Arjuna Dev menyediakan:
• **Bantuan Copywriting Naskah Gratis**: Draf penataan kalimat jualan yang menjual.
• **Stok Foto Komersial Gratis**: Gambar resolusi tinggi lisensi bebas klaim.
• **Bantuan Pembuatan Logo Dasar**: Logo sederhana rapi untuk identitas website Anda.`;
    }

    // 3. Kepemilikan & Hak Akses ("source code", "hak milik", "akses admin", "cpanel")
    else if (
      lowerMsg.includes("source code") ||
      lowerMsg.includes("hak milik") ||
      lowerMsg.includes("akses admin") ||
      lowerMsg.includes("milik siapa") ||
      lowerMsg.includes("cpanel")
    ) {
      matchedReply = `Hak Kepemilikan & Akses Website:

1. **100% Hak Milik Klien**: Website yang sudah lunas sepenuhnya menjadi milik bisnis Anda.
2. **Akses CMS Admin**: Anda diberikan akun khusus untuk mengedit naskah, foto, & produk sendiri.
3. **Source Code & Repository**: Diberikan akses penuh ke repository code (Next.js / React / Node.js) tanpa ada penguncian sistem.`;
    }

    // 4. Paket & Harga Website
    else if (
      lowerMsg.includes("harga") ||
      lowerMsg.includes("biaya") ||
      lowerMsg.includes("tarif") ||
      lowerMsg.includes("paket") ||
      lowerMsg.includes("pilih mana") ||
      lowerMsg.includes("rekomendasi") ||
      lowerMsg.includes("murah")
    ) {
      matchedReply = `Daftar **Paket & Harga Pembuatan Website** Arjuna Dev Studio:

• **Paket Basic (Rp 500.000 | DP Rp 250.000)**: Landing Page 1 Halaman + Free Hosting. (3-5 Hari)
• **Paket Advanced (Rp 900.000 | DP Rp 450.000)**: Up to 5 Halaman + CMS Admin + SEO. (5-7 Hari)
• **Paket Business (Rp 1.500.000 | DP Rp 750.000)**: Up to 5-10 Halaman + **GRATIS DOMAIN .COM** + Katalog Dinamis + CMS. [PALING POPULER] (7-10 Hari)
• **Paket E-Commerce (Rp 5.000.000 | DP Rp 2.500.000)**: Toko Online Full-Stack + Payment Gateway QRIS/VA + Free VPS. (14-21 Hari)
• **Custom Web / Mobile App**: Mulai Rp 3.000.000+.`;
    }

    // 5. Alur Cara Order
    else if (
      lowerMsg.includes("cara order") ||
      lowerMsg.includes("cara pesan") ||
      lowerMsg.includes("alur") ||
      lowerMsg.includes("langkah") ||
      lowerMsg.includes("tutorial") ||
      lowerMsg.includes("tahapan")
    ) {
      matchedReply = `Tutorial **Cara Memesan Website di Arjuna Dev** (6 Langkah):

1. **Form Order**: Buka aplikasi Order Wizard di web / chat WA Admin.
2. **DP 50%**: Transfer DP 50% via Bank Jago (${BANK_ACCOUNT_NUMBER} a.n ${BANK_ACCOUNT_HOLDER}) atau QRIS/VA.
3. **Pengerjaan**: Tim proses & berikan link Staging Preview.
4. **Review & Revisi**: Peninjauan tampilan & revisi penyesuaian.
5. **Pelunasan 50%**: Serah terima akses CMS Admin & peluncuran domain .COM live.
6. **Garansi 90 Hari**: Garansi Bug-Free otomatis aktif!`;
    }

    // 6. Rekening & Pembayaran
    else if (
      lowerMsg.includes("rekening") ||
      lowerMsg.includes("bank") ||
      lowerMsg.includes("transfer") ||
      lowerMsg.includes("dp") ||
      lowerMsg.includes("qris") ||
      lowerMsg.includes("virtual account") ||
      lowerMsg.includes("va") ||
      lowerMsg.includes("bayar") ||
      lowerMsg.includes("pembayaran")
    ) {
      matchedReply = `Rincian Pembayaran Resmi:
• **Skema**: DP 50% di awal & Pelunasan 50% setelah website disetujui.
• **Transfer Bank**: ${BANK_NAME} **${BANK_ACCOUNT_NUMBER}** a.n **${BANK_ACCOUNT_HOLDER}**.
• **Payment Gateway**: QRIS Instant & Virtual Account BCA, Mandiri, BRI, BNI, Jago.`;
    }

    // 7. Garansi & Pemeliharaan
    else if (
      lowerMsg.includes("garansi") ||
      lowerMsg.includes("bug") ||
      lowerMsg.includes("error") ||
      lowerMsg.includes("maintenance") ||
      lowerMsg.includes("revisi")
    ) {
      matchedReply = `Garansi & Support Resmi:
1. **Garansi 90 Hari Bug-Free**: Perbaikan gratis eror teknis selama 3 bulan.
2. **Garansi Tepat Waktu**: Cashback 5%/hari jika terlambat dari kesepakatan.
3. **Free Server Hosting**: Bebas biaya sewa server bulanan.
4. **Panduan CMS Admin**: Tutorial video pengoperasian mandiri.`;
    }

    // 8. Estimasi Waktu
    else if (
      lowerMsg.includes("lama") ||
      lowerMsg.includes("estimasi") ||
      lowerMsg.includes("durasi") ||
      lowerMsg.includes("waktu") ||
      lowerMsg.includes("berapa hari")
    ) {
      matchedReply = `Estimasi Waktu Pengerjaan:
• **Paket Basic**: 3 – 5 Hari Kerja
• **Paket Advanced**: 5 – 7 Hari Kerja
• **Paket Business**: 7 – 10 Hari Kerja
• **Paket E-Commerce**: 14 – 21 Hari Kerja
• **Mobile App / Custom**: 3 – 6 Minggu`;
    }

    // 9. Kontak Resmi
    else if (
      lowerMsg.includes("kontak") ||
      lowerMsg.includes("wa") ||
      lowerMsg.includes("whatsapp") ||
      lowerMsg.includes("ig") ||
      lowerMsg.includes("instagram") ||
      lowerMsg.includes("email") ||
      lowerMsg.includes("admin") ||
      lowerMsg.includes("haris")
    ) {
      matchedReply = `Kontak Resmi Arjuna Dev Studio:
• **WhatsApp**: ${WHATSAPP_NUMBER} (${WHATSAPP_LINK})
• **Instagram**: ${INSTAGRAM_HANDLE} (${INSTAGRAM_LINK})
• **Email**: ${OFFICIAL_EMAIL}
• **Founder**: Haris Musafa
• **Jam Operasional Admin**: Senin – Sabtu (08.00 – 22.00 WIB).`;
    }

    // Default Fallback
    if (!matchedReply) {
      matchedReply = `Arjuna Dev Studio melayani pembuatan **Website (Landing Page, Company Profile, Toko Online E-Commerce, Custom Web App)** serta **Aplikasi Mobile (iOS & Android)**.

Anda dapat menanyakan hal spesifik seperti:
1. Jenis website apa yang bisa dibuat
2. Rincian harga & fasilitas paket
3. Syarat & bantuan materi copywriting
4. Hak milik source code & CMS Admin
5. Nomor rekening DP 50% & garansi 90 hari bug-free

Ada yang bisa saya bantu untuk bisnis Anda hari ini?`;
    }

    return NextResponse.json({ success: true, reply: matchedReply });
  } catch (err: any) {
    console.error("[AI API Fatal Error]:", err);
    return NextResponse.json({
      success: true,
      reply: `Arjuna Dev Studio melayani pembuatan Website profesional & Aplikasi Mobile. Silakan tanyakan seputar jenis website, daftar harga paket, cara order, nomor rekening, estimasi waktu, maupun garansi 90 hari bug-free.`,
    });
  }
}
