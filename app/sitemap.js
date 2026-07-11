import { getStories } from "@/lib/youtube";

const BASE = "https://avniinireland.com";

export default async function sitemap() {
  const stories = await getStories();
  const storyUrls = stories.map((s) => ({
    url: `${BASE}/stories/${s.slug}`,
    lastModified: s.published,
  }));

  const staticUrls = ["", "/stories", "/videos", "/about", "/work-with-me"].map((p) => ({
    url: `${BASE}${p}`,
    lastModified: new Date(),
  }));

  return [...staticUrls, ...storyUrls];
}
