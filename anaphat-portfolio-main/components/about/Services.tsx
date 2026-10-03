"use client";

import { useRef } from "react";
import { about } from "@/data/portfolio";
import { gsap, useGSAP } from "@/lib/gsap";
import TechIcons from "../TechIcons";

export default function Services() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(".services-heading", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: ".services-heading", start: "top 85%" } });
        gsap.fromTo(
          ".service",
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 1.2, ease: "expo.out", stagger: 0.12, scrollTrigger: { trigger: ".services-list", start: "top 85%" } },
        );
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} data-theme="dark" className="flex min-h-svh flex-col justify-center bg-forest-deep px-4 py-[16svh] text-snow md:px-10">
      <h2 className="services-heading text-center text-[clamp(2rem,4vw,3.4rem)] tracking-[-0.04em] text-snow/90">{about.servicesHeading}</h2>

      <div className="services-list mt-[10svh] grid gap-12 md:grid-cols-3 md:gap-[60px]">
        {about.services.map((s, i) => (
          <article key={s.title} className="service">
            <p className="text-sm text-snow/50">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-3 text-[clamp(1.6rem,2.4vw,2.2rem)] tracking-[-0.03em]">{s.title}</h3>
            <p className="mt-4 text-[17px] leading-snug text-snow/60">{s.body}</p>
            <div className="mt-6">
              <TechIcons tech={s.tools} dark />
            </div>
          </article>
        ))}
      </div>

      <div className="service mt-16 flex flex-wrap items-center gap-4 border-t border-snow/15 pt-8">
        <p className="text-sm text-snow/50">{about.design.label}</p>
        <TechIcons tech={about.design.tools} dark />
      </div>
    </section>
  );
}
