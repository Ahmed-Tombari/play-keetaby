"use client";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import type { LetterSpec } from "./letters";
import type { PaintTool } from "./palette";

type Point = { x: number; y: number };
type StrokeData = { points: Point[]; length: number; startAngle: number; endAngle: number };

const SAMPLES = 60;
const HIT_RADIUS = 34;
const LOOK_AHEAD = 8;
// The child must trace manually all the way to the final arrow — no
// auto-completion partway through the stroke.
const COMPLETE_AT = 1;
const CONTINUOUS_COMPLETE_AT = 1;
/** Clear space between the letter outline and the edge of a dot. */
const DOT_GAP = 16;

function angle(a: Point, b: Point) {
  return (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
}

export function TraceLetter({ letter, tool, onComplete }: { letter: LetterSpec; tool: PaintTool; onComplete?: (color: string) => void }) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathRefs = useRef<Array<SVGPathElement | null>>([]);
  const drawing = useRef(false);

  const [data, setData] = useState<StrokeData[]>([]);
  const [progress, setProgress] = useState<number[]>(() => letter.strokes.map(() => 0));
  const [completedDots, setCompletedDots] = useState<boolean[]>(() => letter.dots?.map(() => false) ?? []);
  const [fill, setFill] = useState<string | null>(null);
  const [paint, setPaint] = useState<string | null>(null);
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");

  useEffect(() => {
    if (fill) onComplete?.(fill);
  }, [fill, onComplete]);

  useEffect(() => {
    setFill(null);
    setPaint(null);
    setProgress(letter.strokes.map(() => 0));
    setCompletedDots(letter.dots?.map(() => false) ?? []);
  }, [letter]);

  useEffect(() => {
    const measured: StrokeData[] = letter.strokes.map((_, i) => {
      const el = pathRefs.current[i];
      if (!el) return { points: [], length: 0, startAngle: 0, endAngle: 0 };
      const length = el.getTotalLength();
      const points: Point[] = [];
      for (let s = 0; s <= SAMPLES; s++) {
        const p = el.getPointAtLength((length * s) / SAMPLES);
        points.push({ x: p.x, y: p.y });
      }
      return {
        points,
        length,
        startAngle: angle(points[0]!, points[2]!),
        endAngle: angle(points[points.length - 3]!, points[points.length - 1]!),
      };
    });
    setData(measured);
  }, [letter]);

  // Dots are nudged away from the letter body so a visible gap always
  // separates them: upward for dots above the shape, downward for dots below.
  const placedDots = useMemo(() => {
    if (!letter.dots?.length) return [];
    return letter.dots.map((dot) => {
      const outer = letter.dotR ?? 20;
      let best: { dist: number; p: Point; half: number } | null = null;
      for (let i = 0; i < data.length; i++) {
        const half = ((letter.widths?.[i] ?? 46) + 10) / 2;
        for (const p of data[i]!.points) {
          const dist = Math.hypot(p.x - dot.cx, p.y - dot.cy);
          if (!best || dist - half < best.dist - best.half) best = { dist, p, half };
        }
      }
      if (!best) return dot;
      const edgeGap = best.dist - best.half - outer;
      if (edgeGap >= DOT_GAP) return dot;
      const deficit = DOT_GAP - edgeGap;
      const dir = dot.cy <= best.p.y ? -1 : 1;
      return { ...dot, cy: dot.cy + dir * deficit };
    });
  }, [letter, data]);

  const toSvgPoint = useCallback((clientX: number, clientY: number): Point | null => {
    const svg = svgRef.current;
    const ctm = svg?.getScreenCTM();
    if (!svg || !ctm) return null;
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const local = pt.matrixTransform(ctm.inverse());
    return { x: local.x, y: local.y };
  }, []);

  const reset = () => {
    setProgress(letter.strokes.map(() => 0));
    setCompletedDots(letter.dots?.map(() => false) ?? []);
  };

  const handleDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture?.(e.pointerId);
    if (tool.kind === "eraser") {
      setFill(null);
      setPaint(null);
      reset();
      return;
    }
    setPaint(tool.crayon.value);
    const point = toSvgPoint(e.clientX, e.clientY);
    const bodyComplete = progress.every((value, i) => value >= (data[i]?.points.length ?? 1) - 1);
    if (bodyComplete && point && placedDots.length) {
      const outer = letter.dotR ?? 20;
      const clickedDot = placedDots.findIndex(
        (dot, i) => !completedDots[i] && Math.hypot(dot.cx - point.x, dot.cy - point.y) <= outer * 1.5,
      );
      if (clickedDot >= 0) {
        const nextDots = [...completedDots];
        nextDots[clickedDot] = true;
        setCompletedDots(nextDots);
        if (nextDots.every(Boolean)) setFill(tool.crayon.value);
      }
      drawing.current = false;
      return;
    }
    drawing.current = true;
    advance(e.clientX, e.clientY);
  };

  const advance = (clientX: number, clientY: number) => {
    if (!data.length) return;
    const p = toSvgPoint(clientX, clientY);
    if (!p) return;

    setProgress((prev) => {
      const active = prev.findIndex((v, i) => v < (data[i]?.points.length ?? 1) - 1);
      if (active === -1) return prev;
      const pts = data[active]!.points;
      const start = prev[active] ?? 0;
      let index = start;
      for (let i = start; i <= Math.min(start + LOOK_AHEAD, pts.length - 1); i++) {
        const pt = pts[i]!;
        const d = Math.hypot(pt.x - p.x, pt.y - p.y);
        if (d < HIT_RADIUS) index = i;
      }
      if (index === start) return prev;

      const next = [...prev];
      next[active] = index;
      const completionPoint = letter.continuousBody ? CONTINUOUS_COMPLETE_AT : COMPLETE_AT;
      if (index >= (pts.length - 1) * completionPoint) {
        next[active] = pts.length - 1;
      }

      const bodyDone = next.every((v, i) => v >= (data[i]?.points.length ?? 1) - 1);
      // Connected body paths continue under the same finger movement. Dots
      // remain separate one-click actions after the complete body is traced.
      if (index >= (pts.length - 1) * completionPoint && (!letter.continuousBody || bodyDone)) {
        drawing.current = false;
      }
      if (bodyDone && !letter.dots?.length && tool.kind === "color") setFill(tool.crayon.value);
      return next;
    });
  };

  const handleMove = (e: React.PointerEvent) => {
    if (!drawing.current) return;
    advance(e.clientX, e.clientY);
  };

  const stop = () => {
    drawing.current = false;
  };

  return (
    <svg
      ref={svgRef}
      viewBox={letter.viewBox}
      role="img"
      aria-label={`تتبّع حرف ${letter.name}`}
      className="h-full w-auto max-h-full max-w-full touch-none select-none drop-shadow-sm min-h-0"
      preserveAspectRatio="xMidYMid meet"
      onPointerDown={handleDown}
      onPointerMove={handleMove}
      onPointerUp={stop}
      onPointerCancel={stop}
      onPointerLeave={stop}
    >
      {/* ring mask: the 5px band between the outer edge and the interior,
          so the black outline is one continuous line with no gaps at joins */}
      <defs>
        <mask id={`${uid}-ring`} maskUnits="userSpaceOnUse" x="-100" y="-100" width="4000" height="4000">
          {letter.strokes.map((d, i) => (
            <path
              key={`m-out-${i}`}
              d={d}
              fill="none"
              stroke="#fff"
              strokeWidth={(letter.widths?.[i] ?? 46) + 10}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
          {letter.strokes.map((d, i) => (
            <path
              key={`m-in-${i}`}
              d={d}
              fill="none"
              stroke="#000"
              strokeWidth={letter.widths?.[i] ?? 46}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </mask>
      </defs>
      {letter.strokes.map((d, i) => (
        <path
          key={`inside-${i}`}
          d={d}
          fill="none"
          stroke="var(--card)"
          strokeWidth={letter.widths?.[i] ?? 46}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
      {letter.strokes.map((d, i) => {
        const stroke = data[i];
        const ratio = stroke && stroke.points.length > 1 ? (progress[i] ?? 0) / (stroke.points.length - 1) : 0;
        const color = fill ?? paint;
        const strokeComplete = Boolean(fill) || ratio >= 1;
        if (!color || !stroke || stroke.length === 0) return null;
        return (
          <path
            key={`ink-${i}`}
            d={d}
            fill="none"
            stroke={color}
            strokeWidth={letter.widths?.[i] ?? 46}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={strokeComplete ? "none" : stroke.length}
            strokeDashoffset={strokeComplete ? 0 : stroke.length * (1 - ratio)}
            className={strokeComplete ? undefined : "transition-[stroke-dashoffset] duration-100 ease-linear"}
          />
        );
      })}

      {/* continuous outer outline on top, drawn only inside the ring band */}
      <g mask={`url(#${uid}-ring)`}>
        {letter.strokes.map((d, i) => (
          <path
            key={`edge-${i}`}
            d={d}
            fill="none"
            stroke="oklch(0.12 0 0)"
            strokeWidth={(letter.widths?.[i] ?? 46) + 10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </g>


      {letter.strokes.map((d, i) => {
        const stroke = data[i];
        const ratio = stroke ? (progress[i] ?? 0) / (stroke.points.length - 1) : 0;
        return (
          <g key={`guide-${i}`}>
            {/* dashed guide line — hidden once the letter is fully filled */}
            {!fill && (
              <path
                ref={(el) => {
                  pathRefs.current[i] = el;
                }}
                d={d}
                fill="none"
                stroke="oklch(0.18 0 0)"
                strokeWidth={3}
                strokeDasharray="12 12"
                strokeLinecap="round"
              />
            )}
            {/* traced progress */}
            {!fill && !paint && stroke && stroke.length > 0 && (
              <path
                d={d}
                fill="none"
                stroke="var(--primary)"
                strokeWidth={9}
                strokeLinecap="round"
                strokeDasharray={stroke.length}
                strokeDashoffset={stroke.length * (1 - ratio)}
              />
            )}
            {/* thick invisible hit area */}
            <path d={d} fill="none" stroke="transparent" strokeWidth={56} strokeLinecap="round" />
            {/* one start point and one end arrow per continuous writing stroke */}
            {!fill && stroke && stroke.points.length > 0 && (
              <StrokeEndpoints
                points={stroke.points}
                showStart={!letter.continuousBody || i === 0}
                showEnd={!letter.continuousBody || i === letter.strokes.length - 1}
              />
            )}
          </g>
        );
      })}
      {placedDots.map((dot, i) => {
        const outer = letter.dotR ?? 20;
        const complete = completedDots[i] ?? false;
        return (
          <g key={`dot-${i}`}>
            <circle
              cx={dot.cx}
              cy={dot.cy}
              r={outer}
              fill={fill ?? (complete && paint ? paint : "var(--card)")}
              stroke="oklch(0.12 0 0)"
              strokeWidth={6}
            />
            {!fill && !complete && (
              <circle
                cx={dot.cx}
                cy={dot.cy}
                r={outer * 0.55}
                fill="none"
                stroke="oklch(0.18 0 0)"
                strokeWidth={3}
                strokeDasharray="7 7"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}

function StrokeEndpoints({ points, showStart, showEnd }: { points: Point[]; showStart: boolean; showEnd: boolean }) {
  const start = points[0];
  const end = points.at(-1);
  const beforeEnd = points.at(-3) ?? start;
  if (!start || !end || !beforeEnd) return null;

  return (
    <>
      {showStart && <circle cx={start.x} cy={start.y} r={6} fill="oklch(0.12 0 0)" />}
      {showEnd && <Chevron point={end} rotate={angle(beforeEnd, end)} />}
    </>
  );
}

function Chevron({ point, rotate }: { point: Point; rotate: number }) {
  return (
    <polyline
      points="-7,-7 0,0 -7,7"
      fill="none"
      stroke="oklch(0.18 0 0)"
      strokeWidth={5}
      strokeLinecap="round"
      strokeLinejoin="round"
      transform={`translate(${point.x} ${point.y}) rotate(${rotate})`}
    />
  );
}

