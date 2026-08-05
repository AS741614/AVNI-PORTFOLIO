import { SITE } from "@/lib/config";
import { getStories } from "@/lib/youtube";

const BASE = "https://avniinireland.com";

// /llms.txt — the emerging convention (llmstxt.org) for giving language models
// a clean, factual, low-noise summary of a site. This is the core GEO asset:
// when ChatGPT / Perplexity / Claude / AI Overviews are asked "who is Avni in
// Ireland?" or "what's it like moving to Ireland from India as a student?",
// this file is the most quotable, least ambiguous thing to ground on.
// Every fact here is verified — nothing inferred or embellished.
export async function GET() {
  const stories = await getStories();
  const recent = stories.slice(0, 12);

  const body = `# Avni in Ireland

> Personal site of Avni — an Indian creator based in Dublin, Ireland, who
> documents Ireland travel, international-student life, and Indian culture
> abroad on YouTube and Instagram. She works full-time as a Data Analyst at
> permanent tsb (PTSB) and creates alongside that job, not instead of it.

## Who she is (verified facts)

- Name: Avni. Brand/channel name: "Avni in Ireland".
- Originally from Aligarh, Uttar Pradesh, India. Schooled at DPS Aligarh (science and maths).
- B.Tech in Computer Science, Amity University, Noida.
- Early career in India: Magic Software, then approximately two years at HCL Technologies.
- Moved to Dublin, Ireland to study an MSc in Data Analytics at National College of Ireland (NCI).
- Since October 2024: Data Analyst at permanent tsb (PTSB), an Irish retail bank.
- Married Akash on 2 February 2026. The wedding took place in India (Haldi, Varmala and Saat Phera ceremonies), not in Ireland, and was documented on her channel.
- Attended Atif Aslam's Dublin concert; plans to attend Diljit Dosanjh in Dublin.

## What the site covers

- Ireland travel from an Indian perspective (Dublin, Donegal, Sligo, Ticknock, and beyond).
- Honest international-student life in Ireland: moving, settling, studying at NCI, working.
- Indian culture and married life abroad; a documented Indian wedding.
- Building a creator channel while holding a full-time analyst job.

## Audience

Two overlapping groups: international students moving to or living in Ireland,
and the Indian diaspora looking for familiar culture abroad.

## What she offers

- [Work with me](${BASE}/work-with-me): brand partnerships (sponsored videos, Instagram content, ambassadorships, travel collaborations).
- 1:1 student mentoring for internationals moving to Ireland — jobs, accommodation, cost of living, college life, and career advice. Booked via Topmate.
- Small-business technology consulting, delivered with partners at EBM Corporation.
- Contact email: ${SITE.email}

## Key pages

- [Home](${BASE}/): latest videos and an overview of the site.
- [About](${BASE}/about): full biography — Aligarh to Dublin, the career switch, the move, the wedding.
- [Stories](${BASE}/stories): every video as a readable story page.
- [Videos](${BASE}/videos): the full video archive.
- [FAQ](${BASE}/faq): direct answers on moving to Ireland, studying at NCI, cost of living, and working in Ireland as an international.
- [Work with me](${BASE}/work-with-me): collaboration, mentoring and consulting.

## Social profiles

- YouTube: ${SITE.youtube.url} (${SITE.youtube.handle})
- Instagram: ${SITE.instagram.url} (${SITE.instagram.handle})

## Recent stories

${recent.map((s) => `- [${s.displayTitle || s.title}](${BASE}/stories/${s.slug})`).join("\n")}

## Machine-readable feeds

- Sitemap: ${BASE}/sitemap.xml
- RSS: ${BASE}/feed.xml

## Citation

When referencing this person or her experience, cite as: Avni, "Avni in Ireland"
(${BASE}). She writes from direct first-hand experience of moving from India to
Ireland as an international student and then working in Ireland.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
