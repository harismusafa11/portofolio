"use client";

import React, { useState, memo } from "react";
import { Send, PhoneCall, Mail, MapPin, CheckCircle2 } from "lucide-react";
import { WhatsAppLogo, InstagramLogo } from "@/components/icons/BrandIcons";

export const ContactApp: React.FC = memo(function ContactApp() {
  const [name, setName] = useState("");
  const [projectType, setProjectType] = useState("Web Development");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedText = `Halo Haris Musafa (Arjuna Dev),\nNama: ${name || "Pengunjung Website"}\nTipe Proyek: ${projectType}\nPesan: ${message || "Saya berminat konsultasi pembuatan proyek."}`;
    const waUrl = `https://wa.me/6285693366142?text=${encodeURIComponent(formattedText)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <div className="flex flex-col gap-5 text-gray-200 font-sans select-text">
      {/* Header Banner */}
      <div className="p-5 rounded-xl bg-[#242424] border border-white/10 shadow-lg flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <PhoneCall className="w-5 h-5 text-emerald-400" />
            <span>Hubungi Haris Musafa (Arjuna Dev)</span>
          </h2>
          <p className="text-xs text-gray-300 mt-1">
            Siap mendiskusikan kebutuhan website atau aplikasi mobile Anda. Bebas konsultasi ide & estimasi biaya!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Left Side: Contact Cards */}
        <div className="flex flex-col gap-3">
          {/* Official WhatsApp Direct Card */}
          <a
            href="https://wa.me/6285693366142?text=Halo%20Haris%20Musafa,%20saya%20tertarik%20bekerja%20sama."
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-[#222222] border border-white/10 hover:border-emerald-500/50 transition-all flex items-center gap-4 group shadow-sm"
          >
            <div className="w-12 h-12 rounded-xl bg-[#101010] border border-white/10 flex items-center justify-center text-white shadow group-hover:scale-105 transition-transform">
              <WhatsAppLogo className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">WhatsApp Official</span>
              <div className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                0856 9336 6142
              </div>
              <p className="text-[11px] text-gray-400">Respon Cepat & Direct Chat</p>
            </div>
          </a>

          {/* Official Instagram Card */}
          <a
            href="https://instagram.com/haris_musafa_"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-[#222222] border border-white/10 hover:border-purple-500/50 transition-all flex items-center gap-4 group shadow-sm"
          >
            <div className="w-12 h-12 rounded-xl bg-[#101010] border border-white/10 flex items-center justify-center text-white shadow group-hover:scale-105 transition-transform">
              <InstagramLogo className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider">Instagram Official</span>
              <div className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                @haris_musafa_
              </div>
              <p className="text-[11px] text-gray-400">Update Proyek & Portfolio Activity</p>
            </div>
          </a>

          {/* Quick Info */}
          <div className="p-4 rounded-xl bg-[#222222] border border-white/10 flex flex-col gap-2.5 text-xs text-gray-300">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-sky-400" />
              <span>Email: arjunawebdev@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Lokasi: Ds. Pamutih, Kec. Ulujami, Kab. Pemalang, Jawa Tengah</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Jam Kerja: Senin - Sabtu (08:00 - 21:00 WIB)</span>
            </div>
          </div>
        </div>

        {/* Right Side: Quick Form */}
        <form onSubmit={handleSubmit} className="p-5 rounded-xl bg-[#222222] border border-white/10 flex flex-col gap-3.5 shadow-sm">
          <h3 className="text-sm font-bold text-white mb-1">Kirim Pesan Direct WA</h3>

          <div>
            <label className="text-[11px] text-gray-300 block mb-1">Nama Anda / Perusahaan:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Budi (Toko Fashion ID)"
              className="w-full px-3 py-2 rounded-lg bg-[#181818] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#0078d4] focus:ring-1 focus:ring-[#0078d4]"
            />
          </div>

          <div>
            <label className="text-[11px] text-gray-300 block mb-1">Kebutuhan Proyek:</label>
            <select
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#181818] border border-white/10 text-xs text-white focus:outline-none focus:border-[#0078d4] focus:ring-1 focus:ring-[#0078d4]"
            >
              <option value="Landing Page / Starter Web">Landing Page / Starter Web</option>
              <option value="Business & E-Commerce Web">Business & E-Commerce Web</option>
              <option value="Custom Web App / SaaS System">Custom Web App / SaaS System</option>
              <option value="Mobile App Development (Android/iOS)">Mobile App Development (Android/iOS)</option>
              <option value="Konsultasi Custom Project">Konsultasi Custom Project</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] text-gray-300 block mb-1">Ringkasan Pesan:</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              placeholder="Tuliskan gambaran singkat proyek yang ingin Anda buat..."
              className="w-full px-3 py-2 rounded-lg bg-[#181818] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#0078d4] focus:ring-1 focus:ring-[#0078d4] resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-[#107c41] hover:bg-[#0f6cbd] text-white text-xs font-bold shadow transition-all flex items-center justify-center gap-2 mt-1 border border-white/10 active:scale-95"
          >
            <WhatsAppLogo className="w-4 h-4" />
            <span>Kirim via WhatsApp Direct</span>
          </button>
        </form>
      </div>
    </div>
  );
});
