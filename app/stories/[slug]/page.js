import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE } from "@/lib/config";
import { getStories, getStory } from "@/lib/youtube";
import StoryCard from "@/components/StoryCard";
import Newsletter from "@/components/Newsletter";

export async function generateStaticParams() {
  const stories = await getStories();
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const story = await getStory(slug);
  if (!story) return {};
  return {
    title: story.displayTitle || story.title,
    description:
      story.article?.metaDescription || story.description?.slice(0, 155),
    keywords: story.article?.tags,
    openGraph: { images: story.thumbnail ? [story.thumbnail] : [] },
  };
}

function formatDate(d) {
  try {
    return new Date(d).toLocaleDateString("en-IE", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return "";
  }
}

export default async function StoryPage({ params }) {
  const { slug } = await params;
  const story = await getStory(slug);
  if (!story) notFound();

  const all = await getStories();
  const related = all.filter((s) => s.slug !== slug).slice(0, 3);

  const headline = story.displayTitle || story.title;

  // VideoObject schema for rich SEO results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": story.videoId ? "VideoObject" : "Article",
    name: headline,
    headline,
    description: story.article?.metaDescription || story.description,
    uploadDate: story.published,
    thumbnailUrl: story.thumbnail ? [story.thumbnail] : undefined,
  };

  return (
    <article className="container-x py-12 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Link href="/stories" className="text-sm" style={{ color: "var(--amber)" }}>
        ← All stories
      </Link>

      <h1 className="font-serif-display text-3xl sm:text-4xl leading-tight mt-4 mb-2">
        {headline}
      </h1>
      {story.article?.dek && (
        <p className="text-lg mb-3" style={{ color: "var(--muted)" }}>
          {story.article.dek}
        </p>
      )}
      <p className="text-sm mb-8" style={{ color: "var(--muted)" }}>
        {formatDate(story.published)}
      </p>

      {/* Embedded video */}
      <div
        className="aspect-video w-full rounded-2xl overflow-hidden mb-8"
        style={{ background: "var(--amber-soft)", border: "2px solid var(--ink)", boxShadow: "4px 4px 0 var(--ink)" }}
      >
        {story.videoId ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${story.videoId}`}
            title={story.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl" style={{ color: "var(--amber)" }}>
            ▶
          </div>
        )}
      </div>

      {/* Written article — AI-generated from the video for SEO when available */}
      <div className="prose-content text-[17px] leading-8" style={{ color: "var(--ink)" }}>
        {story.article?.body
          ? story.article.body
              .split("\n")
              .filter((l) => l.trim())
              .map((line, i) =>
                line.startsWith("## ") ? (
                  <h2 key={i} className="font-serif-display text-2xl mt-8 mb-3">
                    {line.replace(/^##\s+/, "")}
                  </h2>
                ) : (
                  <p key={i} className="mb-4">{line.replace(/^#+\s+/, "")}</p>
                )
              )
          : story.description
          ? story.description.split("\n").filter(Boolean).map((p, i) => (
              <p key={i} className="mb-4">{p}</p>
            ))
          : <p style={{ color: "var(--muted)" }}>The written version is on its way — honestly, the video says it better anyway. Hit play above.</p>}

        {story.article?.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-8">
            {story.article.tags.map((t) => (
              <span key={t} className="text-xs rounded-full px-3 py-1" style={{ background: "var(--amber-soft)", color: "var(--amber)" }}>
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="card-pop mt-10 p-5 flex items-center justify-between gap-3" style={{ background: "var(--yellow)" }}>
        <p className="text-sm font-bold">Like this? Subscribe for the next one.</p>
        <a href={SITE.youtube.url} target="_blank" rel="noopener noreferrer" className="btn-pop !py-1.5 !px-4">
          ▶ Subscribe
        </a>
      </div>

      {/* Related */}
      <div className="mt-14">
        <h2 className="text-xl font-medium mb-5">Keep reading</h2>
        <div className="grid gap-5 sm:grid-cols-3">
          {related.map((s) => (
            <StoryCard key={s.id} story={s} />
          ))}
        </div>
      </div>

      <div className="mt-14">
        <Newsletter />
      </div>
    </article>
  );
}
