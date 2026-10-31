import { home } from "@/content/copy";
import { resolveImageSlot, resolveVideo } from "@/lib/images";
import { ImageCompare } from "@/components/ui/ImageCompare";
import { ImageSlotView } from "@/components/ui/ImageSlotView";
import { Heading, Section } from "@/components/ui/Section";
import { OvernightScene } from "./OvernightScene";

/** The pinned evening-to-morning scene, then the same pair as a slider the visitor controls. */
export function Overnight() {
  const evening = resolveImageSlot("overnight-evening");
  const morning = resolveImageSlot("overnight-morning");
  const { compare } = home;

  return (
    <>
      <OvernightScene evening={evening} morning={morning} video={resolveVideo("overnight")} />
      <Section labelledBy="compare-heading">
        <Heading id="compare-heading">{compare.heading}</Heading>
        <ImageCompare
          className="reveal mt-12 aspect-[4/5] sm:aspect-[16/9]"
          label={compare.sliderLabel}
          labels={compare.labels}
          before={<ImageSlotView slot={evening} className="h-full w-full" sizes="100vw" />}
          after={<ImageSlotView slot={morning} className="h-full w-full" sizes="100vw" />}
        />
      </Section>
    </>
  );
}
