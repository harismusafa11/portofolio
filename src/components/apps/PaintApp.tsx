"use client";

import React, { useRef, useState, useEffect, useCallback, memo } from "react";
import {
  Brush,
  Eraser,
  Square,
  Circle as CircleIcon,
  Minus,
  Type,
  Stamp,
  Pipette,
  Hand,
  Move,
  Undo,
  Redo,
  Trash2,
  Download,
  Copy,
  FileJson,
  Upload,
  Monitor,
  Smartphone,
  Check,
  X,
  AlertTriangle,
  Maximize2,
  Minimize2,
  RotateCcw,
} from "lucide-react";
import { WhatsAppLogo } from "@/components/icons/BrandIcons";

type BgTemplate = "blueprint" | "cyberpunk" | "dark" | "light";
type Tool = "brush" | "eraser" | "rect" | "circle" | "line" | "text" | "stamp" | "eyedropper" | "hand" | "move";
type GuideFrame = "none" | "desktop" | "mobile";

interface UIStamp {
  id: string;
  name: string;
  w: number;
  h: number;
  label: string;
}

const UI_STAMPS: UIStamp[] = [
  { id: "header", name: "Header Bar", w: 320, h: 42, label: "📱 Navigation Header (Logo | Menu | CTA)" },
  { id: "hero", name: "Hero Banner", w: 320, h: 120, label: "🖼️ Hero Banner (Headline + Subtitle + CTA)" },
  { id: "card", name: "Product Card", w: 160, h: 140, label: "💳 Card Produk / Feature Box" },
  { id: "form", name: "Contact Form", w: 220, h: 150, label: "✉️ Form Input (Nama | Email | Pesan)" },
  { id: "cta", name: "WA CTA Button", w: 180, h: 40, label: "🟢 Tombol Konsultasi WhatsApp" },
];

