import { home } from "@/content/copy";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Section } from "@/components/ui/Section";

const { statement } = home;

export function Statement() {
  return (
    <Section grid label="How we work" className="items-end gap-y-10">
      <p className="serif reveal col-span-12 text-statement md:col-span-7">{statement.text}</p>
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
