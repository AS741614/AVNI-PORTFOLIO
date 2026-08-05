import { SITE } from "@/lib/config";
import { getStories } from "@/lib/youtube";

const BASE = "https://avniinireland.com";

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// RSS feed of the auto-synced stories — declared in layout metadata.
export async function GET() {
  const stories = await getStories();

  const items = stories
    .map(
      (s) => `    <item>
      <title>${esc(s.displayTitle || s.title)}</title>
      <link>${BASE}/stories/${s.slug}</link>
      <guid isPermaLink="true">${BASE}/stories/${s.slug}</guid>
      <pubDate>${new Date(s.published).toUTCString()}</pubDate>
      <description>${esc((s.summary || s.description || "").slice(0, 300))}</description>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${esc(SITE.name)}</title>
    <link>${BASE}</link>
    <description>${esc(`${SITE.intro} ${SITE.subIntro}`)}</description>
    <language>en-ie</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
