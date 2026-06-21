"use client";

import { TbSchool, TbTrophy, TbStar, TbBrandGithub } from "react-icons/tb";
import { SectionGrid, GlowOrb, SectionEyebrow, SectionHeading } from "./section-decor";

type AccentKey = "amber" | "violet" | "cyan" | "green";

interface Achievement {
  id: string;
  icon: React.ReactNode;
  badge: string;
  title: string;
  org: string;
  description: string;
  footer: string;
  accent: AccentKey;
}

const ACCENT_VARS: Record<AccentKey, { soft: string; border: string; text: string; solid: string }> = {
  amber:  { soft: "var(--accent-amber-soft)",  border: "var(--accent-amber-border)",  text: "var(--accent-amber-text)",  solid: "var(--accent-amber)" },
  violet: { soft: "var(--accent-violet-soft)", border: "var(--accent-violet-border)", text: "var(--accent-violet-text)", solid: "var(--accent-violet)" },
  cyan:   { soft: "var(--accent-cyan-soft)",   border: "var(--accent-cyan-border)",   text: "var(--accent-cyan-text)",   solid: "var(--accent-cyan)" },
  green:  { soft: "var(--accent-green-soft)",  border: "var(--accent-green-border)",  text: "var(--accent-green-text)",  solid: "var(--accent-green)" },
};

const ACHIEVEMENTS: Achievement[] = [
  {
    id: "gate",
    icon: <TbSchool />,
    badge: "National",
    title: "GATE CSE",
    org: "All India Rank",
    description: "Qualified GATE CSE 2024 with an All India Rank (AIR) of 7691.",
    footer: "AIR 7691 · CS & Engineering",
    accent: "amber",
  },
  {
    id: "pinnacle",
    icon: <TbTrophy />,
    badge: "2× Winner",
    title: "Pinnacle Performance Award",
    org: "Newgen Software",
    description: "Awarded twice for outstanding contributions to the Retail Loan Origination and Real Estate Lending platforms.",
    footer: "Performance · Newgen",
    accent: "violet",
  },
  {
    id: "highfive",
    icon: <TbStar />,
    badge: "Recognition",
    title: "High-Five Award",
    org: "Newgen Software",
    description: "Recognized for exceptional performance and successful delivery of key functionalities on a commercial lending project.",
    footer: "Delivery · Newgen",
    accent: "cyan",
  },
  {
    id: "github",
    icon: <TbBrandGithub />,
    badge: "Power User",
    title: "GitHub Power User",
    org: "Newgen Software",
    description: "Recognized for exemplary use of GitHub — consistent contributions, clean commits, and driving best version-control practices.",
    footer: "Open source · Newgen",
    accent: "green",
  },
];

export default function AchievementsSection() {
  return (
    <section id="achievements" className="relative overflow-hidden bg-base" style={{ padding: "80px 48px 88px" }}>
      <SectionGrid />
      <GlowOrb color="violet" style={{ top: -80, left: -60, width: 400, height: 400 }} />
      <GlowOrb color="cyan" style={{ bottom: -60, right: -60, width: 340, height: 340 }} />

      <div className="relative z-10 mx-auto max-w-[1060px]">
        <SectionEyebrow>Achievements & recognition</SectionEyebrow>
        <SectionHeading lead="Milestones &" outline="awards" className="mb-3" />
        <p className="mb-12 text-text-secondary" style={{ fontSize: 14, lineHeight: 1.7, maxWidth: 440 }}>
          Recognized for technical excellence, consistent high performance, and contributions that go beyond the job description.
        </p>

        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
          {ACHIEVEMENTS.map((a) => {
            const c = ACCENT_VARS[a.accent];
            return (
              <div
                key={a.id}
                className="flex flex-col gap-4 transition-all duration-200"
                style={{ borderRadius: 16, background: "var(--bg-surface)", border: "1px solid var(--border-subtle)", padding: "24px 22px 22px" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-subtle)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-shrink-0 items-center justify-center" style={{ width: 42, height: 42, borderRadius: 11, background: c.soft }}>
                    <span style={{ fontSize: 20, color: c.solid }}>{a.icon}</span>
                  </div>
                  <span
                    style={{ fontSize: 10, fontWeight: 600, padding: "3px 9px", borderRadius: 100, letterSpacing: ".06em", textTransform: "uppercase", whiteSpace: "nowrap", marginTop: 2, background: c.soft, border: `1px solid ${c.border}`, color: c.text }}
                  >
                    {a.badge}
                  </span>
                </div>

                <div className="flex flex-col gap-[6px]">
                  <div className="text-text-primary" style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.25, letterSpacing: "-.01em" }}>{a.title}</div>
                  <div style={{ fontSize: 12, fontWeight: 500, letterSpacing: ".04em", color: c.text }}>{a.org}</div>
                  <p className="text-text-tertiary" style={{ fontSize: 12.5, lineHeight: 1.6, marginTop: 2 }}>{a.description}</p>
                </div>

                <div style={{ height: 1, background: "var(--border-subtle)", margin: "0 -22px" }} />

                <div className="flex items-center gap-[7px]">
                  <span className="flex-shrink-0" style={{ width: 6, height: 6, borderRadius: "50%", background: c.solid }} />
                  <span style={{ fontSize: 11.5, fontWeight: 500, letterSpacing: ".02em", color: "var(--text-secondary)" }}>{a.footer}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
