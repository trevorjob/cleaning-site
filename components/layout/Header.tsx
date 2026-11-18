import Link from "next/link";
import { nav, quoteCta, site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { HeaderBar } from "./HeaderBar";
import { HouseIcon } from "./icons";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <HeaderBar>
      <Link
        href="/"
        aria-label={`${site.legalName}, home`}
        className="-ml-2.5 grid size-12 place-items-center transition-colors hover:text-brass-text"
      >
        <HouseIcon />
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
    </HeaderBar>
  );
}
