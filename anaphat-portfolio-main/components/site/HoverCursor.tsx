"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

// เคอร์เซอร์วงกลม "View more ↗" — แสดงเมื่อเมาส์อยู่บน element ที่มี data-cursor="view"
// ใช้เฉพาะอุปกรณ์ที่มีเมาส์ (hover: hover)
export default function HoverCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = ref.current!;
    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });
    let visible = false;

    const show = (on: boolean) => {
      if (on === visible) return;
      visible = on;
      gsap.to(el, { scale: on ? 1 : 0, duration: on ? 0.5 : 0.3, ease: on ? "back.out(1.7)" : "power2.in", overwrite: "auto" });
    };

    const onMove = (e: PointerEvent) => {
      if (!visible) gsap.set(el, { x: e.clientX, y: e.clientY });
      xTo(e.clientX);
      yTo(e.clientY);
      const target = e.target as Element | null;
      show(!!target?.closest('[data-cursor="view"]'));
    };
    const onLeave = () => show(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onLeave, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[55] -mt-[70px] -ml-[70px] grid size-[140px] scale-0 place-items-center rounded-full bg-[#faf6ef] text-ink"
    >
      <span className="text-[20px] leading-[1.15] font-medium tracking-[-0.02em]">
        View
        <br />
        more ↗
      </span>
    </div>
  );
}
