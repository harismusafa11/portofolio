"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HalomotButton } from "./halomot-button";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

export type ShowcaseProject = {
  quote: string;
  name: string;
  designation: string;
  src: string;
  link: string;
  highlights?: string;
  techStack?: string[];
};

export type ProjectShowcaseProps = {
  testimonials: ShowcaseProject[];
  autoplay?: boolean;
  onItemClick?: (link: string) => void;
};

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  testimonials,
  autoplay = false,
  onItemClick,
}) => {
  const [active, setActive] = useState(0);
  const componentRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 6000);
      return () => clearInterval(interval);
    }
  }, [autoplay, testimonials.length]);

  const currentProject = testimonials[active];

  const handleOpenLink = (link: string) => {
    if (onItemClick) {
      onItemClick(link);
    } else if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      ref={componentRef}
      className="w-full mx-auto font-sans p-6 md:p-8 bg-[#0d0d0e] border border-white/10 rounded-2xl text-white shadow-2xl"
    >
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-mono text-sky-400 uppercase tracking-widest font-semibold">
            SELECTED WORKS & PROOF OF WORK
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-white mt-1">
            Featured Web Projects ({testimonials.length})
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-colors"
            title="Previous Project"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono text-gray-400 px-2">
            {active + 1} / {testimonials.length}
          </span>
          <button
            onClick={handleNext}
            className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-colors"
            title="Next Project"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: Project Image Display */}
        <div className="relative h-[280px] md:h-[360px] w-full rounded-xl overflow-hidden border border-white/15 bg-slate-900/50 shadow-inner group">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.src}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <img
                src={currentProject.src}
                alt={currentProject.name}
                className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = `https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80`;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0e] via-transparent to-transparent opacity-80" />
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/20 backdrop-blur-md px-3 py-1 rounded-md border border-emerald-500/30">
              {currentProject.highlights || "Live Web Application"}
            </span>
          </div>
        </div>

        {/* Right: Project Details */}
        <div className="flex flex-col justify-between h-full space-y-6">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div>
              <span className="text-xs font-mono text-sky-400 font-semibold tracking-wider uppercase">
                {currentProject.designation}
              </span>
              <h3 className="text-2xl font-bold text-white mt-1 leading-snug">
                {currentProject.name}
              </h3>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed">
              {currentProject.quote}
            </p>

            {currentProject.techStack && currentProject.techStack.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {currentProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono bg-white/5 border border-white/10 text-gray-300 px-2.5 py-1 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </motion.div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
            <HalomotButton
              inscription="Previous"
              onClick={handlePrev}
              fixedWidth="100px"
              backgroundColor="#1a1a1d"
              textColor="#aaa"
              hoverTextColor="#fff"
            />
            <HalomotButton
              inscription="Next"
              onClick={handleNext}
              fixedWidth="100px"
              backgroundColor="#1a1a1d"
              textColor="#aaa"
              hoverTextColor="#fff"
            />
            <HalomotButton
              inscription="Kunjungi Website ↗"
              onClick={() => handleOpenLink(currentProject.link)}
              fillWidth
              gradient="linear-gradient(135deg, #0078d4, #38bdf8, #10b981)"
              backgroundColor="#0078d4"
              textColor="#ffffff"
              hoverTextColor="#ffffff"
              icon={<ExternalLink className="w-4 h-4" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
