import Link from "next/link";
import { nav, quoteCta, site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <header className="relative z-20 flex items-center justify-between gap-6 px-gutter pt-gutter text-small">
      <Link href="/" className="font-medium" aria-label={`${site.legalName}, home`}>
        {site.name}
      </Link>
      <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
        <ul className="flex gap-7">
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="transition-colors hover:text-brass-text">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <ButtonLink href={quoteCta.href}>{quoteCta.label}</ButtonLink>
      </nav>
      <MobileMenu />
    </header>
  );
}
