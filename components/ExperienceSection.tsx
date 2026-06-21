"use client";

import { useEffect, useRef, useState } from "react";
import {
  FiMapPin, FiCode,
} from "react-icons/fi";
import {
  TbBuildingSkyscraper, TbCreditCard, TbChartDots, TbDeviceLaptop, TbBroadcast,
} from "react-icons/tb";
import { SectionGrid, GlowOrb, SectionEyebrow, SectionHeading, Reveal } from "./section-decor";

interface Experience {
  id: string;
  icon: React.ReactNode;
  accentColor: string; // CSS var name e.g. "--accent-violet"
  role: string;
  dateRange: string;
  company: string;
  project: string;
  location?: string;
  bullets: { text: string; highlight?: string }[];
  tags: string[];
  compact?: boolean;
  tagTheme?: "cyan" | "amber";
}

const EXPERIENCES: Experience[] = [
  {
    id: "re-lending",
    icon: <TbBuildingSkyscraper />,
    accentColor: "--accent-violet",
    role: "Application Engineer",
    dateRange: "May 2025 – Present",
    company: "Newgen Software",
    project: "Real Estate Lending Platform",
    bullets: [
      { text: "Built event-driven, asynchronous integrations with third-party verification and identity APIs for borrower and property validation workflows." },
      { text: "Introduced caching and containerization practices to improve service reliability and deployment consistency across environments." },
      { text: "Built a scalable Approval Portal (Spring Boot + React) with one-click approval via secure email links." },
      { text: "Built a scheduler-based document distribution system over SFTP — processing thousands of documents daily with zero data loss." },
    ],
    tags: ["Spring Boot", "React", "Apache PDFBox", "SFTP"],
  },
  {
    id: "retail-loan",
    icon: <TbCreditCard />,
    accentColor: "--accent-cyan",
    role: "Application Engineer",
    dateRange: "Apr 2024 – May 2025",
    company: "Newgen Software",
    project: "Retail Loan Origination System",
    bullets: [
      { text: "Architected fault-tolerant integrations for digital signing, fraud detection, and credit underwriting via REST APIs and webhooks." },
      { text: "Automated 50+ document types with a template-driven PDF generation engine using Apache PDFBox." },
      {
        text: "Reduced module response times from 35,000 ms to 350 ms (100x) via SQL tuning and indexing.",
        highlight: "Reduced module response times from 35,000 ms to 350 ms (100x)",
      },
    ],
    tags: ["PostgreSQL", "JWT", "Query Optimization"],
  },
  {
    id: "commercial-loan",
    icon: <TbChartDots />,
    accentColor: "--accent-green",
    role: "Application Engineer",
    dateRange: "Jun 2023 – Mar 2024",
    company: "Newgen Software",
    project: "Commercial Loan Origination System",
    bullets: [
      { text: "Built and tuned BAM reports using PostgreSQL stored procedures with batch processing." },
      { text: "Developed SLA monitoring dashboards for real-time workflow visibility using React." },
    ],
    tags: ["PostgreSQL", "React", "Dashboards"],
    compact: true,
  },
  {
    id: "enterprise-loan",
    icon: <FiCode />,
    accentColor: "--accent-pink",
    role: "Application Engineer",
    dateRange: "Jan 2023 – May 2023",
    company: "Newgen Software",
    project: "Enterprise Loan Origination Platform",
    bullets: [
      { text: "Built RESTful APIs and backend services in Java and Spring Boot for workflow automation." },
      { text: "Implemented JWT-based authentication and security enhancements." },
    ],
    tags: ["Java", "Spring Boot", "JWT"],
    compact: true,
  },
];

const INTERNSHIPS: Experience[] = [
  {
    id: "incapp",
    icon: <TbDeviceLaptop />,
    accentColor: "--accent-amber",
    role: "Internship Trainee",
    dateRange: "Sep 2022 – Dec 2022 · 4 mos",
    company: "INCAPP",
    project: "Apprenticeship",
    location: "Greater Noida · On-site",
    bullets: [{ text: "Worked on web applications and full-stack development fundamentals." }],
    tags: ["Web Applications", "Full-Stack Development"],
    compact: true,
    tagTheme: "amber",
  },
  {
    id: "prasar-bharati",
    icon: <TbBroadcast />,
    accentColor: "--accent-amber",
    role: "Internship Trainee",
    dateRange: "Jul 2022 – Aug 2022 · 2 mos",
    company: "Prasar Bharati",
    project: "Internship",
    location: "New Delhi · Hybrid",
    bullets: [{ text: "Explored computer science fundamentals and networking concepts." }],
    tags: ["Computer Science", "Computer Networking"],
    compact: true,
    tagTheme: "amber",
  },
];

function Bullet({ text, highlight }: { text: string; highlight?: string }) {
  const dotStyle: React.CSSProperties = { left: 0, top: 8, width: 4, height: 4, borderRadius: "50%", background: "var(--text-quaternary)" };
  if (!highlight) {
    return (
      <div className="relative text-text-tertiary" style={{ fontSize: 12.5, lineHeight: 1.6, paddingLeft: 14 }}>
        <span className="absolute" style={dotStyle} />
        {text}
      </div>
    );
  }
  const idx = text.indexOf(highlight);
  const before = text.slice(0, idx);
  const after = text.slice(idx + highlight.length);
  return (
    <div className="relative text-text-tertiary" style={{ fontSize: 12.5, lineHeight: 1.6, paddingLeft: 14 }}>
      <span className="absolute" style={dotStyle} />
      {before}
      <span className="font-semibold" style={{ color: "var(--accent-green-text)" }}>{highlight}</span>
      {after}
    </div>
  );
}

