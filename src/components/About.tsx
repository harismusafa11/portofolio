"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface AboutProps {
  isHero?: boolean;
}

export default function About({ isHero = false }: AboutProps) {
  const [isHeroMode, setIsHeroMode] = useState(isHero);

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const emblemRef = useRef<SVGSVGElement>(null);
  const hudRingsOuterRef = useRef<SVGGElement>(null);
  const hudRingsInnerRef = useRef<SVGGElement>(null);
  const hudTag1Ref = useRef<HTMLDivElement>(null);
  const hudTag2Ref = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleWord1Ref = useRef<HTMLSpanElement>(null);
  const titleWord2Ref = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const skillsCardRef = useRef<HTMLDivElement>(null);
  const cardSheenRef = useRef<HTMLDivElement>(null);
  const barBlueRef = useRef<HTMLDivElement>(null);
  const barWhiteRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (isHero || window.location.pathname.includes("/tentang")) {
        setIsHeroMode(true);
      }
    }
  }, [isHero]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const isHeroSection = isHero || (typeof window !== "undefined" && window.location.pathname.includes("/tentang"));

    const ctx = gsap.context(() => {
      const isDesktop = window.innerWidth >= 768;

      // =========================================================================
      // 1. INITIAL ENTRANCE ANIMATION (Crisp & immediate in hero mode)
      // =========================================================================
      const entranceTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: isHeroSection
          ? undefined
          : (sectionRef.current
            ? {
                trigger: sectionRef.current,
                start: "top 78%",
                once: true,
              }
            : undefined),
      });

      // Avatar 3D Rise and Reveal
      if (avatarRef.current) {
        entranceTl.fromTo(
          avatarRef.current,
          { y: 80, opacity: 0, scale: 0.94, rotateX: 10 },
          { y: 0, opacity: 1, scale: 1, rotateX: 0, duration: 1.2, ease: "power4.out" },
          0.05
        );
      }

      // Emblem 3D Scale and Glow Fade In
      if (emblemRef.current) {
        entranceTl.fromTo(
          emblemRef.current,
          { opacity: 0, scale: 0.78, rotation: -10 },
          { opacity: 1, scale: 1, rotation: 0, duration: 1.35, ease: "power3.out" },
          0.12
        );
      }

      // Floating Cyber Telemetry Tags Fade In
      const hudTags = [hudTag1Ref.current, hudTag2Ref.current].filter(Boolean);
      if (hudTags.length > 0) {
        entranceTl.fromTo(
          hudTags,
          { opacity: 0, scale: 0.8, y: 18 },
          { opacity: 1, scale: 1, y: 0, duration: 0.75, stagger: 0.12, ease: "back.out(1.5)" },
          0.45
        );
      }

      // Text elements stagger entrance
      const textElements = [
        kickerRef.current,
        titleRef.current,
        headlineRef.current,
        descRef.current,
      ].filter(Boolean);

      if (textElements.length > 0) {
        entranceTl.fromTo(
          textElements,
          { opacity: 0, x: 40, rotateY: -5 },
          { opacity: 1, x: 0, rotateY: 0, duration: 0.85, stagger: 0.1, ease: "power3.out" },
          0.2
        );
      }

      // Skills Card entrance
      if (skillsCardRef.current) {
        entranceTl.fromTo(
          skillsCardRef.current,
          { opacity: 0, y: 40, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" },
          0.4
        );
      }

      // Badges Stagger entrance
      if (badgesRef.current) {
        const badges = badgesRef.current.querySelectorAll(".skill-badge-card");
        entranceTl.fromTo(
          badges,
          { opacity: 0, y: 25, scale: 0.85 },
          { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.07, ease: "back.out(1.4)" },
          0.55
        );
      }

      // Scroll Indicator Entrance
      if (scrollIndicatorRef.current) {
        entranceTl.fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: -15 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          0.85
        );
      }

      // Continuous subtle ambient rotation for HUD radar rings
      if (hudRingsOuterRef.current) {
        gsap.to(hudRingsOuterRef.current, {
          rotation: 360,
          transformOrigin: "332px 300px",
          duration: 90,
          repeat: -1,
          ease: "none",
        });
      }
      if (hudRingsInnerRef.current) {
        gsap.to(hudRingsInnerRef.current, {
          rotation: -360,
          transformOrigin: "332px 300px",
          duration: 75,
          repeat: -1,
          ease: "none",
        });
      }

      // Floating Orbs Idle Motion
      const orbs = [orb1Ref.current, orb2Ref.current, orb3Ref.current].filter(Boolean);
      orbs.forEach((orb, i) => {
        if (!orb) return;
        gsap.to(orb, {
          y: `+=${16 + i * 8}`,
          x: `+=${10 + i * 6}`,
          duration: 3.5 + i * 0.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2,
        });
      });

      // =========================================================================
      // 2. THE MASTER SCROLL MOTION & CINEMATIC EXIT ENGINE
      // =========================================================================
      if (sectionRef.current) {
        const sectionEl = sectionRef.current;

        // -----------------------------------------------------------------------
        // A. TEXT SCROLL EXIT TIMELINE (0px to 480px scroll)
        // Terpicu tepat saat pengguna menggulir dan teks di hero mulai mau hilang!
        // -----------------------------------------------------------------------
        const textExitTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionEl,
            start: isHeroSection ? "top top" : "top 70%",
            end: isHeroSection ? "+=480" : "+=520",
            scrub: 0.8,
          },
        });

        // Kicker shoots up, blurs, and fades
        if (kickerRef.current) {
          textExitTl.to(
            kickerRef.current,
            {
              y: isDesktop ? -120 : -60,
              opacity: 0,
              filter: isDesktop ? "blur(10px)" : "blur(4px)",
              ease: "power2.in",
            },
            0.05
          );
        }

        // Title 3D Split, Lift, Specular Glow & Dissolve (SANGAT MENCOLOK)
        if (titleWord1Ref.current && titleWord2Ref.current) {
          // Pre-exit pulse as user begins scrolling
          textExitTl.to(
            [titleWord1Ref.current, titleWord2Ref.current],
            {
              scale: 1.05,
              duration: 0.1,
              ease: "power1.out",
            },
            0
          );

          // Word 1: ARJUNA flies up-left with 3D angle and intense glowing blur
          textExitTl.to(
            titleWord1Ref.current,
            {
              y: isDesktop ? -200 : -95,
              x: isDesktop ? -75 : -30,
              rotateZ: isDesktop ? -8 : -3,
              scale: 0.82,
              opacity: 0,
              filter: isDesktop ? "blur(18px) drop-shadow(0 0 35px rgba(0, 210, 255, 0.9))" : "blur(8px)",
              ease: "power2.in",
            },
            0.1
          );

          // Word 2: WEBDEV flies up-right with 3D angle and intense glowing blur
          textExitTl.to(
            titleWord2Ref.current,
            {
              y: isDesktop ? -230 : -110,
              x: isDesktop ? 75 : 30,
              rotateZ: isDesktop ? 8 : 3,
              scale: 0.82,
              opacity: 0,
              filter: isDesktop ? "blur(20px) drop-shadow(0 0 40px rgba(0, 132, 255, 0.9))" : "blur(8px)",
              ease: "power2.in",
            },
            0.12
          );
        } else if (titleRef.current) {
          textExitTl.to(
            titleRef.current,
            {
              y: isDesktop ? -200 : -100,
              scale: 0.84,
              opacity: 0,
              filter: isDesktop ? "blur(18px)" : "blur(8px)",
              ease: "power2.in",
            },
            0.1
          );
        }

        // Subtitle headline glides up, blurs & dissolves
        if (headlineRef.current) {
          textExitTl.to(
            headlineRef.current,
            {
              y: isDesktop ? -220 : -100,
              scale: 0.9,
              opacity: 0,
              filter: isDesktop ? "blur(14px)" : "blur(6px)",
              ease: "power2.in",
            },
            0.18
          );
        }

        // Narrative story text lifts, blurs & dissolves
        if (descRef.current) {
          textExitTl.to(
            descRef.current,
            {
              y: isDesktop ? -240 : -110,
              opacity: 0,
              filter: isDesktop ? "blur(12px)" : "blur(5px)",
              ease: "power2.in",
            },
            0.24
          );
        }

        // -----------------------------------------------------------------------
        // B. LOWER SECTION: SKILLS CARD & BADGES EXIT TIMELINE (100px to 680px scroll)
        // -----------------------------------------------------------------------
        const cardExitTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionEl,
            start: isHeroSection ? "top -100px" : "top 35%",
            end: isHeroSection ? "+=580" : "+=620",
            scrub: 0.8,
          },
        });

        if (skillsCardRef.current) {
          cardExitTl.to(
            skillsCardRef.current,
            {
              y: isDesktop ? -180 : -75,
              rotateX: isDesktop ? -10 : 0,
              scale: 0.88,
              opacity: 0,
              filter: isDesktop ? "blur(14px)" : "blur(5px)",
              ease: "power2.in",
            },
            0.1
          );
        }

        if (badgesRef.current) {
          const badgeCards = badgesRef.current.querySelectorAll<HTMLElement>(".skill-badge-card");
          badgeCards.forEach((badge, idx) => {
            cardExitTl.to(
              badge,
              {
                y: isDesktop ? -210 - idx * 16 : -90,
                rotateZ: isDesktop ? (idx % 2 === 0 ? -4 : 4) : 0,
                opacity: 0,
                filter: isDesktop ? "blur(10px)" : "blur(4px)",
                ease: "power2.in",
              },
              0.16 + idx * 0.05
            );
          });
        }

        // -----------------------------------------------------------------------
        // C. SPECULAR SHEEN & SEGMENTED PROGRESS BAR SCRUB (0px to 320px scroll)
        // Bar terisi penuh dan kilatan cahaya bergerak saat pengguna mulai scroll
        // -----------------------------------------------------------------------
        if (barBlueRef.current) {
          gsap.fromTo(
            barBlueRef.current,
            { width: "0%" },
            {
              width: "68%",
              ease: "none",
              scrollTrigger: {
                trigger: sectionEl,
                start: isHeroSection ? "top top" : "top 80%",
                end: isHeroSection ? "+=300" : "+=350",
                scrub: 0.6,
              },
            }
          );
        }

        if (barWhiteRef.current) {
          gsap.fromTo(
            barWhiteRef.current,
            { width: "0%" },
            {
              width: "16%",
              ease: "none",
              scrollTrigger: {
                trigger: sectionEl,
                start: isHeroSection ? "top -80px" : "top 70%",
                end: isHeroSection ? "+=260" : "+=300",
                scrub: 0.6,
              },
            }
          );
        }

        if (cardSheenRef.current) {
          gsap.fromTo(
            cardSheenRef.current,
            { x: "-120%" },
            {
              x: "240%",
              ease: "none",
              scrollTrigger: {
                trigger: sectionEl,
                start: isHeroSection ? "top top" : "top 80%",
                end: isHeroSection ? "+=350" : "+=400",
                scrub: 0.8,
              },
            }
          );
        }

        // -----------------------------------------------------------------------
        // D. VISUAL STAGE EXIT TIMELINE (Avatar, Emblem, HUD rings, Telemetry Tags)
        // -----------------------------------------------------------------------
        const visualStageTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionEl,
            start: isHeroSection ? "top top" : "top 60%",
            end: isHeroSection ? "+=780" : "+=820",
            scrub: 1,
          },
        });

        if (avatarRef.current) {
          visualStageTl.to(
            avatarRef.current,
            {
              y: isDesktop ? -200 : -70,
              scale: isDesktop ? 1.12 : 1.04,
              rotateX: isDesktop ? -5 : 0,
              filter: isDesktop
                ? "drop-shadow(0 45px 80px rgba(0, 210, 255, 0.4))"
                : "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.9))",
              ease: "none",
            },
            0
          );
          visualStageTl.to(
            avatarRef.current,
            {
              opacity: 0,
              filter: isDesktop ? "blur(20px)" : "blur(8px)",
              ease: "power2.in",
            },
            0.45
          );
        }

        if (emblemRef.current) {
          visualStageTl.to(
            emblemRef.current,
            {
              y: isDesktop ? 95 : 35,
              scale: isDesktop ? 1.38 : 1.15,
              rotation: isDesktop ? 35 : 12,
              ease: "none",
            },
            0
          );
          visualStageTl.to(
            emblemRef.current,
            {
              opacity: 0,
              ease: "power2.in",
            },
            0.5
          );
        }

        // HUD Rings rotation with scroll
        if (hudRingsOuterRef.current) {
          visualStageTl.to(
            hudRingsOuterRef.current,
            {
              rotation: "+=75",
              transformOrigin: "332px 300px",
              ease: "none",
            },
            0
          );
        }
        if (hudRingsInnerRef.current) {
          visualStageTl.to(
            hudRingsInnerRef.current,
            {
              rotation: "-=90",
              transformOrigin: "332px 300px",
              ease: "none",
            },
            0
          );
        }

        // Telemetry Tags
        if (hudTag1Ref.current && isDesktop) {
          visualStageTl.to(
            hudTag1Ref.current,
            {
              y: -120,
              x: -24,
              opacity: 0,
              filter: "blur(8px)",
              ease: "power2.in",
            },
            0.25
          );
        }
        if (hudTag2Ref.current && isDesktop) {
          visualStageTl.to(
            hudTag2Ref.current,
            {
              y: -170,
              x: 20,
              opacity: 0,
              filter: "blur(8px)",
              ease: "power2.in",
            },
            0.35
          );
        }

        // -----------------------------------------------------------------------
        // E. SCROLL INDICATOR FADE-OUT (Langsung saat awal scroll)
        // -----------------------------------------------------------------------
        if (scrollIndicatorRef.current && isHeroSection) {
          gsap.to(scrollIndicatorRef.current, {
            opacity: 0,
            y: 25,
            scale: 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionEl,
              start: "top top",
              end: "+=120",
              scrub: true,
            },
          });
        }

        // -----------------------------------------------------------------------
        // F. REAL-TIME HERO PROGRESS LINE
        // -----------------------------------------------------------------------
        if (scrollProgressRef.current && isHeroSection) {
          gsap.fromTo(
            scrollProgressRef.current,
            { width: "0%" },
            {
              width: "100%",
              ease: "none",
              scrollTrigger: {
                trigger: sectionEl,
                start: "top top",
                end: "+=750",
                scrub: 0.4,
              },
            }
          );
        }

        // -----------------------------------------------------------------------
        // G. AMBIENT GLOWS & ORBS PARALLAX
        // -----------------------------------------------------------------------
        gsap.utils.toArray<HTMLElement>(".about-ambient-glow-left, .about-ambient-glow-right").forEach((glow, i) => {
          gsap.to(glow, {
            y: i === 0 ? 120 : -100,
            x: i === 0 ? -40 : 50,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: sectionEl,
              start: isHeroSection ? "top top" : "top 70%",
              end: isHeroSection ? "+=750" : "+=800",
              scrub: 1.5,
            },
          });
        });

        const orbOffsets = [-150, -90, -180];
        orbs.forEach((orb, i) => {
          if (!orb) return;
          gsap.to(orb, {
            y: orbOffsets[i % orbOffsets.length],
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: sectionEl,
              start: isHeroSection ? "top top" : "top 70%",
              end: isHeroSection ? "+=750" : "+=800",
              scrub: 1.2,
            },
          });
        });
      }

      // =========================================================================
      // 3. DESKTOP INTERACTIVE 3D HOLOGRAM MOUSE PARALLAX
      // =========================================================================
      const sectionEl = sectionRef.current;
      const stageEl = stageRef.current;
      const avatarEl = avatarRef.current;
      const emblemEl = emblemRef.current;

      if (sectionEl && stageEl && window.innerWidth >= 768) {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = sectionEl.getBoundingClientRect();
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
              x: normX * 16,
              duration: 0.6,
              ease: "power2.out",
            });
          }

          if (emblemEl) {
            gsap.to(emblemEl, {
              x: -normX * 10,
              duration: 0.8,
              ease: "power2.out",
            });
          }
        };

        const handleMouseLeave = () => {
          gsap.to(stageEl, {
            rotateY: 0,
            rotateX: 0,
            duration: 1,
            ease: "power3.out",
          });
          if (avatarEl) {
            gsap.to(avatarEl, {
              x: 0,
              duration: 1,
              ease: "power3.out",
            });
          }
          if (emblemEl) {
            gsap.to(emblemEl, {
              x: 0,
              duration: 1,
              ease: "power3.out",
            });
          }
        };

        sectionEl.addEventListener("mousemove", handleMouseMove);
        sectionEl.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          sectionEl.removeEventListener("mousemove", handleMouseMove);
          sectionEl.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isHero]);

  return (
    <section id="tentang" className="about-showcase-section about-3d-perspective" ref={sectionRef}>
      {/* Background ambient lighting and subtle cyber particles */}
      <div className="about-ambient-glow-left" aria-hidden="true"></div>
      <div className="about-ambient-glow-right" aria-hidden="true"></div>
      <div className="about-particle-orb orb-1" ref={orb1Ref} aria-hidden="true"></div>
      <div className="about-particle-orb orb-2" ref={orb2Ref} aria-hidden="true"></div>
      <div className="about-particle-orb orb-3" ref={orb3Ref} aria-hidden="true"></div>

      {/* Real-time Hero scroll progress line at bottom border */}
      {isHeroMode && <div className="about-scroll-line-progress" ref={scrollProgressRef} aria-hidden="true"></div>}

      <div className="container">
        <div className="about-showcase-grid">
          {/* ================= SISI KIRI: AVATAR ARJUNA + CYBER HUD + CHEVRON 'A' EMBLEM ================= */}
          <div className="about-showcase-visual">
            <div className="about-visual-stage" ref={stageRef}>
              {/* Floating Cyber Telemetry Tags */}
              <div className="about-hud-tag tag-top-left" ref={hudTag1Ref}>
                <div className="hud-tag-header">
                  <span className="hud-tag-node"></span>
                  <span className="hud-tag-label">SYSTEM // ACTIVE</span>
                </div>
                <span className="hud-tag-val">WEB ARCHITECT</span>
              </div>

              <div className="about-hud-tag tag-bottom-right" ref={hudTag2Ref}>
                <div className="hud-tag-header">
                  <span className="hud-tag-node node-pulse"></span>
                  <span className="hud-tag-label">STACK // VERIFIED</span>
                </div>
                <span className="hud-tag-val">NEXT.JS &bull; REACT</span>
              </div>

              {/* SVG Sirkuit Radar HUD & Stylized Chevron 'A' Wings */}
              <svg
                ref={emblemRef}
                className="about-emblem-svg"
                viewBox="0 0 665 646"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <defs>
                  {/* Linear Gradient Sayap Kiri Terang */}
                  <linearGradient id="aboutWingLeft" x1="15%" y1="0%" x2="85%" y2="100%">
                    <stop offset="0%" stopColor="#38BDF8" />
                    <stop offset="40%" stopColor="#00A3FF" />
                    <stop offset="100%" stopColor="#0055D4" />
                  </linearGradient>

                  {/* Linear Gradient Sayap Kanan Shading Gelap */}
                  <linearGradient id="aboutWingRight" x1="15%" y1="0%" x2="85%" y2="100%">
                    <stop offset="0%" stopColor="#0066FF" />
                    <stop offset="45%" stopColor="#0B3EAA" />
                    <stop offset="100%" stopColor="#051B4D" />
                  </linearGradient>

                  {/* Glow Filter */}
                  <filter id="aboutEmblemGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="16" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  {/* Glow Filter Node & Bintang */}
                  <filter id="aboutNodeGlow" x="-60%" y="-60%" width="220%" height="220%">
                    <feGaussianBlur stdDeviation="4.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Outer HUD Rings (Rotates clockwise on scroll) */}
                <g ref={hudRingsOuterRef}>
                  <circle
                    cx="332"
                    cy="300"
                    r="245"
                    stroke="#00D2FF"
                    strokeWidth="1.2"
                    opacity="0.25"
                  />
                  {/* Busur Cahaya Atas Kanan Emas & Cyan (Jam 11 - Jam 1) */}
                  <path
                    d="M 395 105 A 255 255 0 0 1 520 175"
                    stroke="#FBBF24"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.85"
                  />
                  <path
                    d="M 410 98 A 268 268 0 0 1 535 175"
                    stroke="#38BDF8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.7"
                  />
                  {/* Titik Cahaya Emas di Kiri Atas (Jam 10:30) */}
                  <circle
                    cx="145"
                    cy="105"
                    r="4.5"
                    fill="#FBBF24"
                    filter="url(#aboutNodeGlow)"
                  />
                  {/* Node Titik Cahaya Putih di Jam 3 pada Cincin Luar */}
                  <circle
                    cx="577"
                    cy="300"
                    r="5.5"
                    fill="#FFFFFF"
                    filter="url(#aboutNodeGlow)"
                  />
                  <line
                    x1="577"
                    y1="300"
                    x2="665"
                    y2="300"
                    stroke="#00D2FF"
                    strokeWidth="1.5"
                    opacity="0.8"
                  />
                </g>

                {/* Inner HUD Rings (Rotates counter-clockwise on scroll) */}
                <g ref={hudRingsInnerRef}>
                  <circle
                    cx="332"
                    cy="300"
                    r="205"
                    stroke="#FFFFFF"
                    strokeWidth="1.2"
                    strokeDasharray="6 8"
                    opacity="0.3"
                  />
                  <circle
                    cx="332"
                    cy="300"
                    r="165"
                    stroke="#00D2FF"
                    strokeWidth="1"
                    opacity="0.32"
                  />
                  {/* Bintang Sparkle 4 Titik (✦) di Kiri Atas Jam 10 */}
                  <line
                    x1="65"
                    y1="155"
                    x2="165"
                    y2="155"
                    stroke="rgba(0, 210, 255, 0.45)"
                    strokeWidth="1"
                  />
                  <line
                    x1="115"
                    y1="105"
                    x2="115"
                    y2="205"
                    stroke="rgba(0, 210, 255, 0.45)"
                    strokeWidth="1"
                  />
                  <g transform="translate(115, 155)">
                    <path
                      d="M 0 -15 Q 0 0 15 0 Q 0 0 0 15 Q 0 0 -15 0 Q 0 0 0 -15 Z"
                      fill="#38BDF8"
                      filter="url(#aboutNodeGlow)"
                    />
                  </g>
                </g>

                {/* Lambang Chevron 'A' Dua Sayap (Persis Gambar Referensi User) */}
                {/* Sayap Kanan (Nuansa Biru Gelap) */}
                <path
                  d="M 332 140 C 389 160, 469 205, 519 280 C 569 355, 584 435, 549 500 C 529 525, 489 520, 459 485 C 429 450, 414 410, 399 350 C 385 295, 365 245, 332 205 Z"
                  fill="url(#aboutWingRight)"
                  filter="url(#aboutEmblemGlow)"
                />

                {/* Sayap Kiri (Nuansa Cyan-Biru Terang 3D Facet) */}
                <path
                  d="M 332 140 C 275 160, 195 205, 145 280 C 95 355, 80 435, 115 500 C 135 525, 175 520, 205 485 C 235 450, 250 410, 265 350 C 279 295, 299 245, 332 205 Z"
                  fill="url(#aboutWingLeft)"
                  filter="url(#aboutEmblemGlow)"
                />
              </svg>

              {/* Foto Cutout Arjuna (Bust Besar, Berdiri Tegak, Faded Seamlessly di Bawah) */}
              <img
                ref={avatarRef}
                src="/assets/profile_about.png"
                alt="Arjuna - Web Developer Profesional"
                className="about-avatar-cutout"
              />
            </div>
          </div>

          {/* ================= SISI KANAN: KONTEN TEKS & KARTU SKILL ================= */}
          <div className="about-showcase-content" ref={contentRef}>
            {/* Kategori Kicker Biru Muda */}
            <div className="about-cyan-kicker" ref={kickerRef}>Tentang</div>

            {/* Judul Utama ARJUNA WEBDEV dengan 3D Word Splitting */}
            <h1 className="about-main-title" ref={titleRef}>
              <span className="title-word title-word-1" ref={titleWord1Ref}>ARJUNA</span>
              <span className="title-word title-word-2" ref={titleWord2Ref}>WEBDEV</span>
            </h1>

            {/* Sub-headline Deskriptif Profesional */}
            <h2 className="about-subtitle-headline" ref={headlineRef}>
              Jasa Pembuatan Website Profesional<br />
              untuk Bisnis, UMKM, dan Personal Brand
            </h2>

            {/* Narasi Cerita Singkat Berorientasi Solusi Bisnis & Teknologi */}
            <p className="about-narrative-desc" ref={descRef}>
              Membantu pemilik bisnis menghadirkan website yang tidak hanya elegan secara visual, tetapi juga cepat diakses, terstruktur rapi, dan berdaya konversi tinggi. Setiap proyek dirancang dengan standar arsitektur web modern menggunakan React dan Next.js agar bisnis Anda tampil lebih kredibel, dipercaya calon klien, dan mudah ditemukan di Google.
            </p>

            {/* Kartu Skill Utama 1: Fokus Kinerja & Arsitektur */}
            <div className="skills-main-card" ref={skillsCardRef}>
              {/* Dynamic Specular Sheen during Scroll */}
              <div className="skills-card-sheen" ref={cardSheenRef} aria-hidden="true"></div>

              <div className="skills-metrics-row">
                <div className="skill-metric-item">
                  <div className="metric-top">
                    <span className="metric-title">Next.js &amp; React</span>
                    <span className="metric-percentage">SSR &amp; App Router</span>
                  </div>
                  <span className="metric-subtitle">PERFORMA TINGGI</span>
                </div>

                <div className="skill-metric-item">
                  <div className="metric-top">
                    <span className="metric-title">JavaScript &amp; TS</span>
                    <span className="metric-percentage">Clean Logic</span>
                  </div>
                  <span className="metric-subtitle">INTERAKTIF &amp; STABIL</span>
                </div>

                <div className="skill-metric-item">
                  <div className="metric-top">
                    <span className="metric-title">HTML5 &amp; CSS3</span>
                    <span className="metric-percentage">Responsive UI</span>
                  </div>
                  <span className="metric-subtitle">RAMAH SEO &amp; MOBILE</span>
                </div>
              </div>

              {/* Bilah Progress Segmented: Cyan/Blue (68%) + White Segment (16%) + Dark Track (16%) */}
              <div className="skill-bar-segmented-track">
                <div className="skill-bar-seg-blue" ref={barBlueRef}></div>
                <div className="skill-bar-seg-white" ref={barWhiteRef}></div>
                <div className="skill-bar-seg-empty"></div>
              </div>
            </div>

            {/* Baris Kartu Skill 2: 5 Kartu Badge Kemampuan Nyata */}
            <div className="skills-badges-grid" ref={badgesRef}>
              {/* Badge 1: HTML5 */}
              <div className="skill-badge-card">
                <span className="badge-primary-text">HTML5</span>
                <span className="badge-secondary-text">Semantik &amp; SEO</span>
              </div>

              {/* Badge 2: CSS3 */}
              <div className="skill-badge-card">
                <span className="badge-primary-text">CSS3</span>
                <span className="badge-secondary-text">Layout Responsif</span>
              </div>

              {/* Badge 3: JavaScript */}
              <div className="skill-badge-card">
                <span className="badge-primary-text">JS</span>
                <span className="badge-secondary-text">Logika Interaktif</span>
              </div>

              {/* Badge 4: React */}
              <div className="skill-badge-card">
                <span className="badge-primary-text">React</span>
                <span className="badge-secondary-text">Komponen Modular</span>
              </div>

              {/* Badge 5: Next.js */}
              <div className="skill-badge-card">
                <span className="badge-primary-text">Next.js</span>
                <span className="badge-secondary-text">App Router &amp; SSR</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Scroll Indicator (Only in Hero Mode) */}
      {isHeroMode && (
        <div className="about-hero-scroll-indicator" ref={scrollIndicatorRef}>
          <div className="scroll-indicator-mouse">
            <div className="scroll-indicator-wheel"></div>
          </div>
          <span className="scroll-indicator-text">SCROLL MOTION</span>
          <i className="fa-solid fa-chevron-down scroll-indicator-arrow"></i>
        </div>
      )}
    </section>
  );
}
