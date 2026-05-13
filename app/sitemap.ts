import type { MetadataRoute } from "next";
import { initialModels } from "./data";

const BASE_URL = "https://voltcore.tech";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...initialModels.map((m) => ({
      url: `${BASE_URL}/product/${m.id}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
