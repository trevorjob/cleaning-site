"use client";

import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { motion, useSpring, useTransform } from "motion/react";
import { useEffect, useState, type PointerEvent, type ReactNode } from "react";

type ImageCompareProps = {
  readonly before: ReactNode;
  readonly after: ReactNode;
  readonly label: string;
  readonly labels: readonly [string, string];
  readonly className?: string;
};

/** Before/after split driven by a native range input, so keyboard, touch and screen readers work for free. */
export function ImageCompare({ before, after, label, labels, className = "" }: ImageCompareProps) {
  const [value, setValue] = useState(50);
  const reduced = usePrefersReducedMotion();
  const spring = useSpring(50, { stiffness: 500, damping: 45 });

  useEffect(() => {
    if (reduced) spring.jump(value);
    else spring.set(value);
  }, [value, reduced, spring]);

  // iOS only drags a range input by its thumb, so pointer drags anywhere set the value directly.
  const setFromPointer = (event: PointerEvent<HTMLInputElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setValue(Math.round(Math.min(100, Math.max(0, ((event.clientX - rect.left) / rect.width) * 100))));
  };

  const clipPath = useTransform(spring, (v) => `inset(0 ${100 - v}% 0 0)`);
  const left = useTransform(spring, (v) => `${v}%`);

  return (
    <div className={`relative select-none overflow-hidden bg-stone ${className}`}>
      <div className="absolute inset-0">{after}</div>
      <motion.div className="absolute inset-0" style={{ clipPath }}>
        {before}
      </motion.div>

      <span aria-hidden="true" className="absolute top-4 left-4 bg-porcelain px-3 py-1.5 text-small font-medium text-ink">
        {labels[0]}
      </span>
      <span aria-hidden="true" className="absolute top-4 right-4 bg-porcelain px-3 py-1.5 text-small font-medium text-ink">
        {labels[1]}
      </span>

      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          setFromPointer(e);
        }}
        onPointerMove={(e) => {
          if (e.currentTarget.hasPointerCapture(e.pointerId)) setFromPointer(e);
        }}
        aria-label={label}
        aria-valuetext={`${value}% ${labels[0].toLowerCase()}`}
        className="peer absolute inset-0 z-10 h-full w-full cursor-ew-resize touch-pan-y opacity-0"
      />

      <motion.div aria-hidden="true" style={{ left }} className="pointer-events-none absolute inset-y-0 w-px -translate-x-1/2 bg-brass" />
      <motion.div
        aria-hidden="true"
        style={{ left }}
        className="pointer-events-none absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-ink bg-porcelain text-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brass"
      >
        <svg viewBox="0 0 20 12" className="h-3 w-5" fill="none" stroke="currentColor" strokeWidth="1.25">
          <path d="M6 1 1 6l5 5M14 1l5 5-5 5" />
        </svg>
      </motion.div>
    </div>
  );
}
