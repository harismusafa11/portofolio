import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Panduan Strategi Website Bisnis",
  description:
    "Artikel praktis, panduan biaya pembuatan website, strategi SEO Google Maps, dan tips digitalisasi bisnis UMKM Indonesia oleh Haris Musafa (Arjuna Dev).",
  alternates: {
    canonical: "https://arjunadev.com/blog",
  },
  openGraph: {
    title: "Blog & Panduan Strategi Website Bisnis | Arjuna Dev",
    description:
      "Artikel praktis, panduan biaya pembuatan website, strategi SEO Google Maps, dan tips digitalisasi bisnis UMKM Indonesia oleh Haris Musafa (Arjuna Dev).",
    url: "https://arjunadev.com/blog",
    siteName: "Arjuna Dev",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/assets/blog/biaya_web.jpg",
        width: 1200,
        height: 630,
        alt: "Blog Arjuna Dev - Wawasan Website & SEO Bisnis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog & Panduan Strategi Website Bisnis | Arjuna Dev",
    description:
      "Artikel praktis, panduan biaya pembuatan website, strategi SEO Google Maps, dan tips digitalisasi bisnis UMKM Indonesia oleh Haris Musafa.",
    images: ["/assets/blog/biaya_web.jpg"],
    creator: "@harismusafa",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
