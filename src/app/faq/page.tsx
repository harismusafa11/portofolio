import { Metadata } from "next";
import { MainEnvironment } from "@/components/MainEnvironment";

export const metadata: Metadata = {
  title: "FAQ — Pertanyaan Sering Ditanyakan Pembuatan Website — Arjuna Dev",
  description: "Jawaban lengkap seputar alur pembuatan website, sewa domain .com & hosting gratis, garansi bug 90 hari, dan cara pemesanan di Arjuna Dev.",
};

export default function FaqPage() {
  return <MainEnvironment initialApp="faq" />;
}
