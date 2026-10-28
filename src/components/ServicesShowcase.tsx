"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ServicesShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLImageElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const triangleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const workflowRef = useRef<HTMLDivElement>(null);

  const pricingPackages = [
    {
      id: "starter",
      tag: "BASIC",
      titleTop: "Landing Page",
      titleBottom: "Promosi & Penjualan",
      price: "Rp 500 rb",
      isBlue: false,
      features: [
        "1 Halaman Fokus Konversi (Landing Page)",
        "Section Tidak Terbatas Sesuai Konten",
        "Desain Responsif & Mobile-Friendly",
        "Integrasi Tombol WhatsApp Langsung",
        "Gratis Domain & Cloud Hosting 1 Tahun",
        "Waktu Pengerjaan 3 - 5 Hari Kerja",
      ],
      btnText: "Pilih Paket Ini",
      btnClass: "btn-card-blue",
      plusBtnClass: "btn-plus-blue",
      waText: "Halo Arjuna Webdev, saya tertarik dengan Paket Basic (Landing Page) Rp 500.000. Bisakah kita berdiskusi?",
    },
    {
      id: "advanced",
      tag: "ADVANCED",
      titleTop: "Company Profile",
      titleBottom: "Profil Usaha & Brand",
      price: "Rp 900 rb",
      isBlue: false,
      features: [
        "Hingga 5 Halaman Konten Lengkap",
        "Desain Sesuai Identitas Brand",
        "CMS & Dashboard Admin Kelola Konten",
        "Optimasi Struktur SEO On-Page Google",
        "Gratis Domain & Cloud Hosting 1 Tahun",
        "Garansi No Bugs & Pendampingan",
      ],
      btnText: "Pilih Paket Ini",
      btnClass: "btn-card-blue",
      plusBtnClass: "btn-plus-blue",
      waText: "Halo Arjuna Webdev, saya tertarik dengan Paket Advanced (Company Profile) Rp 900.000. Bisakah kita berdiskusi?",
    },
    {
      id: "bisnis",
      tag: "BUSINESS (POPULER)",
      titleTop: "Katalog & Toko",
      titleBottom: "Pemesanan Produk",
      price: "Rp 1,5 jt",
      isBlue: true,
      features: [
        "Katalog Produk Dinamis & Filter Kategori",
        "Sistem Checkout Langsung ke WhatsApp",
        "Integrasi Google Sheets / CMS Praktis",
        "Gratis Domain .COM & Hosting 1 Tahun",
        "Optimasi SEO On-Page & Google Indexing",
        "Waktu Pengerjaan 7 - 10 Hari Kerja",
      ],
      btnText: "Pesan Sekarang",
      btnClass: "btn-card-white",
      plusBtnClass: "btn-plus-dark",
      waText: "Halo Arjuna Webdev, saya tertarik dengan Paket Business (Katalog & Toko) Rp 1.500.000 (PALING POPULER). Bisakah kita berdiskusi?",
    },
    {
      id: "ecommerce",
      tag: "E-COMMERCE",
      titleTop: "Web App & Sistem",
      titleBottom: "Kebutuhan Khusus",
      price: "Rp 5 jt",
      isBlue: false,
      features: [
        "Website E-Commerce Full-Stack & Web App",
        "Sistem Login & Manajemen Pelanggan",
        "Integrasi Payment Gateway (QRIS & Bank)",
        "Free VPS 1 Bulan & Deploy Server SSL",
        "Garansi Pemeliharaan 3 Bulan Penuh",
      ],
      btnText: "Konsultasikan Kebutuhan",
      btnClass: "btn-card-blue",
      plusBtnClass: "btn-plus-blue",
      waText: "Halo Arjuna Webdev, saya tertarik dengan Paket E-Commerce / Web App Rp 5.000.000. Bisakah kita berdiskusi?",
    },
  ];

  const workflowSteps = [
    {
      id: "konsultasi",
      title: "Konsultasi",
      icon: "fa-solid fa-comments",
    },
    {
      id: "desain",
      title: "Desain",
      icon: "fa-solid fa-compass-drafting",
    },
    {
      id: "koding",
      title: "Koding",
      icon: "fa-solid fa-file-code",
    },
    {
      id: "peluncuran",
      title: "Peluncuran",
      icon: "fa-solid fa-rocket",
    },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const isDesktop = window.innerWidth >= 768;

      // 1. High-Impact Parallax on Hero Artwork (Avatar, Cyber Triangle, Ring)
      if (avatarRef.current) {
        gsap.to(avatarRef.current, {
          y: isDesktop ? -130 : -45,
          scale: isDesktop ? 1.08 : 1.02,
          rotateX: isDesktop ? -4 : 0,
          filter: isDesktop ? "drop-shadow(0 35px 65px rgba(0, 210, 255, 0.35))" : "none",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      if (ringRef.current) {
        gsap.to(ringRef.current, {
          y: isDesktop ? 70 : 25,
          rotation: isDesktop ? 150 : 60,
          scale: isDesktop ? 1.3 : 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      if (triangleRef.current) {
        gsap.to(triangleRef.current, {
          y: isDesktop ? 50 : 20,
          scale: isDesktop ? 1.18 : 1.05,
          rotation: isDesktop ? 20 : 8,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.6,
          },
        });
      }

      // Sparkles floating parallax
      gsap.utils.toArray<HTMLElement>(".services-sparkle").forEach((sparkle, idx) => {
        gsap.to(sparkle, {
          y: (idx % 2 === 0 ? -60 : 70),
          rotation: 45 * (idx + 1),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.8,
          },
        });
      });

      // 2. Header Title & Subtitle Entrance (Stable & Clean)
      gsap.from(".services-main-title, .services-main-sub", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
        clearProps: "all",
      });

      // 3. Staggered Entrance on the 4 Pricing Cards (Firm baseline, no overlapping drift)
      const pkgCards = gsap.utils.toArray<HTMLElement>(".service-pkg-card");
      if (pkgCards.length > 0) {
        gsap.from(pkgCards, {
          opacity: 0,
          y: 45,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          clearProps: "all",
          delay: 0.15,
        });
      }

      // 4. Workflow Section entrance & Real-Time Parallax
      if (workflowRef.current) {
        gsap.from(".services-wf-title-row, .services-wf-card, .services-wf-step-arrow", {
          y: 40,
          opacity: 0,
          scale: 0.92,
          duration: 0.75,
          stagger: 0.08,
          ease: "back.out(1.5)",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: workflowRef.current,
            start: "top 88%",
            once: true,
          },
        });

        // Connecting arrow slide animation on scroll
        gsap.fromTo(
          ".services-wf-step-arrow i",
          { x: -8, opacity: 0.4 },
          {
            x: 8,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: workflowRef.current,
              start: "top 90%",
              end: "bottom 60%",
              scrub: 1,
            },
          }
        );

        // Workflow section subtle lift on scroll
        gsap.to(workflowRef.current, {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: workflowRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.4,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 3D Card Tilt with smooth GSAP interpolation
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xNorm = (x / rect.width - 0.5) * 2;
    const yNorm = (y / rect.height - 0.5) * 2;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

    gsap.to(card, {
      rotationY: xNorm * 6,
      rotationX: -yNorm * 6,
      y: -6,
      transformPerspective: 900,
      duration: 0.25,
      ease: "power1.out",
      overwrite: "auto",
    });
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;

    const card = e.currentTarget;
    card.style.removeProperty("--mouse-x");
    card.style.removeProperty("--mouse-y");

    gsap.to(card, {
      rotationY: 0,
      rotationX: 0,
      y: 0,
      duration: 0.45,
      ease: "power2.out",
      overwrite: "auto",
      clearProps: "transform",
    });
  };

  return (
    <div ref={containerRef} className="services-page-hero-canvas">
      {/* 1. Unified Background Canvas matching Reference Image */}
      <div className="services-unified-bg" aria-hidden="true">
        {/* Subtle Tech Grid */}
        <div className="services-cyber-grid"></div>

        {/* Ambient Glows */}
        <div className="services-ambient-glow-top"></div>
        <div className="services-ambient-glow-right"></div>

        {/* Sparkle Stars */}
        <div className="services-sparkle sparkle-1">✦</div>
        <div className="services-sparkle sparkle-2">✦</div>
        <div className="services-sparkle sparkle-3">✦</div>

        {/* Cyber Circuit Trace Lines with Glowing Node */}
        <div className="services-circuit-trace">
          <span className="circuit-line-segment segment-1"></span>
          <span className="circuit-dot"></span>
          <span className="circuit-line-segment segment-2"></span>
        </div>

        {/* Concentric Cyber Arc Rings behind Arjuna */}
        <div ref={ringRef} className="services-cyber-ring"></div>

        {/* Cyber Triangle Pyramid behind Arjuna */}
        <div ref={triangleRef} className="services-cyber-triangle"></div>

        {/* Arjuna Standing Photo with Smooth Feathered Bottom */}
        <img
          ref={avatarRef}
          src="/assets/profile.png"
          alt="Arjuna Web Developer"
          className="services-avatar-img"
        />

        {/* Smooth Gradient Fade at Bottom of Avatar Canvas */}
        <div className="services-avatar-fade" aria-hidden="true"></div>
      </div>

      <div className="container services-inner-container">
        {/* 2. Top Header Title */}
        <div className="services-header-block">
          <h1 className="services-main-title">Paket Layanan</h1>
          <p className="services-main-sub">
            Solusi pembuatan website profesional untuk kebutuhan bisnis dan personal Anda
          </p>
        </div>

        {/* 3. The 4 Pricing Cards Row (Exact Match of Reference Image) */}
        <div className="services-cards-grid" ref={cardsRef}>
          {pricingPackages.map((pkg) => {
            const waUrl = `https://wa.me/6285733097867?text=${encodeURIComponent(pkg.waText)}`;

            return (
              <div
                key={pkg.id}
                className={`service-pkg-card ${pkg.isBlue ? "card-blue" : "card-white"}`}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
              >
                {/* Floating Plus Button Top Right */}
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`service-plus-action ${pkg.plusBtnClass}`}
                  aria-label={`Pilih ${pkg.titleBottom}`}
                >
                  <i className="fa-solid fa-plus"></i>
                </a>

                {/* Card Top Tag / Badge */}
                <div className="service-tag-wrap">
                  <span className="service-tag-label">{pkg.tag}</span>
                </div>

                {/* Card Title */}
                <h3 className="service-card-title">
                  <span className="title-top-line">{pkg.titleTop}</span>
                  <span className="title-bottom-line">{pkg.titleBottom}</span>
                </h3>

                {/* Price Tag */}
                <div className="service-card-price-tag">
                  <span className="pkg-price-val">{pkg.price}</span>
                  <span className="pkg-price-note">/ proyek</span>
                </div>

                {/* Features Checkmark List */}
                <ul className="service-features-list">
                  {pkg.features.map((feat, idx) => (
                    <li key={idx}>
                      <span className="check-bullet">
                        <i className="fa-solid fa-check"></i>
                      </span>
                      <span className="feature-text">{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Bottom CTA Pill Button */}
                <div className="service-cta-wrap">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`service-cta-btn ${pkg.btnClass}`}
                  >
                    {pkg.btnText}
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4. "Cara Kerja" (Workflow Process Row — Exact Match of Reference Image) */}
        <div className="services-workflow-section" ref={workflowRef}>
          <div className="services-wf-title-row">
            <h2 className="services-wf-heading">Cara Kerja</h2>
          </div>

          <div className="services-wf-track">
            {/* Back button indicator on the track */}
            <div className="services-wf-nav-indicator" aria-label="Langkah Sebelumnya">
              <i className="fa-solid fa-arrow-left"></i>
            </div>

            {/* Connecting Arrow between back button and first card */}
            <div className="services-wf-step-arrow" aria-hidden="true">
              <i className="fa-solid fa-arrow-right"></i>
            </div>

            {workflowSteps.map((step, idx) => (
              <React.Fragment key={step.id}>
                {/* Workflow Step Card */}
                <div className="services-wf-card">
                  <div className="services-wf-icon-box">
                    <i className={step.icon}></i>
                  </div>
                  <span className="services-wf-card-label">{step.title}</span>
                </div>

                {/* Connecting Arrow between cards */}
                {idx < workflowSteps.length - 1 && (
                  <div className="services-wf-step-arrow" aria-hidden="true">
                    <i className="fa-solid fa-arrow-right"></i>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
