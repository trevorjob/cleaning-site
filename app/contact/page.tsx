import { contactPage as copy } from "@/content/copy";
import { contactLinks } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { resolveImageSlot } from "@/lib/images";
import { PageLockup } from "@/components/brand/Lockup";
import { ContactDetails } from "@/components/ContactDetails";
import { ContactQuote } from "@/components/contact/ContactQuote";

export const metadata = pageMetadata({ ...copy.meta, path: "/contact" });

const images = Object.fromEntries(copy.picker.options.map((o) => [o.value, resolveImageSlot(o.slot)]));

export default function ContactPage() {
  return (
    <section id="quote" aria-labelledby="contact-heading" className="page-grid gap-y-16 pt-10 md:pt-14">
      <PageLockup className="col-span-12 -mb-4" />
      <div className="col-span-12 lg:col-span-4">
        <h1 id="contact-heading" className="serif text-head">
          {copy.heading}
        </h1>
        <p className="mt-6 max-w-[36ch] text-muted">{contactLinks.length > 0 ? copy.introDirect : copy.intro}</p>
        <ContactDetails withHours className="mt-12" />
      </div>
      <div className="col-span-12 lg:col-span-7 lg:col-start-6">
        <ContactQuote images={images} />
      </div>
    </section>
  );
}
