import Link from "next/link";
import { cacheLife } from "next/cache";
import { footerCopy } from "@/content/copy";
import { company, contact, contactLinks, quoteCta, site } from "@/content/site";
import { Lockup } from "@/components/brand/Lockup";
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
          {contactLinks.map((link) => (
            <a key={link.kind} href={link.href} className="block break-all hover:text-brass">
              {link.text}
            </a>
          ))}
          <span className="block text-footer-muted">{contact.hours}</span>
        </address>
        <div className="col-span-12 md:col-span-7">
          <p className="text-footer-muted">{footerCopy.text}</p>
          <ButtonLink href={quoteCta.href} variant="brass" className="mt-6">
            {quoteCta.label}
          </ButtonLink>
        </div>
        <Lockup tone="ink" className="col-span-12 mt-16 w-full max-w-md" />
        <div className="col-span-12 flex flex-wrap justify-between gap-4 text-small text-footer-muted">
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
