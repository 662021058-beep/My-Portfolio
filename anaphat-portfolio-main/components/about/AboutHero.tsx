"use client";

import { useRef } from "react";
import { about, profile, projects } from "@/data/portfolio";
import { gsap, useGSAP } from "@/lib/gsap";
import ProjectCover from "../ProjectCover";

type Tile = { size: "square" | "wide" | "tall"; node: React.ReactNode };

const sizeClass = {
  square: "h-[clamp(11rem,25vw,20rem)] aspect-square",
  wide: "h-[clamp(7rem,15vw,12rem)] aspect-[5/3]",
  tall: "h-[clamp(14rem,31vw,25rem)] aspect-[3/4]",
};

function TextTile({ children, className }: { children: React.ReactNode; className: string }) {
  return <div className={`grid size-full place-items-center p-5 text-center ${className}`}>{children}</div>;
}

export default function AboutHero() {
  const ref = useRef<HTMLElement>(null);
  const [p0, p1, p2, p3] = projects;

  const tiles: Tile[] = [
    { size: "square", node: p0 && <ProjectCover project={p0} className="size-full" /> },
    {
      size: "wide",
      node: (
        <TextTile className="bg-forest font-mono text-[clamp(0.8rem,1.3vw,1rem)] text-lime">SELECT * FROM ideas;</TextTile>
      ),
    },
    { size: "square", node: p1 && <ProjectCover project={p1} className="size-full" /> },
    {
      size: "tall",
      // eslint-disable-next-line @next/next/no-img-element
      node: <img src={profile.portrait} alt="" className="size-full object-cover" />,
    },
    { size: "square", node: p2 && <ProjectCover project={p2} className="size-full" /> },
    {
      size: "wide",
      node: (
        <TextTile className="bg-lime text-[clamp(1.1rem,2vw,1.6rem)] leading-tight tracking-tight text-forest">
          Open for internship
          <br />
          {profile.availability}
        </TextTile>
      ),
    },
    { size: "square", node: p3 && <ProjectCover project={p3} className="size-full" /> },
    {
      size: "tall",
      node: (
        <TextTile className="bg-snow text-[clamp(1.4rem,2.6vw,2.2rem)] leading-[1.05] tracking-[-0.04em] text-ink">
          Data
          <br />→ Systems
          <br />→ Code
        </TextTile>
      ),
    },
  ];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(".about-line", { yPercent: 110, y: 0 }, { yPercent: 0, duration: 1.3, ease: "expo.out", stagger: 0.1, delay: 0.1 });
        gsap.fromTo(".about-sub", { opacity: 0 }, { opacity: 1, duration: 1, delay: 0.6 });
        gsap.fromTo(".about-ticker", { y: 120, opacity: 0 }, { y: 0, opacity: 1, duration: 1.4, ease: "expo.out", delay: 0.3 });
      });
    },
    { scope: ref },
  );

  const words = about.heading.split(" ");
  const half = Math.ceil(words.length / 2);
  const lines = [words.slice(0, half).join(" "), words.slice(half).join(" ")];

  return (
    <section ref={ref} className="relative flex min-h-svh flex-col overflow-hidden bg-mist pt-[18svh] md:min-h-[120svh]">
      <div className="px-4 text-center">
        <h1 className="display mx-auto max-w-[14ch] text-[clamp(3rem,7.4vw,7.5rem)] text-ink">
          {lines.map((line) => (
            <span key={line} className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
              <span className="about-line pre-line block">{line}</span>
            </span>
          ))}
        </h1>
        <p className="about-sub mt-6 text-lg text-ink/60 md:text-xl">{about.sub}</p>
      </div>

      <div className="about-ticker mt-auto pt-16" aria-hidden>
        <div className="marquee flex w-max items-end">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-end gap-[10px] pr-[10px]">
              {tiles.map((t, i) => (
                <div key={i} className={`overflow-hidden rounded-xl ${sizeClass[t.size]}`}>
                  {t.node}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
