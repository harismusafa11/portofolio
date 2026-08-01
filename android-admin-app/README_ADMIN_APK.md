# 📱 Panduan Admin Panel Android APK (Kotlin)

Aplikasi Native Android berbasis **Kotlin** untuk mengelola Admin Portal (`/secure-portal-admin`) langsung dari smartphone Android, dilengkapi dengan **Real-Time Notification Listener** untuk pesan **Live Chat** dan **Orderan Baru**.

---

## ✨ Fitur Utama Aplikasi Admin APK

1. **Aplikasi Native Kotlin Super Ringan**:
   - Dibuat dengan Kotlin murni, hemat daya baterai dan memori RAM.
   - WebView teroptimasi dengan dukungan session login permanen & Dark Mode.
   - **File & Photo Chooser**: Mendukung upload bukti / gambar langsung dari galeri HP saat membalas pesan livechat.
   - **Pull-to-Refresh**: Cukup usap layar ke bawah untuk memperbarui data admin.

2. **Mesin Notifikasi Otomatis (Background Listener)**:
   - **Notifikasi Orderan Baru**: Bunyi notifikasi, getaran, dan banner judul + nama pemesan + nama paket + total harga rupiah.
   - **Notifikasi Chat Masuk**: Memunculkan notifikasi setiap ada pesan chat baru dari pelanggan.
   - **Direct Deep-Linking**: Mengetuk notifikasi langsung mengarahkan Anda ke layar Chat atau Layar Orderan terkait.
   - **Auto-Start Boot**: Layanan notifikasi tetap aktif secara otomatis setelah HP dimatikan/di-restart.

---

## 🛠️ Lokasi File Hasil Kompilasi APK

File APK hasil kompilasi Gradle dapat ditemukan di:
`android-admin-app/app/build/outputs/apk/debug/app-debug.apk`

---

## 🚀 Cara Kompilasi Manual (Jika Ingin Re-build)

1. Buka Terminal / CMD di folder `android-admin-app`.
2. Jalankan perintah:
   ```cmd
   set JAVA_HOME=C:\Program Files\Android\Android Studio\jbr
   gradlew.bat assembleDebug
   ```
3. File `.apk` siap diinstall di HP Android Admin.
