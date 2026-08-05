import { getStories } from "@/lib/youtube";
import StoryCard from "@/components/StoryCard";
import { InlineDoodle, FlowerDoodle } from "@/components/Doodles";

export const metadata = {
  title: "Stories",
  description: "Every video and post from Avni in Ireland, collected as readable stories.",
};

export default async function StoriesPage() {
  const stories = await getStories();
  return (
    <div className="container-x py-12">
      <h1 className="font-display text-4xl mb-2" style={{ fontFamily: "var(--font-display)" }}>
        Stories
        <InlineDoodle rotate={10}>
          <FlowerDoodle size={28} />
        </InlineDoodle>
      </h1>
      <p className="mb-10" style={{ color: "var(--muted)" }}>
        Every new video lands here automatically — watch it, or read along.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stories.map((s) => (
          <StoryCard key={s.id} story={s} />
        ))}
      </div>
    </div>
  );
}
