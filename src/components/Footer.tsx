"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: "Beranda Utama", href: "/" },
    { label: "Paket Layanan & Harga", href: "/layanan" },
    { label: "Portofolio Proyek", href: "/portofolio" },
    { label: "Blog & Wawasan Bisnis", href: "/blog" },
    { label: "Tentang Arjuna", href: "/tentang" },
    { label: "Hubungi & Diskusi", href: "/kontak" },
  ];

  const servicesLinks = [
    { label: "Landing Page Fokus Konversi", href: "/layanan" },
    { label: "Website Company Profile", href: "/layanan" },
    { label: "Toko Online WhatsApp Checkout", href: "/layanan" },
    { label: "Aplikasi Web & Dashboard Admin", href: "/layanan" },
    { label: "Redesign Website Modern", href: "/layanan" },
    { label: "Optimasi PageSpeed & SEO", href: "/layanan" },
  ];

  const socialLinks = [
    {
      name: "WhatsApp",
      icon: "fa-brands fa-whatsapp",
      href: "https://wa.me/6285733097867?text=Halo%20Arjuna%20Webdev,%20saya%20tertarik%20konsultasi%20website",
      color: "#25D366",
    },
    {
      name: "GitHub",
      icon: "fa-brands fa-github",
      href: "https://github.com/harismusafa11",
      color: "#F8FAFC",
    },
    {
      name: "LinkedIn",
      icon: "fa-brands fa-linkedin-in",
      href: "https://linkedin.com",
      color: "#0A66C2",
    },
    {
      name: "Instagram",
      icon: "fa-brands fa-instagram",
      href: "https://instagram.com/haris_musafa_",
      color: "#E1306C",
    },
    {
      name: "Email",
      icon: "fa-solid fa-envelope",
      href: "mailto:arjunawebdev@gmail.com",
      color: "#00D2FF",
    },
  ];

  const badges = [
    { icon: "fa-solid fa-bolt", title: "PageSpeed 90+", desc: "Loading secepat kilat" },
    { icon: "fa-solid fa-shield-halved", title: "Garansi Bebas Bug", desc: "Dukungan pasca-peluncuran" },
    { icon: "fa-solid fa-mobile-screen-button", title: "100% Responsif", desc: "Sempurna di semua HP" },
    { icon: "fa-solid fa-headset", title: "Konsultasi Gratis", desc: "Tanya jawab tanpa komitmen" },
  ];

  return (
    <footer className="site-footer">
      <div className="container relative-z">
        {/* 1. Pre-Footer Value Chips / Feature Strip */}
        <div className="footer-features-strip">
          {badges.map((b, i) => (
            <div key={i} className="footer-feature-item">
              <div className="footer-feature-icon">
                <i className={b.icon}></i>
              </div>
              <div className="footer-feature-text">
                <strong className="footer-feature-title">{b.title}</strong>
                <span className="footer-feature-desc">{b.desc}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 2. Main Footer Grid (4 Columns) */}
        <div className="footer-grid">
          {/* Kolom 1: Brand Info & Status */}
          <div className="footer-col brand-col">
            <Link href="/" className="site-logo footer-logo">
              <img
                src="/assets/logo.png"
                alt="ARJUNA WEBDEV"
                className="logo-symbol footer-logo-img"
              />
              <span className="logo-text text-white">
                ARJUNA <span className="logo-sub">WEBDEV</span>
              </span>
            </Link>

            {/* Live Availability Status Tag (Clean, No Neon) */}
            <div className="footer-status-pill">
              <span className="footer-status-dot"></span>
              <span className="footer-status-text">
                Tersedia untuk Proyek Baru &bull; <strong>Mulai Minggu Ini</strong>
              </span>
            </div>

            <p className="footer-about-text">
              Jasa pembuatan website profesional, cepat, responsif, dan ramah SEO.
              Menghadirkan solusi digital yang membantu bisnis Anda tampil prestisius,
              terpercaya, dan menghasilkan konversi penjualan nyata.
            </p>

            {/* Social Media Link Buttons (Clean High Contrast) */}
            <div className="footer-social-row">
              {socialLinks.map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn"
                  aria-label={s.name}
                >
                  <i className={s.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Kolom 2: Navigasi Cepat */}
          <div className="footer-col">
            <h4 className="footer-heading">
              <span>Navigasi Cepat</span>
            </h4>
            <ul className="footer-links">
              {navLinks.map((item, idx) => (
                <li key={idx}>
                  <Link href={item.href} className="footer-link-item">
                    <i className="fa-solid fa-chevron-right footer-link-arrow"></i>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Layanan Unggulan */}
          <div className="footer-col">
            <h4 className="footer-heading">
              <span>Layanan Unggulan</span>
            </h4>
            <ul className="footer-links">
              {servicesLinks.map((item, idx) => (
                <li key={idx}>
                  <Link href={item.href} className="footer-link-item">
                    <i className="fa-solid fa-chevron-right footer-link-arrow"></i>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 4: Hubungi & Kontak Langsung */}
          <div className="footer-col">
            <h4 className="footer-heading">
              <span>Kontak Langsung</span>
            </h4>
            <div className="footer-contact-info">
              {/* WhatsApp Highlight Box */}
              <a
                href="https://wa.me/6285733097867?text=Halo%20Arjuna%20Webdev,%20saya%20ingin%20konsultasi%20website"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-wa-card"
              >
                <div className="footer-wa-icon">
                  <i className="fa-brands fa-whatsapp"></i>
                </div>
                <div className="footer-wa-meta">
                  <span className="footer-wa-kicker">CHAT WHATSAPP RESMI</span>
                  <strong className="footer-wa-number">+62 857-3309-7867</strong>
                  <span className="footer-wa-action">Respon cepat dalam hitungan menit</span>
                </div>
              </a>

              <div className="footer-contact-details">
                <a href="mailto:arjunawebdev@gmail.com" className="footer-detail-item">
                  <i className="fa-solid fa-envelope footer-detail-icon"></i>
                  <span>arjunawebdev@gmail.com</span>
                </a>
                <div className="footer-detail-item">
                  <i className="fa-solid fa-clock footer-detail-icon"></i>
                  <span>Senin - Sabtu: 08.00 - 21.00 WIB</span>
                </div>
                <div className="footer-detail-item">
                  <i className="fa-solid fa-location-dot footer-detail-icon"></i>
                  <span>Ds. Pamutih, Ulujami, Kab. Pemalang, Jawa Tengah</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Bottom Legal & Back to Top Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-bottom-left">
            <p className="copyright-text">
              &copy; {new Date().getFullYear()} <strong>ARJUNA WEBDEV</strong>. Seluruh Hak Cipta Dilindungi.
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="footer-back-to-top"
            aria-label="Kembali ke atas halaman"
          >
            <span>Kembali ke Atas</span>
            <div className="footer-top-icon-circle">
              <i className="fa-solid fa-arrow-up"></i>
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
