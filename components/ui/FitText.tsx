"use client";

import { useLayoutEffect, useRef, type ReactNode, type RefObject } from "react";

type FitTextProps = {
  readonly children: ReactNode;
  /** Pixels to leave free on the line, e.g. for an image sharing it. Read from this element's width if given. */
  readonly reserveRef?: RefObject<HTMLElement | null>;
  readonly className?: string;
};

const PROBE_SIZE = 100;

/** Sets its parent's font size so this text spans exactly the parent's width (minus any reserved element). */
export function FitText({ children, reserveRef, className = "" }: FitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host) return;

    const fit = () => {
      const reserve = reserveRef?.current;
      const style = getComputedStyle(host);
      const padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      const gap = reserve ? reserve.offsetWidth + parseFloat(style.columnGap || "0") : 0;
      host.style.fontSize = `${PROBE_SIZE}px`;
      const width = el.getBoundingClientRect().width;
      if (width > 0) host.style.fontSize = `${(PROBE_SIZE * (host.clientWidth - padding - gap)) / width}px`;
    };

    fit();
    document.fonts?.ready.then(fit);
    const observer = new ResizeObserver(fit);
    observer.observe(host.parentElement ?? host);
    return () => observer.disconnect();
  }, [reserveRef]);

  return (
    <span ref={ref} className={`inline-block whitespace-nowrap ${className}`}>
      {children}
    </span>
  );
}
