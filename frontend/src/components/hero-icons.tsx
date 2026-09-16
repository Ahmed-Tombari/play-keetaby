/**
 * The two little stars on the pill buttons.
 *
 * They are drawn as SVG on purpose: in the design the stars sit on a pill of
 * almost the same colour (light yellow on orange-yellow), so cutting them out of
 * the design file leaves holes. The telescope, the two children and the logo are
 * the real artwork and live in public/images/icons as transparent PNGs.
 */

/** Rounded five-point star, blunt tips (round joins on a same-colour stroke). */
function starPath(cx: number, cy: number, outer: number, inner: number) {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`);
  }
  return `M${pts.join("L")}Z`;
}

export function SmileyStar({
  fill = "#FFE24D",
  edge = "#F7B500",
  face = "#3B2A12",
}: {
  fill?: string;
  edge?: string;
  face?: string;
}) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path
        d={starPath(24, 23, 21, 9.4)}
        fill={fill}
        stroke={edge}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <ellipse cx="17.6" cy="20" rx="3.5" ry="4.3" fill="#fff" />
      <ellipse cx="30.4" cy="20" rx="3.5" ry="4.3" fill="#fff" />
      <circle cx="18" cy="20.7" r="1.9" fill={face} />
      <circle cx="30" cy="20.7" r="1.9" fill={face} />
      <circle cx="18.7" cy="19.6" r="0.7" fill="#fff" />
      <circle cx="30.7" cy="19.6" r="0.7" fill="#fff" />
      <path
        d="M20.2 27.4a5.6 5.6 0 0 0 7.6 0"
        stroke={face}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** The star on the purple pill: same shape, pink. */
export function PinkStar() {
  return <SmileyStar fill="#FFA8D4" edge="#F07BB8" face="#7A2A55" />;
}
