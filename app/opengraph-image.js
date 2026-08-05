import { ImageResponse } from "next/og";
import { SITE } from "@/lib/config";

// Dynamic social-share card, rendered at build/request time. Applies to every
// route that doesn't define its own (story pages override it with the real
// YouTube thumbnail). Deliberately uses layout + colour rather than a custom
// webfont: Satori would need the font binary fetched at runtime, which can
// fail inside the container — the pop-art palette carries the brand instead.
export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#ffffff",
          padding: "72px",
          position: "relative",
        }}
      >
        {/* Poster-red bar down the left edge */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "28px",
            background: "#e4002b",
          }}
        />

        {/* Sticker-style eyebrow */}
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            background: "#ffd23f",
            border: "4px solid #131313",
            borderRadius: "999px",
            padding: "10px 28px",
            fontSize: 30,
            fontWeight: 700,
            color: "#131313",
            marginBottom: 34,
          }}
        >
          {SITE.tagline}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 82,
            fontWeight: 900,
            color: "#131313",
            lineHeight: 1.08,
            letterSpacing: "-2px",
            maxWidth: "900px",
          }}
        >
          {SITE.intro}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "#5b5b5b",
            marginTop: 30,
            maxWidth: "820px",
            lineHeight: 1.35,
          }}
        >
          Ireland travel · international-student life · desi culture
        </div>

        {/* Footer row: name chip + handle */}
        <div style={{ display: "flex", alignItems: "center", marginTop: 46 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 62,
              height: 62,
              borderRadius: "999px",
              background: "#e4002b",
              border: "4px solid #131313",
              color: "#ffffff",
              fontSize: 34,
              fontWeight: 900,
              marginRight: 22,
            }}
          >
            A
          </div>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700, color: "#131313" }}>
            avniinireland.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
