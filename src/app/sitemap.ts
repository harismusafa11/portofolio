import type { MetadataRoute } from "next";
import { blogsData } from "@/data/blogs";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://arjunadev.com";
  const currentDate = new Date().toISOString().split("T")[0];

  const coreRoutes: Array<{
    path: string;
    priority: number;
    changeFrequency:
      | "always"
      | "hourly"
      | "daily"
      | "weekly"
      | "monthly"
      | "yearly"
      | "never";
  }> = [
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "/portofolio", priority: 0.9, changeFrequency: "weekly" },
    { path: "/layanan", priority: 0.9, changeFrequency: "weekly" },
    { path: "/blog", priority: 0.85, changeFrequency: "weekly" },
    { path: "/tentang", priority: 0.8, changeFrequency: "monthly" },
    { path: "/kontak", priority: 0.8, changeFrequency: "monthly" },
  ];

  const blogRoutes = blogsData.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.isoDate.split("T")[0],
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const coreUrls = coreRoutes.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified: currentDate,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  return [...coreUrls, ...blogRoutes];
}
