"use client";

import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { useCallback, useEffect, useRef, type PointerEvent } from "react";
import { aboutPage } from "@/content/copy";
import type { ResolvedImageSlot } from "@/lib/images";
import { ImageSlotView } from "@/components/ui/ImageSlotView";

const HAZE = "#ffffff";
const BRUSH_RADIUS = 70;
const REGROW_ALPHA = 0.012;
const REGROW_EVERY_MS = 60;
const REGROW_FOR_MS = 9000;
const AUTO_WIPE_MS = 1100;
const MAX_DPR = 2;

/** A photo behind hazed glass. Pointer movement wipes the haze away; it slowly drifts back. */
export function PolishGlass({ slot }: { readonly slot: ResolvedImageSlot }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isPressed = useRef(false);
  const regrowUntil = useRef(0);
  const reduced = usePrefersReducedMotion();

  const context = () => canvasRef.current?.getContext("2d") ?? null;

  const fillHaze = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = context();
    if (!canvas || !ctx) return;
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
    ctx.fillStyle = HAZE;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const wipeAt = useCallback((x: number, y: number) => {
    const ctx = context();
    if (!ctx) return;
    const r = BRUSH_RADIUS * Math.min(window.devicePixelRatio, MAX_DPR);
    const brush = ctx.createRadialGradient(x, y, 0, x, y, r);
    brush.addColorStop(0, "rgba(0,0,0,1)");
    brush.addColorStop(1, "rgba(0,0,0,0)");
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = brush;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
    regrowUntil.current = performance.now() + REGROW_FOR_MS;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, MAX_DPR);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      fillHaze();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    return () => observer.disconnect();
  }, [fillHaze]);

  useEffect(() => {
    if (reduced) return;
    const timer = window.setInterval(() => {
      const canvas = canvasRef.current;
      const ctx = context();
      if (!canvas || !ctx || performance.now() > regrowUntil.current) return;
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = REGROW_ALPHA;
      ctx.fillStyle = HAZE;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;
    }, REGROW_EVERY_MS);
    return () => window.clearInterval(timer);
  }, [reduced]);

  const toCanvas = (event: PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const scale = event.currentTarget.width / rect.width;
    return [(event.clientX - rect.left) * scale, (event.clientY - rect.top) * scale] as const;
  };

  const onPointerMove = (event: PointerEvent<HTMLCanvasElement>) => {
    if (event.pointerType === "touch" && !isPressed.current) return;
    const [x, y] = toCanvas(event);
    wipeAt(x, y);
  };

  const autoWipe = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (reduced) {
      canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / AUTO_WIPE_MS);
      const rows = 4;
      const row = Math.min(rows - 1, Math.floor(t * rows));
      const along = (t * rows) % 1;
      const x = (row % 2 === 0 ? along : 1 - along) * canvas.width;
      wipeAt(x, ((row + 0.5) / rows) * canvas.height);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return (
    <figure>
      <div className="relative aspect-[4/5] overflow-hidden">
        <ImageSlotView slot={slot} priority className="absolute inset-0" sizes="(min-width: 1024px) 50vw, 100vw" />
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          onPointerMove={onPointerMove}
          onPointerDown={(e) => {
            isPressed.current = true;
            onPointerMove(e);
          }}
          onPointerUp={() => (isPressed.current = false)}
          onPointerCancel={() => (isPressed.current = false)}
          className="absolute inset-0 h-full w-full touch-pan-y opacity-65"
        />
      </div>
      <figcaption className="mt-4 flex items-center justify-between gap-4 text-small text-muted">
        {aboutPage.polish.caption}
        <button type="button" onClick={autoWipe} className="border-b border-ink text-small font-medium text-ink">
          {aboutPage.polish.button}
        </button>
      </figcaption>
    </figure>
  );
}
