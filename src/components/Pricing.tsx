"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Pricing() {
  const pricingSectionRef = useRef<HTMLElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);

  const pricingPlans = [
    {
      id: "landing-page",
      tag: "BASIC",
      tierClass: "basic",
      topIcon: "fa-solid fa-bolt",
      iconBgClass: "icon-bg-blue",
      planTitle: "Landing Page",
      planSummary: "Cocok untuk promosi produk, jasa, atau perkenalan bisnis Anda. Desain modern, ringan, dan fokus pada konversi.",
      fromText: "Mulai dari",
      priceAmount: "500.000",
      pricePeriod: "/ sekali bayar",
      priceColorClass: "text-blue",
      giftTitle: "Termasuk Domain 1 Tahun",
      giftSub: "(.com / .id / .co.id)",
      giftBoxClass: "gift-box-blue",
      isFeatured: false,
      checkColorClass: "check-blue",
      features: [
        "1 Halaman (Landing Page)",
        "Desain Modern & Responsif (HP, Tablet, Desktop)",
        "Form Kontak / WhatsApp",
        "Integrasi Google Maps (lokasi bisnis)",
        "SEO Dasar (agar mudah ditemukan)",
        "Gratis Revisi 3x (jika ada perubahan/penyesuaian)",
      ],
      btnText: "Pilih Paket Ini",
      btnClass: "btn-primary-solid",
      waText: "Halo Arjuna Dev, saya berminat dengan Paket Basic (Landing Page) Rp 500.000. Mohon informasi kelanjutannya.",
    },
    {
      id: "company-profile",
      tag: "STANDARD",
      tierClass: "standard",
      topIcon: "fa-solid fa-building",
      iconBgClass: "icon-bg-indigo",
      planTitle: "Company Profile",
      planSummary: "Tampilkan identitas dan keunggulan bisnis Anda secara profesional. Cocok untuk perusahaan, UMKM, dan toko online.",
      fromText: "Mulai dari",
      priceAmount: "900.000",
      pricePeriod: "/ sekali bayar",
      priceColorClass: "text-blue",
      giftTitle: "Termasuk Domain 1 Tahun + Hosting 1 Tahun",
      giftSub: "(Shared Hosting / SSD)",
      giftBoxClass: "gift-box-blue",
      isFeatured: false,
      checkColorClass: "check-indigo",
      features: [
        "5 Halaman (Beranda, Tentang, Layanan, Galeri, Kontak)",
        "Desain Modern & Responsif",
        "CMS Mudah Digunakan (Tanpa Coding)",
        "Integrasi WhatsApp, Google Maps, & Form Kontak",
        "SEO Friendly (struktur SEO dasar)",
        "Gratis Revisi 5x (jika ada perubahan/penyesuaian)",
      ],
      btnText: "Pilih Paket Ini",
      btnClass: "btn-primary-outline",
      waText: "Halo Arjuna Dev, saya berminat dengan Paket Standard (Company Profile) Rp 900.000. Mohon informasi kelanjutannya.",
    },
    {
      id: "toko-online",
      tag: "BUSINESS",
      tierClass: "business",
      ribbonLeft: "PALING POPULER",
      ribbonRight: "TERBAIK UNTUK BISNIS BERKEMBANG",
      topIcon: "fa-solid fa-store",
      iconBgClass: "icon-bg-teal",
      planTitle: "Toko Online / E-Commerce",
      planSummary: "Solusi lengkap untuk menjual produk secara online dengan fitur keranjang, pembayaran, dan manajemen produk yang mudah.",
      fromText: "Mulai dari",
      priceAmount: "1.500.000",
      pricePeriod: "/ sekali bayar",
      priceColorClass: "text-white",
      giftTitle: "Termasuk Domain 1 Tahun + Hosting 1 Tahun",
      giftSub: "(Cloud Hosting / SSD)",
      giftBoxClass: "gift-box-cyan",
      isFeatured: true,
      checkColorClass: "check-teal",
      features: [
        "5–10 Halaman + Toko Online Lengkap",
        "CMS + Dashboard Admin",
        "Integrasi Payment Gateway (Midtrans/Xendit) (QRIS, E-wallet, Transfer Bank, VA)",
        "Manajemen Produk, Stok, & Pesanan",
        "Integrasi WhatsApp & Notifikasi Email",
        "SEO Friendly + Optimasi Kecepatan",
        "Gratis Revisi Tanpa Batas (Unlimited revisi minor)",
      ],
      btnText: "Pilih Paket Ini",
      btnClass: "btn-gradient-cyan",
      waText: "Halo Arjuna Dev, saya berminat dengan Paket Business (Toko Online / E-Commerce) Rp 1.500.000 (PALING POPULER). Saya ingin konsultasi gratis.",
    },
    {
      id: "custom-system",
      tag: "CUSTOM",
      tierClass: "custom",
      topIcon: "fa-solid fa-gear",
      iconBgClass: "icon-bg-purple",
      planTitle: "Web App & Sistem Khusus",
      planSummary: "Untuk kebutuhan bisnis yang lebih kompleks. Mulai dari aplikasi internal, sistem manajemen, hingga integrasi API dan fitur khusus lainnya.",
      fromText: "Mulai dari",
      priceAmount: "2.500.000",
      pricePeriod: "/ sekali bayar",
      priceColorClass: "text-purple",
      giftTitle: "Gratis Domain 1 Tahun + Hosting 1 Tahun",
      giftSub: "(Cloud/VPS – sesuai kebutuhan)",
      giftBoxClass: "gift-box-purple",
      isFeatured: false,
      checkColorClass: "check-purple",
      features: [
        "Website / Web App / Sistem Kustom",
        "Desain UI/UX Profesional & Modern",
        "Integrasi API (Payment, Kurir, WA, dll)",
        "Keamanan Data & Backup",
        "Scalable & Mudah Dikembangkan",
        "Gratis Revisi Tanpa Batas (selama development)",
        "Gratis Konsultasi & Support 3 Bulan",
      ],
      btnText: "Konsultasi Kebutuhan Anda",
      btnClass: "btn-purple-outline",
      waText: "Halo Arjuna Dev, saya tertarik dengan Paket Custom (Web App & Sistem Khusus) Rp 2.500.000. Mohon info penawaran resminya.",
    },
  ];

  const trustFeatures = [
    {
      icon: "fa-solid fa-rocket",
      title: "Pengerjaan Cepat",
      desc: "Rata-rata 3-14 hari (tergantung paket)",
    },
    {
      icon: "fa-solid fa-shield-halved",
      title: "Kualitas Profesional",
      desc: "Desain modern, kode rapi, dan aman",
    },
    {
      icon: "fa-solid fa-code",
      title: "Teknologi Terbaik",
      desc: "Next.js, React, dan database modern",
    },
    {
      icon: "fa-solid fa-headset",
      title: "Support & Maintenance",
      desc: "Bantuan 3 bulan gratis, update ringan",
    },
    {
      icon: "fa-solid fa-thumbs-up",
      title: "Harga Transparan",
      desc: "Tanpa biaya tersembunyi",
    },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const section = pricingSectionRef.current;
      if (!section) return;

      // 1. Header Reveal (Badge, Title, Subtitle)
      const headerEls = section.querySelectorAll(
        ".section-badge-center, .section-title-dark, .section-sub-dark"
      );
      gsap.fromTo(
        headerEls,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 2. 4 Pricing Cards Stagger Entrance
      const cards = section.querySelectorAll<HTMLElement>(".pricing-card");
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 45,
            rotateX: 8,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            clearProps: "all",
            scrollTrigger: {
              trigger: cardsGridRef.current || section,
              start: "top 84%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // 3. Desktop Interactive 3D Card Hover Tilt
        if (window.innerWidth >= 768) {
          cards.forEach((card) => {
            const inner = card.querySelector<HTMLElement>(".card-inner");
            const target = inner || card;

            const onMouseMove = (e: MouseEvent) => {
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;
              const tiltX = (x - centerX) / centerX;
              const tiltY = (y - centerY) / centerY;

              gsap.to(target, {
                rotateX: -tiltY * 5,
                rotateY: tiltX * 5,
                transformPerspective: 1000,
                duration: 0.35,
                ease: "power2.out",
              });
            };

            const onMouseLeave = () => {
              gsap.to(target, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: "power2.out",
              });
            };

            card.addEventListener("mousemove", onMouseMove);
            card.addEventListener("mouseleave", onMouseLeave);
          });
        }
      }

      // 4. Trust Strip & Contact Entrance
      const bottomEls = section.querySelectorAll(".pricing-trust-banner-five, .pricing-bottom-bar");
      if (bottomEls.length > 0) {
        gsap.fromTo(
          bottomEls,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bottomEls[0],
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, pricingSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="layanan" className="section pricing-section light-theme" ref={pricingSectionRef}>
      {/* Subtle light background mesh */}
      <div className="pricing-light-mesh" aria-hidden="true"></div>

      <div className="container relative-z">
        {/* Section Header (Persis Sesuai Gambar Referensi) */}
        <div className="section-badge-center">
          <div className="pricing-brand-badge-pill">
            <span className="brand-pill-logo">
              <i className="fa-solid fa-code"></i> Arjuna Dev
            </span>
            <span className="brand-pill-separator">|</span>
            <span className="brand-pill-tagline">Website Profesional untuk Bisnis Anda</span>
          </div>
        </div>

        <h2 className="section-title-dark text-center">
          Pilih Paket Website yang Sesuai dengan Kebutuhan Bisnismu
        </h2>
        <p className="section-sub-dark text-center">
          Dari landing page sederhana hingga sistem lengkap, kami siap membantu UMKM, toko online, dan bisnis Anda tumbuh lebih cepat.
        </p>

        {/* 4 Pricing Cards Grid */}
        <div className="pricing-cards-grid" ref={cardsGridRef}>
          {pricingPlans.map((plan) => {
            const waUrl = `https://wa.me/6285733097867?text=${encodeURIComponent(plan.waText)}`;

            return (
              <div
                key={plan.id}
                className={`pricing-card ${plan.isFeatured ? "card-featured" : "card-light"} ${plan.tierClass}-tier`}
              >
                {/* Top ribbon if featured */}
                {plan.isFeatured && plan.ribbonLeft && (
                  <div className="pricing-popular-ribbon-split">
                    <span className="ribbon-tag-primary">
                      <i className="fa-solid fa-crown"></i> {plan.ribbonLeft}
                    </span>
                    <span className="ribbon-tag-secondary">{plan.ribbonRight}</span>
                  </div>
                )}

                <div className="card-inner">
                  <div className="pricing-card-header">
                    {/* Top Identity: Icon Box + Outline Tag Badge */}
                    <div className="card-top-identity">
                      <div className={`card-top-icon-box ${plan.iconBgClass}`}>
                        <i className={plan.topIcon}></i>
                      </div>
                      <span className={`tier-badge-pill-outline ${plan.tierClass}`}>
                        {plan.tag}
                      </span>
                    </div>

                    <h3 className={`pricing-plan-title ${plan.isFeatured ? "text-white" : ""}`}>
                      {plan.planTitle}
                    </h3>

                    <p className={`pricing-plan-summary ${plan.isFeatured ? "text-slate-300" : ""}`}>
                      {plan.planSummary}
                    </p>

                    {/* Price Block */}
                    <div className="pricing-price-container">
                      <span className={`pricing-from-label ${plan.isFeatured ? "text-slate-400" : ""}`}>
                        {plan.fromText}
                      </span>
                      <div className="pricing-price-row">
                        <span className={`pricing-currency ${plan.priceColorClass}`}>
                          Rp
                        </span>
                        <span className={`pricing-number ${plan.priceColorClass}`}>
                          {plan.priceAmount}
                        </span>
                        <span className={`pricing-period-text ${plan.isFeatured ? "text-slate-300" : ""}`}>
                          {plan.pricePeriod}
                        </span>
                      </div>
                    </div>

                    {/* Highlight Box (Domain & Hosting Gift) */}
                    <div className={`pricing-gift-box ${plan.giftBoxClass}`}>
                      <div className="gift-box-icon">
                        <i className="fa-solid fa-gift"></i>
                      </div>
                      <div className="gift-box-text">
                        <strong className="gift-title">{plan.giftTitle}</strong>
                        <span className="gift-subtitle">{plan.giftSub}</span>
                      </div>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="pricing-feature-list">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx}>
                        <span className={`feature-check-icon ${plan.checkColorClass}`}>
                          <i className="fa-solid fa-check"></i>
                        </span>
                        <span className={`feature-item-text ${plan.isFeatured ? "text-white" : ""}`}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Action Button */}
                  <div className="pricing-action-wrap">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`pricing-action-btn ${plan.btnClass}`}
                    >
                      <span>{plan.btnText}</span>
                      <i className="fa-solid fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 5-Item Trust Banner Strip */}
        <div className="pricing-trust-banner-five">
          {trustFeatures.map((item, idx) => (
            <div key={idx} className="trust-col-item">
              <div className="trust-col-icon">
                <i className={item.icon}></i>
              </div>
              <div className="trust-col-info">
                <strong className="trust-col-title">{item.title}</strong>
                <span className="trust-col-desc">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom WhatsApp Contact Strip */}
        <div className="pricing-bottom-bar">
          <div className="pricing-bottom-bar-inner">
            <i className="fa-brands fa-whatsapp whatsapp-icon-green"></i>
            <span className="bar-label">Chat Sekarang via WhatsApp</span>
            <span className="bar-divider">|</span>
            <a
              href="https://wa.me/6285733097867?text=Halo%20Arjuna%20Dev,%20saya%20ingin%20konsultasi%20paket%20website"
              target="_blank"
              rel="noopener noreferrer"
              className="bar-phone"
            >
              0857 3309 7867
            </a>
            <span className="bar-divider">|</span>
            <span className="bar-url">
              atau kunjungi <a href="https://arjunadev.com" target="_blank" rel="noopener noreferrer"><strong>arjunadev.com</strong></a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
