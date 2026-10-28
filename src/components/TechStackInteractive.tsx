"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface TechSpec {
  id: string;
  code: string;
  name: string;
  role: string;
  category: "frontend" | "backend" | "motion";
  color: string;
  specLabel: string;
  specVal: string;
  desc: string;
  svg: React.ReactNode;
}

export default function TechStackInteractive() {
  const [activeTab, setActiveTab] = useState<"all" | "frontend" | "backend" | "motion">("all");
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isInitialMounted = useRef(false);

  const stacks: TechSpec[] = [
    {
      id: "01",
      code: "SSR_HYBRID_CORE",
      name: "Next.js 15",
      role: "Fullstack Server Architecture",
      category: "frontend",
      color: "#00D2FF",
      specLabel: "INITIAL_PAINT",
      specVal: "< 0.8 Detik",
      desc: "Server-Side Rendering (SSR) & Server Actions untuk waktu muat instan tanpa jeda blank putih, Core Web Vitals prima, dan pengindeksan SEO Google tertinggi.",
      svg: (
        <svg width="32" height="32" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="90" cy="90" r="88" fill="#060C1B" stroke="#00D2FF" strokeWidth="3" strokeOpacity="0.4" />
          <path
            d="M149.5 157.5L69.1 54H54V126H66.1V69.4L140 164.8C143.3 162.6 146.5 160.2 149.5 157.5Z"
            fill="url(#nextSvgGrad)"
          />
          <rect x="115" y="54" width="12" height="72" fill="url(#nextSvgGrad2)" />
          <defs>
            <linearGradient id="nextSvgGrad" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00D2FF" />
              <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="nextSvgGrad2" x1="121" y1="54" x2="120.8" y2="106.9" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="1" stopColor="#00D2FF" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      ),
    },
    {
      id: "02",
      code: "REACTIVE_ENGINE",
      name: "React 19",
      role: "Concurrent Component Tree",
      category: "frontend",
      color: "#61DAFB",
      specLabel: "FRAME_PACING",
      specVal: "60 FPS Mulus",
      desc: "Arsitektur komponen modular reaktif dengan React Server Components untuk navigasi super mulus tanpa jeda reload browser yang mengganggu pengunjung.",
      svg: (
        <svg width="34" height="34" viewBox="-11.5 -10.23 23 20.46" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="0" cy="0" r="2.2" fill="#61DAFB" />
          <g stroke="#61DAFB" strokeWidth="1.2" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      ),
    },
    {
      id: "03",
      code: "STRICT_TYPE_SAFETY",
      name: "TypeScript",
      role: "Static Type Verification",
      category: "frontend",
      color: "#38BDF8",
      specLabel: "TYPE_COVERAGE",
      specVal: "100% Strict",
      desc: "Validasi tipe statis ketat untuk mencegah bug kalkulasi data, kerentanan form, dan crash runtime sebelum website diluncurkan ke publik.",
      svg: (
        <svg width="30" height="30" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="18" fill="#1E3A8A" stroke="#38BDF8" strokeWidth="4" strokeOpacity="0.5" />
          <path d="M57.5 38.5H42.5V30h42v8.5H69.5V85h-12V38.5z" fill="#FFFFFF" />
          <path
            d="M29.5 59c3.2 0 6.1-.8 8.7-2.4l3.6 7.6c-3.8 2.6-8.2 3.9-13.3 3.9-6.3 0-11.2-1.9-14.8-5.7C10.1 58.6 8.3 53 8.3 45.6c0-7.3 1.9-12.9 5.7-16.7 3.8-3.8 8.8-5.7 15.1-5.7 5.1 0 9.5 1.3 13.3 3.9l-3.6 7.6c-2.6-1.6-5.5-2.4-8.7-2.4-3.6 0-6.4 1.2-8.5 3.6-2.1 2.4-3.1 5.7-3.1 9.7 0 4.1 1 7.3 3.1 9.7 2.1 2.4 4.9 3.7 8.5 3.7z"
            fill="#FFFFFF"
            transform="translate(10, 0)"
          />
        </svg>
      ),
    },
    {
      id: "04",
      code: "ATOMIC_STYLING",
      name: "Tailwind CSS",
      role: "Compiled Utility Design Engine",
      category: "motion",
      color: "#38BDF8",
      specLabel: "PAYLOAD_SIZE",
      specVal: "< 15 KB Gzip",
      desc: "Styling presisi terkompilasi murni tanpa dependensi berat, menghasilkan ukuran bundle stylesheet ultra-ringan dengan konsistensi visual 100% responsif.",
      svg: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="#38BDF8" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
        </svg>
      ),
    },
    {
      id: "05",
      code: "HARDWARE_MOTION",
      name: "GSAP Motion",
      role: "GPU Kinetic Animation Suite",
      category: "motion",
      color: "#88CE02",
      specLabel: "SYNC_RATE",
      specVal: "60 FPS Locked",
      desc: "Engine animasi hardware-accelerated untuk transisi visual halus, scroll-trigger presisi tinggi, dan efek micro-interaction mewah tanpa stutter.",
      svg: (
        <svg width="30" height="30" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="20" fill="rgba(136, 206, 2, 0.12)" stroke="#88CE02" strokeWidth="4" strokeOpacity="0.6" />
          <text x="50" y="68" fontSize="46" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#88CE02">
            G
          </text>
        </svg>
      ),
    },
    {
      id: "06",
      code: "ASYNC_RUNTIME",
      name: "Node.js",
      role: "Event-Driven I/O Pipeline",
      category: "backend",
      color: "#5FA04E",
      specLabel: "API_LATENCY",
      specVal: "< 40ms Edge",
      desc: "Menangani webhook WhatsApp otomatis, formulir dinamis instan, dan integrasi payment gateway dengan arsitektur non-blocking berkapasitas tinggi.",
      svg: (
        <svg width="30" height="30" viewBox="0 0 256 289" fill="#5FA04E" xmlns="http://www.w3.org/2000/svg">
          <path d="M128 0L24.8 59.6v119.2L128 238.4l103.2-59.6V59.6L128 0zm79.8 163.5L128 209.6l-79.8-46.1V70.9L128 24.8l79.8 46.1v92.6z" />
          <path d="M128 49.6L67.1 84.8v70.4l60.9 35.2 60.9-35.2V84.8L128 49.6z" />
        </svg>
      ),
    },
    {
      id: "07",
      code: "ACID_RELATIONAL",
      name: "PostgreSQL",
      role: "Enterprise Cloud Database",
      category: "backend",
      color: "#60A5FA",
      specLabel: "DATA_PARITY",
      specVal: "99.99% Uptime",
      desc: "Penyimpanan data relasional ACID-compliant yang menjamin integritas transaksi penjualan, inventaris katalog, dan data pengguna secara aman.",
      svg: (
        <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="30" fill="rgba(51, 103, 145, 0.2)" stroke="#336791" strokeWidth="2.5" />
          <path d="M32 14c-11.05 0-20 7.16-20 16 0 5.8 3.86 10.87 9.8 13.68l-.8 6.32 7.2-3.6c1.23.23 2.5.36 3.8.36 11.05 0 20-7.16 20-16s-8.95-16-20-16z" fill="#336791" />
          <path d="M32 18c-8.84 0-16 5.37-16 12 0 4.35 2.9 8.15 7.35 10.26l-.6 4.74 5.4-2.7c.92.17 1.88.27 2.85.27 8.84 0 16-5.37 16-12s-7.16-12-16-12z" fill="#60A5FA" />
        </svg>
      ),
    },
    {
      id: "08",
      code: "DESIGN_SYSTEM",
      name: "Figma Pro",
      role: "Interactive UI/UX & Prototyping",
      category: "motion",
      color: "#F24E1E",
      specLabel: "FIDELITY",
      specVal: "1:1 Pixel Match",
      desc: "Perancangan arsitektur visual dan alur pengguna secara presisi sebelum koding dilakukan, memastikan hasil akhir 100% selaras dengan visi bisnis Anda.",
      svg: (
        <svg width="24" height="34" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 28.5C19 23.25 23.25 19 28.5 19C33.75 19 38 23.25 38 28.5C38 33.75 33.75 38 28.5 38C23.25 38 19 33.75 19 28.5Z" fill="#1ABCFE" />
          <path d="M0 47.5C0 42.25 4.25 38 9.5 38H19V47.5C19 52.75 14.75 57 9.5 57C4.25 57 0 52.75 0 47.5Z" fill="#0ACF83" />
          <path d="M19 0V19H28.5C33.75 19 38 14.75 38 9.5C38 4.25 33.75 0 28.5 0H19Z" fill="#FF7262" />
          <path d="M0 9.5C0 14.75 4.25 19 9.5 19H19V0H9.5C4.25 0 0 4.25 0 9.5Z" fill="#F24E1E" />
          <path d="M0 28.5C0 33.75 4.25 38 9.5 38H19V19H9.5C4.25 19 0 23.25 0 28.5Z" fill="#A259FF" />
        </svg>
      ),
    },
  ];

  // 3D Magnetic Perspective Tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
      rotationY: xNorm * 7.5,
      rotationX: -yNorm * 7.5,
      y: -7,
      transformPerspective: 1100,
      duration: 0.22,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;
    const card = e.currentTarget;
    card.style.removeProperty("--mouse-x");
    card.style.removeProperty("--mouse-y");

    gsap.to(card, {
      rotationY: 0,
      rotationX: 0,
      y: 0,
      duration: 0.55,
      ease: "power2.out",
      overwrite: "auto",
      clearProps: "transform",
    });
  };

  // 1. GSAP ScrollTrigger Entrance & Parallax Scrub Engine
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const header = headerRef.current;
      const nav = navRef.current;
      const grid = gridRef.current;
      const canvas = canvasRef.current;
      if (!section || !grid) return;

      const cards = grid.querySelectorAll<HTMLElement>(".cyber-tech-card");
      const medallions = grid.querySelectorAll(".emblazon-medallion");
      const laserPackets = grid.querySelectorAll<HTMLElement>(".bus-laser-packet");

      // ── Main Section Entrance Timeline (Choreographed Staggered Reveal) ──
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true,
        },
      });

      // Header Telemetry Badge entrance
      if (header) {
        const badge = header.querySelector(".pf-tech-badge-wrap");
        const title = header.querySelector(".pf-section-title");
        const desc = header.querySelector(".pf-section-desc");

        if (badge) {
          entranceTl.fromTo(
            badge,
            { opacity: 0, y: -26, scale: 0.88, filter: "blur(6px)" },
            { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.65, ease: "back.out(1.6)" }
          );
        }

        if (title) {
          entranceTl.fromTo(
            title,
            { opacity: 0, y: 35, filter: "blur(8px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.75, ease: "power3.out" },
            "-=0.4"
          );
        }

        if (desc) {
          entranceTl.fromTo(
            desc,
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" },
            "-=0.45"
          );
        }
      }

      // Cyber Nav Filter Tabs Entrance
      if (nav) {
        entranceTl.fromTo(
          nav,
          { opacity: 0, y: 22, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" },
          "-=0.35"
        );
      }

      // 8 Obsidian Cyber Cards 3D Stagger Cascade
      if (cards.length > 0) {
        entranceTl.fromTo(
          cards,
          {
            opacity: 0,
            y: 70,
            scale: 0.92,
            rotateX: 16,
            transformPerspective: 1000,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 0.85,
            stagger: {
              amount: 0.38,
              from: "start",
            },
            ease: "power3.out",
            onComplete: () => {
              // Clear inline transforms so mouse 3D tilt is 100% smooth without conflicts
              cards.forEach((card) => {
                card.style.transform = "";
              });
            },
          },
          "-=0.3"
        );

        // Medallion icon pop
        if (medallions.length > 0) {
          entranceTl.fromTo(
            medallions,
            { scale: 0.65, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.55,
              stagger: {
                amount: 0.38,
                from: "start",
              },
              ease: "back.out(2)",
            },
            "-=0.7"
          );
        }

        // Circuit trace laser packet initial boot sweep
        if (laserPackets.length > 0) {
          entranceTl.fromTo(
            laserPackets,
            { left: "-40%", opacity: 1 },
            {
              left: "140%",
              opacity: 1,
              duration: 1.1,
              stagger: {
                amount: 0.45,
                from: "start",
              },
              ease: "power2.inOut",
              onComplete: () => {
                laserPackets.forEach((p) => {
                  p.style.opacity = "";
                  p.style.left = "";
                });
              },
            },
            "-=0.55"
          );
        }
      }

      // ── Continuous Scroll Scrub Parallax (Hardware-Accelerated Cinematic Space) ──
      if (canvas) {
        // Dynamic laser scanline tracking scroll
        const scanline = canvas.querySelector(".cyber-scroll-scanline");
        if (scanline) {
          gsap.fromTo(
            scanline,
            { top: "5%", opacity: 0 },
            {
              top: "95%",
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top 60%",
                end: "bottom 30%",
                scrub: 0.8,
              },
            }
          );
        }

        // Left Concentric HUD Hologram Orbit
        const hudLeft = canvas.querySelector(".hud-orbit-left");
        if (hudLeft) {
          gsap.to(hudLeft, {
            y: -85,
            rotate: "+=45",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          });
        }

        // Right Concentric HUD Hologram Orbit
        const hudRight = canvas.querySelector(".hud-orbit-right");
        if (hudRight) {
          gsap.to(hudRight, {
            y: 80,
            rotate: "-=40",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          });
        }

        // Deep Perspective Cyber Grid Plane
        const gridPlane = canvas.querySelector(".cyber-grid-plane");
        if (gridPlane) {
          gsap.to(gridPlane, {
            y: 60,
            rotateX: 36,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        }

        // Living Fluid Aurora Plasma Orbs
        const orbCyan = canvas.querySelector(".cyber-plasma-orb.orb-cyan");
        if (orbCyan) {
          gsap.to(orbCyan, {
            y: -75,
            x: 35,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          });
        }

        const orbBlue = canvas.querySelector(".cyber-plasma-orb.orb-blue");
        if (orbBlue) {
          gsap.to(orbBlue, {
            y: 75,
            x: -45,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          });
        }

        const orbEmerald = canvas.querySelector(".cyber-plasma-orb.orb-emerald");
        if (orbEmerald) {
          gsap.to(orbEmerald, {
            y: -40,
            scale: 1.15,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          });
        }
      }

      // Refresh ScrollTrigger calculations after initial paint
      const timer = setTimeout(() => ScrollTrigger.refresh(), 250);
      return () => clearTimeout(timer);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 2. Filter Tab Interactive Stagger Transition
  useEffect(() => {
    if (!isInitialMounted.current) {
      isInitialMounted.current = true;
      return;
    }
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll<HTMLElement>(".cyber-tech-card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 28, scale: 0.94, rotateX: 10, transformPerspective: 1000 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 0.48,
        stagger: 0.06,
        ease: "power3.out",
        clearProps: "transform",
      }
    );

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const filtered = stacks.filter(
    (s) => activeTab === "all" || s.category === activeTab
  );

  return (
    <section className="pf-tech-section" id="teknologi" ref={sectionRef}>
      {/* ═════════ CINEMATIC CYBER-KINETIC MOVING BACKGROUND ═════════ */}
      <div className="pf-tech-bg-canvas" ref={canvasRef} aria-hidden="true">
        {/* 1. Deep Perspective Cyber Grid Plane */}
        <div className="cyber-grid-plane"></div>
        <div className="cyber-grid-scanline"></div>

        {/* Scroll-driven dynamic scanline laser tracker */}
        <div className="cyber-scroll-scanline"></div>

        {/* 2. Living Fluid Aurora Plasma Orbs (Breathing & Drifting) */}
        <div className="cyber-plasma-orb orb-cyan"></div>
        <div className="cyber-plasma-orb orb-blue"></div>
        <div className="cyber-plasma-orb orb-emerald"></div>

        {/* 3. Left Rotating HUD Concentric Orbit with Laser Beam (Matches Arjuna Hero) */}
        <svg className="cyber-hud-orbit hud-orbit-left" viewBox="0 0 600 600" fill="none">
          <circle cx="300" cy="300" r="275" stroke="rgba(0, 210, 255, 0.12)" strokeWidth="1" />
          <circle cx="300" cy="300" r="215" stroke="rgba(18, 86, 232, 0.18)" strokeWidth="1.2" strokeDasharray="12 16" className="hud-rot-ccw" />
          <circle cx="300" cy="300" r="155" stroke="rgba(0, 210, 255, 0.15)" strokeWidth="1" strokeDasharray="6 8" className="hud-rot-cw" />
          {/* Orbiting Laser Beam */}
          <circle cx="300" cy="300" r="275" stroke="url(#laserGradL)" strokeWidth="2.5" strokeDasharray="65 1660" strokeLinecap="round" className="hud-laser-spin" />
          {/* Glowing Telemetry Satellite Nodes */}
          <circle cx="575" cy="300" r="3.5" fill="#00D2FF" className="hud-glow-node" />
          <circle cx="300" cy="85" r="3" fill="#38BDF8" className="hud-glow-node" />
          <circle cx="145" cy="455" r="2.5" fill="#1256E8" className="hud-glow-node" />
          <defs>
            <linearGradient id="laserGradL" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00D2FF" stopOpacity="1" />
              <stop offset="100%" stopColor="#00D2FF" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* 4. Right Rotating HUD Concentric Orbit with Laser Beam */}
        <svg className="cyber-hud-orbit hud-orbit-right" viewBox="0 0 600 600" fill="none">
          <circle cx="300" cy="300" r="275" stroke="rgba(0, 210, 255, 0.12)" strokeWidth="1" />
          <circle cx="300" cy="300" r="205" stroke="rgba(0, 210, 255, 0.16)" strokeWidth="1.2" strokeDasharray="10 14" className="hud-rot-cw" />
          <circle cx="300" cy="300" r="145" stroke="rgba(18, 86, 232, 0.2)" strokeWidth="1" strokeDasharray="8 12" className="hud-rot-ccw" />
          {/* Orbiting Laser Beam */}
          <circle cx="300" cy="300" r="205" stroke="url(#laserGradR)" strokeWidth="2.5" strokeDasharray="50 1238" strokeLinecap="round" className="hud-laser-spin-rev" />
          <circle cx="300" cy="95" r="3.5" fill="#00D2FF" className="hud-glow-node" />
          <circle cx="95" cy="300" r="3" fill="#1256E8" className="hud-glow-node" />
          <defs>
            <linearGradient id="laserGradR" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00D2FF" stopOpacity="1" />
              <stop offset="100%" stopColor="#00D2FF" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* 5. Flowing Data Highways (Horizontal Laser Traces) */}
        <div className="cyber-data-highway highway-top">
          <div className="highway-packet packet-1"></div>
        </div>
        <div className="cyber-data-highway highway-mid">
          <div className="highway-packet packet-2"></div>
        </div>
        <div className="cyber-data-highway highway-bottom">
          <div className="highway-packet packet-3"></div>
        </div>

        {/* 6. Rising Cyber Nano-Nodes & Sparkles */}
        <div className="cyber-sparks-wrap">
          <span className="nano-spark sp-1"></span>
          <span className="nano-spark sp-2"></span>
          <span className="nano-spark sp-3"></span>
          <span className="nano-spark sp-4"></span>
          <span className="nano-spark sp-5"></span>
          <span className="nano-spark sp-6"></span>
          <span className="nano-spark sp-7"></span>
          <span className="nano-spark sp-8"></span>
          <span className="nano-spark sp-9"></span>
          <span className="nano-spark sp-10"></span>
        </div>
      </div>

      <div className="container relative-z">
        {/* Section Header with Cyber Telemetry Badge */}
        <div className="pf-section-header text-center" ref={headerRef}>
          <div className="pf-tech-badge-wrap">
            <span className="pf-cyber-kicker">
              <span className="kicker-brackets">[</span>
              <span className="kicker-pulse-dot"></span>
              ARSITEKTUR_TEKNOLOGI // PRODUCTION_SPEC
              <span className="kicker-brackets">]</span>
            </span>
          </div>

          <h2 className="pf-section-title">
            Bukan Template Siap Pakai. <br />
            <span className="pf-text-gradient">Teknologi Modern Standar Industri.</span>
          </h2>

          <p className="pf-section-desc">
            Kombinasi teknologi mutakhir yang kami terapkan untuk menjamin kecepatan render sub-detik, stabilitas sistem tanpa crash, dan visual berkelas bagi bisnis Anda.
          </p>
        </div>

        {/* Clean Cyber Filter Tabs */}
        <div className="pf-cyber-nav" ref={navRef} role="tablist" aria-label="Filter Stack">
          <button
            type="button"
            className={`cyber-nav-btn ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            Semua Stack <span className="nav-count">8</span>
          </button>
          <button
            type="button"
            className={`cyber-nav-btn ${activeTab === "frontend" ? "active" : ""}`}
            onClick={() => setActiveTab("frontend")}
          >
            Frontend Core <span className="nav-count">3</span>
          </button>
          <button
            type="button"
            className={`cyber-nav-btn ${activeTab === "backend" ? "active" : ""}`}
            onClick={() => setActiveTab("backend")}
          >
            Backend & Data <span className="nav-count">2</span>
          </button>
          <button
            type="button"
            className={`cyber-nav-btn ${activeTab === "motion" ? "active" : ""}`}
            onClick={() => setActiveTab("motion")}
          >
            Styling & Motion <span className="nav-count">3</span>
          </button>
        </div>

        {/* ═════════ 8 BESPOKE OBSIDIAN CYBER CARDS ═════════ */}
        <div className="cyber-cards-matrix" ref={gridRef}>
          {filtered.map((item) => (
            <div
              key={item.id}
              className="cyber-tech-card"
              style={
                {
                  "--accent-color": item.color,
                } as React.CSSProperties
              }
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Corner Registration Crosshair Accents */}
              <span className="corner-crosshair top-l" aria-hidden="true">+</span>
              <span className="corner-crosshair top-r" aria-hidden="true">+</span>
              <span className="corner-crosshair btm-l" aria-hidden="true">+</span>
              <span className="corner-crosshair btm-r" aria-hidden="true">+</span>

              {/* Dynamic Electric Border Beam on Hover */}
              <div className="cyber-border-beam" aria-hidden="true"></div>

              {/* Soft Ambient Radial Backlight */}
              <div className="cyber-card-backlight" aria-hidden="true"></div>

              {/* Cursor Spotlight Follower */}
              <div className="cyber-card-spotlight" aria-hidden="true"></div>

              {/* Top Meta Bar */}
              <div className="cyber-card-topbar">
                <div className="topbar-id-pill">
                  <span className="id-num">{item.id}</span>
                  <span className="id-divider">/</span>
                  <span className="id-code">{item.code}</span>
                </div>
                <div className="topbar-status-radar">
                  <span className="radar-node"></span>
                  <span className="radar-text">READY</span>
                </div>
              </div>

              {/* Brand Emblazon Medallion */}
              <div className="cyber-emblazon-wrap">
                <div className="emblazon-medallion">
                  <div className="medallion-vector-frame">{item.svg}</div>
                  <div className="medallion-ring-halo" aria-hidden="true"></div>
                </div>
                <div className="emblazon-watermark-ghost" aria-hidden="true">
                  {item.svg}
                </div>
              </div>

              {/* Card Typography Content */}
              <div className="cyber-card-narrative">
                <div className="narrative-heading-group">
                  <h3 className="cyber-tech-title">{item.name}</h3>
                  <span className="cyber-tech-role">{item.role}</span>
                </div>
                <p className="cyber-tech-desc">{item.desc}</p>
              </div>

              {/* Bottom Telemetry Bus Bar */}
              <div className="cyber-card-bottombus">
                <div className="bus-trace-line" aria-hidden="true">
                  <div className="bus-laser-packet"></div>
                </div>
                <div className="bus-meta-row">
                  <div className="bus-spec-wrap">
                    <span className="spec-label">{item.specLabel}</span>
                    <strong className="spec-value">{item.specVal}</strong>
                  </div>
                  <div className="bus-indicator-arrow" aria-hidden="true">
                    <span>↗</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
