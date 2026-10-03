import { techIcons } from "@/data/tech";

// ไอคอนเทคโนโลยี — วางเมาส์เพื่อดูชื่อ
// ชื่อที่ไม่มีไอคอนใน data/tech.ts จะแสดงเป็นข้อความแทน
export default function TechIcons({ tech, dark = false }: { tech: string[]; dark?: boolean }) {
  return (
    <ul className="mt-1 flex flex-wrap gap-2">
      {tech.map((name) => {
        const slug = techIcons[name];
        return (
          <li key={name} className="group/tech relative">
            {slug ? (
              <span
                title={name}
                className={`grid size-11 place-items-center rounded-lg border bg-white transition-transform duration-300 group-hover/tech:-translate-y-0.5 ${
                  dark ? "border-transparent" : "border-[#e4e4e4]"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/tech/${slug}.svg`} alt={name} className="size-6 object-contain" />
              </span>
            ) : (
              <span
                className={`flex h-11 items-center rounded-lg border px-3 text-[13px] ${
                  dark ? "border-snow/20 text-snow/80" : "border-[#e4e4e4] bg-white text-ink"
                }`}
              >
                {name}
              </span>
            )}
            {slug && (
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 rounded-md bg-ink px-2 py-1 text-xs whitespace-nowrap text-snow opacity-0 transition-opacity duration-200 group-hover/tech:opacity-100"
              >
                {name}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
