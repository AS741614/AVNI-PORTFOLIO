// Travel-sticker illustrations for the About-page scene: bold, ink-outlined
// pop-art objects on saturated colour blobs. Purely decorative (aria-hidden).

function S({ children, size = 48, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
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

// Organic splotch behind an object.
export function Blob({ color = "var(--mint)", className = "", style = {} }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true" preserveAspectRatio="none">
      <path
        d="M52 5c19-2 37 11 42 29 5 19-5 39-22 48-17 9-40 7-52-6C8 63 3 41 11 25 18 11 33 7 52 5Z"
        fill={color}
      />
    </svg>
  );
}

export function PlaneSticker({ size }) {
  return (
    <S size={size}>
      <path d="M23 21 12 8h5.5l10.5 13Z" fill="var(--red)" />
      <path d="M23 29 15 42h5.5L30 29Z" fill="var(--red)" />
      <path d="M9 21 4 11h3.5l6 10Z" fill="var(--cobalt)" />
      <ellipse cx="24" cy="25" rx="18" ry="5" fill="var(--paper)" />
      <circle cx="18" cy="25" r="1.3" fill="var(--cobalt)" stroke="none" />
      <circle cx="24" cy="25" r="1.3" fill="var(--cobalt)" stroke="none" />
      <circle cx="30" cy="25" r="1.3" fill="var(--cobalt)" stroke="none" />
    </S>
  );
}

export function SailboatSticker({ size }) {
  return (
    <S size={size}>
      <path d="M24 5v29" />
      <path d="M26 8l13 24H26Z" fill="var(--yellow)" />
      <path d="M22 12 10 32h12Z" fill="var(--blush)" />
      <path d="M6 33h36l-5 9H11Z" fill="var(--paper)" />
      <path d="M9 42c3 2 6 2 9 0s6 2 9 0 6 2 9 0" stroke="var(--ocean)" strokeWidth="2" />
    </S>
  );
}

export function MountainSticker({ size }) {
  return (
    <S size={size}>
      <path d="M2 40 17 11l9 17 8-14 12 26Z" fill="var(--lav)" />
      <path d="M12 22h10l-5-11Z" fill="var(--paper)" />
      <path d="M29 22h9l-5-9Z" fill="var(--paper)" />
      <path d="M2 40h44" />
    </S>
  );
}

export function PalmSticker({ size }) {
  return (
    <S size={size}>
      <ellipse cx="24" cy="39" rx="19" ry="5.5" fill="var(--yellow)" />
      <path d="M18 39c0-9 1-14 3-19M31 39c0-8-1-12-2-16" strokeWidth="2.2" />
      <path d="M21 19c-6-5-11-5-14-2 4-1 9 0 12 4ZM21 19c-2-7-7-10-12-10 5 3 8 6 9 11ZM21 19c5-6 10-7 15-4-5 0-8 2-11 6Z" fill="var(--leaf)" />
      <path d="M29 23c-5-4-9-4-12-2 3 0 7 1 9 4ZM29 23c4-5 8-6 12-4-4 0-7 2-9 5Z" fill="var(--leaf)" />
      <circle cx="21" cy="20" r="1.9" fill="var(--red)" stroke="none" />
    </S>
  );
}

export function SunHatSticker({ size }) {
  return (
    <S size={size}>
      <ellipse cx="24" cy="31" rx="20" ry="7.5" fill="var(--lav)" />
      <path d="M12 30c0-8 5-14 12-14s12 6 12 14" fill="var(--lav)" />
      <path d="M12 28c8 3.5 16 3.5 24 0" stroke="var(--red)" strokeWidth="3" />
      <path d="M36 28c4 2 6 5 5 9" strokeDasharray="3 3" strokeWidth="1.6" />
    </S>
  );
}

export function MapSticker({ size }) {
  return (
    <S size={size}>
      <path d="M4 12l13-4 14 4 13-4v27l-13 4-14-4-13 4Z" fill="var(--peach)" />
      <path d="M17 8v27M31 12v27" strokeWidth="1.5" />
      <path d="M10 30c4-8 10-3 13-9s8-6 12-3" strokeDasharray="3 3" strokeWidth="1.8" stroke="var(--cobalt)" />
      <circle cx="22" cy="19" r="2.8" fill="var(--red)" stroke="none" />
      <circle cx="35" cy="26" r="2.8" fill="var(--red)" stroke="none" />
    </S>
  );
}

export function CameraSticker({ size }) {
  return (
    <S size={size}>
      <rect x="4" y="14" width="40" height="26" rx="4" fill="var(--sky)" />
      <path d="M16 14l3-5h10l3 5" fill="var(--sky)" />
      <circle cx="24" cy="27" r="9" fill="var(--paper)" />
      <circle cx="24" cy="27" r="4.5" fill="var(--cobalt)" />
      <circle cx="38" cy="20" r="1.8" fill="var(--yellow)" stroke="none" />
    </S>
  );
}

export function SuitcaseSticker({ size }) {
  return (
    <S size={size}>
      <rect x="6" y="15" width="36" height="27" rx="4" fill="var(--blush)" />
      <path d="M18 15v-4a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v4" />
      <path d="M16 15v27M32 15v27" strokeWidth="1.6" />
      <path d="M6 27h36" strokeWidth="1.6" />
    </S>
  );
}

export function BookSticker({ size }) {
  return (
    <S size={size}>
      <path d="M24 13c-5-4-12-4-19-1v23c7-3 14-3 19 1Z" fill="var(--mint)" />
      <path d="M24 13c5-4 12-4 19-1v23c-7-3-14-3-19 1Z" fill="var(--peach)" />
      <path d="M24 13v23" />
      <path d="M10 19c4-1 8-1 10 0M10 25c4-1 8-1 10 0M28 19c4-1 8-1 10 0M28 25c4-1 8-1 10 0" strokeWidth="1.3" />
    </S>
  );
}

export function CompassSticker({ size }) {
  return (
    <S size={size}>
      <circle cx="24" cy="24" r="18" fill="var(--yellow)" />
      <circle cx="24" cy="24" r="13" fill="var(--paper)" />
      <path d="M31 17l-4 11-11 4 4-11Z" fill="var(--red)" />
      <circle cx="24" cy="24" r="1.8" fill="var(--ink)" stroke="none" />
      <path d="M24 4v3.5M24 40.5V44M4 24h3.5M40.5 24H44" />
    </S>
  );
}

export function QuestionMarks({ size = 30 }) {
  return (
    <S size={size} strokeWidth="2.4">
      <path d="M12 12a4.5 4.5 0 1 1 5.6 4.4c-1.1.7-1.8 1.6-1.8 3" stroke="var(--red)" />
      <circle cx="16" cy="24" r="1.6" fill="var(--red)" stroke="none" />
      <path d="M31 22a3.4 3.4 0 1 1 4.2 3.3c-.9.5-1.4 1.2-1.4 2.3" stroke="var(--cobalt)" strokeWidth="2" />
      <circle cx="33.8" cy="33" r="1.3" fill="var(--cobalt)" stroke="none" />
    </S>
  );
}

export function DashArrow({ size = 38, color = "var(--lav)" }) {
  return (
    <S size={size} strokeWidth="2.6">
      <path d="M7 36C11 17 24 8 40 10" stroke={color} strokeDasharray="4 4" />
      <path d="M32 6l8 4-3 8" stroke={color} />
    </S>
  );
}

// Rotating Earth: real continent shapes drifting inside a clipped sphere, so
// it reads as a planet turning rather than a flat disc spinning.
export function RotatingGlobe({ size = 200 }) {
  const land = (dx) => (
    <g transform={`translate(${dx} 0)`} fill="var(--leaf)" stroke="var(--ink)" strokeWidth="1.4">
      {/* Greenland */}
      <path d="M28 10c6-3 12 0 10 5-2 4-9 4-11-1Z" />
      {/* North America */}
      <path d="M5 23c7-6 20-5 24 2 3 6-3 11-9 10-6-1-11 1-14-3-2-3-3-7-1-9Z" />
      {/* South America */}
      <path d="M21 45c6-3 11 2 9 11-2 9-7 17-11 11-3-6-2-16 2-22Z" />
      {/* Europe */}
      <path d="M43 21c6-3 12 0 11 5-1 5-8 5-12 2Z" />
      {/* Africa */}
      <path d="M45 34c9-3 15 3 13 14-2 11-9 20-14 12-4-7-4-20 1-26Z" />
      {/* Asia */}
      <path d="M60 15c13-5 29 0 32 9 2 9-8 13-18 10-10-2-18-10-14-19Z" />
      {/* Australia */}
      <path d="M76 60c7-3 15 0 14 7-1 7-11 8-15 2-2-3-2-7 1-9Z" />
    </g>
  );

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <clipPath id="earth-clip">
          <circle cx="50" cy="50" r="38" />
        </clipPath>
      </defs>

      {/* Ocean */}
      <circle cx="50" cy="50" r="38" fill="var(--ocean)" />

      {/* Drifting landmasses (two tiles end-to-end = seamless loop) */}
      <g clipPath="url(#earth-clip)">
        <g className="globe-surface">
          {land(0)}
          {land(100)}
        </g>
      </g>

      {/* Graticule so the sphere reads as 3D */}
      <g clipPath="url(#earth-clip)" fill="none" stroke="#0b3a63" strokeWidth="1" opacity=".45">
        <ellipse cx="50" cy="50" rx="15" ry="38" />
        <ellipse cx="50" cy="50" rx="29" ry="38" />
        <path d="M12 50h76" />
        <path d="M17 29c20 8 46 8 66 0M17 71c20-8 46-8 66 0" />
      </g>

      {/* Bold pop-art outline */}
      <circle cx="50" cy="50" r="38" fill="none" stroke="var(--ink)" strokeWidth="3.5" />
    </svg>
  );
}

// Real airliner, drawn nose-along +x so `offset-rotate: auto` banks it into
// the direction of travel along the flight path.
export function FlightPlane({ size = 42 }) {
  return (
    <S size={size} strokeWidth="1.9">
      {/* Swept main wings */}
      <path d="M33 22 17 7h7l13 15Z" fill="var(--red)" />
      <path d="M33 26 17 41h7l13-15Z" fill="var(--red)" />
      {/* Tailplane */}
      <path d="M13 22 6 13h4l7 9Z" fill="var(--cobalt)" />
      <path d="M13 26 6 35h4l7-9Z" fill="var(--cobalt)" />
      {/* Fuselage with a pointed nose */}
      <path d="M45 24c0 2-3 3.6-7 4L13 29c-4 0-6-2-6-5s2-5 6-5l25 1c4 .4 7 2 7 4Z" fill="var(--paper)" />
      <circle cx="20" cy="24" r="1.2" fill="var(--cobalt)" stroke="none" />
      <circle cx="26" cy="24" r="1.2" fill="var(--cobalt)" stroke="none" />
      <circle cx="32" cy="24" r="1.2" fill="var(--cobalt)" stroke="none" />
    </S>
  );
}
