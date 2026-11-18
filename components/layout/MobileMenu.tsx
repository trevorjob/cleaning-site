"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { nav, quoteCta, site } from "@/content/site";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { Lockup } from "@/components/brand/Lockup";
import { buttonClasses } from "@/components/ui/Button";
import { CloseIcon, HouseIcon, MenuIcon } from "./icons";

const EASE = [0.2, 0.8, 0.2, 1] as const;
const DESKTOP = "(min-width: 768px)";

const noopSubscribe = () => () => {};

/** Full-screen ink panel that wipes down from the top, with the links rising in one after another. */
export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();
  // The panel lives in <body>: the header slides with a transform, which would trap a fixed child inside it.
  const isClient = useSyncExternalStore(noopSubscribe, () => true, () => false);

  const close = () => {
    setIsOpen(false);
    toggleRef.current?.focus();
  };

  useEffect(() => {
    if (!isOpen) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    const desktop = window.matchMedia(DESKTOP);
    const onResize = () => desktop.matches && setIsOpen(false);
    desktop.addEventListener("change", onResize);
    return () => {
      root.style.overflow = "";
      desktop.removeEventListener("change", onResize);
    };
  }, [isOpen]);

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") return close();
    if (event.key !== "Tab") return;
    const items = panelRef.current?.querySelectorAll<HTMLElement>("a[href], button");
    if (!items?.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const wipe = reduced
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { clipPath: "inset(0 0 100% 0)" }, animate: { clipPath: "inset(0 0 0% 0)" }, exit: { clipPath: "inset(0 0 100% 0)" } };

  const panel = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          onKeyDown={onKeyDown}
          {...wipe}
          transition={{ duration: 0.55, ease: EASE }}
          className="fixed inset-0 z-50 flex flex-col bg-ink text-porcelain md:hidden"
        >
          <div className="flex items-center justify-between px-gutter py-3">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              aria-label={`${site.legalName}, home`}
              className="-ml-2.5 grid size-12 place-items-center"
            >
              <HouseIcon />
            </Link>
            <button
              type="button"
              data-autofocus
              onClick={close}
              aria-label="Close menu"
              className="-mr-2.5 grid size-12 place-items-center"
            >
              <CloseIcon />
            </button>
          </div>

          <nav aria-label="Main" className="flex flex-1 flex-col justify-center px-gutter">
            <ul>
              {nav.map((item, i) => {
                const isCurrent = pathname === item.href;
                return (
                  <li key={item.href} className="overflow-hidden">
                    <motion.div
                      initial={reduced ? false : { y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.6, ease: EASE, delay: 0.18 + i * 0.07 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        aria-current={isCurrent ? "page" : undefined}
                        className={`wide block py-1.5 text-[12.5vw] ${isCurrent ? "text-brass" : ""}`}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.4 }}
            className="px-gutter pb-10"
          >
            <Lockup tone="ink" decorative className="w-full max-w-64" />
            <Link href={quoteCta.href} onClick={() => setIsOpen(false)} className={buttonClasses("brass", "mt-8 w-full")}>
              {quoteCta.label}
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label="Open menu"
        onClick={() => setIsOpen(true)}
        className="-mr-2.5 grid size-12 place-items-center md:hidden"
      >
        <MenuIcon />
      </button>
      {isClient && createPortal(panel, document.body)}
    </>
  );
}
