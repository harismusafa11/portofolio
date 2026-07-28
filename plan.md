Berikut adalah **Product Requirement Document (PRD) Versi Lengkap & Detail (Production-Ready)**. Dokumen ini dirancang dengan tingkat spesifikasi teknis dan desain yang komprehensif, siap digunakan sebagai panduan langsung bagi *UI/UX Designer* dan *Frontend Developer* untuk membangun website **Arjuna Dev**.

---

# 📄 PRODUCT REQUIREMENT DOCUMENT (PRD)

**Nama Proyek:** Website Portofolio & Jasa Developer — Arjuna Dev (Windows OS Interactive UI)  
**Pemilik Proyek / Author:** Haris Musafa  
**Versi Dokumen:** 2.0 (Final Complete Edition)  
**Status:** Approved for Development  
**Tanggal:** 24 Juli 2026  

---

## 1. PENDAHULUAN & TUJUAN PROYEK

### 1.1 Visi Proyek
Menciptakan platform portofolio dan pemasaran jasa berbasis web yang unik, interaktif, dan futuristik dengan mengadopsi antarmuka **Sistem Operasi Windows 11 (Desktop Environment)**. Website ini dibuat untuk merepresentasikan keahlian teknik tinggi dari **Haris Musafa (Arjuna Dev)** dalam *Web & Mobile Application Development*.

### 1.2 Indikator Keberhasilan (KPIs / Success Metrics)
1. **Conversion Rate:** Minimal 10-15% pengunjung melakukan klik tombol Kontak (WhatsApp / Instagram).
2. **User Engagement:** Average Session Duration > 2.5 menit (karena interaksi UI Windows yang menarik).
3. **Performance Score:** Google Lighthouse Performance > 90, FCP (First Contentful Paint) < 1.2 detik.
4. **Brand Recall:** Pengunjung mengingat Arjuna Dev sebagai developer dengan website paling unik.

---

## 2. IDENTITAS BRAND & KONFIGURASI KONTAK

| Parameter | Detail Spesifikasi |
| :--- | :--- |
| **Nama Brand** | Arjuna Dev |
| **Pemilik / Founder** | Haris Musafa |
| **Spesialisasi** | Web Development (Landing Page, E-Commerce, Custom Web App) & Mobile App Development (iOS/Android) |
| **Instagram Official** | `@haris_musafa_` (`https://instagram.com/haris_musafa_`) |
| **WhatsApp Business** | `085693366142` (`https://wa.me/6285693366142`) |
| **Tone of Voice** | Profesional, Inovatif, Modern, Technical-savvy, Friendly |

---

## 3. ARSITEKTUR TEKNIS & TECH STACK

### 3.1 Tech Stack Utama
- **Frontend Framework:** Next.js (React 18+ / App Router)
- **Styling Engine:** Tailwind CSS + CSS Modules
- **Animation Engine:** Framer Motion (untuk animasi spring physics, dragging, window transitions)
- **State Management:** Zustand (untuk mengelola state jendela terbuka, active window, z-index, theme)
- **Window Management System:** Custom Component / `react-rnd` (Drag, Drop, Resize)
- **Audio Effects Engine:** Howler.js (untuk sound feedback)
- **Icons:** Lucide React Icons & Windows 11 Fluent Icon Pack
- **Deployment:** Vercel (CI/CD Integration)

### 3.2 Struktur Folder Proyek (Project Architecture)
```text
arjuna-dev-portfolio/
├── public/
│   ├── audio/            # Sound effects (startup.mp3, click.mp3, minimize.mp3)
│   ├── images/           # Wallpapers, Portfolio Screenshots
│   └── icons/            # App Icons (.png/.svg)
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/
│   │   ├── desktop/      # Desktop, Shortcuts, ContextMenu, Wallpaper
│   │   ├── taskbar/      # Taskbar, StartMenu, SystemTray, Clock
│   │   ├── windows/      # WindowContainer, TitleBar, Controls
│   │   └── apps/         # AboutApp, ServicesApp, PortfolioApp, ContactApp, TerminalApp
│   ├── hooks/            # useWindowManager, useSound, useTheme
│   ├── store/            # Zustand store (windowStore.ts, audioStore.ts)
│   └── data/             # services.json, portfolio.json, commands.json
```

