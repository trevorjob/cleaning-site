import { home } from "@/content/copy";
import { Mark } from "@/components/brand/Lockup";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Section } from "@/components/ui/Section";

const { statement } = home;

export function Statement() {
  return (
    <Section grid label="How we work" className="items-end gap-y-10">
      <div className="col-span-12 flex flex-col gap-12 self-stretch md:col-span-7">
        <Mark className="reveal h-auto w-[clamp(5.5rem,16vw,15rem)]" />
        <p className="serif reveal mt-auto text-statement">{statement.text}</p>
      </div>
      <div className="col-span-12 md:col-span-4 md:col-start-9">
        <ImageSlot name="statement" sizes="(min-width: 768px) 30vw, 100vw" className="reveal aspect-[4/5]" />
        <p className="reveal mt-6 text-small text-muted">{statement.aside}</p>
        <ul className="reveal mt-6 grid grid-cols-2 gap-x-4 gap-y-1 text-small font-medium">
          {statement.facts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
