import Link from "next/link";
import { cacheLife } from "next/cache";
import { footerCopy } from "@/content/copy";
import { company, contact, quoteCta, site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { FitText } from "@/components/ui/FitText";

async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

/** Inverse close: the invitation, contact details, and the name cropped at the bottom edge. */
export function Footer() {
  return (
    <footer className="mt-section overflow-hidden bg-ink pt-30 text-porcelain">
      <div className="page-grid gap-y-10">
        <p className="serif col-span-12 text-head md:col-span-7">{footerCopy.heading}</p>
        <address className="col-span-12 self-end not-italic leading-loose md:col-span-4 md:col-start-9">
          <a href={contact.phoneHref} className="block hover:text-brass">{contact.phoneDisplay}</a>
          <a href={`mailto:${contact.email}`} className="block break-all hover:text-brass">{contact.email}</a>
          <a href={contact.whatsappHref} className="block hover:text-brass">WhatsApp</a>
        </address>
        <div className="col-span-12 md:col-span-7">
          <p className="text-footer-muted">{footerCopy.text}</p>
          <ButtonLink href={quoteCta.href} variant="brass" className="mt-6">
            {quoteCta.label}
          </ButtonLink>
        </div>
        <div className="col-span-12 mt-14 flex flex-wrap justify-between gap-4 text-small text-footer-muted">
          <p>
            © <CurrentYear /> {site.legalName}. {company.registeredIn}, company no. {company.companyNumber}.
          </p>
          <Link href="/privacy" className="hover:text-porcelain">Privacy</Link>
        </div>
      </div>
      <p aria-hidden="true" className="wide mt-8 -mb-[0.12em] px-gutter">
        <FitText>Clean</FitText>
      </p>
    </footer>
  );
}
