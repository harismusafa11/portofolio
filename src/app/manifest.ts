import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Arjuna Dev — Jasa Pembuatan Website & Software Studio",
    short_name: "Arjuna Dev",
    description:
      "Jasa Pembuatan Website Profesional & Software Studio oleh Haris Musafa. Melayani Landing Page Ultra-Fast, Toko Online, dan Custom Web App.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
      {
        src: "/assets/logo.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
