"use client";

import { useRef } from "react";
import { about, profile } from "@/data/portfolio";
import { gsap, useGSAP } from "@/lib/gsap";

export default function AboutStory() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".story-fade").forEach((el) => {
          gsap.fromTo(el, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 85%" } });
        });
        gsap.fromTo(
          ".story-photo",
          { yPercent: -7 },
          { yPercent: 7, ease: "none", scrollTrigger: { trigger: ".story-frame", start: "top bottom", end: "bottom top", scrub: true } },
        );
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="bg-mist px-4 py-[16svh] md:px-10">
      <p className="story-fade max-w-[18em] text-[clamp(1.8rem,3.8vw,3.2rem)] leading-[1.3] tracking-[-0.02em] [text-wrap:balance] text-ink">{about.story}</p>

      <div className="mt-12 grid gap-10 md:mt-6 md:grid-cols-12 md:items-end">
        <div className="story-frame relative aspect-[4/3] w-full max-w-[34rem] overflow-hidden rounded-xl md:col-span-5">
          {/* ภาพสูงกว่ากรอบเล็กน้อยเพื่อทำ parallax — object-position 30% ให้คนอยู่ในเฟรม */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profile.storyPhoto}
            alt={`${profile.name} กำลังนำเสนอผลงาน`}
            className="story-photo absolute inset-x-0 -top-[10%] h-[120%] w-full object-cover object-[30%_50%]"
          />
        </div>
        <div className="story-fade md:col-span-5 md:col-start-7 md:self-start">
          <p className="text-[13px] text-ink/50">เป้าหมายการฝึกงาน</p>
          <p className="mt-3 text-[17px] leading-relaxed text-ink/75">{about.storySub}</p>
        </div>
      </div>

      <dl className="story-fade mt-16 grid gap-8 border-t border-ink/15 pt-8 sm:grid-cols-2 lg:grid-cols-4">
        {about.facts.map((f) => (
          <div key={f.label}>
            <dt className="text-[13px] text-ink/50">{f.label}</dt>
            <dd className="mt-2 text-[17px] leading-snug text-ink">{f.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
