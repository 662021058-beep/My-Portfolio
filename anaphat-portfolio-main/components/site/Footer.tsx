"use client";

import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { contact, profile } from "@/data/portfolio";
import { gsap, useGSAP } from "@/lib/gsap";
import SocialIcons from "./SocialIcons";

// Footer แบบ "reveal" — fixed อยู่ใต้เนื้อหา แล้วถูกเผยออกมาเมื่อเลื่อนถึงท้ายหน้า
export default function Footer() {
  const pathname = usePathname();
  const placeholderRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".footer-inner",
          { yPercent: -25 },
          {
            yPercent: 0,
            ease: "none",
            scrollTrigger: { trigger: placeholderRef.current, start: "top bottom", end: "bottom bottom", scrub: true },
          },
        );
        gsap.fromTo(
          ".footer-avatar",
          { scale: 0.4, rotate: -20 },
          {
            scale: 1,
            rotate: 0,
            ease: "none",
            scrollTrigger: { trigger: placeholderRef.current, start: "top 60%", end: "bottom bottom", scrub: true },
          },
        );
      });
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return (
    <>
      <div ref={placeholderRef} data-theme="dark" aria-hidden className="pointer-events-none h-svh" />
      <footer ref={footerRef} id="contact" className="fixed inset-x-0 bottom-0 z-0 h-svh overflow-hidden bg-forest text-snow">
        <div className="footer-inner flex h-full flex-col px-4 pt-24 pb-6 md:px-10 md:pb-8">
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <h2 className="display relative text-[clamp(4.2rem,13vw,13.5rem)]">
              <span className="block">Let&rsquo;s work</span>
              <span className="block text-lime">together</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.avatar}
                alt=""
                className="footer-avatar absolute top-1/2 left-1/2 size-[0.82em] -translate-x-1/2 -translate-y-[42%] rounded-full object-cover"
              />
            </h2>

            <p className="mt-10 text-sm text-snow/70 md:mt-14">ติดต่อทางอีเมล:</p>
            <div className="mt-2 flex items-center gap-3">
              <a href={`mailto:${contact.email}`} className="text-xl tracking-tight hover:underline md:text-[1.75rem]">
                {contact.email}
              </a>
              <button
                onClick={copy}
                aria-label="คัดลอกอีเมล"
                className="relative grid size-8 place-items-center rounded-md bg-lime text-forest transition-transform hover:scale-110"
              >
                {copied ? "✓" : <CopyIcon />}
                <span
                  className={`absolute -top-9 rounded-md bg-snow px-2 py-1 text-xs whitespace-nowrap text-ink transition-opacity ${
                    copied ? "opacity-100" : "opacity-0"
                  }`}
                >
                  คัดลอกแล้ว
                </span>
              </button>
            </div>
            <p className="mt-2 text-sm text-snow/60">{contact.phone}</p>
          </div>

          <div className="flex items-end justify-between text-sm text-snow/80">
            <span>©{new Date().getFullYear()}</span>
            <SocialIcons />
          </div>
        </div>
      </footer>
    </>
  );
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-4" aria-hidden>
      <rect x="5" y="5" width="8.5" height="8.5" rx="1.5" />
      <path d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2h-6A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5" />
    </svg>
  );
}
