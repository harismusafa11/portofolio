export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  readTime: string;
  date: string;
  isoDate: string;
  image: string;
  author: BlogAuthor;
  tags: string[];
  content: string; // HTML-safe formatted content
}

export const blogsData: BlogPost[] = [
  {
    slug: "biaya-pembuatan-website-umkm-2026",
    title: "Berapa Biaya Pembuatan Website untuk UMKM & Bisnis di 2026? Panduan Lengkap & Rincian Harga",
    excerpt:
      "Bongkar tuntas rincian biaya pembuatan website mulai dari landing page, company profile, hingga toko online. Kenali perbedaan website murah template vs kustom performa tinggi.",
    category: "Panduan Bisnis",
    categorySlug: "panduan-bisnis",
    readTime: "6 Menit Baca",
    date: "04 Okt 2026",
    isoDate: "2026-10-04T09:00:00Z",
    image: "/assets/blog/biaya_web.jpg",
    author: {
      name: "Haris Musafa",
      role: "Lead Full-Stack Web Engineer & Founder Arjuna Dev",
      avatar: "/assets/profile_tight.png",
    },
    tags: ["Biaya Website", "Website UMKM", "Landing Page", "Harga Jasa Web"],
    content: `
      <p class="lead-text">
        Pertanyaan paling sering diajukan oleh pemilik usaha kecil dan menengah (UMKM) saat ingin beralih ke ranah digital adalah: <strong>"Sebenarnya berapa biaya riil pembuatan website di tahun 2026?"</strong> Banyak yang khawatir biayanya mencapai puluhan juta, sementara di sisi lain ada iklan yang menawarkan harga mulai dari Rp 100 ribuan.
      </p>

      <p>
        Kenyataannya, biaya pembuatan website sangat bergantung pada <strong>tujuan bisnis, arsitektur teknologi, dan kualitas purna jual</strong> yang Anda dapatkan. Artikel ini mengupas tuntas struktur biaya sebenarnya agar Anda tidak salah memilih jasa developer.
      </p>

      <h2>1. Komponen Utama Pembentuk Biaya Website</h2>
      <p>
        Setiap website profesional yang online dan dapat diakses 24 jam membutuhkan 4 fondasi utama:
      </p>
      <ul>
        <li><strong>Nama Domain Resmi (.com / .id):</strong> Identitas alamat web bisnis Anda. Biaya berkisar antara Rp 150.000 – Rp 250.000 per tahun.</li>
        <li><strong>Server Hosting Cloud:</strong> Tempat menyimpan file, database, dan gambar website. Cloud hosting yang cepat dan aman membutuhkan biaya sekitar Rp 400.000 – Rp 1.200.000 per tahun.</li>
        <li><strong>Sertifikat Keamanan SSL:</strong> Ikon gembok hijau/aman (HTTPS) yang melindungi transaksi data dan diwajibkan oleh algoritma Google.</li>
        <li><strong>Jasa Desain UI/UX & Rekayasa Kode (Development):</strong> Pengerjaan tata letak visual, copywriting penjualan, integrasi tombol WhatsApp, optimasi kecepatan, dan SEO.</li>
      </ul>

      <div class="article-callout">
        <div class="callout-icon"><i class="fa-solid fa-lightbulb"></i></div>
        <div class="callout-body">
          <h4>Catatan Penting</h4>
          <p>Hati-hati dengan penawaran "Website Murah 100 Ribu". Biasanya itu hanya menggunakan template WordPress bajakan yang tidak diperbarui, rawan disusupi malware/spam judi online, dan sering kali Anda tidak diberikan akses kepemilikan domain sendiri.</p>
        </div>
      </div>

      <h2>2. Kisaran Harga Berdasarkan Jenis Website di Arjuna Dev</h2>
      <p>
        Berikut adalah estimasi standar pasar profesional yang kami terapkan secara transparan di <strong>Arjuna Dev</strong>:
      </p>

      <div class="table-responsive my-4">
        <table class="article-table">
          <thead>
            <tr>
              <th>Paket Website</th>
              <th>Kisaran Biaya</th>
              <th>Waktu Kerja</th>
              <th>Cocok Untuk</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Landing Page Fokus Konversi</strong></td>
              <td>Rp 499.000 – Rp 999.000</td>
              <td>3 – 5 Hari</td>
              <td>Promosi 1 produk utama, kampanye iklan Google/TikTok Ads, event seminar.</td>
            </tr>
            <tr>
              <td><strong>Company Profile / Bisnis</strong></td>
              <td>Rp 1.499.000 – Rp 2.499.000</td>
              <td>7 – 10 Hari</td>
              <td>Profil perusahaan, klinik kesehatan, kantor jasa, CV/PT, sekolah.</td>
            </tr>
            <tr>
              <td><strong>Toko Online (E-Commerce WA)</strong></td>
              <td>Rp 2.999.000 – Rp 3.999.000</td>
              <td>10 – 14 Hari</td>
              <td>Katalog produk baju, kuliner oleh-oleh, herbal, perlengkapan olahraga.</td>
            </tr>
            <tr>
              <td><strong>Custom Web App / Sistem</strong></td>
              <td>Mulai Rp 4.999.000</td>
              <td>14 – 30 Hari</td>
              <td>Sistem reservasi, aplikasi manajemen internal, portal multi-user.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>3. Kenapa Biaya Kami Sudah Termasuk Garansi 90 Hari?</h2>
      <p>
        Banyak klien kami sebelumnya mengaku kecewa dengan freelancer lepas yang sulit dihubungi setelah pembayaran lunas. Di Arjuna Dev, kami menyertakan:
      </p>
      <ul>
        <li>Free domain .com dan hosting cloud selama 1 tahun penuh.</li>
        <li>Garansi teknis 90 hari terhadap perbaikan bug atau kendala tampilan.</li>
        <li>Skema pembayaran bertahap (DP 50% di awal dan sisa 50% setelah website live teruji).</li>
        <li>Sistem live tracking progres proyek agar Anda dapat memantau setiap tahap pengerjaan.</li>
      </ul>

      <h2>Kesimpulan & Langkah Selanjutnya</h2>
      <p>
        Membuat website bisnis bukan sekadar pengeluaran biaya (*expense*), melainkan <strong>investasi aset digital</strong> yang bekerja 24 jam mendatangkan pelanggan baru. Pastikan Anda memilih rekan developer yang transparan dan bersedia diajak berdiskusi jangka panjang.
      </p>
    `,
  },
  {
    slug: "perbedaan-landing-page-dan-website-perusahaan",
    title: "Landing Page vs Website Company Profile: Mana yang Lebih Tepat untuk Meningkatkan Penjualan Bisnis Anda?",
    excerpt:
      "Bingung memilih antara landing page 1 halaman atau website perusahaan multi-halaman? Pelajari perbedaan struktur, tujuan, alur konversi, dan efisiensi anggarannya di sini.",
    category: "Strategi Web",
    categorySlug: "strategi-web",
    readTime: "5 Menit Baca",
    date: "02 Okt 2026",
    isoDate: "2026-10-02T10:00:00Z",
    image: "/assets/blog/landing_vs_company.jpg",
    author: {
      name: "Haris Musafa",
      role: "Lead Full-Stack Web Engineer & Founder Arjuna Dev",
      avatar: "/assets/profile_tight.png",
    },
    tags: ["Landing Page", "Company Profile", "Strategi Digital", "Tingkat Konversi"],
    content: `
      <p class="lead-text">
        Saat ingin membangun kehadiran digital, calon klien kerap bertanya: <strong>"Mas Haris, usaha saya lebih cocok buat landing page satu halaman atau website perusahaan lengkap (Company Profile)?"</strong>
      </p>

      <p>
        Keduanya sama-sama berbentuk website, namun memiliki <strong>arsitektur psikologi pengunjung dan tujuan bisnis yang bertolak belakang</strong>. Menggunakan format yang keliru bisa membuat calon pembeli Anda bingung dan akhirnya batal menghubungi Anda.
      </p>

      <h2>1. Apa Itu Landing Page?</h2>
      <p>
        Landing page adalah halaman web tunggal (single page) yang dirancang khusus untuk <strong>satu tujuan spesifik (Call to Action / CTA)</strong>. Tidak ada tautan menu keluar yang membingungkan; semua informasi disusun mengerucut agar pengunjung mengambil tindakan:
      </p>
      <ul>
        <li>Mengklik tombol pesan WhatsApp.</li>
        <li>Mengisi form pendaftaran atau klaim promo.</li>
        <li>Membeli 1 paket produk unggulan.</li>
      </ul>
      <p>
        <strong>Kelebihan utama:</strong> Rasio konversi (*conversion rate*) sangat tinggi saat dipasangi iklan berbayar (Meta Ads, Google Ads, TikTok Ads).
      </p>

      <h2>2. Apa Itu Website Company Profile?</h2>
      <p>
        Website Company Profile adalah website lengkap multi-halaman (Beranda, Tentang Kami, Layanan, Portofolio Proyek, Klien, Kontak, Blog) yang bertujuan membangun <strong>kredibilitas, legalitas, dan reputasi merek jangka panjang</strong>.
      </p>
      <p>
        <strong>Kelebihan utama:</strong> Sangat disukai oleh mesin pencari Google karena memiliki struktur halaman hierarki yang kaya kata kunci, serta memberikan rasa percaya tinggi kepada mitra B2B, investor, maupun tender resmi.
      </p>

      <div class="article-callout">
        <div class="callout-icon"><i class="fa-solid fa-arrows-split-up-and-left"></i></div>
        <div class="callout-body">
          <h4>Perbandingan Singkat</h4>
          <p><strong>Landing Page:</strong> Fokus "Jual Sekarang Juga" (Taktis, Cepat, Fokus 1 Tawaran).<br/>
          <strong>Company Profile:</strong> Fokus "Kenali & Percayai Perusahaan Kami" (Strategis, Komprehensif, Multi-Tujuan).</p>
        </div>
      </div>

      <h2>3. Kapan Anda Harus Memilih Landing Page?</h2>
      <p>Pilihlah Landing Page jika bisnis Anda berada pada kondisi berikut:</p>
      <ol>
        <li>Anda sedang gencar menjalankan iklan Google Ads atau Instagram Ads untuk 1 produk spesifik.</li>
        <li>Anda ingin proses pembuatan cepat (3 – 5 hari sudah siap tayang).</li>
        <li>Anggaran awal masih efisien (di bawah Rp 1 juta).</li>
      </ol>

      <h2>4. Kapan Anda Harus Memilih Company Profile?</h2>
      <p>Pilihlah Company Profile jika bisnis Anda memenuhi kriteria ini:</p>
      <ol>
        <li>Bisnis Anda memiliki banyak varian layanan (misal: jasa arsitektur, klinik medis, logistik kargo, pabrik ekspor).</li>
        <li>Calon klien Anda membutuhkan proposal resmi, bukti legalitas, dan ulasan mendalam sebelum transaksi bernilai besar.</li>
        <li>Anda ingin mendapatkan lalu lintas gratis dari pencarian organik Google (SEO) di berbagai kota.</li>
      </ol>

      <h2>Rekomendasi Arjuna Dev</h2>
      <p>
        Jika masih ragu, Anda bisa memulai dari paket <strong>Landing Page Profesional</strong> terlebih dahulu. Di masa depan, seiring pertumbuhan omset usaha, halaman tersebut dapat kami kembangkan menjadi website multi-halaman penuh tanpa harus membuang domain yang sudah ada.
      </p>
    `,
  },
  {
    slug: "strategi-seo-lokal-google-maps-bisnis",
    title: "Strategi SEO Lokal & Optimasi Google Maps: Cara Website Bisnis Anda Ditemukan Pelanggan Terdekat",
    excerpt:
      "Panduan praktis agar website usaha Anda muncul di halaman pertama Google saat orang mencari jasa terdekat. Lengkap dengan integrasi Google Maps dan Schema LocalBusiness.",
    category: "Optimasi SEO",
    categorySlug: "optimasi-seo",
    readTime: "7 Menit Baca",
    date: "28 Sep 2026",
    isoDate: "2026-09-28T08:30:00Z",
    image: "/assets/blog/seo_local.jpg",
    author: {
      name: "Haris Musafa",
      role: "Lead Full-Stack Web Engineer & Founder Arjuna Dev",
      avatar: "/assets/profile_tight.png",
    },
    tags: ["SEO Lokal", "Google Maps", "Google Profil Bisnis", "Pencarian UMKM"],
    content: `
      <p class="lead-text">
        Ketika seseorang di kota Anda membutuhkan jasa servis AC, bengkel mobil, rental kendaraan, atau klinik kecantikan, hal pertama yang mereka ketik di Google adalah: <strong>"Jasa [Kebutuhan] Terdekat"</strong> atau <strong>"Jasa [Kebutuhan] di [Nama Kota]"</strong>.
      </p>

      <p>
        Jika bisnis Anda tidak muncul di 3 posisi teratas Google Maps dan hasil pencarian organik, Anda sedang membuang puluhan pelanggan siap bayar ke tangan kompetitor setiap harinya. Inilah yang disebut dengan <strong>Local SEO (Search Engine Optimization Lokal)</strong>.
      </p>

      <h2>1. Integrasi Google Business Profile (GBP) dengan Website</h2>
      <p>
        Banyak pemilik usaha sudah membuat pin titik lokasi di Google Maps, namun tidak menautkan website resmi mereka. Padahal:
      </p>
      <ul>
        <li>Google memberikan skor peringkat 40% lebih tinggi kepada profil bisnis yang memiliki link website aktif dengan nama domain resmi.</li>
        <li>Pastikan format nama usaha, alamat fisik, dan nomor telepon (NAP: Name, Address, Phone) di Google Maps 100% sama persis dengan yang tertulis di footer website Anda.</li>
      </ul>

      <h2>2. Memasang Schema.org "LocalBusiness" & "ProfessionalService"</h2>
      <p>
        Googlebot adalah robot mesin yang membaca struktur data kode. Di Arjuna Dev, setiap website yang kami kembangkan otomatis kami suntikkan script <strong>JSON-LD Structured Data</strong>:
      </p>
      <pre><code>{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Nama Usaha Anda",
  "address": {
    "addressLocality": "Pemalang",
    "addressRegion": "Jawa Tengah"
  },
  "geo": {
    "latitude": "-6.8906",
    "longitude": "109.5348"
  }
}</code></pre>
      <p>
        Kode di atas memberi sinyal jelas kepada Google bahwa bisnis Anda memiliki toko fisik nyata, melayani radius daerah sekitar, dan memiliki nomor telepon yang aktif.
      </p>

      <h2>3. Target Kata Kunci Berbasis Kota & Wilayah Sekitar</h2>
      <p>
        Jangan bersaing untuk kata kunci yang terlalu luas seperti "Jasa Rental Mobil" di seluruh Indonesia jika armada Anda hanya melayani area Jawa Tengah. 
        Targetkan kata kunci bertingkat:
      </p>
      <ul>
        <li><em>"Rental Mobil Pemalang Murah"</em></li>
        <li><em>"Sewa Mobil Lepas Kunci Pekalongan"</em></li>
        <li><em>"Rental Hiace Tegal Brebes"</em></li>
      </ul>
      <p>
        Tingkat persaingan kata kunci lokal jauh lebih rendah, sehingga website Anda bisa tembus halaman 1 Google hanya dalam hitungan minggu.
      </p>

      <div class="article-callout">
        <div class="callout-icon"><i class="fa-solid fa-map-pin"></i></div>
        <div class="callout-body">
          <h4>Fakta Pencarian Google</h4>
          <p>Riset Google mencatat bahwa 76% pencarian lokal dari smartphone berujung pada panggilan telepon atau kunjungan langsung ke lokasi dalam waktu 24 jam.</p>
        </div>
      </div>

      <h2>4. Kecepatan Akses Mobile (HP) Menentukan Posisi</h2>
      <p>
        Google memberlakukan aturan ketat: jika website Anda diakses melalui koneksi 4G di HP membutuhkan waktu loading lebih dari 3 detik, posisi pencarian lokal Anda akan diturunkan.
      </p>
      <p>
        Itulah mengapa di Arjuna Dev, kami tidak menggunakan template berat, melainkan teknologi Next.js yang memuat halaman seketika (*instant page load*).
      </p>
    `,
  },
  {
    slug: "kenapa-kecepatan-website-mempengaruhi-penjualan",
    title: "Website Lemot Bikin Boncos! Ini Alasan Kecepatan Muat Menentukan Penjualan & Ranking Google",
    excerpt:
      "Tiap detik keterlambatan loading memangkas konversi penjualan hingga 20%. Simak bagaimana optimasi kecepatan website mengubah pengunjung menjadi pembeli aktif.",
    category: "Performa Web",
    categorySlug: "performa-web",
    readTime: "5 Menit Baca",
    date: "24 Sep 2026",
    isoDate: "2026-09-24T11:00:00Z",
    image: "/assets/blog/speed_conversion.jpg",
    author: {
      name: "Haris Musafa",
      role: "Lead Full-Stack Web Engineer & Founder Arjuna Dev",
      avatar: "/assets/profile_tight.png",
    },
    tags: ["PageSpeed", "Core Web Vitals", "Next.js", "Konversi Iklan"],
    content: `
      <p class="lead-text">
        Anda sudah mengeluarkan biaya jutaan rupiah untuk pasang iklan di Facebook, TikTok, atau Google Ads. Namun saat calon pembeli mengklik tautan iklan, mereka justru langsung menutup halaman. <strong>Apa penyebab utamanya? Website Anda terlalu lambat memuat.</strong>
      </p>

      <p>
        Di era internet cepat saat ini, kesabaran pengguna sangat rendah. Riset resmi dari Google menunjukkan bahwa <strong>53% pengunjung ponsel pintar akan meninggalkan website jika waktu muatnya melebihi 3 detik</strong>.
      </p>

      <h2>1. Dampak Buruk Website yang Lambat Bagi Bisnis</h2>
      <ul>
        <li><strong>Biaya Iklan Terbuang Percuma (*Ad Spend Wasted*):</strong> Anda membayar setiap klik pengunjung ke platform iklan, namun mereka tidak sempat melihat produk karena sudah menekan tombol *back*.</li>
        <li><strong>Kepercayaan Konsumen Runtuh:</strong> Website yang lambat memberikan kesan tidak terawat, murahan, dan mencurigakan.</li>
        <li><strong>Penurunan Ranking di Google (Core Web Vitals):</strong> Google secara eksplisit menjadikan metrik kecepatan (LCP, FID, CLS) sebagai faktor utama penentu posisi ranking.</li>
      </ul>

      <h2>2. Mengapa Banyak Website Berjalan Lambat?</h2>
      <p>Ada beberapa kesalahan umum yang sering dilakukan jasa pembuat website amatir:</p>
      <ol>
        <li><strong>Menggunakan WordPress dengan Puluhan Plugin Berat:</strong> Menumpuk 20–30 plugin hanya untuk fitur sederhana membuat database server lambat memproses query.</li>
        <li><strong>Gambar Resolusi Raksasa Tanpa Kompresi:</strong> Mengunggah foto kamera ukuran 5MB tanpa diubah ke format modern (WebP atau AVIF).</li>
        <li><strong>Hosting Murahan Shared Hosting:</strong> Menaruh website di server yang berbagi sumber daya dengan ribuan website lain sehingga sering mengalami *server down* atau *timeout*.</li>
      </ol>

      <div class="article-callout">
        <div class="callout-icon"><i class="fa-solid fa-gauge-high"></i></div>
        <div class="callout-body">
          <h4>Solusi Modern di Arjuna Dev</h4>
          <p>Kami membangun website menggunakan arsitektur <strong>Next.js 16</strong> dengan kompresi gambar otomatis, CSS modular tanpa sampah kode, dan deploy di infrastruktur Edge CDN global. Hasilnya: website terbuka kurang dari 1 detik di koneksi seluler sekalipun.</p>
        </div>
      </div>

      <h2>3. Cara Menguji Kecepatan Website Anda Sekarang</h2>
      <p>
        Anda bisa menguji performa website Anda secara gratis menggunakan alat resmi Google: <strong>PageSpeed Insights (pagespeed.web.dev)</strong>. 
        Jika skor performa mobile Anda berada di warna merah (di bawah 50), berarti website Anda memerlukan perbaikan arsitektur segera.
      </p>

      <h2>Konsultasi Optimasi Kecepatan</h2>
      <p>
        Ingin website bisnis Anda melesat kencang dan tidak lagi membuat pengunjung lari? Tim Arjuna Dev siap membantu mengaudit dan merekonstruksi website Anda agar super cepat dan siap mengonversi iklan.
      </p>
    `,
  },
  {
    slug: "tips-memilih-jasa-pembuatan-website-terpercaya",
    title: "7 Checklist Wajib Sebelum Menggunakan Jasa Pembuatan Website: Jangan Sampai Tertipu & Ditinggal Developer!",
    excerpt:
      "Panduan melindungi anggaran bisnis Anda. Cek 7 hal penting mulai dari kepemilikan domain, portofolio nyata, garansi perbaikan, hingga kejelasan termin pembayaran.",
    category: "Tips Klien",
    categorySlug: "tips-klien",
    readTime: "6 Menit Baca",
    date: "18 Sep 2026",
    isoDate: "2026-09-18T09:15:00Z",
    image: "/assets/blog/checklist_developer.jpg",
    author: {
      name: "Haris Musafa",
      role: "Lead Full-Stack Web Engineer & Founder Arjuna Dev",
      avatar: "/assets/profile_tight.png",
    },
    tags: ["Jasa Pembuatan Website", "Tips Memilih Developer", "Garansi Website", "Arjuna Dev"],
    content: `
      <p class="lead-text">
        Banyak pemilik usaha yang bercerita kepada kami mengenai pengalaman pahit mereka: <strong>"Dulu pernah bikin web sama orang lain, tapi setelah uang dibayarkan, developernya menghilang saat web ada error. Bahkan akses ke domain sendiri tidak diberikan."</strong>
      </p>

      <p>
        Untuk melindungi anggaran dan reputasi bisnis Anda, jangan terburu-buru tergiur penawaran murah. Selalu pastikan 7 checklist berikut terpenuhi sebelum Anda mentransfer uang muka (DP):
      </p>

      <h2>1. Minta Bukti Portofolio Asli yang Masih Aktif (Bukan Mockup Palsu)</h2>
      <p>
        Banyak penipu hanya menampilkan gambar mockup hasil unduh di Pinterest atau Figma komunitas. Minta tautan (*live link*) website asli yang pernah mereka buat dan cek apakah website tersebut benar-benar berfungsi dengan baik di smartphone Anda.
      </p>
      <p>
        <em>Di Arjuna Dev, semua 8 proyek portofolio kami dapat Anda kunjungi langsung URL aslinya untuk membuktikan kualitas koding kami.</em>
      </p>

      <h2>2. Pastikan Akun Domain Resmi Didaftarkan Atas Nama Anda</h2>
      <p>
        Ini jebakan paling berbahaya! Banyak oknum mendaftarkan nama domain (.com atau .id) atas nama email pribadi mereka sendiri. Akibatnya, saat perpanjangan tahun berikutnya, Anda ditagih harga selangit atau disandera. Pastikan hak kepemilikan domain 100% milik Anda.
      </p>

      <h2>3. Ada Jaminan Garansi Pasca-Peluncuran (After-Sales)</h2>
      <p>
        Website bukanlah barang sekali jadi lalu ditinggal. Pastikan ada klausul garansi perbaikan bug, kendala tampilan, atau tombol eror. <strong>Arjuna Dev memberikan garansi resmi 90 hari</strong> untuk memastikan operasional bisnis Anda berjalan lancar.
      </p>

      <h2>4. Skema Pembayaran Bertahap (DP 50% & Pelunasan 50%)</h2>
      <p>
        Jangan pernah bersedia membayar 100% lunas di awal kepada freelancer yang belum teruji reputasinya. Skema yang sehat di industri web adalah:
      </p>
      <ul>
        <li>Down Payment (DP) 50% setelah kesepakatan spesifikasi dan desain.</li>
        <li>Pelunasan sisa 50% setelah website selesai diuji coba di link staging dan siap diarahkan ke domain utama.</li>
      </ul>

      <h2>5. Transparansi Tracking Proyek</h2>
      <p>
        Pastikan Anda tidak dibiarkan menebak-nebak status pekerjaan. Developer profesional biasanya memiliki alur transparan: Riset ➔ Desain Visual ➔ Koding Sistem ➔ Uji Coba Kecepatan ➔ Peluncuran Resmi.
      </p>

      <h2>6. Website Bebas Biaya Bulanan Tersembunyi</h2>
      <p>
        Tanyakan sejak awal: apakah ada biaya langganan bulanan di luar biaya tahunan resmi domain dan hosting? Hindari platform yang mengunci Anda dengan tagihan bulanan jutaan rupiah padahal pengunjung website masih sedikit.
      </p>

      <h2>7. Kemudahan Komunikasi & Responsivitas</h2>
      <p>
        Uji respons developer saat Anda berkonsultasi pertama kali. Jika menjawab pertanyaan teknis dasar saja butuh waktu berhari-hari, bayangkan betapa sulitnya saat website Anda nantinya mengalami kendala mendadak.
      </p>

      <div class="article-callout">
        <div class="callout-icon"><i class="fa-solid fa-shield-heart"></i></div>
        <div class="callout-body">
          <h4>Komitmen Arjuna Dev</h4>
          <p>Kami memegang teguh transparansi kode, kepemilikan penuh akun untuk klien, dan komunikasi langsung via WhatsApp tanpa perantara sales yang berbelit-belit.</p>
        </div>
      </div>

      <h2>Mulai Konsultasi Tanpa Biaya</h2>
      <p>
        Punya rencana membuat website baru atau ingin merombak website lama yang sudah ketinggalan zaman? Hubungi Haris Musafa via WhatsApp sekarang untuk konsultasi gratis dan estimasi biaya yang sesuai dengan skala bisnis Anda.
      </p>
    `,
  },
  {
    slug: "wordpress-vs-custom-website-nextjs-bisnis",
    title: "WordPress vs Website Kustom Next.js: Mana yang Lebih Menguntungkan untuk Bisnis Anda di 2026?",
    excerpt:
      "Komparasi mendalam antara CMS WordPress template vs website kustom modern Next.js. Bahas tuntas faktor kecepatan, celah keamanan plugin, biaya perawatan, dan skalabilitas bisnis jangka panjang.",
    category: "Teknologi & Bisnis",
    categorySlug: "teknologi-bisnis",
    readTime: "7 Menit Baca",
    date: "06 Okt 2026",
    isoDate: "2026-10-06T10:00:00Z",
    image: "/assets/blog/wordpress_vs_nextjs.jpg",
    author: {
      name: "Haris Musafa",
      role: "Lead Full-Stack Web Engineer & Founder Arjuna Dev",
      avatar: "/assets/profile_tight.png",
    },
    tags: ["WordPress vs Next.js", "Website Kustom", "Keamanan Website", "Teknologi Web 2026"],
    content: `
      <p class="lead-text">
        Ketika merencanakan pembuatan aset digital bisnis, satu pertanyaan krusial yang kerap muncul di benak para pengusaha adalah: <strong>"Haruskah kami menggunakan platform template WordPress, atau berinvestasi pada website kustom modern berbasis Next.js?"</strong>
      </p>

      <p>
        Keduanya memiliki keunggulan dan peruntukannya masing-masing. Namun di tahun 2026, di mana standar kecepatan Google Core Web Vitals semakin ketat dan ancaman siber meningkat, memilih fondasi teknologi yang salah dapat berakibat fatal bagi pertumbuhan bisnis Anda.
      </p>

      <h2>1. Tabel Komparasi Head-to-Head: WordPress vs Next.js</h2>
      <p>
        Berikut ringkasan perbandingan teknis dan bisnis yang perlu Anda ketahui:
      </p>

      <div class="table-responsive my-4">
        <table class="article-table">
          <thead>
            <tr>
              <th>Parameter</th>
              <th>WordPress (Template CMS)</th>
              <th>Kustom Next.js (Modern React)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Skor Kecepatan (PageSpeed)</strong></td>
              <td>Umumnya 35 – 65 (Lambat karena beban plugin & database query)</td>
              <td><strong>95 – 100</strong> (Instan berkat pra-kompilasi static & SSR)</td>
            </tr>
            <tr>
              <td><strong>Ketahanan Keamanan</strong></td>
              <td>Rentan terhadap celah eksploitasi plugin usang dan spam database</td>
              <td><strong>Sangat Aman</strong> (Arsitektur headless tanpa database terekspos)</td>
            </tr>
            <tr>
              <td><strong>Kerapian Desain (UI/UX)</strong></td>
              <td>Terbatas pada struktur tema template yang kaku</td>
              <td><strong>100% Fleksibel</strong> sesuai identitas merek & psikologi konversi</td>
            </tr>
            <tr>
              <td><strong>Beban Server & Skalabilitas</strong></td>
              <td>Server mudah tumbang jika trafik iklan membludak secara tiba-tiba</td>
              <td>Tahan lonjakan jutaan pengunjung melalui edge CDN global</td>
            </tr>
            <tr>
              <td><strong>Kebutuhan Pemeliharaan</strong></td>
              <td>Wajib update plugin berkala; risiko konflik antar plugin tinggi</td>
              <td>Sekali bangun langsung stabil, minim maintenance teknis rumit</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>2. Bahaya Tersembunyi Ketergantungan Plugin di WordPress</h2>
      <p>
        WordPress memang populer karena kemudahan instalasi awalnya. Namun seiring berjalannya waktu, sebuah website bisnis WordPress rata-rata membutuhkan 20 hingga 35 plugin tambahan hanya untuk menambahkan fungsi form, SEO, keamanan, cache, dan WhatsApp.
      </p>
      <p>
        Menurut laporan keamanan siber global, <strong>lebih dari 90% kerentanan peretasan situs web</strong> disebabkan oleh celah pada plugin WordPress pihak ketiga yang tidak terawat. Akibatnya, banyak website bisnis yang mendadak dialihkan ke situs judi online atau disusupi malware berbahaya tanpa disadari pemiliknya.
      </p>

      <div class="article-callout">
        <div class="callout-icon"><i class="fa-solid fa-shield-virus"></i></div>
        <div class="callout-body">
          <h4>Fakta Keamanan Next.js</h4>
          <p>Next.js mengompilasi halaman web menjadi berkas statis dan fungsi serverless yang aman. Tidak ada dashboard admin publik standar (seperti /wp-admin) yang bisa ditebak peretas dengan serangan brute-force.</p>
        </div>
      </div>

      <h2>3. Kenapa Perusahaan Terkemuka Beralih ke Next.js?</h2>
      <p>
        Platform raksasa seperti Netflix, Nike, Twitch, dan TikTok mempercayakan front-end mereka pada ekosistem Next.js. Kecepatan rendering yang mencapai hitungan milidetik terbukti secara langsung meningkatkan konversi penjualan dan ranking di mesin pencari Google.
      </p>
      <p>
        Di <strong>Arjuna Dev</strong>, kami membawa standar rekayasa teknologi kelas dunia ini ke ranah bisnis UMKM dan perusahaan Indonesia dengan biaya yang sangat masuk akal, transparan, dan bergaransi penuh.
      </p>

      <h2>4. Kesimpulan: Mana yang Tepat untuk Bisnis Anda?</h2>
      <ul>
        <li><strong>Pilih WordPress jika:</strong> Anda hanya ingin membuat blog pribadi berskala kecil tanpa kebutuhan kampanye iklan berbayar, dan memiliki anggaran sangat terbatas di bawah Rp 500 ribu.</li>
        <li><strong>Pilih Kustom Next.js jika:</strong> Anda adalah pemilik bisnis yang mengutamakan kredibilitas profesional, beriklan di Meta/Google Ads, butuh kecepatan akses di bawah 1.5 detik, dan ingin aset digital yang awet bertahun-tahun tanpa pusing memikirkan plugin error.</li>
      </ul>
    `,
  },
  {
    slug: "cara-membuat-website-toko-online-konversi-tinggi",
    title: "Cara Membuat Website Toko Online yang Efektif Menghasilkan Penjualan (Bukan Sekadar Pajangan)",
    excerpt:
      "Pelajari formula membangun toko online mandiri yang terbukti closing tinggi di Indonesia. Lengkap dengan sistem WhatsApp checkout, katalog responsif, dan tips keluar dari perang harga marketplace.",
    category: "E-Commerce",
    categorySlug: "e-commerce",
    readTime: "8 Menit Baca",
    date: "05 Okt 2026",
    isoDate: "2026-10-05T14:30:00Z",
    image: "/assets/blog/toko_online_konversi.jpg",
    author: {
      name: "Haris Musafa",
      role: "Lead Full-Stack Web Engineer & Founder Arjuna Dev",
      avatar: "/assets/profile_tight.png",
    },
    tags: ["Toko Online", "E-Commerce WhatsApp", "Jualan Online", "Website Bisnis UMKM"],
    content: `
      <p class="lead-text">
        Banyak pemilik brand mengeluhkan hal yang sama: <strong>"Sudah keluar modal jutaan untuk bikin toko online, tapi pengunjungnya sepi dan tidak ada yang beli. Ujung-ujungnya balik lagi jualan di marketplace yang potongannya makin mencekik."</strong>
      </p>

      <p>
        Mengapa hal ini bisa terjadi? Karena sebagian besar toko online dibangun hanya sebagai katalog pasif, tanpa memahami psikologi belanja dan kebiasaan konsumen di Indonesia. Artikel ini membeberkan formula membangun toko online mandiri yang benar-benar aktif mencetak transaksi closing.
      </p>

      <h2>1. Mengapa Bisnis Anda Wajib Punya Toko Online Mandiri?</h2>
      <p>
        Berjualan hanya di marketplace ibarat menyewa lapak di ruko milik orang lain. Setiap tahun potongan komisi terus naik (kini mencapai 8% – 15%), dan produk Anda selalu dijejerkan langsung dengan kompetitor yang menjual barang serupa dengan perang harga tidak sehat.
      </p>
      <ul>
        <li><strong>Margin Keuntungan Utuh 100%:</strong> Seluruh keuntungan penjualan masuk ke kantong Anda tanpa dipotong komisi platform pihak ketiga.</li>
        <li><strong>Database Pelanggan Menjadi Milik Anda:</strong> Anda memiliki data nomor WhatsApp dan email pembeli untuk kebutuhan promo retargeting dan repeat order.</li>
        <li><strong>Nilai Merek (Brand Equity) Meningkat:</strong> Pembeli memandang brand Anda sebagai bisnis resmi berskala profesional, bukan pedagang musiman.</li>
      </ul>

      <h2>2. Rahasia Sukses E-Commerce Lokal: Fitur WhatsApp Checkout</h2>
      <p>
        Riset pasar menunjukkan bahwa lebih dari <strong>82% konsumen online di Indonesia</strong> lebih menyukai proses transaksi yang terhubung langsung dengan customer service via WhatsApp. Mereka ingin memastikan ketersediaan varian warna, menanyakan ongkos kirim termurah, atau meminta foto riil produk.
      </p>

      <div class="article-callout">
        <div class="callout-icon"><i class="fa-brands fa-whatsapp"></i></div>
        <div class="callout-body">
          <h4>Fitur Auto-Format Pesan Arjuna Dev</h4>
          <p>Toko online yang kami bangun menyertakan generator pesan WhatsApp otomatis. Saat pembeli menekan tombol 'Beli Sekarang', WhatsApp mereka otomatis terisi rincian produk, varian ukuran, jumlah, dan alamat pengiriman secara rapi. Tim CS Anda tinggal membalas nomor rekening dan total ongkir!</p>
        </div>
      </div>

      <h2>3. 5 Checklist Wajib Toko Online Berkonversi Tinggi</h2>
      <ol>
        <li><strong>Kecepatan Buka Gambar Produk Cepat:</strong> Gambar produk harus terkompresi cerdas ke format WebP tanpa buram, sehingga halaman katalog terbuka seketika di ponsel pembeli.</li>
        <li><strong>Navigasi Kategori & Filter Jelas:</strong> Pengunjung harus dapat menemukan produk yang dicari dalam maksimal 2 kali ketukan layar.</li>
        <li><strong>Foto Detail dari Berbagai Sudut:</strong> Sertakan foto tampak depan, samping, dan saat produk digunakan dalam kehidupan nyata (*lifestyle photo*).</li>
        <li><strong>Bukti Sosial (Testimoni & Rating Nyata):</strong> Tempatkan testimoni puas pelanggan di dekat tombol pembelian untuk melenyapkan keraguan calon pembeli baru.</li>
        <li><strong>Garansi Pengembalian & Kejelasan Pengiriman:</strong> Informasikan ekspedisi yang didukung (JNE, J&T, SiCepat, Gosend) serta kebijakan penukaran barang jika terjadi cacat produksi.</li>
      </ol>

      <h2>4. Kembangkan Toko Online Brand Anda Bersama Arjuna Dev</h2>
      <p>
        Kami merancang website toko online kustom yang tidak hanya cantik dipandang, tetapi dioptimasi secara khusus untuk menaikkan rasio penjualan dan memudahkan operasional inventaris produk Anda sehari-hari.
      </p>
    `,
  },
  {
    slug: "tanda-website-perlu-redesign-update-modern",
    title: "7 Tanda Website Bisnis Anda Sudah Ketinggalan Zaman & Perlu Segera Dire-Design",
    excerpt:
      "Apakah website Anda sepi pengunjung dan tidak menghasilkan prospek? Kenali tanda-tanda krusial website usang yang diam-diam merusak reputasi kredibilitas perusahaan Anda di mata calon klien.",
    category: "Desain & UI/UX",
    categorySlug: "desain-uiux",
    readTime: "6 Menit Baca",
    date: "02 Okt 2026",
    isoDate: "2026-10-02T11:00:00Z",
    image: "/assets/blog/redesign_website.jpg",
    author: {
      name: "Haris Musafa",
      role: "Lead Full-Stack Web Engineer & Founder Arjuna Dev",
      avatar: "/assets/profile_tight.png",
    },
    tags: ["Redesign Website", "UI/UX Website", "Modernisasi Web", "Kredibilitas Bisnis"],
    content: `
      <p class="lead-text">
        Dalam dunia bisnis modern, website adalah representasi kantor pusat digital perusahaan Anda. Riset dari Stanford University mengungkapkan bahwa <strong>75% konsumen menilai kredibilitas dan keandalan sebuah perusahaan murni berdasarkan desain visual website mereka.</strong>
      </p>

      <p>
        Jika website Anda dibuat 4 atau 5 tahun yang lalu dan belum pernah diperbarui, kemungkinan besar website tersebut kini memberikan kesan "bisnis tidak aktif" atau "kurang profesional". Berikut 7 tanda nyata website Anda sudah mendesak untuk dire-design:
      </p>

      <h2>1. Tampilan Rusak atau Font Terlalu Kecil di Layar Smartphone</h2>
      <p>
        Lebih dari 78% trafik web di Indonesia kini berasal dari ponsel cerdas. Jika pengunjung harus memperbesar layar (*pinch-to-zoom*) agar tulisan terbaca, atau jika menu navigasi menutupi separuh layar, calon pelanggan akan langsung menutup halaman dan berpindah ke pesaing Anda.
      </p>

      <h2>2. Loading Terasa Berat dan Lambat Melebihi 3 Detik</h2>
      <p>
        Standar algoritma Google modern (Core Web Vitals) mengharuskan website merespons di bawah 2.5 detik. Website lawas dengan kode usang dan aset gambar berukuran megabyte akan diturunkan peringkatnya oleh Google dan ditinggalkan oleh calon pelanggan yang tidak sabar.
      </p>

      <h2>3. Muncul Peringatan "Not Secure" di Google Chrome</h2>
      <p>
        Browser modern secara otomatis memblokir atau menampilkan peringatan merah "Situs Tidak Aman" pada website yang sertifikat SSL-nya kedaluwarsa atau masih menggunakan arsitektur HTTP lawas. Peringatan ini menghancurkan rasa percaya klien seketika.
      </p>

      <h2>4. Tulisan Hak Cipta di Footer Masih Tertulis Tahun Lawas</h2>
      <p>
        Tanda sepele namun sangat fatal! Saat klien potensial mengecek bagian bawah website dan menemukan tulisan <em>"© 2019 All Rights Reserved"</em>, mereka akan menyimpulkan bahwa perusahaan Anda sudah tutup atau tidak lagi beroperasi secara aktif.
      </p>

      <div class="article-callout">
        <div class="callout-icon"><i class="fa-solid fa-paintbrush"></i></div>
        <div class="callout-body">
          <h4>Dampak Positif Redesign</h4>
          <p>Redesign bukan sekadar ganti warna latar belakang. Ini adalah restrukturisasi pesan penjualan, penyegaran citra brand di mata investor, dan peningkatan rasio konversi chat masuk hingga 200% – 300%.</p>
        </div>
      </div>

      <h2>5. Susah Diupdate dan Pengembang Lamanya Menghilang</h2>
      <p>
        Banyak perusahaan tidak bisa memperbarui alamat kantor, portofolio baru, atau nomor WhatsApp di website mereka karena platform lama yang rumit atau developer lamanya tidak bisa dihubungi lagi. Redesign modern dengan sistem arsitektur bersih akan mengembalikan kendali penuh ke tangan Anda.
      </p>

      <h2>6. Desain Visual Kaku Penuh Kotak-Kotak Tanpa Identitas Merek</h2>
      <p>
        Tren desain web global telah beralih ke tipografi proporsional, ruang bernapas (*whitespace*) yang elegan, transisi animasi mikro yang halus, serta tata letak asimetris yang memancarkan aura teknologi tinggi.
      </p>

      <h2>7. Banyak Pengunjung tapi Tidak Ada Konversi Penjualan</h2>
      <p>
        Jika analitik menunjukkan pengunjung datang namun tombol kontak atau WhatsApp tidak pernah ada yang mengklik, itu pertanda struktur alur pengguna (*user flow*) website Anda membingungkan dan tidak memiliki Call-to-Action (CTA) yang menggugah aksi.
      </p>
    `,
  },
  {
    slug: "anatomi-landing-page-tingkatkan-chat-whatsapp",
    title: "Anatomi Landing Page yang Menghasilkan Banyak Chat WhatsApp & Lead Berkualitas Tinggi",
    excerpt:
      "Bongkar struktur psikologi tata letak landing page berdaya konversi tinggi. Mulai dari headline magnetis, penawaran tak tertolak, bukti sosial, hingga peletakan floating CTA WhatsApp.",
    category: "Optimasi Konversi",
    categorySlug: "optimasi-konversi",
    readTime: "7 Menit Baca",
    date: "30 Sep 2026",
    isoDate: "2026-09-30T13:00:00Z",
    image: "/assets/blog/anatomi_landing_page.jpg",
    author: {
      name: "Haris Musafa",
      role: "Lead Full-Stack Web Engineer & Founder Arjuna Dev",
      avatar: "/assets/profile_tight.png",
    },
    tags: ["Landing Page", "Optimasi Konversi", "Copywriting Web", "Lead Generation"],
    content: `
      <p class="lead-text">
        Pernahkah Anda membakar anggaran iklan jutaan rupiah di Facebook Ads, TikTok Ads, atau Google Ads, namun chat WhatsApp yang masuk sepi melompong? <strong>Seringkali masalahnya bukan pada targeting iklan Anda, melainkan landing page yang gagal meyakinkan pembaca dalam 5 detik pertama.</strong>
      </p>

      <p>
        Landing page fokus konversi memiliki formula psikologi urutan konten yang sangat terukur. Setiap bagian disusun secara runtut untuk membawa pembaca dari rasa penasaran menjadi keputusan bulat untuk menghubungi bisnis Anda.
      </p>

      <h2>1. Area 'Above The Fold': Penentu 5 Detik Pertama</h2>
      <p>
        Area layar pertama yang dilihat pengunjung sebelum mereka menggulir ke bawah (*Above the fold*) adalah medan tempur paling krusial. Bagian ini wajib memuat 4 unsur:
      </p>
      <ul>
        <li><strong>Headline Spesifik (Bukan Klise):</strong> Hindari headline klise seperti <em>"Selamat Datang di Website Kami"</em>. Gunakan penawaran nilai nyata, misalnya: <em>"Solusi Bikin Website Bisnis Siap Tayang dalam 5 Hari Bergaransi 90 Hari"</em>.</li>
        <li><strong>Sub-Headline Pendukung:</strong> Menjelaskan siapa target pasar Anda dan apa hasil nyata yang akan mereka nikmati.</li>
        <li><strong>Visual Hero Berkualitas:</strong> Tampilkan foto produk nyata atau visual interaktif yang mencerminkan kualitas tinggi.</li>
        <li><strong>Tombol Aksi Utama (CTA):</strong> Tombol warna kontras mencolok dengan teks jelas: <em>"Konsultasi Gratis via WhatsApp"</em>.</li>
      </ul>

      <h2>2. Membuka Masalah Utama Pelanggan (Pain Point & Agitation)</h2>
      <p>
        Sebelum memamerkan fitur produk, tunjukkan kepada pembaca bahwa Anda sangat memahami kesulitan terbesar yang sedang mereka hadapi. Ceritakan kerugian atau frustrasi yang mereka rasakan saat ini jika masalah tersebut tidak segera diselesaikan.
      </p>

      <h2>3. Solusi & Keunggulan Unik (Unique Value Proposition)</h2>
      <p>
        Perkenalkan layanan atau produk Anda sebagai jawaban pasti atas masalah di atas. Jangan hanya menulis daftar fitur teknis, tetapi terjemahkan menjadi <strong>keuntungan langsung bagi konsumen</strong>. Contoh: bukan hanya <em>"Menggunakan teknologi Next.js"</em>, melainkan <em>"Website terbuka secepat kilat dalam 1 detik sehingga iklan Anda tidak boncos"</em>.
      </p>

      <div class="article-callout">
        <div class="callout-icon"><i class="fa-solid fa-trophy"></i></div>
        <div class="callout-body">
          <h4>Kekuatan Bukti Sosial (Social Proof)</h4>
          <p>Orang Indonesia tidak suka menjadi orang pertama yang mencoba. Tempatkan screenshot chat kepuasan pelanggan, foto dokumentasi pengerjaan, dan angka riil proyek selesai di tengah-tengah halaman untuk melipatgandakan rasa yakin.</p>
        </div>
      </div>

      <h2>4. Price Anchoring & Penawaran Terbatas (Urgency)</h2>
      <p>
        Cantumkan harga secara transparan agar calon pelanggan yang menghubungi Anda adalah prospek yang sudah teredukasi dan memiliki budget yang cocok (*qualified leads*). Berikan insentif batas waktu seperti kuota bonus hosting gratis 1 tahun untuk memicu tindakan segera.
      </p>

      <h2>5. Tombol Floating WhatsApp di Pojok Bawah Layar</h2>
      <p>
        Tombol WhatsApp mengambang (*floating button*) di sudut kanan bawah yang tetap terlihat saat layar digulir ke atas maupun ke bawah terbukti <strong>menaikkan rasio klik hingga 45%</strong>. Pembeli yang sudah yakin dapat langsung menghubungi tanpa perlu repot mencari-cari nomor di bagian atas.
      </p>
    `,
  },
  {
    slug: "timeline-dan-tahapan-pembuatan-website-profesional",
    title: "Berapa Lama Waktu Pembuatan Website Profesional? Tahapan Lengkap dari Nol hingga Go-Live",
    excerpt:
      "Ingin tahu alur kerja pembuatan website agar proyek selesai tepat waktu? Simak timeline transparan 5 fase pengerjaan di Arjuna Dev mulai dari konsultasi hingga serah terima domain.",
    category: "Tips Klien",
    categorySlug: "tips-klien",
    readTime: "6 Menit Baca",
    date: "26 Sep 2026",
    isoDate: "2026-09-26T15:20:00Z",
    image: "/assets/blog/timeline_pembuatan_web.jpg",
    author: {
      name: "Haris Musafa",
      role: "Lead Full-Stack Web Engineer & Founder Arjuna Dev",
      avatar: "/assets/profile_tight.png",
    },
    tags: ["Tahapan Bikin Website", "Timeline Proyek", "Workflow Developer", "Arjuna Dev"],
    content: `
      <p class="lead-text">
        Bagi Anda yang sedang merencanakan peluncuran produk baru, kampanye promosi, atau modernisasi perusahaan, kepastian jadwal pengerjaan website adalah hal yang sangat vital. <strong>"Sebenarnya berapa lama proses pembuatan website dari awal hingga tayang resmi di internet?"</strong>
      </p>

      <p>
        Jangka waktu pengerjaan website profesional sangat bergantung pada kompleksitas fitur dan kesiapan materi dari klien. Berikut adalah estimasi waktu standar industri dan tahapan transparan yang kami jalankan di Arjuna Dev:
      </p>

      <h2>1. Estimasi Waktu Berdasarkan Jenis Website</h2>
      <ul>
        <li><strong>Landing Page Fokus Promosi:</strong> 3 hingga 5 Hari Kerja.</li>
        <li><strong>Website Company Profile / Profil Bisnis:</strong> 7 hingga 10 Hari Kerja.</li>
        <li><strong>Toko Online E-Commerce & Web Aplikasi Khusus:</strong> 10 hingga 14 Hari Kerja.</li>
      </ul>

      <h2>2. Lima Fase Alur Kerja Profesional di Arjuna Dev</h2>
      
      <h3>Fase 1: Konsultasi & Pengumpulan Materi (Hari 1 – 2)</h3>
      <p>
        Kami berdiskusi langsung dengan Anda via WhatsApp atau panggilan video untuk memahami tujuan bisnis, target audiens, dan preferensi visual. Klien menyiapkan logo, rincian produk/layanan, dan informasi kontak.
      </p>

      <h3>Fase 2: Perancangan Struktur & Copywriting (Hari 3 – 4)</h3>
      <p>
        Kami menyusun tata letak (*wireframe*), struktur navigasi, serta copywriting penjualan yang persuasif. Desain awal dipresentasikan untuk mendapatkan masukan persetujuan dari Anda sebelum proses koding dimulai.
      </p>

      <h3>Fase 3: Rekayasa Kode & Integrasi Sistem (Hari 5 – 8)</h3>
      <p>
        Tahap koding dimulai menggunakan teknologi Next.js. Seluruh komponen dibuat responsif mobile-friendly, terintegrasi tombol WhatsApp interaktif, form konsultasi, dan optimasi aset gambar modern.
      </p>

      <div class="article-callout">
        <div class="callout-icon"><i class="fa-solid fa-satellite-dish"></i></div>
        <div class="callout-body">
          <h4>Transparansi Live Tracking Arjuna Dev</h4>
          <p>Klien kami tidak perlu menebak-nebak status pengerjaan. Kami menyediakan link demonstrasi staging pribadi sehingga Anda dapat melihat progres koding website Anda berkembang dari hari ke hari secara nyata.</p>
        </div>
      </div>

      <h3>Fase 4: Quality Assurance, Uji Kecepatan & SEO (Hari 9 – 10)</h3>
      <p>
        Website diuji secara ketat di berbagai perangkat (iPhone, Android, Laptop, Tablet). Kami melakukan uji audit PageSpeed Google untuk memastikan skor performa hijau di atas 90 serta menanamkan metadata SEO dan sitemap XML.
      </p>

      <h3>Fase 5: Peluncuran Resmi (Go-Live) & Garansi 90 Hari (Hari 11)</h3>
      <p>
        Website resmi diarahkan ke nama domain utama Anda (.com / .id), aktivasi sertifikat SSL HTTPS aman, serta pendaftaran ke Google Search Console. Serah terima akun dan garansi perbaikan 90 hari resmi dimulai.
      </p>

      <h2>3. Apa yang Bisa Mempercepat Waktu Pengerjaan?</h2>
      <p>
        Faktor utama yang paling mempercepat peluncuran website adalah kesiapan materi dari pihak klien (seperti foto produk dan teks profil). Jika materi Anda sudah siap, proyek bahkan bisa selesai lebih cepat dari estimasi jadwal normal.
      </p>
    `,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogsData.find((b) => b.slug === slug);
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  return blogsData.filter((b) => b.slug !== currentSlug).slice(0, limit);
}

export function getAllCategories(): string[] {
  const categories = new Set(blogsData.map((b) => b.category));
  return Array.from(categories);
}
