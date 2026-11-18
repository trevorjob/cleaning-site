"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useState, type ReactNode } from "react";

/** Scrolled less than this, the bar is part of the page: transparent and always shown. */
const TOP_ZONE = 80;
/** Ignores trackpad jitter so the bar does not flicker. */
const MIN_DELTA = 6;

/** Sticky bar that slides away while reading down the page and comes back on any scroll up. */
export function HeaderBar({ children }: { readonly children: ReactNode }) {
  const { scrollY } = useScroll();
  const [isHidden, setIsHidden] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  useMotionValueEvent(scrollY, "change", (y) => {
    const delta = y - (scrollY.getPrevious() ?? y);
    setIsAtTop(y < TOP_ZONE);
    if (y < TOP_ZONE) setIsHidden(false);
    else if (Math.abs(delta) > MIN_DELTA) setIsHidden(delta > 0);
  });

  return (
    <header
      onFocusCapture={() => setIsHidden(false)}
      className={`sticky top-0 z-30 flex items-center justify-between gap-6 px-gutter py-3 text-small transition-[translate,background-color] duration-500 ease-out-soft motion-reduce:transition-none ${
        isHidden ? "-translate-y-full" : ""
      } ${isAtTop ? "" : "bg-porcelain/95 backdrop-blur-md"}`}
    >
      {children}
    </header>
  );
}
