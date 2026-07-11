import Link from "next/link";
import { SITE } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="border-t mt-20" style={{ borderColor: "var(--line)" }}>
      <div className="container-x py-12 grid gap-8 sm:grid-cols-3">
        <div>
          <p className="font-medium text-lg mb-2">{SITE.name}</p>
          <p className="text-sm" style={{ color: "var(--muted)" }}>{SITE.tagline}</p>
        </div>
        <div className="text-sm flex flex-col gap-2" style={{ color: "var(--muted)" }}>
          <Link href="/stories">Stories</Link>
          <Link href="/videos">Videos</Link>
          <Link href="/about">About</Link>
          <Link href="/work-with-me">Work with me</Link>
        </div>
        <div className="text-sm flex flex-col gap-2" style={{ color: "var(--muted)" }}>
          <a href={SITE.youtube.url} target="_blank" rel="noopener noreferrer">YouTube</a>
          <a href={SITE.instagram.url} target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </div>
      </div>
      <div className="container-x pb-8 text-xs" style={{ color: "var(--muted)" }}>
        © {new Date().getFullYear()} {SITE.name}. Made with care in Ireland.
      </div>
    </footer>
  );
}
