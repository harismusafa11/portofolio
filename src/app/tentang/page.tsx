"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Stats from "@/components/Stats";
import TechStackInteractive from "@/components/TechStackInteractive";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function AboutPage() {
  const pillarsSectionRef = useRef<HTMLElement>(null);
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

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Pillars Section Animation (3D stagger flip-in with scroll scrub)
      if (pillarsSectionRef.current) {
        const headerEls = pillarsSectionRef.current.querySelectorAll(
          ".section-badge-center, .section-title-dark, .section-sub-dark"
        );
        gsap.fromTo(
          headerEls,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: pillarsSectionRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        const cards = pillarsSectionRef.current.querySelectorAll<HTMLElement>(".pillar-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: pillarsSectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Scroll Scrub Parallax for Pillars
        gsap.to(cards, {
          y: -25,
          ease: "none",
          scrollTrigger: {
            trigger: pillarsSectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });

        // Interactive 3D tilt on pillar cards
        if (window.innerWidth >= 768) {
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
                rotateX: tiltX * 7,
                rotateY: tiltY * 7,
                y: -6,
                transformPerspective: 800,
                duration: 0.3,
                ease: "power2.out",
              });
            };

            const onMouseLeave = () => {
              gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
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

      // 2. CTA Box entrance
      if (ctaSectionRef.current) {
        const ctaBox = ctaSectionRef.current.querySelector(".cta-box");
        if (ctaBox) {
          gsap.fromTo(
            ctaBox,
            { opacity: 0, scale: 0.95, y: 40 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ctaSectionRef.current,
                start: "top 82%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      }

      // Refresh ScrollTrigger calculations after initial render
      const timer = setTimeout(() => ScrollTrigger.refresh(), 300);

      return () => {
        clearTimeout(timer);
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* 1. Top Navbar dengan Mode Khusus Halaman Tentang (Persis Gambar Referensi) */}
      <Navbar />

      <main className="about-page-wrapper">
        {/* 2. Hero Showcase Tentang Arjuna (Persis Gambar Referensi) */}
        <About isHero={true} />

        {/* 3. 4 Pilar Keunggulan & Prinsip Kerja */}
        <section className="section bg-light-surface py-5" ref={pillarsSectionRef}>
          <div className="container">
            <div className="section-badge-center">
              <span className="badge-text">PRINSIP KERJA</span>
            </div>
            <h2 className="section-title-dark text-center">
              4 Pilar Utama ARJUNA WEBDEV
            </h2>
            <p className="section-sub-dark text-center">
              Standar baku yang selalu kami terapkan dalam setiap proyek yang
              dipercayakan kepada kami.
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

        {/* 4. Counter Statistik Bukti Kualitas */}
        <Stats />

        {/* 5. Tech Stack Arsenal - Living Interactive Tech Labs */}
        <TechStackInteractive />

        {/* 6. CTA Banner */}
        <section className="section cta-banner-section" ref={ctaSectionRef}>
          <div className="container">
            <div className="cta-box">
              <h2 className="cta-heading">
                Konsultasikan Kebutuhan Website Bisnis Anda
              </h2>
              <p className="cta-subtext">
                Diskusikan rencana atau kendala website Anda bersama Arjuna. Kami bantu rancang solusi yang efektif, cepat, dan sesuai anggaran.
              </p>
              <div className="cta-actions">
                <Link href="/kontak" className="btn btn-blue-pill btn-glow">
                  Konsultasi Sekarang
                </Link>
                <Link href="/layanan" className="btn btn-white-pill">
                  Lihat Paket Layanan
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
