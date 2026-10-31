"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

type AmbientVideoProps = {
  readonly src: string;
  readonly poster?: string;
  readonly className?: string;
};

/** Muted, looping background clip. Holds on its first frame when the visitor prefers reduced motion. */
export function AmbientVideo({ src, poster, className = "" }: AmbientVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reduced) video.pause();
    else video.play().catch(() => undefined);
  }, [reduced]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      className={`block h-full w-full object-cover ${className}`}
    />
  );
}
