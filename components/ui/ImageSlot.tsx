import type { ImageSlotName } from "@/content/types";
import { resolveImageSlot } from "@/lib/images";
import { ImageSlotView, type ImageSlotViewProps } from "./ImageSlotView";

type ImageSlotProps = Omit<ImageSlotViewProps, "slot"> & { readonly name: ImageSlotName };

/** Renders public/images/<name>.<ext> if it exists at build time, otherwise a labelled placeholder. */
export function ImageSlot({ name, ...props }: ImageSlotProps) {
  return <ImageSlotView slot={resolveImageSlot(name)} {...props} />;
}
