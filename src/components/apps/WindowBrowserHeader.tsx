"use client";

import React from "react";
import { Lock, RotateCw, ArrowLeft, ArrowRight, Share2, Globe } from "lucide-react";

interface WindowBrowserHeaderProps {
  url?: string;
  title?: string;
  onRefresh?: () => void;
}

export const WindowBrowserHeader: React.FC<WindowBrowserHeaderProps> = ({
  url = "https://harismusafa.dev/about-portfolio",
  title = "Haris Musafa — Developer Profile & Selected Works",
  onRefresh,
}) => {
  return (
    <div className="w-full bg-[#121214] border-b border-white/10 p-2.5 flex flex-col gap-2 select-none sticky top-0 z-40 backdrop-blur-xl">
      {/* Top Browser Control Bar */}
      <div className="flex items-center justify-between gap-3">
        {/* Left Navigation Buttons */}
        <div className="flex items-center gap-1 text-gray-400">
          <button className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors disabled:opacity-40" disabled title="Back">
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <button className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors disabled:opacity-40" disabled title="Forward">
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button onClick={onRefresh} className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors" title="Reload Page">
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Center Address Bar */}
        <div className="flex-1 max-w-xl bg-[#09090b] border border-white/10 hover:border-white/20 rounded-lg px-3 py-1 flex items-center gap-2 text-xs font-mono transition-colors group">
          <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
          <span className="text-emerald-400 font-semibold select-none">https://</span>
          <span className="text-gray-200 truncate select-all">{url.replace("https://", "")}</span>
          <span className="ml-auto text-[10px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-1.5 py-0.5 rounded font-mono shrink-0">
            SSL SECURE
          </span>
        </div>

        {/* Right Status Indicator */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-gray-400">
          <Globe className="w-3.5 h-3.5 text-sky-400" />
          <span className="text-gray-300">HTTP/3 200 OK</span>
        </div>
      </div>
    </div>
  );
};
