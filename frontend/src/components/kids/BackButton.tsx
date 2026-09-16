'use client';
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

export function BackToLearnButton() {
  return (
    <Link
      href="/learn"
      aria-label="العودة إلى الحروف"
      className="flex size-16 flex-col items-center justify-center gap-0.5 rounded-full border-4 border-primary bg-card text-primary shadow-md transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring sm:size-20 shrink-0"
    >
      <ArrowLeft className="size-6 sm:size-7" strokeWidth={2.5} />
      <span className="text-[10px] font-bold leading-none sm:text-[11px]">الحروف</span>
    </Link>
  );
}
