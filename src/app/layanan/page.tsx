"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import ServicesShowcase from "@/components/ServicesShowcase";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function ServicesPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const pillarsSectionRef = useRef<HTMLElement>(null);
  const inclusiveSectionRef = useRef<HTMLElement>(null);
  const faqSectionRef = useRef<HTMLElement>(null);
  const ctaSectionRef = useRef<HTMLElement>(null);

  const pillars = [
    {
      icon: "fa-bolt",
      title: "Performa Kecepatan Optimal",
      desc: "Dioptimasi dengan arsitektur Next.js dan kompresi cerdas WebP, memastikan waktu muat berada pada standar Google Core Web Vitals untuk menekan rasio pentalan (bounce rate).",
    },
    {
      icon: "fa-mobile-screen-button",
      title: "Responsif Lintas Perangkat",
      desc: "Tata letak fluid yang presisi di seluruh resolusi layar—mulai dari smartphone, tablet, hingga layar desktop—dengan navigasi intuitif dan ramah pengguna.",
    },
    {
      icon: "fa-magnifying-glass-chart",
      title: "Struktur Siap Indeks Mesin Pencari",
      desc: "Penerapan HTML5 semantik, metadata dinamis, Schema.org terstruktur, dan sitemap otomatis untuk memaksimalkan visibilitas serta pengindeksan di Google Search.",
    },
    {
      icon: "fa-shield-halved",
      title: "Keamanan & Integritas Data",
      desc: "Dilengkapi enkripsi SSL/HTTPS aktif, sanitasi formulir dari bot spam, serta arsitektur kode modern yang memitigasi kerentanan keamanan siber umum.",
    },
  ];

  const inclusiveFeatures = [
    {
      icon: "fa-globe",
      title: "Domain Resmi .com (1 Tahun Penuh)",
      desc: "Pendaftaran nama domain top-level .com dengan kepemilikan legal 100% atas nama bisnis Anda, dilengkapi proteksi privasi WHOIS.",
    },
    {
      icon: "fa-server",
      title: "Cloud Hosting Enterprise & Uptime 99.9%",
      desc: "Infrastruktur cloud berkecepatan tinggi dengan penyimpanan SSD NVMe, latensi ultra-rendah, serta jaminan ketersediaan operasional tanpa hambatan.",
    },
    {
      icon: "fa-comments",
      title: "Integrasi Direct-to-WhatsApp Conversion",
      desc: "Akses komunikasi instan yang menghubungkan prospek langsung ke saluran WhatsApp bisnis Anda dengan format pesan otomatis yang terstruktur.",
    },
    {
      icon: "fa-map-location-dot",
      title: "Verifikasi Lokasi & Profil Bisnis Resmi",
      desc: "Penyematan Google Maps interaktif dan identitas kontak terverifikasi guna memperkuat otoritas, legalitas, dan kredibilitas bisnis di mata klien.",
    },
    {
      icon: "fa-chart-line",
      title: "Instrumen Analitik & Pemantauan Performa",
      desc: "Konfigurasi instrumen analitik untuk memantau metrik performa pengunjung secara real-time, perilaku interaksi, serta efektivitas konversi bisnis.",
    },
    {
      icon: "fa-screwdriver-wrench",
      title: "Garansi Teknis & Panduan Operasional Mandiri",
      desc: "Dukungan pemeliharaan teknis bergaransi pasca-peluncuran disertai dokumentasi panduan komprehensif agar website siap dikelola secara mandiri.",
    },
  ];

  const faqs = [
    {
      q: "Berapa lama proses pengerjaan website?",
      a: "Untuk Landing Page, waktu pengerjaan berkisar 3 sampai 5 hari kerja. Untuk Company Profile atau Website Bisnis membutuhkan 7 sampai 12 hari kerja. Sedangkan Web App kustom disesuaikan dengan kompleksitas modul yang disepakati.",
    },
    {
      q: "Apakah biaya paket sudah mencakup Domain dan Hosting?",
      a: "Ya. Seluruh paket sudah termasuk pendaftaran nama domain resmi .com dan cloud hosting berkecepatan tinggi selama 1 tahun pertama tanpa biaya tersembunyi.",
    },
    {
      q: "Bagaimana tahapan pembayaran dan termin kerja sama?",
      a: "Pembayaran dibagi dalam skema transparan: Down Payment (DP) 50% di awal setelah kesepakatan desain, dan sisa 50% dilunasi setelah website selesai diuji serta siap diluncurkan ke domain Anda.",
    },
    {
      q: "Apakah saya bisa mengajukan penyesuaian atau revisi?",
      a: "Tentu saja. Kami menyediakan sesi revisi terstruktur untuk memastikan tata letak visual, teks, dan fungsi fitur sesuai dengan kebutuhan bisnis Anda sebelum serah terima.",
    },
    {
      q: "Apakah saya perlu menyiapkan seluruh materi teks dan foto sendiri?",
      a: "Jika sudah memiliki materi, Anda cukup mengirimkannya. Namun jika belum ada, kami siap membantu menyusun struktur teks profesional, copywriting penawaran, serta kurasi gambar yang relevan untuk bisnis Anda.",
    },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const isDesktop = window.innerWidth >= 768;

      // =========================================================================
      // 1. SECTION STANDAR MUTU / 4 PILAR: SCROLL MOTION & 3D PARALLAX WAVE
      // =========================================================================
      if (pillarsSectionRef.current) {
        const section = pillarsSectionRef.current;
        const headerEls = section.querySelectorAll(
          ".section-badge-center, .section-title, .section-sub"
        );
        const cards = section.querySelectorAll<HTMLElement>(".pillar-card");

        // Header entrance
        gsap.fromTo(
          headerEls,
          { opacity: 0, y: 40 },
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

        // Cards 3D Entrance
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 70,
            scale: 0.88,
            rotateX: 24,
            transformPerspective: 1000,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Icon bounce entrance
        const icons = section.querySelectorAll<HTMLElement>(".pillar-icon");
        if (icons.length > 0) {
          gsap.fromTo(
            icons,
            { scale: 0.35, rotate: -25 },
            {
              scale: 1,
              rotate: 0,
              duration: 0.65,
              stagger: 0.12,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
              },
            }
          );
        }

        // REAL-TIME SCROLL SCRUB PARALLAX WAVE (Alternating card lift)
        cards.forEach((card, idx) => {
          const isEven = idx % 2 === 0;
          gsap.fromTo(
            card,
            { y: isEven ? 28 : -22 },
            {
              y: isEven ? -38 : 32,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            }
          );
        });

        // Interactive 3D mouse tilt on desktop
        if (isDesktop) {
          cards.forEach((card) => {
            const onMouseMove = (e: MouseEvent) => {
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;
              const tiltX = (y - centerY) / centerY;
              const tiltY = (centerX - x) / centerX;

              gsap.to(card, {
                rotateX: tiltX * 8,
                rotateY: tiltY * 8,
                scale: 1.03,
                y: -6,
                transformPerspective: 900,
                duration: 0.25,
                ease: "power1.out",
              });
            };

            const onMouseLeave = () => {
              gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out",
              });
            };

            card.addEventListener("mousemove", onMouseMove);
            card.addEventListener("mouseleave", onMouseLeave);
          });
        }
      }

      // =========================================================================
      // 2. SECTION FASILITAS TERINTEGRASI: 3-COLUMN WAVE SCROLL PARALLAX
      // =========================================================================
      if (inclusiveSectionRef.current) {
        const section = inclusiveSectionRef.current;
        const headerEls = section.querySelectorAll(
          ".section-badge-center, .section-title, .section-sub"
        );
        const inclusiveCards = section.querySelectorAll<HTMLElement>(".inclusive-card");

        // Header entrance
        gsap.fromTo(
          headerEls,
          { opacity: 0, y: 40 },
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

        // 6 Cards 3D Entrance
        gsap.fromTo(
          inclusiveCards,
          {
            opacity: 0,
            y: 65,
            scale: 0.88,
            rotateX: 20,
            transformPerspective: 1000,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.09,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Icons bounce
        const icons = section.querySelectorAll<HTMLElement>(".inclusive-icon");
        if (icons.length > 0) {
          gsap.fromTo(
            icons,
            { scale: 0.35, rotate: -30 },
            {
              scale: 1,
              rotate: 0,
              duration: 0.65,
              stagger: 0.09,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
              },
            }
          );
        }

        // REAL-TIME 3-COLUMN SCROLL SCRUB PARALLAX WAVE!
        inclusiveCards.forEach((card, idx) => {
          const colIndex = idx % 3;
          const startY = colIndex === 0 ? 30 : colIndex === 1 ? -25 : 35;
          const endY = colIndex === 0 ? -40 : colIndex === 1 ? 30 : -45;

          gsap.fromTo(
            card,
            { y: startY },
            {
              y: endY,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            }
          );
        });

        // Interactive 3D mouse tilt on desktop
        if (isDesktop) {
          inclusiveCards.forEach((card) => {
            const onMouseMove = (e: MouseEvent) => {
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;
              const tiltX = (y - centerY) / centerY;
              const tiltY = (centerX - x) / centerX;

              gsap.to(card, {
                rotateX: tiltX * 9,
                rotateY: tiltY * 9,
                scale: 1.04,
                y: -6,
                transformPerspective: 900,
                duration: 0.25,
                ease: "power1.out",
              });
            };

            const onMouseLeave = () => {
              gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out",
              });
            };

            card.addEventListener("mousemove", onMouseMove);
            card.addEventListener("mouseleave", onMouseLeave);
          });
        }
      }

      // =========================================================================
      // 3. SECTION FAQ: ACCORDION STAGGER & REAL-TIME PARALLAX DRIFT
      // =========================================================================
      if (faqSectionRef.current) {
        const section = faqSectionRef.current;
        const headerEls = section.querySelectorAll(
          ".section-badge-center, .section-title, .section-sub"
        );
        const faqItems = section.querySelectorAll<HTMLElement>(".faq-item");

        // Header entrance
        gsap.fromTo(
          headerEls,
          { opacity: 0, y: 40 },
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

        // FAQ Items Stagger Entrance
        gsap.fromTo(
          faqItems,
          { opacity: 0, x: -35, y: 25 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Real-Time Scroll Scrub Parallax Drift on FAQ items
        faqItems.forEach((item, idx) => {
          gsap.fromTo(
            item,
            { y: 15 },
            {
              y: -25,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2 + idx * 0.1,
              },
            }
          );
        });
      }

      // =========================================================================
      // 4. SECTION BOTTOM CTA: 3D BOX ZOOM & GLOW PARALLAX
      // =========================================================================
      if (ctaSectionRef.current) {
        const section = ctaSectionRef.current;
        const ctaBanner = section.querySelector<HTMLElement>(".services-cta-banner");
        const ctaEls = section.querySelectorAll(
          ".services-cta-title, .services-cta-desc, .services-cta-actions"
        );

        if (ctaBanner) {
          // Banner 3D Entrance
          gsap.fromTo(
            ctaBanner,
            {
              opacity: 0,
              y: 65,
              scale: 0.88,
              rotateX: 18,
              transformPerspective: 1000,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              duration: 0.9,
              ease: "back.out(1.4)",
              scrollTrigger: {
                trigger: section,
                start: "top 82%",
                toggleActions: "play none none reverse",
              },
            }
          );

          // Internal text stagger
          gsap.fromTo(
            ctaEls,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              stagger: 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
              },
            }
          );

          // Real-time scroll scrub parallax on CTA banner
          gsap.to(ctaBanner, {
            y: isDesktop ? -35 : -15,
            scale: isDesktop ? 1.02 : 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          });

          // 3D Mouse Parallax on Desktop
          if (isDesktop) {
            const onMouseMove = (e: MouseEvent) => {
              const rect = ctaBanner.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;
              const tiltX = (y - centerY) / centerY;
              const tiltY = (centerX - x) / centerX;

              gsap.to(ctaBanner, {
                rotateX: tiltX * 5,
                rotateY: tiltY * 5,
                transformPerspective: 1200,
                duration: 0.35,
                ease: "power2.out",
              });
            };

            const onMouseLeave = () => {
              gsap.to(ctaBanner, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.6,
                ease: "power2.out",
              });
            };

            ctaBanner.addEventListener("mousemove", onMouseMove);
            ctaBanner.addEventListener("mouseleave", onMouseLeave);
          }
        }
      }

      // Refresh ScrollTrigger calculations
      const timer = setTimeout(() => ScrollTrigger.refresh(), 350);
      return () => clearTimeout(timer);
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="services-page-root">
      <Navbar />

      <main className="page-wrapper services-page-wrapper">
        {/* 1. Tampilan Utama Paket Layanan & Cara Kerja (Dark Cyber Showcase) */}
        <ServicesShowcase />

        {/* 2. Section Standar Mutu Layanan (Kombinasi Warna Putih & Light Area) */}
        <section className="section services-pillars-section py-5" ref={pillarsSectionRef}>
          <div className="container">
            <div className="section-badge-center">
              <span className="badge-text">
                <i className="fa-solid fa-gem"></i> STANDAR REKAYASA & KEUNGGULAN
              </span>
            </div>
            <h2 className="section-title text-center text-dark">
              Arsitektur Web Kustom dengan Standar Rekayasa Modern
            </h2>
            <p className="section-sub text-center text-slate-600">
              Setiap aset digital dibangun dari fondasi kode bersih yang teroptimasi—menghadirkan kecepatan akses instan, keamanan data berlapis, serta keandalan jangka panjang untuk pertumbuhan bisnis Anda.
            </p>

            <div className="pillars-grid">
              {pillars.map((pillar, idx) => (
                <div key={idx} className="pillar-card">
                  <div className="pillar-icon">
                    <i className={`fa-solid ${pillar.icon}`}></i>
                  </div>
                  <h3 className="pillar-title">{pillar.title}</h3>
                  <p className="pillar-desc">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Section Fasilitas Lengkap (Area Background Putih Bersih) */}
        <section className="section services-inclusive-section py-5" ref={inclusiveSectionRef}>
          <div className="container">
            <div className="section-badge-center">
              <span className="badge-text">
                <i className="fa-solid fa-circle-check"></i> FASILITAS TERINTEGRASI
              </span>
            </div>
            <h2 className="section-title text-center text-dark">
              Infrastruktur Esensial Lengkap & Siap Operasional
            </h2>
            <p className="section-sub text-center text-slate-600">
              Transparansi menyeluruh tanpa biaya tersembunyi. Mulai dari domain .com resmi, cloud hosting berkecepatan tinggi, hingga serah terima teknis telah terintegrasi sejak hari pertama.
            </p>

            <div className="inclusive-cards-grid">
              {inclusiveFeatures.map((feat, idx) => (
                <div key={idx} className="inclusive-card">
                  <div className="inclusive-icon">
                    <i className={`fa-solid ${feat.icon}`}></i>
                  </div>
                  <h3 className="inclusive-title">{feat.title}</h3>
                  <p className="inclusive-desc">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Section FAQ: Pertanyaan Umum (Kartu Accordion Putih Bersih) */}
        <section className="section services-faq-section py-5" ref={faqSectionRef}>
          <div className="container">
            <div className="section-badge-center">
              <span className="badge-text">
                <i className="fa-solid fa-circle-question"></i> PERTANYAAN UMUM
              </span>
            </div>
            <h2 className="section-title text-center text-dark">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="section-sub text-center text-slate-600">
              Jawaban transparan seputar proses kerja sama, spesifikasi teknis, dan
              keamanan website Anda.
            </p>

            <div className="faq-accordion-list">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`faq-item ${activeFaq === index ? "open" : ""}`}
                  onClick={() =>
                    setActiveFaq(activeFaq === index ? null : index)
                  }
                >
                  <div className="faq-question">
                    <span>{faq.q}</span>
                    <i
                      className={`fa-solid fa-chevron-down faq-chevron ${
                        activeFaq === index ? "rotate-180" : ""
                      }`}
                    ></i>
                  </div>
                  {activeFaq === index && (
                    <div className="faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. CTA Bawah Menuju WhatsApp (Aksen Banner Royal Blue Elegan) */}
        <section className="section services-bottom-cta py-5" ref={ctaSectionRef}>
          <div className="container">
            <div className="services-cta-banner">
              <h2 className="services-cta-title">
                Punya Kebutuhan Spesifik atau Custom Fitur?
              </h2>
              <p className="services-cta-desc">
                Konsultasikan langsung dengan Arjuna Webdev gratis tanpa komitmen.
                Kami siap memberikan rekomendasi solusi paling efisien untuk bisnis Anda.
              </p>
              <div className="services-cta-actions">
                <Link href="/kontak" className="btn btn-blue-pill btn-glow">
                  <i className="fa-brands fa-whatsapp"></i> Mulai Diskusi Sekarang
                </Link>
                <Link href="/portofolio" className="btn btn-white-pill">
                  Lihat Hasil Portofolio
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
