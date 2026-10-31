import Link from "next/link";
import { servicesPage as copy } from "@/content/copy";
import { serviceFaqs, services } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";
import { ButtonLink } from "@/components/ui/Button";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Heading, Section } from "@/components/ui/Section";

export const metadata = pageMetadata({ ...copy.meta, path: "/services" });

export default function ServicesPage() {
  return (
    <>
      <section aria-labelledby="services-heading" className="page-grid gap-y-8 pt-24 md:pt-32">
        <h1 id="services-heading" className="serif col-span-12 text-head md:col-span-8">
          {copy.heading}
        </h1>
        <p className="col-span-12 max-w-[42ch] text-muted md:col-span-6">{copy.intro}</p>
        <ul className="col-span-12 mt-8 flex flex-wrap gap-x-8 gap-y-2 text-small font-medium">
          {services.map((s) => (
            <li key={s.id}>
              <Link href={`#${s.id}`} className="border-b border-ink pb-0.5 hover:text-brass-text">
                {s.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {services.map((service, i) => {
        const isFlipped = i % 2 === 1;
        return (
          <Section key={service.id} id={service.id} grid labelledBy={`${service.id}-heading`} className="items-start gap-y-10">
            <ImageSlot
              name={service.image}
              sizes="(min-width: 768px) 50vw, 100vw"
              className={`reveal col-span-12 aspect-[4/3] md:col-span-6 ${isFlipped ? "md:col-start-7 md:row-start-1" : ""}`}
            />
            <div className={`col-span-12 md:col-span-5 ${isFlipped ? "md:col-start-1 md:row-start-1" : "md:col-start-8"}`}>
              <h2 id={`${service.id}-heading`} className="serif reveal text-head">
                {service.title}
              </h2>
              <p className="reveal mt-6 text-muted">{service.intro}</p>
              <h3 className="reveal mt-10 text-small font-medium">{copy.includedLabel}</h3>
              <ul className="reveal mt-3 space-y-2">
                {service.included.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <h3 className="reveal mt-8 text-small font-medium">{copy.frequencyLabel}</h3>
              <p className="reveal mt-2 text-muted">{service.frequency}</p>
              <ButtonLink href={`/contact?service=${service.id}#quote`} className="reveal mt-10">
                {copy.quoteLabel}
                <span className="sr-only"> for {service.title.toLowerCase()}</span>
              </ButtonLink>
            </div>
          </Section>
        );
      })}

      <Section grid labelledBy="faq-heading" className="gap-y-10">
        <Heading id="faq-heading" className="col-span-12 md:col-span-5">
          {copy.faqHeading}
        </Heading>
        <div className="reveal col-span-12 border-b border-line md:col-span-6 md:col-start-7">
          {serviceFaqs.map((faq) => (
            <details key={faq.question} className="group border-t border-line py-6">
              <summary className="flex list-none items-baseline justify-between gap-6 font-medium [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span aria-hidden="true" className="text-step leading-none transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-[52ch] text-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Section>
    </>
  );
}
