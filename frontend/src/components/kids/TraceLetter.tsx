'use client';
import { useCallback, useEffect, useRef, useState } from "react";
import type { LetterSpec } from "./letters";
import type { PaintTool } from "./palette";

type Point = { x: number; y: number };
type StrokeData = { points: Point[]; length: number; startAngle: number; endAngle: number };

const SAMPLES = 60;
const HIT_RADIUS = 36;
const LOOK_AHEAD = 8;
const COMPLETE_AT = 0.85;

function angle(a: Point, b: Point) {
  return (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
}

export function TraceLetter({
  letter,
  tool,
  onComplete,
}: {
  letter: LetterSpec;
  tool: PaintTool;
  onComplete?: (color: string) => void;
}) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathRefs = useRef<Array<SVGPathElement | null>>([]);
  const drawing = useRef(false);

  const [data, setData] = useState<StrokeData[]>([]);
  const [progress, setProgress] = useState<number[]>(() => letter.strokes.map(() => 0));
  const [dotFilled, setDotFilled] = useState<boolean[]>(() => (letter.dots ?? []).map(() => false));
  const [fill, setFill] = useState<string | null>(null);
  const [paint, setPaint] = useState<string | null>(null);

  useEffect(() => {
    if (fill) onComplete?.(fill);
  }, [fill, onComplete]);

  // Re-measure strokes whenever letter changes
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
        startAngle: angle(points[0]!, points[Math.min(2, points.length - 1)]!),
        endAngle: angle(points[Math.max(0, points.length - 3)]!, points[points.length - 1]!),
      };
    });
    setData(measured);
    setProgress(letter.strokes.map(() => 0));
    setDotFilled((letter.dots ?? []).map(() => false));
    setFill(null);
    setPaint(null);
  }, [letter]);

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
    setDotFilled((letter.dots ?? []).map(() => false));
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
    drawing.current = true;
    advance(e.clientX, e.clientY);
  };

  const advance = (clientX: number, clientY: number) => {
    const p = toSvgPoint(clientX, clientY);
    if (!p) return;

    // Check dots interaction
    if (letter.dots && letter.dots.length > 0) {
      setDotFilled((prev) => {
        let changed = false;
        const next = prev.map((filled, idx) => {
          if (filled) return true;
          const dot = letter.dots![idx]!;
          const radius = dot.r ?? 20;
          const d = Math.hypot(dot.x - p.x, dot.y - p.y);
          if (d < radius + 15) {
            changed = true;
            return true;
          }
          return false;
        });
        return changed ? next : prev;
      });
    }

    if (!data.length) return;

    // Advance strokes progress
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
      if (index >= (pts.length - 1) * COMPLETE_AT) next[active] = pts.length - 1;

      // Check completion of all strokes & dots
      const strokesDone = next.every((v, i) => v >= (data[i]?.points.length ?? 1) - 1);
      const dotsDone = !letter.dots || letter.dots.length === 0 || dotFilled.every(Boolean);

      if (strokesDone && dotsDone && tool.kind === "color") {
        setFill(tool.crayon.value);
      }
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

  const activeColor = fill ?? paint;

  return (
    <svg
      ref={svgRef}
      viewBox={letter.viewBox}
      role="img"
      aria-label={`تتبّع حرف ${letter.name}`}
      className="h-[46vw] max-h-[320px] w-auto touch-none select-none sm:h-64 md:h-72 lg:h-80"
      onPointerDown={handleDown}
      onPointerMove={handleMove}
      onPointerUp={stop}
      onPointerCancel={stop}
      onPointerLeave={stop}
    >
      {/* 1. Main Tube Strokes (black outline + inner white tube + crayon ink fill) */}
      {letter.strokes.map((d, i) => {
        const stroke = data[i];
        const ratio = stroke && stroke.points.length > 1 ? (progress[i] ?? 0) / (stroke.points.length - 1) : 0;
        return (
          <g key={`tube-${i}`}>
            {/* Outer black stroke tube */}
            <path
              d={d}
              fill="none"
              stroke="#1a1a1a"
              strokeWidth={56}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Inner background tube */}
            <path
              d={d}
              fill="none"
              stroke="var(--color-card)"
              strokeWidth={44}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Crayon ink fill layer */}
            {activeColor && stroke && stroke.length > 0 && (
              <path
                d={d}
                fill="none"
                stroke={activeColor}
                strokeWidth={44}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={stroke.length}
                strokeDashoffset={stroke.length * (1 - (fill ? 1 : ratio))}
                className="transition-[stroke-dashoffset] duration-100 ease-linear"
              />
            )}
          </g>
        );
      })}

      {/* 2. Dots Layer (Circles with dashed border + inner dot) */}
      {(letter.dots ?? []).map((dot, i) => {
        const radius = dot.r ?? 20;
        const isFilled = fill ? true : (dotFilled[i] ?? false);
        return (
          <g key={`dot-${i}`}>
            {/* Outer dashed circle outline */}
            <circle
              cx={dot.x}
              cy={dot.y}
              r={radius}
              fill="none"
              stroke="#1a1a1a"
              strokeWidth={4}
              strokeDasharray="6 4"
            />
            {/* Inner dot fill */}
            <circle
              cx={dot.x}
              cy={dot.y}
              r={isFilled ? radius - 3 : 7}
              fill={isFilled ? activeColor ?? "var(--color-primary)" : "#1a1a1a"}
              className="transition-all duration-200 ease-out"
            />
          </g>
        );
      })}

      {/* 3. Dashed Guide Lines + Chevrons + Hit Area */}
      {letter.strokes.map((d, i) => {
        const stroke = data[i];
        const ratio = stroke ? (progress[i] ?? 0) / (stroke.points.length - 1) : 0;
        return (
          <g key={`guide-${i}`}>
            {/* Dashed guide line */}
            {!fill && (
              <path
                ref={(el) => {
                  pathRefs.current[i] = el;
                }}
                d={d}
                fill="none"
                stroke="#2a2a2a"
                strokeWidth={3}
                strokeDasharray="10 10"
                strokeLinecap="round"
              />
            )}
            {/* Active user tracing progress line */}
            {!fill && !paint && stroke && stroke.length > 0 && (
              <path
                d={d}
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth={8}
                strokeLinecap="round"
                strokeDasharray={stroke.length}
                strokeDashoffset={stroke.length * (1 - ratio)}
              />
            )}
            {/* Thick transparent hit area for easy touch detection */}
            <path d={d} fill="none" stroke="transparent" strokeWidth={56} strokeLinecap="round" />
          </g>
        );
      })}

      {/* 4. Directional Arrows (Chevrons) */}
      {!fill &&
        (letter.chevrons
          ? letter.chevrons.map((ch, i) => <Chevron key={`chev-${i}`} point={{ x: ch.x, y: ch.y }} rotate={ch.rotate} />)
          : data.map((stroke, i) => (
              <g key={`auto-chev-${i}`}>
                {stroke && stroke.points.length > 0 && (
                  <>
                    <Chevron point={stroke.points[0]!} rotate={stroke.startAngle} />
                    <Chevron point={stroke.points[stroke.points.length - 1]!} rotate={stroke.endAngle} />
                  </>
                )}
              </g>
            )))}
    </svg>
  );
}

function Chevron({ point, rotate }: { point: Point; rotate: number }) {
  return (
    <polyline
      points="-7,-7 0,0 -7,7"
      fill="none"
      stroke="#1a1a1a"
      strokeWidth={5}
      strokeLinecap="round"
      strokeLinejoin="round"
      transform={`translate(${point.x} ${point.y}) rotate(${rotate})`}
    />
  );
}
