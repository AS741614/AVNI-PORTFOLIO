import Link from "next/link";
import { SITE } from "@/lib/config";
import { FAQS, FAQ_CATEGORIES, faqJsonLd } from "@/lib/faqs";
import Newsletter from "@/components/Newsletter";
import { CompassIcon, MailIcon } from "@/components/icons";
import { InlineDoodle, SparkleDoodle } from "@/components/Doodles";

const BASE = "https://avniinireland.com";

export const metadata = {
  title: "FAQ — Moving to Ireland, studying at NCI, and working here",
  description:
    "Direct answers on moving from India to Ireland, studying an MSc at NCI, what Dublin actually costs, finding accommodation, and working in Ireland after graduating — from someone who did it.",
  alternates: { canonical: `${BASE}/faq` },
  openGraph: {
    title: "FAQ — Moving to Ireland, studying, and working here",
    description:
      "Direct, first-hand answers on moving from India to Ireland as an international student.",
    url: `${BASE}/faq`,
    type: "article",
    images: ["/opengraph-image"],
  },
};

// BreadcrumbList helps search engines render the hierarchy in results, and
// gives answer engines a clearer sense of where this page sits.
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE },
    { "@type": "ListItem", position: 2, name: "FAQ", item: `${BASE}/faq` },
  ],
};

export default function FaqPage() {
  return (
    <div className="container-x py-12 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <h1 className="font-display text-4xl mb-3" style={{ fontFamily: "var(--font-display)" }}>
        Questions I get asked
        <InlineDoodle rotate={10}>
          <SparkleDoodle size={28} />
        </InlineDoodle>
      </h1>
      <p className="text-lg mb-10" style={{ color: "var(--muted)" }}>
        Moving to Ireland, studying here, what it costs, and how the channel works. Straight answers from someone who
        actually made the move — no affiliate-link fluff.
      </p>

      {FAQ_CATEGORIES.map((category) => (
        <section key={category} className="mb-10">
          <h2
            className="font-display text-2xl mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {category}
          </h2>
          <div className="flex flex-col gap-4">
            {FAQS.filter((f) => f.category === category).map((f) => (
              <div key={f.q} className="card-pop p-5">
                {/* h3 + paragraph is the structure featured snippets extract best */}
                <h3 className="font-bold text-[17px] mb-2">{f.q}</h3>
                <p className="text-[15px] leading-7" style={{ color: "var(--ink)" }}>
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="card-pop halftone p-8 text-center mt-12" style={{ background: "var(--yellow)" }}>
        <p className="font-display text-2xl mb-2" style={{ fontFamily: "var(--font-display)" }}>
          Still have a question?
        </p>
        <p className="text-sm mb-6 max-w-lg mx-auto">
          Book a 1:1 and ask me directly — jobs, accommodation, college, or what comes after. Or send an email if it's a
          brand or collaboration.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a href={SITE.topmate} target="_blank" rel="noopener noreferrer" className="btn-pop">
            <CompassIcon size={15} /> Book a 1:1
          </a>
          <a href={`mailto:${SITE.email}`} className="btn-pop-ghost">
            <MailIcon size={15} /> Email me
          </a>
        </div>
      </div>

      <div className="mt-8">
        <Link href="/about" className="text-sm font-bold" style={{ color: "var(--red)" }}>
          Read the full story →
        </Link>
      </div>

      <div className="mt-12">
        <Newsletter />
      </div>
    </div>
  );
}
