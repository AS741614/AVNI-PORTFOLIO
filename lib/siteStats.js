import fs from "node:fs";
import path from "node:path";

// Editable-via-dashboard site stats (subscriber/follower counts + a manual
// growth log). Stored as JSON on disk — fine for local dev, but Vercel's
// serverless filesystem is read-only in production, so writes there won't
// persist. Swap this module for Upstash Redis (or similar) before deploying
// if the dashboard needs to keep working after launch.
const FILE = path.join(process.cwd(), "data", "site-stats.json");

// Zero, not a guessed number — real figures only exist once Avni saves them
// via /dashboard. `updatedAt` staying null is what the public work-with-me
// page checks to decide whether it has real numbers to show at all.
const DEFAULTS = {
  subscribers: 0,
  followers: 0,
  topRegion: "",
  updatedAt: null,
  history: [], // { date: "YYYY-MM-DD", subscribers, followers }
};

export function getSiteStats() {
  try {
    const raw = fs.readFileSync(FILE, "utf8");
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return DEFAULTS;
  }
}

function write(stats) {
  fs.mkdirSync(path.dirname(FILE), { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(stats, null, 2));
}

export function updateSiteStats({ subscribers, followers, topRegion }) {
  const current = getSiteStats();
  const next = {
    ...current,
    subscribers: subscribers ?? current.subscribers,
    followers: followers ?? current.followers,
    topRegion: topRegion ?? current.topRegion,
    updatedAt: new Date().toISOString(),
  };
  write(next);
  return next;
}

// Appends today's numbers to the growth log (one entry per day — logging
// again the same day overwrites that day's entry instead of duplicating).
export function logSnapshot({ subscribers, followers }) {
  const current = getSiteStats();
  const today = new Date().toISOString().slice(0, 10);
  const history = current.history.filter((h) => h.date !== today);
  history.push({ date: today, subscribers, followers });
  history.sort((a, b) => a.date.localeCompare(b.date));
  const next = { ...current, subscribers, followers, updatedAt: new Date().toISOString(), history };
  write(next);
  return next;
}
