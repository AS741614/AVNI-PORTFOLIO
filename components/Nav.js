import Link from "next/link";
import { SITE } from "@/lib/config";

const links = [
  { href: "/", label: "Home" },
  { href: "/stories", label: "Stories" },
  { href: "/videos", label: "Videos" },
  { href: "/about", label: "About" },
  { href: "/work-with-me", label: "Work with me" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b" style={{ borderColor: "var(--line)", background: "rgba(251,247,240,0.85)", backdropFilter: "blur(8px)" }}>
      <nav className="container-x flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 font-medium text-lg">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full text-sm" style={{ background: "var(--amber-soft)", color: "var(--amber)" }}>
            🍀
          </span>
          {SITE.name}
        </Link>
        <div className="flex items-center gap-5 text-sm" style={{ color: "var(--muted)" }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hidden sm:inline hover:text-[var(--ink)] transition-colors">
              {l.label}
            </Link>
          ))}
          <a
            href={SITE.youtube.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-4 py-1.5 text-sm font-medium text-white"
            style={{ background: "var(--ink)", color: "#fff" }}
          >
            Subscribe
          </a>
        </div>
      </nav>
    </header>
  );
}
