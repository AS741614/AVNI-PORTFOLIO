import { SITE } from "@/lib/config";
import { getSiteStats } from "@/lib/siteStats";
import { InlineDoodle, SparkleDoodle } from "@/components/Doodles";
import {
  VideoIcon,
  CameraIcon,
  StarIcon,
  PlaneIcon,
  MailIcon,
  CompassIcon,
  BriefcaseIcon,
  Starburst,
} from "@/components/icons";

export const metadata = {
  title: "Work with me",
  description:
    "Brand partnerships, student mentoring, and small-business consulting with Avni in Ireland — plus the collaborators I build with.",
};

// Stats come from data/site-stats.json, editable via /dashboard — re-read
// every request instead of freezing at build time.
export const dynamic = "force-dynamic";

const offerings = [
  { Icon: VideoIcon, title: "Sponsored videos", desc: "Dedicated or integrated placements woven naturally into a vlog." },
  { Icon: CameraIcon, title: "Instagram content", desc: "Reels, stories, and posts to your brief." },
  { Icon: StarIcon, title: "Brand ambassadorships", desc: "Longer-term partnerships with authentic, ongoing coverage." },
  { Icon: PlaneIcon, title: "Travel & experiences", desc: "Destination, hospitality, and experience collaborations." },
  {
    Icon: CompassIcon,
    title: "Student mentoring",
    desc: "Coming to Ireland? Book a 1:1 session with me — jobs, accommodation, cost of living, college life, and career advice for what comes after. I did the move; you get the map.",
    cta: { href: SITE.topmate, label: "Book a 1:1 on Topmate" },
  },
  {
    Icon: BriefcaseIcon,
    title: "Business & tech consulting",
    desc: "For small businesses: I consult on your tech side, connect you with the right professionals, and arrange the technical team to build it — together with my partners at EBM Corporation.",
    cta: { href: `mailto:${SITE.email}?subject=Business consulting enquiry`, label: "Start a conversation" },
  },
];

function formatCount(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K`;
  return String(n);
}

const collaborators = [
  {
    name: "EBM Corporation",
    url: "https://www.ebmcorporation.com/",
    tag: "builds businesses",
    desc: "A technology and consulting company that builds businesses instead of writing strategy decks — custom software, AI-powered platforms, and modernization for small businesses that don't have (or need) a big full-time tech team. This is who I team up with when a business needs real builders.",
  },
  {
    name: "PhotosSense",
    url: "https://photossense.com/",
    tag: "event photos that deliver themselves",
    desc: "An AI-powered photo platform for photographers, studios, and event teams: guests find their photos with a selfie (AI face search), galleries carry the photographer's own branding, and beat-synced highlight reels generate themselves. Privacy-first, EU-hosted, GDPR-compliant — built in-house by EBM.",
  },
];

export default function WorkWithMePage() {
  const siteStats = getSiteStats();
  const stats = [
    { value: formatCount(siteStats.subscribers), label: "subscribers" },
    { value: formatCount(siteStats.followers), label: "followers" },
    { value: siteStats.topRegion, label: "top audience" },
  ];

  return (
    <div className="container-x py-12 max-w-3xl">
      <h1 className="font-display text-4xl mb-3" style={{ fontFamily: "var(--font-display)" }}>
        Work with me
        <InlineDoodle rotate={10}>
          <SparkleDoodle size={28} />
        </InlineDoodle>
      </h1>
      <p className="text-lg mb-10" style={{ color: "var(--muted)" }}>
        I sit between two audiences most brands can't reach in one place: international students building lives
        abroad, and the Indian diaspora looking for a piece of home. My best content blends both — Ireland through an
        Indian lens, with the energy of a Short and the trust of a diary. And since I'm a data analyst by day, yes: I
        actually read my own analytics.
      </p>

      {/* Stats row */}
      <div className="flex flex-wrap justify-center sm:justify-between gap-4 mb-12">
        {stats.map((s) => (
          <div key={s.label} className="relative flex items-center justify-center" style={{ width: 170, height: 170 }}>
            <Starburst size={170} className="absolute inset-0" />
            <div className="relative text-center px-7">
              <p
                className="font-display leading-tight"
                style={{ fontFamily: "var(--font-display)", fontSize: s.value.length > 6 ? "1.05rem" : "1.5rem" }}
              >
                {s.value}
              </p>
              <p className="text-[11px] font-bold uppercase tracking-wide mt-1">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 mb-14">
        {offerings.map((o) => (
          <div key={o.title} className="card-pop p-5 flex flex-col">
            <div className="mb-3" style={{ color: "var(--red)" }}>
              <o.Icon size={28} />
            </div>
            <p className="font-bold mb-1">{o.title}</p>
            <p className="text-sm" style={{ color: "var(--muted)" }}>{o.desc}</p>
            {o.cta && (
              <a
                href={o.cta.href}
                target={o.cta.href.startsWith("http") ? "_blank" : undefined}
                rel={o.cta.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="btn-pop-ghost !py-1.5 !px-4 text-xs mt-4 self-start"
              >
                {o.cta.label}
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Collaborators */}
      <div className="flex items-center gap-3 mb-2 flex-wrap">
        <h2 className="font-display text-2xl" style={{ fontFamily: "var(--font-display)" }}>
          Who I build with
        </h2>
        <span className="sticker sticker-yellow">and future partners</span>
      </div>
      <p className="text-sm mb-6 max-w-lg" style={{ color: "var(--muted)" }}>
        The collaborators behind the consulting side of my work — and an open seat for the next one.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 mb-14">
        {collaborators.map((c) => (
          <a
            key={c.name}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className="card-pop p-5 block relative"
          >
            <span className="sticker absolute -top-3 right-4">{c.tag}</span>
            <p className="font-display text-lg mb-2 mt-1" style={{ fontFamily: "var(--font-display)" }}>
              {c.name}
            </p>
            <p className="text-sm mb-3" style={{ color: "var(--muted)" }}>{c.desc}</p>
            <span className="text-sm font-bold" style={{ color: "var(--red)" }}>
              Visit {c.name.split(" ")[0].toLowerCase()} →
            </span>
          </a>
        ))}

        {/* Future collaboration invite */}
        <div className="card-pop halftone p-5 sm:col-span-2 text-center" style={{ background: "var(--yellow)" }}>
          <p className="font-display text-xl mb-1" style={{ fontFamily: "var(--font-display)" }}>
            This row has room
          </p>
          <p className="text-sm mb-4 max-w-lg mx-auto">
            Building for students, travellers, photographers, or the desi community? Or just want an honest
            creator-partner with an analyst's brain? The next card here could be yours.
          </p>
          <a href={`mailto:${SITE.email}?subject=Future collaboration`} className="btn-pop !py-1.5 !px-5 text-xs">
            <MailIcon size={13} /> Pitch a collaboration
          </a>
        </div>
      </div>

      <div className="card-pop halftone p-8 text-center" style={{ background: "var(--yellow)" }}>
        <p className="font-display text-2xl mb-2" style={{ fontFamily: "var(--font-display)" }}>
          Let's make something loud
        </p>
        <p className="text-sm mb-6">
          One email with your brand and the idea. Short pitches welcome — I make Shorts, after all.
        </p>
        <a href={`mailto:${SITE.email}?subject=Collaboration with ${SITE.name}`} className="btn-pop">
          <MailIcon size={15} /> {SITE.email}
        </a>
        <p className="font-script text-lg mt-3" style={{ fontFamily: "var(--font-script)" }}>
          usually replying between edits
        </p>
      </div>
    </div>
  );
}
