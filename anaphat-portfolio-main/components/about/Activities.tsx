"use client";

import { useRef } from "react";
import { about } from "@/data/portfolio";
import { gsap, useGSAP } from "@/lib/gsap";

// ผลงานและกิจกรรม — แถวละรายการ: ปีอยู่ซ้าย รายละเอียดอยู่ขวา
export default function Activities() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".act-row").forEach((el) => {
          gsap.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 90%" } });
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="bg-mist px-4 pt-[16svh] md:px-10">
      <h2 className="display text-[clamp(2.6rem,6vw,5.5rem)] text-ink">Activities &amp; awards</h2>

      <ol className="mt-[8svh] border-t border-ink/15">
        {about.activities.map((a) => (
          <li key={a.title} className="act-row grid gap-2 border-b border-ink/15 py-7 md:grid-cols-12 md:gap-5">
            <span className="text-[clamp(1.4rem,2.2vw,2rem)] tracking-[-0.03em] text-forest md:col-span-2">{a.year}</span>
            <div className="md:col-span-8 md:col-start-4">
              <p className="text-[clamp(1.15rem,1.6vw,1.45rem)] leading-snug text-ink">{a.title}</p>
              {a.detail && <p className="mt-2 text-[16px] leading-relaxed text-ink/60">{a.detail}</p>}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
