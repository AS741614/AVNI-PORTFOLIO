import Link from "next/link";
import { SITE } from "@/lib/config";
import { getStories } from "@/lib/youtube";
import StoryCard from "@/components/StoryCard";
import Newsletter from "@/components/Newsletter";
import InstagramStrip from "@/components/InstagramStrip";

export default async function Home() {
  const stories = await getStories();
  const usingSample = stories[0]?.sample;

  return (
    <>
      {/* Hero */}
      <section style={{ background: "var(--warm)" }}>
        <div className="container-x py-16 sm:py-20 grid gap-10 sm:grid-cols-[1.3fr_1fr] items-center">
          <div>
            <p className="text-sm font-medium mb-3" style={{ color: "var(--amber)" }}>
              {SITE.tagline}
            </p>
            <h1 className="font-serif-display text-3xl sm:text-5xl leading-tight mb-4">
              {SITE.intro}
            </h1>
            <p className="text-base mb-7 max-w-md" style={{ color: "var(--muted)" }}>
              {SITE.subIntro}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={SITE.youtube.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full px-5 py-2.5 text-sm font-medium text-white"
                style={{ background: "var(--ink)", color: "#fff" }}
              >
                ▶ Subscribe on YouTube
              </a>
              <a
                href={SITE.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full px-5 py-2.5 text-sm font-medium border"
                style={{ borderColor: "var(--ink)" }}
              >
                Follow on Instagram
              </a>
            </div>
          </div>
          <div className="aspect-square rounded-3xl border flex items-center justify-center text-5xl" style={{ borderColor: "var(--line)", background: "#fff", color: "var(--amber)" }}>
            🌿
          </div>
        </div>
      </section>

      {/* Latest stories — auto-synced from YouTube */}
      <section className="container-x mt-16">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-medium">Latest stories</h2>
          <span
            className="text-xs rounded-full px-3 py-1"
            style={{ background: "var(--amber-soft)", color: "var(--amber)" }}
          >
            ↻ auto-synced from YouTube
          </span>
        </div>

        {usingSample && (
          <p className="text-xs mb-5" style={{ color: "var(--muted)" }}>
            Showing sample stories. Add Avni's YouTube channel ID in{" "}
            <code>lib/config.js</code> to pull real videos automatically.
          </p>
        )}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stories.slice(0, 6).map((s) => (
            <StoryCard key={s.id} story={s} />
          ))}
        </div>

        <div className="mt-6">
          <Link href="/stories" className="text-sm font-medium" style={{ color: "var(--amber)" }}>
            See all stories →
          </Link>
        </div>
      </section>

      {/* Instagram */}
      <InstagramStrip />

      {/* Newsletter */}
      <section className="container-x mt-16">
        <Newsletter />
      </section>
    </>
  );
}