---

## 4. SPESIFIKASI FITUR FUNGSIONAL & ELEMEN UI OS

### 4.1 Desktop Environment (Antarmuka Utama)
- **Interactive Wallpapers:** Pengunjung dapat mengganti wallpaper melalui Settings / Context Menu (Pilihan: Windows 11 Bloom Dark, Windows 11 Bloom Light, Windows 11 Flow Minimalist).
- **Desktop Grid Shortcuts:** Ikon desktop yang dapat diklik 2x (Desktop) atau 1x (Mobile) untuk membuka aplikasi:
  1. 👤 `About_Me.exe`
  2. 💼 `Services_&_Pricing.exe`
  3. 📁 `Portfolio_Explorer`
  4. 📞 `Contact_Haris.exe`
  5. 💻 `Terminal_CMD.exe`
  6. ⚙️ `Settings.exe`
- **Marquee Selection (Drag-to-Select):** Pengunjung dapat menyeleksi ikon di desktop menggunakan kursor mouse seperti OS sungguhan.
- **Custom Context Menu (Klik Kanan):**
  - Refresh Desktop
  - Change Wallpaper
  - Open Task Manager (System Status)
  - Direct WA Chat

### 4.2 Taskbar & System Tray
- **Start Button:** Membuka Start Menu dengan efek blur background (*Acrylic*).
- **Pinned & Active Apps:** Menampilkan ikon aplikasi yang sedang berjalan dengan indikator garis aktif di bawahnya.
- **System Tray (Kanan Bawah):**
  - **Clock & Date:** Real-time clock berdasarkan timezone pengunjung.
  - **Volume/Audio Toggle:** On/Off efek suara UI.
  - **Network Status:** Indikator "Online / Connected to Arjuna Dev Network".
  - **Quick WA Access Button:** Ikon WA yang berkedip lembut (*glowing pulse*).

### 4.3 Windows Management System (Mekanisme Jendela)
- **Multi-Window System:** Dapat membuka beberapa jendela sekaligus.
- **Z-Index Management:** Jendela yang diklik terakhir akan berpindah ke tumpukan paling depan (*Focus Mode*).
- **Window Controls (Kanan Atas Titlebar):**
  - **Minimize (-):** Memilih jendela masuk ke Taskbar dengan animasi meluncur.
  - **Maximize / Restore (🗖):** Mengubah ukuran jendela jadi Fullscreen atau Kembali ke Ukuran Semula.
  - **Close (X):** Menutup jendela dan menghapus state dari memory.
- **Draggable & Resizable:** Jendela dapat digeser ke seluruh area layar dan diubah ukurannya dari setiap sudut.

---

## 5. DETAIL APLIKASI & MATRIKS JASA (SERVICES)

Aplikasi **`Services_&_Pricing.exe`** menampilkan 3 paket Web Development dan 1 paket Mobile App.

```
+-----------------------------------------------------------------------------------------+
| [X] Services & Pricing - Arjuna Dev                                           [_][🗖][X] |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|  [ 🚀 Starter / Landing ]     [ 💼 Business & E-Com ]     [ ⚡ Custom Web App / SaaS ]  |
|  ------------------------     -----------------------     ---------------------------   |
|  - 1 Halaman Smooth Scroll    - Up to 10 Halaman          - Unlimited Custom Pages      |
|  - Responsive Mobile          - CMS / Admin Panel         - Fullstack (Next.js/Node)    |
|  - Form Contact WA            - Payment Gateway           - Database & Auth System      |
|  - Fast Loading (SEO)         - Katalog Produk / Blog     - Dashboard Interactive API   |
|  - Gratis Domain & Hosting    - Integrasi Shipping API    - Scaleable Architecture      |
|                                                                                         |
|  [ CTA: Pesan Paket 1 ]       [ CTA: Pesan Paket 2 ]      [ CTA: Pesan Paket 3 ]        |
|                                                                                         |
| --------------------------------------------------------------------------------------- |
|  [ 📱 Mobile App Development (iOS & Android) ]                                         |
|  - Cross-Platform Flutter/React Native | Firebase Backend | Push Notification             |
|  [ CTA: Konsultasi App Mobile ]                                                         |
+-----------------------------------------------------------------------------------------+
```

