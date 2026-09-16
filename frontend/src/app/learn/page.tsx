'use client';
import { useCallback, useState } from "react";
import { BookOpen, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./learn.css";

type TileColor = "red" | "green" | "orange" | "purple" | "blue";

type LetterItem = {
  id: string;
  char: string;
  spoken: string;
  name: string;
  color: TileColor;
};

const LETTERS: LetterItem[] = [
  { id: "alif", char: "أ", spoken: "أ", name: "أَلِف", color: "red" },
  { id: "baa", char: "ب", spoken: "ب", name: "بَاء", color: "green" },
  { id: "tahaa", char: "ت", spoken: "ت", name: "تَاء", color: "orange" },
  { id: "thaaa", char: "ث", spoken: "ث", name: "ثَاء", color: "purple" },
  { id: "jim", char: "ج", spoken: "ج", name: "جِيم", color: "blue" },
  { id: "haa", char: "ح", spoken: "ح", name: "حَاء", color: "red" },
  { id: "khaa", char: "خ", spoken: "خ", name: "خَاء", color: "green" },
  { id: "daal", char: "د", spoken: "د", name: "دَال", color: "blue" },
  { id: "thaal", char: "ذ", spoken: "ذ", name: "ذَال", color: "purple" },
  { id: "raa", char: "ر", spoken: "ر", name: "رَاء", color: "green" },
  { id: "zaa", char: "ز", spoken: "ز", name: "زَاي", color: "red" },
  { id: "sin", char: "س", spoken: "س", name: "سِين", color: "orange" },
  { id: "chin", char: "ش", spoken: "ش", name: "شِين", color: "purple" },
  { id: "saad", char: "ص", spoken: "ص", name: "صَاد", color: "blue" },
  { id: "daad", char: "ض", spoken: "ض", name: "ضَاد", color: "green" },
  { id: "taaa", char: "ط", spoken: "ط", name: "طَاء", color: "red" },
  { id: "thaad", char: "ظ", spoken: "ظ", name: "ظَاء", color: "blue" },
  { id: "aaa", char: "ع", spoken: "ع", name: "عَين", color: "orange" },
  { id: "gaa", char: "غ", spoken: "غ", name: "غَين", color: "purple" },
  { id: "faa", char: "ف", spoken: "ف", name: "فَاء", color: "green" },
  { id: "kaa", char: "ق", spoken: "ق", name: "قَاف", color: "orange" },
  { id: "kaaf", char: "ك", spoken: "ك", name: "كَاف", color: "purple" },
  { id: "lam", char: "ل", spoken: "ل", name: "لَام", color: "green" },
  { id: "mim", char: "م", spoken: "م", name: "مِيم", color: "red" },
  { id: "noun", char: "ن", spoken: "ن", name: "نُون", color: "blue" },
  { id: "haaa", char: "هـ", spoken: "ه", name: "هَاء", color: "orange" },
  { id: "waaw", char: "و", spoken: "و", name: "وَاو", color: "purple" },
  { id: "yaa", char: "ي", spoken: "ي", name: "يَاء", color: "blue" },
];

function speakArabic(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ar-SA";
  utter.rate = 0.75;
  utter.pitch = 1.15;
  const voice = synth.getVoices().find((item) => item.lang?.toLowerCase().startsWith("ar"));
  if (voice) utter.voice = voice;
  synth.speak(utter);
}

function Flower({ color, className = "" }: { color: string; className?: string }) {
  return (
    <svg viewBox="0 0 50 66" aria-hidden="true" className={className}>
      <path d="M25 63V34" className="flower-stem" />
      <path d="M24 48C14 39 7 47 11 54c5 3 10 1 14-4M26 42c9-8 16-1 12 6-4 3-8 2-12-2" className="flower-leaf" />
      <g className={`flower-${color}`}>
        <ellipse cx="25" cy="12" rx="8" ry="12" />
        <ellipse cx="25" cy="34" rx="8" ry="12" />
        <ellipse cx="14" cy="23" rx="12" ry="8" />
        <ellipse cx="36" cy="23" rx="12" ry="8" />
      </g>
      <circle cx="25" cy="23" r="7" className="flower-center" />
    </svg>
  );
}

export default function LearnPage() {
  const router = useRouter();
  const [active, setActive] = useState<string | null>(null);

  const onLetter = useCallback(
    (letter: LetterItem) => {
      setActive(letter.char);
      speakArabic(letter.name);
      window.setTimeout(() => {
        router.push(`/tracing/${letter.id}`);
      }, 350);
    },
    [router]
  );

  return (
    <div className="arabiblearn-theme">
      <main dir="rtl" className="alphabet-scene">
        {/* Fullscreen Background Image */}
        <div className="bg-image-wrapper">
          <Image
            src="/assets/backgrd.jpg"
            alt="خلفية تعليمية"
            fill
            priority
            quality={90}
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center bottom" }}
          />
        </div>

        {/* Foreground Content Shell */}
        <div className="page-shell">
          {/* Header UNTOUCHED */}
          <header className="learning-header">
            <div className="brand-lockup">
              <Image src="/assets/star-mascot.png" alt="نجمة متعة التعلم" width={90} height={80} className="mascot" priority />
              <div className="brand-words" aria-label="متعة التعلم">
                <span>متعة</span>
                <span>التعلم</span>
              </div>
            </div>

            <h1 className="title-banner">
              <b>★</b>
              <span>الحروف المجردة</span>
              <b>★</b>
            </h1>

            <nav className="learning-nav" aria-label="التنقل الرئيسي">
              <Link href="/" className="nav-card nav-home" aria-label="الرئيسية">
                <Home aria-hidden="true" />
                <span>الرئيسية</span>
              </Link>
              <Link href="/" className="nav-card nav-content" aria-label="المحتوى">
                <BookOpen aria-hidden="true" />
                <span>المحتوى</span>
              </Link>
            </nav>
          </header>

          {/* Reduced Letters Box Container */}
          <section className="board-wrap" aria-label="الحروف العربية">
            <svg className="wavy-frame" viewBox="0 0 1200 610" preserveAspectRatio="none" aria-hidden="true">
              <path d="M35 7 Q75 0 118 7 Q180 14 246 7 Q318 0 388 7 Q458 14 530 7 Q600 0 670 7 Q742 14 812 7 Q884 0 954 7 Q1024 14 1090 7 Q1158 0 1181 31 Q1200 58 1191 91 Q1181 124 1192 158 Q1201 191 1191 224 Q1180 257 1192 291 Q1201 324 1191 357 Q1180 391 1192 425 Q1201 459 1190 491 Q1178 526 1193 564 Q1198 588 1170 601 Q1118 610 1070 602 Q1008 594 944 603 Q878 612 812 603 Q742 594 672 603 Q601 612 530 603 Q460 594 390 603 Q322 612 252 603 Q184 594 116 602 Q53 611 27 590 Q12 573 20 543 Q29 510 10 477 Q0 445 11 412 Q22 379 10 345 Q0 312 11 279 Q22 246 10 212 Q0 179 11 146 Q22 113 9 79 Q0 47 18 23 Q24 13 35 7Z" />
            </svg>

            <div className="letter-grid">
              {LETTERS.map((letter) => (
                <button
                  key={letter.id}
                  type="button"
                  onClick={() => onLetter(letter)}
                  aria-label={`الحرف ${letter.name}`}
                  className={`letter-tile tile-${letter.color}${active === letter.char ? " is-active" : ""}`}
                >
                  <span>{letter.char}</span>
                </button>
              ))}
            </div>

            {/* Side Ornaments */}
            <div className="side-flowers left-flowers" aria-hidden="true">
              <Flower color="green" />
              <Flower color="pink" />
              <Flower color="blue" />
              <Flower color="purple" />
            </div>

            <div className="right-ornaments" aria-hidden="true">
              <span className="gold-star">★</span>
            </div>

            {/* Corner Illustrations pinned directly to the bottom corners of this box */}
            <Image src="/assets/apple-books.png" alt="كتب وتفاحة" width={150} height={150} className="corner-art apple-books" priority />
            <Image src="/assets/pencils.png" alt="أقلام تلوين" width={140} height={140} className="corner-art pencils" priority />
          </section>
        </div>
      </main>
    </div>
  );
}