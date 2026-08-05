import fs from "node:fs";
import path from "node:path";
import { SITE } from "./config";

function hasEnv(name) {
  return Boolean(process.env[name]?.trim());
}

// Reads real, checkable state — no guessing. Each entry mirrors a feature
// that's already coded and only needs a key/token to switch on.
export function getIntegrationStatus() {
  const articlesDir = path.join(process.cwd(), "content", "articles");
  let articleCount = 0;
  try {
    articleCount = fs.readdirSync(articlesDir).filter((f) => f.endsWith(".json")).length;
  } catch {
    articleCount = 0;
  }

  return [
    {
      name: "YouTube auto-feed",
      connected: Boolean(SITE.youtube.channelId?.trim()),
      detail: SITE.youtube.channelId ? `Channel ID set — pulling real uploads.` : "No channel ID in lib/config.js — showing sample stories.",
    },
    {
      name: "Instagram auto-feed",
      connected: hasEnv("INSTAGRAM_ACCESS_TOKEN"),
      detail: hasEnv("INSTAGRAM_ACCESS_TOKEN")
        ? "Token set — pulling real posts."
        : "INSTAGRAM_ACCESS_TOKEN missing — showing placeholder tiles. See docs/INSTAGRAM_SETUP.md.",
    },
    {
      name: "AI-written articles",
      connected: hasEnv("ANTHROPIC_API_KEY"),
      detail: hasEnv("ANTHROPIC_API_KEY")
        ? `Key set — run "npm run generate:articles" to (re)generate.`
        : "ANTHROPIC_API_KEY missing — story titles are heuristically cleaned, not AI-written.",
      extra: `${articleCount} article${articleCount === 1 ? "" : "s"} generated so far.`,
    },
    {
      name: "Newsletter provider",
      connected: hasEnv("NEWSLETTER_API_KEY"),
      detail: hasEnv("NEWSLETTER_API_KEY")
        ? "Provider key set."
        : "No provider connected — the \"Count me in\" form doesn't send anywhere yet.",
    },
    {
      name: "Dashboard password",
      connected: hasEnv("DASHBOARD_PASSWORD"),
      detail: hasEnv("DASHBOARD_PASSWORD")
        ? "Set — this page is locked behind it."
        : "Not set — anyone could reach this page. Add DASHBOARD_PASSWORD to .env.local.",
    },
  ];
}
