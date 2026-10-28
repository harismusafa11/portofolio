"use client";

import React, { useEffect } from "react";
import { ProjectItem } from "@/data/projects";

interface ModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (project) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="modal-backdrop active"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Tutup Jendela"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="modal-screen-wrap">
          <img
            src={project.image}
            alt={project.title}
            className="modal-main-img"
          />
        </div>

        <div className="modal-body-content">
          <div className="modal-header-meta">
            <span className="modal-category-tag">{project.categoryTag}</span>
            <h3 id="modal-title" className="modal-project-title">
              {project.title}
            </h3>
          </div>

          <p className="modal-project-desc">{project.desc}</p>

          <div className="modal-detail-block">
            <h4 className="detail-heading">Teknologi yang Digunakan:</h4>
            <div className="modal-tech-list">
              {project.tech.map((t, idx) => (
                <span key={idx} className="tech-badge">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="modal-detail-block">
            <h4 className="detail-heading">Fitur & Keunggulan Utama:</h4>
            <ul className="modal-features-list">
              {project.features.map((feat, idx) => (
                <li key={idx}>
                  <i className="fa-solid fa-circle-check text-cyan"></i>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="modal-bottom-actions">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-demo-pill"
              >
                <span>Kunjungi Website Live</span>
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
            )}
            <a
              href={`https://wa.me/6285733097867?text=${encodeURIComponent(
                `Halo Arjuna Webdev, saya tertarik dengan portofolio *${project.title}*. Bisakah kita berdiskusi?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-blue-pill"
            >
              <span>Konsultasikan Proyek Serupa</span>
              <i className="fa-brands fa-whatsapp"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
