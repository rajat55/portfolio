"use client";

import { useEffect, useRef, useState } from "react";
import { FiArrowDown, FiArrowRight, FiSmartphone, FiLock } from "react-icons/fi";
import { TbArrowsSplit, TbShieldLock, TbCube, TbBolt, TbDatabase, TbRefresh } from "react-icons/tb";
import { SectionGrid, GlowOrb, SectionEyebrow, SectionHeading } from "./section-decor";

interface Chip {
  label: string;
  icon?: React.ReactNode;
  primary?: boolean;
}

interface Step {
  id: string;
  tag: string;
  title: string;
  icon: React.ReactNode;
  accentVar: string; // e.g. "--accent-pink"
  description: React.ReactNode;
  chips: Chip[];
  statVal: string;
  statLabel: string;
}

const STEPS: Step[] = [
  {
    id: "client",
    tag: "01 · Entry",
    title: "Client request",
    icon: <FiSmartphone />,
    accentVar: "--accent-pink",
    description: "A user action — page load, button click, API call — fires an HTTPS request from a web or mobile client toward the backend.",
    chips: [
      { label: "Client", icon: <FiSmartphone />, primary: true },
      { label: "TLS 1.3", icon: <FiLock /> },
    ],
    statVal: "HTTPS",
    statLabel: "encrypted in transit",
  },
  {
    id: "lb",
    tag: "02 · Distribute",
    title: "Load balancer",
    icon: <TbArrowsSplit />,
    accentVar: "--accent-amber",
    description: (
      <>Traffic hits a load balancer first. It distributes requests across <b className="font-semibold text-text-secondary">multiple service instances</b> using health checks, so no single node becomes a bottleneck and instances can scale horizontally.</>
    ),
    chips: [
      { label: "LB", icon: <TbArrowsSplit />, primary: true },
      { label: "Instance A" },
      { label: "Instance B" },
      { label: "Instance C" },
    ],
    statVal: "Round-robin",
    statLabel: "+ health checks",
  },
  {
    id: "gateway",
    tag: "03 · Secure",
    title: "API gateway & auth",
    icon: <TbShieldLock />,
    accentVar: "--accent-violet",
    description: (
      <>Every request is validated at a single entry point — <b className="font-semibold text-text-secondary">JWT verification</b>, rate limiting, and request logging — before it&apos;s allowed to reach any internal service.</>
    ),
    chips: [
      { label: "Gateway", icon: <TbShieldLock />, primary: true },
      { label: "JWT verify" },
      { label: "Rate limit" },
    ],
    statVal: "Stateless",
    statLabel: "token-based auth",
  },
  {
    id: "service",
    tag: "04 · Process",
    title: "Microservices",
    icon: <TbCube />,
    accentVar: "--accent-cyan",
    description: (
      <>The request reaches an independently deployable service — each owning a <b className="font-semibold text-text-secondary">single business capability</b> (loans, documents, auth) — so teams can ship and scale them on their own schedule.</>
    ),
    chips: [
      { label: "Service", icon: <TbCube />, primary: true },
      { label: "Spring Boot" },
      { label: "Docker" },
    ],
    statVal: "Independent",
    statLabel: "deploy & scale",
  },
  {
    id: "cache",
    tag: "05 · Accelerate",
    title: "Caching layer",
    icon: <TbBolt />,
    accentVar: "--accent-red",
    description: (
      <>Before hitting the database, frequently accessed data is checked against <b className="font-semibold text-text-secondary">Redis</b>. Cache hits return in single-digit milliseconds, sparing the database from repetitive read load.</>
    ),
    chips: [
      { label: "Redis", icon: <TbBolt />, primary: true },
      { label: "Cache hit" },
      { label: "TTL eviction" },
    ],
    statVal: "<5ms",
    statLabel: "cache hit latency",
  },
  {
    id: "database",
    tag: "06 · Persist",
    title: "Database layer",
    icon: <TbDatabase />,
    accentVar: "--accent-green",
    description: (
      <>On a cache miss, the query hits <b className="font-semibold text-text-secondary">PostgreSQL</b>. Reads are routed to replicas while writes go to the primary, with indexing and query tuning keeping response times low even on large datasets.</>
    ),
    chips: [
      { label: "Primary", icon: <TbDatabase />, primary: true },
      { label: "Replica 1" },
      { label: "Replica 2" },
    ],
    statVal: "35,000ms → 350ms",
    statLabel: "via indexing & tuning",
  },
  {
    id: "resilience",
    tag: "07 · Endure",
    title: "Resilience & recovery",
    icon: <TbRefresh />,
    accentVar: "--accent-orange",
    description: (
      <>For critical operations — like document delivery — <b className="font-semibold text-text-secondary">automatic retries</b>, fault-tolerant processing, and recovery mechanisms ensure nothing is silently lost, with monitoring surfacing failures in real time.</>
    ),
    chips: [
      { label: "Retry", icon: <TbRefresh />, primary: true },
      { label: "Dead-letter queue" },
      { label: "Alerting" },
    ],
    statVal: "Zero",
    statLabel: "data loss",
  },
];

