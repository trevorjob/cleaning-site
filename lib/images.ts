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
  return { name, file, alt, brief, src: publicImageExists(file) ? `/images/${file}` : null };
}

export type VideoSlotName = "hero" | "overnight";

export type VideoSource = { readonly src: string; readonly type: string };

/** AV1 Main, level 3.1, 8-bit: what scripts/encode-videos.sh writes. Browsers without it skip to H.264. */
const AV1_TYPE = 'video/mp4; codecs="av01.0.05M.08"';

function publicImageExists(file: string): boolean {
  return existsSync(path.join(process.cwd(), "public", "images", file));
}

/** Server only: the AV1 and H.264 encodes of a clip, smallest first, or null when the H.264 file is missing. */
export function resolveVideo(name: VideoSlotName): readonly VideoSource[] | null {
  if (!publicImageExists(`${name}.mp4`)) return null;
  const h264 = { src: `/images/${name}.mp4`, type: "video/mp4" };
  return publicImageExists(`${name}.av1.mp4`) ? [{ src: `/images/${name}.av1.mp4`, type: AV1_TYPE }, h264] : [h264];
}
