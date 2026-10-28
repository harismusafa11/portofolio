"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const num1Ref = useRef<HTMLSpanElement>(null);
  const num2Ref = useRef<HTMLSpanElement>(null);
  const num3Ref = useRef<HTMLSpanElement>(null);
  const num4Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      const header = section.querySelectorAll(
        ".section-badge-center, .section-title-dark, .section-sub-dark"
      );
      const cards = section.querySelectorAll<HTMLElement>(".stat-box");

      // Initial state
      gsap.set(header, { opacity: 0, y: 35 });
      gsap.set(cards, { opacity: 0, y: 65, rotateX: 18, scale: 0.92 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });

      // Header entrance
      tl.to(header, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      });

      // Cards 3D entrance
      tl.to(
        cards,
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          onStart: () => {
            // Smooth numeric count-up animations
            const counter1 = { val: 0 };
            gsap.to(counter1, {
              val: 15,
              duration: 1.6,
              ease: "power2.out",
              onUpdate: () => {
                if (num1Ref.current) num1Ref.current.textContent = Math.floor(counter1.val).toString();
              },
            });

            const counter2 = { val: 0 };
            gsap.to(counter2, {
              val: 100,
              duration: 1.8,
              ease: "power2.out",
              onUpdate: () => {
                if (num2Ref.current) num2Ref.current.textContent = Math.floor(counter2.val).toString();
              },
            });

            const counter3 = { val: 0 };
            gsap.to(counter3, {
              val: 1,
              duration: 1.4,
              ease: "power2.out",
              onUpdate: () => {
                if (num3Ref.current) num3Ref.current.textContent = Math.floor(counter3.val).toString();
              },
            });

            const counter4 = { val: 0 };
            gsap.to(counter4, {
              val: 100,
              duration: 1.8,
              ease: "power2.out",
              onUpdate: () => {
                if (num4Ref.current) num4Ref.current.textContent = Math.floor(counter4.val).toString();
              },
            });
          },
        },
        "-=0.4"
      );

      // Real-time Alternating Scroll Scrub Parallax
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

      // Interactive 3D mouse tilt on stat cards
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
              rotateX: tiltX * 8,
              rotateY: tiltY * 8,
              y: -8,
              transformPerspective: 800,
              duration: 0.35,
              ease: "power2.out",
            });
          };

          const onMouseLeave = () => {
            gsap.to(card, {
              rotateX: 0,
              rotateY: 0,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
            });
          };

          card.addEventListener("mousemove", onMouseMove);
          card.addEventListener("mouseleave", onMouseLeave);
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section stats-banner-section" ref={sectionRef}>
      <div className="container">
        <div className="section-badge-center">
          <span className="badge-text">STANDAR KERJA PROFESIONAL</span>
        </div>
        <h2 className="section-title-dark text-center">
          Kenapa Memilih <span className="text-gradient-blue">ARJUNA WEBDEV?</span>
        </h2>
        <p className="section-sub-dark text-center">
          Standar pengerjaan profesional yang mengutamakan kecepatan akses, kemudahan pengguna, dan hasil yang mendukung pertumbuhan bisnis Anda.
        </p>

        <div className="stats-row">
          {/* Stat 1 */}
          <div className="stat-box">
            <div className="stat-num-row">
              <span className="stat-counter" ref={num1Ref}>0</span>
              <span className="stat-plus">+</span>
            </div>
            <h3 className="stat-title">Proyek Selesai</h3>
            <p className="stat-desc">
              Website profil perusahaan, toko online, dan landing page yang telah aktif beroperasi.
            </p>
          </div>

          {/* Stat 2 */}
          <div className="stat-box">
            <div className="stat-num-row">
              <span className="stat-counter" ref={num2Ref}>0</span>
              <span className="stat-plus">%</span>
            </div>
            <h3 className="stat-title">Responsif &amp; Mobile-Friendly</h3>
            <p className="stat-desc">
              Tampilan proporsional dan nyaman diakses di smartphone, tablet, maupun layar desktop.
            </p>
          </div>

          {/* Stat 3 */}
          <div className="stat-box">
            <div className="stat-num-row">
              <span className="stat-prefix">&lt;</span>
              <span className="stat-counter" ref={num3Ref}>0</span>
              <span className="stat-plus">.2s</span>
            </div>
            <h3 className="stat-title">Akses Cepat &amp; Ringan</h3>
            <p className="stat-desc">
              Optimasi aset dan kode modern untuk waktu muat cepat tanpa membuat calon pelanggan menunggu.
            </p>
          </div>

          {/* Stat 4 */}
          <div className="stat-box">
            <div className="stat-num-row">
              <span className="stat-counter" ref={num4Ref}>0</span>
              <span className="stat-plus">%</span>
            </div>
            <h3 className="stat-title">Garansi Pendampingan</h3>
            <p className="stat-desc">
              Dukungan revisi dan panduan operasional agar website siap digunakan dengan percaya diri.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
