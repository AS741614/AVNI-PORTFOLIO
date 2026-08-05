import Link from "next/link";
import { PlayIcon } from "@/components/icons";

function formatDate(d) {
  try {
    return new Date(d).toLocaleDateString("en-IE", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export default function StoryCard({ story }) {
  return (
    <Link href={`/stories/${story.slug}`} className="card-pop group block overflow-hidden">
      <div className="relative">
        <div
          className="aspect-video w-full overflow-hidden"
          style={{ borderBottom: "2px solid var(--ink)", background: "var(--amber-soft)" }}
        >
          {story.thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={story.thumbnail}
              alt={story.title}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center halftone" style={{ color: "var(--red)" }}>
              <PlayIcon size={36} />
            </div>
          )}
        </div>
        <span className="sticker absolute -bottom-3 left-4">{formatDate(story.published)}</span>
      </div>
      <div className="p-4 pt-5">
        <h3 className="font-bold leading-snug mb-1">{story.displayTitle || story.title}</h3>
        {(story.summary || story.description) && (
          <p className="text-sm mt-1 line-clamp-2" style={{ color: "var(--muted)" }}>
            {story.summary || story.description}
          </p>
        )}
      </div>
    </Link>
  );
}
