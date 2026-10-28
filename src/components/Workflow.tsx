"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Workflow() {
  const workflowSectionRef = useRef<HTMLElement>(null);
  const pipelineGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const section = workflowSectionRef.current;
      if (!section) return;

      // 1. Header elements entrance
      const headerEls = section.querySelectorAll(
        ".section-badge-center, .section-title-dark, .section-sub-dark"
      );
      if (headerEls.length > 0) {
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
      }

      // 2. 4 Steps Bento Cards Stagger Entrance
      const cards = section.querySelectorAll<HTMLElement>(".wf-card");
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 55, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: pipelineGridRef.current || section,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // 3. Subtle Parallax Scrub on pipeline cards
        cards.forEach((card, idx) => {
          const delta = (idx % 2 === 0 ? -15 : -30);
          gsap.fromTo(
            card,
            { y: 10 },
            {
              y: delta,
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
      }

      // 4. Guarantee bar entrance
      const guaranteeBar = section.querySelector(".wf-guarantee-bar");
      if (guaranteeBar) {
        gsap.fromTo(
          guaranteeBar,
          { opacity: 0, y: 25, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            ease: "power2.out",
            scrollTrigger: {
              trigger: guaranteeBar,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, workflowSectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      num: "01",
      title: "Konsultasi & Kebutuhan",
      desc: "Memahami model bisnis, target pasar, dan struktur konten yang diperlukan untuk merancang website yang tepat sasaran.",
      icon: "fa-comments",
      output: "Brief & Solusi Arsitektur",
      accent: "#1256E8",
    },
    {
      num: "02",
      title: "Perancangan & Desain",
      desc: "Penyusunan tata letak dan desain visual agar selaras dengan identitas brand sebelum proses koding dimulai.",
      icon: "fa-compass-drafting",
      output: "Mockup UI/UX Modern",
      accent: "#00D2FF",
    },
    {
      num: "03",
      title: "Pengembangan & Integrasi",
      desc: "Penulisan kode bersih, integrasi tombol WhatsApp dan formulir, serta optimasi kecepatan muat halaman.",
      icon: "fa-code",
      output: "Full-Stack Code & Web App",
      accent: "#0284C7",
    },
    {
      num: "04",
      title: "Uji Kelayakan & Peluncuran",
      desc: "Pengecekan tampilan di berbagai perangkat, integrasi domain dan SSL, serta penyerahan akses dan panduan pengelolaan.",
      icon: "fa-rocket",
      output: "Live Deploy & Garansi",
      accent: "#10B981",
    },
  ];

  return (
    <section className="section workflow-section" id="alur-kerja" ref={workflowSectionRef}>
      {/* Ambient background decor */}
      <div className="wf-ambient-mesh" aria-hidden="true"></div>

      <div className="container relative-z">
        <div className="section-badge-center">
          <span className="badge-text">
            <i className="fa-solid fa-list-check"></i> PROSES PROFESIONAL
          </span>
        </div>
        <h2 className="section-title-dark text-center">
          Alur Kerja <span className="text-gradient-blue">Transparan</span>
        </h2>
        <p className="section-sub-dark text-center">
          Setiap tahapan dikerjakan dengan standar tinggi dan komunikasi rutin agar
          hasil tepat sasaran.
        </p>

        {/* 4 Steps Bento Grid Pipeline */}
        <div className="wf-grid-pipeline" ref={pipelineGridRef}>
          {steps.map((step, idx) => (
            <div
              key={step.num}
              className="wf-card"
              style={{ "--wf-accent": step.accent } as React.CSSProperties}
            >
              {/* Connecting Chevron Arrow between cards on desktop */}
              {idx < steps.length - 1 && (
                <div className="wf-pipeline-arrow" aria-hidden="true">
                  <i className="fa-solid fa-chevron-right"></i>
                </div>
              )}

              {/* Card Top: Step Number Badge + Icon Orb */}
              <div className="wf-card-top">
                <span className="wf-card-step-num">{step.num}</span>
                <div className="wf-card-icon-orb">
                  <i className={`fa-solid ${step.icon}`}></i>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="wf-card-title">{step.title}</h3>
              <p className="wf-card-desc">{step.desc}</p>

              {/* Concrete Deliverable Output Tag */}
              <div className="wf-card-output">
                <span className="wf-output-label">
                  <i className="fa-solid fa-circle-check"></i> {step.output}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Micro Trust Guarantee Bar below workflow */}
        <div className="wf-guarantee-bar">
          <div className="wf-guarantee-item">
            <i className="fa-solid fa-comments text-blue"></i>
            <span>Update Berkala via WhatsApp</span>
          </div>
          <div className="wf-guarantee-dot"></div>
          <div className="wf-guarantee-item">
            <i className="fa-solid fa-clock-rotate-left text-cyan"></i>
            <span>Revisi Cepat &amp; Tepat Waktu</span>
          </div>
          <div className="wf-guarantee-dot"></div>
          <div className="wf-guarantee-item">
            <i className="fa-solid fa-shield-halved text-emerald"></i>
            <span>Garansi Bug Pasca-Peluncuran</span>
          </div>
        </div>
      </div>
    </section>
  );
}
