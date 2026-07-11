// ─────────────────────────────────────────────────────────────
//  Instagram auto-feed via the Instagram Graph API
//  Mirrors the YouTube feed: drop in a token and real posts flow.
//
//  Setup (see docs/INSTAGRAM_SETUP.md):
//    1. Avni's account → Business/Creator
//    2. Create a Meta app, get a long-lived access token
//    3. Put it in .env.local as INSTAGRAM_ACCESS_TOKEN=...
//  Until a token exists, the site shows placeholder tiles.
// ─────────────────────────────────────────────────────────────

const GRAPH = "https://graph.instagram.com";

// Normalize the fields we care about for the grid.
const FIELDS = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";

export async function getInstagramPosts(limit = 8) {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();
  const userId = process.env.INSTAGRAM_USER_ID?.trim() || "me";
  if (!token) return []; // no token yet → caller shows placeholders

  try {
    const url = `${GRAPH}/${userId}/media?fields=${FIELDS}&limit=${limit}&access_token=${token}`;
    const res = await fetch(url, { next: { revalidate: 3600 } }); // refresh hourly
    if (!res.ok) return [];
    const data = await res.json();
    const items = Array.isArray(data?.data) ? data.data : [];

    return items.map((p) => ({
      id: p.id,
      caption: p.caption || "",
      permalink: p.permalink,
      timestamp: p.timestamp,
      type: p.media_type, // IMAGE | VIDEO | CAROUSEL_ALBUM
      // VIDEO posts expose a thumbnail_url; images use media_url
      image: p.media_type === "VIDEO" ? p.thumbnail_url : p.media_url,
    }));
  } catch {
    return [];
  }
}

// Long-lived Instagram tokens expire after ~60 days. This refreshes one.
// Wire into a scheduled job (e.g. a cron / Vercel cron) before expiry.
export async function refreshInstagramToken(token) {
  const url = `${GRAPH}/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("token refresh failed");
  return res.json(); // { access_token, token_type, expires_in }
}
