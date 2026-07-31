import { Metadata } from "next";
import { MainEnvironment } from "@/components/MainEnvironment";

export const metadata: Metadata = {
  title: "Hubungi Haris Musafa — Konsultasi Pembuatan Website — Arjuna Dev",
  description: "Hubungi Haris Musafa via WhatsApp Direct atau form pesan online untuk konsultasi gratis pembuatan website & aplikasi bisnis Anda.",
  alternates: {
    canonical: "https://arjunadev.com/contact",
  },
  openGraph: {
    title: "Hubungi Haris Musafa — Konsultasi Pembuatan Website — Arjuna Dev",
    description: "Hubungi Haris Musafa via WhatsApp Direct atau form pesan online untuk konsultasi gratis pembuatan website & aplikasi bisnis Anda.",
    url: "https://arjunadev.com/contact",
  },
};

export default function ContactPage() {
  return <MainEnvironment initialApp="contact" />;
}
