import { SITE } from "@/lib/config";
import { getInstagramPosts } from "@/lib/instagram";

// Auto-pulls recent posts via the Instagram Graph API once a token is set
// (see lib/instagram.js + docs/INSTAGRAM_SETUP.md). Until then, shows tiles.
const tints = ["#f6ead7", "#e7efe1", "#f7e4e4", "#e6eef6", "#efe7f6"];

export default async function InstagramStrip() {
  const posts = await getInstagramPosts(5);
  const hasPosts = posts.length > 0;

  return (
    <section className="container-x mt-16">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium">From Instagram</h2>
        <a
          href={SITE.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium"
          style={{ color: "var(--amber)" }}
        >
          Follow {SITE.instagram.handle} →
        </a>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
        {hasPosts
          ? posts.map((p) => (
              <a
                key={p.id}
                href={p.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-square rounded-2xl overflow-hidden block"
                title={p.caption?.slice(0, 80)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt={p.caption?.slice(0, 80) || "Instagram post"}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </a>
            ))
          : tints.map((t, i) => (
              <a
                key={i}
                href={SITE.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-square rounded-2xl flex items-center justify-center text-xl"
                style={{ background: t, color: "var(--muted)" }}
                aria-label="Follow on Instagram"
              >
                ◳
              </a>
            ))}
      </div>
    </section>
  );
}
