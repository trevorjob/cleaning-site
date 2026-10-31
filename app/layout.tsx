import type { Metadata } from "next";
import { TikTok_Sans, Young_Serif } from "next/font/google";
import { contact, site } from "@/content/site";
import { services } from "@/content/services";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { RevealObserver } from "@/components/ui/RevealObserver";
import "./globals.css";

const tiktok = TikTok_Sans({
  variable: "--font-tiktok",
  subsets: ["latin"],
  axes: ["wdth"],
  adjustFontFallback: false,
});

const youngSerif = Young_Serif({
  variable: "--font-young-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: { siteName: site.name, locale: "en_GB", type: "website" },
};

// schema.org has no CleaningService type, so LocalBusiness is the closest valid one.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.legalName,
  slogan: site.tagline,
  description: site.description,
  url: site.url,
  telephone: contact.phoneHref.replace("tel:", ""),
  email: contact.email,
  areaServed: [
    { "@type": "City", name: "London" },
    { "@type": "AdministrativeArea", name: "Kent" },
    { "@type": "AdministrativeArea", name: "Surrey" },
    { "@type": "AdministrativeArea", name: "East Sussex" },
    { "@type": "AdministrativeArea", name: "West Sussex" },
  ],
  makesOffer: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title } })),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${tiktok.variable} ${youngSerif.variable} antialiased`} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        {/* Marks JS as available before paint, so scroll reveals never hide content for no-JS visitors. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-porcelain"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <RevealObserver />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
