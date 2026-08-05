import Link from "next/link";
import { SITE } from "@/lib/config";
import { InlineDoodle, ChaiDoodle, ShamrockDoodle } from "@/components/Doodles";

export default function Footer() {
  return (
    <footer className="mt-20" style={{ borderTop: "2px solid var(--ink)" }}>
      <div className="container-x py-12 grid gap-8 sm:grid-cols-3">
        <div>
          <p className="font-medium text-lg mb-2">{SITE.name}</p>
          <p className="text-sm" style={{ color: "var(--muted)" }}>{SITE.tagline}</p>
        </div>
        <div className="text-sm flex flex-col gap-2" style={{ color: "var(--muted)" }}>
          <Link href="/stories">Stories</Link>
          <Link href="/videos">Videos</Link>
          <Link href="/about">About</Link>
          <Link href="/guides">Guides</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/work-with-me">Work with me</Link>
        </div>
        <div className="text-sm flex flex-col gap-2" style={{ color: "var(--muted)" }}>
          <a href={SITE.youtube.url} target="_blank" rel="noopener noreferrer">YouTube</a>
          <a href={SITE.instagram.url} target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </div>
      </div>
      <div className="container-x pb-8 text-xs" style={{ color: "var(--muted)" }}>
        © {new Date().getFullYear()} {SITE.name}. Made in Dublin, with chai and questionable wifi.
        <InlineDoodle rotate={-8}>
          <ChaiDoodle size={22} />
        </InlineDoodle>
        <InlineDoodle rotate={8}>
          <ShamrockDoodle size={20} />
        </InlineDoodle>
      </div>
    </footer>
  );
}
