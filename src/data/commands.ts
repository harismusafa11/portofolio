export interface CommandHelp {
  command: string;
  description: string;
}

export const TERMINAL_COMMANDS: CommandHelp[] = [
  { command: "help", description: "Menampilkan daftar seluruh perintah yang tersedia" },
  { command: "about", description: "Menampilkan profil & riwayat Haris Musafa (Arjuna Dev)" },
  { command: "skills", description: "Menampilkan daftar keahlian & tech stack utama" },
  { command: "services", description: "Menampilkan paket jasa pembuatan website & mobile app" },
  { command: "portfolio", description: "Menampilkan daftar proyek unggulan Arjuna Dev" },
  { command: "taskmgr", description: "Membuka aplikasi Task_Manager.exe" },
  { command: "paint", description: "Membuka aplikasi Paint_Notes.exe (Kanvas Sketsa)" },
  { command: "neofetch", description: "Menampilkan spesifikasi sistem Arjuna Dev OS & info developer" },
  { command: "sudo hire-me", description: "Easter egg: Membuka link WhatsApp konsultasi langsung" },
  { command: "contact", description: "Menampilkan kontak WhatsApp & Instagram resmi" },
  { command: "date", description: "Menampilkan tanggal & waktu sistem saat ini" },
  { command: "clear", description: "Membersihkan layar terminal" },
  { command: "matrix", description: "Easter egg: Membuka mode animasi hujan kode ala film The Matrix" }
];
