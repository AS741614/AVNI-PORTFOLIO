// ─────────────────────────────────────────────────────────────
//  Generate SEO blog articles from Avni's YouTube videos using Claude.
//  Run:  ANTHROPIC_API_KEY=... npm run generate:articles
//
//  For each video it writes content/articles/<videoId>.json with a clean
//  title, dek, meta description, a written article body, and tags.
//  Already-generated videos are skipped (delete the file to regenerate).
// ─────────────────────────────────────────────────────────────
import fs from "node:fs";
import path from "node:path";
import Anthropic from "@anthropic-ai/sdk";
import { XMLParser } from "fast-xml-parser";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "content", "articles");
const MODEL = "claude-opus-4-8";

function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

// Read the channel ID straight out of lib/config.js (no ESM import needed).
function getChannelId() {
  if (process.env.YT_CHANNEL_ID) return process.env.YT_CHANNEL_ID.trim();
  const cfg = fs.readFileSync(path.join(ROOT, "lib", "config.js"), "utf8");
  const m = cfg.match(/channelId:\s*"([^"]*)"/);
  return m ? m[1].trim() : "";
}

async function fetchVideos(channelId) {
  const res = await fetch(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`
  );
  if (!res.ok) throw new Error(`RSS fetch failed: ${res.status}`);
  const parser = new XMLParser({ ignoreAttributes: false });
  const data = parser.parse(await res.text());
  let entries = data?.feed?.entry || [];
  if (!Array.isArray(entries)) entries = [entries];
  return entries.map((e) => ({
    videoId: e["yt:videoId"],
    title: e.title,
    description: e["media:group"]?.["media:description"] || "",
    published: e.published,
  }));
}

const ARTICLE_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["seoTitle", "dek", "metaDescription", "body", "tags"],
  properties: {
    seoTitle: { type: "string", description: "Clean, search-friendly title, max 60 chars, NO hashtags or emoji" },
    dek: { type: "string", description: "One-sentence summary, max 120 chars" },
    metaDescription: { type: "string", description: "Google meta description, max 155 chars" },
    body: { type: "string", description: "Article in Markdown, 300-500 words, first person as Avni, warm and personal, with 2-3 '## ' subheadings" },
    tags: { type: "array", items: { type: "string" }, description: "3-6 lowercase topic tags" },
  },
};

async function generate(client, video) {
  const prompt = `You write the website blog for "Avni in Ireland", a warm, personal YouTube + Instagram creator sharing her life in Ireland.

Turn this video into a short, genuine blog post written in Avni's first-person voice. Keep it warm and real, not salesy. Make the title and text genuinely useful for someone searching Google (good SEO) — strip the hashtags and emoji from the original title.

Video title: ${video.title}
Video description: ${video.description || "(no description provided)"}

Return only the structured fields.`;

  const res = await client.messages.create({
    model: MODEL,
    max_tokens: 8000,
    output_config: { format: { type: "json_schema", schema: ARTICLE_SCHEMA } },
    messages: [{ role: "user", content: prompt }],
  });
  const text = res.content.find((b) => b.type === "text")?.text || "{}";
  return JSON.parse(text);
}

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("✗ ANTHROPIC_API_KEY is not set. Add it and re-run.");
    process.exit(1);
  }
  const channelId = getChannelId();
  if (!channelId) {
    console.error("✗ No YouTube channelId found in lib/config.js.");
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const client = new Anthropic();
  const videos = await fetchVideos(channelId);
  console.log(`Found ${videos.length} videos.`);

  let made = 0;
  for (const v of videos) {
    const out = path.join(OUT_DIR, `${v.videoId}.json`);
    if (fs.existsSync(out)) {
      console.log(`• skip ${v.videoId} (already generated)`);
      continue;
    }
    process.stdout.write(`• writing ${v.videoId} … `);
    try {
      const article = await generate(client, v);
      fs.writeFileSync(
        out,
        JSON.stringify(
          { videoId: v.videoId, slug: slugify(v.title), ...article, generatedAt: new Date().toISOString() },
          null,
          2
        )
      );
      made++;
      console.log(`✓ "${article.seoTitle}"`);
    } catch (err) {
      console.log(`✗ ${err.message}`);
    }
  }
  console.log(`\nDone. ${made} new article(s) written to content/articles/.`);
}

main();
