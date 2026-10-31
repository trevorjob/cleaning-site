import { services } from "@/content/services";
import { resolveImageSlot } from "@/lib/images";
import { ServicesPoster } from "./ServicesPoster";

export function Services() {
  const items = services.map(({ id, shortTitle, tagline, actionImage }) => ({ id, shortTitle, tagline, image: resolveImageSlot(actionImage) }));
  return <ServicesPoster items={items} />;
}
