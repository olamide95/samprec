import type { Metadata, Viewport } from "next";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { company, offices } from "@/data/samprecData";

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: { default: `${company.name} — Quantity Surveying, Project Management & PPP Advisory`, template: `%s | ${company.name}` },
  description:
    "Indigenous Nigerian consultancy for quantity surveying, project and programme management, M&E cost management, PPP advisory, Samprec Digitals and Samprec Academy. Abuja, Nigeria.",
  icons: { icon: "/brand/samprec-logo.png" },
  openGraph: { siteName: company.name, locale: "en_NG", type: "website", images: ["/brand/samprec-logo.png"] },
};

export const viewport: Viewport = { themeColor: "#0a0a0a" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: company.name,
  url: company.siteUrl,
  logo: `${company.siteUrl}/brand/samprec-logo.png`,
  email: company.primaryEmail,
  telephone: company.primaryPhone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Plot 22 I.T. Igbani, Utako",
    addressLocality: "Abuja",
    postalCode: "900108",
    addressRegion: "FCT",
    addressCountry: "NG",
  },
  openingHours: "Mo-Sa 09:00-17:00",
  department: offices.map((o) => ({ "@type": "LocalBusiness", name: o.name, address: o.address, telephone: o.phones[0] })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFab />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
