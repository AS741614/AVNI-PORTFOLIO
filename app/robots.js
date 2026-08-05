const BASE = "https://avniinireland.com";

// AI/LLM crawlers are explicitly ALLOWED — this site's goal is to be quoted
// and cited by answer engines (ChatGPT, Perplexity, Claude, Google AI
// Overviews, Copilot). Blocking them would trade away exactly the GEO
// visibility we're optimising for. Named individually rather than relying on
// the "*" rule so the intent is unambiguous and easy to reverse later.
const AI_CRAWLERS = [
  "GPTBot", // OpenAI — training + ChatGPT browsing
  "OAI-SearchBot", // OpenAI — ChatGPT Search index
  "ChatGPT-User", // OpenAI — live user-initiated fetches
  "ClaudeBot", // Anthropic — Claude
  "Claude-User",
  "anthropic-ai",
  "PerplexityBot", // Perplexity — index
  "Perplexity-User", // Perplexity — live fetches
  "Google-Extended", // Google — Gemini / AI Overviews grounding
  "Applebot-Extended", // Apple Intelligence
  "meta-externalagent", // Meta AI
  "Bingbot", // powers Copilot
  "cohere-ai",
  "YouBot",
];

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The private admin panel must never be indexed.
        disallow: ["/dashboard", "/dashboard/", "/api/"],
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/dashboard", "/dashboard/", "/api/"],
      })),
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
