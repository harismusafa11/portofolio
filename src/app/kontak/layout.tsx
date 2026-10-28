import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hubungi Haris Musafa — Konsultasi Website",
  description:
    "Hubungi Haris Musafa via WhatsApp Direct atau formulir online untuk konsultasi gratis pembuatan website & aplikasi bisnis Anda. Respon cepat 24 jam.",
  alternates: {
    canonical: "https://arjunadev.com/kontak",
  },
  openGraph: {
    title: "Hubungi Haris Musafa — Konsultasi Website | Arjuna Dev",
    description:
      "Hubungi Haris Musafa via WhatsApp Direct atau formulir online untuk konsultasi gratis pembuatan website & aplikasi bisnis Anda. Respon cepat 24 jam.",
    url: "https://arjunadev.com/kontak",
    siteName: "Arjuna Dev",
    locale: "id_ID",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