### Matriks Detail Paket Jasa Web & App:

| Parameter | Paket 1: Starter Page | Paket 2: Business & E-Commerce | Paket 3: Custom Web App / SaaS | Mobile App (iOS/Android) |
| :--- | :--- | :--- | :--- | :--- |
| **Target User** | UMKM, Personal Brand, Event | Perusahaan, Toko Online | Startup, Sistem Internal, SaaS | Bisnis yang butuh App di HP |
| **Estimasi Waktu**| 3 - 5 Hari Kerja | 1 - 2 Minggu | 3 - 4 Minggu (Custom) | 3 - 6 Minggu |
| **Tech Stack** | React, Tailwind, Next.js | Next.js, Laravel, Midtrans | Next.js, Node.js, PostgreSQL/Supabase | Flutter / React Native, Firebase |
| **Output** | Landing Page Kencang + SEO | Web Kompleks + Dashboard Admin | App Web Sistem Kompleks + API | APK Android + iOS Build |
| **URL Link WA** | Auto Text Paket Starter | Auto Text Paket Business | Auto Text Paket Custom Web | Auto Text Mobile App |

---

## 6. DETAIL PORTOFOLIO (FILE EXPLORER)

Aplikasi **`Portfolio_Explorer`** menggunakan tata letak mirip *Windows File Explorer* dengan sidebar navigasi kategori.

### Kategori Sidebar:
- 📁 `All Projects`
- 📁 `Web Applications`
- 📁 `Mobile Apps`
- 📁 `SaaS & Dashboards`

### Data Proyek Portofolio (Showcase):

#### Proyek 1: Arjuna Store (E-Commerce Platform)
- **Tag:** Web & Mobile App
- **Deskripsi:** Ekosistem toko online fashion terintegrasi Web dan Aplikasi Android. Memiliki fitur payment gateway otomatis, cek ongkir instan, dan push notification promo.
- **Tech Stack:** Next.js, Tailwind, Flutter, Midtrans API, Node.js.
- **Feature Highlights:** Checkout 1-Click, Live Order Tracking, Dark Mode.

#### Proyek 2: SaaS Workspace Analytics
- **Tag:** Custom Web App / SaaS
- **Deskripsi:** Dashboard analitik finansial dan manajemen tim untuk bisnis SaaS skala menengah.
- **Tech Stack:** React, TypeScript, Chart.js, Express.js, PostgreSQL.
- **Feature Highlights:** Real-time Data Visualization, Export PDF/Excel, Role-based Auth.

#### Proyek 3: Corporate Profile & Booking System
- **Tag:** Web Development
- **Deskripsi:** Website profil perusahaan otomotif profesional dilengkapi sistem reservasi jadwal servis kendaraan secara online.
- **Tech Stack:** Next.js, Framer Motion, Supabase.
- **Feature Highlights:** Interactive Calendar Booking, Auto WhatsApp Reminder.

#### Proyek 4: Klinikku Mobile (Health App)
- **Tag:** Mobile Application
- **Deskripsi:** Aplikasi pendaftaran antrean klinik, konsultasi dokter online, dan pencatatan rekam medis digital.
- **Tech Stack:** Flutter, Firebase Auth, Cloud Firestore.
- **Feature Highlights:** Real-time Queue Tracking, In-app Chat.

---

## 7. SPESIFIKASI SPESIAL: TERMINAL / CMD APP

Aplikasi **`Terminal_CMD.exe`** ditujukan untuk pengunjung teknis (*developer/tech recruiter*) yang ingin berinteraksi via perintah teks.

### Daftar Perintah Terminal:
- `help` : Menampilkan daftar perintah yang tersedia.
- `about` : Menampilkan bio singkat Haris Musafa.
- `skills` : Menampilkan daftar keahlian (*JavaScript, TypeScript, React, Next.js, Flutter, Node.js, Tailwind, PostgreSQL*).
- `services` : Menampilkan ringkasan 3 paket web dan aplikasi mobile.
- `portfolio` : Menampilkan daftar proyek beserta link-nya.
- `contact` : Menampilkan info kontak WA (`085693366142`) & IG (`@haris_musafa_`).
- `clear` : Membersihkan layar terminal.
- `matrix` : *Easter egg* yang menjalankan animasi hujan kode hijau ala film The Matrix.

