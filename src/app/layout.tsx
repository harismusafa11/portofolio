import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://arjunadev.com"),
  title: {
    default:
      "Arjuna Dev | Jasa Pembuatan Website & Software Studio — Haris Musafa",
    template: "%s | Arjuna Dev",
  },
  description:
    "Jasa Pembuatan Website Profesional & Software Studio oleh Haris Musafa (Arjuna Dev). Melayani Landing Page Ultra-Fast, Toko Online E-Commerce, Custom Web App, & Live Tracking Proyek dengan Garansi 90 Hari.",
  keywords: [
    "Arjuna Dev",
    "Arjuna Webdev",
    "Haris Musafa",
    "Jasa Pembuatan Website",
    "Bikin Website Murah Bergaransi",
    "Jasa Bikin Landing Page",
    "Web Developer Indonesia",
    "Next.js Developer Indonesia",
    "Jasa Web Toko Online E-Commerce",
    "Jasa Pembuatan Website Pemalang",
    "Jasa Website Pekalongan",
    "Jasa Website Tegal",
    "Jasa Website Semarang",
    "Jasa Website Jawa Tengah",
    "Full Stack Web Developer",
    "Software Studio Indonesia",
    "Project Tracking System",
  ],
  authors: [
    { name: "Haris Musafa", url: "https://instagram.com/haris_musafa_" },
  ],
  creator: "Haris Musafa (Arjuna Dev)",
  publisher: "Arjuna Dev",
  category: "technology",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://arjunadev.com",
  },
  openGraph: {
    title: "Arjuna Dev | Jasa Pembuatan Website & Software Studio",
    description:
      "Jasa Web Developer Profesional oleh Haris Musafa. Dapatkan estimasi instant, DP 50%, garansi 90 hari, & konsultasi langsung via WA 085733097867.",
    url: "https://arjunadev.com",
    siteName: "Arjuna Dev",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/assets/logo.png",
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
    images: ["/assets/logo.png"],
    creator: "@harismusafa",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
      { url: "/assets/logo.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://arjunadev.com/#organization",
      name: "Arjuna Dev",
      alternateName: ["Arjuna Webdev", "Haris Musafa Web Developer"],
      url: "https://arjunadev.com",
      logo: "https://arjunadev.com/assets/logo.png",
      image: "https://arjunadev.com/assets/logo.png",
      description:
        "Jasa Pembuatan Website Profesional & Software Agency di Indonesia oleh Haris Musafa (Arjuna Dev). Melayani Landing Page Ultra Fast, E-Commerce, Custom Web App & Project Tracking.",
      founder: {
        "@type": "Person",
        name: "Haris Musafa",
        jobTitle: "Lead Full-Stack Web & Software Engineer",
        url: "https://instagram.com/haris_musafa_",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Ds. Pamutih, Kec. Ulujami",
        addressLocality: "Pemalang",
        addressRegion: "Jawa Tengah",
        postalCode: "52371",
        addressCountry: "ID",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -6.8906,
        longitude: 109.5348,
      },
      telephone: "+6285733097867",
      priceRange: "Rp 500.000 - Rp 5.000.000",
      openingHours: "Mo-Su 08:00-22:00",
      areaServed: [
        {
          "@type": "AdministrativeArea",
          name: "Indonesia",
        },
        {
          "@type": "City",
          name: "Pemalang",
        },
        {
          "@type": "City",
          name: "Pekalongan",
        },
        {
          "@type": "City",
          name: "Tegal",
        },
        {
          "@type": "City",
          name: "Semarang",
        },
      ],
      sameAs: [
        "https://instagram.com/haris_musafa_",
        "https://wa.me/6285733097867",
        "https://github.com/harismusafa11",
      ],
      offers: [
        {
          "@type": "Offer",
          name: "Paket Basic (Landing Page)",
          price: "500000",
          priceCurrency: "IDR",
          availability: "https://schema.org/InStock",
          description:
            "Website 1 halaman fokus konversi tinggi, cepat, responsif, dan siap iklan.",
        },
        {
          "@type": "Offer",
          name: "Paket Advanced (Company Profile)",
          price: "900000",
          priceCurrency: "IDR",
          availability: "https://schema.org/InStock",
          description:
            "Website profil bisnis perusahaan multi-halaman lengkap dengan CMS admin dan optimasi SEO Google.",
        },
        {
          "@type": "Offer",
          name: "Paket Business (Katalog & Toko Online)",
          price: "1500000",
          priceCurrency: "IDR",
          availability: "https://schema.org/InStock",
          description:
            "Website bisnis katalog produk dinamis, filter kategori, checkout WhatsApp, domain .COM & hosting 1 tahun.",
        },
        {
          "@type": "Offer",
          name: "Paket E-Commerce & Web App Sistem",
          price: "5000000",
          priceCurrency: "IDR",
          availability: "https://schema.org/InStock",
          description:
            "Sistem web app custom, e-commerce full-stack, integrasi payment gateway QRIS & bank, database production-ready.",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://arjunadev.com/#website",
      url: "https://arjunadev.com",
      name: "Arjuna Dev",
      publisher: {
        "@id": "https://arjunadev.com/#organization",
      },
      inLanguage: "id-ID",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://arjunadev.com/portofolio?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if ('scrollRestoration' in history) {
                  history.scrollRestoration = 'manual';
                }
                window.addEventListener('beforeunload', function() {
                  window.scrollTo(0, 0);
                });
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
