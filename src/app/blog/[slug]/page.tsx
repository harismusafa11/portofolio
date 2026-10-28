import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import {
  blogsData,
  getBlogPostBySlug,
  getRelatedPosts,
} from "@/data/blogs";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogsData.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Artikel Tidak Ditemukan — Arjuna Dev",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `https://arjunadev.com/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | Arjuna Dev`,
      description: post.excerpt,
      url: `https://arjunadev.com/blog/${post.slug}`,
      siteName: "Arjuna Dev",
      locale: "id_ID",
      type: "article",
      publishedTime: post.isoDate,
      authors: [post.author.name],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      creator: "@harismusafa",
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, 3);

  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `https://arjunadev.com${post.image}`,
    datePublished: post.isoDate,
    dateModified: post.isoDate,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
      url: "https://instagram.com/haris_musafa_",
    },
    publisher: {
      "@type": "Organization",
      name: "Arjuna Dev",
      logo: {
        "@type": "ImageObject",
        url: "https://arjunadev.com/assets/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://arjunadev.com/blog/${post.slug}`,
    },
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Beranda",
        item: "https://arjunadev.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://arjunadev.com/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://arjunadev.com/blog/${post.slug}`,
      },
    ],
  };

  const whatsappMessage = encodeURIComponent(
    `Halo Haris Musafa, saya membaca artikel "${post.title}" di website Arjuna Dev dan ingin konsultasi pembuatan website bisnis saya.`
  );

  return (
    <div className="article-page-root" style={{ backgroundColor: "#F8FAFC", minHeight: "100vh" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      <Navbar />

      <main className="blog-page-wrapper" style={{ backgroundColor: "#F8FAFC" }}>
        {/* Article Header Hero */}
        <header className="article-hero" style={{ backgroundColor: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
          <div className="container">
            {/* Breadcrumb Navigation */}
            <nav className="article-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Beranda</Link>
              <i className="fa-solid fa-chevron-right"></i>
              <Link href="/blog">Blog</Link>
              <i className="fa-solid fa-chevron-right"></i>
              <span>{post.category}</span>
            </nav>

            <span className="article-badge-category">
              <i className="fa-solid fa-tag"></i> {post.category}
            </span>

            <h1 className="article-main-title">{post.title}</h1>

            <div className="article-meta-bar">
              <div className="article-author-info">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="article-author-img"
                />
                <div>
                  <div className="article-author-name">{post.author.name}</div>
                  <div className="article-author-title">
                    {post.author.role}
                  </div>
                </div>
              </div>

              <div className="article-meta-stats">
                <span>
                  <i className="fa-regular fa-calendar"></i> {post.date}
                </span>
                <span>
                  <i className="fa-regular fa-clock"></i> {post.readTime}
                </span>
                <span>
                  <i className="fa-solid fa-shield-check"></i> Terverifikasi
                </span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="article-cover-frame">
              <img
                src={post.image}
                alt={post.title}
                loading="eager"
              />
            </div>
          </div>
        </header>

        {/* Article Body Content & Sidebar */}
        <section className="article-body-section" style={{ padding: "3rem 0 5rem", backgroundColor: "#F8FAFC" }}>
          <div className="container">
            <div className="article-layout-grid">
              {/* Main Content Column */}
              <div className="article-main-col">
                <div
                  className="article-body-content"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Tags */}
                <div className="article-footer-tags">
                  <span style={{ fontSize: "0.85rem", color: "#64748B", fontWeight: 700 }}>
                    <i className="fa-solid fa-tags"></i> Topik Terkait:
                  </span>
                  {post.tags.map((tag) => (
                    <span key={tag} className="article-tag-pill">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Author Bio Box */}
                <div
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    borderRadius: "20px",
                    padding: "2rem",
                    marginBottom: "3.5rem",
                    display: "flex",
                    gap: "1.5rem",
                    alignItems: "center",
                    flexWrap: "wrap",
                    boxShadow: "0 8px 30px rgba(10, 17, 40, 0.05)",
                  }}
                >
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      border: "2.5px solid #1256E8",
                      objectFit: "cover",
                    }}
                  />
                  <div style={{ flex: 1, minWidth: "240px" }}>
                    <div
                      style={{
                        fontSize: "0.78rem",
                        color: "#1256E8",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginBottom: "0.25rem",
                      }}
                    >
                      DITULIS OLEH
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.3rem",
                        fontWeight: 800,
                        color: "#0A1128",
                        marginBottom: "0.4rem",
                      }}
                    >
                      {post.author.name}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.92rem",
                        color: "#475569",
                        lineHeight: 1.6,
                        marginBottom: "0.75rem",
                      }}
                    >
                      Founder & Lead Engineer di Arjuna Dev. Membantu puluhan UMKM dan
                      perusahaan Indonesia memiliki aset website berdaya saing tinggi,
                      berkecepatan optimal, dan teroptimasi di mesin pencari Google.
                    </p>
                    <div style={{ display: "flex", gap: "1.25rem", fontSize: "0.95rem" }}>
                      <a
                        href="https://instagram.com/haris_musafa_"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#E1306C", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
                      >
                        <i className="fa-brands fa-instagram"></i> @haris_musafa_
                      </a>
                      <a
                        href="https://github.com/harismusafa11"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#1E293B", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
                      >
                        <i className="fa-brands fa-github"></i> harismusafa11
                      </a>
                    </div>
                  </div>
                </div>

                {/* CTA Box at Bottom of Article */}
                <div className="article-bottom-cta">
                  <h2 className="article-bottom-cta-title">
                    Ingin Membangun Website Bisnis Seperti yang Dibahas di Artikel Ini?
                  </h2>
                  <p className="article-bottom-cta-desc">
                    Konsultasikan langsung ide, kebutuhan fitur, dan budget usaha Anda
                    bersama Haris Musafa. Dapatkan estimasi biaya instan dan garansi 90 hari.
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
                      href={`https://wa.me/6285733097867?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-blue-pill"
                    >
                      <i className="fa-brands fa-whatsapp"></i>
                      <span>Konsultasi Langsung via WhatsApp</span>
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
                      <span>Cek Daftar Paket Layanan</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Sidebar Column */}
              <aside className="article-sidebar">
                {/* Author Card */}
                <div className="sidebar-card author-bio-card">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="author-bio-avatar"
                  />
                  <div className="author-bio-name">{post.author.name}</div>
                  <div className="author-bio-role">{post.author.role}</div>
                  <p className="author-bio-text">
                    Spesialis Full-Stack Next.js & Arsitektur Web Bisnis. Berbasis di
                    Pemalang, Jawa Tengah, melayani klien di seluruh Indonesia.
                  </p>
                  <a
                    href="https://wa.me/6285733097867"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-blue-pill btn-block"
                    style={{ fontSize: "0.85rem", padding: "0.6rem 1.25rem" }}
                  >
                    <i className="fa-brands fa-whatsapp"></i> Chat WhatsApp
                  </a>
                </div>

                {/* Quick Consultation Card */}
                <div className="sidebar-card sidebar-cta-card">
                  <div className="sidebar-title">
                    <i className="fa-solid fa-headset"></i>
                    <span>Konsultasi Proyek</span>
                  </div>
                  <div className="sidebar-cta-title">
                    Butuh Website Cepat & Bergaransi?
                  </div>
                  <p className="sidebar-cta-desc">
                    Kami bantu rancang website profesional mulai dari Rp 499rb
                    dengan domain .com & hosting gratis 1 tahun.
                  </p>
                  <a
                    href={`https://wa.me/6285733097867?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-blue-pill btn-block"
                    style={{ fontSize: "0.88rem" }}
                  >
                    <span>Minta Penawaran Harga</span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </a>
                </div>

                {/* Back to Blog Hub */}
                <div className="sidebar-card" style={{ textAlign: "center" }}>
                  <Link
                    href="/blog"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      color: "#1256E8",
                      fontWeight: 700,
                      fontSize: "0.92rem",
                    }}
                  >
                    <i className="fa-solid fa-arrow-left"></i>
                    <span>Kembali ke Semua Artikel</span>
                  </Link>
                </div>
              </aside>
            </div>

            {/* Related Articles Section */}
            {relatedPosts.length > 0 && (
              <div
                style={{
                  paddingTop: "4rem",
                  borderTop: "1px solid #E2E8F0",
                }}
              >
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
                      BACA JUGA
                    </span>
                    <h2
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.85rem",
                        fontWeight: 800,
                        color: "#0A1128",
                        marginTop: "0.2rem",
                      }}
                    >
                      Artikel Terkait Lainnya
                    </h2>
                  </div>
                  <Link
                    href="/blog"
                    className="read-more-link"
                    style={{ fontSize: "0.95rem" }}
                  >
                    <span>Lihat Semua Blog</span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>

                <div className="blog-grid">
                  {relatedPosts.map((rel) => (
                    <article key={rel.slug} className="blog-card">
                      <div className="blog-card-thumb-wrap">
                        <img
                          src={rel.image}
                          alt={rel.title}
                          loading="lazy"
                        />
                        <span className="blog-card-category-tag">
                          {rel.category}
                        </span>
                      </div>

                      <div className="blog-card-body">
                        <div className="blog-card-info-top">
                          <span>
                            <i className="fa-regular fa-calendar"></i> {rel.date}
                          </span>
                          <span>•</span>
                          <span>
                            <i className="fa-regular fa-clock"></i> {rel.readTime}
                          </span>
                        </div>

                        <Link href={`/blog/${rel.slug}`}>
                          <h3 className="blog-card-title">{rel.title}</h3>
                        </Link>

                        <p className="blog-card-excerpt">{rel.excerpt}</p>

                        <div className="blog-card-footer">
                          <span
                            style={{
                              fontSize: "0.84rem",
                              color: "#1E293B",
                              fontWeight: 600,
                            }}
                          >
                            {rel.author.name}
                          </span>

                          <Link
                            href={`/blog/${rel.slug}`}
                            className="read-more-link"
                            aria-label={`Baca artikel: ${rel.title}`}
                          >
                            <span>Baca</span>
                            <i className="fa-solid fa-arrow-right"></i>
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