---

## 8. SPESIFIKASI ANIMASI & DESIGN SYSTEM

### 8.1 Visual Theme (Authentic Windows 11 Fluent OS Design — Anti-AI Slop)
Desain mengacu 100% pada panduan resmi Windows 11 Fluent Design System:
- **Clean OS Aesthetics:** Menghindari elemen "AI Slop" (seperti gradient berlebihan, ikon bintang/sparkle tanpa fungsi, atau efek neon glowing futuristik palsu).
- **Materials (Mica & Acrylic):** Menggunakan efek semi-transparan presisi dengan blur halus dan border 1px subtle.
- **Window Controls Authentic:** Tombol Minimize, Maximize/Restore, dan Close (merah `#e81123` saat hover) persis Windows 11.
- **Typography:** Segoe UI / Segoe Variable / system-ui dengan hierarki font khas Windows.

```css
/* Authentic Windows 11 Fluent Window Styling */
.windows-11-window {
  background: rgba(32, 32, 32, 0.85);
  backdrop-filter: blur(20px) saturate(125%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.36);
  border-radius: 8px;
}
```

### 8.2 Motion Physics (Framer Motion Config)
- **Window Open Variant:**
  ```javascript
  initial={{ scale: 0.85, opacity: 0, y: 20 }}
  animate={{ scale: 1, opacity: 1, y: 0 }}
  exit={{ scale: 0.85, opacity: 0, y: 20 }}
  transition={{ type: "spring", stiffness: 350, damping: 25 }}
  ```
- **Taskbar Hover Animation:** Scaling ikon `scale: 1.2` saat di-hover dengan transisi linier yang responsif.
- **Start Menu Motion:** Slide Up dari koordinat `y: 100%` ke `y: 0%` dengan durasi 0.25s ease-out.

### 8.3 Sound Effects Matrix
- **System Startup:** Di-play sekali saat website selesai loading (*Volume 30%*).
- **Window Open / Click:** Sound *pop* halus saat mengklik ikon atau membuka jendela.
- **Error / Warning:** Sound chime khas Windows jika membuka aplikasi yang tidak ada.
*(Dapat dimatikan/diaktifkan kapan saja dari System Tray)*.

### 8.4 Mobile Responsiveness Strategy (Windows Mobile Tiles / Drawer)
Untuk memastikan UX tetap sempurna di layar HP (layar < 768px):
1. **Desktop Mode Off:** Mode drag window bebas dinonaktifkan di mobile.
2. **Full-Screen Modals:** Jendela yang dibuka otomatis menjadi *Full-Screen Card Modal* dengan tombol *Back / Close* besar di bagian atas.
3. **Bottom Navigation Bar:** Taskbar berpindah fungsi menjadi Bottom Navigation Bar ala iOS/Android untuk akses cepat ke Start, Services, Portfolio, dan Contact.

---

## 9. NON-FUNCTIONAL REQUIREMENTS & SEO

### 9.1 Search Engine Optimization (SEO) Metadata
- **Title Tag:** `Arjuna Dev | Jasa Pembuatan Website & Aplikasi Mobile — Haris Musafa`
- **Meta Description:** `Jasa Web Developer & Mobile App profesional oleh Haris Musafa (Arjuna Dev). Melayani pembuatan Landing Page, E-Commerce, Custom Web App & Aplikasi Android/iOS.`
- **Open Graph (OG) Image:** Banner preview berukuran 1200x630px dengan tampilan desktop Windows Arjuna Dev.

### 9.2 Performa & Keamanan
- **Lazy Loading Components:** Komponen jendela hanya di-render secara *dynamic import* saat jendela dibuka pertama kali untuk menghemat memori.
- **Sanitized Terminal Inputs:** Input pada Terminal CMD disaring untuk mencegah XSS.
- **Direct WA Integration:** Menggunakan format URL standar `https://wa.me/6285693366142?text=...` tanpa perantara backend yang memperlambat proses.

