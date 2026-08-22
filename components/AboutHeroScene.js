import {
  Doodle,
  GlobeDoodle,
  PlaneDoodle,
  HeartDoodle,
  SparkleDoodle,
  FlowerDoodle,
  ShamrockDoodle,
  RainbowDoodle,
  SmileyDoodle,
} from "@/components/Doodles";

// Purely decorative pop-art scene: a slowly spinning globe with a plane
// orbiting it, surrounded by floating doodles. Sits opposite the video
// slideshow on the About page. No text, no interaction — aria-hidden.
export default function AboutHeroScene() {
  return (
    <div className="relative flex items-center justify-center" style={{ height: 260 }} aria-hidden="true">
      <Doodle style={{ top: "0%", left: "8%" }} rotate={-10}>
        <FlowerDoodle size={28} />
      </Doodle>
      <Doodle style={{ top: "6%", right: "6%" }} rotate={12}>
        <HeartDoodle size={22} />
      </Doodle>
      <Doodle style={{ bottom: "8%", left: "2%" }} rotate={8}>
        <SparkleDoodle size={24} />
      </Doodle>
      <Doodle style={{ bottom: "0%", right: "10%" }} rotate={-8}>
        <RainbowDoodle size={28} />
      </Doodle>
      <Doodle style={{ top: "44%", left: "-2%" }} rotate={6}>
        <SmileyDoodle size={20} />
      </Doodle>
      <Doodle style={{ top: "42%", right: "-4%" }} rotate={-12}>
        <ShamrockDoodle size={22} />
      </Doodle>

      {/* Globe + orbiting plane */}
      <div className="relative" style={{ width: 130, height: 130 }}>
        <span className="globe-spin" style={{ display: "block", width: "100%", height: "100%" }}>
          <GlobeDoodle size={130} />
        </span>
        <div className="orbit-pivot" style={{ position: "absolute", inset: 0 }}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) translateY(-84px)",
            }}
          >
            <span className="orbit-counter" style={{ display: "block" }}>
              <PlaneDoodle size={26} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
