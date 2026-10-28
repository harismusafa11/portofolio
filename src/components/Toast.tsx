"use client";

import React, { useEffect } from "react";

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export default function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="toast-box active" role="alert">
      <div className="toast-content">
        <i className="fa-solid fa-circle-check text-cyan"></i>
        <span>{message}</span>
      </div>
      <button
        className="toast-close"
        onClick={onClose}
        aria-label="Tutup Notifikasi"
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  );
}
