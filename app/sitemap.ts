import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { caseStudies } from "@/data/work";
import { posts } from "@/data/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: { path: string; priority: number; freq: "weekly" | "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, freq: "weekly" },
    { path: "/services", priority: 0.9, freq: "monthly" },
    { path: "/solutions", priority: 0.8, freq: "monthly" },
    { path: "/industries", priority: 0.8, freq: "monthly" },
    { path: "/about", priority: 0.8, freq: "monthly" },
    { path: "/work", priority: 0.8, freq: "monthly" },
    { path: "/insights", priority: 0.7, freq: "weekly" },
    { path: "/careers", priority: 0.7, freq: "weekly" },
    { path: "/contact", priority: 0.9, freq: "monthly" },
    { path: "/privacy", priority: 0.3, freq: "yearly" },
    { path: "/terms", priority: 0.3, freq: "yearly" },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route.path === "/" ? "" : route.path}`,
      lastModified: now,
      changeFrequency: route.freq,
      priority: route.priority,
    })),
    ...services.map((service) => ({
      url: `${site.url}/services/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...caseStudies.map((project) => ({
      url: `${site.url}/work/${project.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...posts.map((post) => ({
      url: `${site.url}/insights/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
