"use client";

import { useRef } from "react";
import { about } from "@/data/portfolio";
import { gsap, useGSAP } from "@/lib/gsap";
import { Highlight } from "@/lib/highlight";

export default function ApproachValues() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".av-fade").forEach((el) => {
          gsap.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%" } });
        });
      });
    },
    { scope: ref },
  );

  const text = "text-[clamp(1.7rem,3.2vw,2.8rem)] leading-[1.3] tracking-[-0.02em] [text-wrap:balance] text-ink";

  return (
    <section ref={ref} className="bg-mist px-4 py-[18svh] md:px-10">
      <div className="max-w-[38rem]">
        <p className="av-fade text-[15px] text-ink/50">Approach</p>
        <p className={`av-fade mt-10 ${text}`}>
          <Highlight text={about.approach} className="text-forest" />
        </p>

        <p className="av-fade mt-[14svh] text-[15px] text-ink/50">How I work</p>
        <ul className="mt-6">
          {about.values.map((v) => (
            <li key={v} className={`av-fade py-8 ${text}`}>
              <Highlight text={v} className="text-forest" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
