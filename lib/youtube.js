import { XMLParser } from "fast-xml-parser";
import { SITE } from "./config";
import { getArticle } from "./articles";

// Attach the cached AI article (if any) and a clean display title.
function withArticle(story) {
  const article = getArticle(story.videoId);
  return {
    ...story,
    article,
    displayTitle: article?.seoTitle || story.title,
    summary: article?.dek || article?.metaDescription || story.description,
  };
}

// Turn a YouTube title into a URL slug
export function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

// Sample stories used until Avni's real channelId is added to lib/config.js
const SAMPLE = [
  {
    id: "sample1",
    title: "A rainy day in Dublin",
    slug: "a-rainy-day-in-dublin",
    published: "2026-06-28T10:00:00Z",
    thumbnail: null,
    description:
      "Cozy cafés, wet cobblestones, and why I've come to love Dublin in the rain. A slow day wandering the city.",
    videoId: "",
    sample: true,
  },
  {
    id: "sample2",
    title: "The real cost of living in Ireland",
    slug: "the-real-cost-of-living-in-ireland",
    published: "2026-06-21T10:00:00Z",
    thumbnail: null,
    description:
      "Rent, groceries, transport — an honest breakdown of what a month in Ireland actually costs.",
    videoId: "",
    sample: true,
  },
  {
    id: "sample3",
    title: "Cliffs of Moher road trip",
    slug: "cliffs-of-moher-road-trip",
    published: "2026-06-14T10:00:00Z",
    thumbnail: null,
    description:
      "A weekend drive to the west coast — the wild Atlantic, green cliffs, and the best fish and chips of my life.",
    videoId: "",
    sample: true,
  },
  {
    id: "sample4",
    title: "Settling in: my first month as an immigrant",
    slug: "settling-in-my-first-month",
    published: "2026-06-07T10:00:00Z",
    thumbnail: null,
    description:
      "Paperwork, PPS numbers, making friends, and the little wins that made Ireland start to feel like home.",
    videoId: "",
    sample: true,
  },
];

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });

// Fetch the channel's videos from the free YouTube RSS feed.
// Returns a normalized list of "stories".
export async function getStories() {
  const channelId = SITE.youtube.channelId?.trim();
  if (!channelId) return SAMPLE.map(withArticle);

  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      { next: { revalidate: 3600 } } // re-pull hourly
    );
    if (!res.ok) return SAMPLE.map(withArticle);
    const xml = await res.text();
    const data = parser.parse(xml);
    let entries = data?.feed?.entry || [];
    if (!Array.isArray(entries)) entries = [entries];

    return entries.map((e) => {
      const videoId = e["yt:videoId"];
      const title = e.title;
      const media = e["media:group"] || {};
      return withArticle({
        id: e.id,
        title,
        slug: slugify(title),
        published: e.published,
        thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        description: media["media:description"] || "",
        videoId,
        sample: false,
      });
    });
  } catch {
    return SAMPLE.map(withArticle);
  }
}

export async function getStory(slug) {
  const stories = await getStories();
  return stories.find((s) => s.slug === slug) || null;
}
