"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

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
    <Reveal>
      <div
        className={`mb-3.5 flex items-center gap-2 font-mono text-[10.5px] font-semibold uppercase tracking-[.2em] text-violet ${
          center ? "justify-center" : ""
        }`}
      >
        <span className="inline-block h-px w-[18px] bg-violet" />
        {children}
      </div>
    </Reveal>
  );
}

/* Headline — the highlighted half is now a solid, readable gradient fill
   (violet → cyan) instead of a transparent text-stroke outline. */
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
    <Reveal delay={80}>
      <h2
        className={`font-black leading-[1.08] tracking-tight text-text-primary ${
          center ? "text-center" : ""
        } ${className}`}
        style={{ fontSize: "clamp(1.9rem, 4vw, 2.8rem)" }}
      >
        {lead}{" "}
        <span
          style={{
            background: "linear-gradient(120deg, var(--accent-violet) 0%, var(--accent-cyan) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {outline}
        </span>
      </h2>
    </Reveal>
  );
}

/* ── Scroll-reveal wrapper ──────────────────────────────────────────────
   Fades + slides an element up into place the first time it enters the
   viewport. Used to animate every section's content as the user scrolls. */
type RevealDirection = "up" | "left" | "right" | "none";

interface RevealProps {
  children: ReactNode;
  delay?: number;       // ms
  direction?: RevealDirection;
  distance?: number;    // px
  duration?: number;    // ms
  threshold?: number;   // 0–1, fraction visible before triggering
  className?: string;
  as?: "div" | "span";
}

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  distance = 24,
  duration = 600,
  threshold = 0.15,
  className = "",
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced-motion preference: show immediately, no animation
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const offset =
    direction === "up" ? `translateY(${distance}px)`
    : direction === "left" ? `translateX(${distance}px)`
    : direction === "right" ? `translateX(-${distance}px)`
    : "none";

  const Tag = as;

  return (
    <Tag
      ref={ref as never}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0,0)" : offset,
        transition: `opacity ${duration}ms cubic-bezier(.16,1,.3,1) ${delay}ms, transform ${duration}ms cubic-bezier(.16,1,.3,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
}

/* Staggers Reveal-wrapped children automatically by index * stagger ms.
   Wrap a list/grid of cards in this instead of hand-writing delays. */
export function RevealGroup({
  children,
  stagger = 80,
  direction = "up",
  className = "",
}: {
  children: ReactNode[];
  stagger?: number;
  direction?: RevealDirection;
  className?: string;
}) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <Reveal key={i} delay={i * stagger} direction={direction}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
