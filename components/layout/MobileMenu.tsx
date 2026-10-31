"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { nav, quoteCta } from "@/content/site";
import { buttonClasses } from "@/components/ui/Button";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        onClick={() => setIsOpen((open) => !open)}
        className="relative z-50 min-h-12 px-2 font-medium"
      >
        <span className={isOpen ? "text-porcelain" : ""}>{isOpen ? "Close" : "Menu"}</span>
      </button>

      <nav
        id="mobile-menu"
        aria-label="Main"
        hidden={!isOpen}
        className="fixed inset-0 z-40 flex flex-col justify-end bg-ink px-gutter pb-10 text-porcelain"
      >
        <ul>
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} onClick={close} className="wide block py-2 text-[15vw]">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link href={quoteCta.href} onClick={close} className={buttonClasses("brass", "mt-10 w-full")}>
          {quoteCta.label}
        </Link>
      </nav>
    </div>
  );
}
