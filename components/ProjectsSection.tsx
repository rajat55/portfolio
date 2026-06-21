"use client";

import { TbBrain, TbUsers, TbShoppingCart, TbPencil, TbBrandGithub, TbPlayerPlay } from "react-icons/tb";
import { SectionGrid, GlowOrb, SectionEyebrow, SectionHeading } from "./section-decor";

interface ProjectLink {
  label: string;
  href: string;
  icon: React.ReactNode;
  variant: "default" | "live";
}

type AccentKey = "violet" | "cyan" | "green" | "orange";

interface Project {
  id: string;
  title: string;
  year: string;
  icon: React.ReactNode;
  accent: AccentKey;
  description: string;
  stack: string[];
  links: ProjectLink[];
  featured?: boolean;
}

const ACCENT_VARS: Record<AccentKey, { soft: string; border: string; text: string; solid: string }> = {
  violet: { soft: "var(--accent-violet-soft)", border: "var(--accent-violet-border)", text: "var(--accent-violet-text)", solid: "var(--accent-violet)" },
  cyan:   { soft: "var(--accent-cyan-soft)",   border: "var(--accent-cyan-border)",   text: "var(--accent-cyan-text)",   solid: "var(--accent-cyan)" },
  green:  { soft: "var(--accent-green-soft)",  border: "var(--accent-green-border)",  text: "var(--accent-green-text)",  solid: "var(--accent-green)" },
  orange: { soft: "var(--accent-orange-soft)", border: "var(--accent-orange-border)", text: "var(--accent-orange-text)", solid: "var(--accent-orange)" },
};

