export default function ArrowIcon({ className = "", direction = "right" }: { className?: string; direction?: "right" | "down" | "up-right" }) {
  const rotate = { right: 0, down: 90, "up-right": -45 }[direction];
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden
    >
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}
