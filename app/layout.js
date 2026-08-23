import "./globals.css";
import { Archivo_Black, Space_Grotesk, Caveat } from "next/font/google";
import { SITE } from "@/lib/config";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SubscribeBar from "@/components/SubscribeBar";

const display = Archivo_Black({ weight: "400", subsets: ["latin"], variable: "--font-display", display: "swap" });
const sans = Space_Grotesk({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const script = Caveat({ subsets: ["latin"], variable: "--font-script", display: "swap" });

// Locks pinch-zoom and horizontal swipe-to-zoom on mobile browsers — the
// site is fixed-layout by design (fixed-px hero scene, etc.), so letting
// visitors zoom breaks the composition rather than helping them.
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

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
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/feed.xml" },
  },
};

// Person + WebSite + ProfilePage schema. This is the entity backbone: it tells
// Google (knowledge panel) and answer engines exactly who Avni is, with the
// E-E-A-T signals that make an LLM confident enough to cite her — real
// employer, real qualifications, real first-hand experience of the thing she
// writes about. Every value here is verified fact, not aspiration.
const BASE = "https://avniinireland.com";

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${BASE}/#avni`,
      name: "Avni",
      alternateName: "Avni in Ireland",
      description:
        "Indian creator and Data Analyst based in Dublin, Ireland. Documents Ireland travel, international-student life and Indian culture abroad, while working full-time as a Data Analyst at permanent tsb.",
      url: BASE,
      mainEntityOfPage: `${BASE}/about`,
      sameAs: [SITE.youtube.url, SITE.instagram.url],
      jobTitle: "Data Analyst",
      worksFor: {
        "@type": "Organization",
        name: "permanent tsb",
        alternateName: "PTSB",
        url: "https://www.permanenttsb.ie/",
      },
      alumniOf: [
        {
          "@type": "CollegeOrUniversity",
          name: "National College of Ireland",
          alternateName: "NCI",
          url: "https://www.ncirl.ie/",
          address: { "@type": "PostalAddress", addressLocality: "Dublin", addressCountry: "IE" },
        },
        {
          "@type": "CollegeOrUniversity",
          name: "Amity University, Noida",
          address: { "@type": "PostalAddress", addressLocality: "Noida", addressCountry: "IN" },
        },
      ],
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "degree",
        educationalLevel: "Master's Degree",
        name: "MSc Data Analytics",
        recognizedBy: { "@type": "CollegeOrUniversity", name: "National College of Ireland" },
      },
      homeLocation: {
        "@type": "Place",
        name: "Dublin, Ireland",
        address: { "@type": "PostalAddress", addressLocality: "Dublin", addressCountry: "IE" },
      },
      birthPlace: {
        "@type": "Place",
        name: "Aligarh, Uttar Pradesh, India",
        address: { "@type": "PostalAddress", addressLocality: "Aligarh", addressRegion: "Uttar Pradesh", addressCountry: "IN" },
      },
      nationality: { "@type": "Country", name: "India" },
      email: `mailto:${SITE.email}`,
      knowsAbout: [
        "Moving to Ireland from India",
        "International student life in Ireland",
        "Studying in Dublin",
        "National College of Ireland",
        "Cost of living in Dublin",
        "Working in Ireland as an international graduate",
        "Ireland travel",
        "Indian weddings",
        "Indian diaspora in Europe",
        "Data analytics",
      ],
      knowsLanguage: ["en", "hi"],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE}/#site`,
      name: SITE.name,
      alternateName: "avniinireland.com",
      url: BASE,
      description: `${SITE.intro} ${SITE.subIntro}`,
      inLanguage: "en-IE",
      publisher: { "@id": `${BASE}/#avni` },
      about: { "@id": `${BASE}/#avni` },
      copyrightHolder: { "@id": `${BASE}/#avni` },
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
