import Link from "next/link";
import { SITE } from "@/lib/config";
import { getStories } from "@/lib/youtube";
import StoryCard from "@/components/StoryCard";
import Newsletter from "@/components/Newsletter";
import InstagramStrip from "@/components/InstagramStrip";
import { PlayIcon, Starburst, CompassIcon } from "@/components/icons";
import {
  Doodle,
  HeartDoodle,
  SparkleDoodle,
  FlowerDoodle,
  PlaneDoodle,
  SmileyDoodle,
} from "@/components/Doodles";

export default async function Home() {
  const stories = await getStories();
  const usingSample = stories[0]?.sample;
  const heroThumb = stories[0]?.thumbnail;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-1/2 halftone-red hidden sm:block" aria-hidden="true" />
        <Doodle className="hidden sm:block" style={{ top: "9%", right: "4%" }} rotate={8}>
          <PlaneDoodle size={42} />
        </Doodle>
        <Doodle className="hidden lg:block" style={{ top: "14%", left: "51%" }} rotate={-12}>
          <SparkleDoodle size={30} />
        </Doodle>
        <Doodle className="hidden lg:block" style={{ bottom: "12%", left: "45%" }} rotate={10}>
          <HeartDoodle size={26} />
        </Doodle>
        <Doodle className="hidden sm:block" style={{ bottom: "8%", right: "42%" }} rotate={-8}>
          <SmileyDoodle size={26} />
        </Doodle>
        <div className="container-x py-16 sm:py-20 grid gap-10 sm:grid-cols-[1.3fr_1fr] items-center relative">
          <div>
            <span className="sticker sticker-yellow mb-4">{SITE.tagline}</span>
            <h1 className="font-display text-3xl sm:text-5xl mb-5 mt-3" style={{ fontFamily: "var(--font-display)" }}>
              {SITE.intro}
            </h1>
            <p className="text-base mb-7 max-w-md" style={{ color: "var(--muted)" }}>
              {SITE.subIntro}
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={SITE.youtube.url} target="_blank" rel="noopener noreferrer" className="btn-pop">
                <PlayIcon size={14} /> Subscribe on YouTube
              </a>
              <a href={SITE.instagram.url} target="_blank" rel="noopener noreferrer" className="btn-pop-ghost">
                Follow on Instagram
              </a>
            </div>
          </div>

          {/* Pop-art visual: latest video still in an outlined tilted frame over a starburst */}
          <div className="relative flex items-center justify-center py-6">
            <Starburst size={370} className="absolute" style={{ transform: "rotate(8deg)" }} />
            <div
              className="relative aspect-square w-64 sm:w-72 overflow-hidden rounded-2xl"
              style={{ border: "3px solid var(--ink)", boxShadow: "6px 6px 0 var(--ink)", transform: "rotate(2deg)", background: "#fff" }}
            >
              {heroThumb ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={heroThumb} alt="Latest video from Avni" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full halftone flex items-center justify-center" style={{ color: "var(--red)" }}>
                  <PlayIcon size={48} />
                </div>
              )}
            </div>
            <span className="sticker sticker-red absolute bottom-2 sm:bottom-4 right-2 sm:right-6" style={{ transform: "rotate(4deg)" }}>
              fresh from YouTube
            </span>
          </div>
        </div>
      </section>

      {/* Latest stories — auto-synced from YouTube */}
      <section className="container-x mt-16 relative">
        <Doodle className="hidden md:block" style={{ bottom: "0.25rem", right: "3%" }} rotate={8}>
          <FlowerDoodle size={34} />
        </Doodle>
        <div className="flex items-center justify-between mb-2 gap-3 flex-wrap">
          <h2 className="font-display text-2xl" style={{ fontFamily: "var(--font-display)" }}>
            Latest stories
          </h2>
          <span className="sticker">↻ auto-synced from YouTube</span>
        </div>
        <p className="text-sm mb-6 max-w-lg" style={{ color: "var(--muted)" }}>
          New video on YouTube? It's already here. Every upload becomes a story on its own — no reposting, no lag.
        </p>

        {usingSample && (
          <p className="text-xs mb-5" style={{ color: "var(--muted)" }}>
            Showing sample stories. Add Avni's YouTube channel ID in <code>lib/config.js</code> to pull real videos
            automatically.
          </p>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stories.slice(0, 6).map((s) => (
            <StoryCard key={s.id} story={s} />
          ))}
        </div>

        <div className="mt-8">
          <Link href="/stories" className="btn-pop-ghost">
            See all stories →
          </Link>
        </div>
      </section>

      {/* Instagram */}
      <InstagramStrip />

      {/* Work with me teaser: 1:1 booking + collaborator links */}
      <section className="container-x mt-16">
        <div className="card-pop halftone p-6 sm:p-8 relative" style={{ background: "var(--yellow)" }}>
          <Doodle style={{ top: "-1.1rem", right: "2.5rem" }} rotate={10} float={false}>
            <span className="diecut">
              <PlaneDoodle size={20} />
            </span>
          </Doodle>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h2 className="font-display text-2xl mb-2" style={{ fontFamily: "var(--font-display)" }}>
                Coming to Ireland?
              </h2>
              <p className="text-sm max-w-md" style={{ color: "var(--ink)" }}>
                Book a 1:1 session with me — jobs, accommodation, cost of living, college life, and what comes after.
                I did the move; you get the map.
              </p>
            </div>
            <a
              href={SITE.topmate}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pop !py-3 !px-6 whitespace-nowrap self-start"
            >
              <CompassIcon size={16} /> Book a 1:1 on Topmate
            </a>
          </div>

          <div
            className="mt-6 pt-6 flex flex-wrap items-center gap-x-6 gap-y-3"
            style={{ borderTop: "2px solid var(--ink)" }}
          >
            <span className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--muted)" }}>
              Who I build with
            </span>
            <a
              href="https://www.ebmcorporation.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold"
              style={{ color: "var(--red)" }}
            >
              EBM Corporation →
            </a>
            <a
              href="https://photossense.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold"
              style={{ color: "var(--red)" }}
            >
              PhotosSense →
            </a>
            <Link href="/work-with-me" className="text-sm font-bold sm:ml-auto" style={{ color: "var(--ink)" }}>
              See all ways to collaborate →
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container-x mt-16">
        <Newsletter />
      </section>
    </>
  );
}
