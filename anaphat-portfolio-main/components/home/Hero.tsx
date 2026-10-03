"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { home, profile } from "@/data/portfolio";
import { gsap, useGSAP } from "@/lib/gsap";
import { scrollToTarget } from "@/lib/scroll";
import ArrowIcon from "../ArrowIcon";
import SocialIcons from "../site/SocialIcons";
import TextType from "../TextType";

// Hero แบบ sticky — การ์ดสีเขียวของ section ถัดไปจะเลื่อนขึ้นมาทับ
//
// ตำแหน่งบนจอคอมอิงจากต้นแบบ (สัดส่วนของจอ):
//   บรรทัด 1 เริ่มที่ ~22vw, บรรทัด 2 เริ่มที่ ~48vw (หลังศีรษะ), ประโยคบรรยายอยู่ที่ ~61svh
//   รูป: ใบหน้าอยู่ที่ 40vw, เส้นผมเริ่มที่ 30svh (ทับขอบล่างของบรรทัด 1)
// รูปเป็นภาพคนตัดพื้นหลัง (โปร่งใส) วางไว้ "หน้า" ตัวหนังสือ — ผมจะบังขอบล่างของบรรทัด 1 เหมือนต้นแบบ
// สีพื้นหลังมาจาก bg-mist ของ section
export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(".hero-fade", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.6 });
        gsap.fromTo(".hero-photo", { yPercent: 30, y: 0 }, { yPercent: 0, duration: 1.8, ease: "expo.out", delay: 0.2 });

        gsap.to(".hero-content", {
          yPercent: -12,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom bottom", scrub: true },
        });
      });
    },
    { scope: ref },
  );

  const { rotating, line2 } = home.hero;

  return (
    <section ref={ref} className="relative h-[250svh]">
      <div className="sticky top-0 h-svh overflow-hidden bg-mist">
        <div className="hero-content relative z-10 h-full pt-[20svh] text-night md:pt-0">
          <h1
            aria-label={`${rotating.join(" / ")} ${line2}`}
            className="display text-[13.5vw] md:absolute md:inset-x-0 md:top-[20svh] md:text-[clamp(3.2rem,8.6vw,10.5rem)]"
          >
            <TypedHeadline rotating={rotating} line2={line2} indents={["pl-4 md:pl-[22vw]", "pl-[10vw] md:pl-[48vw]"]} />
          </h1>
          <p className="hero-fade pre-fade mt-5 ml-[10vw] max-w-[17rem] text-[15px] leading-snug text-night/80 md:absolute md:top-[61svh] md:left-[max(55vw,calc(40vw+27svh))] md:mt-0 md:ml-0 md:max-w-[34vw] md:text-[clamp(15px,1.4vw,20px)] [text-wrap:balance]">
            {home.hero.sub.map((phrase, i) => (
              <span key={phrase}>
                <span className="inline-block">{phrase}</span>
                {i < home.hero.sub.length - 1 && " "}
              </span>
            ))}
          </p>
        </div>

        {/* รูปอยู่ชั้นบนสุด (ยกเว้นปุ่ม) — ขนาด/ตำแหน่งคำนวณจากสัดส่วนรูป 850×1399 ใบหน้าอยู่ที่ 46.8% ของความกว้าง */}
        <div className="hero-photo pre-photo pointer-events-none absolute z-20 aspect-[850/1399] max-md:bottom-[-4svh] max-md:left-[calc(50vw-17.1svh)] max-md:h-[60svh] md:top-[29.5svh] md:left-[calc(40vw-21.9svh)] md:h-[77svh]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            className="size-full object-contain object-top select-none"
            draggable={false}
          />
        </div>

        <button
          onClick={() => scrollToTarget(window.innerHeight * 1.5)}
          aria-label="Scroll down"
          className="absolute bottom-5 left-4 z-30 grid size-14 place-items-center rounded-full border border-ink/15 bg-mist text-ink transition-transform hover:scale-105 md:bottom-6 md:left-10 md:size-[60px]"
        >
          <ArrowIcon direction="down" className="size-4" />
        </button>
        <SocialIcons className="absolute right-4 bottom-7 z-30 text-ink max-md:hidden md:right-10 md:bottom-9" />
      </div>
    </section>
  );
}

