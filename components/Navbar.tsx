"use client";

import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "./theme-provider";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const dark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="no-theme-transition relative flex-shrink-0 cursor-pointer rounded-full transition-colors duration-300"
      style={{
        width: 52,
        height: 28,
        border: dark ? "1px solid var(--accent-violet-border)" : "1px solid var(--border-default)",
        background: dark ? "var(--accent-violet-soft)" : "var(--bg-muted)",
        padding: 0,
      }}
    >
      <span
        className="absolute top-[3px] flex items-center justify-center rounded-full transition-all duration-300"
        style={{
          width: 20,
          height: 20,
          transform: dark ? "translateX(25px)" : "translateX(3px)",
          background: dark ? "var(--accent-violet)" : "#FFFFFF",
          boxShadow: dark ? "none" : "0 1px 4px rgba(0,0,0,.15)",
          color: dark ? "#fff" : "var(--accent-violet-text)",
        }}
      >
        {dark ? <FiMoon size={12} /> : <FiSun size={12} />}
      </span>
    </button>
  );
}

export default function Navbar() {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className="fixed left-0 right-0 top-0 z-50 h-16 transition-all duration-300"
      style={{
        background: scrolled
          ? dark
            ? "rgba(2,6,23,.88)"
            : "rgba(248,250,252,.88)"
          : "transparent",
        borderBottom: scrolled ? "1px solid var(--border-subtle)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
      }}
    >
      <nav className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-10">

        {/* Logo */}
        <a
          href="#home"
          className="font-mono text-[15px] font-semibold tracking-tight text-text-primary no-underline transition-colors duration-200"
        >
          <span className="text-violet">&lt;</span>
          RajatDev
          <span className="text-violet">/&gt;</span>
        </a>

        {/* Nav links pill group */}
        <div
          className="hidden items-center gap-[2px] rounded-full p-1 md:flex"
          style={{ background: "var(--bg-muted)", border: "1px solid var(--border-subtle)" }}
        >
          {NAV_LINKS.map(({ id, label }) => {
            const isActive = active === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => { e.preventDefault(); setActive(id); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); }}
                className="rounded-full px-[14px] py-[6px] text-[13px] font-medium tracking-[.01em] no-underline transition-all duration-200"
                style={{
                  color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                  background: isActive ? "var(--accent-violet-soft)" : "transparent",
                  border: isActive ? "1px solid var(--accent-violet-border)" : "1px solid transparent",
                }}
                onMouseEnter={(e) => {
                  if (isActive) return;
                  (e.currentTarget as HTMLElement).style.background = "var(--bg-surface-hover)";
                }}
                onMouseLeave={(e) => {
                  if (isActive) return;
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                {label}
              </a>
            );
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-[10px]">
          <ThemeToggle />

          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); setActive("contact"); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="rounded-full px-[18px] py-[7px] text-[13px] font-semibold tracking-[.02em] text-white no-underline transition-all duration-200"
            style={{ background: "var(--accent-violet)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 6px 20px var(--accent-violet-soft)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Hire me
          </a>
        </div>

      </nav>
    </header>
  );
}
