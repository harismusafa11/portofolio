/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/services",
        destination: "/layanan",
        permanent: true,
      },
      {
        source: "/portfolio",
        destination: "/portofolio",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/tentang",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/kontak",
        permanent: true,
      },
      {
        source: "/order",
        destination: "/layanan",
        permanent: true,
      },
      {
        source: "/order-wizard",
        destination: "/layanan",
        permanent: true,
      },
      {
        source: "/order_wizard",
        destination: "/layanan",
        permanent: true,
      },
      {
        source: "/faq",
        destination: "/#faq",
        permanent: true,
      },
      {
        source: "/project-tracker",
        destination: "/#workflow",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
