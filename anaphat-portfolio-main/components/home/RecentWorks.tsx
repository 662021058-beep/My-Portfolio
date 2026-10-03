"use client";

import { useRef, useState } from "react";
import { projects, type Project } from "@/data/portfolio";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import ProjectCover from "../ProjectCover";
import ProjectModal from "../ProjectModal";

// การ์ดแนวนอน 4:3 ทั้งหมด สลับขนาดใหญ่ / เล็ก
const shapes = ["aspect-[4/3] w-[min(80vw,28rem)]", "aspect-[4/3] w-[min(76vw,24rem)]"];

// "Recent works" — ชื่อหัวข้ออยู่กลางจอ การ์ดเลื่อนในแนวนอนผ่านหน้าตามการ scroll
export default function RecentWorks() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Project | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".recent-title",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, ease: "none", scrollTrigger: { trigger: ref.current, start: "top 70%", end: "top top", scrub: true } },
        );

        const track = trackRef.current!;
        const section = ref.current!;
        // การ์ดเริ่มจากขอบขวาของจอ และหยุดเมื่อการ์ดใบสุดท้ายชิดขอบขวา
        // ความสูงของ section = ระยะเลื่อนแนวนอน + 1 จอ เพื่อให้เลื่อนหน้าต่อได้ทันทีเมื่อถึงใบสุดท้าย
        const travel = () => track.offsetWidth;
        const setHeight = () => {
          section.style.height = `${travel() + window.innerHeight}px`;
        };
        setHeight();
        ScrollTrigger.addEventListener("refreshInit", setHeight);

        gsap.fromTo(
          track,
          { x: () => window.innerWidth },
          {
            x: () => window.innerWidth - travel(),
            ease: "none",
            scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: 0.5, invalidateOnRefresh: true },
          },
        );
        return () => {
          ScrollTrigger.removeEventListener("refreshInit", setHeight);
          section.style.height = "";
        };
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="relative h-[420svh] bg-mist motion-reduce:h-auto">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden motion-reduce:static motion-reduce:h-auto motion-reduce:flex-col motion-reduce:py-24">
        <h2 className="recent-title display absolute inset-x-0 text-center text-[clamp(3rem,7vw,7.5rem)] text-ink motion-reduce:static">
          Recent works
        </h2>

        <div
          ref={trackRef}
          className="relative z-10 flex w-max shrink-0 items-center gap-[clamp(1.5rem,4vw,4rem)] pr-4 md:pr-10 motion-reduce:mt-10 motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:px-4"
        >
          {projects.map((p, i) => (
            <button
              key={p.slug}
              onClick={() => setSelected(p)}
              data-cursor="view"
              className={`group shrink-0 cursor-none text-left ${i % 2 ? "translate-y-[12%]" : "-translate-y-[10%]"}`}
            >
              <div className="overflow-hidden rounded-xl">
                <ProjectCover project={p} className={`${shapes[i % shapes.length]} transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]`} />
              </div>
              <div className="mt-3 flex justify-between gap-4 text-[15px]">
                <span className="text-ink">{p.title}</span>
                <span className="text-ink/55">{p.role}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
