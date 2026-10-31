"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const STAGGER_MS = 70;

/** Fades `.reveal` elements up as they enter the viewport, staggered among their siblings. */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          const siblings = el.parentElement ? [...el.parentElement.children].filter((c) => c.classList.contains("reveal")) : [];
          el.style.transitionDelay = `${Math.max(0, siblings.indexOf(el)) * STAGGER_MS}ms`;
          el.classList.add("is-in");
          observer.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    document.querySelectorAll(".reveal:not(.is-in)").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
