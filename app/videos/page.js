import { getStories } from "@/lib/youtube";
import StoryCard from "@/components/StoryCard";
import { SITE } from "@/lib/config";

export const metadata = {
  title: "Videos",
  description: "Watch the latest videos from Avni in Ireland.",
};

export default async function VideosPage() {
  const stories = await getStories();
  return (
    <div className="container-x py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif-display text-4xl">Videos</h1>
        <a
          href={SITE.youtube.url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full px-5 py-2 text-sm font-medium text-white"
          style={{ background: "var(--ink)", color: "#fff" }}
        >
          ▶ Subscribe
        </a>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stories.map((s) => (
          <StoryCard key={s.id} story={s} />
        ))}
      </div>
    </div>
  );
}
