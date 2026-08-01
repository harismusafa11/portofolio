import { Metadata } from "next";
import { MainEnvironment } from "@/components/MainEnvironment";

export const metadata: Metadata = {
  title: "Form Pemesanan Website — Arjuna Dev",
  description: "Formulir resmi pemesanan layanan pembuatan website profesional Arjuna Dev. Proses cepat, DP 50%, dan garansi 90 hari bug-free.",
  alternates: {
    canonical: "https://arjunadev.com/order",
  },
  openGraph: {
    title: "Form Pemesanan Website — Arjuna Dev",
    description: "Formulir resmi pemesanan layanan pembuatan website profesional Arjuna Dev.",
    url: "https://arjunadev.com/order",
  },
};

export default function OrderPage() {
  return <MainEnvironment initialApp="order_wizard" />;
}