---

## 10. DRAFT DATA JSON (DATA READY-TO-USE)

Berikut adalah struktur data JSON yang dapat langsung dipakai developer untuk menginstalasi aplikasi:

### `data/services.json`
```json
[
  {
    "id": "starter",
    "title": "Paket Starter / Landing Page",
    "target": "UMKM & Personal Brand",
    "features": [
      "1 Halaman Smooth Scroll",
      "Responsive Mobile & Desktop",
      "Form Contact / Direct WA",
      "SEO & Speed Optimization",
      "Gratis Domain & Hosting 1 Thn"
    ],
    "waMessage": "Halo%20Haris%20Musafa%20(Arjuna%20Dev),%20saya%20tertarik%20dengan%20Paket%20Web%20Starter."
  },
  {
    "id": "business",
    "title": "Paket Business & E-Commerce",
    "target": "Perusahaan & Toko Online",
    "features": [
      "Up to 10 Halaman Custom",
      "Content Management System (CMS)",
      "Payment Gateway Integration",
      "Katalog Produk & Sistem Filter",
      "Integrasi Cek Ongkir Automatic"
    ],
    "waMessage": "Halo%20Haris%20Musafa%20(Arjuna%20Dev),%20saya%20tertarik%20dengan%20Paket%20Web%20Business."
  },
  {
    "id": "custom-web",
    "title": "Paket Custom Web App / SaaS",
    "target": "Startup & Portal Internal",
    "features": [
      "Unlimited Custom Pages",
      "Fullstack React / Next.js / Node.js",
      "User Authentication & Roles",
      "Custom Database & REST/GraphQL API",
      "Interactive Admin Dashboard"
    ],
    "waMessage": "Halo%20Haris%20Musafa%20(Arjuna%20Dev),%20saya%20ingin%20konsultasi%20Paket%20Custom%20Web%20App."
  },
  {
    "id": "mobile-app",
    "title": "Mobile App Development",
    "target": "Aplikasi Android & iOS",
    "features": [
      "Cross-Platform Flutter / React Native",
      "Backend Integration & Database",
      "Push Notification & GPS System",
      "UI/UX Design App Modern",
      "Bantuan Upload to Play Store/App Store"
    ],
    "waMessage": "Halo%20Haris%20Musafa%20(Arjuna%20Dev),%20saya%20mau%20konsultasi%20pembuatan%20Aplikasi%20Mobile."
  }
]
```

---

## 11. TIMELINE & ROADMAP PENGEMBANGAN

```
+-------------------------------------------------------------------------------+
| MINGGU 1: Architecture & UI Engine                                           |
| - Setup Next.js, Tailwind, Zustand Store                                      |
| - Build Taskbar, Desktop Grid, Window Management System (Drag/Drop/Z-Index)   |
+-------------------------------------------------------------------------------+
| MINGGU 2: Feature & Apps Development                                          |
| - Build ServicesApp (3 Web Packages + Mobile)                                 |
| - Build Portfolio Explorer & Portfolio Details Modal                          |
| - Build AboutApp, ContactApp, & Terminal CMD                                  |
+-------------------------------------------------------------------------------+
| MINGGU 3: Animations, Sound & Polish                                          |
| - Integrate Framer Motion (Spring Physics, Open/Close Animations)             |
| - Add Sound Effects Engine & Wallpaper Switcher                               |
| - Mobile Responsive Mode Optimization                                         |
+-------------------------------------------------------------------------------+
| MINGGU 4: Testing, SEO & Launch                                               |
| - Testing di berbagai Browser & HP (iOS/Android)                              |
| - SEO Metadata Optimization & Lighthouse Audit                                |
| - Deployment ke Vercel & Linking Custom Domain arjunadev.com                  |
+-------------------------------------------------------------------------------+
```

---

**Dokumen PRD ini telah lengkap dan siap dieksekusi.** Semua instruksi brand, kontak WhatsApp (`085693366142`), Instagram (`@haris_musafa_`), identitas pemilik (`Haris Musafa`), paket harga, portofolio, serta animasi UI OS Windows telah dispesifikasikan dengan jelas.