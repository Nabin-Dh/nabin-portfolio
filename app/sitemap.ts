import type { MetadataRoute } from "next";

import { NAV_LINKS, SITE } from "@/lib/constants";
import { PROJECTS } from "@/lib/content";
import { getAllInsights } from "@/lib/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: SITE.url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...NAV_LINKS.map((link) => ({
      url: `${SITE.url}${link.href}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...PROJECTS.map((project) => ({
      url: `${SITE.url}/projects/${project.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...getAllInsights().map((insight) => ({
      url: `${SITE.url}/insights/${insight.slug}`,
      lastModified: insight.date ? new Date(insight.date) : now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
