import { aboutPage as copy } from "@/content/copy";
import { quoteCta } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { resolveImageSlot } from "@/lib/images";
import { PolishGlass } from "@/components/about/PolishGlass";
import { ButtonLink } from "@/components/ui/Button";
import { Heading, Section } from "@/components/ui/Section";

export const metadata = pageMetadata({ ...copy.meta, path: "/about" });

export default function AboutPage() {
  return (
    <>
      <section aria-labelledby="about-heading" className="page-grid items-end gap-y-12 pt-24 md:pt-32">
        <div className="col-span-12 md:col-span-6">
          <h1 id="about-heading" className="serif text-head">
            {copy.heading}
          </h1>
          {copy.paragraphs.map((p) => (
            <p key={p} className="mt-6 max-w-[46ch] text-muted">
              {p}
            </p>
          ))}
        </div>
        <div className="col-span-12 md:col-span-5 md:col-start-8">
          <PolishGlass slot={resolveImageSlot("about")} />
        </div>
      </section>

      <Section grid labelledBy="principles-heading" className="gap-y-12">
        <Heading id="principles-heading" className="col-span-12">
          {copy.principles.heading}
        </Heading>
        {copy.principles.items.map((item, i) => (
          <div key={item.title} className={`reveal col-span-12 sm:col-span-6 md:col-span-3 ${i % 2 ? "md:mt-16" : ""}`}>
            <h3 className="serif text-step">{item.title}</h3>
            <p className="mt-3 text-muted">{item.text}</p>
          </div>
        ))}
        <div className="col-span-12 mt-6">
          <ButtonLink href={quoteCta.href}>{quoteCta.label}</ButtonLink>
        </div>
      </Section>
    </>
  );
}
