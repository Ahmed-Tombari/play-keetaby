export type Crayon = {
  id: string;
  label: string;
  /** CSS value used to paint the letter and the swatch */
  value: string;
  /** Hex fallback for use in HTML5 Canvas (which cannot resolve CSS vars) */
  hex: string;
};

export const CRAYONS: Crayon[] = [
  { id: "green", label: "اختر اللون الأخضر", value: "var(--kid-green)", hex: "#25d366" },
  { id: "yellow", label: "اختر اللون الأصفر", value: "var(--kid-yellow)", hex: "#fbbf24" },
  { id: "pink", label: "اختر اللون الوردي", value: "var(--kid-pink)", hex: "#f472b6" },
  { id: "purple", label: "اختر اللون البنفسجي", value: "var(--kid-blue)", hex: "#818cf8" },
];

export type PaintTool = { kind: "color"; crayon: Crayon } | { kind: "eraser" };
