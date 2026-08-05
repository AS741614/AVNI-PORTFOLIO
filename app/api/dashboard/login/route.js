import { NextResponse } from "next/server";
import { SESSION_COOKIE, SESSION_MAX_AGE, checkPassword, createSessionToken } from "@/lib/dashboardAuth";

export async function POST(request) {
  const { password } = await request.json().catch(() => ({}));

  if (!process.env.DASHBOARD_PASSWORD) {
    return NextResponse.json(
      { error: "DASHBOARD_PASSWORD isn't set in .env.local yet — the dashboard has no password to check against." },
      { status: 500 }
    );
  }

  if (!checkPassword(password)) {
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}
