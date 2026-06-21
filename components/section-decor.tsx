"use client";

import { ReactNode } from "react";

/* Subtle grid background, radially masked toward the edges */
export function SectionGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
      }}
    />
  );
}

interface GlowOrbProps {
  className?: string;
  color?: "violet" | "cyan";
  style?: React.CSSProperties;
}

export function GlowOrb({ className = "", color = "violet", style }: GlowOrbProps) {
  const glow = color === "violet" ? "var(--glow-violet)" : "var(--glow-cyan)";
  return (
    <div
      className={`pointer-events-none absolute rounded-full ${className}`}
      style={{ background: `radial-gradient(circle, ${glow} 0%, transparent 65%)`, ...style }}
    />
  );
}

/* "— Eyebrow label" used at the top of every section */
export function SectionEyebrow({ children, center = false }: { children: ReactNode; center?: boolean }) {
  return (
    <div
      className={`mb-3.5 flex items-center gap-2 font-mono text-[10.5px] font-semibold uppercase tracking-[.2em] text-violet ${
        center ? "justify-center" : ""
      }`}
    >
      <span className="inline-block h-px w-[18px] bg-violet" />
      {children}
    </div>
  );
}

/* Headline with the signature outlined second half */
export function SectionHeading({
  lead,
  outline,
  center = false,
  className = "",
}: {
  lead: ReactNode;
  outline: ReactNode;
  center?: boolean;
  className?: string;
}) {
  return (
    <h2
      className={`font-black leading-[1.08] tracking-tight text-text-primary ${
        center ? "text-center" : ""
      } ${className}`}
      style={{ fontSize: "clamp(1.9rem, 4vw, 2.8rem)" }}
    >
      {lead}{" "}
      <span
        className="text-transparent"
        style={{ WebkitTextStroke: "1.5px var(--accent-violet-border)" }}
      >
        {outline}
      </span>
    </h2>
  );
}
