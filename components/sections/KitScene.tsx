"use client";

import { motion, useMotionValue, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { home } from "@/content/copy";
import type { ResolvedImageSlot } from "@/lib/images";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { ImageSlotView } from "@/components/ui/ImageSlotView";

/** Where each print sits on the wall, and how far it starts from there (vw, vh, degrees) when the kit is still in a pile. */
const WALL = [
  { place: "md:col-span-5 md:mt-20", ratio: "aspect-[4/5]", from: [22, 18, -9] },
  { place: "md:col-span-3 md:col-start-7 md:mt-56", ratio: "aspect-square", from: [-8, 6, 12] },
  { place: "md:col-span-3 md:col-start-10 md:mt-10", ratio: "aspect-[3/4]", from: [-30, 22, -6] },
  { place: "md:col-span-3 md:col-start-2 md:mt-16", ratio: "aspect-square", from: [18, -12, 14] },
  { place: "md:col-span-5 md:col-start-7 md:-mt-16", ratio: "aspect-[16/10]", from: [-10, -28, -11] },
] as const;

export function KitScene({ slots }: { readonly slots: readonly ResolvedImageSlot[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 0.85", "center 0.55"] });
  const settled = useMotionValue(1);
  const progress = reduced ? settled : scrollYProgress;
  const { kit } = home;

  return (
    <section ref={sectionRef} aria-labelledby="kit-heading" className="page-grid gap-y-6 overflow-x-clip pt-section">
      <h2 id="kit-heading" className="serif reveal col-span-12 text-head md:col-span-6">
        {kit.heading}
      </h2>
      <p className="reveal col-span-12 max-w-[36ch] self-end md:col-span-4 md:col-start-8">{kit.intro}</p>

      {kit.items.map((item, i) => (
        <Print key={item.slot} index={i} progress={progress} slot={slots[i]} name={item.name} text={item.text} />
      ))}
    </section>
  );
}

type PrintProps = {
  readonly index: number;
  readonly progress: MotionValue<number>;
  readonly slot: ResolvedImageSlot;
  readonly name: string;
  readonly text: string;
};

function Print({ index, progress, slot, name, text }: PrintProps) {
  const { place, ratio, from } = WALL[index];
  const x = useTransform(progress, [0, 1], [`${from[0]}vw`, "0vw"]);
  const y = useTransform(progress, [0, 1], [`${from[1]}vh`, "0vh"]);
  const rotate = useTransform(progress, [0, 1], [from[2], 0]);
  const scale = useTransform(progress, [0, 1], [0.88, 1]);

  return (
    <motion.figure
      style={{ x, y, rotate, scale, zIndex: WALL.length - index }}
      className={`relative col-span-12 mt-10 ${index % 2 ? "ml-auto w-3/4 md:ml-0 md:w-auto" : ""} ${place}`}
    >
      <ImageSlotView
        slot={slot}
        decorative
        className={`group bg-print ${ratio}`}
        imageClassName="object-cover transition-transform duration-1000 group-hover:scale-[1.04]"
        sizes="(min-width: 768px) 40vw, 100vw"
      />
      <figcaption className="mt-3.5 max-w-[32ch] text-small text-muted">
        <b className="font-medium text-ink">{name}.</b> {text}
      </figcaption>
    </motion.figure>
  );
}
