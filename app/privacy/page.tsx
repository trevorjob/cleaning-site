import { privacyPage as copy } from "@/content/copy";
import { company, contact, site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ ...copy.meta, path: "/privacy" });

export default function PrivacyPage() {
  return (
    <article aria-labelledby="privacy-heading" className="page-grid gap-y-8 pt-24 md:pt-32">
      <h1 id="privacy-heading" className="serif col-span-12 text-head md:col-span-6">
        {copy.heading}
      </h1>
      <div className="col-span-12 max-w-[60ch] md:col-span-6 md:col-start-7">
        <p className="text-muted">
          {site.legalName} ({company.registeredIn}, company no. {company.companyNumber}) is responsible for the personal
          data you send through this website. Contact us at{" "}
          <a href={`mailto:${contact.email}`} className="underline">
            {contact.email}
          </a>
          .
        </p>
        {copy.sections.map((section) => (
          <section key={section.heading} className="mt-10">
            <h2 className="text-body font-medium">{section.heading}</h2>
            <p className="mt-2 text-muted">{section.text}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
