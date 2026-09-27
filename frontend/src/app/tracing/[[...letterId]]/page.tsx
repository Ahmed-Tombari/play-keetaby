"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Star, ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Celebration } from "@/components/kids/Celebration";
import { ColorPalette } from "@/components/kids/ColorPalette";
import { NavButtons } from "@/components/kids/NavButtons";
import { TraceLetter } from "@/components/kids/TraceLetter";
import { LETTERS } from "@/components/kids/letters";
import { CRAYONS, type PaintTool } from "@/components/kids/palette";
import girlWriting from "@/assets/girl-writing.png";
import boyWriting from "@/assets/boy-writing.png";

const LETTER_LIST = [
  "alif", "baa", "taa", "thaa", "jim", "haa", "khaa", "daal", "thaal",
  "raa", "zay", "sin", "shin", "saad", "daad", "taah", "thaah",
  "ain", "ghain", "faa", "qaf", "kaf", "lam", "meem", "nun",
  "hah", "waw", "yaa",
].map((id) => LETTERS[id]!);

export default function TracingPage() {
  const params = useParams();
  const router = useRouter();

  const paramLetterId = Array.isArray(params?.letterId) ? params.letterId[0] : params?.letterId;
  const currentLetterId = paramLetterId ?? LETTER_LIST[0]!.id;

  const [tool, setTool] = useState<PaintTool>({ kind: "color", crayon: CRAYONS[0]! });
  const letter = LETTER_LIST.find((l) => l.id === currentLetterId) ?? LETTER_LIST[0]!;
  const [done, setDone] = useState<number[]>([]);

  const handleComplete = useCallback((slot: number) => {
    setDone((prev) => (prev.includes(slot) ? prev : [...prev, slot]));
  }, []);

  const [party, setParty] = useState(false);

  useEffect(() => {
    setDone([]);
    setParty(false);
  }, [currentLetterId]);

  useEffect(() => {
    if (done.length < 3) return;
    setParty(true);
    const t = setTimeout(() => setParty(false), 3000);
    return () => clearTimeout(t);
  }, [done.length]);

  return (
    <div dir="rtl" className="min-h-dvh bg-primary p-2 font-arabic sm:p-4">
      <main className="relative flex min-h-[calc(100dvh-1rem)] flex-col overflow-hidden rounded-[2rem] border-[6px] border-primary bg-card p-3 shadow-frame sm:min-h-[calc(100dvh-2rem)] sm:rounded-[2.5rem] sm:p-6">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <NavButtons />

          <h1 className="mx-auto flex items-center gap-2 rounded-full border-[3px] border-card bg-[linear-gradient(180deg,color-mix(in_oklab,var(--primary)_78%,white)_0%,var(--primary)_45%,color-mix(in_oklab,var(--primary)_80%,black)_100%)] px-4 py-2 text-center text-base font-extrabold text-primary-foreground shadow-swatch ring-2 ring-primary sm:gap-4 sm:px-10 sm:py-3 sm:text-2xl">
            <Star className="size-6 shrink-0 fill-kid-yellow stroke-[1.5] text-primary drop-shadow-sm sm:size-9" />
            <span className="drop-shadow-[0_2px_0_color-mix(in_oklab,var(--primary)_60%,black)]">
              إتّبِع الأسْهُم وَ أكْمل كِتَابَة الحَرْف
            </span>
            <Star className="size-6 shrink-0 fill-kid-yellow stroke-[1.5] text-primary drop-shadow-sm sm:size-9" />
          </h1>

          <Link
            href="/learn"
            aria-label="الرجوع"
            className="flex w-16 h-14 shrink-0 flex-col items-center justify-center gap-0.5 rounded-2xl border-4 border-primary bg-card text-primary shadow-md transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring sm:w-20 sm:h-[72px]"
          >
            <ArrowLeft className="size-6 sm:size-7" strokeWidth={2.5} />
            <span className="text-[10px] font-bold leading-none sm:text-[11px]">رجوع</span>
          </Link>
        </div>

        {/* Tools */}
        <div className="mt-4 sm:mt-6">
          <ColorPalette tool={tool} onChange={setTool} />
        </div>

        {/* Letter chooser */}
        {/* <div role="tablist" aria-label="اختر الحرف" className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {LETTER_LIST.map((item) => {
            const active = item.id === letter.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={`تدرّب على حرف ${item.name}`}
                onClick={() => router.push(`/tracing/${item.id}`)}
                className={`rounded-full border-4 px-4 py-1 text-lg font-extrabold transition-transform focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring sm:text-xl ${
                  active
                    ? "scale-110 border-primary bg-primary text-primary-foreground shadow-swatch"
                    : "border-primary bg-card text-primary hover:scale-105 active:scale-95"
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div> */}

        {/* Worksheet */}
        <section className="relative mt-4 flex flex-1 items-center justify-center rounded-3xl border-2 border-primary p-4 sm:mt-6">
          <div className="flex flex-col items-center justify-center gap-1 py-4 md:flex-row md:gap-34 md:py-8">
            {[0, 1, 2].map((slot) => (
              <TraceLetter
                key={`${letter.id}-${slot}`}
                letter={letter}
                tool={tool}
                onComplete={() => handleComplete(slot)}
              />
            ))}
          </div>

          <img
            src={girlWriting.src}
            alt="طفلة تكتب في دفترها"
            loading="lazy"
            width={816}
            height={816}
            className="pointer-events-none absolute bottom-0 left-1 h-20 w-auto sm:h-32"
          />
          <img
            src={boyWriting.src}
            alt="طفل يكتب في دفتره"
            loading="lazy"
            width={816}
            height={816}
            className="pointer-events-none absolute bottom-0 right-1 h-20 w-auto sm:h-32"
          />
        </section>

        {party && <Celebration />}
      </main>
    </div>
  );
}
