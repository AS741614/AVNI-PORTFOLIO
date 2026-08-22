// Decorative pop-art doodles + die-cut stickers scattered around the site.
// Purely decorative: every instance is aria-hidden and pointer-events-none.

function Svg({ children, size = 28, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--ink)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function HeartDoodle({ size }) {
  return (
    <Svg size={size}>
      <path
        d="M12 20.5C7.5 16.5 3.5 13.4 3.5 9.5 3.5 7 5.4 5 7.9 5c1.6 0 3.1.9 4.1 2.4C13 5.9 14.5 5 16.1 5c2.5 0 4.4 2 4.4 4.5 0 3.9-4 7-8.5 11z"
        fill="var(--red)"
      />
    </Svg>
  );
}

export function SparkleDoodle({ size }) {
  return (
    <Svg size={size}>
      <path d="M12 2.5 13.8 9.2 20.5 11 13.8 12.8 12 19.5 10.2 12.8 3.5 11 10.2 9.2Z" fill="var(--yellow)" />
      <circle cx="19" cy="18.5" r="1.4" fill="var(--red)" stroke="none" />
    </Svg>
  );
}

export function FlowerDoodle({ size }) {
  return (
    <Svg size={size} strokeWidth="1.8">
      <g fill="#ffb3c2">
        <ellipse cx="12" cy="5.4" rx="2.6" ry="3.4" />
        <ellipse cx="12" cy="5.4" rx="2.6" ry="3.4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="5.4" rx="2.6" ry="3.4" transform="rotate(120 12 12)" />
        <ellipse cx="12" cy="5.4" rx="2.6" ry="3.4" transform="rotate(180 12 12)" />
        <ellipse cx="12" cy="5.4" rx="2.6" ry="3.4" transform="rotate(240 12 12)" />
        <ellipse cx="12" cy="5.4" rx="2.6" ry="3.4" transform="rotate(300 12 12)" />
      </g>
      <circle cx="12" cy="12" r="2.7" fill="var(--yellow)" />
    </Svg>
  );
}

export function BoltDoodle({ size }) {
  return (
    <Svg size={size}>
      <path d="M14 2 5 14h5l-2 8 11-12h-5l2-8z" fill="var(--cobalt)" />
    </Svg>
  );
}

export function SmileyDoodle({ size }) {
  return (
    <Svg size={size}>
      <circle cx="12" cy="12" r="9" fill="var(--yellow)" />
      <circle cx="8.8" cy="9.8" r="1.1" fill="var(--ink)" stroke="none" />
      <circle cx="15.2" cy="9.8" r="1.1" fill="var(--ink)" stroke="none" />
      <path d="M8 13.5c1.2 2.2 6.8 2.2 8 0" />
    </Svg>
  );
}

export function ChaiDoodle({ size }) {
  return (
    <Svg size={size}>
      <path d="M5.5 9.5h11l-1 7.7a2.5 2.5 0 0 1-2.5 2.3h-4a2.5 2.5 0 0 1-2.5-2.3z" fill="#fff" />
      <path d="M16.5 11h1.2a2.4 2.4 0 0 1 0 4.8h-1.8" />
      <path d="M9 6.2c-.5-.9.5-1.4 0-2.4M13 6.2c-.5-.9.5-1.4 0-2.4" />
      <path
        d="M11 12.2c-.9-.8-2.3-.2-2.3.9 0 1 1.4 1.9 2.3 2.5.9-.6 2.3-1.5 2.3-2.5 0-1.1-1.4-1.7-2.3-.9z"
        fill="var(--red)"
        stroke="none"
      />
    </Svg>
  );
}

export function ShamrockDoodle({ size }) {
  return (
    <Svg size={size} strokeWidth="1.8">
      <g fill="#2f9e44">
        <circle cx="12" cy="7.4" r="3" />
        <circle cx="8.2" cy="12.4" r="3" />
        <circle cx="15.8" cy="12.4" r="3" />
      </g>
      <path d="M12 12.5c0 3 .5 5.5 2 7.5" />
    </Svg>
  );
}

export function PlaneDoodle({ size }) {
  return (
    <Svg size={size}>
      <path d="M21 3 14.5 21l-4-8.5L2 8.5z" fill="#e3e9ff" />
      <path d="M21 3 10.5 12.5" />
      <path d="M2.5 17.5c2.5 2 5.5 1.6 7.5-.5" strokeDasharray="2.5 2.5" strokeWidth="1.6" />
    </Svg>
  );
}

export function GlobeDoodle({ size }) {
  return (
    <Svg size={size} strokeWidth="1.6">
      <circle cx="12" cy="12" r="9.5" fill="#cfe3ff" />
      <ellipse cx="12" cy="12" rx="4" ry="9.5" />
      <path d="M2.5 12h19" />
      <path d="M4 7.5c4.5 2 11.5 2 16 0" />
      <path d="M4 16.5c4.5-2 11.5-2 16 0" />
    </Svg>
  );
}

export function RainbowDoodle({ size }) {
  return (
    <Svg size={size} strokeWidth="2.4">
      <path d="M4 17a8 8 0 0 1 16 0" stroke="var(--red)" />
      <path d="M7 17a5 5 0 0 1 10 0" stroke="var(--yellow)" />
      <path d="M10 17a2 2 0 0 1 4 0" stroke="var(--cobalt)" />
    </Svg>
  );
}

// Positioned decoration: absolute, non-interactive, gently floating.
export function Doodle({ children, className = "", style = {}, rotate = 0, float = true }) {
  return (
    <span aria-hidden="true" className={`doodle ${className}`} style={{ ...style, transform: `rotate(${rotate}deg)` }}>
      <span className={float ? "doodle-float" : ""} style={{ display: "block" }}>
        {children}
      </span>
    </span>
  );
}

// Inline decoration: sits in the text flow (e.g. after a heading).
export function InlineDoodle({ children, rotate = 0, className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block align-middle ml-2 ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </span>
  );
}

// ── Extra scatter icons for the home hero ──────────────────────────────

export function ButterflyDoodle({ size }) {
  return (
    <Svg size={size} strokeWidth="1.7">
      <path d="M12 7C9 3 3 3.5 3.6 8.6 4.1 12.6 9 12.6 12 11Z" fill="#ff5c8a" />
      <path d="M12 7c3-4 9-3.5 8.4 1.6C19.9 12.6 15 12.6 12 11Z" fill="#ff5c8a" />
      <path d="M12 11c-2.4 1-5.8 1.5-6.3 4.4-.5 3 4 3.4 6.3-.4Z" fill="#a06cf5" />
      <path d="M12 11c2.4 1 5.8 1.5 6.3 4.4.5 3-4 3.4-6.3-.4Z" fill="#a06cf5" />
      <path d="M12 7v9" />
      <path d="M11.4 6.6 9.8 4M12.6 6.6 14.2 4" />
    </Svg>
  );
}

export function IceCreamDoodle({ size }) {
  return (
    <Svg size={size} strokeWidth="1.7">
      <path d="M8.6 13h6.8L12 21.5Z" fill="#ff8c42" />
      <circle cx="9.7" cy="10.4" r="3.3" fill="#ff5c8a" />
      <circle cx="14.3" cy="10.4" r="3.3" fill="#34d399" />
      <circle cx="12" cy="7.4" r="3.3" fill="var(--yellow)" />
    </Svg>
  );
}

export function SunglassesDoodle({ size }) {
  return (
    <Svg size={size} strokeWidth="1.7">
      <path d="M2.5 8.5h19" />
      <path d="M3.5 9h7.2v2.6a3.6 3.6 0 0 1-7.2 0Z" fill="#a06cf5" />
      <path d="M13.3 9h7.2v2.6a3.6 3.6 0 0 1-7.2 0Z" fill="#a06cf5" />
      <path d="M10.7 10.2c.8-.6 1.8-.6 2.6 0" />
    </Svg>
  );
}

export function StarDoodle({ size }) {
  return (
    <Svg size={size} strokeWidth="1.7">
      <path d="M12 2.8l2.7 5.9 6.5.7-4.9 4.4 1.4 6.4L12 17l-5.7 3.2 1.4-6.4-4.9-4.4 6.5-.7Z" fill="var(--yellow)" />
    </Svg>
  );
}

export function HandbagDoodle({ size }) {
  return (
    <Svg size={size} strokeWidth="1.7">
      <path d="M3.6 8.6h16.8L18.9 20H5.1Z" fill="#ff5c8a" />
      <path d="M8.7 8.6V6.8a3.3 3.3 0 0 1 6.6 0v1.8" />
      <path d="M3.6 12.6h16.8" strokeWidth="1.3" />
    </Svg>
  );
}

export function CloudDoodle({ size }) {
  return (
    <Svg size={size} strokeWidth="1.7">
      <path d="M6.6 17.5a4.1 4.1 0 0 1 .5-8.1 5.6 5.6 0 0 1 10.6 1.4 3.4 3.4 0 0 1-.2 6.7Z" fill="#cfe3ff" />
    </Svg>
  );
}

export function MusicDoodle({ size }) {
  return (
    <Svg size={size} strokeWidth="1.8">
      <path d="M9.4 17.6V5.9l9-2v11.6" />
      <circle cx="7.1" cy="17.8" r="2.5" fill="var(--red)" />
      <circle cx="16.1" cy="15.6" r="2.5" fill="var(--red)" />
    </Svg>
  );
}

export function CameraDoodle({ size }) {
  return (
    <Svg size={size} strokeWidth="1.7">
      <rect x="2.6" y="7.4" width="18.8" height="12.2" rx="2.4" fill="#3d9bff" />
      <path d="M8 7.4 9.4 4.8h5.2L16 7.4" fill="#3d9bff" />
      <circle cx="12" cy="13.5" r="4.1" fill="var(--paper)" />
      <circle cx="12" cy="13.5" r="2" fill="var(--cobalt)" />
    </Svg>
  );
}