function ProgressRing({ visible, accent }: { visible: boolean; accent: string }) {
  const circumference = 2 * Math.PI * 29;
  return (
    <div className="absolute" style={{ left: -1.5, top: 0, width: 61, height: 61 }}>
      <svg viewBox="0 0 64 64" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
        <circle cx="32" cy="32" r="29" fill="none" strokeWidth={1.5} stroke="var(--border-subtle)" />
        <circle
          cx="32" cy="32" r="29" fill="none" strokeWidth={1.5}
          stroke={accent}
          strokeDasharray={circumference}
          strokeDashoffset={visible ? 0 : circumference}
          style={{ transition: "stroke-dashoffset 0.6s cubic-bezier(.16,1,.3,1)" }}
        />
      </svg>
    </div>
  );
}

function StepBlock({ step, isLast }: { step: Step; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const accent = `var(${step.accentVar})`;
  const accentSoft = `var(${step.accentVar}-soft)`;
  const accentBorder = `var(${step.accentVar}-border)`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      style={{
        paddingLeft: 78,
        marginBottom: isLast ? 8 : 60,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.55s cubic-bezier(.16,1,.3,1), transform 0.55s cubic-bezier(.16,1,.3,1)",
      }}
    >
      <ProgressRing visible={visible} accent={accent} />

      <div
        className="absolute flex items-center justify-center"
        style={{
          left: 0, top: 0, width: 58, height: 58, borderRadius: "50%",
          background: "var(--bg-surface)",
          border: `1.5px solid ${visible ? accent : "var(--border-default)"}`,
          boxShadow: visible ? `0 0 0 5px ${accentSoft}, 0 0 24px ${accentSoft}` : "none",
          zIndex: 3,
          transition: "border-color 0.45s, box-shadow 0.45s, background 0.45s",
        }}
      >
        <span style={{ fontSize: 23, color: visible ? accent : "var(--text-quaternary)", transition: "color 0.45s" }}>
          {step.icon}
        </span>
      </div>

      <div className="mb-2 flex flex-wrap items-baseline gap-[10px]">
        <span className="font-mono" style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: accent }}>
          {step.tag}
        </span>
        <span className="text-text-primary" style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-.01em" }}>
          {step.title}
        </span>
      </div>

      <p className="mb-[18px] text-text-tertiary" style={{ fontSize: 13.5, lineHeight: 1.7, maxWidth: 540 }}>
        {step.description}
      </p>

      <div
        className="relative flex flex-wrap items-center gap-3 overflow-hidden"
        style={{ background: "var(--bg-surface)", border: `1px solid ${visible ? accentSoft : "var(--border-subtle)"}`, borderRadius: 14, padding: "18px 20px", transition: "border-color 0.3s" }}
      >
        {visible && (
          <span
            className="absolute flowing-dot"
            style={{ width: 5, height: 5, borderRadius: "50%", background: accent, top: "50%", marginTop: -2.5 }}
          />
        )}

        {step.chips.map((chip, i) => (
          <span key={chip.label} style={{ display: "contents" }}>
            <span
              className="flex items-center gap-[7px] whitespace-nowrap font-mono"
              style={{
                padding: "7px 13px", borderRadius: 9, fontSize: 11, fontWeight: 500,
                background: chip.primary ? accentSoft : "var(--bg-muted)",
                color: chip.primary ? accent : "var(--text-tertiary)",
                border: chip.primary ? `1px solid ${accentBorder}` : "none",
              }}
            >
              {chip.icon && <span style={{ fontSize: 14 }}>{chip.icon}</span>}
              {chip.label}
            </span>
            {i === 0 && <FiArrowRight style={{ color: "var(--text-quaternary)", fontSize: 15, flexShrink: 0 }} />}
          </span>
        ))}

        <div className="ml-auto text-right" style={{ paddingLeft: 12 }}>
          <div className="font-mono whitespace-nowrap text-text-primary" style={{ fontSize: 15, fontWeight: 700 }}>{step.statVal}</div>
          <div className="text-text-quaternary" style={{ fontSize: 10, marginTop: 1 }}>{step.statLabel}</div>
        </div>
      </div>
    </div>
  );
}

