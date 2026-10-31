import { home } from "@/content/copy";
import { resolveImageSlot } from "@/lib/images";
import { KitScene } from "./KitScene";

/** Resolves the kit images on the server, then hands them to the scroll scene. */
export function Kit() {
  return <KitScene slots={home.kit.items.map((item) => resolveImageSlot(item.slot))} />;
}
