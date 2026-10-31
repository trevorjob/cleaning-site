"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { home } from "@/content/copy";
import type { Service } from "@/content/services";
import type { ResolvedImageSlot } from "@/lib/images";
import { ImageSlotView } from "@/components/ui/ImageSlotView";

type PosterItem = Pick<Service, "id" | "shortTitle" | "tagline"> & { readonly image: ResolvedImageSlot };

const MOBILE_QUERY = "(max-width: 767px)";

/** The four services in giant type. On desktop the hovered one's photo follows the cursor; on phones a tap opens it inline. */
export function ServicesPoster({ items }: { readonly items: readonly PosterItem[] }) {
  const peekRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [opened, setOpened] = useState<string | null>(null);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const peek = peekRef.current;
      if (peek) peek.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  const onClick = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (!window.matchMedia(MOBILE_QUERY).matches || opened === id) return;
    e.preventDefault();
    setOpened(id);
  };

  const activeImage = items.find((i) => i.id === active)?.image;

  return (
    <section aria-labelledby="services-heading" className="pt-section">
      <h2 id="services-heading" className="mb-5 px-gutter text-small font-medium">
        {home.services.heading}
      </h2>
      <ul className="group/list px-gutter" onPointerLeave={() => setActive(null)}>
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={`/services#${item.id}`}
              onPointerEnter={(e) => e.pointerType === "mouse" && setActive(item.id)}
              onFocus={() => setActive(item.id)}
              onBlur={() => setActive(null)}
              onClick={onClick(item.id)}
              className="flex items-baseline justify-between gap-gap py-[0.1em] transition-colors duration-300 group-hover/list:text-faded hover:!text-ink focus-visible:!text-ink focus-visible:outline-none"
            >
              <span className="wide whitespace-nowrap text-poster">{item.shortTitle}</span>
              <small className="hidden whitespace-nowrap text-small text-muted md:block">{item.tagline}</small>
            </Link>
            <div
              aria-hidden="true"
              className={`grid transition-[grid-template-rows,opacity] duration-500 md:hidden ${opened === item.id ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
              <div className="overflow-hidden">
                <ImageSlotView slot={item.image} decorative className="my-3 aspect-video text-[0px]" sizes="100vw" />
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div
        ref={peekRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-30 hidden md:block"
      >
        <div className={`w-[20vw] transition-[opacity,scale] duration-300 ${activeImage ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}>
          {activeImage ? <ImageSlotView slot={activeImage} decorative className="aspect-[4/5] text-[0px]" sizes="20vw" /> : null}
        </div>
      </div>
    </section>
  );
}
