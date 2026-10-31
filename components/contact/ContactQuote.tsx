"use client";

import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { contactPage } from "@/content/copy";
import type { ResolvedImageSlot } from "@/lib/images";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { ImageSlotView } from "@/components/ui/ImageSlotView";

type Option = (typeof contactPage.picker.options)[number];

type ContactQuoteProps = {
  /** Resolved images, keyed by option value. */
  readonly images: Readonly<Record<string, ResolvedImageSlot>>;
};

/** Large space tiles above the form. Picking one shows the space and fills in the form's property type. */
export function ContactQuote({ images }: ContactQuoteProps) {
  const [selected, setSelected] = useState("");
  const reduced = usePrefersReducedMotion();
  const { picker } = contactPage;
  const current = picker.options.find((o) => o.value === selected);

  return (
    <div>
      <fieldset>
        <legend className="serif text-step">{picker.legend}</legend>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {picker.options.map((option) => (
            <Tile key={option.value} option={option} image={images[option.value]} isSelected={option.value === selected} onSelect={setSelected} />
          ))}
        </div>
      </fieldset>

      <div className="relative mt-3 overflow-hidden">
        <AnimatePresence initial={false}>
          {current ? (
            <motion.div
              key={current.value}
              initial={reduced ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <ImageSlotView slot={images[current.value]} decorative className="aspect-[16/7]" sizes="(min-width: 1024px) 800px, 100vw" />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="mt-12">
        <QuoteForm propertyType={selected} onPropertyTypeChange={setSelected} />
      </div>
    </div>
  );
}

type TileProps = {
  readonly option: Option;
  readonly image: ResolvedImageSlot;
  readonly isSelected: boolean;
  readonly onSelect: (value: string) => void;
};

function Tile({ option, image, isSelected, onSelect }: TileProps) {
  return (
    <label
      className={`group block cursor-pointer border bg-white p-2 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brass ${isSelected ? "border-ink" : "border-line hover:border-muted"}`}
    >
      <input
        type="radio"
        name="space"
        value={option.value}
        checked={isSelected}
        onChange={() => onSelect(option.value)}
        className="sr-only"
      />
      <ImageSlotView slot={image} decorative className="aspect-[4/3] text-[0px]" sizes="200px" />
      <span className="flex items-center justify-between px-1 pt-3 pb-1 text-small font-medium">
        {option.label}
        <span aria-hidden="true" className={`h-px w-6 bg-brass transition-transform duration-300 ${isSelected ? "scale-x-100" : "scale-x-0"}`} />
      </span>
    </label>
  );
}
