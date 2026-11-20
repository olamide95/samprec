import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { articles, company, formatDate, getArticle } from "@/data/samprecData";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return { title: "Insight not found" };
  const base = pageMetadata({ title: a.title, description: a.excerpt, path: `/insights/${a.slug}` });
  return { ...base, openGraph: { ...base.openGraph, type: "article", publishedTime: a.date, authors: [a.author] } };
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const others = articles.filter((a) => a.slug !== article.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: { "@type": "Organization", name: company.name },
    publisher: { "@type": "Organization", name: company.name, logo: { "@type": "ImageObject", url: `${company.siteUrl}/brand/samprec-logo.png` } },
  };

  return (
    <article className="bg-white">
      <header className="relative overflow-hidden border-b border-hairline">
        <div className="grid-lines pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />
        <div className="container-grid relative py-14 md:py-20">
          <Link href="/insights" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-ink">
            <ArrowLeft className="size-4" /> All insights
          </Link>
          <div className="mx-auto mt-10 max-w-3xl">
            <p className="label-mono text-copper-700">{article.category}</p>
            <h1 className="font-display mt-5 text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">{article.title}</h1>
            <p className="mt-6 text-xl leading-relaxed text-slate-500">{article.excerpt}</p>
            <p className="mt-8 font-mono text-xs text-slate-400">
              {article.author} · {formatDate(article.date)} · {article.readMinutes} min read
            </p>
          </div>
        </div>
      </header>

      <div className="container-grid py-14 md:py-20">
        <div className="prose-samprec mx-auto max-w-3xl">
          {article.body.map((section, i) => (
            <section key={i}>
              {section.heading && <h2>{section.heading}</h2>}
              {section.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </section>
          ))}
          <div className="mt-14 rounded-[24px] bg-slate-ink p-8 text-white">
            <p className="label-mono text-copper-300">Talk to Samprec</p>
            <p className="font-display mt-3 text-2xl font-semibold">Facing this on a live project?</p>
            <div className="mt-6">
              <MagneticButton href="/contact#proposal">Book a consultation</MagneticButton>
            </div>
          </div>
        </div>
      </div>

      {others.length > 0 && (
        <section className="border-t border-hairline bg-alabaster py-14">
          <div className="container-grid">
            <p className="label-mono text-slate-400">Further reading</p>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {others.map((o) => (
                <Link key={o.slug} href={`/insights/${o.slug}`} className="group rounded-2xl border border-hairline bg-white p-6 hover:border-slate-300">
                  <p className="label-mono text-copper-700">{o.category}</p>
                  <p className="font-display mt-3 text-xl font-semibold group-hover:text-copper-700">{o.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </article>
  );
}
