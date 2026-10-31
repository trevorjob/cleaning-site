import Image from "next/image";
import type { ResolvedImageSlot } from "@/lib/images";

export type ImageSlotViewProps = {
  readonly slot: ResolvedImageSlot;
  /** Size and aspect ratio of the box, e.g. "aspect-[4/5]". */
  readonly className?: string;
  readonly imageClassName?: string;
  readonly sizes?: string;
  readonly priority?: boolean;
  /** Decorative copies (e.g. the second photo in a scene) hide from screen readers. */
  readonly decorative?: boolean;
};

/** Client-safe renderer for a slot already resolved on the server. */
export function ImageSlotView({
  slot,
  className = "",
  imageClassName = "object-cover",
  sizes = "100vw",
  priority = false,
  decorative = false,
}: ImageSlotViewProps) {
  if (slot.src) {
    return (
      // next/image `fill` needs a positioned parent; keep a caller's `absolute` instead of overriding it.
      <div className={`${className.includes("absolute") ? "" : "relative"} overflow-hidden ${className}`}>
        <Image src={slot.src} alt={decorative ? "" : slot.alt} fill sizes={sizes} priority={priority} className={imageClassName} />
      </div>
    );
  }

  return (
    <div
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : slot.alt}
      aria-hidden={decorative || undefined}
      className={`flex flex-col items-center justify-center gap-2 bg-stone p-4 text-center ${className}`}
    >
      <span className="text-small font-medium text-ink">{slot.file}</span>
      <span className="max-w-xs text-small text-muted">{slot.brief}</span>
    </div>
  );
}
