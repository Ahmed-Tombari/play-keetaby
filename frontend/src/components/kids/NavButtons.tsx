'use client';
import { BookOpen, Home } from "lucide-react";
import Link from "next/link";

export function NavButtons() {
  return (
    <nav className="flex items-start gap-3" aria-label="التنقل">
      <Link
        href="/"
        aria-label="الصفحة الرئيسية"
        className="flex size-16 flex-col items-center justify-center gap-0.5 rounded-full border-4 border-primary bg-card text-primary shadow-md transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring sm:size-20"
      >
        <Home className="size-6 sm:size-7" strokeWidth={2.5} />
        <span className="text-[10px] font-bold leading-none sm:text-[11px]">الرئيسية</span>
      </Link>
      <Link
        href="/learn"
        aria-label="المحتوى"
        className="flex size-16 flex-col items-center justify-center gap-0.5 rounded-full border-4 border-primary bg-card text-primary shadow-md transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring sm:size-20"
      >
        <BookOpen className="size-6 sm:size-7" strokeWidth={2.5} />
        <span className="text-[10px] font-bold leading-none sm:text-[11px]">المحتوى</span>
      </Link>
    </nav>
  );
}
