"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ContactProps {
  onShowToast: (msg: string) => void;
}

export default function Contact({ onShowToast }: ContactProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const infoBlockRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    clientName: "",
    clientWhatsapp: "",
    serviceType: "Website Bisnis",
    budgetRange: "Rp 3 - 6 Juta",
    projectNotes: "",
  });

  const [loading, setLoading] = useState(false);

  const serviceOptions = [
    "Website Bisnis",
    "Landing Page",
    "Toko Online / Katalog",
    "Sistem / Web App",
    "Redesign Website",
    "Kustom Khusus",
  ];

  const budgetOptions = [
    "< Rp 3 Juta",
    "Rp 3 - 6 Juta",
    "Rp 6 - 12 Juta",
    "Fleksibel",
  ];

  const handleSelectService = (item: string, e?: React.MouseEvent<HTMLButtonElement>) => {
    setFormData((prev) => ({ ...prev, serviceType: item }));
    if (e?.currentTarget) {
      gsap.fromTo(
        e.currentTarget,
        { scale: 0.93 },
        { scale: 1, duration: 0.25, ease: "back.out(2)", clearProps: "transform" }
      );
    }
  };

  const handleSelectBudget = (item: string, e?: React.MouseEvent<HTMLButtonElement>) => {
    setFormData((prev) => ({ ...prev, budgetRange: item }));
    if (e?.currentTarget) {
      gsap.fromTo(
        e.currentTarget,
        { scale: 0.93 },
        { scale: 1, duration: 0.25, ease: "back.out(2)", clearProps: "transform" }
      );
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Entrance timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Left Column Header & Info Cards
      if (infoBlockRef.current) {
        const headers = infoBlockRef.current.querySelectorAll(
          ".section-tag-pill, .section-heading-dark, .contact-intro-desc"
        );
        tl.fromTo(
          headers,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: "power3.out" }
        );

        // Contact link rows
        const linkRows = infoBlockRef.current.querySelectorAll(".contact-link-row");
        tl.fromTo(
          linkRows,
          { opacity: 0, x: -35, scale: 0.96 },
          { opacity: 1, x: 0, scale: 1, duration: 0.55, stagger: 0.09, ease: "back.out(1.15)" },
          "-=0.3"
        );

        // Guarantee card & items
        const guaranteeCard = infoBlockRef.current.querySelector(".contact-guarantee-card");
        if (guaranteeCard) {
          tl.fromTo(
            guaranteeCard,
            { opacity: 0, y: 30, scale: 0.98 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" },
            "-=0.2"
          );

          const guaranteeItems = guaranteeCard.querySelectorAll(".guarantee-item");
          tl.fromTo(
            guaranteeItems,
            { opacity: 0, x: -16 },
            { opacity: 1, x: 0, duration: 0.45, stagger: 0.08, ease: "power2.out" },
            "-=0.4"
          );
        }
      }

      // Right Column Inquiry Form
      if (formCardRef.current) {
        const form = formCardRef.current;
        tl.fromTo(
          form,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            clearProps: "all",
          },
          "-=0.6"
        );

        const formInnerElements = form.querySelectorAll(
          ".inquiry-header, .inquiry-group, .inquiry-grid-2, .inquiry-field:last-of-type, .inquiry-action-wrap"
        );
        tl.fromTo(
          formInnerElements,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.out",
            clearProps: "all",
          },
          "-=0.5"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName.trim() || !formData.clientWhatsapp.trim()) {
      onShowToast("Mohon lengkapi Nama dan Nomor WhatsApp Anda.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      onShowToast(
        `Terima kasih ${formData.clientName}. Rincian proyek Anda telah disiapkan untuk WhatsApp Arjuna.`
      );

      const text = encodeURIComponent(
        `Halo Arjuna,\n\nSaya ingin konsultasi proyek website:\n• Nama: ${formData.clientName}\n• WhatsApp: ${formData.clientWhatsapp}\n• Jenis Layanan: ${formData.serviceType}\n• Perkiraan Anggaran: ${formData.budgetRange}\n• Kebutuhan: ${formData.projectNotes.trim() || "Diskusi awal"}\n\nTerima kasih.`
      );
      window.open(`https://wa.me/6285733097867?text=${text}`, "_blank");

      setFormData({
        clientName: "",
        clientWhatsapp: "",
        serviceType: "Website Bisnis",
        budgetRange: "Rp 1 - 3 Juta",
        projectNotes: "",
      });
    }, 400);
  };

  return (
    <section id="kontak" className="section contact-section" ref={sectionRef}>
      <div className="container">
        <div className="contact-dual-grid">
          {/* Sisi Kiri: Informasi Kontak Langsung */}
          <div className="contact-info-block" ref={infoBlockRef}>
            <div className="section-tag-pill">KONSULTASI PROYEK</div>
            <h2 className="section-heading-dark">
              Mari Bicara Tentang{" "}
              <span className="text-gradient-blue">Proyek Website Anda</span>
            </h2>
            <p className="contact-intro-desc">
              Punya rencana peluncuran bisnis atau ingin memperbarui website lama agar lebih profesional dan efektif menjaring calon pelanggan? Mari diskusikan kebutuhan Anda secara langsung tanpa komitmen.
            </p>

            <div className="contact-cards-stack">
              <a
                href="https://wa.me/6285733097867?text=Halo%20Arjuna%20Webdev"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link-row"
              >
                <div className="c-icon-wrap">
                  <i className="fa-brands fa-whatsapp"></i>
                </div>
                <div className="c-info-text">
                  <small>WhatsApp Resmi</small>
                  <strong>+62 857-3309-7867</strong>
                </div>
                <div className="c-arrow-badge">
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </div>
              </a>

              <a
                href="mailto:arjunawebdev@gmail.com"
                className="contact-link-row"
              >
                <div className="c-icon-wrap">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div className="c-info-text">
                  <small>Email Bisnis</small>
                  <strong>arjunawebdev@gmail.com</strong>
                </div>
                <div className="c-arrow-badge">
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </div>
              </a>

              <div className="contact-link-row static">
                <div className="c-icon-wrap">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div className="c-info-text">
                  <small>Lokasi Studio</small>
                  <strong>Ds. Pamutih, Ulujami, Kab. Pemalang, Jawa Tengah</strong>
                </div>
              </div>

              <div className="contact-link-row static">
                <div className="c-icon-wrap">
                  <i className="fa-solid fa-clock"></i>
                </div>
                <div className="c-info-text">
                  <small>Jam Operasional</small>
                  <strong>Senin - Sabtu (08:00 - 21:00 WIB)</strong>
                </div>
              </div>
            </div>

            {/* Prinsip Pengerjaan Transparan */}
            <div className="contact-guarantee-card">
              <div className="guarantee-item">
                <i className="fa-solid fa-shield-halved"></i>
                <div>
                  <strong>Garansi Kualitas & Performa</strong>
                  <small>Arsitektur modern standar industri, loading optimal, dan garansi perbaikan bug.</small>
                </div>
              </div>
              <div className="guarantee-item">
                <i className="fa-solid fa-comments"></i>
                <div>
                  <strong>Komunikasi Langsung</strong>
                  <small>Berdiskusi langsung dengan developer teknis yang menangani proyek Anda.</small>
                </div>
              </div>
              <div className="guarantee-item">
                <i className="fa-solid fa-handshake"></i>
                <div>
                  <strong>Transparan di Awal</strong>
                  <small>Ruang lingkup kerja, jadwal, dan estimasi biaya disepakati sebelum pengerjaan.</small>
                </div>
              </div>
            </div>
          </div>

          {/* Sisi Kanan: Clean Studio Inquiry Form (Anti-Slop) */}
          <div className="contact-form-block">
            <form ref={formCardRef} onSubmit={handleSubmit} className="studio-inquiry-card">
              <div className="inquiry-header">
                <span className="inquiry-badge">FORMULIR KONSULTASI</span>
                <h3 className="inquiry-title">Rencanakan Proyek Website Anda</h3>
                <p className="inquiry-desc">
                  Tentukan jenis website dan anggaran yang Anda rencanakan. Pesan akan disiapkan rapi untuk dibuka di WhatsApp.
                </p>
              </div>

              {/* Pilihan Layanan */}
              <div className="inquiry-group">
                <label className="inquiry-group-label">Jenis Website atau Layanan</label>
                <div className="inquiry-pills-wrap">
                  {serviceOptions.map((opt) => {
                    const isSelected = formData.serviceType === opt;
                    return (
                      <button
                        type="button"
                        key={opt}
                        className={`inquiry-pill ${isSelected ? "selected" : ""}`}
                        onClick={(e) => handleSelectService(opt, e)}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Pilihan Anggaran */}
              <div className="inquiry-group">
                <label className="inquiry-group-label">Perkiraan Anggaran</label>
                <div className="inquiry-pills-wrap">
                  {budgetOptions.map((b) => {
                    const isSelected = formData.budgetRange === b;
                    return (
                      <button
                        type="button"
                        key={b}
                        className={`inquiry-pill ${isSelected ? "selected" : ""}`}
                        onClick={(e) => handleSelectBudget(b, e)}
                      >
                        {b}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Data Klien */}
              <div className="inquiry-grid-2">
                <div className="inquiry-field">
                  <label htmlFor="clientName">
                    Nama Lengkap <span className="field-req">*</span>
                  </label>
                  <input
                    type="text"
                    id="clientName"
                    name="clientName"
                    placeholder="Nama Anda atau perusahaan"
                    value={formData.clientName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="inquiry-field">
                  <label htmlFor="clientWhatsapp">
                    Nomor WhatsApp <span className="field-req">*</span>
                  </label>
                  <input
                    type="tel"
                    id="clientWhatsapp"
                    name="clientWhatsapp"
                    placeholder="08xxxxxxxxxx"
                    value={formData.clientWhatsapp}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Catatan / Kebutuhan */}
              <div className="inquiry-field">
                <label htmlFor="projectNotes">
                  Kebutuhan atau Tautan Referensi (Opsional)
                </label>
                <textarea
                  id="projectNotes"
                  name="projectNotes"
                  rows={3}
                  placeholder="Ceritakan tujuan website, fitur utama yang diinginkan, atau tautan situs referensi..."
                  value={formData.projectNotes}
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* Action Button & Note */}
              <div className="inquiry-action-wrap">
                <button
                  type="submit"
                  className="btn-inquiry-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin"></i>
                      <span>Menyiapkan Rincian...</span>
                    </>
                  ) : (
                    <>
                      <i className="fa-brands fa-whatsapp"></i>
                      <span>Mulai Konsultasi via WhatsApp</span>
                    </>
                  )}
                </button>
                <p className="inquiry-reassurance">
                  <i className="fa-solid fa-shield-halved"></i> Bebas konsultasi tanpa kewajiban komitmen. Data Anda hanya digunakan untuk komunikasi proyek ini.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
