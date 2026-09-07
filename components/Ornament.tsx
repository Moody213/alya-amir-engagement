import type { ReactNode, CSSProperties } from "react";

export function Ornament({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 20"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 10H40M80 10H120"
        stroke="currentColor"
        strokeWidth="0.75"
      />
      <circle cx="60" cy="10" r="3" stroke="currentColor" strokeWidth="0.75" />
      <path
        d="M52 10C52 10 55 5 60 5C65 5 68 10 68 10C68 10 65 15 60 15C55 15 52 10 52 10Z"
        stroke="currentColor"
        strokeWidth="0.6"
      />
      <path d="M40 10L46 7M40 10L46 13" stroke="currentColor" strokeWidth="0.6" />
      <path d="M80 10L74 7M80 10L74 13" stroke="currentColor" strokeWidth="0.6" />
    </svg>
  );
}

export function SectionEyebrow({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <p
      className="on-art tracking-widest-2 uppercase font-medium text-center"
      style={{ fontSize: "11px", color: "var(--color-ink)", ...style }}
    >
      {children}
    </p>
  );
}
