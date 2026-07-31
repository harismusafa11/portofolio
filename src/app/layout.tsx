import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk, Outfit } from "next/font/google";
import { DomErrorPatch } from "@/components/DomErrorPatch";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arjunadev.com"),
  title: "Arjuna Dev | Jasa Pembuatan Website & Software Studio — Haris Musafa",
  description:
    "Jasa Pembuatan Website Profesional & Mobile App oleh Haris Musafa (Arjuna Dev). Melayani Landing Page Ultra-Fast, Toko Online E-Commerce, Custom Web App, & Live Tracking Proyek dengan Garansi 90 Hari.",
  keywords: [
    "Arjuna Dev",
    "Haris Musafa",
    "Jasa Pembuatan Website",
    "Bikin Website Murah Bergaransi",
    "Jasa Bikin Landing Page",
    "Web Developer Indonesia",
    "Next.js Developer Jakarta",
    "Jasa Web Toko Online E-Commerce",
    "Project Tracking System",
  ],
  authors: [{ name: "Haris Musafa", url: "https://instagram.com/haris_musafa_" }],
  creator: "Haris Musafa (Arjuna Dev)",
  publisher: "Arjuna Dev",
  alternates: {
    canonical: "https://arjunadev.com",
  },
  openGraph: {
    title: "Arjuna Dev | Jasa Pembuatan Website & Software Studio",
    description:
      "Jasa Web Developer Profesional oleh Haris Musafa. Dapatkan estimasi instant, DP 50%, garansi 90 hari, & konsultasi langsung via WA 085693366142.",
    url: "https://arjunadev.com",
    siteName: "Arjuna Dev",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Arjuna Dev - Web & Software Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arjuna Dev | Jasa Pembuatan Website & Software Studio",
    description:
      "Jasa Web Developer Profesional oleh Haris Musafa (Arjuna Dev). Melayani Landing Page, E-Commerce, & Custom App.",
    images: ["/images/logo.png"],
  },
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://arjunadev.com/#organization",
      "name": "Arjuna Dev",
      "url": "https://arjunadev.com",
      "logo": "https://arjunadev.com/images/logo.png",
      "image": "https://arjunadev.com/images/logo.png",
      "description":
        "Jasa Pembuatan Website Profesional & Software Agency di Indonesia oleh Haris Musafa (Arjuna Dev). Melayani Landing Page Ultra Fast, E-Commerce, Custom Web App & Project Tracking.",
      "founder": {
        "@type": "Person",
        "name": "Haris Musafa",
        "jobTitle": "Lead Full-Stack Web & Software Engineer",
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Ds. Pamutih, Kec. Ulujami",
        "addressLocality": "Pemalang",
        "addressRegion": "Jawa Tengah",
        "addressCountry": "ID",
      },
      "telephone": "+6285693366142",
      "priceRange": "Rp 1.499.000 - Rp 9.999.000",
      "openingHours": "Mo-Sa 08:00-21:00",
      "sameAs": [
        "https://instagram.com/haris_musafa_",
        "https://wa.me/6285693366142",
      ],
      "offers": [
        {
          "@type": "Offer",
          "name": "Paket Landing Page Professional",
          "price": "1499000",
          "priceCurrency": "IDR",
          "availability": "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          "name": "Paket Business & E-Commerce Web",
          "price": "3499000",
          "priceCurrency": "IDR",
          "availability": "https://schema.org/InStock",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://arjunadev.com/#website",
      "url": "https://arjunadev.com",
      "name": "Arjuna Dev",
      "publisher": {
        "@id": "https://arjunadev.com/#organization",
      },
      "inLanguage": "id-ID",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} ${outfit.variable} h-full antialiased dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body suppressHydrationWarning className="h-full overflow-hidden font-sans bg-[#0a0a0a] text-gray-100">
        <DomErrorPatch />
        {children}
      </body>
    </html>
  );
}
