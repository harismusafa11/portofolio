"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { WindowBrowserHeader } from "./WindowBrowserHeader";
import { MinimalistHero } from "@/components/ui/minimalist-hero";
import { GradientCard } from "@/components/ui/gradient-card";
import { ProjectShowcase, ShowcaseProject } from "@/components/ui/project-showcase";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import {
  Code2,
  Cpu,
  Globe,
  Smartphone,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  Zap,
  FileCode,
} from "lucide-react";
import { GithubLogo, InstagramLogo, WhatsAppLogo } from "@/components/icons/BrandIcons";
import { useWindowStore } from "@/store/windowStore";

export interface UnifiedPortfolioAppProps {
  initialSection?: "about" | "portfolio" | "metrics" | "skills";
}

export const UnifiedPortfolioApp: React.FC<UnifiedPortfolioAppProps> = memo(function UnifiedPortfolioApp({
  initialSection = "about",
}) {
  const openWindow = useWindowStore((state) => state.openWindow);
  const focusWindow = useWindowStore((state) => state.focusWindow);

  React.useEffect(() => {
    if (initialSection) {
      const timer = setTimeout(() => {
        const targetEl = document.getElementById(initialSection);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [initialSection]);

  // Map portfolio data to ShowcaseProject format
  const showcaseProjects: ShowcaseProject[] = PORTFOLIO_DATA.map((proj) => ({
    name: proj.title,
    quote: proj.longDescription || proj.description,
    designation: proj.categoryLabel,
    src: proj.demoUrl
      ? `https://api.microlink.io/?url=${encodeURIComponent(proj.demoUrl)}&screenshot=true&meta=false&embed=screenshot.url`
      : "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    link: proj.demoUrl || "https://harismusafa.dev",
    highlights: proj.highlights,
    techStack: proj.techStack,
  }));

  const statsData = [
    {
      badgeText: "VERIFIED METRIC",
      badgeColor: "#10B981",
      title: "4+ Tahun",
      description: "Pengalaman profesional dalam rekayasa perangkat lunak web & mobile.",
      gradient: "green" as const,
    },
    {
      badgeText: "PRODUCTION READY",
      badgeColor: "#3B82F6",
      title: "35+ Proyek",
      description: "Aplikasi web, SaaS, & platform digital ter-deploy dengan performa tinggi.",
      gradient: "gray" as const,
    },
    {
      badgeText: "CLIENT RETENTION",
      badgeColor: "#F59E0B",
      title: "99.8%",
      description: "Tingkat kepuasan klien dengan jaminan SLA & dukungan teknis berkelanjutan.",
      gradient: "orange" as const,
    },
    {
      badgeText: "LIGHTHOUSE SCORE",
      badgeColor: "#8B5CF6",
      title: "100 / 100",
      description: "Skor kecepatan & optimasi SEO pada setiap aplikasi yang diproduksi.",
      gradient: "purple" as const,
    },
  ];

  const techCategories = [
    {
      title: "Frontend Core & Frameworks",
      icon: Globe,
      color: "text-sky-400 border-sky-500/20 bg-sky-500/10",
      skills: ["HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript", "Next.js (App Router)", "React 19", "Tailwind CSS"],
    },
    {
      title: "Backend, Database & APIs",
      icon: Cpu,
      color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10",
      skills: ["Node.js", "PHP", "PostgreSQL", "Supabase", "Redis Caching", "REST & GraphQL", "Drizzle ORM"],
    },
    {
      title: "Mobile & Web Browser APIs",
      icon: Smartphone,
      color: "text-purple-400 border-purple-500/20 bg-purple-500/10",
      skills: ["Flutter", "React Native", "Canvas API", "Firebase SDK", "iOS & Android SDKs"],
    },
  ];

  const handleOpenOrderForm = () => {
    openWindow("order_wizard");
    focusWindow("order_wizard");
  };

  return (
    <div className="flex flex-col min-h-full bg-[#0a0a0c] text-gray-200 font-sans select-text overflow-y-auto custom-scrollbar">
      {/* 1. Window Browser Header */}
      <WindowBrowserHeader url="https://harismusafa.dev/about-portfolio" />

      {/* 2. Hero Profile Section */}
      <MinimalistHero
        logoText="HARIS MUSAFA"
        navLinks={[
          { label: "ABOUT", href: "#about" },
          { label: "METRICS", href: "#metrics" },
          { label: "TECH STACK", href: "#skills" },
          { label: "WORKS", href: "#portfolio" },
        ]}
        mainText="Senior Fullstack Web & Mobile Developer spesialis sistem performa tinggi, SaaS, dan antarmuka web interaktif."
        readMoreLink="#portfolio"
        imageSrc="/images/profile.png"
        imageAlt="Haris Musafa Avatar"
        overlayText={{
          part1: "Haris",
          part2: "Musafa.",
        }}
        socialLinks={[
          { icon: GithubLogo as any, href: "https://github.com/harismusafa11" },
          { icon: InstagramLogo as any, href: "https://instagram.com/haris_musafa_" },
        ]}
        locationText="Indonesia (UTC+7)"
      />

      {/* Main Content Area */}
      <div className="max-w-6xl w-full mx-auto p-6 md:p-10 space-y-16 perspective-1000">
        {/* 3. About Me Narrative - 3D Tilt Reveal */}
        <motion.section
          id="about"
          initial={{ opacity: 0, rotateX: 18, y: 50 }}
          whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4 pt-4 border-b border-white/10 pb-8 transform-gpu"
        >
          <span className="text-xs font-mono text-sky-400 uppercase tracking-widest font-semibold">
            ABOUT ME & ENGINEERING PHILOSOPHY
          </span>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Membangun Produk Digital Modern dengan Kecepatan & Keandalan Ekstrem
          </h2>
          <p className="text-gray-300 leading-relaxed max-w-3xl text-sm md:text-base">
            Saya Haris Musafa (Arjuna Dev), pengembang aplikasi Fullstack & Mobile dengan pengalaman lebih dari 4 tahun. 
            Saya mengombinasikan desain antarmuka bersih (*human-designed editorial UI*) dengan arsitektur kode berskala tinggi.
          </p>
        </motion.section>

        {/* 4. Stats Grid - Staggered 3D Card Flip */}
        <section id="metrics" className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-semibold">
              QUANTITATIVE PERFORMANCE STATS
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsData.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.85, rotateY: -15, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="h-full transform-gpu"
              >
                <GradientCard
                  badgeText={stat.badgeText}
                  badgeColor={stat.badgeColor}
                  title={stat.title}
                  description={stat.description}
                  gradient={stat.gradient}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* 5. Tech Stack & Capabilities Grid - Silky Smooth Spring Entrance */}
        <motion.section
          id="skills"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6 pt-4"
        >
          <div>
            <span className="text-xs font-mono text-purple-400 uppercase tracking-widest font-semibold">
              CORE CAPABILITIES & TECH STACK
            </span>
            <h3 className="text-2xl font-bold text-white tracking-tight mt-1">
              Teknologi & Infrastruktur
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {techCategories.map((cat, idx) => {
              const IconComp = cat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50, rotateY: idx % 2 === 0 ? -15 : 15 }}
                  whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.85, delay: idx * 0.14, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-[#121214] border border-white/10 rounded-2xl p-6 space-y-4 hover:border-white/25 transition-all transform-gpu shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl border ${cat.color}`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-white text-base">{cat.title}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs font-mono bg-white/5 border border-white/10 text-gray-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* 6. Project Showcase Carousel - 3D Depth Zoom */}
        <motion.section
          id="portfolio"
          initial={{ opacity: 0, scale: 0.92, rotateX: 8, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="pt-4 transform-gpu"
        >
          <ProjectShowcase testimonials={showcaseProjects} autoplay={true} />
        </motion.section>

        {/* 7. Direct Contact / CTA Banner - 3D Magnetic Wave */}
        <motion.section
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="bg-gradient-to-r from-sky-900/30 via-indigo-900/20 to-purple-900/30 border border-sky-500/20 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 transform-gpu shadow-2xl"
        >
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-mono text-sky-400 uppercase tracking-widest font-semibold">
              SIAP MEMULAI PROYEK ANDA?
            </span>
            <h3 className="text-2xl font-bold text-white">
              Konsultasi & Pemesanan Website
            </h3>
            <p className="text-sm text-gray-300 max-w-md">
              Diskusikan kebutuhan proyek Anda atau langsung gunakan form pemesanan dengan skema DP 50%.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleOpenOrderForm}
              className="px-6 py-3 rounded-xl bg-[#0078d4] hover:bg-sky-500 text-white font-bold text-sm shadow-lg shadow-sky-500/20 transition-all flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              Pesan Website Now
            </button>
            <a
              href="https://wa.me/6285693366142?text=Halo%20Haris%20Musafa,%20saya%20tertarik%20untuk%20diskusi%20proyek%20website"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold text-sm transition-all flex items-center gap-2"
            >
              <WhatsAppLogo className="w-4 h-4 text-emerald-400 fill-emerald-400" />
              Chat WhatsApp
            </a>
          </div>
        </motion.section>
      </div>
    </div>
  );
});
