import "./globals.css";
import { Archivo_Black, Space_Grotesk, Caveat } from "next/font/google";
import { SITE } from "@/lib/config";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SubscribeBar from "@/components/SubscribeBar";

const display = Archivo_Black({ weight: "400", subsets: ["latin"], variable: "--font-display", display: "swap" });
const sans = Space_Grotesk({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const script = Caveat({ subsets: ["latin"], variable: "--font-script", display: "swap" });

export const metadata = {
  metadataBase: new URL("https://avniinireland.com"),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: `${SITE.intro} ${SITE.subIntro}`,
  keywords: [
    "Indian in Ireland",
    "living in Ireland",
    "international student Ireland",
    "moving to Ireland from India",
    "Ireland travel vlog",
    "Dublin vlog",
    "student life Ireland",
    "Indian wedding",
    "MSc Data Analytics NCI",
  ],
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description: `${SITE.intro} ${SITE.subIntro}`,
    type: "website",
    siteName: SITE.name,
    locale: "en_IE",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.intro,
  },
  alternates: { types: { "application/rss+xml": "/feed.xml" } },
};

// Person + WebSite schema — tells Google who Avni is and links her profiles
// so search results can show a knowledge panel / social links.
const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://avniinireland.com/#avni",
      name: "Avni",
      alternateName: "Avni in Ireland",
      description:
        "Indian creator in Dublin — data analyst by day, vlogging Ireland travel, international-student life, and desi culture on YouTube and Instagram.",
      url: "https://avniinireland.com",
      sameAs: [SITE.youtube.url, SITE.instagram.url],
      jobTitle: "Data Analyst & Content Creator",
      knowsAbout: [
        "Living in Ireland",
        "International student life",
        "Moving to Ireland from India",
        "Ireland travel",
        "Data analytics",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://avniinireland.com/#site",
      name: SITE.name,
      url: "https://avniinireland.com",
      publisher: { "@id": "https://avniinireland.com/#avni" },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable} ${script.variable}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }} />
        <Nav />
        <main>{children}</main>
        <Footer />
        <SubscribeBar />
      </body>
    </html>
  );
}
