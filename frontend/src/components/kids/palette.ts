export type Crayon = {
  id: string;
  label: string;
  /** CSS value used to paint the letter and the swatch */
  value: string;
};

export const CRAYONS: Crayon[] = [
  { id: "green", label: "اختر اللون الأخضر", value: "var(--kid-green)" },
  { id: "yellow", label: "اختر اللون الأصفر", value: "var(--kid-yellow)" },
  { id: "pink", label: "اختر اللون الوردي", value: "var(--kid-pink)" },
  { id: "purple", label: "اختر اللون البنفسجي", value: "var(--kid-blue)" },
];

export type PaintTool = { kind: "color"; crayon: Crayon } | { kind: "eraser" };
