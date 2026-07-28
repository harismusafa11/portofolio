"use client";

import React, { useEffect, useRef, useState, memo } from "react";
import { useWindowStore } from "@/store/windowStore";

export const Wallpaper: React.FC = memo(function Wallpaper() {
  const wallpaper = useWindowStore((state) => state.wallpaper);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeVideo, setActiveVideo] = useState<1 | 2>(1);

  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  const isVideoMode = wallpaper === "video-auto" || wallpaper === "video-aesthetic" || wallpaper === "video-aesthetic-2";
  const showVid1 = isVideoMode && (wallpaper === "video-aesthetic" || (wallpaper === "video-auto" && activeVideo === 1));
  const showVid2 = isVideoMode && (wallpaper === "video-aesthetic-2" || (wallpaper === "video-auto" && activeVideo === 2));

  // Auto-rotate video wallpaper every 15 seconds with smooth crossfade
  useEffect(() => {
    if (wallpaper !== "video-auto") return;

    const interval = setInterval(() => {
      setActiveVideo((prev) => (prev === 1 ? 2 : 1));
    }, 15000);

    return () => clearInterval(interval);
  }, [wallpaper]);

  // Pause hidden video element to free GPU memory and decoding resources
  useEffect(() => {
    if (!isVideoMode) return;
    if (showVid1) {
      video1Ref.current?.play().catch(() => {});
      video2Ref.current?.pause();
    } else if (showVid2) {
      video2Ref.current?.play().catch(() => {});
      video1Ref.current?.pause();
    }
  }, [showVid1, showVid2, isVideoMode]);

  // Subtle floating ambient particles effect (throttled ~30 FPS for ultra-low CPU load)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // Create 35 ambient floating dust particles
    const particles = Array.from({ length: 35 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.5,
      alpha: Math.random() * 0.5 + 0.2,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.4 - 0.1,
    }));

    let lastTime = 0;
    const render = (time: number) => {
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      // Frame throttle to ~30 FPS for particle depth without CPU strain
      if (time - lastTime >= 32) {
        lastTime = time;
        ctx.clearRect(0, 0, width, height);

        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;

          if (p.y < 0) p.y = height;
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
          ctx.fill();
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render(0);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Dynamic Dual-Video Smooth Crossfade Layer */}
      {isVideoMode && (
        <div className="w-full h-full relative overflow-hidden bg-black">
          {/* Video 1 (wallpaper.mp4) */}
          <div
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              showVid1 ? "opacity-85" : "opacity-0"
            }`}
          >
            <video
              ref={video1Ref}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-full object-cover transform-gpu pointer-events-none scale-[1.01]"
            >
              <source src="/wallpaper.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Video 2 (wallpaper2.mp4) */}
          <div
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              showVid2 ? "opacity-85" : "opacity-0"
            }`}
          >
            <video
              ref={video2Ref}
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-full object-cover transform-gpu pointer-events-none scale-[1.01]"
            >
              <source src="/wallpaper2.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Subtle Dark Glass Vignette Overlay for 100% Icon & Window Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50 backdrop-blur-[0.5px]" />
        </div>
      )}

      {/* 1. Deep Midnight Slate */}
      {wallpaper === "bloom-dark" && (
        <div className="w-full h-full bg-[#070b14] relative transition-all duration-700">
          <div
            className="absolute top-1/4 left-1/3 w-[900px] h-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[160px]"
            style={{ background: "radial-gradient(circle, rgba(14, 165, 233, 0.4) 0%, transparent 70%)" }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-[800px] h-[800px] translate-x-1/4 translate-y-1/4 rounded-full opacity-35 blur-[150px]"
            style={{ background: "radial-gradient(circle, rgba(99, 102, 241, 0.35) 0%, transparent 70%)" }}
          />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>
      )}

      {/* 2. Pearl Cloud Light */}
      {wallpaper === "bloom-light" && (
        <div className="w-full h-full bg-[#f8fafc] relative transition-all duration-700">
          <div
            className="absolute top-1/3 left-1/2 w-[1000px] h-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-[180px]"
            style={{ background: "radial-gradient(circle, rgba(186, 230, 253, 0.8) 0%, rgba(199, 210, 254, 0.4) 55%, transparent 80%)" }}
          />
          <div
            className="absolute bottom-10 left-10 w-[600px] h-[600px] rounded-full opacity-40 blur-[140px]"
            style={{ background: "radial-gradient(circle, rgba(224, 242, 254, 0.9) 0%, transparent 70%)" }}
          />
        </div>
      )}

      {/* 3. Sunset Glow Horizon */}
      {wallpaper === "sunset-glow" && (
        <div className="w-full h-full bg-[#0d0714] relative transition-all duration-700">
          <div
            className="absolute top-1/2 left-1/2 w-[950px] h-[950px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-45 blur-[170px]"
            style={{ background: "radial-gradient(circle, rgba(245, 158, 11, 0.45) 0%, rgba(236, 72, 153, 0.25) 50%, rgba(168, 85, 247, 0.1) 80%, transparent 90%)" }}
          />
          <div
            className="absolute bottom-0 right-0 w-[700px] h-[700px] rounded-full opacity-35 blur-[150px]"
            style={{ background: "radial-gradient(circle, rgba(244, 63, 94, 0.3) 0%, transparent 70%)" }}
          />
        </div>
      )}

      {/* 4. Emerald Forest Aurora */}
      {wallpaper === "emerald-forest" && (
        <div className="w-full h-full bg-[#03130d] relative transition-all duration-700">
          <div
            className="absolute top-1/2 left-1/2 w-[950px] h-[950px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-45 blur-[170px]"
            style={{ background: "radial-gradient(circle, rgba(16, 185, 129, 0.45) 0%, rgba(6, 182, 212, 0.25) 50%, rgba(20, 184, 166, 0.1) 80%, transparent 90%)" }}
          />
          <div
            className="absolute top-0 right-0 w-[650px] h-[650px] rounded-full opacity-30 blur-[130px]"
            style={{ background: "radial-gradient(circle, rgba(52, 211, 153, 0.3) 0%, transparent 70%)" }}
          />
        </div>
      )}

      {/* 5. Retro XP Bliss Classic */}
      {wallpaper === "retro-xp" && (
        <div className="w-full h-full bg-gradient-to-b from-[#245edb] via-[#3a83e6] to-[#4c9725] relative transition-all duration-700">
          <div className="absolute top-0 left-0 w-full h-[60%] bg-gradient-to-b from-[#1a49bd] to-[#5ba3f8] opacity-80" />
          <div className="absolute bottom-0 left-0 w-full h-[45%] bg-gradient-to-t from-[#2e7415] via-[#4fae23] to-transparent rounded-t-[100%] scale-x-125 transform-gpu" />
        </div>
      )}

      {/* 6. Cyberpunk Dark Tech Blueprint */}
      {wallpaper === "cyberpunk-blueprint" && (
        <div className="w-full h-full bg-[#050b14] relative transition-all duration-700">
          <div
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage: "linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-[850px] h-[850px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[150px]"
            style={{ background: "radial-gradient(circle, rgba(14, 165, 233, 0.4) 0%, rgba(99, 102, 241, 0.2) 60%, transparent 80%)" }}
          />
        </div>
      )}

      {/* Ambient Particle Canvas Overlay */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" />
    </div>
  );
});
