"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface BlogHeroProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  categories: string[];
}

export default function BlogHero({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
}: BlogHeroProps) {
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
      // 1. GSAP ScrollTrigger Parallax on HUD Rings
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
      const xNorm = (e.clientX - rect.left) / rect.width - 0.5;
      const yNorm = (e.clientY - rect.top) / rect.height - 0.5;

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
    <section ref={heroRef} className="hero-canvas blog-hero-canvas">
      {/* Layer Aksen Geometris Sudut Kiri Bawah (Persis Home Page) */}
      <div className="hero-corner-polygons" aria-hidden="true">
        <div className="polygon-dark-1"></div>
        <div className="polygon-dark-2"></div>
        <div className="circuit-trace-corner"></div>
      </div>

      {/* Layer Panel Gelap Cyber Kanan dengan Sudut Miring 56% (Persis Home Page) */}
      <div className="hero-cyber-panel" aria-hidden="true">
        <div className="cyber-ambient-glow"></div>
      </div>

      {/* SVG Sirkuit & Radar HUD Konsentris Menembus Latar Gelap & Terang (Persis Home Page) */}
      <svg
        className="hero-circuit-overlay"
        viewBox="0 0 1440 820"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <filter id="blogCyanGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="blogLaserGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.5" result="blur1" />
            <feGaussianBlur stdDeviation="7" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="blogHudCenterGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00D2FF" stopOpacity="0.45" />
            <stop offset="40%" stopColor="#1254EB" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#050C1B" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Inti Cahaya Cyber */}
        <circle
          ref={hudCoreRef}
          cx="1060"
          cy="380"
          r="280"
          fill="url(#blogHudCenterGlow)"
          className="hud-core-glow"
        />

        {/* Outer Rings */}
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
          <circle
            cx="1060"
            cy="380"
            r="380"
            stroke="#00F0FF"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="190 2198"
            className="hud-beam-orbit-cw-1"
            filter="url(#blogLaserGlow)"
          />
        </g>

        {/* Mid Rings */}
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
          <circle
            cx="1060"
            cy="380"
            r="290"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="140 1682"
            className="hud-beam-orbit-ccw-2"
            filter="url(#blogLaserGlow)"
          />
          <circle
            cx="1060"
            cy="380"
            r="230"
            stroke="#00F0FF"
            strokeWidth="2.2"
            filter="url(#blogCyanGlow)"
            opacity="0.75"
          />
          <circle
            cx="1060"
            cy="380"
            r="230"
            stroke="#00F0FF"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeDasharray="130 1315"
            className="hud-beam-orbit-cw-3"
            filter="url(#blogLaserGlow)"
          />
        </g>

        {/* Inner Dial */}
        <g ref={hudInnerRef} className="hud-rotate-dial">
          <circle
            cx="1060"
            cy="380"
            r="160"
            stroke="#165DFF"
            strokeWidth="2"
            opacity="0.65"
          />
          <circle
            cx="1060"
            cy="380"
            r="160"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="80 920"
            className="hud-beam-orbit-dial"
            filter="url(#blogLaserGlow)"
          />
        </g>
      </svg>

      {/* Sisi Kiri: Teks & Logo 3D ARJUNA WEBDEV (Persis Home Page) */}
      <div className="hero-container-inner">
        <div className="hero-text-block" style={{ zIndex: 10 }}>
          {/* Logo 3D ARJUNA WEBDEV Emblem */}
          <div className="hero-emblem-wrapper">
            <img
              src="/assets/logo.png"
              alt="ARJUNA WEBDEV Logo"
              className="hero-emblem-img"
            />
          </div>

          {/* Badge Edukasi */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(18, 86, 232, 0.1)",
              border: "1px solid rgba(18, 86, 232, 0.25)",
              padding: "0.35rem 0.95rem",
              borderRadius: "9999px",
              fontSize: "0.78rem",
              fontWeight: 700,
              color: "#1256E8",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: "0.85rem",
            }}
          >
            <i className="fa-solid fa-newspaper" style={{ color: "#00D2FF" }}></i>
            <span>WAWASAN & PANDUAN DIGITAL</span>
          </div>

          {/* Judul Utama Hitam Tebal Modern Persis Home */}
          <h1 className="hero-headline">
            Wawasan & Strategi <br />
            Website Bisnis
          </h1>

          {/* Subjudul Rapi & Elegan */}
          <p className="hero-tagline">
            Edukasi transparan seputar estimasi biaya, optimasi SEO Google Maps,
            kecepatan akses, dan strategi digitalisasi UMKM Indonesia.
          </p>

          {/* Live Search Input Bar */}
          <div
            style={{
              maxWidth: "480px",
              position: "relative",
              marginBottom: "1.25rem",
            }}
          >
            <i
              className="fa-solid fa-magnifying-glass"
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#1256E8",
                fontSize: "0.95rem",
              }}
            ></i>
            <input
              type="text"
              placeholder="Cari topik artikel (contoh: biaya, SEO, kecepatan)..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              style={{
                width: "100%",
                padding: "0.8rem 2.5rem 0.8rem 2.75rem",
                background: "#FFFFFF",
                border: "1.5px solid #CBD5E1",
                borderRadius: "9999px",
                color: "#0A1128",
                fontSize: "0.92rem",
                fontWeight: 500,
                outline: "none",
                boxShadow: "0 6px 18px rgba(18, 86, 232, 0.08)",
                transition: "all 0.2s ease",
              }}
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                style={{
                  position: "absolute",
                  right: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "#64748B",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                }}
                aria-label="Hapus Pencarian"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>

          {/* Category Filter Pills (Desain Elegan) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              flexWrap: "wrap",
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                style={{
                  padding: "0.4rem 0.95rem",
                  borderRadius: "9999px",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  border:
                    selectedCategory === cat
                      ? "1px solid #1256E8"
                      : "1px solid #E2E8F0",
                  background:
                    selectedCategory === cat ? "#1256E8" : "#FFFFFF",
                  color: selectedCategory === cat ? "#FFFFFF" : "#475569",
                  boxShadow:
                    selectedCategory === cat
                      ? "0 4px 12px rgba(18, 86, 232, 0.3)"
                      : "0 2px 6px rgba(0, 0, 0, 0.04)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sisi Kanan: Foto Profil Arjuna Menonjol di Tengah-Kanan & Cyber HUD (Persis Home Page) */}
      <div className="hero-avatar-showcase">
        {/* Mobile Cyber HUD Radar Rings */}
        <svg
          className="hero-mobile-hud-svg"
          viewBox="0 0 360 360"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <filter id="blogMobileCyanGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="blogMobileHudGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00D2FF" stopOpacity="0.45" />
              <stop offset="45%" stopColor="#1254EB" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#050C1B" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx="180" cy="180" r="150" fill="url(#blogMobileHudGlow)" />

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
          </g>

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
              r="100"
              stroke="#00F0FF"
              strokeWidth="2"
              opacity="0.7"
              filter="url(#blogMobileCyanGlow)"
            />
          </g>
        </svg>

        {/* Floating Badge 1 (Kiri Atas): 5 Artikel Panduan */}
        <div
          style={{
            position: "absolute",
            top: "24%",
            left: "-15px",
            zIndex: 12,
            background: "rgba(10, 22, 43, 0.92)",
            border: "1px solid rgba(0, 210, 255, 0.45)",
            backdropFilter: "blur(14px)",
            borderRadius: "16px",
            padding: "0.75rem 1.15rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.45)",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "rgba(0, 210, 255, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#00D2FF",
              fontSize: "1rem",
            }}
          >
            <i className="fa-solid fa-book-open"></i>
          </div>
          <div>
            <div style={{ fontSize: "0.86rem", fontWeight: 800, color: "#FFFFFF" }}>
              10 Artikel Praktis
            </div>
            <div style={{ fontSize: "0.74rem", color: "#94A3B8" }}>
              Strategi & SEO 2026
            </div>
          </div>
        </div>

        {/* Floating Badge 2 (Kanan Bawah): 100% Edukasi Terverifikasi */}
        <div
          style={{
            position: "absolute",
            bottom: "16%",
            right: "20px",
            zIndex: 12,
            background: "rgba(10, 22, 43, 0.92)",
            border: "1px solid rgba(18, 86, 232, 0.5)",
            backdropFilter: "blur(14px)",
            borderRadius: "16px",
            padding: "0.75rem 1.15rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.45)",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "rgba(18, 86, 232, 0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#00D2FF",
              fontSize: "1rem",
            }}
          >
            <i className="fa-solid fa-shield-halved"></i>
          </div>
          <div>
            <div style={{ fontSize: "0.86rem", fontWeight: 800, color: "#FFFFFF" }}>
              100% Terverifikasi
            </div>
            <div style={{ fontSize: "0.74rem", color: "#94A3B8" }}>
              Oleh Haris Musafa
            </div>
          </div>
        </div>

        {/* Foto Profil Arjuna Cutout Bersih */}
        <div ref={avatarRef} className="hero-avatar-wrapper">
          <img
            src="/assets/profile.png"
            alt="Haris Musafa - Founder Arjuna Dev"
            className="hero-avatar-cutout"
          />
        </div>
      </div>
    </section>
  );
}
