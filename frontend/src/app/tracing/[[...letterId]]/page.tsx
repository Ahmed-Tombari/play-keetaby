"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Star, ArrowLeft, BookOpen, Home } from "lucide-react";
import Link from "next/link";

import { Celebration } from "@/components/kids/Celebration";
import { ColorPalette } from "@/components/kids/ColorPalette";
import { NavButtons } from "@/components/kids/NavButtons";
import { TraceLetter } from "@/components/kids/TraceLetter";
import { RotateDevice } from "@/components/kids/RotateDevice";
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
    <>
      {/* Rotate device overlay — only shown on mobile in portrait */}
      <RotateDevice />

      {/* ═══════════════════════════════════════════════════════════════════
          DESKTOP LAYOUT (lg: 1025px+) — original design, image size increased
          ═══════════════════════════════════════════════════════════════════ */}
      <div dir="rtl" className="hidden lg:block min-h-dvh bg-primary p-4 font-arabic">
        <main className="relative flex min-h-[calc(100dvh-2rem)] flex-col overflow-hidden rounded-[2.5rem] border-[6px] border-primary bg-card p-6 shadow-frame">
          {/* Header row */}
          <div className="flex items-start justify-between gap-3">
            <NavButtons />

            <h1 className="mx-auto flex items-center gap-4 rounded-full border-[3px] border-card bg-[linear-gradient(180deg,color-mix(in_oklab,var(--primary)_78%,white)_0%,var(--primary)_45%,color-mix(in_oklab,var(--primary)_80%,black)_100%)] px-10 py-3 text-center text-2xl font-extrabold text-primary-foreground shadow-swatch ring-2 ring-primary">
              <Star className="size-9 shrink-0 fill-kid-yellow stroke-[1.5] text-primary drop-shadow-sm" />
              <span className="drop-shadow-[0_2px_0_color-mix(in_oklab,var(--primary)_60%,black)]">
                إتّبِع الأسْهُم وَ أكْمل كِتَابَة الحَرْف
              </span>
              <Star className="size-9 shrink-0 fill-kid-yellow stroke-[1.5] text-primary drop-shadow-sm" />
            </h1>

            <Link
              href="/learn"
              aria-label="الرجوع"
              className="flex w-20 h-[72px] shrink-0 flex-col items-center justify-center gap-0.5 rounded-2xl border-4 border-primary bg-card text-primary shadow-md transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring"
            >
              <ArrowLeft className="size-7" strokeWidth={2.5} />
              <span className="text-[11px] font-bold leading-none">رجوع</span>
            </Link>
          </div>

          {/* Tools */}
          <div className="mt-6">
            <ColorPalette tool={tool} onChange={setTool} />
          </div>

          {/* Worksheet */}
          <section className="relative mt-6 flex flex-1 items-center justify-center rounded-3xl border-2 border-primary p-4">
            <div className="flex flex-col items-center justify-center gap-1 py-8 md:flex-row md:gap-34">
              {[0, 1, 2].map((slot) => (
                <div key={`${letter.id}-${slot}`} className="flex items-center justify-center" style={{ height: 320 }}>
                  <TraceLetter
                    letter={letter}
                    tool={tool}
                    onComplete={() => handleComplete(slot)}
                  />
                </div>
              ))}
            </div>

            <img
              src={girlWriting.src}
              alt="طفلة تكتب في دفترها"
              loading="lazy"
              width={816}
              height={816}
              className="pointer-events-none absolute bottom-0 left-1 h-20 w-auto"
            />
            <img
              src={boyWriting.src}
              alt="طفل يكتب في دفتره"
              loading="lazy"
              width={816}
              height={816}
              className="pointer-events-none absolute bottom-0 right-1 h-20 w-auto"
            />
          </section>
        </main>

        {party && <Celebration />}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          MOBILE/TABLET LAYOUT (< 1024px)
          — Portrait: stacked card
          — Landscape: full-screen game (sidebar + canvas)
          ═══════════════════════════════════════════════════════════════════ */}
      <div
        dir="rtl"
        className="
          lg:hidden font-arabic bg-primary
          w-full h-dvh flex flex-col overflow-hidden
          p-2 sm:p-4
          mobile-landscape-p-0
        "
      >
        <main
          className="
            relative flex flex-col flex-1 overflow-hidden
            bg-card rounded-[2rem] border-[6px] border-primary shadow-frame
            p-3 sm:p-5
            mobile-landscape-full
            min-h-0
          "
        >
          {/* ── Portrait header (hidden in mobile landscape) ── */}
          <div className="flex items-start justify-between gap-2 mb-3 sm:mb-4 mobile-landscape-hidden">
            <Link
              href="/learn"
              aria-label="الرجوع"
              className="flex w-14 h-12 sm:w-20 sm:h-[72px] shrink-0 flex-col items-center justify-center gap-0.5
                rounded-2xl border-4 border-primary bg-card text-primary shadow-md
                transition-transform hover:scale-105 active:scale-95
                focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring"
            >
              <ArrowLeft className="size-5 sm:size-7" strokeWidth={2.5} />
              <span className="text-[9px] sm:text-[11px] font-bold leading-none">رجوع</span>
            </Link>

            <h1 className="
              mx-auto flex items-center gap-2
              rounded-full border-[3px] border-card
              bg-[linear-gradient(180deg,color-mix(in_oklab,var(--primary)_78%,white)_0%,var(--primary)_45%,color-mix(in_oklab,var(--primary)_80%,black)_100%)]
              px-4 py-2 sm:px-8 sm:py-3
              text-sm sm:text-xl font-extrabold text-primary-foreground
              shadow-swatch ring-2 ring-primary text-center
            ">
              <Star className="size-5 sm:size-8 shrink-0 fill-kid-yellow stroke-[1.5] text-primary drop-shadow-sm" />
              <span className="drop-shadow-[0_2px_0_color-mix(in_oklab,var(--primary)_60%,black)]">
                إتّبِع الأسْهُم وَ أكْمل كِتَابَة الحَرْف
              </span>
              <Star className="size-5 sm:size-8 shrink-0 fill-kid-yellow stroke-[1.5] text-primary drop-shadow-sm" />
            </h1>

            {/* Empty space matching back button width to keep title centered */}
            <div className="w-14 sm:w-20 h-12 sm:h-[72px] shrink-0 border-4 border-transparent"></div>
          </div>

          {/* ── Portrait color palette ── */}
          <div className="mb-2 sm:mb-4 mobile-landscape-hidden">
            <ColorPalette tool={tool} onChange={setTool} />
          </div>

          {/* ── LANDSCAPE: sidebar + canvas ── */}
          {/*
            This whole block is invisible in portrait (hidden) and in desktop (lg:hidden on parent).
            Only shows on mobile/tablet in landscape.
          */}
          <div
            className="
              hidden
              mobile-landscape-hidden-inverse
            "
            style={{
              /* We use inline style to override the hidden class in landscape */
            }}
          >
          </div>

          {/* Use a CSS trick: landscape shows flex, portrait shows nothing */}
          <style>{`
            @media (max-width: 1024px) and (orientation: landscape) {
              .mobile-game-layout { display: flex !important; }
              .mobile-portrait-only { display: none !important; }
            }
            @media not ((max-width: 1024px) and (orientation: landscape)) {
              .mobile-game-layout { display: none !important; }
            }
          `}</style>

          {/* ── Landscape game layout ── */}
          <div className="mobile-game-layout hidden flex-row-reverse items-stretch flex-1 overflow-hidden min-h-0 gap-0">
            {/* Sidebar */}
            <aside className="
              flex flex-col items-center justify-between gap-2
              bg-primary py-2 px-2 shrink-0
              w-[14vw] min-w-[64px] max-w-[110px]
            ">
              {/* <div className="flex flex-col items-center gap-2 w-full">
                <Link
                  href="/"
                  aria-label="الرئيسية"
                  className="flex flex-col items-center justify-center gap-0.5 rounded-2xl border-4 border-card bg-card text-primary
                    w-full aspect-square max-w-[52px] shadow-md transition-transform hover:scale-105 active:scale-95
                    focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring"
                >
                  <Home className="size-4" strokeWidth={2.5} />
                  <span className="text-[7px] font-bold leading-none">الرئيسية</span>
                </Link>
                <Link
                  href="/learn"
                  aria-label="المحتوى"
                  className="flex flex-col items-center justify-center gap-0.5 rounded-2xl border-4 border-card bg-card text-primary
                    w-full aspect-square max-w-[52px] shadow-md transition-transform hover:scale-105 active:scale-95
                    focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring"
                >
                  <BookOpen className="size-4" strokeWidth={2.5} />
                  <span className="text-[7px] font-bold leading-none">المحتوى</span>
                </Link>
              </div> */}

              <div className="flex flex-col items-center flex-1 justify-center w-full py-1 overflow-y-auto overflow-x-hidden min-h-0">
                <ColorPalette tool={tool} onChange={setTool} vertical />
              </div>


            </aside>

            {/* Canvas area */}
            <section className="relative flex flex-1 items-center justify-center overflow-hidden bg-card min-w-0 min-h-0">
              {/* Title bar — centered */}
              <div className="absolute top-0 inset-x-0 z-10 flex items-start justify-center pointer-events-none py-1 pr-[calc(2*36px+1rem)]">
                <span className="
                  inline-flex items-center gap-2 rounded-full border-[3px] border-card
                  bg-[linear-gradient(180deg,color-mix(in_oklab,var(--primary)_78%,white)_0%,var(--primary)_45%,color-mix(in_oklab,var(--primary)_80%,black)_100%)]
                  px-4 py-1
                  text-[clamp(0.55rem,1.8vh,1rem)] font-extrabold text-primary-foreground
                  shadow-swatch ring-2 ring-primary
                ">
                  <Star className="size-[1.4em] shrink-0 fill-kid-yellow stroke-[1.5] text-primary" />
                  إتّبِع الأسْهُم وَ أكْمل كِتَابَة الحَرْف
                  <Star className="size-[1.4em] shrink-0 fill-kid-yellow stroke-[1.5] text-primary" />
                </span>
              </div>

              {/* Back button — top-right of canvas */}
              <div className="absolute top-1.5 right-2 z-20 flex flex-row gap-1.5">
                <Link
                  href="/learn"
                  aria-label="الرجوع"
                  className="flex flex-col items-center justify-center gap-1 rounded-2xl border-2 border-primary bg-card text-primary
                    h-[clamp(40px,8vh,62px)] w-[clamp(60px,7vh,60px)] shadow-md transition-transform hover:scale-105 active:scale-95
                    focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring"
                >
                  <ArrowLeft className="size-[60%] min-h-[12px]" strokeWidth={2.5} />
                  <span className="text-[6px] sm:text-[8px] font-bold leading-none whitespace-nowrap">رجوع</span>
                </Link>
              </div>

              {/* 3 letter slots */}
              <div className="flex flex-row items-center justify-center gap-[3vw] px-2 pt-[7vh] pb-[2vh] h-full w-full">
                {[0, 1, 2].map((slot) => (
                  <div key={`${letter.id}-${slot}`} className="flex-1 min-w-0 h-full flex items-center justify-center">
                    <TraceLetter
                      letter={letter}
                      tool={tool}
                      onComplete={() => handleComplete(slot)}
                    />
                  </div>
                ))}
              </div>

              <img src={girlWriting.src} alt="طفلة تكتب"
                className="pointer-events-none absolute bottom-0 left-0 h-[16vh] min-h-[36px] max-h-[72px] w-auto" />
              <img src={boyWriting.src} alt="طفل يكتب"
                className="pointer-events-none absolute bottom-0 right-0 h-[16vh] min-h-[36px] max-h-[72px] w-auto" />
            </section>
          </div>

          {/* ── Portrait worksheet ── */}
          <section className="mobile-portrait-only relative flex flex-1 items-center justify-center rounded-3xl border-2 border-primary p-3 sm:p-4 overflow-hidden min-h-0">
            <div className="flex flex-col items-center justify-center gap-2 sm:gap-4 w-full h-full">
              {[0, 1, 2].map((slot) => (
                <div key={`${letter.id}-${slot}`} className="flex-1 min-h-0 w-full flex items-center justify-center">
                  <TraceLetter
                    letter={letter}
                    tool={tool}
                    onComplete={() => handleComplete(slot)}
                  />
                </div>
              ))}
            </div>
            <img src={girlWriting.src} alt="طفلة تكتب في دفترها"
              className="pointer-events-none absolute bottom-0 left-1 h-16 sm:h-24 w-auto" />
            <img src={boyWriting.src} alt="طفل يكتب في دفتره"
              className="pointer-events-none absolute bottom-0 right-1 h-16 sm:h-24 w-auto" />
          </section>
        </main>

        {party && <Celebration />}
      </div>
    </>
  );
}
