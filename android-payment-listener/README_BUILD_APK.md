# Panduan Kompilasi Aplikasi Android Notif Listener menjadi File `.apk`

Project ini berisi Kode Sumber Native Android (Kotlin + Gradle) yang dirancang khusus untuk mendeteksi notifikasi transfer masuk dari **Bank Jago** (`tech.jago.app`), BCA, Mandiri, BRI, DANA, OVO, GoPay, dan aplikasi e-wallet lainnya.

---

## 🚀 Cara Kompilasi Menjadi APK Siap Pakai

Anda dapat mengompilasi kode sumber ini menjadi file `.apk` dengan **2 Metode Mudah**:

### Metode 1: Menggunakan Android Studio (Rekomendasi Utama)

1. Buka aplikasi **Android Studio** di komputer Anda.
2. Pilih **Open** / **Open an Existing Project**.
3. Navigasi dan pilih folder `android-payment-listener` di proyek ini.
4. Tunggu proses *Gradle Sync* selesai (sekitar 1-2 menit).
5. Pada menu atas Android Studio, klik:
   - **Build** ➔ **Build Bundle(s) / APK(s)** ➔ **Build APK(s)**
6. Setelah proses selesai, Android Studio akan menampilkan notifikasi dengan tombol **"locate"**.
7. File `app-debug.apk` atau `app-release.apk` siap ditransfer ke HP Android Anda dan di-install!

---

### Metode 2: Menggunakan Terminal / Command Line (Gradle Wrapper)

Jika Anda sudah memiliki **Java Development Kit (JDK 17+)** dan **Android SDK** terinstall:

1. Buka terminal/cmd di folder `android-payment-listener`.
2. Jalankan perintah kompilasi:
   - **Windows PowerShell**:
     ```powershell
     .\gradlew.bat assembleDebug
     ```
   - **Linux / Mac**:
     ```bash
     ./gradlew assembleDebug
     ```
3. File APK hasil kompilasi akan otomatis tersimpan di lokasi:
   `app/build/outputs/apk/debug/app-debug.apk`

---

## 📲 Cara Penggunaan di HP Android Admin

1. **Install APK**: Kirim file `.apk` ke HP Android admin (via WhatsApp/Telegram/USB) lalu install.
2. **Aktifkan Akses Notifikasi**:
   - Buka aplikasi **Arjuna Pay Listener**.
   - Klik tombol **"Aktifkan Akses Notifikasi"**.
   - Di menu Pengaturan Android yang terbuka, cari dan centang **Arjuna Pay Listener** ➔ Izinkan Akses Notifikasi.
3. **Pengaturan Webhook**:
   - Default Webhook URL: `https://arjunadev.com/api/payment/listener`
   - Default Secret Key: `harispayment`
   - Klik **Simpan Konfigurasi**.
4. **Uji Coba Koneksi**:
   - Klik tombol **"Tes Koneksi Webhook"**.
   - Buka portal admin atau bot Telegram Anda — notifikasi pengujian akan masuk dan tercatat di Log Riwayat aplikasi!

---

## 🔒 Keamanan & Fitur Otomatisasi

- **Akses Notifikasi Latar Belakang**: Aplikasi akan terus berjalan di background tanpa memakan banyak baterai.
- **Auto-Boot**: Setelah HP di-restart, aplikasi secara otomatis bersiap mendeteksi notifikasi mutasi.
- **Keamanan Webhook**: Setiap payload dilindungi header/body `secret_key` untuk mencegah permintaan palsu dari pihak yang tidak dikenal.
