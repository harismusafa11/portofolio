# 🚀 ARJUNA DEV 2.0 — Website & Software Studio

![Next.js](https://img.shields.io/badge/Next.js-16.3.8-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19.3.0-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-7.0.2-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3.15.0-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![Turbopack](https://img.shields.io/badge/Turbopack-Enabled-blueviolet?style=for-the-badge)

Website resmi dan platform software studio untuk **ARJUNA DEV** (dikembangkan oleh **Haris Musafa**). Dibangun ulang secara masif dari fondasi website statis versi lama (v1.0) menjadi arsitektur modern berbasis **Next.js 16 (App Router)**, **React 19**, **TypeScript**, dan **GSAP Animations** dengan gaya **Modern Cyber Glassmorphism Dark Mode**.

---

## ⚡ Ringkasan Transformasi Besar-besaran (v1.0 ➔ v2.0)

Pembaruan dari website lama ke versi 2.0 bukan sekadar pergantian tampilan, melainkan perombakan arsitektur dan sistem secara menyeluruh:

| Aspek | Web Lama (v1.0 Legacy) | Web Baru (v2.0 Modern) |
|---|---|---|
| **Fondasi & Framework** | HTML5, CSS3, Vanilla JavaScript statis | **Next.js 16.3 (Turbopack) + React 19 + TypeScript** |
| **Arsitektur Halaman** | Single Page statis (`index.html`) | **Next.js App Router Multi-Page** (`/`, `/layanan`, `/portofolio`, `/tentang`, `/kontak`, `/blog`) |
| **Blog & CMS** | Belum tersedia | **Dynamic SEO Blog** (`/blog` & `/blog/[slug]`) dengan 10+ artikel siap baca |
| **Kalkulator & Order** | Tabel harga statis | **Interactive Order Wizard** dengan estimasi biaya dan fitur kustom instan |
| **Komponen Tech Stack** | Ikon statis | **Interactive Tech Stack Medallions** interaktif dengan modal deskripsi dan filter kategori |
| **SEO & Indexing** | Meta tag HTML standar | **Enterprise SEO Suite**: Dynamic `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, OpenGraph, JSON-LD Structured Data, serta **Instant IndexNow API** |
| **Performa & Build** | Manual load | **Turbopack Compiler**, SSG prerendering (24 halaman statis teroptimasi penuh), zero layout shift |
| **Interaktivitas UI** | Manipulasi DOM langsung | **React State Management + GSAP Animations** responsif di seluruh breakpoint |

---

## 🌟 Fitur-Fitur Utama Web Baru (v2.0)

### 1. 🧭 Multi-Page Navigation (App Router)
- **Beranda (`/`)**: Hero section dengan efek parallax cyberpunk orbit, counter statistik live, showcase layanan, cuplikan portofolio unggulan, alur kerja interaktif, review klien, dan FAQ accordion.
- **Layanan & Order Wizard (`/layanan`)**: Halaman detail paket pembuatan website, add-ons kustom, garansi 90 hari, serta **Interactive Order Wizard** untuk menghitung estimasi biaya proyek secara langsung.
- **Portofolio Lengkap (`/portofolio`)**: Filter multi-kategori (Semua, Web Bisnis, E-Commerce, Landing Page, Sistem Kustom) dan modal interaktif detail proyek.
- **Tentang Haris Musafa (`/tentang`)**: Profil lengkap pengembang, filosofi kode, latar belakang industri, dan indikator penguasaan teknologi.
- **Kontak & Konsultasi (`/kontak`)**: Formulir terverifikasi dengan opsi auto-generate pesan WhatsApp instan, peta lokasi, dan kanal komunikasi resmi.
- **Dynamic Blog Engine (`/blog` & `/blog/[slug]`)**: Artikel seputar panduan pembuatan website, SEO lokal, konversi bisnis, dan perbandingan teknologi dengan pembacaan terukur (*reading time*) dan rekomendasi artikel terkait.

### 2. 🎨 Desain Cyber Glassmorphism & GSAP Animation
- Dark mode bernuansa futuristik dengan ambient glow (`#165DFF`, `#00D2FF`, `#8B5CF6`).
- Efek *frosted glass* dengan `backdrop-filter: blur(16px)` pada navbar dan kartu komponen.
- Animasi GSAP halus dengan stagger effect, reveal animation, dan magnetic interactive widgets.

### 3. 🔍 Enterprise SEO & Web Standards
- **Dynamic Sitemap**: Dihasilkan otomatis melalui `src/app/sitemap.ts` mencakup semua halaman statis dan rute dinamis blog.
- **Robots.txt Engine**: Diatur melalui `src/app/robots.ts` dengan izin perayap modern.
- **PWA Ready**: Dilengkapi `manifest.ts` dan icon beresolusi tinggi untuk instalasi web app.
- **Bing & Yandex IndexNow**: API endpoint `/api/indexnow` untuk pemicu pengindeksan instan ke mesin pencari.
- **JSON-LD Structured Data**: Skema terstruktur untuk `WebSite`, `Organization`, dan `BlogPosting` guna memaksimalkan rich snippets Google Search.

---

## 📂 Struktur Direktori Proyek

```
arjuna-dev-2.0/
├── public/                 # Aset publik statis (gambar, favicon, manifest, verification)
│   └── assets/             # Aset gambar proyek, klien, dan blog
├── src/
│   ├── app/                # Next.js App Router (Layout & Pages)
│   │   ├── api/            # API Route Handlers (misal: /api/indexnow)
│   │   ├── blog/           # Halaman Blog Index & Dynamic Route [slug]
│   │   ├── kontak/         # Halaman Kontak Resmi & Formulir
│   │   ├── layanan/        # Halaman Katalog Layanan & Order Wizard
│   │   ├── portofolio/     # Halaman Galeri Portofolio Lengkap
│   │   ├── tentang/        # Halaman Profil Pengembang & Filosofi
│   │   ├── favicon.ico
│   │   ├── globals.css     # CSS Global & Styling Tema Glassmorphism
│   │   ├── layout.tsx      # Root Layout dengan JSON-LD & SEO Metadata
│   │   ├── manifest.ts     # PWA Web Manifest Generator
│   │   ├── page.tsx        # Homepage Component
│   │   ├── robots.ts       # Robots.txt Generator
│   │   └── sitemap.ts      # Dynamic Sitemap Generator
│   ├── components/         # Komponen React Modular & Interaktif
│   │   ├── About.tsx
│   │   ├── BlogHero.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Pricing.tsx
│   │   ├── ProjectModal.tsx
│   │   ├── ServicesShowcase.tsx
│   │   ├── Stats.tsx
│   │   ├── TechStackInteractive.tsx
│   │   ├── Toast.tsx
│   │   ├── WhatsAppButton.tsx
│   │   └── Workflow.tsx
│   └── data/               # Data Layer Terstruktur
│       ├── blogs.ts        # Database artikel blog lengkap dengan metadata & konten
│       └── projects.ts     # Database proyek portofolio, teknologi, & mockup
├── index.html              # Arsip Web Lama v1.0 (Legacy Static HTML)
├── style.css               # Arsip Web Lama v1.0 (Legacy CSS)
├── script.js               # Arsip Web Lama v1.0 (Legacy Script)
├── next.config.mjs         # Konfigurasi Next.js & Redirects
├── package.json            # Daftar dependensi & scripts proyek
├── tsconfig.json           # Konfigurasi TypeScript
└── README.md               # Dokumentasi lengkap proyek
```

---

## 🛠 Panduan Instalasi & Menjalankan Proyek

Pastikan Anda telah menginstal **Node.js** (versi 18.18+ disarankan):

### 1. Kloning Repositori
```bash
git clone https://github.com/harismusafa11/arjuna-dev-2.0.git
cd "arjuna-dev-2.0"
```

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Menjalankan Server Pengembangan (Dev Mode)
```bash
npm run dev
```
Buka browser dan akses [http://localhost:3000](http://localhost:3000).

### 4. Melakukan Build untuk Produksi
```bash
npm run build
```
Next.js akan melakukan kompilasi dengan Turbopack dan mengenerate seluruh rute statis (SSG).

### 5. Menjalankan Server Produksi
```bash
npm run start
```

---

## 🌐 Informasi Pengembang

- **Developer**: Haris Musafa (Arjuna Dev)
- **Website**: [arjunadev.com](https://arjunadev.com)
- **WhatsApp**: [+62 857-3309-7867](https://wa.me/6285733097867)
- **Instagram**: [@haris_musafa_](https://instagram.com/haris_musafa_)
- **Email**: harismservis@gmail.com

---

## 📄 Lisensi
Hak cipta dilindungi undang-undang &copy; 2026 **ARJUNA DEV**. Dibuat dan dirancang oleh Haris Musafa.
