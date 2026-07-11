# Avni in Ireland — Website Project Notes

## Who
- **Creator:** Avni
- **Brand / Channel:** "Avni in Ireland"
- **Platforms:** YouTube + Instagram (influencer / content creator)
- **Niche:** Life in Ireland (travel / lifestyle / vlog — to confirm)

## Goal of the website
The site exists for **growth**, not just as a business card:
1. **SEO** — rank for searches around Avni's name, "Avni in Ireland", and topic keywords (life in Ireland, Indian in Ireland, etc.)
2. **Marketing** — a hub to send traffic to from social bios, collabs, and ads
3. **Follower growth** — convert website visitors into YouTube subscribers + Instagram followers
4. (Likely future) **Monetization** — brand deals, email list, sponsorships, maybe shop/affiliate

## Decisions made
- **Tech:** Next.js (auto-syncs content + fully SEO-friendly). ✅
- **Core idea:** auto-aggregating site — Avni posts on social, the site auto-builds blog posts. No manual blogging required.
- **Content sources (ALL):** ✅
  - **YouTube** → auto-pull every upload via free RSS feed → one blog page per video.
  - **Instagram** → auto-pull posts (needs Business/Creator account + Graph API setup).
  - **AI written articles** → auto-generate a real SEO article from each video transcript (so pages rank on Google).
  - **Manual posts** → Avni can also publish custom posts/announcements by hand.

## Decisions still open (to discuss)
- [x] Look & feel / vibe → **Warm & personal** (cozy, story-driven, photo-led; fits the 'life in Ireland' vlog). ✅
- [ ] Pages needed (Home, About, Videos, Collaborate/Work-with-me, Contact, Blog)
- [ ] Domain name
- [ ] Email capture / newsletter?

## Inputs needed from Avni to start the build
- [ ] YouTube channel URL (to get the channel ID for the RSS feed)
- [ ] Instagram handle (and confirm it's a Business/Creator account)
- [ ] A few photos + a short bio
- [ ] Brand colours / any logo (optional)

## Current structure
```
avni-portfolio/
├── assets/        # images, videos, icons
├── content/       # blog posts / written content
├── css/           # styles
├── js/            # scripts
└── docs/          # planning notes (this file)
```

## Build status — v0.1 running locally ✅
- Next.js 16 app, warm & personal theme. Run with `npm run dev` → http://localhost:3000
- Pages: Home, Stories (archive), Story detail (video embed + article + schema.org), Videos, About, Work with me
- Auto-feed: `lib/youtube.js` pulls YouTube RSS hourly; falls back to sample stories until a real channelId is set
- Growth features built in: sticky subscribe bar, newsletter capture, "auto-synced" badge, Instagram strip, related stories
- SEO: per-page metadata, sitemap.xml, robots.txt, VideoObject/Article JSON-LD

### YouTube channel — CONNECTED ✅
- Channel: "Avni in Ireland" → https://www.youtube.com/@Avniirathi
- channelId: `UCEQwxJF8ASYW3RYSHQcdIqQ` (set in lib/config.js)
- RSS feed live: 15 real videos auto-pulling into Stories/Videos with real thumbnails + embeds
- Instagram handle confirmed: @avni_rathii → https://www.instagram.com/avni_rathii/

### Instagram Graph API auto-pull — CODE BUILT, awaiting token ⏳
- `lib/instagram.js` (fetch + hourly cache + token refresh), async `InstagramStrip` renders real posts when token present, else placeholder tiles
- Token NOT a code task — Avni must generate it in Meta dashboard. Step-by-step in docs/INSTAGRAM_SETUP.md
- Token goes in `.env.local` as INSTAGRAM_ACCESS_TOKEN (gitignored). `.env.example` provided
- Tokens expire ~60 days → wire refreshInstagramToken() into a cron before launch

### AI-written SEO articles — BUILT, awaiting ANTHROPIC_API_KEY ⏳
- `scripts/generate-articles.mjs` (run: `npm run generate:articles`) calls Claude (claude-opus-4-8) per video → writes content/articles/<videoId>.json {seoTitle, dek, metaDescription, body(markdown), tags}
- `lib/articles.js` reads them; `getStories()` attaches a clean `displayTitle` + `summary`; story page renders the written article + tags; metadata/JSON-LD use the SEO title/description
- Fully graceful fallback: with no key/articles, site shows raw RSS titles (current state). Add ANTHROPIC_API_KEY to .env.local, run the script → clean titles + articles appear everywhere automatically
- Note: generates from title+description (YouTube RSS has no transcript). Transcript-based articles = future upgrade

### Still to wire (next sessions)
- Newsletter provider (Mailchimp/Buttondown) — form is stubbed
- Real photos + Avni's bio; deploy (Vercel)

---
_Status: v0.1 built and running locally._
