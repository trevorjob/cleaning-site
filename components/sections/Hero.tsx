import { resolveImageSlot, resolveVideo } from "@/lib/images";
import { HeroMonument } from "./HeroMonument";

export function Hero() {
  return <HeroMonument image={resolveImageSlot("hero")} video={resolveVideo("hero")} />;
}