const PROJECTS: Project[] = [
  {
    id: "rag-engine",
    title: "RAG Knowledge Engine",
    year: "2025",
    icon: <TbBrain />,
    accent: "green",
    description:
      "A retrieval-augmented generation system for answering data-related queries with contextual accuracy. Documents are chunked and embedded into a vector store; incoming queries are semantically matched against this index, and relevant context is injected into local LLMs (Gemma, Qwen via Ollama) to generate grounded, hallucination-resistant answers.",
    stack: ["Ollama", "Gemma", "Qwen", "Vector DB", "Embeddings"],
    featured: true,
    links: [
      // TODO: replace with real repo / live demo links once shared
      { label: "Code", href: "#", icon: <TbBrandGithub />, variant: "default" },
      { label: "Live demo", href: "#", icon: <TbPlayerPlay />, variant: "live" },
    ],
  },
  {
    id: "raj-connect",
    title: "Raj-Connect",
    year: "2022",
    icon: <TbUsers />,
    accent: "violet",
    description:
      "A full-stack social media platform with user registration/authentication, profile customization, a news feed with posts and updates, social interactions like likes and comments, photo/video sharing, and user discovery.",
    stack: ["Express.js", "React.js", "MongoDB"],
    links: [
      { label: "Client", href: "https://github.com/rajat55/Raj_Connect_FrontEnd_ReactJs", icon: <TbBrandGithub />, variant: "default" },
      { label: "Server", href: "https://github.com/rajat55/Raj_Connect_Backend_MERN", icon: <TbBrandGithub />, variant: "default" },
      { label: "Live", href: "https://rajatplusmern2.netlify.app/", icon: <TbPlayerPlay />, variant: "live" },
    ],
  },
  {
    id: "raj-shop",
    title: "Raj-Shop",
    year: "2022",
    icon: <TbShoppingCart />,
    accent: "cyan",
    description:
      "An e-commerce app with user authentication, product browsing/searching, shopping cart management, personalized profiles, order tracking, customer reviews and ratings, and inventory management.",
    stack: ["React.js", "Spring Boot", "Hibernate"],
    links: [
      { label: "Code", href: "https://github.com/rajat55/Raj_Shop_FrontEnd_Springboot", icon: <TbBrandGithub />, variant: "default" },
      { label: "Live", href: "https://rajatplusspring2.netlify.app/", icon: <TbPlayerPlay />, variant: "live" },
    ],
  },
  {
    id: "raj-vlog",
    title: "Raj-Vlog",
    year: "2022",
    icon: <TbPencil />,
    accent: "orange",
    description:
      "A blogging platform with user registration/authentication, customizable user profiles, and full blog post creation and management — letting users write and share their stories.",
    stack: ["Express.js", "React.js", "MongoDB"],
    links: [
      // TODO: add repo link
      { label: "Code", href: "#", icon: <TbBrandGithub />, variant: "default" },
    ],
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative overflow-hidden bg-base" style={{ padding: "88px 48px 96px" }}>
      <SectionGrid />
      <GlowOrb color="violet" style={{ top: -90, right: -70, width: 420, height: 420 }} />
      <GlowOrb color="cyan" style={{ bottom: -90, left: -70, width: 360, height: 360 }} />

      <div className="relative z-10 mx-auto max-w-[1060px]">
        <SectionEyebrow>Personal projects</SectionEyebrow>
        <SectionHeading lead="Things I've" outline="built solo" className="mb-3" />
        <p className="mb-12 text-text-secondary" style={{ fontSize: 14, lineHeight: 1.7, maxWidth: 480 }}>
          From full-stack social platforms to AI-native retrieval systems — projects built to explore, learn, and ship end-to-end.
        </p>

        <div className="grid gap-[18px]" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
          {PROJECTS.map((project) => {
            const c = ACCENT_VARS[project.accent];
            return (
              <div
                key={project.id}
                className="relative flex flex-col gap-4 overflow-hidden transition-all duration-200"
                style={{
                  borderRadius: 16,
                  background: "var(--bg-surface)",
                  border: project.featured ? `1px solid var(--accent-green-border)` : "1px solid var(--border-subtle)",
                  padding: "24px 22px 22px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = project.featured ? "var(--accent-green)" : "var(--accent-violet-border)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = project.featured ? "var(--accent-green-border)" : "var(--border-subtle)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {project.featured && (
                  <span
                    className="absolute right-0 top-0"
                    style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", padding: "5px 14px 5px 12px", background: "var(--accent-green-soft)", color: "var(--accent-green-text)", borderBottomLeftRadius: 10 }}
                  >
                    Latest
                  </span>
                )}

                <div className="flex items-start justify-between gap-[10px]">
                  <div className="flex flex-shrink-0 items-center justify-center" style={{ width: 42, height: 42, borderRadius: 11, background: c.soft }}>
                    <span style={{ fontSize: 19, color: c.solid }}>{project.icon}</span>
                  </div>
                  <span
                    className="font-mono"
                    style={{ fontSize: 10.5, fontWeight: 500, color: "var(--text-quaternary)", padding: "3px 9px", borderRadius: 100, border: "1px solid var(--border-default)" }}
                  >
                    {project.year}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-text-primary" style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-.01em" }}>
                  {project.featured && (
                    <span className="flex-shrink-0" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent-green)" }} />
                  )}
                  {project.title}
                </div>

                <p className="text-text-tertiary" style={{ fontSize: 12.5, lineHeight: 1.65 }}>{project.description}</p>

                <div className="flex flex-wrap gap-[6px]">
                  {project.stack.map((tech) => (
                    <span key={tech} style={{ fontSize: 10.5, fontWeight: 500, padding: "4px 10px", borderRadius: 100, letterSpacing: ".02em", background: c.soft, border: `1px solid ${c.border}`, color: c.text }}>
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex gap-2 pt-[14px]" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                  {project.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-1 items-center justify-center gap-[6px] no-underline transition-all duration-150"
                      style={{
                        fontSize: 11.5, fontWeight: 500, padding: "7px 12px", borderRadius: 9,
                        border: link.variant === "live" ? "1px solid var(--accent-green-border)" : "1px solid var(--border-default)",
                        background: link.variant === "live" ? "var(--accent-green-soft)" : "transparent",
                        color: link.variant === "live" ? "var(--accent-green-text)" : "var(--text-secondary)",
                      }}
                      onMouseEnter={(e) => {
                        if (link.variant === "live") {
                          e.currentTarget.style.background = "var(--accent-green-border)";
                        } else {
                          e.currentTarget.style.borderColor = "var(--accent-violet-border)";
                          e.currentTarget.style.color = "var(--accent-violet-text)";
                          e.currentTarget.style.background = "var(--accent-violet-soft)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (link.variant === "live") {
                          e.currentTarget.style.background = "var(--accent-green-soft)";
                        } else {
                          e.currentTarget.style.borderColor = "var(--border-default)";
                          e.currentTarget.style.color = "var(--text-secondary)";
                          e.currentTarget.style.background = "transparent";
                        }
                      }}
                    >
                      <span style={{ fontSize: 14 }}>{link.icon}</span>
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
