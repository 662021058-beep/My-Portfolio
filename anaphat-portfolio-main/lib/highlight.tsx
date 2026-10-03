import { Fragment } from "react";

// แปลงข้อความที่มี [คำ] ให้คำในวงเล็บเป็นสีไฮไลต์
// แต่ละช่วงที่คั่นด้วยช่องว่างจะไม่ถูกตัดกลางบรรทัด (กันภาษาไทยถูกตัดกลางคำ)
// — จึงควรเว้นวรรคในจุดที่ยอมให้ขึ้นบรรทัดใหม่ได้
function Phrases({ text }: { text: string }) {
  const parts = text.split(/(\s+)/);
  return (
    <>
      {parts.map((part, i) =>
        /^\s+$/.test(part) ? (
          <Fragment key={i}> </Fragment>
        ) : part ? (
          <span key={i} className="inline-block">
            {part}
          </span>
        ) : null,
      )}
    </>
  );
}

export function Highlight({ text, className = "text-lime" }: { text: string; className?: string }) {
  return (
    <>
      {text.split(/(\[[^\]]+\])/).map((part, i) =>
        part.startsWith("[") ? (
          <span key={i} className={className}>
            <Phrases text={part.slice(1, -1)} />
          </span>
        ) : (
          <Phrases key={i} text={part} />
        ),
      )}
    </>
  );
}

// แยกเป็นคำ ๆ สำหรับ animation ทีละคำ
export function splitWords(text: string) {
  const words: { word: string; highlight: boolean }[] = [];
  text.split(/(\[[^\]]+\])/).forEach((part) => {
    const highlight = part.startsWith("[");
    part
      .replace(/[[\]]/g, "")
      .split(/\s+/)
      .filter(Boolean)
      .forEach((word) => {
        if (/^[.,!?;:]+$/.test(word) && words.length) words[words.length - 1].word += word;
        else words.push({ word, highlight });
      });
  });
  return words;
}
