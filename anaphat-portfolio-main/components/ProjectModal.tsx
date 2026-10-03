"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { imageSrc, type Project } from "@/data/portfolio";
import { getLenis } from "@/lib/scroll";
import ProjectCover from "./ProjectCover";
import TechIcons from "./TechIcons";

// หน้าต่าง case study แบบเดียวกับต้นแบบ:
// แผ่นเลื่อนขึ้นจากด้านล่าง (เว้นด้านบน 100px) มุมบนโค้ง 20px
// ซ้าย 1/3 = ข้อมูล (sticky) · ขวา 2/3 = ภาพเรียงลงมา · ปุ่มปิดสี่เหลี่ยมสีเขียวอยู่กลางด้านบน
export default function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  // เก็บโปรเจกต์ล่าสุดไว้ระหว่าง animation ปิด
  const [shown, setShown] = useState<Project | null>(project);
  const closeRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [infoTop, setInfoTop] = useState(0);
  const open = project !== null;

  useEffect(() => {
    if (project) {
      setShown(project);
      sheetRef.current?.scrollTo({ top: 0 });
    }
  }, [project]);

  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // คอลัมน์ข้อมูลด้านซ้าย: ถ้าสูงกว่าหน้าจอ ให้เลื่อนตามปกติจนถึงด้านล่างสุด แล้วค้างไว้ตรงนั้น
  // (sticky ที่ top ติดลบ = ความสูงหน้าต่าง − ความสูงคอลัมน์) ถ้าเตี้ยกว่าหน้าจอจะค้างไว้ด้านบนตามปกติ
  useEffect(() => {
    const sheet = sheetRef.current;
    const info = infoRef.current;
    if (!sheet || !info) return;
    const BOTTOM_GAP = 20;
    const update = () => setInfoTop(Math.min(0, sheet.clientHeight - info.offsetHeight - BOTTOM_GAP * 2));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(sheet);
    ro.observe(info);
    return () => ro.disconnect();
  }, [shown, mounted]);

  const p = shown;
  if (!mounted) return null;

  // portal ไปที่ body เพื่อให้อยู่เหนือ header / เมนูด้านล่าง เหมือนต้นแบบ
  return createPortal(
    <div className={`fixed inset-0 z-[60] ${open ? "" : "pointer-events-none"}`} inert={!open}>
      <div
        className={`absolute inset-0 bg-black/70 transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />

      <button
        ref={closeRef}
        onClick={onClose}
        aria-label="Close"
        className={`absolute top-7 left-1/2 z-10 grid size-11 -translate-x-1/2 place-items-center rounded-md bg-lime text-forest transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      >
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className="size-5" aria-hidden>
          <path d="M5 5l10 10M15 5L5 15" />
        </svg>
      </button>

      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-title"
        data-lenis-prevent
        className={`absolute inset-x-0 top-[100px] bottom-0 overflow-y-auto overscroll-contain rounded-t-[20px] bg-snow p-5 transition-transform duration-700 ease-out-expo ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {p && (
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-5">
            {/* ข้อมูลโปรเจกต์ */}
            <div ref={infoRef} className="lg:sticky lg:self-start" style={{ top: infoTop }}>
              <h2 id="project-title" className="pt-5 text-[clamp(24px,2.4vw,36px)] leading-[1.2] tracking-[-0.04em] text-night">
                {p.title}
              </h2>

              <div className="mt-10 space-y-10">
                <Group label="Role">
                  <p>{p.role}</p>
                </Group>
                <Group label="Type">
                  <p>
                    {p.category}
                    {p.year ? ` (${p.year})` : ""}
                  </p>
                </Group>
                {p.award && (
                  <Group label="Award">
                    <p>{p.award}</p>
                  </Group>
                )}
                <Group label="Description">
                  <p>{p.problem}</p>
                  <p className="mt-3">{p.solution}</p>
                </Group>
                {p.features && p.features.length > 0 && (
                  <Group label="Key features">
                    <ul className="space-y-2">
                      {p.features.map((f) => (
                        <li key={f} className="flex gap-2.5">
                          <span className="mt-[0.7em] size-1 shrink-0 rounded-full bg-forest" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </Group>
                )}
                {p.tech.length > 0 && (
                  <Group label="Tech stack">
                    <TechIcons tech={p.tech} />
                  </Group>
                )}
                {(p.demoUrl || p.githubUrl) && (
                  <Group label="Links">
                    {p.demoUrl && <ExtLink href={p.demoUrl}>Live demo</ExtLink>}
                    {p.githubUrl && <ExtLink href={p.githubUrl}>GitHub</ExtLink>}
                    {p.demoNote && <p className="mt-2 text-[14px] text-[#5c5c5c]">{p.demoNote}</p>}
                  </Group>
                )}
              </div>
            </div>

            {/* ภาพ — ใส่ project.images เพื่อแสดงภาพหน้าจอจริงเรียงลงมา */}
            <div className="space-y-5">
              {p.images && p.images.length > 0 ? (
                p.images.map((img) => {
                  const caption = typeof img === "string" ? undefined : img.caption;
                  const key = imageSrc(img);
                  return (
                    <figure key={key}>
                      {typeof img !== "string" && "row" in img ? (
                        // หน้าจอมือถือวางคู่กันบนพื้นสีเทา เพื่อประหยัดพื้นที่
                        <div className="flex justify-center gap-[4%] rounded-xl bg-[#e8e8e8] px-[5%] py-8">
                          {img.row.map((src) => (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              key={src}
                              src={src}
                              alt={caption ?? `${p.title} screenshot`}
                              className="block h-auto w-[min(44%,300px)] rounded-2xl shadow-[0_12px_40px_rgb(0_0_0/0.12)]"
                              loading="lazy"
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="overflow-hidden rounded-xl bg-[#e8e8e8]">
                          {/* ภาพหน้าจอแสดงตามสัดส่วนจริง ไม่ครอป */}
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={key} alt={caption ?? `${p.title} screenshot`} className="block h-auto w-full" loading="lazy" />
                        </div>
                      )}
                      {caption && <figcaption className="mt-2 text-[14px] leading-relaxed text-[#5c5c5c]">{caption}</figcaption>}
                    </figure>
                  );
                })
              ) : (
                <ProjectCover project={p} className="aspect-[4/3] w-full rounded-xl" />
              )}
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="border-b border-[#d9d9d9] pb-2.5 text-[12px] leading-[1.3] tracking-[-0.02em] text-[#5c5c5c] uppercase">{label}</h3>
      <div className="mt-2.5 text-[16px] leading-[1.6] text-ink">{children}</div>
    </section>
  );
}

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="block w-fit underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
      {children} ↗
    </a>
  );
}
