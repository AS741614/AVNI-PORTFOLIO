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

// Every small pop-art icon on the site, one of each.
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

// Jittered grid: the plane is divided into even cells (one per icon, so
// coverage is guaranteed equal), then each icon is nudged within its own
// cell by a random amount. That's what keeps it from reading as either a
// rigid grid or a clustered mess — every icon owns its own patch of space,
// but no two land in a predictable spot.
// Computed once at module load (this file only ever renders client-side,
// after the user opens the drawer, so there's no SSR/hydration mismatch to
// worry about) — stable for the session, reshuffles on a full page reload.
function buildLayout() {
  // Two narrow side strips (left ~2-10%, right ~90-98%) hugging the drawer
  // edges only — the nav links are centred and "Work with me" is wide
  // enough that even a generous margin gets close on a 320px screen, so
  // icons are kept strictly in the outer strips, never in the 10-90% band
  // where text can land. Small icon size keeps each one's own footprint
  // inside its strip too, so nothing ever touches a letter.
  const columns = [6, 94]; // % from left, jittered ±4 below
  const rowsPerCol = ICONS.length / columns.length; // 9
  const cellH = 100 / rowsPerCol;
  const items = [];
  let i = 0;
  for (const baseX of columns) {
    for (let r = 0; r < rowsPerCol; r++) {
      const Icon = ICONS[i % ICONS.length];
      const baseY = cellH * r + cellH / 2;
      const fx = FX[i % FX.length];
      items.push({
        Icon,
        left: `${(baseX + rand(-4, 4)).toFixed(1)}%`,
        top: `${(baseY + rand(-cellH * 0.3, cellH * 0.3)).toFixed(1)}%`,
        rotate: rand(-16, 16).toFixed(1),
        size: Math.round(rand(18, 26)),
        fx,
        d: `${rand(3.6, 6.6).toFixed(1)}s`,
        delay: `${rand(0, 2).toFixed(2)}s`,
        amp: fx === "pulse" ? rand(1.1, 1.22).toFixed(2) : `${Math.round(rand(6, 14))}px`,
      });
      i++;
    }
  }
  return items;
}

const LAYOUT = buildLayout();

// Fills the mobile nav drawer with the full icon set in a jittered grid —
// evenly spread, never clustered. Sits behind the centred nav links.
// Exclusive to the mobile drawer (the desktop nav never renders this).
export default function MobileNavDoodles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }} aria-hidden="true">
      {LAYOUT.map(({ Icon, left, top, rotate, size, fx, d, delay, amp }, i) => (
        <span key={i} className="doodle" style={{ left, top, transform: `translate(-50%, -50%) rotate(${rotate}deg)` }}>
          <span className={`fx fx-${fx}`} style={{ display: "block", "--d": d, "--delay": delay, "--amp": amp }}>
            <Icon size={size} />
          </span>
        </span>
      ))}
    </div>
  );
}
