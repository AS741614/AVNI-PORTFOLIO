import fs from "node:fs";
import path from "node:path";

// AI-generated SEO articles are cached as JSON on disk (one per video),
// produced by `npm run generate:articles`. Each file:
//   { videoId, seoTitle, dek, metaDescription, body, tags, generatedAt }
const DIR = path.join(process.cwd(), "content", "articles");

export function getArticle(videoId) {
  if (!videoId) return null;
  try {
    const file = path.join(DIR, `${videoId}.json`);
    if (!fs.existsSync(file)) return null;
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return null;
  }
}
