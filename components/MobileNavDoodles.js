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
const TEXT_BUFFER = 33; // px kept clear around every nav link / CTA
const CELL_ATTEMPTS = 20;

// Jittered grid: the panel is divided into one cell per icon (so coverage
// stays even, not clumped like plain random placement), then each icon is
// nudged to a random spot within its own cell — nudging retried a few times
// per cell against the real measured text boxes so nothing lands on text.
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
      const isClear = (x, y) => !textRects.some((r) => x > r.left && x < r.right && y > r.top && y < r.bottom);

      const cols = Math.max(1, Math.round(Math.sqrt((ICON_COUNT * w) / h)));
      const rows = Math.ceil(ICON_COUNT / cols);
      const cellW = w / cols;
      const cellH = h / rows;

      const items = [];
      let i = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (i >= ICON_COUNT) break;
          const cx0 = c * cellW, cy0 = r * cellH;
          let x, y, clear, attempts = 0;
          do {
            x = rand(cx0 + 14, cx0 + cellW - 14);
            y = rand(cy0 + 14, cy0 + cellH - 14);
            clear = isClear(x, y);
            attempts++;
          } while (!clear && attempts < CELL_ATTEMPTS);
          i++;
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
