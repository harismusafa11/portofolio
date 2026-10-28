"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Toast from "@/components/Toast";

export default function ContactPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const heroRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLImageElement>(null);
  const hudRingsRef = useRef<SVGGElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const channelsRef = useRef<HTMLElement>(null);

  const contactCards = [
    {
      icon: "fa-brands fa-whatsapp",
      title: "WhatsApp Chat",
      value: "+62 857-3309-7867",
      desc: "Respon instan dalam hitungan menit untuk konsultasi kilat.",
      actionText: "Chat WhatsApp Sekarang",
      actionHref:
        "https://wa.me/6285733097867?text=Halo%20Arjuna%20Webdev,%20saya%20tertarik%20konsultasi%20website",
      isPrimary: true,
    },
    {
      icon: "fa-solid fa-envelope",
      title: "Email Resmi",
      value: "arjunawebdev@gmail.com",
      desc: "Kirimkan dokumen RFQ, proposal, atau briefing proyek formal.",
      actionText: "Kirim Email",
      actionHref: "mailto:arjunawebdev@gmail.com",
      isPrimary: false,
    },
    {
      icon: "fa-solid fa-calendar-check",
      title: "Jadwal Diskusi Online",
      value: "Senin - Sabtu",
      desc: "08.00 - 21.00 WIB (Tersedia Google Meet / Zoom jika diperlukan).",
      actionText: "Atur Jadwal Diskusi",
      actionHref:
        "https://wa.me/6285733097867?text=Halo%20Arjuna,%20saya%20ingin%20jadwalkan%20diskusi%20online",
      isPrimary: false,
    },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Initial Hero Entrance Animation
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Avatar rise
      if (avatarRef.current) {
        tl.fromTo(
          avatarRef.current,
          { y: 100, opacity: 0, scale: 0.94, rotateX: 12 },
          { y: 0, opacity: 1, scale: 1, rotateX: 0, duration: 1.2, ease: "power4.out" },
          0.1
        );
      }

      // HUD Radar Rings fade & rotation
      if (hudRingsRef.current) {
        gsap.to(hudRingsRef.current, {
          rotation: 360,
          transformOrigin: "290px 280px",
          duration: 90,
          repeat: -1,
          ease: "none",
        });
      }

      // Content Stagger Entrance
      if (contentRef.current) {
        const els = contentRef.current.children;
        tl.fromTo(
          els,
          { opacity: 0, x: -45 },
          { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
          0.25
        );
      }

      // Floating Badges entrance
      const badges = document.querySelectorAll(".contact-floating-badge");
      if (badges.length > 0) {
        tl.fromTo(
          badges,
          { opacity: 0, scale: 0.7, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "back.out(1.6)" },
          0.6
        );
      }

      // 2. ScrollTrigger Parallax
      if (heroRef.current && avatarRef.current) {
        gsap.to(avatarRef.current, {
          y: -60,
          scale: 1.02,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      // Channels Cards Entrance
      if (channelsRef.current) {
        const cards = channelsRef.current.querySelectorAll(".channel-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: channelsRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // 3. Interactive 3D Mouse Parallax Tilt
      const heroEl = heroRef.current;
      const stageEl = stageRef.current;
      const avatarEl = avatarRef.current;

      if (heroEl && stageEl && window.innerWidth >= 768) {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = heroEl.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const normX = (mouseX - centerX) / centerX;
          const normY = (mouseY - centerY) / centerY;

          gsap.to(stageEl, {
            rotateY: normX * 8,
            rotateX: -normY * 6,
            duration: 0.7,
            ease: "power2.out",
            transformPerspective: 1200,
          });

          if (avatarEl) {
            gsap.to(avatarEl, {
              x: normX * 14,
              y: normY * 10,
              duration: 0.6,
              ease: "power2.out",
            });
          }
        };

        const handleMouseLeave = () => {
          gsap.to(stageEl, {
            rotateY: 0,
            rotateX: 0,
            duration: 1.2,
            ease: "power3.out",
          });
          if (avatarEl) {
            gsap.to(avatarEl, {
              x: 0,
              y: 0,
              duration: 1.2,
              ease: "power3.out",
            });
          }
        };

        heroEl.addEventListener("mousemove", handleMouseMove);
        heroEl.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          heroEl.removeEventListener("mousemove", handleMouseMove);
          heroEl.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />

      <main className="page-wrapper contact-page-wrapper">
        {/* ================= HERO SHOWCASE KONTAK DENGAN FOTO PROFIL ARJUNA ================= */}
        <section className="contact-hero-section" ref={heroRef}>
          {/* Ambient Lighting Orbs */}
          <div className="about-ambient-glow-left" aria-hidden="true"></div>
          <div className="about-ambient-glow-right" aria-hidden="true"></div>
          <div className="about-particle-orb orb-1" aria-hidden="true"></div>
          <div className="about-particle-orb orb-2" aria-hidden="true"></div>
          <div className="about-particle-orb orb-3" aria-hidden="true"></div>

          <div className="container">
            <div className="contact-hero-grid">
              {/* SISI KIRI: KONTEN TEKS & CTA CEPAT */}
              <div className="contact-hero-content" ref={contentRef}>
                <div className="contact-hero-kicker">Kontak &amp; Konsultasi</div>

                <h1 className="contact-hero-title">
                  Konsultasikan Website <span className="text-gradient-blue">Bisnis Anda</span>
                </h1>

                <p className="contact-hero-sub">
                  Dapatkan rekomendasi teknis dan estimasi biaya pembuatan website yang transparan untuk bisnis Anda.
                </p>

                <p className="contact-hero-desc">
                  Membantu bisnis, UMKM, dan profesional memiliki website berkinerja tinggi, ramah SEO Google, dan terdesain rapi untuk meningkatkan kredibilitas di hadapan calon pelanggan.
                </p>

                {/* Direct Action Buttons */}
                <div className="contact-hero-actions">
                  <a
                    href="https://wa.me/6285733097867?text=Halo%20Arjuna%20Webdev,%20saya%20ingin%20konsultasi%20pembuatan%20website"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-blue-pill btn-glow"
                  >
                    <i className="fa-brands fa-whatsapp text-green"></i>
                    <span>Chat WhatsApp Langsung</span>
                  </a>
                  <a href="#formulir-kontak" className="btn btn-white-pill">
                    <i className="fa-solid fa-paper-plane"></i>
                    <span>Isi Formulir Brief</span>
                  </a>
                </div>

                {/* Trust Points */}
                <div className="contact-trust-row">
                  <div className="contact-trust-item">
                    <i className="fa-regular fa-clock"></i>
                    <span>Respon Cepat (&lt; 30 Menit)</span>
                  </div>
                  <div className="contact-trust-item">
                    <i className="fa-solid fa-calculator"></i>
                    <span>Estimasi Biaya Transparan</span>
                  </div>
                  <div className="contact-trust-item">
                    <i className="fa-solid fa-shield-halved"></i>
                    <span>Konsultasi 100% Gratis</span>
                  </div>
                </div>
              </div>

              {/* SISI KANAN: FOTO PROFIL ARJUNA + CYBER HUD RADAR */}
              <div className="contact-hero-visual">
                <div className="contact-visual-stage" ref={stageRef}>
                  {/* Floating Badges */}
                  <div className="contact-floating-badge badge-top-left">
                    <i className="fa-solid fa-bolt"></i>
                    <span>Respon Cepat via WhatsApp</span>
                  </div>
                  <div className="contact-floating-badge badge-bottom-right">
                    <i className="fa-solid fa-circle-check"></i>
                    <span>Garansi Pengerjaan Rapi</span>
                  </div>

                  {/* SVG Radar Concentric Circles */}
                  <svg
                    className="contact-emblem-svg"
                    viewBox="0 0 580 560"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient id="contactGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#38BDF8" />
                        <stop offset="50%" stopColor="#00A3FF" />
                        <stop offset="100%" stopColor="#0055D4" />
                      </linearGradient>
                      <filter id="contactGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="12" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* HUD Concentric Circles */}
                    <g ref={hudRingsRef}>
                      <circle cx="290" cy="280" r="220" stroke="#00D2FF" strokeWidth="1.2" opacity="0.25" />
                      <circle cx="290" cy="280" r="185" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="5 7" opacity="0.3" />
                      <circle cx="290" cy="280" r="150" stroke="#00D2FF" strokeWidth="1.2" opacity="0.35" />
                      {/* Compass Marks */}
                      <line x1="290" y1="50" x2="290" y2="70" stroke="#00D2FF" strokeWidth="2" opacity="0.7" />
                      <line x1="290" y1="490" x2="290" y2="510" stroke="#00D2FF" strokeWidth="2" opacity="0.7" />
                      <line x1="60" y1="280" x2="80" y2="280" stroke="#00D2FF" strokeWidth="2" opacity="0.7" />
                      <line x1="500" y1="280" x2="520" y2="280" stroke="#00D2FF" strokeWidth="2" opacity="0.7" />
                    </g>

                    {/* Sparkling Accent Star */}
                    <circle cx="120" cy="110" r="4" fill="#FBBF24" filter="url(#contactGlow)" />
                    <circle cx="460" cy="130" r="3.5" fill="#38BDF8" filter="url(#contactGlow)" />
                  </svg>

                  {/* Foto Profil Cutout Arjuna */}
                  <img
                    ref={avatarRef}
                    src="/assets/profile_about.png"
                    alt="Arjuna - Web Developer Profesional"
                    className="contact-avatar-cutout"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 3 KARTU SALURAN KOMUNIKASI CEPAT ================= */}
        <section className="section bg-card-dark py-5" ref={channelsRef}>
          <div className="container">
            <div className="contact-channels-grid">
              {contactCards.map((card, i) => (
                <div
                  key={i}
                  className={`channel-card ${card.isPrimary ? "primary-channel" : ""}`}
                >
                  <div className="channel-icon">
                    <i className={card.icon}></i>
                  </div>
                  <h3 className="channel-title">{card.title}</h3>
                  <div className="channel-val">{card.value}</div>
                  <p className="channel-desc">{card.desc}</p>
                  <a
                    href={card.actionHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn ${
                      card.isPrimary ? "btn-blue-pill btn-glow" : "btn-white-pill"
                    } channel-btn`}
                  >
                    {card.actionText}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FORMULIR KONTAK & KONSULTASI INTERAKTIF ================= */}
        <div id="formulir-kontak">
          <Contact onShowToast={(msg) => setToastMessage(msg)} />
        </div>
      </main>

      <Footer />

      {/* Floating Action WhatsApp */}
      <WhatsAppButton />

      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </>
  );
}
