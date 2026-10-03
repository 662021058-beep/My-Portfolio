"use client";

import { useRef, useState } from "react";
import { projects, type Project } from "@/data/portfolio";
import { gsap, useGSAP } from "@/lib/gsap";
import ProjectCover from "../ProjectCover";
import ProjectModal from "../ProjectModal";

// ทุกการ์ดเป็นแนวนอน 4:3 — สลับตำแหน่งซ้าย / ขวา / กลาง และขนาดเหมือนต้นแบบ
const layouts = [
  { align: "md:self-start", width: "md:w-[45%]", aspect: "aspect-[4/3]" },
  { align: "md:self-end", width: "md:w-[38%]", aspect: "aspect-[4/3]" },
  { align: "md:self-center md:translate-x-[5%]", width: "md:w-[34%]", aspect: "aspect-[4/3]" },
  { align: "md:self-start", width: "md:w-[45%]", aspect: "aspect-[4/3]" },
  { align: "md:self-end", width: "md:w-[38%]", aspect: "aspect-[4/3]" },
];

export default function WorksGrid() {
  const ref = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState<Project | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(".works-title", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2, ease: "expo.out", delay: 0.1 });
        // หัวข้อจางลงเมื่อการ์ดเลื่อนขึ้นมาทับ
        gsap.to(".works-title-wrap", {
          opacity: 0.35,
          ease: "none",
          scrollTrigger: { trigger: ".works-list", start: "top bottom", end: "top 30%", scrub: true },
        });
        // ภาพในการ์ดเลื่อนช้ากว่ากรอบ (parallax)
        gsap.utils.toArray<HTMLElement>(".works-parallax").forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: -8 },
            { yPercent: 8, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } },
          );
        });
        gsap.utils.toArray<HTMLElement>(".works-card").forEach((card) => {
          gsap.fromTo(card, { y: 80 }, { y: 0, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "top 60%", scrub: true } });
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="relative bg-mist">
      <div className="works-title-wrap pointer-events-none sticky top-0 grid h-svh place-items-center">
        <h1 className="works-title display relative text-[clamp(3.5rem,9vw,9rem)] text-ink max-md:text-[12.5vw]">
          My projects
          <sup className="absolute -top-[0.4em] -right-[1.3em] text-[0.18em] max-md:text-[0.24em] tracking-normal text-ink/60">
            [{String(projects.length).padStart(2, "0")}]
          </sup>
        </h1>
      </div>

      <div className="works-list relative z-10 -mt-[30svh] flex flex-col gap-[12svh] px-4 pb-[16svh] md:px-10">
        {projects.map((p, i) => {
          const l = layouts[i % layouts.length];
          return (
            <article key={p.slug} className={`works-card w-full ${l.width} ${l.align}`}>
              <button onClick={() => setSelected(p)} data-cursor="view" className="group block w-full cursor-none text-left" aria-label={`View details of ${p.title}`}>
                <div className={`relative overflow-hidden rounded-xl ${l.aspect}`}>
                  <div className="works-parallax absolute -inset-y-[10%] inset-x-0">
                    <ProjectCover project={p} className="size-full transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]" />
                  </div>
                  {p.placeholder && (
                    <span className="absolute top-3 left-3 rounded-full bg-ink px-3 py-1 text-xs text-lime">Coming soon</span>
                  )}
                  {p.award && (
                    <span className="absolute top-3 left-3 rounded-full bg-lime px-3 py-1 text-xs text-forest">ได้รับรางวัล</span>
                  )}
                </div>
                <div className="mt-3 flex justify-between gap-4 text-[15px]">
                  <span className="text-ink">{p.title}</span>
                  <span className="text-ink/55">{p.role}</span>
                </div>
              </button>
            </article>
          );
        })}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
