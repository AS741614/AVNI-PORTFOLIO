import {
  HeartDoodle,
  SparkleDoodle,
  FlowerDoodle,
  PlaneDoodle,
  SmileyDoodle,
  ButterflyDoodle,
  IceCreamDoodle,
  SunglassesDoodle,
  StarDoodle,
  HandbagDoodle,
  CloudDoodle,
  MusicDoodle,
  CameraDoodle,
  RainbowDoodle,
} from "@/components/Doodles";

// One floating icon. `.doodle` handles absolute placement + the static tilt;
// the inner span carries the motion, so the two transforms never fight.
function Float({ children, className = "", style, rotate = 0, fx = "bob", d = "5s", delay = "0s", amp }) {
  return (
    <span aria-hidden="true" className={`doodle ${className}`} style={{ ...style, transform: `rotate(${rotate}deg)` }}>
      <span
        className={`fx fx-${fx}`}
        style={{ display: "block", "--d": d, "--delay": delay, ...(amp && { "--amp": amp }) }}
      >
        {children}
      </span>
    </span>
  );
}

// Icons scattered irregularly across the hero — every position has its own
// x AND y so they never line up into rows, columns or edge clusters. They sit
// clear of the headline, the buttons and the video frame; the denser ones only
// appear once the viewport is wide enough to have room.
export default function HeroDoodles() {
  return (
    <>
      <Float className="hidden lg:block" style={{ top: "13%", left: "4%" }} rotate={-11} fx="drift" d="6.4s" amp="16px">
        <ButterflyDoodle size={38} />
      </Float>

      <Float className="hidden sm:block" style={{ top: "10%", right: "5%" }} rotate={8} fx="drift" d="6.9s" delay=".4s" amp="18px">
        <PlaneDoodle size={42} />
      </Float>

      <Float className="hidden lg:block" style={{ top: "18%", left: "47%" }} rotate={-13} fx="pulse" d="3.9s" delay=".9s" amp="1.25">
        <SparkleDoodle size={30} />
      </Float>

      <Float className="hidden xl:block" style={{ top: "5%", left: "27%" }} rotate={6} fx="drift" d="7.3s" delay="1.8s" amp="14px">
        <CloudDoodle size={34} />
      </Float>

      <Float className="hidden xl:block" style={{ top: "41%", left: "8.5%" }} rotate={9} fx="bob" d="5.1s" delay=".6s" amp="19px">
        <FlowerDoodle size={32} />
      </Float>

      <Float className="hidden lg:block" style={{ top: "44%", right: "2%" }} rotate={-9} fx="sway" d="5.4s" delay="1.1s">
        <SunglassesDoodle size={34} />
      </Float>

      <Float className="hidden xl:block" style={{ top: "7%", right: "28%" }} rotate={5} fx="sway" d="6.6s" delay="2.1s">
        <RainbowDoodle size={30} />
      </Float>

      <Float className="hidden lg:block" style={{ bottom: "25%", left: "44%" }} rotate={11} fx="bob" d="4.7s" delay=".2s" amp="20px">
        <HeartDoodle size={26} />
      </Float>

      <Float className="hidden lg:block" style={{ bottom: "21%", left: "2.5%" }} rotate={-6} fx="pulse" d="4.3s" delay="1.3s" amp="1.22">
        <StarDoodle size={28} />
      </Float>

      <Float className="hidden xl:block" style={{ bottom: "18%", right: "6%" }} rotate={-4} fx="pulse" d="4.5s" delay=".7s" amp="1.18">
        <CameraDoodle size={30} />
      </Float>

      <Float className="hidden sm:block" style={{ bottom: "5%", left: "19%" }} rotate={10} fx="sway" d="5.7s" delay=".3s">
        <IceCreamDoodle size={34} />
      </Float>

      <Float className="hidden md:block" style={{ bottom: "9%", left: "34%" }} rotate={-8} fx="bob" d="6.1s" delay="1.6s" amp="15px">
        <MusicDoodle size={28} />
      </Float>

      <Float className="hidden lg:block" style={{ bottom: "8%", left: "50%" }} rotate={-7} fx="pulse" d="4.1s" delay="1.4s" amp="1.2">
        <SmileyDoodle size={26} />
      </Float>

      <Float className="hidden xl:block" style={{ bottom: "6%", left: "6%" }} rotate={12} fx="sway" d="6.2s" delay=".95s">
        <HandbagDoodle size={30} />
      </Float>
    </>
  );
}
