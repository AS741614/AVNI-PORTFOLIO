// Uses the Web Crypto API (not node:crypto) so this works in both the
// Node.js runtime (API routes) and the Edge runtime (middleware).
export const SESSION_COOKIE = "avni_dashboard_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function secret() {
  return process.env.DASHBOARD_SESSION_SECRET || process.env.DASHBOARD_PASSWORD || "dev-only-secret";
}

async function hmacKey() {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
}

async function sign(value) {
  const key = await hmacKey();
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return Array.from(new Uint8Array(mac))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Constant-time-ish string compare (no early exit on length mismatch either).
function safeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string") return false;
  const len = Math.max(a.length, b.length, 1);
  let diff = a.length === b.length ? 0 : 1;
  for (let i = 0; i < len; i++) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return diff === 0;
}

export async function createSessionToken() {
  const expires = Date.now() + MAX_AGE_SECONDS * 1000;
  const payload = String(expires);
  return `${payload}.${await sign(payload)}`;
}

export async function isValidSessionToken(token) {
  if (!token) return false;
  const [payload, mac] = token.split(".");
  if (!payload || !mac) return false;
  const expected = await sign(payload);
  if (!safeEqual(mac, expected)) return false;
  return Number(payload) > Date.now();
}

export function checkPassword(candidate) {
  const real = process.env.DASHBOARD_PASSWORD;
  if (!real) return false; // no password configured — dashboard stays locked
  return safeEqual(String(candidate || ""), real);
}

export const SESSION_MAX_AGE = MAX_AGE_SECONDS;
