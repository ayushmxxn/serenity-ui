import type { MetadataRoute } from "next";
import { getAllBlockSlugs, getAllComponentSlugs } from "./registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://serenity-ui.com";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/components`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blocks`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const componentSlugs = getAllComponentSlugs();
  const componentRoutes: MetadataRoute.Sitemap = componentSlugs.map((slug) => ({
    url: `${baseUrl}/components/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const blockSlugs = getAllBlockSlugs();
  const blockRoutes: MetadataRoute.Sitemap = blockSlugs.map((slug) => ({
    url: `${baseUrl}/blocks/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...componentRoutes, ...blockRoutes];
}
