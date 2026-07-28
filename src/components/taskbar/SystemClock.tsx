"use client";

import React, { useState, useEffect } from "react";

export const SystemClock: React.FC = () => {
  const [timeStr, setTimeStr] = useState("");
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
      setDateStr(
        now.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-end justify-center text-right text-[11px] leading-tight text-gray-200 select-none">
      <span className="font-semibold text-white">{timeStr || "00:00"}</span>
      <span className="text-[10px] text-gray-400">{dateStr || "24 Jul 2026"}</span>
    </div>
  );
};
