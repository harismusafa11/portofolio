import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://arjunadev.com";

  const routes = [
    "",
    "/services",
    "/portfolio",
    "/order",
    "/project-tracker",
    "/blog",
    "/faq",
    "/about",
    "/contact",
    "/terminal",
    "/settings",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: route === "" || route === "/blog" || route === "/services" || route === "/order" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route === "/services" || route === "/portfolio" || route === "/order" ? 0.9 : 0.8,
  }));
}
