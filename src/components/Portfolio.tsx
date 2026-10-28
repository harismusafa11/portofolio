"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TechStackInteractive from "@/components/TechStackInteractive";

interface PortfolioProps {
  onOpenProject: (id: number) => void;
}

export default function Portfolio({ onOpenProject }: PortfolioProps) {
  const [filter, setFilter] = useState<string>("all");

  const portfolioRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLImageElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const triangleRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const filterCategories = [
    { label: "All", value: "all" },
    { label: "Website Bisnis", value: "bisnis" },
    { label: "Web App & SaaS", value: "sistem" },
    { label: "Landing Page", value: "landing" },
  ];

  const projectsList = [
    {
      id: 1,
      title: "PT Bintang Pratama Spices Indo",
      category: "bisnis",
      tag: "B2B EXPORT",
      image: "/assets/projects/bintang_pratama.jpg",
      isLogo: false,
      theme: "card-dark",
      hasTopRight: true,
      topRightIcon: "fa-arrow-up-right-from-square",
      topRightClass: "btn-action-dark",
      hasBottomRight: true,
      bottomRightIcon: "fa-plus",
      bottomRightClass: "btn-action-cyan",
      hasDots: true,
      descLines: "Platform ekspor rempah nusantara berstandar global & kalkulator CIF",
    },
    {
      id: 2,
      title: "Phototor Studio",
      category: "sistem",
      tag: "WEB APP / SAAS",
      image: "/assets/projects/phototor_studio.png",
      isLogo: false,
      theme: "card-light",
      hasTopRight: true,
      topRightIcon: "fa-arrow-up-right-from-square",
      topRightClass: "btn-action-blue",
      hasBottomRight: true,
      bottomRightIcon: "fa-arrow-right",
      bottomRightClass: "btn-action-blue",
      hasDots: false,
      descLines: "Online photo editor & PSD web tool dengan AI background remover",
    },
    {
      id: 3,
      title: "invitationbuilder.net",
      category: "sistem",
      tag: "SAAS PLATFORM",
      image: "/assets/projects/invitation_builder.png",
      isLogo: false,
      theme: "card-light",
      hasTopRight: true,
      topRightIcon: "fa-arrow-up-right-from-square",
      topRightClass: "btn-action-blue",
      hasBottomRight: true,
      bottomRightIcon: "fa-arrow-right",
      bottomRightClass: "btn-action-cyan",
      hasDots: false,
      descLines: "Pembuat undangan digital pernikahan elegan & manajemen RSVP real-time",
    },
    {
      id: 4,
      title: "Nova Rental Mobil",
      category: "bisnis",
      tag: "BOOKING SYSTEM",
      image: "/assets/projects/nova_rental.png",
      isLogo: false,
      theme: "card-dark",
      hasTopRight: true,
      topRightIcon: "fa-arrow-up-right-from-square",
      topRightClass: "btn-action-dark",
      hasBottomRight: true,
      bottomRightIcon: "fa-plus",
      bottomRightClass: "btn-action-blue",
      hasDots: false,
      descLines: "Platform sewa mobil online, lepas kunci & supir terintegrasi WhatsApp",
    },
    {
      id: 5,
      title: "AURA Beauty Clinic",
      category: "landing",
      tag: "LUXURY CLINIC",
      image: "/assets/projects/aura_clinic.jpg",
      isLogo: false,
      theme: "card-light",
      hasTopRight: true,
      topRightIcon: "fa-arrow-up-right-from-square",
      topRightClass: "btn-action-blue",
      hasBottomRight: true,
      bottomRightIcon: "fa-arrow-right",
      bottomRightClass: "btn-action-cyan",
      hasDots: false,
      descLines: "Website klinik estetika mewah dengan reservasi jadwal konsultasi dokter",
    },
    {
      id: 6,
      title: "ARENA X Futsal",
      category: "sistem",
      tag: "SPORTS BOOKING",
      image: "/assets/projects/arena_futsal.png",
      isLogo: false,
      theme: "card-dark",
      hasTopRight: true,
      topRightIcon: "fa-arrow-up-right-from-square",
      topRightClass: "btn-action-dark",
      hasBottomRight: true,
      bottomRightIcon: "fa-plus",
      bottomRightClass: "btn-action-cyan",
      hasDots: true,
      descLines: "Sistem reservasi sewa lapangan futsal 24 jam rumput sintetis standar FIFA",
    },
    {
      id: 7,
      title: "FL Streams",
      category: "landing",
      tag: "HD STREAMING",
      image: "/assets/projects/fl_streams.png",
      isLogo: false,
      theme: "card-dark",
      hasTopRight: true,
      topRightIcon: "fa-arrow-up-right-from-square",
      topRightClass: "btn-action-dark",
      hasBottomRight: true,
      bottomRightIcon: "fa-plus",
      bottomRightClass: "btn-action-blue",
      hasDots: false,
      descLines: "Portal live sport streaming HD low-latency tanpa login & tanpa biaya",
    },
    {
      id: 8,
      title: "kickTvStreams",
      category: "sistem",
      tag: "SPORTS & CHAT",
      image: "/assets/projects/kicktv_streams.png",
      isLogo: false,
      theme: "card-light",
      hasTopRight: true,
      topRightIcon: "fa-arrow-up-right-from-square",
      topRightClass: "btn-action-blue",
      hasBottomRight: true,
      bottomRightIcon: "fa-arrow-right",
      bottomRightClass: "btn-action-cyan",
      hasDots: false,
      descLines: "Platform live sports global dengan chat interaktif komunitas penonton",
    },
  ];

  const stats = [
    { value: 50, suffix: "+", label: "Proyek Selesai", icon: "fa-folder-open" },
    { value: 100, suffix: "+", label: "Klien Puas", icon: "fa-users" },
    { value: 99, suffix: "%", label: "Tingkat Kepuasan", icon: "fa-star" },
    { value: 3, suffix: " Tahun", label: "Pengalaman", icon: "fa-trophy" },
  ];

  const techStack = [
    {
      id: "01",
      name: "Next.js 15",
      role: "Fullstack Web Architecture",
      category: "SSR Framework",
      categoryGroup: "frontend" as const,
      icon: "fa-solid fa-bolt",
      color: "#00D2FF",
      desc: "Server-Side Rendering (SSR) & Server Actions untuk waktu render instan <0.8 detik dan optimasi SEO Google maksimal.",
      tags: ["App Router", "SSR / SSG", "Server Actions"],
      metric: "<0.8s",
      metricLabel: "Waktu Muat Awal",
    },
    {
      id: "02",
      name: "React 19",
      role: "Reactive UI Architecture",
      category: "UI Core",
      categoryGroup: "frontend" as const,
      icon: "fa-brands fa-react",
      color: "#61DAFB",
      desc: "Sistem komponen modular dan reaktif untuk navigasi halaman dinamis tanpa reload browser yang mengganggu kenyamanan pengunjung.",
      tags: ["Component Tree", "Modern Hooks", "Reactive State"],
      metric: "60 FPS",
      metricLabel: "Transisi Halus",
    },
    {
      id: "03",
      name: "TypeScript",
      role: "Type Safety & Reliability",
      category: "Core Language",
      categoryGroup: "frontend" as const,
      icon: "fa-solid fa-code",
      color: "#38BDF8",
      desc: "Validasi tipe ketat untuk mencegah bug kalkulasi data sejak tahap koding, menjamin sistem stabil tanpa crash runtime.",
      tags: ["Strict Typing", "Clean Architecture", "Zero Bug"],
      metric: "100%",
      metricLabel: "Type Coverage",
    },
    {
      id: "04",
      name: "Tailwind CSS",
      role: "Modern Utility-First Engine",
      category: "Styling Engine",
      categoryGroup: "motion" as const,
      icon: "fa-solid fa-wind",
      color: "#38BDF8",
      desc: "Styling presisi terkompilasi murni tanpa dependensi berat, menghasilkan ukuran bundle stylesheet ultra-ringan di semua layar.",
      tags: ["Atomic CSS", "Fluid Layout", "Zero CSS Bloat"],
      metric: "<15 KB",
      metricLabel: "Ukuran File CSS",
    },
    {
      id: "05",
      name: "GSAP Motion",
      role: "Akselerasi Animasi GPU",
      category: "Micro Interaction",
      categoryGroup: "motion" as const,
      icon: "fa-solid fa-wand-magic-sparkles",
      color: "#88CE02",
      desc: "Engine animasi hardware-accelerated 60 FPS untuk transisi visual, scroll-trigger presisi, dan micro-interaction mewah tanpa jitter.",
      tags: ["ScrollTrigger", "Hardware Accel", "Smooth Scrub"],
      metric: "60 FPS",
      metricLabel: "Frame Rate Stabil",
    },
    {
      id: "06",
      name: "Node.js",
      role: "Asynchronous Runtime",
      category: "Backend API",
      categoryGroup: "backend" as const,
      icon: "fa-brands fa-node-js",
      color: "#68A063",
      desc: "Menangani webhook WhatsApp otomatis, formulir dinamis instan, dan integrasi payment gateway dengan latensi minimal.",
      tags: ["RESTful API", "Non-Blocking I/O", "Secure Gateway"],
      metric: "<120ms",
      metricLabel: "Respon Endpoint",
    },
    {
      id: "07",
      name: "PostgreSQL",
      role: "Relational Data Storage",
      category: "Database Cloud",
      categoryGroup: "backend" as const,
      icon: "fa-solid fa-database",
      color: "#60A5FA",
      desc: "Penyimpanan data ACID-compliant yang menjamin integritas transaksi, inventaris produk katalog, dan data pengguna secara aman.",
      tags: ["ACID Compliant", "Relational Schema", "Data Integrity"],
      metric: "99.99%",
      metricLabel: "Integritas Data",
    },
    {
      id: "08",
      name: "Figma Pro",
      role: "UI/UX & Prototyping",
      category: "Design System",
      categoryGroup: "motion" as const,
      icon: "fa-brands fa-figma",
      color: "#F24E1E",
      desc: "Perancangan user flow, wireframe interaktif, dan design system presisi sebelum koding agar hasil akhir selaras visi bisnis Anda.",
      tags: ["Design System", "Interactive Prototype", "Pixel-Accurate"],
      metric: "1:1",
      metricLabel: "Fidelitas Desain",
    },
  ];

  const testimonials = [
    {
      name: "Ir. Rendra Wijayakusuma",
      role: "Managing Director & Co-Owner",
      company: "PT Kencana Art Wood",
      location: "Jepara, Jawa Tengah",
      avatar: "RW",
      image: "/assets/client_rendra.jpg",
      avatarColor: "linear-gradient(135deg, #0284C7 0%, #0047AB 100%)",
      projectType: "Katalog Ekspor & B2B Web App",
      projectResult: "PageSpeed 96 • Loading Katalog <0.9s",
      metricIcon: "fa-solid fa-gauge-high",
      rating: 5,
      highlightPhrase: "Inquiry buyer mancanegara melonjak sejak website baru rilis.",
      text: "Sebelumnya buyer kami dari Australia dan Belanda sering mengeluhkan website lama yang lambat saat memuat katalog produk kayu resolusi tinggi. Mas Arjuna merombak arsitekturnya memakai Next.js dan optimasi media otomatis. Hasilnya luar biasa: skor PageSpeed mobile naik ke 96, loading katalog turun di bawah 1 detik, dan pesan penawaran WhatsApp masuk melonjak tajam tanpa kendala teknis.",
      tags: ["Next.js SSR", "Optimasi WebP", "B2B Global"],
    },
    {
      name: "dr. Felicia Tanudjaja, Sp.D.V.E",
      role: "Founder & Head Medical Practitioner",
      company: "Dermaplus Aesthetic Clinic",
      location: "Surabaya Barat",
      avatar: "FT",
      image: "/assets/client_felicia.jpg",
      avatarColor: "linear-gradient(135deg, #0D9488 0%, #0369A1 100%)",
      projectType: "Web Profil Medis & Reservasi Konsultasi",
      projectResult: "+140% Reservasi Pasien Baru via WhatsApp",
      metricIcon: "fa-solid fa-arrow-trend-up",
      rating: 5,
      highlightPhrase: "Tampilan elegan berkelas, pasien baru langsung percaya.",
      text: "Di bidang klinik estetika medis, impresi pertama dari website menentukan apakah pasien percaya untuk reservasi tindakan atau tidak. Desain yang dirancang Arjuna sangat elegan, higienis, dan tombol konsultasi dokternya langsung tersambung rapi ke sistem admin front-desk kami. Banyak pasien baru menyebut mereka mantap datang karena websitenya tampak jauh lebih kredibel dibanding klinik lain.",
      tags: ["Desain Estetika", "Direct WhatsApp", "Mobile First"],
    },
    {
      name: "Hendrawan Kusuma, S.T.",
      role: "Head of Operations & Fleet",
      company: "Samudera Trans Logistik",
      location: "Jakarta Utara",
      avatar: "HK",
      image: "/assets/client_hendrawan.jpg",
      avatarColor: "linear-gradient(135deg, #4338CA 0%, #1E1B4B 100%)",
      projectType: "Web Korporat & Kalkulator Tarif Kargo",
      projectResult: "Form Kalkulasi Realtime 0% Error",
      metricIcon: "fa-solid fa-calculator",
      rating: 5,
      highlightPhrase: "Eksekusi presisi, form kalkulasi kargo sangat lancar.",
      text: "Kami sempat ragu apakah developer web sanggup memahami kebutuhan industri ekspedisi logistik yang banyak variabel perhitungannya. Arjuna membuktikan eksekusinya sangat teliti: kalkulator estimasi tarif kontainer bekerja instan tanpa jeda di smartphone, tampilan korporatnya tegas dan prestisius, serta seluruh revisi diselesaikan tepat waktu tanpa molor.",
      tags: ["Interactive Form", "Web Korporat", "Clean Code"],
    },
  ];

  const [countersVisible, setCountersVisible] = useState(false);
  const [activeTestiIndex, setActiveTestiIndex] = useState(0);
  const [techFilter, setTechFilter] = useState<"all" | "frontend" | "backend" | "motion">("all");

  const filteredTechStack = techFilter === "all"
    ? techStack
    : techStack.filter((t) => t.categoryGroup === techFilter);

  // Smooth filter animation when techFilter changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.fromTo(
      ".pf-tech-card",
      { opacity: 0, y: 15, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.35, stagger: 0.04, ease: "power2.out" }
    );
  }, [techFilter]);

  const nextTesti = () => {
    setActiveTestiIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTesti = () => {
    setActiveTestiIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTesti = testimonials[activeTestiIndex];

  // Smooth content transition on testimonial tab change
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.fromTo(
      ".pf-spotlight-inner-grid",
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
    );
  }, [activeTestiIndex]);

  // GSAP ScrollTrigger Engine
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const isDesktop = window.innerWidth >= 768;

      // 1. Parallax Avatar, Ring, & Cyber Triangle on Shelf Scroll (scoped to #portofolio)
      if (avatarRef.current) {
        gsap.to(avatarRef.current, {
          y: isDesktop ? -85 : -30,
          scale: isDesktop ? 1.05 : 1.02,
          ease: "none",
          scrollTrigger: {
            trigger: "#portofolio",
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      if (ringRef.current) {
        gsap.to(ringRef.current, {
          y: isDesktop ? 55 : 20,
          rotation: isDesktop ? 60 : 25,
          scale: isDesktop ? 1.15 : 1.05,
          ease: "none",
          scrollTrigger: {
            trigger: "#portofolio",
            start: "top top",
            end: "bottom top",
            scrub: 1.3,
          },
        });
      }

      if (triangleRef.current) {
        gsap.to(triangleRef.current, {
          y: isDesktop ? 40 : 15,
          scale: isDesktop ? 1.08 : 1.03,
          rotation: isDesktop ? 12 : 5,
          ease: "none",
          scrollTrigger: {
            trigger: "#portofolio",
            start: "top top",
            end: "bottom top",
            scrub: 1.4,
          },
        });
      }

      // 2. Header & Filter Entrance
      gsap.from(".portfolio-top-header .portfolio-main-title", {
        y: 35,
        opacity: 0,
        duration: 0.75,
        ease: "power3.out",
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: ".portfolio-top-header",
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(".portfolio-top-header .portfolio-main-sub", {
        y: 20,
        opacity: 0,
        duration: 0.65,
        delay: 0.1,
        ease: "power2.out",
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: ".portfolio-top-header",
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(".portfolio-filter-row .pf-pill-btn", {
        y: 15,
        opacity: 0,
        duration: 0.45,
        stagger: 0.06,
        ease: "power2.out",
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: ".portfolio-filter-row",
          start: "top 90%",
          once: true,
        },
      });

      // 3. Staggered Entrance of Shelf Cards (clearing transform so CSS hover works)
      gsap.from(".shelf-card", {
        y: 55,
        opacity: 0,
        scale: 0.94,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: ".shelf-cards-row",
          start: "top 85%",
          once: true,
        },
      });

      // 4. Shelf Bottom Bar
      gsap.from(".shelf-bottom-bar", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: ".shelf-bottom-bar",
          start: "top 92%",
          once: true,
        },
      });

      // 5. Achievement Stats Cards: Punchy 3D Entrance + Real-Time Scroll Parallax Wave
      const statCards = gsap.utils.toArray<HTMLElement>(".pf-stat-card");
      if (statCards.length > 0 && statsRef.current) {
        // 5a. Dramatic 3D Flip-In Entrance
        gsap.fromTo(
          statCards,
          {
            opacity: 0,
            y: 80,
            scale: 0.82,
            rotateX: 28,
            transformPerspective: 1000,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: "back.out(1.6)",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
              once: true,
              onEnter: () => setCountersVisible(true),
            },
          }
        );

        // 5b. REAL-TIME SCROLL SCRUB PARALLAX WAVE (Cards physically glide at different depths on scroll!)
        statCards.forEach((card, idx) => {
          const isEven = idx % 2 === 0;
          gsap.fromTo(
            card,
            { y: isEven ? 35 : -28 },
            {
              y: isEven ? -45 : 38,
              ease: "none",
              scrollTrigger: {
                trigger: statsRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            }
          );
        });

        // 5c. Icon Floating & Bounce Animation
        const statIcons = gsap.utils.toArray<HTMLElement>(".pf-stat-icon-wrap");
        if (statIcons.length > 0) {
          gsap.fromTo(
            statIcons,
            { scale: 0.35, rotate: -30 },
            {
              scale: 1,
              rotate: 0,
              duration: 0.7,
              stagger: 0.12,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: statsRef.current,
                start: "top 85%",
                once: true,
              },
            }
          );
        }
      }

      // 6. Tech Stack: Advanced 3D Wave Reveal + Real-Time Scroll Parallax Scrub
      const techSection = techRef.current;
      if (techSection) {
        // 6a. Section Header reveal
        const techHeaderEls = techSection.querySelectorAll(
          ".pf-section-badge, .pf-section-title, .pf-section-desc"
        );
        if (techHeaderEls.length > 0) {
          gsap.fromTo(
            techHeaderEls,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: techSection,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // 6b. Cards Stagger Entrance
        const techCards = techSection.querySelectorAll(".pf-tech-card");
        if (techCards.length > 0) {
          gsap.fromTo(
            techCards,
            {
              opacity: 0,
              y: 45,
              scale: 0.95,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              stagger: 0.08,
              ease: "power3.out",
              clearProps: "opacity,transform",
              scrollTrigger: {
                trigger: ".pf-tech-grid",
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // 6d. Ambient Background Radar & Decor Scrub Parallax
        const techBgMesh = techSection.querySelector(".pf-tech-bg-decor");
        if (techBgMesh) {
          gsap.fromTo(
            techBgMesh,
            { y: -45, rotate: -6 },
            {
              y: 45,
              rotate: 8,
              ease: "none",
              scrollTrigger: {
                trigger: techSection,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
              },
            }
          );
        }
      }

      // 7. Testimonials Entrance & Scroll Parallax
      const testiSection = testimonialsRef.current;
      if (testiSection) {
        // 7a. Header elements reveal (Badge, Title, Description)
        const testiHeaderEls = testiSection.querySelectorAll(
          ".pf-section-badge, .pf-section-title, .pf-section-desc"
        );
        if (testiHeaderEls.length > 0) {
          gsap.fromTo(
            testiHeaderEls,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              stagger: 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: testiSection,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // 7b. Trust summary bar entrance
        const trustBar = testiSection.querySelector(".pf-trust-summary-bar");
        if (trustBar) {
          gsap.fromTo(
            trustBar,
            { opacity: 0, y: 30, scale: 0.94 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: trustBar,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // 7c. Client tabs pills stagger entrance
        const tabBtns = testiSection.querySelectorAll(".pf-testi-tab-btn");
        if (tabBtns.length > 0) {
          gsap.fromTo(
            tabBtns,
            { opacity: 0, y: 25, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: "back.out(1.4)",
              scrollTrigger: {
                trigger: ".pf-testi-tabs-nav",
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // 7d. Spotlight Bento Card 3D Entrance (applied to wrapper to avoid collision with inner scrub)
        const spotlightWrapper = testiSection.querySelector(".pf-testi-spotlight-wrapper");
        if (spotlightWrapper) {
          gsap.fromTo(
            spotlightWrapper,
            { opacity: 0, y: 55, rotateX: 8, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              scale: 1,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: {
                trigger: spotlightWrapper,
                start: "top 84%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // 7e. Real-time Scroll Scrub Parallax (Card subtly floats as user scrolls past)
        const spotlightCard = testiSection.querySelector(".pf-testi-spotlight-card");
        if (spotlightCard) {
          gsap.fromTo(
            spotlightCard,
            { y: 25 },
            {
              y: -35,
              ease: "none",
              scrollTrigger: {
                trigger: testiSection,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            }
          );

          // 7f. Interactive 3D mouse parallax tilt on desktop
          if (window.innerWidth >= 768) {
            const cardEl = spotlightCard as HTMLElement;
            const onMouseMove = (e: MouseEvent) => {
              const rect = cardEl.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;
              const tiltX = (x - centerX) / centerX;
              const tiltY = (y - centerY) / centerY;

              gsap.to(cardEl, {
                rotateX: -tiltY * 5,
                rotateY: tiltX * 5,
                transformPerspective: 1200,
                duration: 0.35,
                ease: "power2.out",
              });
            };

            const onMouseLeave = () => {
              gsap.to(cardEl, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: "power2.out",
              });
            };

            cardEl.addEventListener("mousemove", onMouseMove);
            cardEl.addEventListener("mouseleave", onMouseLeave);
          }
        }

        // 7g. Quote watermark icon scroll parallax
        const quoteWatermark = testiSection.querySelector(".pf-spotlight-quote-watermark");
        if (quoteWatermark) {
          gsap.fromTo(
            quoteWatermark,
            { y: 20, rotate: -5 },
            {
              y: -45,
              rotate: 15,
              ease: "none",
              scrollTrigger: {
                trigger: testiSection,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.4,
              },
            }
          );
        }
      }

      // 8. Cyber HUD CTA Rotating Rings & Content Entrance
      gsap.to(".pf-cta-hud-rings", {
        rotation: 120,
        transformOrigin: "center center",
        ease: "none",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.from(".pf-cta-content > *", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 78%",
          once: true,
        },
      });

    }, portfolioRef);

    return () => ctx.revert();
  }, []);

  // Filter change with smooth animated transition
  const handleFilterClick = (val: string) => {
    setFilter(val);
    setTimeout(() => {
      ScrollTrigger.refresh();
      const cards = document.querySelectorAll(".shelf-card");
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 18, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.32,
            stagger: 0.04,
            ease: "power2.out",
            clearProps: "transform",
          }
        );
      }
    }, 40);
  };

  // 3D Card Tilt & Interactive Mouse Glow Physics (Smooth GSAP Interpolation)
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
      rotationY: xNorm * 7,
      rotationX: -yNorm * 7,
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

  // Interactive 3D tilt & dynamic spotlight reflection for Tech Stack cards
  const handleTechMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
      rotationY: xNorm * 10,
      rotationX: -yNorm * 10,
      y: -6,
      transformPerspective: 800,
      duration: 0.22,
      ease: "power1.out",
      overwrite: "auto",
    });
  };

  const handleTechMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
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

  // Interactive 3D tilt for Achievement Stat cards
  const handleStatMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xNorm = (x / rect.width - 0.5) * 2;
    const yNorm = (y / rect.height - 0.5) * 2;

    gsap.to(card, {
      rotationY: xNorm * 12,
      rotationX: -yNorm * 12,
      scale: 1.05,
      transformPerspective: 900,
      duration: 0.22,
      ease: "power1.out",
      overwrite: "auto",
    });
  };

  const handleStatMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;
    const card = e.currentTarget;
    gsap.to(card, {
      rotationY: 0,
      rotationX: 0,
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const filteredProjects =
    filter === "all"
      ? projectsList
      : projectsList.filter((p) => p.category === filter);

  return (
    <div ref={portfolioRef} className="portfolio-interactive-canvas">
      <section id="portofolio" className="portfolio-showcase-section">
        {/* 1. Latar Belakang Gelap Bersatu */}
        <div className="portfolio-unified-bg" aria-hidden="true">
          <svg
            viewBox="0 0 1440 800"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shelf-svg-shape"
          >
            <path
              d="M 0 590 L 0 290 Q 0 260 30 260 L 720 260 C 775 260 805 130 855 65 C 880 35 910 35 955 35 L 1440 35 L 1440 590 Q 1440 610 1410 610 L 30 610 Q 0 610 0 590 Z"
              fill="#060B18"
            />
          </svg>
          <div className="canopy-sparkle">✦</div>
          <div ref={ringRef} className="shelf-cyber-ring"></div>
          <div ref={triangleRef} className="shelf-cyber-triangle"></div>
          <img
            ref={avatarRef}
            src="/assets/profile.png"
            alt="Arjuna Web Developer"
            className="shelf-avatar-img"
          />
          <div className="shelf-avatar-fade" aria-hidden="true"></div>
        </div>

        {/* 2. Header */}
        <div className="portfolio-top-header">
          <div className="container pf-header-container text-left">
            <h1 className="portfolio-main-title">Portofolio Proyek</h1>
            <p className="portfolio-main-sub">
              Kumpulan hasil kerja pembuatan website dan aplikasi web profesional
            </p>
            <div className="portfolio-filter-row">
              {filterCategories.map((cat) => (
                <button
                  key={cat.value}
                  className={`pf-pill-btn ${filter === cat.value ? "active" : ""}`}
                  onClick={() => handleFilterClick(cat.value)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Card Grid */}
        <div className="shelf-content-layer">
          <div className="container pf-cards-container">
            <div className="shelf-cards-row" ref={cardsContainerRef}>
              {filteredProjects.map((p) => (
                <div
                  key={p.id}
                  className={`shelf-card ${p.theme}`}
                  data-category={p.category}
                  onClick={() => onOpenProject(p.id)}
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  role="button"
                  tabIndex={0}
                >
                  {p.hasTopRight && (
                    <button
                      className={`shelf-action-btn action-top-right ${p.topRightClass}`}
                      onClick={(e) => { e.stopPropagation(); onOpenProject(p.id); }}
                      aria-label={`Detail ${p.title}`}
                    >
                      <i className={`fa-solid ${p.topRightIcon}`}></i>
                    </button>
                  )}
                  <div className="shelf-card-screen">
                    {p.isLogo ? (
                      <div className="card-screen-logo-bg">
                        <span className="card-logo-label">Portfolio</span>
                        <img src={p.image} alt={p.title} className="card-screen-logo" />
                      </div>
                    ) : (
                      <img src={p.image} alt={p.title} />
                    )}
                  </div>
                  <div className="shelf-card-meta">
                    <span className="shelf-card-tag">{p.tag}</span>
                    <h3 className="shelf-card-title">{p.title}</h3>
                    <p className="shelf-card-desc-line">{p.descLines}</p>
                    {p.hasDots && (
                      <div className="shelf-card-dots">
                        <span></span><span></span><span></span><span></span>
                      </div>
                    )}
                    {p.hasBottomRight && (
                      <button
                        className={`shelf-action-btn action-bottom-right ${p.bottomRightClass}`}
                        onClick={(e) => { e.stopPropagation(); onOpenProject(p.id); }}
                        aria-label={`Detail ${p.title}`}
                      >
                        <i className={`fa-solid ${p.bottomRightIcon}`}></i>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Bar */}
            <div className="shelf-bottom-bar">
              <div className="shelf-bottom-quote">
                <i className="fa-solid fa-shield-halved quote-icon"></i>
                <span>Investasi digital terbaik untuk memperkuat kredibilitas dan penjualan bisnis Anda.</span>
              </div>
              <div className="shelf-bottom-cta">
                <Link href="/kontak" className="btn-blue-pill pf-btn-explore">
                  Konsultasikan Proyek Anda
                </Link>
              </div>
              <div className="shelf-bottom-spacer"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ SECTION: ACHIEVEMENT STATS ═══════ */}
      <section className="pf-stats-section" ref={statsRef}>
        <div className="container pf-stats-container">
          <div className="pf-stats-grid">
            {stats.map((s, i) => (
              <div
                key={i}
                className={`pf-stat-card ${countersVisible ? "visible" : ""}`}
                style={{ transitionDelay: `${i * 120}ms` }}
                onMouseMove={handleStatMouseMove}
                onMouseLeave={handleStatMouseLeave}
              >
                <div className="pf-stat-icon-wrap">
                  <i className={`fa-solid ${s.icon}`}></i>
                </div>
                <div className="pf-stat-value">
                  <AnimatedCounter target={s.value} active={countersVisible} />
                  <span className="pf-stat-suffix">{s.suffix}</span>
                </div>
                <p className="pf-stat-label">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ SECTION: TECH STACK ═══════ */}
      {/* ═══════ SECTION: TECH STACK (INTERACTIVE LIVING LABS) ═══════ */}
      <TechStackInteractive />

      {/* ═══════ SECTION: TESTIMONIALS ═══════ */}
      <section id="testimoni" className="pf-testimonials-section" ref={testimonialsRef}>
        {/* Ambient subtle light gradient decor */}
        <div className="pf-testimonials-decor-mesh" aria-hidden="true"></div>

        <div className="container relative-z">
          <div className="pf-section-header text-center">
            <span className="pf-section-badge">
              <i className="fa-solid fa-medal"></i> BUKTI KEPUASAN KLIEN
            </span>
            <h2 className="pf-section-title text-dark">
              Hasil Nyata, Bukan Sekadar Janji
            </h2>
            <p className="pf-section-desc">
              Pengalaman langsung para pemilik bisnis dan profesional yang mempercayakan rancang bangun kehadiran digital mereka kepada Arjuna Webdev.
            </p>

            {/* Micro Social-Proof / Trust Bar */}
            <div className="pf-trust-summary-bar">
              <div className="pf-trust-item">
                <div className="pf-trust-stars">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
                <span className="pf-trust-label"><strong>5.0 / 5.0</strong> Nilai Rata-rata</span>
              </div>
              <div className="pf-trust-divider"></div>
              <div className="pf-trust-item">
                <i className="fa-solid fa-bolt text-blue"></i>
                <span className="pf-trust-label"><strong>100%</strong> On-Time Delivery</span>
              </div>
              <div className="pf-trust-divider"></div>
              <div className="pf-trust-item">
                <i className="fa-solid fa-shield-halved text-cyan"></i>
                <span className="pf-trust-label"><strong>Garansi</strong> Perbaikan Bug</span>
              </div>
            </div>
          </div>

          {/* Executive Testimonial Spotlight Showcase (Wide Landscape Bento) */}
          <div className="pf-testi-spotlight-wrapper">
            {/* 1. Client Tabs Selector Row */}
            <div className="pf-testi-tabs-nav" role="tablist" aria-label="Pilih Testimoni Klien">
              {testimonials.map((t, idx) => {
                const isActive = activeTestiIndex === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveTestiIndex(idx)}
                    className={`pf-testi-tab-btn ${isActive ? "active" : ""}`}
                  >
                    <div className="pf-testi-tab-avatar-wrap">
                      <img src={t.image} alt={t.name} className="pf-testi-tab-avatar" />
                      <span className="pf-testi-tab-status-dot"></span>
                    </div>
                    <div className="pf-testi-tab-info">
                      <span className="pf-testi-tab-name">{t.name.split(",")[0]}</span>
                      <span className="pf-testi-tab-comp">{t.company}</span>
                    </div>
                    {isActive && <span className="pf-testi-tab-active-indicator"></span>}
                  </button>
                );
              })}
            </div>

            {/* 2. Wide Landscape Spotlight Card */}
            <div className="pf-testi-spotlight-card">
              {/* Subtle Ambient Glow */}
              <div
                className="pf-spotlight-card-glow"
                style={{ background: currentTesti.avatarColor }}
                aria-hidden="true"
              ></div>

              {/* Watermark Quote Icon */}
              <div className="pf-spotlight-quote-watermark" aria-hidden="true">
                <i className="fa-solid fa-quote-right"></i>
              </div>

              <div className="pf-spotlight-inner-grid">
                {/* ── LEFT PANEL: Client Profile & Credibility ── */}
                <div className="pf-spotlight-profile-col">
                  <div className="pf-spotlight-photo-frame" style={{ background: currentTesti.avatarColor }}>
                    <img
                      src={currentTesti.image}
                      alt={currentTesti.name}
                      className="pf-spotlight-photo"
                    />
                    <span className="pf-spotlight-photo-badge" title="Profil Terverifikasi">
                      <i className="fa-solid fa-check"></i>
                    </span>
                  </div>

                  <div className="pf-spotlight-identity">
                    <div className="pf-spotlight-name-row">
                      <h4 className="pf-spotlight-name">{currentTesti.name}</h4>
                      <i className="fa-solid fa-certificate pf-verified-icon" title="Klien Terverifikasi"></i>
                    </div>
                    <p className="pf-spotlight-role">{currentTesti.role}</p>
                    <p className="pf-spotlight-company">{currentTesti.company}</p>
                    <span className="pf-spotlight-location">
                      <i className="fa-solid fa-location-dot"></i> {currentTesti.location}
                    </span>
                  </div>

                  {/* Rating Stars */}
                  <div className="pf-spotlight-rating-bar">
                    <div className="pf-spotlight-stars">
                      {Array.from({ length: currentTesti.rating }).map((_, j) => (
                        <i key={j} className="fa-solid fa-star"></i>
                      ))}
                    </div>
                    <span className="pf-spotlight-rating-score">5.0 / 5.0</span>
                  </div>
                </div>

                {/* ── RIGHT PANEL: Testimonial Narrative & Controls ── */}
                <div className="pf-spotlight-content-col">
                  {/* Category Pill + Prev/Next Controls */}
                  <div className="pf-spotlight-top-bar">
                    <span className="pf-spotlight-category-pill">
                      <i className="fa-solid fa-layer-group"></i> {currentTesti.projectType}
                    </span>

                    {/* Navigation Controls */}
                    <div className="pf-spotlight-nav-controls">
                      <button
                        type="button"
                        onClick={prevTesti}
                        className="pf-spotlight-arrow-btn"
                        aria-label="Testimoni Sebelumnya"
                      >
                        <i className="fa-solid fa-chevron-left"></i>
                      </button>
                      <span className="pf-spotlight-counter">
                        <strong>{String(activeTestiIndex + 1).padStart(2, "0")}</strong> / {String(testimonials.length).padStart(2, "0")}
                      </span>
                      <button
                        type="button"
                        onClick={nextTesti}
                        className="pf-spotlight-arrow-btn"
                        aria-label="Testimoni Selanjutnya"
                      >
                        <i className="fa-solid fa-chevron-right"></i>
                      </button>
                    </div>
                  </div>

                  {/* Highlight Headline */}
                  <h3 className="pf-spotlight-headline">
                    &ldquo;{currentTesti.highlightPhrase}&rdquo;
                  </h3>

                  {/* Testimonial Quote Narrative */}
                  <p className="pf-spotlight-narrative">
                    {currentTesti.text}
                  </p>

                  {/* Bottom Footer: Tech Tags + Dot Indicators */}
                  <div className="pf-spotlight-bottom-bar">
                    <div className="pf-spotlight-tags">
                      {currentTesti.tags.map((tag, tagIdx) => (
                        <span key={tagIdx} className="pf-spotlight-tag-item">
                          <i className="fa-solid fa-check"></i> {tag}
                        </span>
                      ))}
                    </div>

                    <div className="pf-spotlight-pagination-dots" role="tablist" aria-label="Navigasi dot testimoni">
                      {testimonials.map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          type="button"
                          onClick={() => setActiveTestiIndex(dotIdx)}
                          className={`pf-spotlight-dot ${activeTestiIndex === dotIdx ? "active" : ""}`}
                          aria-label={`Lihat testimoni ${dotIdx + 1}`}
                        ></button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ SECTION: BIG CTA BANNER — CYBER HUD STYLE ═══════ */}
      <section className="pf-cta-section" ref={ctaRef}>
        {/* Background decorations matching hero */}
        <div className="pf-cta-glow" aria-hidden="true"></div>
        <div className="pf-cta-glow-secondary" aria-hidden="true"></div>

        {/* HUD Circuit Ring SVG — mirrors the hero's rotating rings */}
        <svg className="pf-cta-hud-rings" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="300" cy="300" r="260" stroke="rgba(0,210,255,0.08)" strokeWidth="1" className="pf-hud-ring-outer" />
          <circle cx="300" cy="300" r="200" stroke="rgba(18,86,232,0.12)" strokeWidth="1" strokeDasharray="8 16" className="pf-hud-ring-mid" />
          <circle cx="300" cy="300" r="140" stroke="rgba(0,240,255,0.06)" strokeWidth="1" className="pf-hud-ring-inner" />
          {/* Laser beam orbits */}
          <circle cx="300" cy="300" r="260" stroke="url(#ctaBeamGrad)" strokeWidth="2" strokeDasharray="40 1594" strokeLinecap="round" className="pf-cta-beam-orbit-1" />
          <circle cx="300" cy="300" r="200" stroke="url(#ctaBeamGrad2)" strokeWidth="2" strokeDasharray="30 1227" strokeLinecap="round" className="pf-cta-beam-orbit-2" />
          {/* Glowing nodes */}
          <circle cx="560" cy="300" r="3" fill="#00F0FF" className="pf-cta-glow-node">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="300" cy="40" r="3" fill="#1256E8" className="pf-cta-glow-node">
            <animate attributeName="opacity" values="1;0.3;1" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="100" cy="400" r="2.5" fill="#00D2FF" className="pf-cta-glow-node">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
          </circle>
          <defs>
            <linearGradient id="ctaBeamGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#00F0FF" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="ctaBeamGrad2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1256E8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#1256E8" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>

        {/* Corner polygon accents — mirrors hero corner polygons */}
        <div className="pf-cta-corner-bl" aria-hidden="true">
          <div className="pf-cta-polygon-1"></div>
          <div className="pf-cta-polygon-2"></div>
          <div className="pf-cta-circuit-trace"></div>
        </div>
        <div className="pf-cta-corner-tr" aria-hidden="true">
          <div className="pf-cta-polygon-1"></div>
          <div className="pf-cta-polygon-2"></div>
        </div>

        {/* Sparkle stars */}
        <span className="pf-cta-sparkle pf-cta-sparkle-1" aria-hidden="true">✦</span>
        <span className="pf-cta-sparkle pf-cta-sparkle-2" aria-hidden="true">✦</span>

        {/* Main content */}
        <div className="container pf-cta-container">
          <div className="pf-cta-content">
            <span className="pf-cta-badge">
              <i className="fa-solid fa-comments"></i> Konsultasi Gratis
            </span>
            <h2 className="pf-cta-title">
              Siap Meningkatkan Kredibilitas <span className="pf-cta-highlight">Bisnis Anda?</span>
            </h2>
            <p className="pf-cta-desc">
              Diskusikan rancangan website yang tepat untuk usaha Anda tanpa biaya konsultasi. Dapatkan estimasi pengerjaan dan rekomendasi struktur terbaik.
            </p>
            <div className="pf-cta-buttons">
              <Link href="/kontak" className="pf-cta-btn-primary">
                <i className="fa-brands fa-whatsapp"></i>
                Konsultasi Sekarang
              </Link>
              <Link href="/layanan" className="pf-cta-btn-secondary">
                Lihat Paket Harga
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* Counter component with scroll-triggered animation */
function AnimatedCounter({ target, active }: { target: number; active: boolean }) {
  const [count, setCount] = useState(target);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!active || hasAnimated.current) return;
    hasAnimated.current = true;

    let isMounted = true;
    let startTime: number | null = null;
    const duration = 1600;

    setCount(0);

    const step = (timestamp: number) => {
      if (!isMounted) return;
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(step);

    return () => {
      isMounted = false;
    };
  }, [active, target]);

  return <span>{count}</span>;
}
