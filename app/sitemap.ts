import type { MetadataRoute } from "next";
import { articles, company, courses, digitalSolutions, projects } from "@/data/samprecData";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = company.siteUrl;
  const pages = [
    "", "/about", "/services", "/projects", "/insights", "/contact",
    "/digitals", "/digitals/solutions", "/digitals/demos", "/digitals/assessment", "/digitals/start",
    "/academy", "/academy/courses", "/academy/schedule", "/academy/corporate", "/academy/enrol",
  ].map((p) => ({ url: `${base}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 }));
  const detail = (path: string) => ({ url: `${base}${path}`, changeFrequency: "yearly" as const, priority: 0.6 });
  return [
    ...pages,
    ...projects.map((p) => detail(`/projects/${p.slug}`)),
    ...courses.map((c) => ({ ...detail(`/academy/courses/${c.slug}`), priority: 0.7 })),
    ...digitalSolutions.map((d) => ({ ...detail(`/digitals/solutions/${d.slug}`), priority: 0.7 })),
    ...articles.map((a) => ({ ...detail(`/insights/${a.slug}`), lastModified: a.date })),
  ];
}
