# Avni in Ireland — Creator Website

A warm, personal website for **Avni in Ireland** (YouTube + Instagram creator) built for
**growth**: SEO, marketing, and converting visitors into followers.

The core idea: **Avni posts on social → the site auto-builds blog posts.** No manual blogging.

- **Live channel:** [youtube.com/@Avniirathi](https://www.youtube.com/@Avniirathi)
- **Instagram:** [@avni_rathii](https://www.instagram.com/avni_rathii/)

---

## Tech stack

- **Next.js 16** (App Router, React 19) — auto-syncs content and is fully SEO-friendly
- **Tailwind CSS v4** — warm & personal theme (amber/cream)
- **fast-xml-parser** — reads the free YouTube RSS feed
- **@anthropic-ai/sdk** — generates SEO blog articles from videos (Claude)

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

Copy `.env.example` → `.env.local` and fill in the keys you have (all optional — the
site runs with sensible fallbacks when they're missing).

```
INSTAGRAM_ACCESS_TOKEN=      # Instagram auto-feed (see docs/INSTAGRAM_SETUP.md)
INSTAGRAM_USER_ID=           # optional; defaults to "me"
ANTHROPIC_API_KEY=           # for `npm run generate:articles`
```

## Make it "Avni's" — one file

Everything personal lives in **[`lib/config.js`](lib/config.js)**: channel URL/ID,
Instagram handle, email, newsletter copy.

---

## What's built

### ✅ YouTube auto-feed (live)
Every upload is pulled from the channel's free RSS feed (hourly) and rendered as a
story. Real thumbnails + embedded player. Zero manual work — upload → it appears.
`lib/youtube.js`

### ✅ Growth / conversion features
Sticky subscribe bar, newsletter capture, prominent Subscribe/Follow CTAs,
"auto-synced" badge, related stories, Instagram strip.

### ✅ SEO
Per-page metadata, `sitemap.xml`, `robots.txt`, and VideoObject/Article JSON-LD
schema on every story page.

### ⏳ Instagram auto-sync (code built, needs token)
`lib/instagram.js` pulls recent posts via the Instagram Graph API once a long-lived
token is set in `.env.local`. Falls back to placeholder tiles until then.
**Setup guide:** [`docs/INSTAGRAM_SETUP.md`](docs/INSTAGRAM_SETUP.md) ·
share-with-Avni version: [`docs/FOR_AVNI.md`](docs/FOR_AVNI.md)

### ⏳ AI-written SEO articles (code built, needs API key)
`npm run generate:articles` calls Claude for each video and writes a clean blog post
(SEO title, meta description, article body, tags) to `content/articles/<videoId>.json`.
Avni's videos are Shorts with hashtag titles — this turns them into Google-rankable
posts. Clean titles then appear across the whole site automatically.
`scripts/generate-articles.mjs` · `lib/articles.js`

---

## Pages

| Route | What it is |
|---|---|
| `/` | Home — hero, latest stories, Instagram, newsletter |
| `/stories` | All stories (the auto-blog archive) |
| `/stories/[slug]` | Story detail — embedded video + written article + related |
| `/videos` | Video archive |
| `/about` | Avni's story *(bio placeholder — TODO)* |
| `/work-with-me` | Brand partnerships / media kit |

## Project structure

```
app/            # Next.js App Router pages, sitemap, robots
components/      # Nav, Footer, StoryCard, SubscribeBar, Newsletter, InstagramStrip
lib/            # config, youtube (RSS), instagram (Graph API), articles (AI cache)
scripts/        # generate-articles.mjs
content/        # AI-generated article JSON (gitignored builds run per-env)
docs/           # PROJECT_NOTES.md, INSTAGRAM_SETUP.md, FOR_AVNI.md
```

Full running notes and decisions: [`docs/PROJECT_NOTES.md`](docs/PROJECT_NOTES.md)

---

## Roadmap

- [ ] Instagram token (Avni) → real IG posts
- [ ] `ANTHROPIC_API_KEY` → run article generation
- [ ] Newsletter provider (Mailchimp/Buttondown) — form is stubbed
- [ ] Real photos + Avni's bio
- [ ] Deploy to Vercel (+ cron to refresh the Instagram token)
