"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Portfolio from "@/components/Portfolio";
import Footer from "@/components/Footer";
import ProjectModal from "@/components/ProjectModal";
import WhatsAppButton from "@/components/WhatsAppButton";
import { projectsData } from "@/data/projects";

export default function PortfolioPage() {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );

  const selectedProject = selectedProjectId
    ? projectsData[selectedProjectId] || null
    : null;

  return (
    <>
      <Navbar />

      <main className="page-wrapper portfolio-page-wrapper">
        {/* Tampilan Portofolio 100% Persis Gambar Referensi (Gambar 2) */}
        <Portfolio onOpenProject={(id) => setSelectedProjectId(id)} />
      </main>

      <Footer />

      {/* Modal Detail Proyek */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProjectId(null)}
      />

      <WhatsAppButton />
    </>
  );
}