export const PaintApp: React.FC = memo(function PaintApp() {
  const drawingCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const bgCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<Tool>("brush");
  const [color, setColor] = useState<string>("#38bdf8");
  const [brushSize, setBrushSize] = useState<number>(4);
  const [bgTemplate, setBgTemplate] = useState<BgTemplate>("blueprint");
  const [guideFrame, setGuideFrame] = useState<GuideFrame>("none");
  const [selectedStamp, setSelectedStamp] = useState<UIStamp>(UI_STAMPS[0]);

  // Mobile Full Canvas Viewport Mode
  const [isFullCanvasMobile, setIsFullCanvasMobile] = useState<boolean>(false);

  // Hand Pan Motion Offset & State
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [panStart, setPanStart] = useState<{ x: number; y: number } | null>(null);
  const [isSpacePressed, setIsSpacePressed] = useState<boolean>(false);

  // Move Tool Motion Snapshot
  const [moveStart, setMoveStart] = useState<{ x: number; y: number } | null>(null);
  const [moveSnapshot, setMoveSnapshot] = useState<ImageData | null>(null);

  // History Stack for Undo/Redo
  const [history, setHistory] = useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  // Drag start point for shapes
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const [tempSnapshot, setTempSnapshot] = useState<ImageData | null>(null);

  // Text input state
  const [textInput, setTextInput] = useState<string>("");
  const [textPos, setTextPos] = useState<{ x: number; y: number } | null>(null);
  const [showTextInputModal, setShowTextInputModal] = useState<boolean>(false);

  // UI Toast & Clear Modal
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showClearModal, setShowClearModal] = useState<boolean>(false);

  const colors = [
    { name: "Sky Blue", hex: "#38bdf8" },
    { name: "Emerald Green", hex: "#34d399" },
    { name: "Amber Gold", hex: "#fbbf24" },
    { name: "Purple Neon", hex: "#c084fc" },
    { name: "Rose Red", hex: "#f43f5e" },
    { name: "Pure White", hex: "#ffffff" },
  ];

  const brushSizes = [
    { label: "Halus (2px)", size: 2 },
    { label: "Sedang (5px)", size: 5 },
    { label: "Tebal (10px)", size: 10 },
  ];

  // Custom Cursors
  const pencilCursor = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2338bdf8' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><path d='M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z'/><path d='m15 5 4 4'/></svg>") 0 24, crosshair`;
  const eraserCursor = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23f43f5e' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><path d='m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21'/><path d='M22 21H7'/><path d='m5 11 9 9'/></svg>") 2 22, pointer`;
  const eyedropperCursor = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23fbbf24' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><path d='m2 22 1-1h3l9-9'/><path d='M14 6l4 4'/><path d='m17 3 4 4'/></svg>") 2 22, copy`;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Keyboard Spacebar listener for temporary Hand Motion mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !showTextInputModal && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        setIsSpacePressed(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        setIsSpacePressed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [showTextInputModal]);

  // Render Background Grid Layer & Wireframe Guide
  const renderBackgroundLayer = useCallback(
    (type: BgTemplate, guide: GuideFrame) => {
      const bgCanvas = bgCanvasRef.current;
      if (!bgCanvas) return;
      const ctx = bgCanvas.getContext("2d");
      if (!ctx) return;

      const width = bgCanvas.width;
      const height = bgCanvas.height;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Grid Theme Background
      if (type === "blueprint") {
        ctx.fillStyle = "#0a0f1d";
        ctx.fillRect(0, 0, width, height);

        ctx.strokeStyle = "rgba(56, 189, 248, 0.12)";
        ctx.lineWidth = 1;
        const gridSize = 24;
        for (let x = 0; x < width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      } else if (type === "cyberpunk") {
        ctx.fillStyle = "#05060a";
        ctx.fillRect(0, 0, width, height);

        ctx.strokeStyle = "rgba(168, 85, 247, 0.15)";
        ctx.lineWidth = 1;
        const gridSize = 32;
        for (let x = 0; x < width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      } else if (type === "dark") {
        ctx.fillStyle = "#12151e";
        ctx.fillRect(0, 0, width, height);

        ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
        ctx.lineWidth = 1;
        const gridSize = 28;
        for (let x = 0; x < width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      } else {
        // Light Paper
        ctx.fillStyle = "#f8fafc";
        ctx.fillRect(0, 0, width, height);

        ctx.strokeStyle = "rgba(148, 163, 184, 0.25)";
        ctx.lineWidth = 1;
        const gridSize = 24;
        for (let x = 0; x < width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      }

      // 2. Draw Wireframe Screen Guide Overlay if enabled
      if (guide === "desktop") {
        const frameW = Math.min(width - 60, 680);
        const frameH = Math.min(height - 40, 380);
        const fx = (width - frameW) / 2;
        const fy = (height - frameH) / 2;

        ctx.strokeStyle = "rgba(56, 189, 248, 0.35)";
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 4]);
        ctx.strokeRect(fx, fy, frameW, frameH);
        ctx.setLineDash([]);

        ctx.fillStyle = "rgba(56, 189, 248, 0.4)";
        ctx.font = "bold 10px monospace";
        ctx.fillText("🖥️ DESKTOP SCREEN GUIDE (16:9)", fx + 8, fy - 6);
      } else if (guide === "mobile") {
        const frameW = 200;
        const frameH = Math.min(height - 30, 390);
        const fx = (width - frameW) / 2;
        const fy = (height - frameH) / 2;

        ctx.strokeStyle = "rgba(52, 211, 153, 0.4)";
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.roundRect(fx, fy, frameW, frameH, 24);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = "rgba(52, 211, 153, 0.5)";
        ctx.font = "bold 10px monospace";
        ctx.fillText("📱 MOBILE APP GUIDE", fx - 10, fy - 6);
      }
    },
    []
  );

  // Resize & Maximize handler with high-precision scaling
  const handleResize = useCallback(() => {
    const drawingCanvas = drawingCanvasRef.current;
    const bgCanvas = bgCanvasRef.current;
    const container = containerRef.current;
    if (!drawingCanvas || !bgCanvas || !container) return;

    const newW = container.clientWidth || 800;
    const newH = Math.max(380, container.clientHeight || 450);

    if (drawingCanvas.width === newW && drawingCanvas.height === newH) return;

    // Save existing drawing strokes to temp offscreen canvas
    let tempCanvas: HTMLCanvasElement | null = null;
    if (drawingCanvas.width > 0 && drawingCanvas.height > 0) {
      tempCanvas = document.createElement("canvas");
      tempCanvas.width = drawingCanvas.width;
      tempCanvas.height = drawingCanvas.height;
      const tempCtx = tempCanvas.getContext("2d");
      if (tempCtx) {
        tempCtx.drawImage(drawingCanvas, 0, 0);
      }
    }

    drawingCanvas.width = newW;
    drawingCanvas.height = newH;
    bgCanvas.width = newW;
    bgCanvas.height = newH;

    renderBackgroundLayer(bgTemplate, guideFrame);

    if (tempCanvas) {
      const drawCtx = drawingCanvas.getContext("2d");
      if (drawCtx) {
        drawCtx.drawImage(tempCanvas, 0, 0);
      }
    }
  }, [bgTemplate, guideFrame, renderBackgroundLayer]);

  useEffect(() => {
    handleResize();
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, [handleResize]);

  useEffect(() => {
    renderBackgroundLayer(bgTemplate, guideFrame);
  }, [bgTemplate, guideFrame, renderBackgroundLayer]);

  // Save current canvas state to history stack
  const saveState = useCallback(() => {
    const canvas = drawingCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const state = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prevHistory) => {
      const newHistory = prevHistory.slice(0, historyIndex + 1);
      return [...newHistory, state];
    });
    setHistoryIndex((prevIndex) => prevIndex + 1);
  }, [historyIndex]);

  // Push initial blank state on canvas load/resize if history is empty
  useEffect(() => {
    const canvas = drawingCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (history.length === 0) {
      const initialState = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setHistory([initialState]);
      setHistoryIndex(0);
    }
  }, [history.length]);

  const handleUndo = () => {
    if (historyIndex <= 0) return;

    const canvas = drawingCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const targetIndex = historyIndex - 1;
    const state = history[targetIndex];
    if (state) {
      ctx.putImageData(state, 0, 0);
      setHistoryIndex(targetIndex);
    }
  };

  const handleRedo = () => {
    if (historyIndex >= history.length - 1) return;

    const canvas = drawingCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const targetIndex = historyIndex + 1;
    const state = history[targetIndex];
    if (state) {
      ctx.putImageData(state, 0, 0);
      setHistoryIndex(targetIndex);
    }
  };

  // Coords scaling calculation with panOffset accounting for Hand Motion & Fullscreen
  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = drawingCanvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    const scaleX = canvas.width / (rect.width || 1);
    const scaleY = canvas.height / (rect.height || 1);

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  // Eyedropper Color Sampler
  const sampleColor = (x: number, y: number) => {
    const drawingCanvas = drawingCanvasRef.current;
    const bgCanvas = bgCanvasRef.current;
    if (!drawingCanvas || !bgCanvas) return;

    const drawCtx = drawingCanvas.getContext("2d");
    if (drawCtx) {
      const pixel = drawCtx.getImageData(Math.round(x), Math.round(y), 1, 1).data;
      if (pixel[3] > 0) {
        const hex = `#${((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).slice(1)}`;
        setColor(hex);
        setTool("brush");
        showToast(`Warna disalin: ${hex}`);
        return;
      }
    }

    const bgCtx = bgCanvas.getContext("2d");
    if (bgCtx) {
      const pixel = bgCtx.getImageData(Math.round(x), Math.round(y), 1, 1).data;
      const hex = `#${((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).slice(1)}`;
      setColor(hex);
      setTool("brush");
      showToast(`Warna disalin: ${hex}`);
    }
  };

  // Place UI Component Stamp
  const drawStamp = (ctx: CanvasRenderingContext2D, stamp: UIStamp, x: number, y: number) => {
    const sx = x - stamp.w / 2;
    const sy = y - stamp.h / 2;

    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(18, 24, 38, 0.85)";
    ctx.strokeStyle = color;
    ctx.lineWidth = Math.max(2, brushSize);

    ctx.beginPath();
    ctx.roundRect(sx, sy, stamp.w, stamp.h, 10);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.font = "bold 11px sans-serif";
    ctx.fillText(stamp.label, sx + 12, sy + stamp.h / 2 + 4);
    saveState();
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if ("touches" in e) e.preventDefault();

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    // Hand Motion / Spacebar Pan mode
    if (tool === "hand" || isSpacePressed) {
      setPanStart({ x: clientX - panOffset.x, y: clientY - panOffset.y });
      setIsDrawing(true);
      return;
    }

    const coords = getCanvasCoords(e);

    // Move Motion tool mode
    if (tool === "move") {
      const canvas = drawingCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      setMoveStart(coords);
      setMoveSnapshot(ctx.getImageData(0, 0, canvas.width, canvas.height));
      setIsDrawing(true);
      return;
    }

    // Eyedropper tool mode
    if (tool === "eyedropper") {
      sampleColor(coords.x, coords.y);
      return;
    }

    // Text tool mode
    if (tool === "text") {
      setTextPos(coords);
      setShowTextInputModal(true);
      return;
    }

    const canvas = drawingCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Stamp tool mode
    if (tool === "stamp") {
      drawStamp(ctx, selectedStamp, coords.x, coords.y);
      return;
    }

    // Shape / Brush tool modes
    setIsDrawing(true);
    setStartPos(coords);

    if (tool === "rect" || tool === "circle" || tool === "line") {
      setTempSnapshot(ctx.getImageData(0, 0, canvas.width, canvas.height));
    } else {
      ctx.beginPath();
      ctx.moveTo(coords.x, coords.y);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    if ("touches" in e) e.preventDefault();

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    // Hand Motion Pan drag update
    if ((tool === "hand" || isSpacePressed) && panStart) {
      setPanOffset({
        x: clientX - panStart.x,
        y: clientY - panStart.y,
      });
      return;
    }

    const canvas = drawingCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const coords = getCanvasCoords(e);

    // Move Motion drag update
    if (tool === "move" && moveStart && moveSnapshot) {
      const dx = coords.x - moveStart.x;
      const dy = coords.y - moveStart.y;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.putImageData(moveSnapshot, dx, dy);
      return;
    }

    if (!startPos) return;

    if (tool === "rect" || tool === "circle" || tool === "line") {
      if (tempSnapshot) {
        ctx.putImageData(tempSnapshot, 0, 0);
      }

      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      ctx.beginPath();

      if (tool === "rect") {
        const w = coords.x - startPos.x;
        const h = coords.y - startPos.y;
        ctx.strokeRect(startPos.x, startPos.y, w, h);
      } else if (tool === "circle") {
        const rx = Math.abs(coords.x - startPos.x) / 2;
        const ry = Math.abs(coords.y - startPos.y) / 2;
        const cx = Math.min(startPos.x, coords.x) + rx;
        const cy = Math.min(startPos.y, coords.y) + ry;
        ctx.ellipse(cx, cy, rx, ry, 0, 0, 2 * Math.PI);
        ctx.stroke();
      } else if (tool === "line") {
        ctx.moveTo(startPos.x, startPos.y);
        ctx.lineTo(coords.x, coords.y);
        ctx.stroke();
      }
    } else if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = brushSize * 4;
      ctx.strokeStyle = "rgba(0,0,0,1)";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    } else if (tool === "brush") {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    if (isDrawing) {
      if (tool === "move" && moveStart) {
        setMoveStart(null);
        setMoveSnapshot(null);
        saveState();
      } else if (tool !== "hand" && !isSpacePressed) {
        saveState();
      }
      setIsDrawing(false);
      setStartPos(null);
      setTempSnapshot(null);
      setPanStart(null);
    }
  };

  // Add text to canvas
  const handleAddText = () => {
    if (!textInput.trim() || !textPos) return;

    saveState();
    const canvas = drawingCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = color;
    ctx.font = `bold ${Math.max(13, brushSize * 3)}px sans-serif`;
    ctx.fillText(textInput, textPos.x, textPos.y);

    setTextInput("");
    setShowTextInputModal(false);
    showToast("Teks berhasil ditambahkan!");
  };

  const handleConfirmClear = () => {
    saveState();
    const canvas = drawingCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setShowClearModal(false);
    showToast("Kanvas telah dibersihkan!");
  };

  // 1-Click Copy Image to Clipboard
  const handleCopyClipboard = async () => {
    const drawingCanvas = drawingCanvasRef.current;
    const bgCanvas = bgCanvasRef.current;
    if (!drawingCanvas || !bgCanvas) return;

    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = drawingCanvas.width;
    exportCanvas.height = drawingCanvas.height;
    const ctx = exportCanvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(bgCanvas, 0, 0);
    ctx.drawImage(drawingCanvas, 0, 0);

    exportCanvas.toBlob(async (blob) => {
      if (!blob) return;
      try {
        await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
        showToast("Gambar sketsa berhasil disalin ke Clipboard! (Siap Ctrl+V di WA)");
      } catch (err) {
        showToast("Gagal menyalin otomatis. Gunakan tombol Unduh PNG.");
      }
    });
  };

  // Download Watermarked PNG
  const handleDownload = () => {
    const drawingCanvas = drawingCanvasRef.current;
    const bgCanvas = bgCanvasRef.current;
    if (!drawingCanvas || !bgCanvas) return;

    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = drawingCanvas.width;
    exportCanvas.height = drawingCanvas.height;
    const ctx = exportCanvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(bgCanvas, 0, 0);
    ctx.drawImage(drawingCanvas, 0, 0);

    const pad = 12;
    const bannerW = 240;
    const bannerH = 32;
    const x = exportCanvas.width - bannerW - pad;
    const y = exportCanvas.height - bannerH - pad;

    ctx.fillStyle = "rgba(10, 15, 29, 0.85)";
    ctx.strokeStyle = "rgba(56, 189, 248, 0.3)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(x, y, bannerW, bannerH, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 11px sans-serif";
    ctx.fillText("Arjuna Dev — Project Sketch", x + 14, y + 20);

    const link = document.createElement("a");
    link.download = `arjuna-dev-sketch-${Date.now()}.png`;
    link.href = exportCanvas.toDataURL("image/png");
    link.click();
    showToast("Gambar PNG berhasil diunduh!");
  };

  // Export Draft JSON
  const handleExportJSON = () => {
    const canvas = drawingCanvasRef.current;
    if (!canvas) return;

    const data = {
      version: "1.0",
      timestamp: Date.now(),
      bgTemplate,
      guideFrame,
      dataUrl: canvas.toDataURL("image/png"),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.download = `arjuna-sketch-draft-${Date.now()}.json`;
    link.href = URL.createObjectURL(blob);
    link.click();
    showToast("Draf file JSON berhasil diekspor!");
  };

  // Import Draft JSON
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.bgTemplate) setBgTemplate(data.bgTemplate);
        if (data.guideFrame) setGuideFrame(data.guideFrame);

        if (data.dataUrl) {
          const img = new Image();
          img.onload = () => {
            saveState();
            const canvas = drawingCanvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            showToast("Draf file JSON berhasil dimuat!");
          };
          img.src = data.dataUrl;
        }
      } catch (err) {
        showToast("Format file JSON draf tidak valid!");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col h-full gap-2 font-sans select-none text-gray-200 pb-2 overflow-hidden relative">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl bg-sky-600/90 text-white text-xs font-bold shadow-2xl border border-sky-400/40 animate-in fade-in slide-in-from-top-3 flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Toolbar Level 1: Draw Tools, Hand Motion, Move Motion, Shapes, Stamps & Palette */}
      {!isFullCanvasMobile && (
        <div className="p-2 rounded-xl bg-[#161922] border border-white/10 flex items-center justify-between gap-2 shrink-0 text-xs shadow-sm overflow-x-auto custom-scrollbar">
          {/* Left: Tools Picker */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Main Drawing Tools */}
            <div className="p-0.5 rounded-lg bg-black/50 border border-white/10 flex items-center gap-0.5">
              <button
                onClick={() => setTool("brush")}
                className={`px-2.5 py-1 rounded-md flex items-center gap-1 transition-all text-xs cursor-pointer ${
                  tool === "brush" ? "bg-sky-600 text-white font-bold shadow" : "text-gray-400 hover:text-white"
                }`}
                title="Kuas Pensil Freehand"
              >
                <Brush className="w-3.5 h-3.5" />
                <span>Pensil</span>
              </button>

              <button
                onClick={() => setTool("eraser")}
                className={`px-2.5 py-1 rounded-md flex items-center gap-1 transition-all text-xs cursor-pointer ${
                  tool === "eraser" ? "bg-amber-600 text-white font-bold shadow" : "text-gray-400 hover:text-white"
                }`}
                title="Penghapus Clean Eraser"
              >
                <Eraser className="w-3.5 h-3.5" />
                <span>Eraser</span>
              </button>
            </div>

            {/* Hand Motion & Move Motion Tools */}
            <div className="p-0.5 rounded-lg bg-black/50 border border-white/10 flex items-center gap-0.5">
              <button
                onClick={() => setTool("hand")}
                className={`px-2.5 py-1 rounded-md flex items-center gap-1 transition-all text-xs cursor-pointer ${
                  tool === "hand" || isSpacePressed ? "bg-emerald-600 text-white font-bold shadow" : "text-gray-400 hover:text-white"
                }`}
                title="Hand Motion Tool (Geser Kanvas Viewport) — Tahan Spacebar"
              >
                <Hand className="w-3.5 h-3.5" />
                <span>Hand Pan</span>
              </button>

              <button
                onClick={() => setTool("move")}
                className={`px-2.5 py-1 rounded-md flex items-center gap-1 transition-all text-xs cursor-pointer ${
                  tool === "move" ? "bg-indigo-600 text-white font-bold shadow" : "text-gray-400 hover:text-white"
                }`}
                title="Move Motion Tool (Pindah Posisi Objek Gambar)"
              >
                <Move className="w-3.5 h-3.5" />
                <span>Move</span>
              </button>
            </div>

            {/* Wireframe Shapes Switcher */}
            <div className="p-0.5 rounded-lg bg-black/50 border border-white/10 flex items-center gap-0.5">
              <button
                onClick={() => setTool("rect")}
                className={`p-1.5 rounded-md transition-all cursor-pointer ${
                  tool === "rect" ? "bg-sky-600 text-white font-bold shadow" : "text-gray-400 hover:text-white"
                }`}
                title="Bentuk Kotak (Rectangle)"
              >
                <Square className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setTool("circle")}
                className={`p-1.5 rounded-md transition-all cursor-pointer ${
                  tool === "circle" ? "bg-sky-600 text-white font-bold shadow" : "text-gray-400 hover:text-white"
                }`}
                title="Bentuk Lingkaran (Circle)"
              >
                <CircleIcon className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setTool("line")}
                className={`p-1.5 rounded-md transition-all cursor-pointer ${
                  tool === "line" ? "bg-sky-600 text-white font-bold shadow" : "text-gray-400 hover:text-white"
                }`}
                title="Garis Lurus (Straight Line)"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setTool("text")}
                className={`p-1.5 rounded-md transition-all cursor-pointer ${
                  tool === "text" ? "bg-sky-600 text-white font-bold shadow" : "text-gray-400 hover:text-white"
                }`}
                title="Tulis Teks Catatan"
              >
                <Type className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setTool("eyedropper")}
                className={`p-1.5 rounded-md transition-all cursor-pointer ${
                  tool === "eyedropper" ? "bg-amber-500 text-black font-bold shadow" : "text-gray-400 hover:text-white"
                }`}
                title="Pipet Pengambil Warna (Eyedropper)"
              >
                <Pipette className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* UI Stamps Dropdown */}
            <div className="flex items-center gap-1 bg-black/50 border border-white/10 p-0.5 rounded-lg">
              <button
                onClick={() => setTool("stamp")}
                className={`px-2 py-1 rounded-md flex items-center gap-1 transition-all text-xs cursor-pointer ${
                  tool === "stamp" ? "bg-emerald-600 text-white font-bold shadow" : "text-gray-400 hover:text-white"
                }`}
                title="Tempel UI Block Stamp"
              >
                <Stamp className="w-3.5 h-3.5" />
                <span>Stamp</span>
              </button>
              <select
                value={selectedStamp.id}
                onChange={(e) => {
                  const found = UI_STAMPS.find((s) => s.id === e.target.value);
                  if (found) {
                    setSelectedStamp(found);
                    setTool("stamp");
                  }
                }}
                className="bg-transparent text-[11px] text-gray-200 focus:outline-none cursor-pointer pr-1"
              >
                {UI_STAMPS.map((s) => (
                  <option key={s.id} value={s.id} className="bg-[#121622] text-gray-200">
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="h-4 w-[1px] bg-white/10" />

            {/* Color Palette */}
            <div className="flex items-center gap-1.5">
              {colors.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => {
                    setColor(c.hex);
                    if (tool === "eraser") setTool("brush");
                  }}
                  style={{ backgroundColor: c.hex }}
                  className={`w-5 h-5 rounded-full border transition-all cursor-pointer ${
                    color === c.hex && tool !== "eraser" ? "scale-125 border-white ring-2 ring-sky-400 shadow-md" : "border-black/30 hover:scale-110 opacity-90"
                  }`}
                  title={c.name}
                />
              ))}
            </div>

            <div className="h-4 w-[1px] bg-white/10" />

            {/* Brush Sizes */}
            <div className="flex items-center gap-1">
              {brushSizes.map((b) => (
                <button
                  key={b.size}
                  onClick={() => setBrushSize(b.size)}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                    brushSize === b.size ? "bg-white/20 text-white font-bold shadow-sm" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Theme, Guide, History & Export Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Guide Overlay Selector */}
            <div className="p-0.5 rounded-lg bg-black/50 border border-white/10 flex items-center text-[11px]">
              <button
                onClick={() => setGuideFrame("none")}
                className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                  guideFrame === "none" ? "bg-white/20 text-white font-bold" : "text-gray-400 hover:text-white"
                }`}
                title="Tanpa Guide Frame"
              >
                Full
              </button>
              <button
                onClick={() => setGuideFrame("desktop")}
                className={`px-2 py-0.5 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                  guideFrame === "desktop" ? "bg-sky-600 text-white font-bold" : "text-gray-400 hover:text-white"
                }`}
                title="Guide Frame Desktop 16:9"
              >
                <Monitor className="w-3 h-3" />
                <span>Desktop</span>
              </button>
              <button
                onClick={() => setGuideFrame("mobile")}
                className={`px-2 py-0.5 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                  guideFrame === "mobile" ? "bg-emerald-600 text-white font-bold" : "text-gray-400 hover:text-white"
                }`}
                title="Guide Frame Mobile App"
              >
                <Smartphone className="w-3 h-3" />
                <span>Mobile</span>
              </button>
            </div>

            {/* Theme Selector */}
            <div className="p-0.5 rounded-lg bg-black/50 border border-white/10 flex items-center text-[11px]">
              <button
                onClick={() => setBgTemplate("blueprint")}
                className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                  bgTemplate === "blueprint" ? "bg-sky-900/70 text-sky-300 font-bold border border-sky-500/30" : "text-gray-400 hover:text-white"
                }`}
              >
                Blueprint
              </button>
              <button
                onClick={() => setBgTemplate("cyberpunk")}
                className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                  bgTemplate === "cyberpunk" ? "bg-purple-950/70 text-purple-300 font-bold border border-purple-500/30" : "text-gray-400 hover:text-white"
                }`}
              >
                Cyber
              </button>
              <button
                onClick={() => setBgTemplate("dark")}
                className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                  bgTemplate === "dark" ? "bg-white/20 text-white font-bold" : "text-gray-400 hover:text-white"
                }`}
              >
                Dark
              </button>
              <button
                onClick={() => setBgTemplate("light")}
                className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                  bgTemplate === "light" ? "bg-slate-200 text-slate-900 font-bold" : "text-gray-400 hover:text-white"
                }`}
              >
                Light
              </button>
            </div>

            {/* Undo / Redo */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleUndo}
                disabled={historyIndex <= 0}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 disabled:opacity-30 text-gray-300 transition-colors cursor-pointer"
                title="Undo (Kembalikan)"
              >
                <Undo className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleRedo}
                disabled={historyIndex >= history.length - 1}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 disabled:opacity-30 text-gray-300 transition-colors cursor-pointer"
                title="Redo (Ulangi)"
              >
                <Redo className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={() => setShowClearModal(true)}
              className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
              title="Bersihkan Kanvas"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>

            {/* Export / Import & Copy Options */}
            <button
              onClick={handleCopyClipboard}
              className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 transition-all shadow cursor-pointer"
              title="Salin Gambar ke Clipboard (Siap Paste di WA)"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Salin</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-2.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1 transition-all shadow cursor-pointer"
              title="Unduh Gambar PNG"
            >
              <Download className="w-3.5 h-3.5" />
              <span>PNG</span>
            </button>

            <div className="flex items-center gap-1">
              <button
                onClick={handleExportJSON}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-gray-300 transition-colors cursor-pointer"
                title="Ekspor Draf JSON"
              >
                <FileJson className="w-3.5 h-3.5 text-purple-400" />
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-gray-300 transition-colors cursor-pointer"
                title="Impor Draf JSON"
              >
                <Upload className="w-3.5 h-3.5 text-amber-400" />
              </button>
              <input ref={fileInputRef} type="file" accept=".json" onChange={handleImportJSON} className="hidden" />

              {/* Mobile Full Canvas Mode Toggle Button */}
              <button
                onClick={() => setIsFullCanvasMobile(true)}
                className="px-2.5 py-1.5 rounded-lg bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 transition-all shadow cursor-pointer sm:hidden shrink-0"
                title="Mode Kanvas Layar Penuh (Mobile)"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Full Screen</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Layered Canvas Area with Hand Motion Pan Offset Transform */}
      <div
        ref={containerRef}
        className="flex-1 w-full h-full rounded-2xl border border-white/15 overflow-hidden relative shadow-inner touch-none bg-black"
      >
        {/* Layer 1: Background Template Grid & Wireframe Guide Canvas */}
        <canvas
          ref={bgCanvasRef}
          style={{ transform: `translate(${panOffset.x}px, ${panOffset.y}px)` }}
          className="absolute inset-0 w-full h-full pointer-events-none z-0 transition-transform duration-75"
        />

        {/* Layer 2: User Stroke Drawing Canvas */}
        <canvas
          ref={drawingCanvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px)`,
            cursor:
              tool === "hand" || isSpacePressed
                ? isDrawing
                  ? "grabbing"
                  : "grab"
                : tool === "move"
                ? "move"
                : tool === "eraser"
                ? eraserCursor
                : tool === "eyedropper"
                ? eyedropperCursor
                : pencilCursor,
          }}
          className="absolute inset-0 w-full h-full z-10 block transition-transform duration-75"
        />

        {/* Floating Instruction Overlay */}
        <div className="absolute top-3 left-3 pointer-events-none px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-sky-300 z-20 flex items-center gap-1.5">
          <span>✏️ Mode:</span>
          <span className="font-bold text-white uppercase">{isSpacePressed ? "HAND PAN (SPACEBAR)" : tool}</span>
          <span className="text-gray-400 hidden sm:inline">| Tahan Spacebar / alat Hand untuk menggeser kanvas.</span>
        </div>

        {/* Reset Pan Viewport Offset Button */}
        {(panOffset.x !== 0 || panOffset.y !== 0) && (
          <button
            onClick={() => setPanOffset({ x: 0, y: 0 })}
            className="absolute top-3 right-3 px-3 py-1 rounded-full bg-sky-600/90 hover:bg-sky-500 text-white text-[10px] font-mono font-bold shadow-lg z-20 flex items-center gap-1 border border-sky-400/40 cursor-pointer animate-in fade-in"
            title="Reset Posisi Viewport Kanvas"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Posisi View</span>
          </button>
        )}

        {/* Floating Quick Bar during Full Canvas Mobile Mode */}
        {isFullCanvasMobile && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 px-3 py-2 rounded-full bg-black/85 backdrop-blur-md border border-white/20 shadow-2xl flex items-center gap-2 text-xs">
            <button
              onClick={() => setIsFullCanvasMobile(false)}
              className="px-2.5 py-1 rounded-full bg-white/20 text-white font-bold flex items-center gap-1 cursor-pointer shrink-0"
              title="Keluar Mode Full Screen"
            >
              <Minimize2 className="w-3.5 h-3.5" />
              <span className="text-[11px]">Keluar</span>
            </button>

            <div className="h-4 w-[1px] bg-white/20" />

            <button
              onClick={() => setTool("brush")}
              className={`p-1.5 rounded-full transition-colors ${tool === "brush" ? "bg-sky-600 text-white" : "text-gray-400"}`}
              title="Pensil"
            >
              <Brush className="w-4 h-4" />
            </button>

            <button
              onClick={() => setTool("eraser")}
              className={`p-1.5 rounded-full transition-colors ${tool === "eraser" ? "bg-amber-600 text-white" : "text-gray-400"}`}
              title="Penghapus"
            >
              <Eraser className="w-4 h-4" />
            </button>

            <button
              onClick={() => setTool("hand")}
              className={`p-1.5 rounded-full transition-colors ${tool === "hand" ? "bg-emerald-600 text-white" : "text-gray-400"}`}
              title="Hand Motion"
            >
              <Hand className="w-4 h-4" />
            </button>

            <button
              onClick={() => setTool("move")}
              className={`p-1.5 rounded-full transition-colors ${tool === "move" ? "bg-indigo-600 text-white" : "text-gray-400"}`}
              title="Move Motion"
            >
              <Move className="w-4 h-4" />
            </button>

            <button
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              className="p-1.5 text-gray-300 disabled:opacity-30"
              title="Undo"
            >
              <Undo className="w-4 h-4" />
            </button>

            <button
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              className="p-1.5 text-gray-300 disabled:opacity-30"
              title="Redo"
            >
              <Redo className="w-4 h-4" />
            </button>

            <button
              onClick={handleCopyClipboard}
              className="p-1.5 bg-emerald-600 rounded-full text-white"
              title="Salin Gambar"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* WhatsApp Consultation Action Button */}
        {!isFullCanvasMobile && (
          <a
            href="https://wa.me/6285693366142?text=Halo%20Haris%20Musafa%20(Arjuna%20Dev),%20saya%20telah%20membuat%20sketsa%20ide%20tata%20letak%20proyek%20di%20Paint_Notes%20dan%20ingin%20konsultasi."
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-3 right-3 px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-black font-extrabold text-xs shadow-lg flex items-center gap-2 transition-all cursor-pointer border border-black/20 z-20"
          >
            <WhatsAppLogo className="w-4 h-4 text-black" />
            <span className="hidden sm:inline">Konsultasikan Sketsa di WA</span>
          </a>
        )}
      </div>

      {/* Text Annotation Input Modal */}
      {showTextInputModal && (
        <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1a1f2c] border border-white/20 rounded-xl p-4 max-w-sm w-full space-y-3 shadow-2xl text-gray-200">
            <div className="flex items-center justify-between text-xs font-bold text-white">
              <span>✍️ Tambahkan Teks Catatan Kanvas</span>
              <button onClick={() => setShowTextInputModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Ketik catatan (contoh: Header Bar / Diskon 50%)..."
              className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/20 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-sky-400"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddText();
              }}
            />
            <div className="flex items-center justify-end gap-2 text-xs">
              <button
                onClick={() => setShowTextInputModal(false)}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 font-semibold"
              >
                Batal
              </button>
              <button
                onClick={handleAddText}
                className="px-4 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold"
              >
                Tempel Teks
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear Canvas Confirmation Safeguard Modal */}
      {showClearModal && (
        <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1a1f2c] border border-red-500/30 rounded-xl p-5 max-w-sm w-full space-y-4 shadow-2xl text-gray-200">
            <div className="flex items-center gap-2.5 text-red-400 font-bold text-sm">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span>Bersihkan Seluruh Kanvas?</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Tindakan ini akan menghapus semua coretan garis pada kanvas. Anda dapat menekan Undo jika ingin memulihkannya kembali.
            </p>
            <div className="flex items-center justify-end gap-2 text-xs">
              <button
                onClick={() => setShowClearModal(false)}
                className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 font-semibold"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmClear}
                className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold shadow"
              >
                Ya, Hapus Kanvas
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
