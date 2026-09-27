"use client";
import { Eraser } from "lucide-react";
import { CRAYONS, type PaintTool } from "./palette";

type Props = {
  tool: PaintTool;
  onChange: (tool: PaintTool) => void;
  /** Stack items vertically (for landscape sidebar) */
  vertical?: boolean;
};

export function ColorPalette({ tool, onChange, vertical = false }: Props) {
  const isEraser = tool.kind === "eraser";

  return (
    <div dir="ltr" className={`flex ${vertical ? "flex-col" : "flex-row"} items-center justify-center gap-2 sm:gap-3`}>

      {/* ── Eraser ──
           VERTICAL (sidebar on purple bg-primary): always has white bg-card so icon is always visible.
           HORIZONTAL (portrait on white bg-card): light secondary bg so it's always visible.
           shrink-0 guarantees it is never squeezed out of view.
      */}
      <button
        type="button"
        aria-label="اختر الممحاة"
        aria-pressed={isEraser}
        onClick={() => onChange({ kind: "eraser" })}
        className={`
          shrink-0 flex items-center justify-center rounded-xl text-primary
          border-4 border-card shadow-md
          transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring
          ${vertical ? "size-9 sm:size-10" : "size-10 sm:size-14"}
          ${isEraser
            ? "bg-secondary ring-4 ring-inset ring-primary/50 scale-105"
            : "bg-card hover:scale-105 active:scale-95"
          }
        `}
      >
        <Eraser
          className={vertical ? "size-5 sm:size-6" : "size-7 sm:size-8"}
          strokeWidth={1.75}
        />
      </button>

      {/* ── Color swatches ── */}
      {CRAYONS.map((crayon) => {
        const active = tool.kind === "color" && tool.crayon.id === crayon.id;
        return (
          <button
            key={crayon.id}
            type="button"
            aria-label={crayon.label}
            aria-pressed={active}
            onClick={() => onChange({ kind: "color", crayon })}
            className={`
              shrink-0 rounded-full border-4 shadow-swatch
              transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring
              ${vertical ? "size-9 sm:size-10" : "size-10 sm:size-14"}
              ${active
                ? "border-white ring-4 scale-105"
                : "border-card hover:scale-110 active:scale-95"
              }
            `}
            style={{
              backgroundColor: crayon.value,
              "--tw-ring-color": active ? crayon.value : undefined,
            } as React.CSSProperties}
          />
        );
      })}
    </div>
  );
}

