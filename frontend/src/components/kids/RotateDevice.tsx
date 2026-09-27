"use client";

import { useEffect, useState } from "react";
import { Smartphone, RotateCw } from "lucide-react";

export function RotateDevice() {
  const [needsRotation, setNeedsRotation] = useState(false);
  
  useEffect(() => {
    // Attempt automatic lock via Screen Orientation API
    const tryLockOrientation = async () => {
      try {
        if (screen.orientation && "lock" in screen.orientation) {
          // @ts-ignore
          await screen.orientation.lock("landscape");
        }
      } catch (err) {
        // Will throw until Fullscreen is requested in some browsers
        console.warn("Could not automatically lock orientation:", err);
      }
    };
    tryLockOrientation();

    const checkOrientation = () => {
      if (typeof window !== "undefined") {
        setNeedsRotation(window.innerHeight > window.innerWidth && window.innerWidth <= 1024);
      }
    };

    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);
    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);

  if (!needsRotation) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-primary text-white" dir="rtl">
      <div className="flex flex-col items-center gap-6 p-8 text-center animate-out fade-out">
        <div className="relative flex items-center justify-center h-32 w-32 rounded-full bg-card/10 shadow-lg">
          <Smartphone size={64} className="animate-pulse" />
          <RotateCw size={32} className="absolute -bottom-2 -right-2 animate-[spin_3s_linear_infinite] text-kid-yellow" />
        </div>
        <h2 className="font-arabic text-3xl font-extrabold sm:text-4xl">
          الرجاء تدوير الشاشة
        </h2>
        <p className="font-arabic text-lg sm:text-xl oklch(0.9 0.05 300) max-w-sm">
          للحصول على أفضل تجربة، أدر هاتفك لتشغيله في وضع العرض (الشاشة الأفقية).
        </p>
      </div>
    </div>
  );
}
