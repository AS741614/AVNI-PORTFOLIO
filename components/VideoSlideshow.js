"use client";
import { useEffect, useState } from "react";
import { PlayIcon } from "@/components/icons";

const INTERVAL_MS = 4500;

// Auto-rotating slideshow of video thumbnails. Advances on its own; stops
// the moment a video is played, and stays stopped until "back to slideshow".
export default function VideoSlideshow({ stories }) {
  const slides = stories.filter((s) => s.videoId).slice(0, 8);
  const [index, setIndex] = useState(0);
  const [playingIndex, setPlayingIndex] = useState(null);

  useEffect(() => {
    if (playingIndex !== null || slides.length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, [playingIndex, slides.length]);

  if (slides.length === 0) return null;

  const active = slides[index];
  const isPlaying = playingIndex === index;

  return (
    <div
      className="aspect-video w-full max-w-[240px] sm:max-w-[26.6rem] lg:max-w-[29.9rem] rounded-2xl overflow-hidden relative"
      style={{ border: "3px solid var(--ink)", boxShadow: "6px 6px 0 var(--ink)", transform: "rotate(2deg)", background: "#fff" }}
    >
      {isPlaying ? (
        <>
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${active.videoId}?autoplay=1`}
            title={active.displayTitle || active.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <button
            onClick={() => setPlayingIndex(null)}
            className="sticker absolute top-3 left-3"
            style={{ cursor: "pointer" }}
          >
            ↺ back to slideshow
          </button>
        </>
      ) : (
        <div className="w-full h-full relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={active.videoId}
            src={active.thumbnail}
            alt={active.displayTitle || active.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => setPlayingIndex(index)}
            aria-label={`Play ${active.displayTitle || active.title}`}
            className="absolute inset-0 flex items-center justify-center transition-colors hover:bg-black/25"
            style={{ background: "rgba(0,0,0,0.15)" }}
          >
            <span
              className="flex items-center justify-center rounded-full"
              style={{ width: 56, height: 56, background: "var(--red)", color: "#fff", border: "2px solid var(--ink)" }}
            >
              <PlayIcon size={22} />
            </span>
          </button>
          <span className="sticker absolute bottom-3 right-4 pointer-events-none">tap to play</span>

          {slides.length > 1 && (
            <div className="absolute bottom-3 left-4 flex gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to video ${i + 1}`}
                  className="rounded-full"
                  style={{
                    width: 8,
                    height: 8,
                    background: i === index ? "var(--red)" : "rgba(255,255,255,0.75)",
                    border: "1px solid var(--ink)",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
