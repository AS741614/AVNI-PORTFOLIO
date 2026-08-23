"use client";
import { useEffect, useState } from "react";
import {
  HeartDoodle,
  SparkleDoodle,
  FlowerDoodle,
  BoltDoodle,
  SmileyDoodle,
  ChaiDoodle,
  ShamrockDoodle,
  PlaneDoodle,
  GlobeDoodle,
  RainbowDoodle,
  ButterflyDoodle,
  IceCreamDoodle,
  SunglassesDoodle,
  StarDoodle,
  HandbagDoodle,
  CloudDoodle,
  MusicDoodle,
  CameraDoodle,
} from "@/components/Doodles";

// Every small pop-art icon on the site. Repeated (duplicates allowed) to
// fill the drawer densely.
const ICONS = [
  HeartDoodle,
  SparkleDoodle,
  FlowerDoodle,
  BoltDoodle,
  SmileyDoodle,
  ChaiDoodle,
  ShamrockDoodle,
  PlaneDoodle,
  GlobeDoodle,
  RainbowDoodle,
  ButterflyDoodle,
  IceCreamDoodle,
  SunglassesDoodle,
  StarDoodle,
  HandbagDoodle,
  CloudDoodle,
  MusicDoodle,
  CameraDoodle,
];

const FX = ["bob", "sway", "drift", "pulse"];

function rand(min, max) {
  return min + Math.random() * (max - min);
}

const ICON_COUNT = 30;
const TEXT_BUFFER = 18; // px kept clear around every nav link / CTA
const MAX_ATTEMPTS = 60;

// Scatters icons freely across the whole drawer — genuinely random, not a
// column grid — while measuring the real rendered position of every nav
// link and the Instagram button and rejecting any icon whose footprint
// would land on top of one. Icons can (and do) repeat; the only rule is
// "never touch text."
export default function MobileNavDoodles({ panelRef, textRef }) {
  const [layout, setLayout] = useState(null);

  useEffect(() => {
    const panel = panelRef.current;
    const textEl = textRef.current;
    if (!panel || !textEl) return;

    const raf = requestAnimationFrame(() => {
      const panelRect = panel.getBoundingClientRect();
      const w = panel.scrollWidth;
      const h = panel.scrollHeight;

      const textRects = Array.from(textEl.querySelectorAll("a")).map((el) => {
        const r = el.getBoundingClientRect();
        return {
          left: r.left - panelRect.left - TEXT_BUFFER,
          right: r.right - panelRect.left + TEXT_BUFFER,
          top: r.top - panelRect.top - TEXT_BUFFER,
          bottom: r.bottom - panelRect.top + TEXT_BUFFER,
        };
      });

      const items = [];
      for (let i = 0; i < ICON_COUNT; i++) {
        let x, y, clear, attempts = 0;
        do {
          x = rand(16, w - 16);
          y = rand(16, h - 16);
          clear = !textRects.some((r) => x > r.left && x < r.right && y > r.top && y < r.bottom);
          attempts++;
        } while (!clear && attempts < MAX_ATTEMPTS);
        if (!clear) continue;

        const Icon = ICONS[Math.floor(rand(0, ICONS.length))];
        const fx = FX[Math.floor(rand(0, FX.length))];
        items.push({
          Icon,
          left: x,
          top: y,
          rotate: rand(-18, 18).toFixed(1),
          size: Math.round(rand(22, 34)),
          fx,
          d: `${rand(3.6, 6.6).toFixed(1)}s`,
          delay: `${rand(0, 2).toFixed(2)}s`,
          amp: fx === "pulse" ? rand(1.1, 1.22).toFixed(2) : `${Math.round(rand(6, 14))}px`,
        });
      }
      setLayout({ items, w, h });
    });

    return () => cancelAnimationFrame(raf);
  }, [panelRef, textRef]);

  if (!layout) return null;

  return (
    <div
      className="absolute top-0 left-0 overflow-hidden pointer-events-none"
      style={{ width: layout.w, height: layout.h, zIndex: 0 }}
      aria-hidden="true"
    >
      {layout.items.map(({ Icon, left, top, rotate, size, fx, d, delay, amp }, i) => (
        <span
          key={i}
          className="doodle"
          style={{ left: `${left}px`, top: `${top}px`, transform: `translate(-50%, -50%) rotate(${rotate}deg)` }}
        >
          <span className={`fx fx-${fx}`} style={{ display: "block", "--d": d, "--delay": delay, "--amp": amp }}>
            <Icon size={size} />
          </span>
        </span>
      ))}
    </div>
  );
}
