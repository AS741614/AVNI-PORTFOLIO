import { getStories } from "@/lib/youtube";
import StoryCard from "@/components/StoryCard";
import { InlineDoodle, FlowerDoodle } from "@/components/Doodles";

const BASE = "https://avniinireland.com";

export const metadata = {
  title: "Stories",
  description:
    "Every video from Avni in Ireland as a readable story — Ireland travel, international-student life in Dublin, and an Indian wedding, all in one archive.",
  alternates: { canonical: `${BASE}/stories` },
  openGraph: {
    title: "Stories · Avni in Ireland",
    description: "Every video as a readable story — watch it, or read along.",
    url: `${BASE}/stories`,
    type: "website",
    images: ["/opengraph-image"],
  },
};

export default async function StoriesPage() {
  const stories = await getStories();

  // CollectionPage + ItemList: tells crawlers this is an index of works and
  // names each one, so the archive itself can surface in results rather than
  // only the individual stories.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${BASE}/stories#collection`,
    name: "Stories",
    description: "Every video from Avni in Ireland, collected as readable stories.",
    url: `${BASE}/stories`,
    isPartOf: { "@id": `${BASE}/#site` },
    about: { "@id": `${BASE}/#avni` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: stories.length,
      itemListElement: stories.slice(0, 30).map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: s.displayTitle || s.title,
        url: `${BASE}/stories/${s.slug}`,
      })),
    },
  };

  return (
    <div className="container-x py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className="font-display text-4xl mb-2" style={{ fontFamily: "var(--font-display)" }}>
        Stories
        <InlineDoodle rotate={10}>
          <FlowerDoodle size={28} />
        </InlineDoodle>
      </h1>
      <p className="mb-10" style={{ color: "var(--muted)" }}>
        Every new video lands here automatically — watch it, or read along.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stories.map((s) => (
          <StoryCard key={s.id} story={s} />
        ))}
      </div>
    </div>
  );
}
