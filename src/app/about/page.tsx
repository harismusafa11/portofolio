import { Metadata } from "next";
import { MainEnvironment } from "@/components/MainEnvironment";

export const metadata: Metadata = {
  title: "About Haris Musafa — Fullstack Web Developer & Founder Arjuna Dev",
  description: "Profil profesional Haris Musafa, Fullstack Web Developer & Founder Arjuna Dev. Pengalaman pembuatan website & aplikasi mobile berdaya guna tinggi untuk UMKM Indonesia.",
};

export default function AboutPage() {
  return <MainEnvironment initialApp="about" />;
}
