import type { Metadata } from "next";
import { company } from "@/data/samprecData";

export function pageMetadata(opts: { title: string; description: string; path: string }): Metadata {
  const url = `${company.siteUrl}${opts.path}`;
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${opts.title} | ${company.name}`,
      description: opts.description,
      url,
      siteName: company.name,
      locale: "en_NG",
      type: "website",
      images: [{ url: "/brand/samprec-logo.png", width: 238, height: 102, alt: company.name }],
    },
    twitter: { card: "summary", title: `${opts.title} | ${company.name}`, description: opts.description },
  };
}
