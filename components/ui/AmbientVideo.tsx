"use client";

import { useEffect, useRef } from "react";
import type { VideoSource } from "@/lib/images";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

type AmbientVideoProps = {
  readonly sources: readonly VideoSource[];
  readonly poster?: string;
  readonly className?: string;
};

/** Muted, looping background clip. Holds on its first frame when the visitor prefers reduced motion. */
export function AmbientVideo({ sources, poster, className = "" }: AmbientVideoProps) {
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
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      className={`block h-full w-full object-cover ${className}`}
    >
      {sources.map((source) => (
        <source key={source.src} src={source.src} type={source.type} />
      ))}
    </video>
  );
}
