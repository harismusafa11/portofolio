"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeDrawer = () => setMobileMenuOpen(false);

  const isAboutPage = pathname === "/tentang";
  const isPortfolioPage = pathname === "/portofolio";
  const isServicesPage = pathname === "/layanan";
  const isBlogDetailPage = pathname.startsWith("/blog/") && pathname !== "/blog";

  let headerModeClass = "";
  if (isServicesPage) headerModeClass = "services-header-mode";
  else if (isAboutPage) headerModeClass = "about-header-mode";
  else if (isPortfolioPage) headerModeClass = "portfolio-header-mode";
  else if (isBlogDetailPage) headerModeClass = "blog-detail-header-mode";

  return (
    <>
      <header
        id="main-header"
        className={`site-header ${scrolled ? "scrolled" : ""} ${headerModeClass}`}
      >
        <div className="header-bg-angle" aria-hidden="true"></div>
        <div className="header-inner">
          {/* Logo Brand Kiri */}
          <Link href="/" className="site-logo" aria-label="ARJUNA WEBDEV">
            <img
              src="/assets/logo.png"
              alt="ARJUNA WEBDEV Logo"
              className="logo-symbol"
            />
            <span className="logo-text">
              ARJUNA <span className="logo-sub">WEBDEV</span>
            </span>
          </Link>

          {/* Nav Links - Konsisten di Semua Halaman Menyesuaikan Home Page */}
          <nav className="header-nav">
            <ul className="nav-menu">
              <li>
                <Link
                  href="/"
                  className={`nav-item ${pathname === "/" ? "active" : ""}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/layanan"
                  className={`nav-item ${pathname === "/layanan" ? "active" : ""}`}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/portofolio"
                  className={`nav-item ${pathname === "/portofolio" ? "active" : ""}`}
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className={`nav-item ${pathname.startsWith("/blog") ? "active" : ""}`}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/tentang"
                  className={`nav-item ${pathname === "/tentang" ? "active" : ""}`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/kontak"
                  className={`nav-btn-contact ${pathname === "/kontak" ? "btn-active" : ""}`}
                >
                  <span>Contact</span>
                  <i className="fa-solid fa-angle-down"></i>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Hamburger Toggle */}
          <button
            id="mobile-toggle"
            className="mobile-toggle-btn"
            aria-label="Buka Menu Navigasi"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        id="mobile-menu"
        className={`mobile-drawer ${mobileMenuOpen ? "active" : ""}`}
      >
        <ul className="mobile-nav-links">
          <li>
            <Link
              href="/"
              className={`mobile-link ${pathname === "/" ? "active" : ""}`}
              onClick={closeDrawer}
            >
              Home / Beranda
            </Link>
          </li>
          <li>
            <Link
              href="/layanan"
              className={`mobile-link ${pathname === "/layanan" ? "active" : ""}`}
              onClick={closeDrawer}
            >
              Paket Layanan
            </Link>
          </li>
          <li>
            <Link
              href="/portofolio"
              className={`mobile-link ${pathname === "/portofolio" ? "active" : ""}`}
              onClick={closeDrawer}
            >
              Portfolio Proyek
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className={`mobile-link ${pathname.startsWith("/blog") ? "active" : ""}`}
              onClick={closeDrawer}
            >
              Blog & Artikel
            </Link>
          </li>
          <li>
            <Link
              href="/tentang"
              className={`mobile-link ${pathname === "/tentang" ? "active" : ""}`}
              onClick={closeDrawer}
            >
              Tentang Arjuna
            </Link>
          </li>
          <li>
            <Link
              href="/kontak"
              className={`mobile-link ${pathname === "/kontak" ? "active" : ""}`}
              onClick={closeDrawer}
            >
              Hubungi Kami
            </Link>
          </li>
        </ul>
        <div className="mobile-drawer-cta">
          <Link
            href="/kontak"
            className="btn btn-blue-pill btn-block"
            onClick={closeDrawer}
          >
            Konsultasi Sekarang
          </Link>
        </div>
      </div>
    </>
  );
}
