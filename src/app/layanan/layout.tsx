import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paket & Harga Jasa Pembuatan Website",
  description:
    "Daftar resmi paket & harga jasa pembuatan website profesional untuk UMKM, toko online, company profile, dan custom web app di Arjuna Dev. Gratis domain .com & garansi 90 hari.",
  alternates: {
    canonical: "https://arjunadev.com/layanan",
  },
  openGraph: {
    title: "Paket & Harga Jasa Pembuatan Website | Arjuna Dev",
    description:
      "Daftar resmi paket & harga jasa pembuatan website profesional untuk UMKM, toko online, company profile, dan custom web app di Arjuna Dev. Gratis domain .com & garansi 90 hari.",
    url: "https://arjunadev.com/layanan",
    siteName: "Arjuna Dev",
    locale: "id_ID",
    type: "website",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
