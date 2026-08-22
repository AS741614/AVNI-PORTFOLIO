// Bold 2.5px-stroke line icons — the pop-art replacement for emoji icons.
function Base({ children, size = 24, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function PlayIcon(props) {
  return (
    <Base {...props}>
      <polygon points="6 4 20 12 6 20 6 4" fill="currentColor" stroke="none" />
    </Base>
  );
}

export function VideoIcon(props) {
  return (
    <Base {...props}>
      <rect x="2" y="6" width="13" height="12" rx="2" />
      <path d="M15 10l7-4v12l-7-4" />
    </Base>
  );
}

export function CameraIcon(props) {
  return (
    <Base {...props}>
      <path d="M3 8h3l2-3h8l2 3h3v11H3z" />
      <circle cx="12" cy="13" r="3.5" />
    </Base>
  );
}

export function StarIcon(props) {
  return (
    <Base {...props}>
      <polygon points="12 2 15 8.5 22 9.3 17 14 18.3 21 12 17.7 5.7 21 7 14 2 9.3 9 8.5 12 2" />
    </Base>
  );
}

export function PlaneIcon(props) {
  return (
    <Base {...props}>
      <path d="M22 2L11 13" />
      <path d="M22 2l-7 20-4-9-9-4 20-7z" />
    </Base>
  );
}

export function MailIcon(props) {
  return (
    <Base {...props}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 7l10 6L22 7" />
    </Base>
  );
}

export function InstagramIcon(props) {
  return (
    <Base {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.5" fill="currentColor" stroke="none" />
    </Base>
  );
}

export function CompassIcon(props) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="9.5" />
      <polygon points="15.5 8.5 13.5 13.5 8.5 15.5 10.5 10.5 15.5 8.5" />
    </Base>
  );
}

export function BriefcaseIcon(props) {
  return (
    <Base {...props}>
      <rect x="2.5" y="7.5" width="19" height="13" rx="2" />
      <path d="M8.5 7.5V5a1.5 1.5 0 0 1 1.5-1.5h4A1.5 1.5 0 0 1 15.5 5v2.5M2.5 13h19" />
    </Base>
  );
}

export function MenuIcon(props) {
  return (
    <Base {...props}>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </Base>
  );
}

export function CloseIcon(props) {
  return (
    <Base {...props}>
      <path d="M5 5l14 14M19 5L5 19" />
    </Base>
  );
}

// Comic starburst — for badges and the hero backdrop.
export function Starburst({ size = 220, width, height, fill = "var(--yellow)", ...props }) {
  const w = width ?? size;
  const h = height ?? size;
  const ar = h / w;

  // The spike geometry is generated elliptically (radii scaled per axis) and
  // the viewBox is scaled to match, so a wide burst renders under a *uniform*
  // scale. Squashing a square burst with preserveAspectRatio="none" instead
  // would flatten the spikes and thicken the outline on one axis.
  const points = [];
  const spikes = 14;
  const cy = 50 * ar;
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? 50 : 34;
    const a = (Math.PI * i) / spikes;
    points.push(`${50 + r * Math.sin(a)},${cy - r * ar * Math.cos(a)}`);
  }

  return (
    <svg
      width={w}
      height={h}
      viewBox={`-4 ${-4 * ar} 108 ${108 * ar}`}
      aria-hidden="true"
      {...props}
    >
      <polygon points={points.join(" ")} fill={fill} stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
