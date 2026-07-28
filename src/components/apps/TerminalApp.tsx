"use client";

import React, { useState, useRef, useEffect, memo } from "react";
import { TERMINAL_COMMANDS } from "@/data/commands";
import { SERVICES_DATA } from "@/data/services";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { Terminal as TerminalIcon, Code2, Monitor, ExternalLink } from "lucide-react";
import { useWindowStore } from "@/store/windowStore";

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

const MatrixCanvas: React.FC = memo(function MatrixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateSize = () => {
      if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };
    updateSize();

    const chars = "01010101ARJUNADEVHARISMUSAFA2026NEXTJSFLUTTERREACTTYPESCRIPT";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize) || 30;
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0f0";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 35);
    window.addEventListener("resize", updateSize);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block bg-black rounded-b-lg" />;
});

export const TerminalApp: React.FC = memo(function TerminalApp() {
  const openWindow = useWindowStore((state) => state.openWindow);
  const focusWindow = useWindowStore((state) => state.focusWindow);

  const [activeTab, setActiveTab] = useState<"cmd" | "powershell" | "matrix">("cmd");
  const [theme, setTheme] = useState<"dark" | "powershell" | "dracula">("dark");
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: "welcome",
      output: (
        <div className="text-emerald-400 mb-2 leading-relaxed">
          Microsoft Windows [Version 10.0.22631.3447]
          <br />
          (c) Microsoft Corporation. All rights reserved.
          <br />
          <br />
          <span className="text-sky-300">
            Selamat datang di Arjuna Dev Terminal OS! Ketik <code className="bg-white/10 px-1.5 py-0.5 rounded text-white font-bold">help</code> untuk melihat daftar perintah.
          </span>
        </div>
      ),
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, activeTab]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    setInputVal("");

    if (cmd === "clear") {
      setHistory([]);
      return;
    }

    if (cmd === "matrix") {
      setActiveTab("matrix");
      return;
    }

    if (cmd === "taskmgr" || cmd === "taskmanager") {
      openWindow("taskmanager");
      focusWindow("taskmanager");
    }

    if (cmd === "paint" || cmd === "draw") {
      openWindow("paint");
      focusWindow("paint");
    }

    let outputNode: React.ReactNode;

    switch (cmd) {
      case "help":
        outputNode = (
          <div className="space-y-1 my-1">
            <span className="text-sky-300 font-bold block">Available Commands:</span>
            {TERMINAL_COMMANDS.map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <span className="text-amber-300 font-bold w-32 shrink-0">{item.command}</span>
                <span className="text-gray-300">{item.description}</span>
              </div>
            ))}
          </div>
        );
        break;

      case "neofetch":
        outputNode = (
          <div className="p-3 rounded-lg bg-black/40 border border-sky-500/30 text-xs font-mono text-gray-200 flex flex-col sm:flex-row gap-4 my-2">
            <div className="text-sky-400 font-bold leading-tight select-none">
              {`       .----.       `}
              <br />
              {`      / A D  \\      `}
              <br />
              {`     | ARJUNA |     `}
              <br />
              {`      \\ DEV  /      `}
              <br />
              {`       '----'       `}
            </div>
            <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-white/10 pt-2 sm:pt-0 sm:pl-4">
              <div><span className="text-sky-300 font-bold">haris</span>@<span className="text-emerald-400 font-bold">arjuna-dev-os</span></div>
              <div className="text-gray-500">--------------------------</div>
              <div><span className="text-amber-300">OS:</span> Arjuna Dev OS 2.0 (Windows 11 Web Edition)</div>
              <div><span className="text-amber-300">Host:</span> Haris Musafa Portfolio Platform</div>
              <div><span className="text-amber-300">Kernel:</span> Next.js 14 App Router + React 18</div>
              <div><span className="text-amber-300">Uptime:</span> 99.9% (Continuous Delivery)</div>
              <div><span className="text-amber-300">Shell:</span> Arjuna CMD / PowerShell 7.4</div>
              <div><span className="text-amber-300">Memory:</span> 100/100 Lighthouse Performance</div>
            </div>
          </div>
        );
        break;

      case "sudo hire-me":
      case "hire-me":
        outputNode = (
          <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 my-2 space-y-2">
            <div className="font-bold text-white text-sm">Access Granted! Root privilege engaged.</div>
            <p className="text-xs">Terima kasih atas minat Anda bekerjasama dengan Haris Musafa (Arjuna Dev)!</p>
            <a
              href="https://wa.me/6285693366142?text=Halo%20Haris%20Musafa%20(Arjuna%20Dev),%20saya%20tertarik%20bekerjasama%20untuk%20proyek%20saya."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#25D366] text-black font-bold text-xs hover:bg-[#20ba5a] transition-colors"
            >
              <span>Langsung Chat via WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        );
        break;

      case "taskmgr":
      case "taskmanager":
        outputNode = (
          <div className="text-sky-300">Opening Task_Manager.exe...</div>
        );
        break;

      case "about":
        outputNode = (
          <div className="text-gray-200 space-y-1 my-1">
            <p className="text-sky-300 font-bold">Haris Musafa — Senior Fullstack Web & Mobile Developer (Arjuna Dev)</p>
            <p>Spesialisasi: Web Application (Next.js, React, Node.js) & Mobile Application (Flutter, React Native).</p>
            <p>Pengalaman: 4+ Tahun memproduksi aplikasi siap pakai untuk startup, corporate & UMKM.</p>
          </div>
        );
        break;

      case "skills":
        outputNode = (
          <div className="text-gray-200 space-y-1 my-1">
            <p className="text-sky-300 font-bold font-mono">Fullstack Competencies:</p>
            <p className="text-emerald-400">• Frontend: HTML5, CSS3, JavaScript (ES6+), React 18, Next.js (App Router), TypeScript, Tailwind CSS, Zustand, Framer Motion</p>
            <p className="text-sky-400">• Mobile: Flutter, React Native, iOS & Android Native SDKs</p>
            <p className="text-purple-400">• Backend & Database: PHP, Node.js, Express.js, PostgreSQL, Supabase, Firebase, REST/GraphQL</p>
          </div>
        );
        break;

      case "services":
        outputNode = (
          <div className="space-y-2 my-1">
            <span className="text-sky-300 font-bold block">Daftar Paket Jasa Arjuna Dev:</span>
            {SERVICES_DATA.map((s, idx) => (
              <div key={idx} className="p-2 rounded bg-white/5 border border-white/10 text-xs">
                <span className="text-amber-300 font-bold">[{s.title}]</span> - <span className="text-emerald-400">{s.price}</span>
                <p className="text-gray-300 text-[11px] mt-0.5">{s.subtitle} | Estimasi: {s.estimatedTime}</p>
              </div>
            ))}
          </div>
        );
        break;

      case "portfolio":
        outputNode = (
          <div className="space-y-2 my-1">
            <span className="text-sky-300 font-bold block">Featured Portfolio Projects:</span>
            {PORTFOLIO_DATA.map((p, idx) => (
              <div key={idx} className="p-2 rounded bg-white/5 border border-white/10 text-xs">
                <span className="text-emerald-400 font-bold">{idx + 1}. {p.title}</span> ({p.categoryLabel})
                <p className="text-gray-300 text-[11px]">{p.description}</p>
                <p className="text-sky-400 text-[10px] font-mono mt-0.5">Stack: {p.techStack.join(", ")}</p>
              </div>
            ))}
          </div>
        );
        break;

      case "contact":
        outputNode = (
          <div className="text-gray-200 space-y-1 my-1">
            <p className="text-emerald-400 font-bold">WhatsApp Business: 085693366142 (https://wa.me/6285693366142)</p>
            <p className="text-purple-400 font-bold">Instagram Official: @haris_musafa_ (https://instagram.com/haris_musafa_)</p>
          </div>
        );
        break;

      case "date":
        outputNode = <div className="text-sky-300">{new Date().toString()}</div>;
        break;

      default:
        outputNode = (
          <div className="text-red-400">
            Perintah &apos;{cmd}&apos; tidak dikenali. Ketik <code className="text-white font-bold">help</code> untuk melihat daftar perintah.
          </div>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: cmd, output: outputNode }]);
  };

  const themeClasses = {
    dark: "bg-[#0c0c0c] text-gray-200",
    powershell: "bg-[#012456] text-white",
    dracula: "bg-[#282a36] text-[#f8f8f2]",
  };

  return (
    <div className={`w-full h-full flex flex-col justify-between overflow-hidden rounded-b-lg font-mono text-xs select-text ${themeClasses[theme]}`}>
      {/* Tab & Theme Header */}
      <div className="px-3 py-2 bg-black/40 border-b border-white/10 flex items-center justify-between gap-2 shrink-0 overflow-x-auto custom-scrollbar no-scrollbar whitespace-nowrap">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab("cmd")}
            className={`px-3 py-1 rounded text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === "cmd" ? "bg-white/20 text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>CMD</span>
          </button>

          <button
            onClick={() => setActiveTab("powershell")}
            className={`px-3 py-1 rounded text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === "powershell" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>PowerShell</span>
          </button>

          <button
            onClick={() => setActiveTab("matrix")}
            className={`px-3 py-1 rounded text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === "matrix" ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20" : "text-gray-400 hover:text-white"
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Matrix Rain</span>
          </button>
        </div>

        {/* Theme Picker */}
        <div className="flex items-center gap-1 text-[10px]">
          <button onClick={() => setTheme("dark")} className="px-2 py-0.5 rounded bg-black/50 hover:bg-black text-white cursor-pointer">Dark</button>
          <button onClick={() => setTheme("powershell")} className="px-2 py-0.5 rounded bg-blue-900 hover:bg-blue-800 text-white cursor-pointer">Blue</button>
          <button onClick={() => setTheme("dracula")} className="px-2 py-0.5 rounded bg-purple-900 hover:bg-purple-800 text-white cursor-pointer">Dracula</button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden relative" onClick={() => inputRef.current?.focus()}>
        {activeTab === "matrix" ? (
          <div className="absolute inset-0 w-full h-full">
            <MatrixCanvas />
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] text-emerald-400 border border-emerald-500/30 font-mono">
              Matrix Rain Code Active. Switch tab to CMD to return.
            </div>
          </div>
        ) : (
          <div className="p-4 h-full overflow-y-auto custom-scrollbar space-y-3">
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1">
                {item.command !== "welcome" && (
                  <div className="flex items-center gap-2 text-sky-400 font-bold">
                    <span>
                      {activeTab === "powershell" ? "PS C:\\Users\\HarisMusafa>" : "C:\\Users\\Visitor\\ArjunaDev>"}
                    </span>
                    <span className="text-white">{item.command}</span>
                  </div>
                )}
                <div>{item.output}</div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Input Line */}
      {activeTab !== "matrix" && (
        <form onSubmit={handleCommand} className="flex items-center gap-2 p-3 bg-black/30 border-t border-white/10 shrink-0">
          <span className="text-sky-400 font-bold shrink-0">
            {activeTab === "powershell" ? "PS C:\\Users\\HarisMusafa>" : "C:\\Users\\Visitor\\ArjunaDev>"}
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none"
            placeholder="type a command (help, about, skills, services, portfolio, matrix, contact)..."
            autoFocus
          />
        </form>
      )}
    </div>
  );
});
