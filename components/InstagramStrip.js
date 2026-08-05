import { SITE } from "@/lib/config";
import { getInstagramPosts } from "@/lib/instagram";
import { InstagramIcon } from "@/components/icons";
import { Doodle, RainbowDoodle } from "@/components/Doodles";

// Auto-pulls recent posts via the Instagram Graph API once a token is set
// (see lib/instagram.js + docs/INSTAGRAM_SETUP.md). Until then, shows tiles.
const tints = ["var(--yellow)", "#ffe3e8", "#e3e9ff", "#ffffff", "var(--yellow)"];

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
      {!hasPosts && (
        <p className="text-sm mb-5 max-w-lg" style={{ color: "var(--muted)" }}>
          The real feed lives on Instagram — tap any tile to jump over while these sync up.
        </p>
      )}

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
        {hasPosts
          ? posts.map((p) => (
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
            ))
          : tints.map((t, i) => (
              <a
                key={i}
                href={SITE.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-pop aspect-square flex items-center justify-center !rounded-2xl"
                style={{ background: t, color: "var(--ink)", transform: `rotate(${(i % 2 === 0 ? -1 : 1) * 1.5}deg)` }}
                aria-label="Follow on Instagram"
              >
                <InstagramIcon size={28} />
              </a>
            ))}
      </div>
    </section>
  );
}
