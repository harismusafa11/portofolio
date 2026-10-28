import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Haris Musafa — Fullstack Web Developer",
  description:
    "Profil profesional Haris Musafa, Fullstack Web Developer & Founder Arjuna Dev. Berpengalaman membangun website & aplikasi modern berdaya guna tinggi untuk UMKM dan bisnis Indonesia.",
  alternates: {
    canonical: "https://arjunadev.com/tentang",
  },
  openGraph: {
    title:
      "Tentang Haris Musafa — Fullstack Web Developer | Arjuna Dev",
    description:
      "Profil profesional Haris Musafa, Fullstack Web Developer & Founder Arjuna Dev. Berpengalaman membangun website & aplikasi modern berdaya guna tinggi untuk UMKM dan bisnis Indonesia.",
    url: "https://arjunadev.com/tentang",
    siteName: "Arjuna Dev",
    locale: "id_ID",
    type: "profile",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
