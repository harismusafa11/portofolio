import { Metadata } from "next";
import { MainEnvironment } from "@/components/MainEnvironment";

export const metadata: Metadata = {
  title: "Paket & Harga Pembuatan Website UMKM — Arjuna Dev",
  description: "Daftar resmi paket & harga jasa pembuatan website profesional untuk UMKM, toko online, klinik, dan perusahaan di Arjuna Dev. Gratis domain .com & hosting 1 tahun.",
};

export default function ServicesPage() {
  return <MainEnvironment initialApp="services" />;
}
