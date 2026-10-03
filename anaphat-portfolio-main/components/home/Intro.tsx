"use client";

import { useRef } from "react";
import { home, profile } from "@/data/portfolio";
import { gsap, useGSAP } from "@/lib/gsap";
import { Highlight, splitWords } from "@/lib/highlight";
import { scrollToBottom } from "@/lib/scroll";

// การ์ดสีเขียวที่เลื่อนขึ้นมาทับ Hero
export default function Intro() {
  const ref = useRef<HTMLElement>(null);
  const words = splitWords(home.intro.statement);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".intro-typo",
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, ease: "none", scrollTrigger: { trigger: ".intro-typo", start: "top 95%", end: "top 55%", scrub: true } },
        );
        gsap.fromTo(
          ".intro-pill",
          // ขยายเล็กน้อยตอน scroll: จอคอม 48% → 62% ของความกว้างจอ (ต้นแบบ ~63%), มือถือ 80% → 92%
          { width: () => (innerWidth < 768 ? innerWidth * 0.8 : Math.min(innerWidth * 0.48, 640)) },
          {
            width: () => (innerWidth < 768 ? innerWidth * 0.92 : Math.min(innerWidth * 0.62, 832)),
            ease: "none",
            scrollTrigger: { trigger: ".intro-pill", start: "top 95%", end: "top 35%", scrub: 0.6, invalidateOnRefresh: true },
          },
        );
        gsap.fromTo(
          ".intro-word",
          { opacity: 0.15 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: { trigger: ".intro-statement", start: "top 85%", end: "bottom 55%", scrub: 0.6 },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      data-theme="dark"
      className="relative z-10 -mt-[100svh] rounded-t-[1.25rem] bg-forest px-4 pt-[22svh] pb-[26svh] text-snow md:rounded-t-[1.75rem] md:px-10"
    >
      <div className="intro-typo mx-auto max-w-[46rem] text-center">
        <p className="text-sm text-snow/70">
          <Highlight text={home.intro.kicker} />
        </p>
        <p className="mt-8 text-[clamp(1.6rem,3.2vw,2.7rem)] leading-[1.3] tracking-[-0.02em] [text-wrap:balance] text-snow/90">
          <Highlight text={home.intro.big} />
        </p>
      </div>

      <div className="mt-[12svh] flex justify-center">
        <button
          onClick={scrollToBottom}
          className="intro-pill group relative isolate grid aspect-[2.6/1] w-[92vw] place-items-center md:w-[min(62vw,52rem)] overflow-hidden rounded-full bg-night"
        >
          <span className="blob-a absolute top-[-25%] left-[8%] -z-10 aspect-square w-[45%] rounded-full bg-lime/60 blur-[70px]" />
          <span className="blob-b absolute right-[5%] bottom-[-35%] -z-10 aspect-square w-[50%] rounded-full bg-[#2f8f6a] blur-[80px]" />
          <span className="display px-[6%] text-center text-[clamp(1.5rem,3.6vw,3.75rem)] uppercase transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]">
            {home.intro.pill}
          </span>
        </button>
      </div>
      <p className="mt-5 text-center text-sm tracking-wide text-snow/60 uppercase">
        {profile.availability} · {profile.availabilityNote}
      </p>

      <p className="intro-statement mx-auto mt-[18svh] max-w-[50rem] text-center text-[clamp(1.5rem,3vw,2.6rem)] leading-[1.3] tracking-[-0.02em] [text-wrap:balance]">
        {/* แต่ละช่วงเป็น inline-block จึงไม่ถูกตัดกลางคำภาษาไทย */}
        {words.map(({ word, highlight }, i) => (
          <span key={i}>
            <span className={`intro-word inline-block ${highlight ? "text-lime" : ""}`}>{word}</span>{" "}
          </span>
        ))}
      </p>
    </section>
  );
}
