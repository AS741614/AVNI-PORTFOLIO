import { getStories } from "@/lib/youtube";
import StoryCard from "@/components/StoryCard";
import { SITE } from "@/lib/config";
import { InlineDoodle, BoltDoodle } from "@/components/Doodles";

export const metadata = {
  title: "Videos",
  description: "Watch the latest videos from Avni in Ireland.",
};

export default async function VideosPage() {
  const stories = await getStories();
  return (
    <div className="container-x py-12">
      <div className="flex items-center justify-between mb-2 gap-3 flex-wrap">
        <h1 className="font-display text-4xl" style={{ fontFamily: "var(--font-display)" }}>
          Just the videos
          <InlineDoodle rotate={-8}>
            <BoltDoodle size={28} />
          </InlineDoodle>
        </h1>
        <a href={SITE.youtube.url} target="_blank" rel="noopener noreferrer" className="btn-pop">
          ▶ Subscribe
        </a>
      </div>
      <p className="mb-8" style={{ color: "var(--muted)" }}>
        No reading required. Tap play, thumb through, repeat.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stories.map((s) => (
          <StoryCard key={s.id} story={s} />
        ))}
      </div>
    </div>
  );
}