export default function SystemDesignSection() {
  const storyRef = useRef<HTMLDivElement>(null);
  const [fillHeight, setFillHeight] = useState(0);

  useEffect(() => {
    const handler = () => {
      const el = storyRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - 12;
      const scrolled = Math.min(Math.max(vh * 0.5 - rect.top, 0), total);
      setFillHeight(scrolled);
    };
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    handler();
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, []);

  return (
    <section id="system-design" className="relative overflow-hidden bg-base" style={{ padding: "88px 48px 100px" }}>
      <style>{`
        @keyframes flowDot {
          0% { left: 14px; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: calc(100% - 90px); opacity: 0; }
        }
        .flowing-dot { animation: flowDot 2.2s ease-in-out infinite; }
      `}</style>

      <SectionGrid />
      <GlowOrb color="violet" style={{ top: -90, right: -70, width: 460, height: 460 }} />

      <div className="relative z-10 mx-auto max-w-[880px]">
        <SectionEyebrow>System design</SectionEyebrow>
        <SectionHeading lead="How I build" outline="scalable systems" className="mb-3" />
        <p className="mb-5 text-text-secondary" style={{ fontSize: 14, lineHeight: 1.7, maxWidth: 520 }}>
          Follow a request as it travels through a production backend — from the first network hop to the database
          and back, with the patterns that keep it fast and resilient under load.
        </p>

        <div className="mb-[60px] flex items-center gap-[7px] font-mono text-text-quaternary" style={{ fontSize: 10.5 }}>
          <FiArrowDown className="animate-bounce text-violet" size={13} />
          Scroll to walk through the architecture
        </div>

        <div ref={storyRef} className="relative">
          <div className="absolute" style={{ left: 27, top: 6, bottom: 6, width: 2, background: "var(--border-subtle)", borderRadius: 2 }} />
          <div
            className="absolute"
            style={{
              left: 27, top: 6, width: 2, borderRadius: 2,
              background: "linear-gradient(to bottom, var(--accent-violet), var(--accent-cyan))",
              boxShadow: "0 0 12px var(--accent-violet-soft)",
              height: fillHeight,
              transition: "height 0.15s linear",
            }}
          />

          {STEPS.map((step, i) => (
            <StepBlock key={step.id} step={step} isLast={i === STEPS.length - 1} />
          ))}

          <div className="relative flex items-center" style={{ paddingLeft: 78, marginTop: 8, gap: 10 }}>
            <span className="absolute" style={{ left: 24, width: 8, height: 8, borderRadius: "50%", background: "var(--accent-cyan)", boxShadow: "0 0 0 4px var(--accent-cyan-soft)" }} />
            <span className="font-mono text-text-quaternary" style={{ fontSize: 11 }}>Response returned to client</span>
          </div>
        </div>
      </div>
    </section>
  );
}
