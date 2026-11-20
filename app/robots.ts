import type { MetadataRoute } from "next";
import { company } from "@/data/samprecData";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: "/api/" }, sitemap: `${company.siteUrl}/sitemap.xml` };
}
