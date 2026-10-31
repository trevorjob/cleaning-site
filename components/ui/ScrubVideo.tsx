"use client";

import { useMotionValueEvent, type MotionValue } from "motion/react";
import { useEffect, useRef } from "react";

type ScrubVideoProps = {
  readonly src: string;
  /** 0..1, mapped onto the clip's duration. */
  readonly progress: MotionValue<number>;
  readonly className?: string;
};

/** A muted clip whose playhead follows scroll. Needs an every-frame-keyframe encode to seek smoothly. */
export function ScrubVideo({ src, progress, className = "" }: ScrubVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frame = useRef(0);

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

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
      onLoadedMetadata={() => seek(progress.get())}
      className={`block h-full w-full object-cover ${className}`}
    />
  );
}
