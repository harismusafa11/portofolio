import { Metadata } from "next";
import { MainEnvironment } from "@/components/MainEnvironment";

export const metadata: Metadata = {
  title: "Blog & Insight Digitalisasi Bisnis UMKM — Arjuna Dev",
  description: "Artikel praktis & panduan strategi pemasaran digital, pembuatan website, optimasi SEO Google Maps, dan peningkatan penjualan usaha UMKM Indonesia.",
  alternates: {
    canonical: "https://arjunadev.com/blog",
  },
  openGraph: {
    title: "Blog & Insight Digitalisasi Bisnis UMKM — Arjuna Dev",
    description: "Artikel praktis & panduan strategi pemasaran digital, pembuatan website, optimasi SEO Google Maps, dan peningkatan penjualan usaha UMKM Indonesia.",
    url: "https://arjunadev.com/blog",
  },
};

export default function BlogPage() {
  return <MainEnvironment initialApp="blog" />;
}
