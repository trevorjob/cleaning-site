"use client";

import { AnimatePresence, motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { home } from "@/content/copy";
import type { ResolvedImageSlot, VideoSource } from "@/lib/images";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { FitText } from "@/components/ui/FitText";
import { ImageSlotView } from "@/components/ui/ImageSlotView";
import { ScrubVideo } from "@/components/ui/ScrubVideo";

const { overnight } = home;
const START: number = overnight.startHour;
const END: number = overnight.endHour;
/** Scroll progress where the clock starts and stops, leaving a short hold at each end. */
const RUN: [number, number] = [0.08, 0.92];

function formatHour(hour: number): string {
  const h = Math.floor(hour) % 24;
  const m = Math.floor((hour % 1) * 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

type OvernightSceneProps = {
  readonly evening: ResolvedImageSlot;
  readonly morning: ResolvedImageSlot;
  /** When present, a scroll-scrubbed time-lapse replaces the two photos. */
  readonly video: readonly VideoSource[] | null;
};

/** Pinned on the room while scroll runs the clock from 18:00 to 07:00, set huge across the bottom. */
export function OvernightScene({ evening, morning, video }: OvernightSceneProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const finished = useMotionValue(1);
  const progress = reduced ? finished : scrollYProgress;

  const hour = useTransform(progress, RUN, [START, END]);
  const clock = useTransform(hour, formatHour);
  const night = useTransform(hour, [START, START + 5, END - 2], [0, 0.55, 0]);
  const dawn = useTransform(hour, [END - 4, END - 0.5], [0, 1]);

  const [captionIndex, setCaptionIndex] = useState(-1);
  useMotionValueEvent(hour, "change", (value) => {
    const next = overnight.captions.findLastIndex((c) => value >= c.at);
    setCaptionIndex(value >= END - 0.01 ? overnight.captions.length : next);
  });
  const shownIndex = reduced ? overnight.captions.length : captionIndex;
  const caption = overnight.captions[shownIndex];
  const isDone = shownIndex >= overnight.captions.length;

  return (
    <section ref={sectionRef} aria-labelledby="overnight-heading" className={`mt-section bg-ink ${reduced ? "" : "h-[250svh]"}`}>
      <div className={reduced ? "" : "sticky top-0 h-svh"}>
        <div className="relative h-svh overflow-hidden text-porcelain">
          {video ? (
            <ScrubVideo sources={video} poster={evening.src ?? undefined} progress={progress} className="absolute inset-0" />
          ) : (
            <>
              <ImageSlotView slot={evening} className="absolute inset-0" sizes="100vw" />
              <motion.div aria-hidden="true" style={{ opacity: night }} className="absolute inset-0 bg-ink" />
              <motion.div style={{ opacity: dawn }} className="absolute inset-0">
                <ImageSlotView slot={morning} className="absolute inset-0" sizes="100vw" />
              </motion.div>
            </>
          )}
          {/* A flat scrim so the type stays readable on any frame. */}
          <div aria-hidden="true" className="absolute inset-0 bg-ink/35" />

          <div className="relative flex h-full flex-col justify-between px-gutter pt-gutter">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
              <h2 id="overnight-heading" className="serif max-w-[14ch] text-head">
                {overnight.heading}
              </h2>
              <div aria-live="polite" className="min-h-16 md:max-w-xs md:text-right">
                <AnimatePresence mode="wait">
                  {isDone || caption ? (
                    <motion.p
                      key={isDone ? "done" : caption.time}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.35 }}
                      className={isDone ? "serif text-step" : ""}
                    >
                      {isDone ? overnight.closing : caption.text}
                    </motion.p>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>

            <p aria-hidden="true" className="wide -mb-[0.1em] tabular-nums">
              <FitText>
                <motion.span>{clock}</motion.span>
              </FitText>
            </p>
          </div>
        </div>
      </div>

      <ol className="sr-only">
        {overnight.captions.map((c) => (
          <li key={c.time}>
            {c.time}: {c.text}
          </li>
        ))}
      </ol>
    </section>
  );
}
