'use client';
import { Star, Sparkles, RotateCcw, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CONFETTI = [
  { color: "#FACC15", x: 15, y: 20, delay: 0 },
  { color: "#F472B6", x: 85, y: 25, delay: 0.1 },
  { color: "#4ADE80", x: 25, y: 75, delay: 0.2 },
  { color: "#A78BFA", x: 75, y: 80, delay: 0.15 },
  { color: "#3B82F6", x: 50, y: 10, delay: 0.25 },
  { color: "#F97316", x: 10, y: 50, delay: 0.05 },
  { color: "#EC4899", x: 90, y: 60, delay: 0.3 },
  { color: "#10B981", x: 50, y: 90, delay: 0.2 },
];

export function Celebration({ onReset }: { onReset?: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md animate-fade-in p-4">
      {/* Background confetti bursts */}
      {CONFETTI.map((c, i) => (
        <span
          key={i}
          className="absolute size-4 rounded-full animate-celebrate-burst pointer-events-none shadow-sm"
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            backgroundColor: c.color,
            animationDelay: `${c.delay}s`,
          }}
        />
      ))}

      {/* Main Pop-up Card */}
      <div className="animate-celebrate-pop pointer-events-auto relative flex flex-col items-center justify-between gap-5 rounded-[3rem] border-[6px] border-[#FACC15] bg-gradient-to-b from-white via-[#FFFBEB] to-[#FEF3C7] p-6 sm:p-10 shadow-[0_24px_70px_rgba(0,0,0,0.35)] max-w-lg w-full text-center overflow-hidden">
        
        {/* Top Glossy Ribbon Accent */}
        <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-r from-[#FACC15] via-[#F472B6] to-[#A78BFA]" />

        {/* Mascot & Star Header */}
        <div className="relative mt-2 flex items-center justify-center">
          {/* Decorative Sparkles & Stars */}
          <Star className="absolute -top-3 -left-8 size-10 fill-[#FACC15] text-[#FACC15] animate-celebrate-bounce drop-shadow" />
          <Sparkles className="absolute -top-4 -right-8 size-10 fill-[#F472B6] text-[#F472B6] animate-celebrate-bounce drop-shadow" style={{ animationDelay: "0.2s" }} />

          {/* Star Mascot Image */}
          <div className="relative size-28 sm:size-32 transition-transform hover:scale-110">
            <Image
              src="/assets/star-mascot.png"
              alt="نجمة متعة التعلم"
              width={140}
              height={140}
              priority
              className="object-contain drop-shadow-md animate-celebrate-bounce"
            />
          </div>
        </div>

        {/* Text Header */}
        <div className="space-y-3 flex flex-col items-center">
          {/* Clean 3D Gradient Pill Badge */}
          <div className="rounded-full bg-gradient-to-r from-amber-400 via-pink-400 to-purple-500 p-[3px] shadow-md">
            <div className="rounded-full bg-white px-8 py-2.5 sm:px-10 sm:py-3">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#9333ea] tracking-wide font-arabic">
                أَحْسَنْتَ يَا بَطَل! 🎉
              </h2>
            </div>
          </div>

          <p className="text-base sm:text-lg font-bold text-slate-700 max-w-xs sm:max-w-sm leading-relaxed font-arabic">
            عَمَلٌ رَائِع! لَقَدْ أَكْمَلْتَ كِتَابَةَ الحَرْفِ بِنَجَاح!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full mt-2">
          {/* Main Redirect Button */}
          <Link
            href="/learn"
            className="flex-1 flex items-center justify-center gap-3 rounded-full border-[3px] border-white bg-gradient-to-r from-[#9333EA] via-[#A855F7] to-[#C084FC] px-6 py-4 text-xl font-extrabold text-white shadow-[0_8px_0_#6B21A8] transition-all hover:scale-105 hover:brightness-110 active:translate-y-1 active:shadow-[0_2px_0_#6B21A8]"
          >
            <Home className="size-7 stroke-[2.5]" />
            <span className="font-arabic">العودة إلى الحروف</span>
          </Link>

          {/* Re-trace Button */}
          {onReset && (
            <button
              onClick={onReset}
              className="flex items-center justify-center gap-2 rounded-full border-[3px] border-[#CBD5E1] bg-white px-6 py-4 text-lg font-extrabold text-[#334155] shadow-[0_6px_0_#94A3B8] transition-all hover:scale-105 hover:bg-[#F8FAFC] active:translate-y-1 active:shadow-[0_2px_0_#94A3B8]"
            >
              <RotateCcw className="size-6 stroke-[2.5]" />
              <span className="font-arabic">إعادة</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
