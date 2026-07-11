import Link from "next/link";

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
    <Link
      href={`/stories/${story.slug}`}
      className="group block rounded-2xl overflow-hidden border transition-transform hover:-translate-y-1"
      style={{ borderColor: "var(--line)", background: "#fff" }}
    >
      <div className="aspect-video w-full overflow-hidden" style={{ background: "var(--amber-soft)" }}>
        {story.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={story.thumbnail}
            alt={story.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl" style={{ color: "var(--amber)" }}>
            ▶
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium leading-snug mb-1">{story.displayTitle || story.title}</h3>
        <p className="text-xs" style={{ color: "var(--muted)" }}>
          Story · {formatDate(story.published)}
        </p>
        {(story.summary || story.description) && (
          <p className="text-sm mt-2 line-clamp-2" style={{ color: "var(--muted)" }}>
            {story.summary || story.description}
          </p>
        )}
      </div>
    </Link>
  );
}
