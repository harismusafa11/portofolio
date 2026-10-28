"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BlogHero from "@/components/BlogHero";
import { blogsData, getAllCategories } from "@/data/blogs";

export default function BlogIndexPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["Semua", ...getAllCategories()];

  const filteredBlogs = useMemo(() => {
    return blogsData.filter((post) => {
      const matchCategory =
        selectedCategory === "Semua" || post.category === selectedCategory;
      const matchSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = blogsData[0];
  const otherPosts = filteredBlogs.filter((p) => p.slug !== featuredPost.slug);

  return (
    <div className="blog-page-root" style={{ backgroundColor: "#F8FAFC", minHeight: "100vh" }}>
      <Navbar />

      <main style={{ paddingTop: 0, backgroundColor: "#F8FAFC" }}>
        {/* 1. Hero Split-Canvas 100% Identik Home Page */}
        <BlogHero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
        />

        {/* 2. Blog Posts Section (Light Tech Elegant Area) */}
        <section
          className="blog-content-section"
          style={{
            position: "relative",
            zIndex: 2,
            paddingTop: "4.5rem",
            paddingBottom: "6rem",
            backgroundColor: "#F8FAFC",
            borderTop: "1px solid #E2E8F0",
          }}
        >
          <div className="container">
            {/* Header Keterangan Hasil / Filter */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "2.5rem",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <div>
                <span
                  style={{
                    display: "inline-block",
                    fontSize: "0.78rem",
                    color: "#1256E8",
                    background: "#EFF6FF",
                    border: "1px solid #BFDBFE",
                    padding: "0.3rem 0.85rem",
                    borderRadius: "9999px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: "0.5rem",
                  }}
                >
                  KATALOG ARTIKEL TERVERIFIKASI
                </span>
                <h2
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "2.1rem",
                    fontWeight: 800,
                    color: "#0A1128",
                    marginTop: "0.2rem",
                  }}
                >
                  {searchQuery
                    ? `Hasil Pencarian: "${searchQuery}" (${filteredBlogs.length})`
                    : selectedCategory === "Semua"
                    ? "Artikel & Panduan Terbaru"
                    : `Kategori: ${selectedCategory} (${filteredBlogs.length})`}
                </h2>
              </div>

              {(searchQuery || selectedCategory !== "Semua") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("Semua");
                  }}
                  className="btn"
                  style={{
                    fontSize: "0.85rem",
                    padding: "0.5rem 1.25rem",
                    background: "#FFFFFF",
                    border: "1.5px solid #CBD5E1",
                    color: "#1E293B",
                    borderRadius: "9999px",
                    fontWeight: 600,
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                >
                  <i className="fa-solid fa-rotate-left" style={{ color: "#1256E8", marginRight: "0.4rem" }}></i> Reset Filter
                </button>
              )}
            </div>

            {/* Tampilkan Featured Card jika tidak sedang filter search query */}
            {!searchQuery && selectedCategory === "Semua" && featuredPost && (
              <article className="blog-featured-card">
                <div className="featured-thumb-wrap">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    loading="eager"
                  />
                </div>
                <div className="featured-info">
                  <div className="featured-badge">
                    <i className="fa-solid fa-star"></i>
                    <span>ARTIKEL PILIHAN UTAMA</span>
                  </div>
                  <Link href={`/blog/${featuredPost.slug}`}>
                    <h3 className="featured-title">{featuredPost.title}</h3>
                  </Link>
                  <p className="featured-excerpt">{featuredPost.excerpt}</p>
                  <div className="featured-meta">
                    <div className="author-chip">
                      <img
                        src={featuredPost.author.avatar}
                        alt={featuredPost.author.name}
                        className="author-chip-avatar"
                      />
                      <div>
                        <div className="author-chip-name">
                          {featuredPost.author.name}
                        </div>
                        <div className="author-chip-role">
                          {featuredPost.author.role}
                        </div>
                      </div>
                    </div>
                    <div className="post-time-meta">
                      <span>
                        <i className="fa-regular fa-calendar"></i>{" "}
                        {featuredPost.date}
                      </span>
                      <span>
                        <i className="fa-regular fa-clock"></i>{" "}
                        {featuredPost.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* List Article Grid */}
            {filteredBlogs.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "4rem 2rem",
                  background: "#FFFFFF",
                  borderRadius: "20px",
                  border: "1.5px dashed #CBD5E1",
                  boxShadow: "0 6px 20px rgba(10, 17, 40, 0.04)",
                }}
              >
                <i
                  className="fa-solid fa-folder-open"
                  style={{
                    fontSize: "3rem",
                    color: "#94A3B8",
                    marginBottom: "1rem",
                  }}
                ></i>
                <h3
                  style={{
                    color: "#0A1128",
                    fontSize: "1.3rem",
                    fontWeight: 800,
                    marginBottom: "0.5rem",
                  }}
                >
                  Tidak ada artikel yang sesuai
                </h3>
                <p style={{ color: "#64748B", fontSize: "0.95rem" }}>
                  Coba kata kunci pencarian lain atau pilih kategori "Semua".
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("Semua");
                  }}
                  className="btn btn-blue-pill"
                  style={{ marginTop: "1.25rem" }}
                >
                  Tampilkan Semua Artikel
                </button>
              </div>
            ) : (
              <div className="blog-grid">
                {(searchQuery || selectedCategory !== "Semua"
                  ? filteredBlogs
                  : otherPosts
                ).map((post) => (
                  <article key={post.slug} className="blog-card">
                    <div className="blog-card-thumb-wrap">
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                      />
                      <span className="blog-card-category-tag">
                        {post.category}
                      </span>
                    </div>

                    <div className="blog-card-body">
                      <div className="blog-card-info-top">
                        <span>
                          <i className="fa-regular fa-calendar"></i> {post.date}
                        </span>
                        <span>•</span>
                        <span>
                          <i className="fa-regular fa-clock"></i> {post.readTime}
                        </span>
                      </div>

                      <Link href={`/blog/${post.slug}`}>
                        <h3 className="blog-card-title">{post.title}</h3>
                      </Link>

                      <p className="blog-card-excerpt">{post.excerpt}</p>

                      <div className="blog-card-footer">
                        <div className="author-chip">
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="author-chip-avatar"
                            style={{ width: "32px", height: "32px" }}
                          />
                          <span
                            style={{
                              fontSize: "0.85rem",
                              color: "#1E293B",
                              fontWeight: 600,
                            }}
                          >
                            {post.author.name}
                          </span>
                        </div>

                        <Link
                          href={`/blog/${post.slug}`}
                          className="read-more-link"
                          aria-label={`Baca artikel: ${post.title}`}
                        >
                          <span>Baca</span>
                          <i className="fa-solid fa-arrow-right"></i>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* 3. Bottom Consultation Banner */}
            <div
              className="article-bottom-cta"
              style={{ marginTop: "5.5rem", marginBottom: "0" }}
            >
              <h2 className="article-bottom-cta-title">
                Punya Pertanyaan Seputar Kebutuhan Website Bisnis Anda?
              </h2>
              <p className="article-bottom-cta-desc">
                Diskusikan rencana pembuatan website Anda langsung bersama Haris
                Musafa. Kami berikan estimasi biaya transparan, arsitektur cepat
                Next.js, dan garansi 90 hari.
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1.15rem",
                  flexWrap: "wrap",
                }}
              >
                <a
                  href="https://wa.me/6285733097867?text=Halo%20Haris%20Musafa,%20saya%20sudah%20membaca%20blog%20Arjuna%20Dev%20dan%20tertarik%20konsultasi%20pembuatan%20website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-blue-pill"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                  <span>Konsultasi Gratis via WhatsApp</span>
                </a>
                <Link
                  href="/layanan"
                  className="btn"
                  style={{
                    background: "rgba(255, 255, 255, 0.15)",
                    border: "1px solid rgba(255, 255, 255, 0.4)",
                    color: "#FFFFFF",
                    borderRadius: "9999px",
                    padding: "0.75rem 1.75rem",
                    fontWeight: 700,
                    fontSize: "0.92rem",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  <span>Lihat Paket Layanan & Harga</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
