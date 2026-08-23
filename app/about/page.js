import { SITE } from "@/lib/config";
import { getStories } from "@/lib/youtube";
import Newsletter from "@/components/Newsletter";
import VideoSlideshow from "@/components/VideoSlideshow";
import AboutHeroScene from "@/components/AboutHeroScene";
import HeroDoodles from "@/components/HeroDoodles";
import { Starburst, PlayIcon } from "@/components/icons";
import {
  Doodle,
  InlineDoodle,
  HeartDoodle,
  SparkleDoodle,
  FlowerDoodle,
  BoltDoodle,
  ShamrockDoodle,
  RainbowDoodle,
} from "@/components/Doodles";

const BASE = "https://avniinireland.com";

export const metadata = {
  title: "About",
  description:
    "From Aligarh to Dublin — the story behind Avni in Ireland: computer-science engineer, MSc Data Analytics at NCI, Data Analyst at permanent tsb, creator, and one very big Indian wedding back home in India.",
  alternates: { canonical: `${BASE}/about` },
  openGraph: {
    title: "About · Avni in Ireland",
    description:
      "Aligarh to Dublin: the full story — the career switch, the move, the job, and the wedding.",
    url: `${BASE}/about`,
    type: "profile",
    images: ["/opengraph-image"],
  },
};

// ProfilePage is the type Google supports specifically for creator/person
// profiles — it anchors this page as *the* canonical description of the Person
// entity declared site-wide in the root layout.
const profileJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${BASE}/about#profilepage`,
      url: `${BASE}/about`,
      name: "About Avni",
      isPartOf: { "@id": `${BASE}/#site` },
      mainEntity: { "@id": `${BASE}/#avni` },
      about: { "@id": `${BASE}/#avni` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE },
        { "@type": "ListItem", position: 2, name: "About", item: `${BASE}/about` },
      ],
    },
  ],
};

function Chapter({ title, doodle, children }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-2xl mb-3" style={{ fontFamily: "var(--font-display)" }}>
        {title}
        {doodle && <InlineDoodle rotate={-8}>{doodle}</InlineDoodle>}
      </h2>
      <div className="text-[17px] leading-8 space-y-4" style={{ color: "var(--ink)" }}>{children}</div>
    </section>
  );
}

const facts = [
  "Aligarh → Dublin",
  "B.Tech CS, Amity",
  "MSc Data Analytics, NCI",
  "Analyst at PTSB",
  "Married 02.02.2026",
  "Filming since 2025",
];

