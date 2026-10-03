"use client";

import { useEffect, useState } from "react";
import { contact, profile } from "@/data/portfolio";
import { getLenis, scrollToBottom } from "@/lib/scroll";
import ArrowIcon from "../ArrowIcon";

// แท็บแนวตั้งชิดขอบขวา — ตัวหนังสืออ่านจากล่างขึ้นบน (vertical-rl + หมุน 180°)
// เพราะหมุน 180° ด้านขวาของ element จึงกลายเป็นด้านซ้ายที่หันเข้าหน้าเว็บ:
// ใช้ rounded-r (= มุมโค้งด้านซ้ายที่มองเห็น) และ hover:pr (= ยื่นออกมาทางซ้าย)
// หมายเหตุ: ตัวหนังสือแนวตั้งทำให้ px = ความสูงของแท็บ และ py = ความกว้างของแท็บ
const tab =
  "rounded-r-lg px-10 py-3.5 text-[13px] shadow-[0_8px_30px_rgb(0_0_0/0.12)] transition-[padding] hover:pr-6 [writing-mode:vertical-rl] rotate-180";

export default function SideTabs() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const lenis = getLenis();
    if (open) lenis?.stop();
    else lenis?.start();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const facts = [
    { label: "ตำแหน่งที่สนใจ", value: profile.roles.join(" · ") },
    { label: "ช่วงสหกิจศึกษา", value: `${profile.availabilityFull} (${profile.availabilityNote})` },
    { label: "การศึกษา", value: `${profile.education} ${profile.faculty} ${profile.university}` },
    { label: "เกรดเฉลี่ยสะสม", value: profile.gpax },
    { label: "ที่อยู่", value: profile.location },
    { label: "อีเมล", value: contact.email },
    { label: "โทรศัพท์", value: contact.phone },
  ];

  return (
    <>
      <div className="fixed top-1/2 right-0 z-40 flex -translate-y-1/2 flex-col gap-2">
        <button onClick={() => setOpen(true)} className={`${tab} bg-snow text-ink`}>
          Quick info
        </button>
        {profile.resumeUrl && (
          <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className={`${tab} bg-night text-lime`}>
            Resume
          </a>
        )}
      </div>

      <div
        className={`fixed inset-0 z-50 bg-ink/40 transition-opacity duration-500 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setOpen(false)}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Quick info"
        inert={!open}
        data-lenis-prevent
        className={`fixed top-0 right-0 z-50 flex h-full w-full max-w-[40rem] flex-col overflow-y-auto bg-night p-6 text-snow transition-transform duration-700 ease-out-expo md:p-10 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center gap-5 border-b border-snow/15 pb-6">
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="grid size-11 shrink-0 place-items-center rounded-lg bg-snow text-ink transition-transform hover:rotate-90"
          >
            ✕
          </button>
          <h2 className="text-[clamp(2rem,4vw,3rem)] leading-none tracking-[-0.04em]">Quick info</h2>
        </div>

        <div className="mt-8 flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={profile.avatar} alt="" className="size-16 rounded-full object-cover" />
          <div>
            <p className="text-lg">
              {profile.name} ({profile.nickname})
            </p>
            <p className="text-snow/60">
              {profile.nameTh} ({profile.nicknameTh})
            </p>
          </div>
        </div>

        <dl className="mt-8 space-y-4">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="text-xs text-lime">{f.label}</dt>
              <dd className="mt-1 text-[15px] text-snow/90">{f.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto flex flex-wrap gap-2 pt-8">
          <button
            onClick={() => {
              setOpen(false);
              setTimeout(scrollToBottom, 350);
            }}
            className="flex items-center gap-3 rounded-full bg-lime py-2 pr-2 pl-5 text-[15px] text-forest"
          >
            ติดต่อ
            <span className="grid size-7 place-items-center rounded-full bg-snow text-forest">
              <ArrowIcon className="size-3.5" />
            </span>
          </button>
          {profile.resumeUrl && (
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="rounded-full border border-snow/30 px-5 py-2.5 text-[15px]">
              ดาวน์โหลดเรซูเม่
            </a>
          )}
        </div>
      </aside>
    </>
  );
}
