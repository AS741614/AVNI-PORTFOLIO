import Link from "next/link";
import Newsletter from "@/components/Newsletter";

const BASE = "https://avniinireland.com";

export const metadata = {
  title: "Guides — studying and living in Ireland",
  description:
    "Practical, first-hand guides for internationals moving to Ireland: choosing a course, budgeting for Dublin, finding accommodation, and working here after you graduate.",
  keywords: [
    "Ireland study guide",
    "study in Ireland guide",
    "moving to Ireland guide",
    "Ireland for Indian students",
  ],
  alternates: { canonical: `${BASE}/guides` },
  openGraph: {
    title: "Guides — studying and living in Ireland",
    description:
      "Practical, first-hand guides for internationals moving to Ireland.",
    url: `${BASE}/guides`,
    type: "website",
    images: ["/opengraph-image"],
  },
};

export const GUIDES = [
  {
    href: "/guides/moving-to-ireland-from-india",
    title: "Moving to Ireland from India as a student",
    blurb:
      "The full sequence: choosing a course, the application, budgeting properly, the Dublin accommodation hunt, your first-week admin, and working here after you graduate.",
    readingTime: "9 min read",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${BASE}/guides#collection`,
  name: "Guides",
  description: "Practical, first-hand guides for internationals moving to Ireland.",
  url: `${BASE}/guides`,
  isPartOf: { "@id": `${BASE}/#site` },
  about: { "@id": `${BASE}/#avni` },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: GUIDES.length,
    itemListElement: GUIDES.map((g, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: g.title,
      url: `${BASE}${g.href}`,
    })),
  },
};

export default function GuidesPage() {
  return (
    <div className="container-x py-12 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <h1 className="font-display text-4xl mb-3" style={{ fontFamily: "var(--font-display)" }}>
        Guides
      </h1>
      <p className="text-lg mb-10" style={{ color: "var(--muted)" }}>
        The long-form version of what I get asked most. Written from having actually done it — no agency pitch, no
        affiliate links.
      </p>

      <div className="flex flex-col gap-6">
        {GUIDES.map((g) => (
          <Link key={g.href} href={g.href} className="card-pop p-6 block">
            <p className="font-display text-xl mb-2" style={{ fontFamily: "var(--font-display)" }}>
              {g.title}
            </p>
            <p className="text-sm mb-3" style={{ color: "var(--muted)" }}>
              {g.blurb}
            </p>
            <span className="text-sm font-bold" style={{ color: "var(--red)" }}>
              Read the guide → <span style={{ color: "var(--muted)", fontWeight: 400 }}>· {g.readingTime}</span>
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <Link href="/faq" className="text-sm font-bold" style={{ color: "var(--red)" }}>
          Or jump to the quick answers in the FAQ →
        </Link>
      </div>

      <div className="mt-12">
        <Newsletter />
      </div>
    </div>
  );
}
