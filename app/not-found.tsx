import { notFound as copy } from "@/content/copy";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section aria-labelledby="not-found-heading" className="px-gutter pt-24 md:pt-32">
      <h1 id="not-found-heading" className="serif text-head">
        {copy.heading}
      </h1>
      <p className="mt-6 max-w-[40ch] text-muted">{copy.intro}</p>
      <ButtonLink href={copy.link.href} className="mt-10">
        {copy.link.label}
      </ButtonLink>
    </section>
  );
}
