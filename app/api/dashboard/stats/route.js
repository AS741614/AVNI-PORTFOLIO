import { NextResponse } from "next/server";
import { getSiteStats, updateSiteStats, logSnapshot } from "@/lib/siteStats";

export async function GET() {
  return NextResponse.json(getSiteStats());
}

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { action, subscribers, followers, topRegion } = body;

  const toNum = (v) => (v === undefined || v === "" ? undefined : Number(v));

  if (action === "log-snapshot") {
    const stats = getSiteStats();
    const next = logSnapshot({
      subscribers: toNum(subscribers) ?? stats.subscribers,
      followers: toNum(followers) ?? stats.followers,
    });
    return NextResponse.json(next);
  }

  const next = updateSiteStats({ subscribers: toNum(subscribers), followers: toNum(followers), topRegion });
  return NextResponse.json(next);
}
