import { SITE } from "@/lib/config";
import { getInstagramPosts } from "@/lib/instagram";
import { InstagramIcon } from "@/components/icons";
import { Doodle, RainbowDoodle } from "@/components/Doodles";

// Auto-pulls recent posts via the Instagram Graph API once a token is set
// (see lib/instagram.js + docs/INSTAGRAM_SETUP.md). Until then, this section
// is archived — no placeholder tiles pretending to be a live feed, just a
// follow prompt. It reactivates on its own the moment real posts come back.
export default async function InstagramStrip() {
  const posts = await getInstagramPosts(5);
  const hasPosts = posts.length > 0;

  return (
    <section className="container-x relative" style={{ marginTop: "2rem" }}>
      <Doodle className="hidden md:block" style={{ top: "-1.4rem", right: "22%" }} rotate={-6}>
        <RainbowDoodle size={34} />
      </Doodle>
      <div className="flex items-center justify-between mb-2 gap-3 flex-wrap">
        <h2 className="font-display text-2xl" style={{ fontFamily: "var(--font-display)" }}>
          Meanwhile, on Instagram
        </h2>
        <a
          href={SITE.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-bold"
          style={{ color: "var(--red)" }}
        >
          Follow {SITE.instagram.handle} →
        </a>
      </div>

      {hasPosts ? (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
          {posts.map((p) => (
            <a
              key={p.id}
              href={p.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="card-pop aspect-square overflow-hidden block !rounded-2xl"
              title={p.caption?.slice(0, 80)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.image}
                alt={p.caption?.slice(0, 80) || "Instagram post"}
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </a>
          ))}
        </div>
      ) : (
        <a
          href={SITE.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="card-pop flex items-center gap-3 p-5"
          style={{ background: "var(--yellow)" }}
        >
          <InstagramIcon size={26} />
          <p className="text-sm font-bold">
            The feed lives on Instagram for now — tap through to see it.
          </p>
        </a>
      )}
    </section>
  );
}
