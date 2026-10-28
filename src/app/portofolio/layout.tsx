import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portofolio Proyek Website & Aplikasi",
  description:
    "Lihat hasil proyek pembuatan website & aplikasi mobile berdaya guna tinggi yang telah dipercaya oleh puluhan UMKM dan perusahaan Indonesia.",
  alternates: {
    canonical: "https://arjunadev.com/portofolio",
  },
  openGraph: {
    title: "Portofolio Proyek Website & Aplikasi | Arjuna Dev",
    description:
      "Lihat hasil proyek pembuatan website & aplikasi mobile berdaya guna tinggi yang telah dipercaya oleh puluhan UMKM dan perusahaan Indonesia.",
    url: "https://arjunadev.com/portofolio",
    siteName: "Arjuna Dev",
    locale: "id_ID",
    type: "website",
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
