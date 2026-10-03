"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "@/data/portfolio";
import { scrollToBottom } from "@/lib/scroll";
import ArrowIcon from "../ArrowIcon";

export default function Header() {
  const pathname = usePathname();
  // เปลี่ยนสีชื่อเป็นสีขาวเมื่ออยู่บน section สีเข้ม (data-theme="dark")
  const [dark, setDark] = useState(false);

  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      const y = 44; // ระดับกึ่งกลางของ header
      const isDark = Array.from(document.querySelectorAll<HTMLElement>('[data-theme="dark"]')).some((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= y && r.bottom >= y;
      });
      setDark(isDark);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between px-4 py-5 md:px-10">
      <Link
        href="/"
        className={`pointer-events-auto text-base tracking-tight transition-colors duration-300 md:text-lg ${
          dark ? "text-snow" : "text-ink"
        }`}
      >
        {profile.name}
      </Link>
      <button
        onClick={scrollToBottom}
        className="group pointer-events-auto flex items-center gap-3 rounded-full bg-lime py-2 pr-2 pl-5 text-[15px] text-forest transition-transform duration-300 hover:scale-[1.04]"
      >
        Contact
        <span className="grid size-7 place-items-center rounded-full bg-snow text-forest transition-transform duration-300 group-hover:-rotate-45">
          <ArrowIcon className="size-3.5" />
        </span>
      </button>
    </header>
  );
}
