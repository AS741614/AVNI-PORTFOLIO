"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/config";
import { MenuIcon, CloseIcon, PlayIcon } from "@/components/icons";

const links = [
  { href: "/", label: "Home" },
  { href: "/stories", label: "Stories" },
  { href: "/videos", label: "Videos" },
  { href: "/about", label: "About" },
  { href: "/guides", label: "Guides" },
  { href: "/faq", label: "FAQ" },
  { href: "/work-with-me", label: "Work with me" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-40"
      style={{ borderBottom: "2px solid var(--ink)", background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)" }}
    >
      <nav className="container-x flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-lg" onClick={() => setOpen(false)}>
          <span className="logo-sticker">A</span>
          {SITE.name}
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className="transition-colors hover:text-[var(--red)]"
                style={active ? { color: "var(--red)", boxShadow: "inset 0 -3px 0 var(--red)" } : { color: "var(--ink)" }}
              >
                {l.label}
              </Link>
            );
          })}
          <a href={SITE.youtube.url} target="_blank" rel="noopener noreferrer" className="btn-pop !py-1.5 !px-4">
            <PlayIcon size={13} /> Subscribe
          </a>
        </div>

        {/* Mobile: subscribe + hamburger */}
        <div className="flex lg:hidden items-center gap-3">
          <a href={SITE.youtube.url} target="_blank" rel="noopener noreferrer" className="btn-pop !py-1.5 !px-3.5 text-xs">
            <PlayIcon size={12} /> Subscribe
          </a>
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="p-1"
          >
            {open ? <CloseIcon size={26} /> : <MenuIcon size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile slide-down panel */}
      {open && (
        <div
          className="lg:hidden halftone"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            height: "calc(100vh - 4rem)",
            overflowY: "auto",
            backgroundColor: "var(--paper)",
            borderTop: "2px solid var(--ink)",
          }}
        >
          <div className="container-x py-8 flex flex-col gap-2">
            {links.map((l, i) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-3xl py-2"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: active ? "var(--red)" : "var(--ink)",
                    transform: `rotate(${i % 2 === 0 ? "-0.5" : "0.5"}deg)`,
                  }}
                >
                  {l.label}
                </Link>
              );
            })}
            <a
              href={SITE.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pop-ghost mt-6 self-start"
            >
              Follow on Instagram
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
