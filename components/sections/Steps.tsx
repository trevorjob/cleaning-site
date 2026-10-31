import { home } from "@/content/copy";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Heading, Section } from "@/components/ui/Section";

/** Each step sits two columns further right, so the order reads from the layout rather than from numbers. */
const STEP_PLACEMENT = [
  { image: "md:col-start-1", body: "md:col-start-4" },
  { image: "md:col-start-3", body: "md:col-start-6" },
  { image: "md:col-start-5", body: "md:col-start-8" },
] as const;

export function Steps() {
  const { steps } = home;
  return (
    <Section labelledBy="steps-heading">
      <Heading id="steps-heading" className="mb-16">
        {steps.heading}
      </Heading>
      <ol className="space-y-14 md:space-y-10">
        {steps.items.map((step, i) => (
          <li key={step.title} className="reveal grid grid-cols-12 items-center gap-x-gap gap-y-5">
            <ImageSlot
              name={step.slot}
              decorative
              sizes="(min-width: 768px) 25vw, 66vw"
              className={`col-span-8 aspect-[4/3] md:col-span-3 ${STEP_PLACEMENT[i].image}`}
            />
            <div className={`col-span-12 md:col-span-5 ${STEP_PLACEMENT[i].body}`}>
              <p className="serif text-step">{step.title}</p>
              <p className="mt-3 max-w-[40ch] text-small text-muted">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
