"use client";
import { Star, Sparkles } from "lucide-react";

const BURSTS = [
  { color: "#FACC15", x: 20, y: 30, delay: 0 },
  { color: "#F472B6", x: 80, y: 25, delay: 0.1 },
  { color: "#4ADE80", x: 35, y: 70, delay: 0.2 },
  { color: "#A78BFA", x: 65, y: 75, delay: 0.15 },
  { color: "#FACC15", x: 50, y: 15, delay: 0.25 },
  { color: "#4ADE80", x: 10, y: 60, delay: 0.05 },
  { color: "#F472B6", x: 90, y: 55, delay: 0.3 },
  { color: "#A78BFA", x: 50, y: 85, delay: 0.2 },
];

export function Celebration() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {BURSTS.map((b, i) => (
        <span
          key={i}
          className="absolute size-3 rounded-full animate-celebrate-burst"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            backgroundColor: b.color,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}

      <div className="animate-celebrate-pop flex flex-col items-center gap-3 rounded-[2rem] border-4 border-kid-yellow bg-card px-8 py-6 shadow-frame">
        <div className="flex gap-2">
          <Star className="size-10 fill-kid-yellow text-kid-yellow animate-celebrate-bounce" />
          <Sparkles className="size-10 fill-kid-pink text-kid-pink animate-celebrate-bounce" style={{ animationDelay: "0.15s" }} />
          <Star className="size-10 fill-kid-green text-kid-green animate-celebrate-bounce" style={{ animationDelay: "0.3s" }} />
        </div>
        <p className="text-3xl font-extrabold text-primary">أحسنت!</p>
      </div>
    </div>
  );
}

