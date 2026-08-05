import { NextResponse } from "next/server";
import { SESSION_COOKIE, isValidSessionToken } from "@/lib/dashboardAuth";

// Gates every /dashboard route (except the login page + its API) behind a
// signed session cookie. No user table, no third-party auth — just Avni.
export async function middleware(request) {
  const { pathname } = request.nextUrl;

  const isPublic = pathname === "/dashboard/login" || pathname.startsWith("/api/dashboard/login");
  if (isPublic) return NextResponse.next();

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (await isValidSessionToken(token)) return NextResponse.next();

  if (pathname.startsWith("/api/dashboard")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/dashboard/login", request.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/dashboard/:path*"],
};
