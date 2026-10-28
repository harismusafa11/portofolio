"use client";

import React from "react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/6285733097867?text=Halo%20Arjuna%20Webdev,%20saya%20tertarik%20konsultasi%20website"
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      aria-label="Chat WhatsApp Langsung"
    >
      <i className="fa-brands fa-whatsapp"></i>
    </a>
  );
}
