"use client";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/config";

// Sticky bottom bar that nudges visitors to subscribe (appears after scroll).
export default function SubscribeBar() {
  const [show, setShow] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (closed || !show) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50" style={{ borderTop: "2px solid var(--ink)", background: "var(--paper)" }}>
      <div className="container-x py-3 flex items-center justify-between gap-3">
        <p className="text-sm font-bold">
          Liking the chaos? There's more every week.
        </p>
        <div className="flex items-center gap-2">
          <a
            href={SITE.youtube.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pop !py-1.5 !px-4"
          >
            ▶ Subscribe
          </a>
          <button
            onClick={() => setClosed(true)}
            aria-label="Dismiss"
            className="text-lg px-2"
            style={{ color: "var(--muted)" }}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
