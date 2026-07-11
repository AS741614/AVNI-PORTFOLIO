import { SITE } from "@/lib/config";

export const metadata = {
  title: "Work with me",
  description: "Brand partnerships and collaborations with Avni in Ireland.",
};

const offerings = [
  { icon: "🎥", title: "Sponsored videos", desc: "Dedicated or integrated placements woven naturally into a vlog." },
  { icon: "📸", title: "Instagram content", desc: "Reels, stories, and posts to your brief." },
  { icon: "🤝", title: "Brand ambassadorships", desc: "Longer-term partnerships with authentic, ongoing coverage." },
  { icon: "✈️", title: "Travel & experiences", desc: "Destination, hospitality, and experience collaborations." },
];

export default function WorkWithMePage() {
  return (
    <div className="container-x py-12 max-w-3xl">
      <h1 className="font-serif-display text-4xl mb-3">Work with me</h1>
      <p className="text-lg mb-10" style={{ color: "var(--muted)" }}>
        I partner with brands I genuinely love. Here's how we can work together.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 mb-12">
        {offerings.map((o) => (
          <div key={o.title} className="rounded-2xl border p-5" style={{ borderColor: "var(--line)", background: "#fff" }}>
            <div className="text-2xl mb-2">{o.icon}</div>
            <p className="font-medium mb-1">{o.title}</p>
            <p className="text-sm" style={{ color: "var(--muted)" }}>{o.desc}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl p-8 text-center" style={{ background: "var(--warm)" }}>
        <p className="font-serif-display text-2xl mb-2">Let's collaborate</p>
        <p className="text-sm mb-5" style={{ color: "var(--muted)" }}>
          Send a note with your brand and campaign idea — I'll get back to you.
        </p>
        <a
          href={`mailto:${SITE.email}?subject=Collaboration with ${SITE.name}`}
          className="inline-block rounded-full px-6 py-3 text-sm font-medium text-white"
          style={{ background: "var(--ink)", color: "#fff" }}
        >
          ✉ {SITE.email}
        </a>
      </div>
    </div>
  );
}
