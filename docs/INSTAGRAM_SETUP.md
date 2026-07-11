# Instagram auto-sync — setup guide

The code is already built. To turn on real Instagram posts, Avni just needs to
generate one **access token** and paste it into `.env.local`. ~20 minutes, free.

> Why this is needed: Instagram (Meta) has no free public feed like YouTube's RSS.
> The only legitimate way to auto-pull posts is the official Instagram Graph API,
> which requires a token tied to her account.

---

## Step 1 — Make the account Business or Creator
In the Instagram app: **Settings → Account type and tools → Switch to professional
account** → choose **Creator** (or Business). Free. Required for API access.

## Step 2 — Create a Meta app
1. Go to https://developers.facebook.com/apps → **Create app**
2. Choose use case **"Other"** → app type **"Business"**
3. Name it (e.g. "Avni in Ireland site") and create it

## Step 3 — Add the Instagram product
1. In the app dashboard → **Add product** → **Instagram** → **Set up**
2. Use **"Instagram API with Instagram Login"** (the newer flow — no Facebook Page required)
3. Under **Instagram → API setup**, add Avni's Instagram account as a tester / connect it

## Step 4 — Generate a long-lived access token
1. In **Instagram → API setup**, use the token generator for the connected account
2. Approve the permissions (`instagram_business_basic` / read media)
3. Copy the **long-lived access token** (valid ~60 days)

## Step 5 — Drop it into the site
Create a file called `.env.local` in the project root with:

```
INSTAGRAM_ACCESS_TOKEN=PASTE_THE_LONG_LIVED_TOKEN_HERE
```

Restart the dev server (`npm run dev`). Done — real posts will appear in the
"From Instagram" strip and refresh hourly.

---

## Keeping it alive (tokens expire every ~60 days)
`lib/instagram.js` exports `refreshInstagramToken()`. Before launch we'll wire this
into a scheduled job (e.g. a Vercel Cron) so the token auto-refreshes and the feed
never goes stale. No action needed from Avni for that part — we'll handle it.

## Notes
- The token is a secret. Keep it only in `.env.local` (gitignored) or the host's
  environment variables on deploy. Never commit it or paste it in public.
- If you'd rather not deal with Meta's dashboard at all, the fallback is a paid
  widget service (Behold/SnapWidget) — say the word and we'll switch approaches.
