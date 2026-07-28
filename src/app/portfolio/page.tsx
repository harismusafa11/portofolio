import { Metadata } from "next";
import { MainEnvironment } from "@/components/MainEnvironment";

export const metadata: Metadata = {
  title: "Portfolio Explorer & Hasil Proyek Website — Arjuna Dev",
  description: "Lihat hasil proyek pembuatan website & aplikasi mobile berdaya guna tinggi yang telah dipercaya oleh puluhan UMKM dan perusahaan Indonesia.",
};

export default function PortfolioPage() {
  return <MainEnvironment initialApp="portfolio" />;
}
