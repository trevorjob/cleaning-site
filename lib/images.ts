import { existsSync } from "node:fs";
import path from "node:path";
import { imageSlots } from "@/content/images";
import type { ImageSlotName } from "@/content/types";

export type ResolvedImageSlot = {
  readonly name: ImageSlotName;
  readonly file: string;
  readonly src: string | null;
  readonly alt: string;
  readonly brief: string;
};

/** Server only: checks public/images at build time, so client scenes receive plain data. */
export function resolveImageSlot(name: ImageSlotName): ResolvedImageSlot {
  const { alt, brief, ext = "jpg" } = imageSlots[name];
  const file = `${name}.${ext}`;
  const exists = existsSync(path.join(process.cwd(), "public", "images", file));
  return { name, file, alt, brief, src: exists ? `/images/${file}` : null };
}

export type VideoSlotName = "hero" | "overnight";

/** Server only: returns /images/<name>.mp4 when that file exists at build time. */
export function resolveVideo(name: VideoSlotName): string | null {
  const file = `${name}.mp4`;
  return existsSync(path.join(process.cwd(), "public", "images", file)) ? `/images/${file}` : null;
}
