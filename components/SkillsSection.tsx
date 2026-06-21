"use client";

import { useState } from "react";
import {
  FiCode, FiServer, FiDatabase, FiCloud, FiLayout,
} from "react-icons/fi";
import { TbBrain } from "react-icons/tb";
import { SectionGrid, GlowOrb, SectionEyebrow, SectionHeading, Reveal } from "./section-decor";

type Category = "all" | "languages" | "backend" | "databases" | "cloud" | "ai" | "frontend";
type AccentKey = "orange" | "violet" | "cyan" | "blue" | "green" | "pink";

interface SkillCard {
  id: Category;
  title: string;
  icon: React.ReactNode;
  accent: AccentKey;
  skills: string[];
}

/* Tailwind config doesn't define a `blue` token (cyan covers that hue), so
   Cloud & DevOps reuses cyan's variables but is visually distinct via icon + label */
const ACCENT_VARS: Record<AccentKey, { soft: string; border: string; text: string; solid: string }> = {
  orange: { soft: "var(--accent-orange-soft)", border: "var(--accent-orange-border)", text: "var(--accent-orange-text)", solid: "var(--accent-orange)" },
  violet: { soft: "var(--accent-violet-soft)", border: "var(--accent-violet-border)", text: "var(--accent-violet-text)", solid: "var(--accent-violet)" },
  cyan:   { soft: "var(--accent-cyan-soft)",   border: "var(--accent-cyan-border)",   text: "var(--accent-cyan-text)",   solid: "var(--accent-cyan)" },
  blue:   { soft: "var(--accent-cyan-soft)",   border: "var(--accent-cyan-border)",   text: "var(--accent-cyan-text)",   solid: "var(--accent-cyan)" },
  green:  { soft: "var(--accent-green-soft)",  border: "var(--accent-green-border)",  text: "var(--accent-green-text)",  solid: "var(--accent-green)" },
  pink:   { soft: "var(--accent-pink-soft)",   border: "var(--accent-pink-border)",   text: "var(--accent-pink-text)",   solid: "var(--accent-pink)" },
};

const SKILL_CARDS: SkillCard[] = [
  {
    id: "languages",
    title: "Languages",
    icon: <FiCode />,
    accent: "orange",
    skills: ["Java 8+", "SQL", "JavaScript", "PL/pgSQL"],
  },
  {
    id: "backend",
    title: "Backend",
    icon: <FiServer />,
    accent: "violet",
    skills: ["Spring Boot", "Spring MVC", "Spring Security", "REST APIs", "Microservices", "JWT", "Apache Kafka"],
  },
  {
    id: "databases",
    title: "Databases",
    icon: <FiDatabase />,
    accent: "cyan",
    skills: ["PostgreSQL", "Redis", "Query Optimization", "DB Indexing"],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    icon: <FiCloud />,
    accent: "blue",
    skills: ["Docker", "AWS EC2", "AWS S3", "Git", "Maven", "Jenkins", "CI/CD"],
  },
  {
    id: "ai",
    title: "AI & RAG",
    icon: <TbBrain />,
    accent: "green",
    skills: ["RAG Pipelines", "LangChain4j", "Pgvector", "Pinecone", "Weaviate", "Embeddings", "Semantic Search", "OpenAI API"],
  },
  {
    id: "frontend",
    title: "Frontend & Tools",
    icon: <FiLayout />,
    accent: "pink",
    skills: ["React", "JSON", "XML", "JIRA", "Agile/Scrum"],
  },
];

const FILTERS: { id: Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "languages", label: "Languages" },
  { id: "backend", label: "Backend" },
  { id: "databases", label: "Databases" },
  { id: "cloud", label: "Cloud & DevOps" },
  { id: "ai", label: "AI & RAG" },
  { id: "frontend", label: "Frontend & Tools" },
];

export default function SkillsSection() {
  const [active, setActive] = useState<Category>("all");
  const visible = SKILL_CARDS.filter((c) => active === "all" || c.id === active);

  return (
    <section id="skills" className="relative overflow-hidden bg-base" style={{ padding: "80px 48px 88px" }}>
      <SectionGrid />
      <GlowOrb color="violet" style={{ top: -100, right: -80, width: 420, height: 420 }} />

      <div className="relative z-10 mx-auto max-w-[1060px]">
        <SectionEyebrow>Technical skills</SectionEyebrow>
        <SectionHeading lead="What I" outline="work with" className="mb-3" />
        <Reveal delay={140}>
          <p className="mb-10 text-text-secondary" style={{ fontSize: 14, lineHeight: 1.7, maxWidth: 460 }}>
            A full-stack of backend expertise — from core Java to event-driven systems, cloud infra, and AI-native RAG pipelines.
          </p>
        </Reveal>

        {/* Filter tabs */}
        <Reveal delay={200}>
          <div className="mb-9 flex flex-wrap gap-[6px]">
            {FILTERS.map(({ id, label }) => {
              const isOn = active === id;
              return (
                <button
                  key={id}
                  onClick={() => setActive(id)}
                  className="cursor-pointer rounded-full transition-all duration-150"
                  style={{
                    fontSize: 12, fontWeight: 500, padding: "6px 14px", letterSpacing: ".02em",
                    border: isOn ? "1px solid var(--accent-violet-border)" : "1px solid var(--border-default)",
                    background: isOn ? "var(--accent-violet-soft)" : "transparent",
                    color: isOn ? "var(--accent-violet-text)" : "var(--text-secondary)",
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Cards grid */}
        <div className="grid items-stretch gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))" }}>
          {visible.map((card, i) => {
            const a = ACCENT_VARS[card.accent];
            return (
              <Reveal key={card.id} delay={i * 70} threshold={0.05} className="h-full">
              <div
                className="flex h-full flex-col rounded-[14px] transition-all duration-200"
                style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)", padding: "20px 20px 18px" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = a.border; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-subtle)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div className="mb-4 flex items-center gap-[10px]">
                  <div className="flex flex-shrink-0 items-center justify-center" style={{ width: 34, height: 34, borderRadius: 9, background: a.soft }}>
                    <span style={{ fontSize: 17, color: a.solid }}>{card.icon}</span>
                  </div>
                  <span className="font-mono text-text-secondary" style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase" }}>
                    {card.title}
                  </span>
                </div>

                <div className="mt-auto flex flex-wrap gap-[6px]">
                  {card.skills.map((skill) => (
                    <span
                      key={skill}
                      style={{ fontSize: 11.5, fontWeight: 500, padding: "4px 10px", borderRadius: 100, letterSpacing: ".02em", background: a.soft, border: `1px solid ${a.border}`, color: a.text }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}