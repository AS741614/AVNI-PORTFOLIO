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

// One sticker: an object on a colour blob, with its own motion type, speed and
// delay so nothing in the scene moves in lockstep.
function Sticker({ children, blob, size = 84, fx = "bob", d = "5s", delay = "0s", amp, tilt = 0, left, top }) {
  return (
    <div className="absolute" style={{ left, top }} aria-hidden="true">
      <div className={`fx fx-${fx}`} style={{ "--d": d, "--delay": delay, ...(amp && { "--amp": amp }) }}>
        <div style={{ position: "relative", width: size, height: size, transform: `rotate(${tilt}deg)` }}>
          {blob && <Blob color={blob} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />}
          <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>{children}</div>
        </div>
      </div>
    </div>
  );
}

// Decorative travel scene: a turning Earth with an airliner flying one full
// circle then a figure-8 around it, ringed by pop-art travel stickers.
// Geometry is a fixed 440x400 box (the flight path is in px) — see
// .hero-scene-box in globals.css for the responsive down-scaling.
export default function AboutHeroScene() {
  return (
    <div className="w-full flex justify-center overflow-hidden">
      <div className="hero-scene-box" aria-hidden="true">
        {/* Earth, dead centre */}
        <div style={{ position: "absolute", left: 120, top: 100, width: 200, height: 200 }}>
          <RotatingGlobe size={200} />
        </div>

        {/* Airliner: circle around the globe, then a figure-8 */}
        <div className="plane-flight" style={{ position: "absolute", left: 0, top: 0, "--d": "24s" }}>
          <FlightPlane size={44} />
        </div>

        {/* Ring of travel stickers */}
        <Sticker blob="var(--mint)" fx="drift" d="6.5s" tilt={-8} left={178} top={18}>
          <PlaneSticker size={52} />
        </Sticker>

        <Sticker blob="var(--peach)" fx="sway" d="5.2s" delay=".7s" tilt={7} left={291} top={57}>
          <SailboatSticker size={52} />
        </Sticker>

        <Sticker blob="var(--blush)" fx="bob" d="4.4s" delay="1.1s" amp="24px" tilt={6} left={338} top={158}>
          <PalmSticker size={52} />
        </Sticker>

        <Sticker blob="var(--butter)" fx="sway" d="6.2s" delay=".5s" tilt={9} left={291} top={259}>
          <SunHatSticker size={52} />
        </Sticker>

        <Sticker blob="var(--peach)" fx="bob" d="5s" delay=".9s" amp="22px" tilt={-7} left={178} top={298}>
          <MapSticker size={52} />
        </Sticker>

        <Sticker blob="var(--mint)" fx="drift" d="7s" delay="1.6s" amp="20px" tilt={9} left={65} top={259}>
          <BookSticker size={52} />
        </Sticker>

        <Sticker blob="var(--sky)" fx="pulse" d="4.8s" delay="1.4s" amp="1.16" tilt={-6} left={18} top={158}>
          <CameraSticker size={52} />
        </Sticker>

        <Sticker blob="var(--lav)" fx="bob" d="5.8s" delay=".3s" amp="26px" tilt={-5} left={65} top={57}>
          <MountainSticker size={52} />
        </Sticker>

        {/* Smaller accents tucked between */}
        <Sticker blob="var(--blush)" size={62} fx="bob" d="4.2s" delay="2s" amp="18px" tilt={-10} left={4} top={332}>
          <SuitcaseSticker size={38} />
        </Sticker>

        <div className="absolute fx fx-sway" style={{ left: 390, top: 344, "--d": "5.5s", "--delay": "1.2s" }}>
          <CompassSticker size={44} />
        </div>
        <div className="absolute fx fx-pulse" style={{ left: 394, top: 10, "--d": "3.6s", "--delay": ".4s", "--amp": "1.25" }}>
          <QuestionMarks size={34} />
        </div>
        <div className="absolute fx fx-drift" style={{ left: 6, top: 12, "--d": "6.8s", "--delay": ".8s" }}>
          <DashArrow size={38} color="var(--lav)" />
        </div>
      </div>
    </div>
  );
}
