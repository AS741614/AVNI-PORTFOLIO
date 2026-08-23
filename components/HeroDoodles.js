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

// Mobile-only icons (visible below sm, hidden from sm up — the desktop sets
// below use "hidden sm:block" etc., so the two layers never double up).
// Small (18-22px) and placed only in the real empty gaps of the stacked
// mobile layout — verified against actual screenshots at 320-414px, never
// over the headline, paragraph, buttons, or video/orbit content.
const MOBILE_HOME = [
  { style: { top: "5%", left: "4%" }, rotate: -10, fx: "drift", d: "6.2s", amp: "10px", node: <CameraDoodle size={20} /> },
  { style: { top: "4%", right: "5%" }, rotate: 8, fx: "bob", d: "5.4s", delay: ".4s", amp: "9px", node: <CloudDoodle size={20} /> },
  { style: { top: "14%", right: "4%" }, rotate: -8, fx: "pulse", d: "4.1s", delay: ".9s", amp: "1.16", node: <StarDoodle size={18} /> },
  { style: { top: "35%", right: "4%" }, rotate: 11, fx: "sway", d: "5.6s", delay: ".2s", node: <SparkleDoodle size={20} /> },
  { style: { top: "49%", right: "4%" }, rotate: -9, fx: "bob", d: "4.7s", delay: "1.2s", amp: "8px", node: <HeartDoodle size={18} /> },
  { style: { top: "68%", left: "4%" }, rotate: 7, fx: "sway", d: "6.1s", delay: ".7s", node: <MusicDoodle size={18} /> },
  { style: { top: "68%", right: "4%" }, rotate: -12, fx: "drift", d: "6.6s", delay: "1.5s", amp: "9px", node: <ButterflyDoodle size={20} /> },
];

const MOBILE_ABOUT = [
  { style: { top: "1%", left: "4%" }, rotate: -9, fx: "sway", d: "5.6s", node: <SparkleDoodle size={20} /> },
  { style: { top: "1%", right: "5%" }, rotate: 10, fx: "pulse", d: "4.3s", delay: ".6s", amp: "1.18", node: <StarDoodle size={18} /> },
  { style: { top: "21%", right: "4%" }, rotate: -7, fx: "bob", d: "4.9s", delay: "1.1s", amp: "8px", node: <HeartDoodle size={18} /> },
  { style: { top: "47%", left: "3%" }, rotate: 9, fx: "drift", d: "6.4s", delay: ".3s", amp: "10px", node: <ButterflyDoodle size={20} /> },
];

// Home hero: copy on the left, video on the right. Icons fill the outer
// margins, the gap between columns, and the band under the buttons.
const HOME = [
  { cls: "hidden lg:block", style: { top: "13%", left: "4%" }, rotate: -11, fx: "drift", d: "6.4s", amp: "16px", node: <ButterflyDoodle size={38} /> },
  { cls: "hidden sm:block", style: { top: "10%", right: "5%" }, rotate: 8, fx: "drift", d: "6.9s", delay: ".4s", amp: "18px", node: <PlaneDoodle size={42} /> },
  { cls: "hidden lg:block", style: { top: "18%", left: "47%" }, rotate: -13, fx: "pulse", d: "3.9s", delay: ".9s", amp: "1.25", node: <SparkleDoodle size={30} /> },
  { cls: "hidden xl:block", style: { top: "5%", left: "27%" }, rotate: 6, fx: "drift", d: "7.3s", delay: "1.8s", amp: "14px", node: <CloudDoodle size={34} /> },
  { cls: "hidden xl:block", style: { top: "41%", left: "8.5%" }, rotate: 9, fx: "bob", d: "5.1s", delay: ".6s", amp: "19px", node: <FlowerDoodle size={32} /> },
  { cls: "hidden lg:block", style: { top: "44%", right: "2%" }, rotate: -9, fx: "sway", d: "5.4s", delay: "1.1s", node: <SunglassesDoodle size={34} /> },
  { cls: "hidden xl:block", style: { top: "7%", right: "28%" }, rotate: 5, fx: "sway", d: "6.6s", delay: "2.1s", node: <RainbowDoodle size={30} /> },
  { cls: "hidden lg:block", style: { bottom: "25%", left: "44%" }, rotate: 11, fx: "bob", d: "4.7s", delay: ".2s", amp: "20px", node: <HeartDoodle size={26} /> },
  { cls: "hidden lg:block", style: { bottom: "21%", left: "2.5%" }, rotate: -6, fx: "pulse", d: "4.3s", delay: "1.3s", amp: "1.22", node: <StarDoodle size={28} /> },
  { cls: "hidden xl:block", style: { bottom: "18%", right: "6%" }, rotate: -4, fx: "pulse", d: "4.5s", delay: ".7s", amp: "1.18", node: <CameraDoodle size={30} /> },
  { cls: "hidden sm:block", style: { bottom: "5%", left: "19%" }, rotate: 10, fx: "sway", d: "5.7s", delay: ".3s", node: <IceCreamDoodle size={34} /> },
  { cls: "hidden md:block", style: { bottom: "9%", left: "34%" }, rotate: -8, fx: "bob", d: "6.1s", delay: "1.6s", amp: "15px", node: <MusicDoodle size={28} /> },
  { cls: "hidden lg:block", style: { bottom: "8%", left: "50%" }, rotate: -7, fx: "pulse", d: "4.1s", delay: "1.4s", amp: "1.2", node: <SmileyDoodle size={26} /> },
  { cls: "hidden xl:block", style: { bottom: "6%", left: "6%" }, rotate: 12, fx: "sway", d: "6.2s", delay: ".95s", node: <HandbagDoodle size={30} /> },
];

