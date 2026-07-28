import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Arjuna Dev — Portfolio & Admin OS",
    short_name: "Arjuna Admin",
    description: "Portal Admin & Website Jasa Pembuatan Web & App Arjuna Dev",
    start_url: "/secure-portal-admin",
    display: "standalone",
    background_color: "#0f131c",
    theme_color: "#141924",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
