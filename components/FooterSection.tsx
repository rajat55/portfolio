"use client";

import { FiLinkedin, FiGithub, FiCode, FiMapPin } from "react-icons/fi";
import { SiLeetcode, SiCodechef } from "react-icons/si";
import { SectionGrid, GlowOrb } from "./section-decor";

interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  hoverColor: string;
  hoverBorder: string;
  hoverBg: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rajat-raj-gupta-117a4b169/",
    icon: <FiLinkedin />,
    hoverColor: "#0A66C2",
    hoverBorder: "rgba(10,102,194,.4)",
    hoverBg: "rgba(10,102,194,.08)",
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/rajat55",
    icon: <FiGithub />,
    hoverColor: "var(--text-primary)",
    hoverBorder: "var(--border-strong)",
    hoverBg: "var(--bg-surface-hover)",
  },
  {
    id: "leetcode",
    label: "LeetCode",
    href: "https://leetcode.com/rajatonleetcode/",
    icon: <SiLeetcode />,
    hoverColor: "#FFA116",
    hoverBorder: "rgba(255,161,22,.35)",
    hoverBg: "rgba(255,161,22,.08)",
  },
  {
    id: "gfg",
    label: "GeeksforGeeks",
    href: "https://auth.geeksforgeeks.org/user/rajatrajgupta19/practice",
    icon: <FiCode />,
    hoverColor: "#2DA44E",
    hoverBorder: "rgba(45,164,78,.35)",
    hoverBg: "rgba(45,164,78,.08)",
  },
  {
    id: "codechef",
    label: "CodeChef",
    href: "https://www.codechef.com/users/rajatoncodchef",
    icon: <SiCodechef />,
    hoverColor: "var(--accent-violet)",
    hoverBorder: "var(--accent-violet-border)",
    hoverBg: "var(--accent-violet-soft)",
  },
];

function SocialIcon({ link }: { link: SocialLink }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex items-center justify-center transition-all duration-200"
      style={{ width: 52, height: 52, borderRadius: 14, background: "var(--bg-surface)", border: "1px solid var(--border-subtle)", textDecoration: "none" }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.transform = "translateY(-3px)";
        el.style.borderColor = link.hoverBorder;
        el.style.background = link.hoverBg;
        const icon = el.querySelector("svg") as SVGElement | null;
        if (icon) icon.style.color = link.hoverColor;
        const tip = el.querySelector(".tooltip") as HTMLElement | null;
        if (tip) tip.style.opacity = "1";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.transform = "translateY(0)";
        el.style.borderColor = "var(--border-subtle)";
        el.style.background = "var(--bg-surface)";
        const icon = el.querySelector("svg") as SVGElement | null;
        if (icon) icon.style.color = "var(--text-tertiary)";
        const tip = el.querySelector(".tooltip") as HTMLElement | null;
        if (tip) tip.style.opacity = "0";
      }}
    >
      <span style={{ fontSize: 21, color: "var(--text-tertiary)", transition: "color .2s", display: "flex" }}>
        {link.icon}
      </span>
      <span
        className="tooltip absolute"
        style={{ bottom: -26, left: "50%", transform: "translateX(-50%)", fontSize: 10, fontWeight: 500, color: "var(--text-secondary)", whiteSpace: "nowrap", opacity: 0, transition: "opacity .2s", pointerEvents: "none" }}
      >
        {link.label}
      </span>
    </a>
  );
}

export default function FooterSection() {
  const year = new Date().getFullYear();

  return (
    <div className="relative overflow-hidden bg-base">
      <SectionGrid />
      <GlowOrb color="violet" style={{ bottom: -100, left: "50%", transform: "translateX(-50%)", width: 600, height: 300 }} />

      <section id="contact" className="relative z-10 text-center" style={{ padding: "88px 48px 64px", borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="mb-4 flex items-center justify-center gap-2 font-mono text-violet" style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase" }}>
          <span style={{ display: "inline-block", width: 18, height: 1, background: "var(--accent-violet)" }} />
          Let&apos;s connect
          <span style={{ display: "inline-block", width: 18, height: 1, background: "var(--accent-violet)" }} />
        </div>

        <h2 className="mb-3 font-black leading-[1.1] tracking-tight text-text-primary" style={{ fontSize: "clamp(1.8rem,4vw,2.4rem)" }}>
          Find me{" "}
          <span className="text-transparent" style={{ WebkitTextStroke: "1.5px var(--accent-violet-border)" }}>
            around the web
          </span>
        </h2>

        <p className="mx-auto mb-9 text-text-secondary" style={{ fontSize: 14, lineHeight: 1.7, maxWidth: 420 }}>
          Open to backend engineering roles, freelance projects, and interesting conversations about systems design.
        </p>

        <div className="mb-9 flex flex-wrap items-center justify-center gap-3">
          {SOCIAL_LINKS.map((link) => (
            <SocialIcon key={link.id} link={link} />
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-[10px]">
          <a
            href="mailto:rajatrajgupta19@gmail.com"
            className="inline-flex cursor-pointer items-center justify-center text-white no-underline transition-all duration-150"
            style={{ padding: "11px 26px", borderRadius: 10, fontSize: 13.5, fontWeight: 600, background: "var(--accent-violet)" }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1.5px)"; e.currentTarget.style.boxShadow = "0 10px 30px var(--accent-violet-soft)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            Get in touch
          </a>
          <a
            href="/resume.pdf"
            download
            className="cursor-pointer text-text-secondary no-underline transition-all duration-150"
            style={{ padding: "11px 26px", borderRadius: 10, fontSize: 13.5, fontWeight: 500, background: "transparent", border: "1px solid var(--border-default)" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent-violet-border)"; e.currentTarget.style.color = "var(--accent-violet-text)"; e.currentTarget.style.background = "var(--accent-violet-soft)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-default)"; e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.background = "transparent"; }}
          >
            Download resume
          </a>
        </div>
      </section>

      <footer className="relative z-10" style={{ padding: "32px 48px" }}>
        <div className="mx-auto flex flex-wrap items-center justify-between gap-4" style={{ maxWidth: 1100 }}>
          <div className="font-mono text-text-secondary" style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-.01em" }}>
            <b className="text-violet">&lt;</b>RajatDev<b className="text-violet">/&gt;</b>
          </div>

          <div className="flex flex-wrap items-center gap-[18px]">
            <span className="flex items-center gap-[6px] text-text-quaternary" style={{ fontSize: 12 }}>
              <FiMapPin size={13} className="text-violet" />
              India
            </span>
            <div style={{ width: 1, height: 14, background: "var(--border-default)" }} />
            <span className="text-text-quaternary" style={{ fontSize: 12 }}>© {year} Rajat Raj Gupta</span>
            <div style={{ width: 1, height: 14, background: "var(--border-default)" }} />
            <span className="flex items-center gap-[7px]" style={{ fontSize: 11.5, color: "var(--accent-green-text)", fontWeight: 500 }}>
              <span className="animate-pulse" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent-green)" }} />
              Available for work
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