// About hero: the orbit scene fills the left column and the video the right,
// so these sit in the page margins, the column gap, and the bands above and
// below the video — never over the scene or the frame.
const ABOUT = [
  { cls: "hidden lg:block", style: { top: "20%", left: "2.5%" }, rotate: -9, fx: "drift", d: "6.6s", amp: "16px", node: <ButterflyDoodle size={38} /> },
  { cls: "hidden xl:block", style: { bottom: "27%", left: "4%" }, rotate: 7, fx: "pulse", d: "4.4s", delay: "1.2s", amp: "1.22", node: <StarDoodle size={28} /> },
  { cls: "hidden xl:block", style: { bottom: "8%", left: "1.5%" }, rotate: -12, fx: "sway", d: "6.2s", delay: ".9s", node: <HandbagDoodle size={30} /> },
  { cls: "hidden lg:block", style: { top: "13%", left: "49.5%" }, rotate: -13, fx: "pulse", d: "3.9s", delay: ".5s", amp: "1.25", node: <SparkleDoodle size={30} /> },
  { cls: "hidden lg:block", style: { bottom: "13%", left: "50.5%" }, rotate: 10, fx: "bob", d: "6.1s", delay: "1.7s", amp: "17px", node: <MusicDoodle size={28} /> },
  { cls: "hidden xl:block", style: { top: "5%", right: "30%" }, rotate: 6, fx: "drift", d: "7.3s", delay: "1.9s", amp: "14px", node: <CloudDoodle size={34} /> },
  { cls: "hidden sm:block", style: { top: "13%", right: "2%" }, rotate: 9, fx: "drift", d: "6.8s", delay: ".3s", amp: "18px", node: <PlaneDoodle size={42} /> },
  { cls: "hidden lg:block", style: { top: "47%", right: "0.8%" }, rotate: -8, fx: "sway", d: "5.4s", delay: "1.1s", node: <SunglassesDoodle size={34} /> },
  { cls: "hidden lg:block", style: { bottom: "17%", right: "3%" }, rotate: 11, fx: "bob", d: "4.7s", delay: ".2s", amp: "20px", node: <HeartDoodle size={26} /> },
  { cls: "hidden md:block", style: { bottom: "5%", right: "26%" }, rotate: -7, fx: "pulse", d: "4.2s", delay: "1.5s", amp: "1.2", node: <SmileyDoodle size={26} /> },
  { cls: "hidden sm:block", style: { bottom: "2%", right: "13%" }, rotate: 10, fx: "sway", d: "5.8s", delay: ".7s", node: <IceCreamDoodle size={34} /> },
  { cls: "hidden xl:block", style: { top: "4%", right: "46%" }, rotate: -6, fx: "bob", d: "5.2s", delay: "1.35s", amp: "18px", node: <FlowerDoodle size={32} /> },
  { cls: "hidden xl:block", style: { bottom: "9%", right: "41%" }, rotate: 5, fx: "sway", d: "6.5s", delay: "2.1s", node: <RainbowDoodle size={30} /> },
  { cls: "hidden xl:block", style: { top: "4%", right: "9%" }, rotate: -5, fx: "pulse", d: "4.6s", delay: ".8s", amp: "1.18", node: <CameraDoodle size={30} /> },
];

// Scattered, independently-animated icons. Each position has its own x AND y
// so they never line up into rows, columns or edge clusters; the denser ones
// only appear once the viewport is wide enough to have room.
export default function HeroDoodles({ variant = "home" }) {
  const desktop = variant === "about" ? ABOUT : HOME;
  const mobile = variant === "about" ? MOBILE_ABOUT : MOBILE_HOME;
  return (
    <>
      {mobile.map(({ style, rotate, fx, d, delay, amp, node }, i) => (
        <Float key={`m${i}`} className="block sm:hidden" style={style} rotate={rotate} fx={fx} d={d} delay={delay} amp={amp}>
          {node}
        </Float>
      ))}
      {desktop.map(({ cls, style, rotate, fx, d, delay, amp, node }, i) => (
        <Float key={`d${i}`} className={cls} style={style} rotate={rotate} fx={fx} d={d} delay={delay} amp={amp}>
          {node}
        </Float>
      ))}
    </>
  );
}