function ExperienceCard({ exp }: { exp: Experience }) {
  const tagBg = exp.tagTheme === "amber" ? "var(--accent-amber-soft)" : "var(--accent-cyan-soft)";
  const tagBorder = exp.tagTheme === "amber" ? "var(--accent-amber-border)" : "var(--accent-cyan-border)";
  const tagColor = exp.tagTheme === "amber" ? "var(--accent-amber-text)" : "var(--accent-cyan-text)";
  const accent = `var(${exp.accentColor})`;

  return (
    <div className="relative" style={{ paddingLeft: 62, marginBottom: 24 }}>
      <div
        className="absolute flex items-center justify-center"
        style={{ left: 0, top: 2, width: 44, height: 44, borderRadius: "50%", background: "var(--bg-surface)", border: `1px solid var(--accent-violet-border)`, zIndex: 2 }}
      >
        <span style={{ fontSize: exp.compact ? 17 : 18, color: accent }}>{exp.icon}</span>
      </div>

      <div
        className="transition-colors duration-200"
        style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)", borderRadius: 14, padding: exp.compact ? "16px 24px 14px" : "20px 24px 18px" }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent-violet-border)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-subtle)"; }}
      >
        <div className="mb-1 flex flex-wrap items-start justify-between gap-3">
          <span className="text-text-primary" style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-.01em" }}>{exp.role}</span>
          <span
            className="font-mono whitespace-nowrap"
            style={{ fontSize: 11, fontWeight: 500, color: "var(--accent-violet-text)", background: "var(--accent-violet-soft)", border: "1px solid var(--accent-violet-border)", padding: "3px 10px", borderRadius: 100 }}
          >
            {exp.dateRange}
          </span>
        </div>

        <div className="mb-3 flex flex-wrap items-center gap-2 text-text-tertiary" style={{ fontSize: 12.5, fontWeight: 500 }}>
          <span>
            <span className="font-semibold text-text-secondary">{exp.company}</span> · {exp.project}
          </span>
          {exp.location && (
            <span className="flex items-center gap-1" style={{ fontSize: 11.5 }}>
              <FiMapPin size={12} />
              {exp.location}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-[5px] pl-[13px]">
          {exp.bullets.map((b, bi) => (
            <Bullet key={bi} text={b.text} highlight={b.highlight} />
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-[6px] pt-3" style={{ borderTop: "1px solid var(--border-subtle)" }}>
          {exp.tags.map((tag) => (
            <span key={tag} style={{ fontSize: 10.5, fontWeight: 500, padding: "3px 9px", borderRadius: 100, letterSpacing: ".02em", background: tagBg, border: `1px solid ${tagBorder}`, color: tagColor }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [fillHeight, setFillHeight] = useState(0);

  useEffect(() => {
    const handler = () => {
      const el = timelineRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - 16;
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
    <section id="experience" className="relative overflow-hidden bg-base" style={{ padding: "88px 48px 96px" }}>
      <SectionGrid />
      <GlowOrb color="violet" style={{ top: -90, left: -70, width: 420, height: 420 }} />
      <GlowOrb color="cyan" style={{ bottom: -90, right: -70, width: 360, height: 360 }} />

      <div className="relative z-10 mx-auto max-w-[980px]">
        <SectionEyebrow>Work experience</SectionEyebrow>
        <SectionHeading lead="Where I've" outline="built impact" className="mb-3" />
        <Reveal delay={140}>
          <p className="mb-[52px] text-text-secondary" style={{ fontSize: 14, lineHeight: 1.7, maxWidth: 480 }}>
            3.5+ years engineering scalable backend systems for enterprise banking and lending platforms.
          </p>
        </Reveal>

        <div ref={timelineRef} className="relative">
          {/* Static background line */}
          <div className="absolute" style={{ left: 21, top: 8, bottom: 8, width: 1.5, background: "var(--border-subtle)", borderRadius: 2 }} />
          {/* Scroll-progress fill */}
          <div
            className="absolute"
            style={{
              left: 21, top: 8, width: 1.5, borderRadius: 2,
              background: "linear-gradient(to bottom, var(--accent-violet), var(--accent-cyan))",
              height: fillHeight,
              transition: "height 0.15s linear",
            }}
          />

          {EXPERIENCES.map((exp, i) => (
            <Reveal key={exp.id} delay={Math.min(i, 3) * 70} direction="right" distance={18}>
              <ExperienceCard exp={exp} />
            </Reveal>
          ))}

          <Reveal delay={0}>
            <div className="flex items-center gap-3" style={{ margin: "8px 0 24px 62px" }}>
              <span className="font-mono whitespace-nowrap text-text-quaternary" style={{ fontSize: 10, fontWeight: 500, letterSpacing: ".14em", textTransform: "uppercase" }}>
                Earlier internships
              </span>
              <div className="flex-1" style={{ height: 1, background: "var(--border-subtle)" }} />
            </div>
          </Reveal>

          {INTERNSHIPS.map((exp, i) => (
            <Reveal key={exp.id} delay={i * 70} direction="right" distance={18}>
              <ExperienceCard exp={exp} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
