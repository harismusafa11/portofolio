"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface HeroProps {
  onOpenProject?: (id: number) => void;
}

export default function Hero({ onOpenProject }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const hudOuterRef = useRef<SVGGElement>(null);
  const hudMidRef = useRef<SVGGElement>(null);
  const hudInnerRef = useRef<SVGGElement>(null);
  const hudCoreRef = useRef<SVGCircleElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. GSAP ScrollTrigger Parallax & Interactive Rotation on Scroll
      // PENTING: Ketika TIDAK di-scroll, lingkaran sama sekali TIDAK BERGERAK!
      // Lingkaran HANYA berputar seiring scroll halaman (scrub).
      if (heroRef.current) {
        if (hudOuterRef.current) {
          gsap.to(hudOuterRef.current, {
            rotation: 180,
            transformOrigin: "1060px 380px",
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });
        }

        if (hudMidRef.current) {
          gsap.to(hudMidRef.current, {
            rotation: -240,
            transformOrigin: "1060px 380px",
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });
        }

        if (hudInnerRef.current) {
          gsap.to(hudInnerRef.current, {
            rotation: 360,
            transformOrigin: "1060px 380px",
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });
        }
      }
    }, heroRef);

    // 2. Interactive Holographic 3D Mouse Parallax
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current || window.innerWidth < 768) return;
      const rect = heroRef.current.getBoundingClientRect();
      const xNorm = (e.clientX - rect.left) / rect.width - 0.5; // range: -0.5 to 0.5
      const yNorm = (e.clientY - rect.top) / rect.height - 0.5;

      // Avatar shifts subtly forward
      if (avatarRef.current) {
        gsap.to(avatarRef.current, {
          x: xNorm * 14,
          y: yNorm * 8,
          duration: 0.9,
          ease: "power2.out",
        });
      }

    };

    const heroEl = heroRef.current;
    if (heroEl) {
      heroEl.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      ctx.revert();
      if (heroEl) {
        heroEl.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);


  return (
    <section id="beranda" ref={heroRef} className="hero-canvas">
      {/* Layer Aksen Geometris Sudut Kiri Bawah (Persis Gambar 1) */}
      <div className="hero-corner-polygons" aria-hidden="true">
        <div className="polygon-dark-1"></div>
        <div className="polygon-dark-2"></div>
        <div className="circuit-trace-corner"></div>
      </div>

      {/* Layer Panel Gelap Cyber Kanan dengan Sudut Miring 56% (Persis Gambar 1) */}
      <div className="hero-cyber-panel" aria-hidden="true">
        <div className="cyber-ambient-glow"></div>
      </div>

      {/* SVG Sirkuit & Radar HUD Konsentris Menembus Latar Gelap & Terang (Persis Gambar 1) */}
      <svg
        className="hero-circuit-overlay"
        viewBox="0 0 1440 820"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="laserGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.5" result="blur1" />
            <feGaussianBlur stdDeviation="7" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="hudCenterGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00D2FF" stopOpacity="0.45" />
            <stop offset="40%" stopColor="#1254EB" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#050C1B" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Inti Cahaya Cyber di Belakang Kepala Arjuna */}
        <circle
          ref={hudCoreRef}
          cx="1060"
          cy="380"
          r="280"
          fill="url(#hudCenterGlow)"
          className="hud-core-glow"
        />

        {/* --- Group 1: Outer Rings --- */}
        <g ref={hudOuterRef} className="hud-rotate-cw">
          <circle
            cx="1060"
            cy="380"
            r="480"
            stroke="#00D2FF"
            strokeWidth="0.8"
            strokeDasharray="8 12"
            opacity="0.22"
          />
          <circle
            cx="1060"
            cy="380"
            r="380"
            stroke="#00D2FF"
            strokeWidth="1"
            opacity="0.3"
          />
          {/* Cahaya Berjalan 1 pada Cincin Luar r=380 (Aktif Terus Tanpa Perlu Scroll) */}
          <circle
            cx="1060"
            cy="380"
            r="380"
            stroke="#00F0FF"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="190 2198"
            className="hud-beam-orbit-cw-1"
            filter="url(#laserGlow)"
          />
        </g>

        {/* --- Group 2: Mid Rings --- */}
        <g ref={hudMidRef} className="hud-rotate-ccw">
          <circle
            cx="1060"
            cy="380"
            r="290"
            stroke="#00D2FF"
            strokeWidth="1.2"
            strokeDasharray="6 6"
            opacity="0.4"
          />
          {/* Cahaya Berjalan 2 pada Cincin r=290 (Berlawanan Arah) */}
          <circle
            cx="1060"
            cy="380"
            r="290"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="140 1682"
            className="hud-beam-orbit-ccw-2"
            filter="url(#laserGlow)"
          />
          <circle
            cx="1060"
            cy="380"
            r="230"
            stroke="#00F0FF"
            strokeWidth="2.2"
            filter="url(#cyanGlow)"
            opacity="0.75"
          />
          {/* Cahaya Berjalan 3 pada Cincin r=230 (Cyan Menyala Terang) */}
          <circle
            cx="1060"
            cy="380"
            r="230"
            stroke="#00F0FF"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeDasharray="130 1315"
            className="hud-beam-orbit-cw-3"
            filter="url(#laserGlow)"
          />
          <path
            d="M 1060 150 A 230 230 0 0 1 1290 380"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeDasharray="10 18"
            opacity="0.7"
          />
        </g>

        {/* --- Group 3: Inner Rings & Dials --- */}
        <g ref={hudInnerRef} className="hud-rotate-dial">
          <circle
            cx="1060"
            cy="380"
            r="160"
            stroke="#165DFF"
            strokeWidth="2"
            opacity="0.65"
          />
          {/* Cahaya Berjalan 4 pada Cincin Dial r=160 (Cepat) */}
          <circle
            cx="1060"
            cy="380"
            r="160"
            stroke="#FFFFFF"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeDasharray="90 915"
            className="hud-beam-orbit-ccw-4"
            filter="url(#laserGlow)"
          />
          <circle
            cx="1060"
            cy="380"
            r="100"
            stroke="#00D2FF"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.5"
          />
          <path
            d="M 1060 220 A 160 160 0 0 1 1220 380"
            stroke="#00F0FF"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#cyanGlow)"
          />
        </g>

        {/* Aksen Data Tech di Kanan HUD */}
        <path
          d="M 1290 380 L 1410 380"
          stroke="#00D2FF"
          strokeWidth="1.5"
          opacity="0.7"
        />
        <rect x="1340" y="374" width="12" height="12" fill="#00D2FF" opacity="0.8" />
        <circle cx="1410" cy="380" r="4" fill="#00F0FF" filter="url(#cyanGlow)" className="glowing-node" />
        <path
          d="M 1240 280 L 1320 280 L 1350 250 L 1420 250"
          stroke="#00D2FF"
          strokeWidth="1.2"
          opacity="0.5"
        />
        <circle cx="1420" cy="250" r="3.5" fill="#00D2FF" className="glowing-node" />

        {/* --- Sirkuit 1: Garis Stepped Tengah Atas (Persis Gambar 1) --- */}
        <path
          d="M 330 220 L 530 220"
          stroke="#00D2FF"
          strokeWidth="1.5"
          strokeDasharray="6 5"
          opacity="0.7"
        />
        {/* Laser pulse flow overlay */}
        <path
          d="M 330 220 L 530 220 L 620 155 L 860 155"
          stroke="#00F0FF"
          strokeWidth="2"
          className="circuit-laser-flow"
          filter="url(#cyanGlow)"
        />
        {/* Titik cyan pada x=530, y=220 */}
        <circle cx="530" cy="220" r="4" fill="#00D2FF" className="glowing-node" />
        <path
          d="M 530 220 L 620 155"
          stroke="#00D2FF"
          strokeWidth="1.5"
          opacity="0.8"
        />
        <circle cx="620" cy="155" r="4.5" fill="#1256E8" stroke="#00D2FF" strokeWidth="1" />
        <path
          d="M 620 155 L 860 155"
          stroke="#00D2FF"
          strokeWidth="1.5"
          opacity="0.8"
        />
        <circle cx="860" cy="155" r="4" fill="#00F0FF" filter="url(#cyanGlow)" className="glowing-node" />
        <circle cx="860" cy="155" r="1.5" fill="#FFFFFF" />

        {/* --- Sirkuit 2: Garis Stepped Bawah di Bawah Tombol (Persis Gambar 1) --- */}
        <path
          d="M 140 670 L 380 670"
          stroke="#00D2FF"
          strokeWidth="1.5"
          opacity="0.75"
        />
        <path
          d="M 140 670 L 380 670 L 450 600 L 640 600"
          stroke="#00F0FF"
          strokeWidth="2"
          className="circuit-laser-flow"
          filter="url(#cyanGlow)"
        />
        <circle cx="380" cy="670" r="4" fill="#00D2FF" className="glowing-node" />
        <path
          d="M 380 670 L 450 600"
          stroke="#00D2FF"
          strokeWidth="1.5"
          opacity="0.8"
        />
        <circle cx="450" cy="600" r="4.5" fill="#1256E8" stroke="#00D2FF" strokeWidth="1" />
        <path
          d="M 450 600 L 640 600"
          stroke="#00D2FF"
          strokeWidth="1.5"
          opacity="0.7"
        />
        <circle cx="640" cy="600" r="4.5" stroke="#00D2FF" strokeWidth="2" fill="none" className="glowing-node" />

        {/* --- Sirkuit 3: Jejak Halus Atas Dekat Navbar --- */}
        <path
          d="M 520 70 L 660 70 L 700 100 L 820 100"
          stroke="#00D2FF"
          strokeWidth="1.2"
          opacity="0.4"
        />
        <circle cx="820" cy="100" r="3" fill="#00D2FF" opacity="0.6" />
      </svg>

      {/* Sisi Kiri: Teks & Logo 3D ARJUNA WEBDEV (Persis Gambar 1) */}
      <div className="hero-container-inner">
        <div className="hero-text-block">
          {/* Logo 3D ARJUNA WEBDEV Besar (Persis Gambar 1) */}
          <div className="hero-emblem-wrapper">
            <img
              src="/assets/logo.png"
              alt="ARJUNA WEBDEV 3D Emblem"
              className="hero-emblem-img"
            />
          </div>

          {/* Judul Utama Hitam Tebal Modern */}
          <h1 className="hero-headline">
            Jasa Pembuatan <br />
            Website Profesional
          </h1>

          {/* Subjudul Rapi & Elegan */}
          <p className="hero-tagline">
            Membantu bisnis, UMKM, dan personal brand memiliki website cepat, responsive, <br />
            dan berdaya konversi tinggi untuk meningkatkan kredibilitas digital Anda.
          </p>

          {/* Tombol Aksi: Biru Solid Kiri & Putih Elegan Kanan */}
          <div className="hero-actions">
            <Link href="/portofolio" className="btn-blue-pill">
              Lihat Portofolio
            </Link>
            <Link href="/kontak" className="btn-white-pill">
              Konsultasi Gratis
            </Link>
          </div>
        </div>
      </div>

      {/* Sisi Kanan: Foto Arjuna Menonjol di Tengah-Kanan & Floating Card (Persis Gambar 1) */}
      <div className="hero-avatar-showcase">
        {/* Mobile Cyber HUD Radar Rings - Eksklusif Tampil di Mode Mobile / Tablet */}
        <svg
          className="hero-mobile-hud-svg"
          viewBox="0 0 360 360"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <filter id="mobileCyanGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="mobileHudGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00D2FF" stopOpacity="0.45" />
              <stop offset="45%" stopColor="#1254EB" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#050C1B" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Inti Cahaya Cyber */}
          <circle cx="180" cy="180" r="150" fill="url(#mobileHudGlow)" />

          {/* Cincin Luar Bergerigi Putar Searah Jarum Jam */}
          <g className="hud-rotate-cw">
            <circle
              cx="180"
              cy="180"
              r="165"
              stroke="#00D2FF"
              strokeWidth="1.2"
              strokeDasharray="6 8"
              opacity="0.35"
            />
            {/* Berkas Cahaya Laser Berjalan */}
            <circle
              cx="180"
              cy="180"
              r="165"
              stroke="#00F0FF"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeDasharray="80 960"
              className="hud-beam-orbit-cw-1"
              filter="url(#mobileCyanGlow)"
            />
          </g>

          {/* Cincin Tengah Putar Berlawanan Arah */}
          <g className="hud-rotate-ccw">
            <circle
              cx="180"
              cy="180"
              r="128"
              stroke="#00D2FF"
              strokeWidth="1.4"
              strokeDasharray="5 5"
              opacity="0.45"
            />
            <circle
              cx="180"
              cy="180"
              r="128"
              stroke="#FFFFFF"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeDasharray="60 740"
              className="hud-beam-orbit-ccw-2"
              filter="url(#mobileCyanGlow)"
            />
            <circle
              cx="180"
              cy="180"
              r="100"
              stroke="#00F0FF"
              strokeWidth="2"
              opacity="0.7"
              filter="url(#mobileCyanGlow)"
            />
          </g>

          {/* Cincin Dalam Dial */}
          <circle
            cx="180"
            cy="180"
            r="72"
            stroke="#1256E8"
            strokeWidth="1.8"
            strokeDasharray="4 6"
            opacity="0.6"
          />

          {/* Tanda Kompas / Radar Crosshairs */}
          <line x1="180" y1="8" x2="180" y2="24" stroke="#00D2FF" strokeWidth="2" opacity="0.8" />
          <line x1="180" y1="336" x2="180" y2="352" stroke="#00D2FF" strokeWidth="2" opacity="0.8" />
          <line x1="8" y1="180" x2="24" y2="180" stroke="#00D2FF" strokeWidth="2" opacity="0.8" />
          <line x1="336" y1="180" x2="352" y2="180" stroke="#00D2FF" strokeWidth="2" opacity="0.8" />

          {/* Titik Cahaya Node */}
          <circle cx="180" cy="52" r="3.5" fill="#00F0FF" filter="url(#mobileCyanGlow)" />
          <circle cx="308" cy="180" r="3.5" fill="#00F0FF" filter="url(#mobileCyanGlow)" />
          <circle cx="52" cy="180" r="3" fill="#00D2FF" opacity="0.75" />
        </svg>

        {/* Foto Profil Arjuna Tanpa Background (Cutout Bersih + Parallax Ref) */}
        <div ref={avatarRef} className="hero-avatar-wrapper">
          <img
            src="/assets/profile.png"
            alt="Arjuna - Web Developer ARJUNA WEBDEV"
            className="hero-avatar-cutout"
          />
        </div>
      </div>
    </section>
  );
}
