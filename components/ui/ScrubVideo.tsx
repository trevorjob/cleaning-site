"use client";

import { useMotionValueEvent, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { VideoSource } from "@/lib/images";

type ScrubVideoProps = {
  readonly sources: readonly VideoSource[];
  /** 0..1, mapped onto the clip's duration. */
  readonly progress: MotionValue<number>;
  readonly poster?: string;
  readonly className?: string;
};

/** Starts downloading this far ahead of the viewport, so the hero gets the bandwidth on first load. */
const LOAD_AHEAD = "150% 0px";

/** A muted clip whose playhead follows scroll. Needs a short-keyframe encode (scripts/encode-videos.sh) to seek smoothly. */
export function ScrubVideo({ sources, progress, poster, className = "" }: ScrubVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frame = useRef(0);
  const [isNear, setIsNear] = useState(false);

  const seek = (value: number) => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const video = videoRef.current;
      if (!video || !Number.isFinite(video.duration)) return;
      video.currentTime = Math.min(1, Math.max(0, value)) * Math.max(0, video.duration - 0.05);
    });
  };

  useMotionValueEvent(progress, "change", seek);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsNear(true);
        observer.disconnect();
      },
      { rootMargin: LOAD_AHEAD },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  // Some browsers ignore a later preload change, so restart resource selection once it flips to auto.
  useEffect(() => {
    if (isNear) videoRef.current?.load();
  }, [isNear]);

  return (
    <video
      ref={videoRef}
      poster={poster}
      muted
      playsInline
      preload={isNear ? "auto" : "none"}
      aria-hidden="true"
      onLoadedMetadata={() => seek(progress.get())}
      className={`block h-full w-full object-cover ${className}`}
    >
      {sources.map((source) => (
        <source key={source.src} src={source.src} type={source.type} />
      ))}
    </video>
  );
}
