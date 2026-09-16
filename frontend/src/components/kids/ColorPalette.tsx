'use client';
import { Eraser } from "lucide-react";
import { CRAYONS, type PaintTool } from "./palette";

type Props = {
  tool: PaintTool;
  onChange: (tool: PaintTool) => void;
};

export function ColorPalette({ tool, onChange }: Props) {
  return (
    <div dir="ltr" className="flex items-center justify-center gap-3 sm:gap-5">
      <button
        type="button"
        aria-label="اختر الممحاة"
        aria-pressed={tool.kind === "eraser"}
        onClick={() => onChange({ kind: "eraser" })}
        className={`flex size-12 items-center justify-center rounded-xl text-primary transition-transform focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring sm:size-14 ${
          tool.kind === "eraser" ? "scale-110 bg-secondary" : "hover:scale-110 active:scale-95"
        }`}
      >
        <Eraser className="size-8 sm:size-9" strokeWidth={1.75} />
      </button>

      {CRAYONS.map((crayon) => {
        const active = tool.kind === "color" && tool.crayon.id === crayon.id;
        return (
          <button
            key={crayon.id}
            type="button"
            aria-label={crayon.label}
            aria-pressed={active}
            onClick={() => onChange({ kind: "color", crayon })}
            className={`size-14 rounded-full border-4 border-card shadow-swatch transition-transform focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring sm:size-16 ${
              active ? "scale-110 ring-4" : "hover:scale-110 active:scale-95"
            }`}
            style={{ backgroundColor: crayon.value, "--tw-ring-color": active ? crayon.value : undefined } as React.CSSProperties}
          />
        );
      })}
    </div>
  );
}
