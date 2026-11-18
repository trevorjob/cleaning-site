"use client";

import { easeInOut, motion, useMotionValue, useScroll, useTransform, type MotionValue } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { home } from "@/content/copy";
import { quoteCta } from "@/content/site";
import type { ResolvedImageSlot, VideoSource } from "@/lib/images";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { PageLockup } from "@/components/brand/Lockup";
import { AmbientVideo } from "@/components/ui/AmbientVideo";
import { ButtonLink } from "@/components/ui/Button";
import { FitText } from "@/components/ui/FitText";
import { ImageSlotView } from "@/components/ui/ImageSlotView";

type HeroMonumentProps = {
  readonly image: ResolvedImageSlot;
  readonly video: readonly VideoSource[] | null;
};

const [first, second, third] = home.hero.lines;
/** Scroll progress at which the clip has filled the screen; the rest is a hold. */
const EXPAND_END = 0.65;
const SLOT_SIZES = "(min-width: 768px) 25vw, 100vw";

type Box = { x: MotionValue<number>; y: MotionValue<number>; w: MotionValue<number>; h: MotionValue<number> };

function useBox(): Box {
  return { x: useMotionValue(0), y: useMotionValue(0), w: useMotionValue(0), h: useMotionValue(0) };
}

/** The name set like a building's tenant board; the clip in its last line opens to the whole screen on scroll. */
export function HeroMonument({ image, video }: HeroMonumentProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const insetRef = useRef<HTMLSpanElement>(null);
  const phoneSlotRef = useRef<HTMLDivElement>(null);
  const [isMeasured, setIsMeasured] = useState(false);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const still = useMotionValue(0);
  const open = useTransform(reduced ? still : scrollYProgress, [0, EXPAND_END], [0, 1], { ease: easeInOut });

  const slot = useBox();
  const stage = useBox();
  const left = useTransform([open, slot.x], ([t, x]: number[]) => x * (1 - t));
  const top = useTransform([open, slot.y], ([t, y]: number[]) => y * (1 - t));
  const width = useTransform([open, slot.w, stage.w], ([t, w, full]: number[]) => w + (full - w) * t);
  const height = useTransform([open, slot.h, stage.h], ([t, h, full]: number[]) => h + (full - h) * t);
  const captionOpacity = useTransform(open, [0.75, 1], [0, 1]);

  useLayoutEffect(() => {
    const stageEl = stageRef.current;
    if (!stageEl) return;
    const measure = () => {
      const target = [phoneSlotRef.current, insetRef.current].find((el) => el && el.offsetWidth > 0);
      if (!target) return;
      const s = stageEl.getBoundingClientRect();
      const r = target.getBoundingClientRect();
      slot.x.set(r.left - s.left);
      slot.y.set(r.top - s.top);
      slot.w.set(r.width);
      slot.h.set(r.height);
      stage.w.set(s.width);
      stage.h.set(s.height);
      setIsMeasured(true);
    };
    measure();
    const observer = new ResizeObserver(measure);
    [stageEl, insetRef.current, phoneSlotRef.current].forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [slot.x, slot.y, slot.w, slot.h, stage.w, stage.h]);

  const isScene = Boolean(video) && !reduced;
  const poster = <ImageSlotView slot={image} decorative priority className="h-full w-full text-[0px]" sizes={SLOT_SIZES} />;

  return (
    <section ref={sectionRef} aria-labelledby="hero-heading" className={isScene ? "h-[220svh]" : ""}>
      <div ref={stageRef} className={isScene ? "sticky top-0 h-svh overflow-hidden" : "relative"}>
        <div className="flex h-[calc(100svh-4.5rem)] flex-col justify-end px-gutter pt-4">
          <PageLockup className="animate-fade mb-6 shrink-0 md:mb-auto" />
          <div ref={phoneSlotRef} className="animate-fade mb-gutter min-h-0 flex-1 overflow-hidden bg-stone md:hidden">
            {poster}
          </div>
          {/* The name is ~2.85x as wide as tall: on short laptop screens this caps it so the logo above still fits. */}
          <h1 id="hero-heading" aria-label={home.hero.lines.join(" ")} className="grid md:max-w-[calc((100svh-24rem)*2.85)]">
            <span aria-hidden="true" className="wide block overflow-hidden">
              <FitText className="animate-rise">{first}</FitText>
            </span>
            <span aria-hidden="true" className="wide block overflow-hidden">
              <FitText className="animate-rise [animation-delay:80ms]">{second}</FitText>
            </span>
            <span aria-hidden="true" className="wide flex items-end justify-between gap-gap overflow-hidden">
              <FitText reserveRef={insetRef} className="animate-rise [animation-delay:160ms]">
                {third}
              </FitText>
              <span ref={insetRef} className="animate-fade mb-[0.075em] hidden h-[0.73em] w-[24vw] shrink-0 overflow-hidden bg-stone md:block">
                {poster}
              </span>
            </span>
          </h1>

          <div className="mt-gutter flex flex-col items-start justify-between gap-6 pb-gutter md:flex-row md:items-end">
            <p className="max-w-[40ch]">{home.hero.intro}</p>
            <ButtonLink href={quoteCta.href}>{quoteCta.label}</ButtonLink>
          </div>
        </div>

        {video && (
          <motion.div
            aria-hidden="true"
            style={{ left, top, width, height }}
            className={`absolute overflow-hidden transition-opacity duration-500 ${isMeasured ? "opacity-100" : "opacity-0"}`}
          >
            <AmbientVideo sources={video} poster={image.src ?? undefined} />
            <motion.div style={{ opacity: captionOpacity }} className="absolute inset-0 flex items-end bg-ink/25 px-gutter pb-gutter">
              <p className="serif max-w-[16ch] text-head text-porcelain">{home.hero.film}</p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
