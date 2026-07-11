import { SITE } from "@/lib/config";
import Newsletter from "@/components/Newsletter";

export const metadata = {
  title: "About",
  description: "The story behind Avni in Ireland.",
};

export default function AboutPage() {
  return (
    <div className="container-x py-12 max-w-2xl">
      <h1 className="font-serif-display text-4xl mb-6">Hi, I'm Avni 🌿</h1>
      <div className="aspect-[16/9] rounded-2xl mb-8 flex items-center justify-center text-4xl" style={{ background: "var(--amber-soft)", color: "var(--amber)" }}>
        📷
      </div>
      <div className="text-[17px] leading-8 space-y-4" style={{ color: "var(--ink)" }}>
        <p>
          I moved to Ireland and started filming the everyday — the rainy mornings,
          the road trips, the small wins of building a life somewhere new. This is
          where all of that lives.
        </p>
        <p>
          {/* TODO: replace with Avni's real story */}
          Add Avni's real bio here: where she's from, why Ireland, what the channel
          is about, and what viewers can expect.
        </p>
      </div>

      <div className="mt-10 flex gap-3">
        <a href={SITE.youtube.url} target="_blank" rel="noopener noreferrer" className="rounded-full px-5 py-2.5 text-sm font-medium text-white" style={{ background: "var(--ink)", color: "#fff" }}>
          ▶ Subscribe
        </a>
        <a href={SITE.instagram.url} target="_blank" rel="noopener noreferrer" className="rounded-full px-5 py-2.5 text-sm font-medium border" style={{ borderColor: "var(--ink)" }}>
          Follow on Instagram
        </a>
      </div>

      <div className="mt-12">
        <Newsletter />
      </div>
    </div>
  );
}
