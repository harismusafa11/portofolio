"use client";

import React, { useState, useEffect } from "react";

export const MarqueeSelect: React.FC = () => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      // Only drag marquee if clicking directly on desktop background (not on window or desktop icon)
      const target = e.target as HTMLElement;
      if (target.id === "desktop-area") {
        setIsSelecting(true);
        setStartPos({ x: e.clientX, y: e.clientY });
        setCurrentPos({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isSelecting) {
        setCurrentPos({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseUp = () => {
      if (isSelecting) {
        setIsSelecting(false);
      }
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isSelecting]);

  if (!isSelecting) return null;

  const left = Math.min(startPos.x, currentPos.x);
  const top = Math.min(startPos.y, currentPos.y);
  const width = Math.abs(currentPos.x - startPos.x);
  const height = Math.abs(currentPos.y - startPos.y);

  return (
    <div
      style={{ left, top, width, height }}
      className="fixed pointer-events-none z-10 border border-sky-400/60 bg-sky-500/20 rounded-sm shadow-sm"
    />
  );
};
