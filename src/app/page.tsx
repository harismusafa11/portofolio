"use client";

import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Portfolio from "@/components/Portfolio";
import Pricing from "@/components/Pricing";
import Workflow from "@/components/Workflow";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ProjectModal from "@/components/ProjectModal";
import WhatsAppButton from "@/components/WhatsAppButton";
import Toast from "@/components/Toast";
import { projectsData } from "@/data/projects";

export default function Home() {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Matikan browser scroll restoration agar tidak tertahan di footer saat di-refresh
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // 2. Beritahu GSAP ScrollTrigger untuk membersihkan memori scroll posisi lama
    gsap.registerPlugin(ScrollTrigger);
    if (typeof ScrollTrigger.clearScrollMemory === "function") {
      ScrollTrigger.clearScrollMemory();
    }

    // 3. Scroll paksa ke paling atas halaman saat refresh / load (jika tidak ada hash link)
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      });
    }

    // 4. Sebelum refresh / reload halaman, reset posisi scroll ke 0
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const selectedProject = selectedProjectId
    ? projectsData[selectedProjectId] || null
    : null;

  return (
    <>
      {/* 1. Header / Navbar */}
      <Navbar />

      {/* Main Page Sections */}
      <main>
        {/* Halaman 1: Hero Canvas (Persis Gambar 1) */}
        <Hero onOpenProject={(id) => setSelectedProjectId(id)} />

        {/* Keunggulan & Counter Statistik */}
        <Stats />

        {/* Halaman 2: Portofolio Proyek (Persis Gambar 2) */}
        <Portfolio onOpenProject={(id) => setSelectedProjectId(id)} />

        {/* Paket Layanan & Harga */}
        <Pricing />

        {/* Alur Kerja */}
        <Workflow />

        {/* Tentang Pengembang */}
        <About />

        {/* Kontak & Formulir Konsultasi */}
        <Contact onShowToast={(msg) => setToastMessage(msg)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProjectId(null)}
      />

      {/* Floating Action Button (WhatsApp) */}
      <WhatsAppButton />

      {/* Feedback Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </>
  );
}