// หัวข้อแบบพิมพ์ด้วย TextType
//   1) บรรทัดแรกพิมพ์คำแรก (Data Analyst)
//   2) บรรทัดสองพิมพ์ "& Developer" ครั้งเดียว
//   3) จากนั้นบรรทัดแรกลบแล้วพิมพ์คำถัดไปวนไปเรื่อย ๆ (เคอร์เซอร์ย้ายกลับมาบรรทัดแรก)
// มีข้อความที่ยาวที่สุดแบบโปร่งใสรองรับไว้ เพื่อจองพื้นที่ไม่ให้หน้ากระโดดระหว่างพิมพ์
const TYPE_SPEED = 75; // ms ต่อตัวอักษร
const DELETE_SPEED = 40;
const START_DELAY = 400;
const LINE_GAP = 250;
const HOLD = 2600; // เวลาค้างคำไว้ก่อนลบ

function TypedHeadline({ rotating, line2, indents }: { rotating: readonly string[] | string[]; line2: string; indents: string[] }) {
  const [reduced, setReduced] = useState(false);
  const [active, setActive] = useState(0); // บรรทัดที่เคอร์เซอร์อยู่
  const [pause, setPause] = useState<number | null>(null); // null = รอบแรก

  const words = rotating as string[];
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");
  const line2Start = START_DELAY + words[0].length * TYPE_SPEED + LINE_GAP;
  // pause ของบรรทัดแรกต้องนานพอให้บรรทัดสองพิมพ์เสร็จก่อนเริ่มลบ
  const firstPause = LINE_GAP + line2.length * TYPE_SPEED + HOLD;

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const toLine2 = setTimeout(() => setActive(1), line2Start);
    const backToLine1 = setTimeout(() => setActive(0), START_DELAY + words[0].length * TYPE_SPEED + firstPause);
    return () => {
      clearTimeout(toLine2);
      clearTimeout(backToLine1);
    };
  }, [line2Start, firstPause, words]);

  // หลังลบคำแรกเสร็จ ใช้เวลาค้างคำปกติ
  const shortenPause = useCallback(() => setPause(HOLD), []);

  const cursor = <span className="inline-block h-[0.78em] w-[0.06em] translate-y-[0.06em] bg-current" />;

  const row = (i: number, sizer: string, content: React.ReactNode) => (
    <span aria-hidden className={`relative block ${indents[i]}`}>
      <span className="invisible">{sizer}</span>
      <span className="absolute inset-y-0 left-0 w-full whitespace-nowrap">
        <span className={indents[i]}>{content}</span>
      </span>
    </span>
  );

  if (reduced) {
    return (
      <>
        {row(0, longest, words[0])}
        {row(1, line2, line2)}
      </>
    );
  }

  return (
    <>
      {row(
        0,
        longest,
        <TextType
          as="span"
          text={words}
          loop
          typingSpeed={TYPE_SPEED}
          deletingSpeed={DELETE_SPEED}
          initialDelay={START_DELAY}
          pauseDuration={pause ?? firstPause}
          onSentenceComplete={shortenPause}
          showCursor={active === 0}
          cursorCharacter={cursor}
          cursorClassName="!ml-[0.06em]"
        />,
      )}
      {row(
        1,
        line2,
        <TextType
          as="span"
          text={line2}
          loop={false}
          typingSpeed={TYPE_SPEED}
          initialDelay={line2Start}
          showCursor={active === 1}
          cursorCharacter={cursor}
          cursorClassName="!ml-[0.06em]"
        />,
      )}
    </>
  );
}
