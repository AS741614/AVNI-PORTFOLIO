import { getStories } from "@/lib/youtube";

const BASE = "https://avniinireland.com";

// Priority/changeFrequency are hints, not directives, but they cost nothing and
// they tell crawlers where the durable value is: the evergreen pages (About,
// FAQ, Work with me) matter more for search than any single Short, even though
// the story pages are what refresh most often.
export default async function sitemap() {
  const stories = await getStories();

  const storyUrls = stories.map((s) => ({
    url: `${BASE}/stories/${s.slug}`,
    lastModified: new Date(s.published),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const staticUrls = [
    { path: "", priority: 1.0, changeFrequency: "daily" },
    { path: "/about", priority: 0.9, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.9, changeFrequency: "monthly" },
    { path: "/work-with-me", priority: 0.8, changeFrequency: "monthly" },
    { path: "/stories", priority: 0.8, changeFrequency: "daily" },
    { path: "/videos", priority: 0.7, changeFrequency: "daily" },
  ].map((p) => ({
    url: `${BASE}${p.path}`,
    lastModified: new Date(),
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  return [...staticUrls, ...storyUrls];
}
