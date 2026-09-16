'use client';
import { useCallback, useState } from "react";
import { useParams } from "next/navigation";
import { Star } from "lucide-react";
import Image from "next/image";

import { ColorPalette } from "@/components/kids/ColorPalette";
import { NavButtons } from "@/components/kids/NavButtons";
import { BackToLearnButton } from "@/components/kids/BackButton";
import { TraceLetter } from "@/components/kids/TraceLetter";
import { Celebration } from "@/components/kids/Celebration";
import { ALL_LETTERS } from "@/components/kids/letters";
import { CRAYONS, type PaintTool } from "@/components/kids/palette";

function speakArabic(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ar-SA";
  utter.rate = 0.8;
  utter.pitch = 1.2;
  const voice = synth.getVoices().find((item) => item.lang?.toLowerCase().startsWith("ar"));
  if (voice) utter.voice = voice;
  synth.speak(utter);
}

export default function TracingLetterPage() {
  const params = useParams();
  const [tool, setTool] = useState<PaintTool>({ kind: "color", crayon: CRAYONS[0]! });
  const [completedSlots, setCompletedSlots] = useState<boolean[]>([false, false, false]);
  const [resetKey, setResetKey] = useState(0);

  const letterId = typeof params.letter === "string" ? decodeURIComponent(params.letter) : "";
  const letterIndex = ALL_LETTERS.findIndex((l) => l.id === letterId);

  // Fallback: unknown letter id → first letter
  const resolvedIndex = letterIndex === -1 ? 0 : letterIndex;
  const letter = ALL_LETTERS[resolvedIndex]!;

  const handleSlotComplete = useCallback((index: number) => {
    setCompletedSlots((prev) => {
      if (prev[index]) return prev;
      const next = [...prev];
      next[index] = true;
      if (next.every(Boolean)) {
        speakArabic("أَحْسَنْتَ! عَمَلٌ رَائِع");
      }
      return next;
    });
  }, []);

  const handleReset = useCallback(() => {
    setCompletedSlots([false, false, false]);
    setResetKey((prev) => prev + 1);
  }, []);

  const isAllComplete = completedSlots.every(Boolean);

  return (
    <div
      dir="rtl"
      className="h-screen w-screen overflow-hidden p-2 font-arabic sm:p-4"
      style={{ backgroundColor: "var(--color-primary)" }}
    >
      <main
        className="relative flex h-full flex-col overflow-hidden rounded-[2rem] border-[6px] bg-card p-3 shadow-frame sm:rounded-[2.5rem] sm:p-6"
        style={{ borderColor: "var(--color-primary)", backgroundColor: "var(--color-card)" }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <NavButtons />

          <h1
            className="mx-auto flex items-center gap-2 rounded-full border-[3px] px-4 py-2 text-center text-base font-extrabold shadow-swatch sm:gap-4 sm:px-10 sm:py-3 sm:text-2xl"
            style={{
              background:
                "linear-gradient(180deg,color-mix(in srgb,var(--color-primary) 78%,white) 0%,var(--color-primary) 45%,color-mix(in srgb,var(--color-primary) 80%,black) 100%)",
              color: "var(--color-primary-foreground)",
              borderColor: "var(--color-card)",
            }}
          >
            <Star
              className="size-6 shrink-0 drop-shadow-sm sm:size-9 animate-star-idle"
              strokeWidth={1.5}
              style={{ fill: "var(--kid-yellow)", color: "var(--color-primary)" }}
            />
            <span>إتّبِع الأسْهُم وَ أكْمل كِتَابَة الحَرْف</span>
            <Star
              className="size-6 shrink-0 drop-shadow-sm sm:size-9 animate-star-idle"
              strokeWidth={1.5}
              style={{ fill: "var(--kid-yellow)", color: "var(--color-primary)" }}
            />
          </h1>

          <BackToLearnButton />
        </div>

        {/* Color palette */}
        <div className="mt-1 sm:mt-1 mb-2">
          <ColorPalette tool={tool} onChange={setTool} />
        </div>

        {/* Worksheet */}
        <section
          className="relative z-10 mt-3 flex flex-1 items-center justify-center rounded-[2rem] border-[2px] p-2 sm:mt-2"
          style={{ borderColor: "var(--color-primary)" }}
        >
          {/* Three traceable copies using SVG vectors */}
          <div className="flex h-full w-full flex-row items-center justify-center gap-4 md:gap-10">
            {[0, 1, 2].map((slot) => (
              <TraceLetter
                key={`${letter.id}-${slot}-${resetKey}`}
                letter={letter}
                tool={tool}
                onComplete={() => handleSlotComplete(slot)}
              />
            ))}
          </div>

          {/* Decorative characters inside section border */}
          <Image
            src="/assets/girl-writing.png"
            alt="طفلة تكتب في دفترها"
            width={816}
            height={816}
            priority
            className="pointer-events-none absolute bottom-1 left-2 h-20 w-auto sm:h-28 animate-idle-bob"
          />
          <Image
            src="/assets/boy-writing.png"
            alt="طفل يكتب في دفتره"
            width={816}
            height={816}
            priority
            className="pointer-events-none absolute bottom-1 right-2 h-20 w-auto sm:h-28 animate-reverse-idle-bob"
          />
        </section>

        {/* Celebration Pop-up Overlay when all 3 letters are completed */}
        {isAllComplete && <Celebration onReset={handleReset} />}
      </main>
    </div>
  );
}
