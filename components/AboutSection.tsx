"use client";

import { FiBriefcase, FiHeart } from "react-icons/fi";
import { TbSchool, TbStack2 } from "react-icons/tb";
import { SectionGrid, GlowOrb, SectionEyebrow, SectionHeading, Reveal } from "./section-decor";

interface StatCard {
  id: string;
  icon: React.ReactNode;
  value: string;
  label: string;
  accent: "violet" | "cyan" | "green" | "pink";
}

const ACCENT_VARS = {
  violet: { soft: "var(--accent-violet-soft)", solid: "var(--accent-violet)", text: "var(--accent-violet-text)" },
  cyan:   { soft: "var(--accent-cyan-soft)",   solid: "var(--accent-cyan)",   text: "var(--accent-cyan-text)" },
  green:  { soft: "var(--accent-green-soft)",  solid: "var(--accent-green)",  text: "var(--accent-green-text)" },
  pink:   { soft: "var(--accent-pink-soft)",   solid: "var(--accent-pink)",   text: "var(--accent-pink-text)" },
};

const STATS: StatCard[] = [
  { id: "experience", icon: <FiBriefcase />, value: "3.5+ Yrs", label: "Professional experience", accent: "violet" },
  { id: "education",  icon: <TbSchool />,     value: "B.Tech",   label: "ECE graduate",             accent: "cyan" },
  { id: "stack",      icon: <TbStack2 />,     value: "Full Stack", label: "Backend-focused",         accent: "green" },
  { id: "dedication", icon: <FiHeart />,      value: "100%",     label: "Dedicated to craft",        accent: "pink" },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-base" style={{ padding: "88px 48px 96px" }}>
      <SectionGrid />
      <GlowOrb color="violet" style={{ top: -90, right: -70, width: 420, height: 420 }} />
      <GlowOrb color="cyan" style={{ bottom: -90, left: -70, width: 360, height: 360 }} />

      <div className="relative z-10 mx-auto max-w-[1060px]">
        <SectionEyebrow center>About me</SectionEyebrow>
        <SectionHeading lead="Passionate about" outline="building solutions" center className="mb-12" />

        <div className="flex flex-col items-start gap-12 lg:flex-row">
          {/* Paragraphs */}
          <Reveal delay={140} direction="right" className="flex flex-[1.3] flex-col gap-5">
            <p className="text-text-secondary" style={{ fontSize: 15, lineHeight: 1.85 }}>
              I&apos;m a <span className="font-semibold text-violet-text">Bachelor of Technology</span> graduate
              from Galgotias College of Engineering with a strong foundation in Electronics and Communication
              Engineering. What started as technical curiosity has evolved into a deep passion for full-stack
              and backend web development.
            </p>
            <p className="text-text-secondary" style={{ fontSize: 15, lineHeight: 1.85 }}>
              My journey spans from mastering data structures and algorithms on platforms like{" "}
              <span className="font-semibold" style={{ color: "var(--accent-orange-text)" }}>GeeksforGeeks</span> and{" "}
              <span className="font-semibold" style={{ color: "var(--accent-orange-text)" }}>LeetCode</span> to
              building production-ready, scalable systems. I specialize in designing robust backend architectures
              with <span className="font-semibold text-violet-text">Java, Spring Boot, and PostgreSQL</span>, paired
              with modern frontend experiences using{" "}
              <span className="font-semibold" style={{ color: "var(--accent-cyan-text)" }}>React and Next.js</span>.
            </p>
          </Reveal>

          {/* Stat cards */}
          <div className="grid w-full flex-1 gap-[14px]" style={{ gridTemplateColumns: "1fr 1fr" }}>
            {STATS.map((stat, i) => {
              const c = ACCENT_VARS[stat.accent];
              return (
                <Reveal key={stat.id} delay={200 + i * 90} direction="left">
                <div
                  className="relative flex flex-col gap-[14px] transition-all duration-200"
                  style={{ borderRadius: 14, background: "var(--bg-surface)", border: "1px solid var(--border-subtle)", padding: "22px 18px" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border-strong)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-subtle)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <span className="absolute" style={{ top: 14, right: 14, width: 7, height: 7, borderRadius: "50%", background: c.solid }} />

                  <div className="flex items-center justify-center" style={{ width: 42, height: 42, borderRadius: 11, background: c.soft }}>
                    <span style={{ fontSize: 19, color: c.solid }}>{stat.icon}</span>
                  </div>

                  <div>
                    <div className="text-text-primary" style={{ fontSize: 21, fontWeight: 800, letterSpacing: "-.02em", lineHeight: 1.2 }}>{stat.value}</div>
                    <div className="text-text-tertiary" style={{ fontSize: 12, fontWeight: 500, marginTop: 2 }}>{stat.label}</div>
                  </div>
                </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
