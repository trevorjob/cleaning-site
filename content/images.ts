import type { ImageSlotName } from "./types";

export type ImageSlotSpec = {
  /** Alt text once the photo is in place. */
  readonly alt: string;
  /** The intended shot, shown on the placeholder. Full prompts live in docs/image-prompts.md. */
  readonly brief: string;
  /** Kit objects are PNGs on pure white, multiplied onto the page. */
  readonly ext?: "jpg" | "png";
};

export const imageSlots: Readonly<Record<ImageSlotName, ImageSlotSpec>> = {
  hero: {
    alt: "A cloth gliding across a marble worktop, leaving it polished",
    brief: "Still from the hero video: gloved hand, cloth, marble, raking light",
  },
  about: {
    alt: "A glass meeting room partition, polished, with an office softly visible behind",
    brief: "Glass partition with the office behind, morning light",
  },
  statement: {
    alt: "A cleaner polishing a stone reception desk in early morning light",
    brief: "Figure from behind polishing a reception desk at dawn, slight motion blur",
  },
  "service-offices": {
    alt: "A City office floor with glass walls and pale desks in cool morning daylight",
    brief: "City glass-tower office, white desks, steel, grey carpet, cool daylight",
  },
  "service-holiday-lets": {
    alt: "A whitewashed coastal cottage bedroom with linen and sea light",
    brief: "Whitstable cottage: painted boards, linen, blue-grey sea light",
  },
  "service-airbnb": {
    alt: "A warehouse apartment kitchen with brick walls and oak worktops, reset for guests",
    brief: "Shoreditch warehouse flat: brick, oak, black metal, afternoon sun",
  },
  "service-apartments": {
    alt: "A Kensington period drawing room with plaster mouldings, parquet and a red rug",
    brief: "Period flat: mouldings, parquet, ochre or oxblood rug, tall windows",
  },
  "action-offices": {
    alt: "A cleaner vacuuming an empty office floor at dusk",
    brief: "Figure from behind vacuuming between desks at dusk, city lights outside",
  },
  "action-holiday-lets": {
    alt: "Hands smoothing a fresh white sheet over a bed",
    brief: "Close-up: gloved hands tucking a crisp sheet, sea light",
  },
  "action-airbnb": {
    alt: "Hands placing folded towels on a bed for the next guest",
    brief: "Close-up: hands setting a folded towel stack, warm afternoon light",
  },
  "action-apartments": {
    alt: "A cloth polishing a brass tap in a marble bathroom",
    brief: "Macro: cloth polishing a brass tap, marble basin, raking light",
  },
  "step-walkthrough": {
    alt: "A hand holding a notebook during a walk-round of an office reception",
    brief: "Over-the-shoulder: notebook and pen, reception in soft focus",
  },
  "step-spec": {
    alt: "A printed cleaning specification on a clipboard on a marble desk",
    brief: "Top-down: printed spec sheet on a clipboard, brass clip, marble",
  },
  "step-arrival": {
    alt: "A cleaning trolley waiting in a quiet lift lobby at night",
    brief: "Cleaning trolley in a lift lobby at night, warm downlights",
  },
  "kit-spray": { alt: "Amber glass spray bottle", brief: "Amber glass spray bottle, pure white background", ext: "png" },
  "kit-cloths": { alt: "Folded microfibre cloths", brief: "Three folded cloths, stone tones, pure white background", ext: "png" },
  "kit-brush": { alt: "Horsehair detail brush with walnut handle", brief: "Horsehair brush, walnut handle, pure white background", ext: "png" },
  "kit-soap": { alt: "Stone soap in a bottle with a brass cap", brief: "Glass bottle, brass cap, pure white background", ext: "png" },
  "kit-chamois": { alt: "Folded chamois leather", brief: "Folded chamois leather, pure white background", ext: "png" },
  // PLACEHOLDER: AI stand-ins for design only. Replace with real photos of a real clean before launch.
  "overnight-evening": {
    alt: "An office at the end of the working day, lights low, desks cluttered",
    brief: "First frame of overnight.mp4: 18:00, cluttered desks, lamps on",
  },
  "overnight-morning": {
    alt: "The same office the next morning, clean and ready in soft daylight",
    brief: "Last frame of overnight.mp4: 07:00, clear desks, daylight",
  },
};
