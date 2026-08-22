import {
  Blob,
  RotatingGlobe,
  FlightPlane,
  PlaneSticker,
  SailboatSticker,
  MountainSticker,
  PalmSticker,
  SunHatSticker,
  MapSticker,
  CameraSticker,
  SuitcaseSticker,
  BookSticker,
  CompassSticker,
  QuestionMarks,
  DashArrow,
} from "@/components/TravelStickers";

const BOX = { w: 500, h: 500 };

// An object on a colour blob.
function Sticker({ children, blob, size = 84, tilt = 0 }) {
  return (
    <div style={{ position: "relative", width: size, height: size, transform: `rotate(${tilt}deg)` }}>
      {blob && <Blob color={blob} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />}
      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>{children}</div>
    </div>
  );
}

// A ring of icons slowly circling the Earth. The ring element rotates; each
// icon counter-rotates at the same duration so it orbits while staying
// upright, and carries a gentle bob of its own on top.
function OrbitRing({ radius, duration, dir = "cw", items }) {
  const spin = dir === "cw" ? "orbit-cw" : "orbit-ccw";
  const counter = dir === "cw" ? "orbit-ccw" : "orbit-cw";

  return (
    <div className={spin} style={{ position: "absolute", inset: 0, "--d": duration }}>
      {items.map(({ angle, size = 84, blob, tilt = 0, fx = "bob", d = "5s", delay = "0s", amp, node }, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            marginLeft: -size / 2,
            marginTop: -size / 2,
            // place at `angle` on the ring, then undo that rotation so the
            // icon itself starts upright
            transform: `rotate(${angle}deg) translateY(${-radius}px) rotate(${-angle}deg)`,
          }}
        >
          <div className={counter} style={{ "--d": duration }}>
            <div className={`fx fx-${fx}`} style={{ "--d": d, "--delay": delay, ...(amp && { "--amp": amp }) }}>
              <Sticker blob={blob} size={size} tilt={tilt}>
                {node}
              </Sticker>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Two counter-rotating orbits at different radii and speeds, so the icons
// never settle into a fixed ring. The plane sits above everything.
const INNER = [
  { angle: 22, size: 76, blob: "var(--lav)", tilt: -6, fx: "bob", d: "5.8s", amp: "14px", node: <MountainSticker size={46} /> },
  { angle: 109, size: 76, blob: "var(--mint)", tilt: 8, fx: "sway", d: "6.4s", delay: ".7s", node: <BookSticker size={46} /> },
  { angle: 196, size: 76, blob: "var(--sky)", tilt: -7, fx: "pulse", d: "4.9s", delay: "1.3s", amp: "1.14", node: <CameraSticker size={46} /> },
  { angle: 292, size: 76, blob: "var(--peach)", tilt: 6, fx: "bob", d: "5.3s", delay: ".4s", amp: "16px", node: <MapSticker size={46} /> },
];

const OUTER = [
  { angle: 38, blob: "var(--peach)", tilt: 7, fx: "sway", d: "5.6s", delay: ".2s", node: <SailboatSticker size={52} /> },
  { angle: 127, blob: "var(--blush)", tilt: -5, fx: "bob", d: "4.6s", delay: "1.1s", amp: "18px", node: <PalmSticker size={52} /> },
  { angle: 214, blob: "var(--butter)", tilt: 9, fx: "sway", d: "6.8s", delay: ".9s", node: <SunHatSticker size={52} /> },
  { angle: 305, blob: "var(--mint)", tilt: -8, fx: "drift", d: "7.2s", delay: ".5s", amp: "13px", node: <PlaneSticker size={52} /> },
];

export default function AboutHeroScene() {
  return (
    <div className="w-full flex justify-center overflow-hidden">
      <div className="hero-scene-box" aria-hidden="true">
        {/* Earth, dead centre */}
        <div style={{ position: "absolute", left: BOX.w / 2 - 100, top: BOX.h / 2 - 100, width: 200, height: 200, zIndex: 1 }}>
          <RotatingGlobe size={200} />
        </div>

        {/* Icons orbiting the Earth — opposite directions, different speeds */}
        <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
          <OrbitRing radius={132} duration="95s" dir="cw" items={INNER} />
          <OrbitRing radius={202} duration="140s" dir="ccw" items={OUTER} />
        </div>

        {/* Airliner flies in front of everything */}
        <div className="plane-flight" style={{ position: "absolute", left: 0, top: 0, zIndex: 30, "--d": "24s" }}>
          <FlightPlane size={46} />
        </div>

        {/* Static hand-drawn accents, out past the orbits in the corners */}
        <div className="absolute fx fx-pulse" style={{ left: 10, top: 8, zIndex: 3, "--d": "3.7s", "--delay": ".4s", "--amp": "1.25" }}>
          <QuestionMarks size={34} />
        </div>
        <div className="absolute fx fx-sway" style={{ left: 446, top: 8, zIndex: 3, "--d": "5.5s", "--delay": "1.2s" }}>
          <CompassSticker size={44} />
        </div>
        <div className="absolute fx fx-drift" style={{ left: 8, top: 452, zIndex: 3, "--d": "6.9s", "--delay": ".8s" }}>
          <DashArrow size={38} color="var(--lav)" />
        </div>
        <div className="absolute fx fx-bob" style={{ left: 432, top: 428, zIndex: 3, "--d": "5.1s", "--delay": "1.7s", "--amp": "15px" }}>
          <Sticker blob="var(--blush)" size={60} tilt={-9}>
            <SuitcaseSticker size={38} />
          </Sticker>
        </div>
      </div>
    </div>
  );
}
