"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Home" },
  { href: "/works", label: "Works" },
  { href: "/about", label: "About" },
];

export default function BottomNav() {
  const pathname = usePathname();
  const listRef = useRef<HTMLUListElement>(null);
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);

  useEffect(() => {
    const update = () => {
      const el = listRef.current?.querySelector<HTMLElement>(`[data-href="${pathname}"]`);
      setIndicator(el ? { left: el.offsetLeft, width: el.offsetWidth } : null);
    };
    update();
    window.addEventListener("resize", update);
    document.fonts?.ready.then(update);
    return () => window.removeEventListener("resize", update);
  }, [pathname]);

  return (
    <nav aria-label="Main" className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2 md:bottom-6">
      <ul ref={listRef} className="relative flex items-center rounded-full bg-snow p-[5px] text-[13px] tracking-wide text-ink uppercase">
        {indicator && (
          <span
            aria-hidden
            className="absolute top-[5px] bottom-[5px] rounded-full bg-lime transition-all duration-500 ease-out-expo"
            style={{ left: indicator.left, width: indicator.width }}
          />
        )}
        {items.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              data-href={href}
              aria-current={pathname === href ? "page" : undefined}
              className="relative block rounded-full px-4 py-2 md:px-5"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