export default async function AboutPage() {
  const stories = await getStories();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }} />

      {/* ── Full-width hero band, dotted grid behind everything ── */}
      <section className="relative overflow-hidden" style={{ borderBottom: "2px solid var(--ink)" }}>
        <div className="halftone-red absolute inset-0" aria-hidden="true" />
        <HeroDoodles variant="about" />
        <div className="container-x py-10 sm:py-14 relative">
          <h1 className="font-display text-4xl sm:text-5xl mb-8" style={{ fontFamily: "var(--font-display)" }}>
            Hi, I'm <span className="marker">Avni</span>
            <InlineDoodle rotate={10}>
              <FlowerDoodle size={32} />
            </InlineDoodle>
          </h1>

          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div className="order-2 lg:order-1">
              <AboutHeroScene />
            </div>
            <div className="order-1 lg:order-2">
              <div
                className="relative flex items-center justify-center py-6"
                style={{ transform: "translateX(10%)" }}
              >
                <Starburst width={667} height={375} className="absolute" style={{ transform: "rotate(8deg)" }} />
                <VideoSlideshow stories={stories} />
              </div>
            </div>
          </div>

          {/* Quick facts sticker strip */}
          <div className="flex flex-wrap gap-3 mt-10">
            {facts.map((f, i) => (
              <span key={f} className={`sticker ${i % 3 === 0 ? "sticker-yellow" : ""}`} style={{ transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)` }}>
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Article body ── */}
      <div className="container-x py-12 max-w-2xl">

      <Chapter title="It starts in Aligarh">
        <p>
          I grew up in Aligarh, Uttar Pradesh — a DPS Aligarh kid, science and maths, exam timetables taped above the
          desk. Then a B.Tech in Computer Science at Amity University, Noida, and into the corporate current: Magic
          Software first, then two years at HCL Technologies. On paper, a perfectly sensible Indian career. But
          somewhere between the standups and the commutes, a quiet thought kept getting louder:{" "}
          <em>there's a whole world out there, and I haven't seen any of it.</em>
        </p>
      </Chapter>

      <Chapter title="The conversation">
        <p>
          Here's the part I want to say honestly — especially to the girls reading this. In India, parents worry, and
          they worry about daughters most of all. It comes from love, but sometimes love holds you tightly enough that
          it starts to feel like a knot. I've felt it too, at more than one stage of my life.
        </p>
        <p>
          So I didn't rebel, and I didn't go quiet. I sat my parents down and talked — about the Master's, about
          Ireland, about the life I could see for myself. It took patience, and more than one conversation. But I
          believe this with my whole heart: no parent actually wants their child's wishes to go unfulfilled — they just
          need to see that you've thought it through and that you'll take care of yourself. That part is on us. Show
          them the plan, then do the work. Mine listened, and then they backed me all the way — and making them proud
          became the best reason to give this everything I have.
        </p>
      </Chapter>

      {/* Pull-quote */}
      <div className="card-pop p-6 my-10 text-center relative" style={{ background: "var(--yellow)" }}>
        <Doodle style={{ top: "-1rem", right: "1.5rem" }} rotate={12} float={false}>
          <span className="diecut">
            <SparkleDoodle size={18} />
          </span>
        </Doodle>
        <p className="font-script text-3xl leading-snug" style={{ fontFamily: "var(--font-script)" }}>
          Believe in yourself, <span className="marker-red">do the work</span>, and let the results catch up.
        </p>
      </div>

      <Chapter title="The Dublin chapter" doodle={<ShamrockDoodle size={24} />}>
        <p>
          I moved to Dublin for a Master's in Data Analytics at NCI. I packed for a degree. Nobody warned me about
          two-hour sunsets, cliff edges in Donegal, or how a country this rainy could feel this warm.
        </p>
        <p>
          I started filming so I wouldn't forget the small stuff — the first solo grocery run, missing home during
          festivals nobody around me had heard of, the exact moment Ireland stopped feeling foreign. Somewhere between
          a study-abroad diary and a full personality, this channel happened.
        </p>
      </Chapter>

      <Chapter title="The plot twist nobody expects" doodle={<BoltDoodle size={24} />}>
        <p>
          I'm not a full-time creator. Since October 2024 I've been a Data Analyst at permanent tsb — dashboards by
          day, storyboards by night. Every video on this site was made around a real job, which is exactly why the
          videos look like real life. If you're building something on the side of a full plate: it's possible. Tiring,
          occasionally ridiculous, completely possible.
        </p>
      </Chapter>

      <Chapter title="Then came February 2nd" doodle={<HeartDoodle size={24} />}>
        <p>
          On 2 February 2026, I married Akash — back home in India, the full production: Haldi, Varmala, Saat Pheras,
          and relatives appearing from every direction. Those videos became some of the most-watched on this channel.
          Funny thing — I flew home to get married, and it gave my "Indian in Ireland" story its most Indian chapter
          yet.
        </p>
      </Chapter>

      <Chapter title="What's next" doodle={<SparkleDoodle size={24} />}>
        <p>
          Around here you'll find Ireland travel, honest international-student life, married-life updates, and the
          occasional concert — Atif Aslam played Dublin, and obviously I was there. Diljit Dosanjh is next on the
          list, and yes, the camera is coming along. Stay close.
        </p>
      </Chapter>

      <Chapter title="A note before you go" doodle={<RainbowDoodle size={26} />}>
        <p>
          If you take one thing from this page, take this: you can do the thing. Study abroad, switch careers, start
          the channel, book the flight — whatever your version is. Believe in yourself and do the work without
          gripping the results too hard. Some results will be bad; those are the ones that teach you, and you'll
          change — not for anyone else, but into a better version of yourself. Look after your health and your sleep
          like they're part of the plan, because they are. And talk to your people — dreams travel further when
          someone's cheering for you.
        </p>
      </Chapter>

      <div className="mt-10 flex flex-wrap gap-3">
        <a href={SITE.youtube.url} target="_blank" rel="noopener noreferrer" className="btn-pop">
          <PlayIcon size={14} /> Subscribe
        </a>
        <a href={SITE.instagram.url} target="_blank" rel="noopener noreferrer" className="btn-pop-ghost">
          Follow on Instagram
        </a>
      </div>

        <div className="mt-12">
          <Newsletter />
        </div>
      </div>
    </>
  );
}
