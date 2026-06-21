"use client";

import { useState, useEffect, useCallback, useRef } from "react";

type Token = { t: string; c: string };
type Snippet = { lang: string; accentVar: string; lines: Token[][] };

/* Token colors stay as fixed hex (syntax-highlight colors are intentionally
   theme-agnostic — they read fine on both the light and dark terminal card) */
const SNIPPETS: Snippet[] = [
  {
    lang: "Spring Boot",
    accentVar: "--accent-orange",
    lines: [
      [{ t: "@SpringBootApplication", c: "#8B5CF6" }],
      [{ t: "public class ", c: "#94A3B8" }, { t: "Application", c: "#059669" }, { t: " {", c: "#64748B" }],
      [{ t: "  public static void ", c: "#94A3B8" }, { t: "main", c: "#2563EB" }, { t: "(String[] args) {", c: "#64748B" }],
      [{ t: "    SpringApplication", c: "#059669" }, { t: ".run(", c: "#64748B" }, { t: "Application", c: "#059669" }, { t: ".class, args);", c: "#64748B" }],
      [{ t: "  }", c: "#64748B" }],
      [{ t: "}", c: "#64748B" }],
    ],
  },
  {
    lang: "REST Controller",
    accentVar: "--accent-cyan",
    lines: [
      [{ t: "@RestController", c: "#8B5CF6" }],
      [{ t: "@RequestMapping", c: "#8B5CF6" }, { t: '("/api/v1")', c: "#EA580C" }],
      [{ t: "public class ", c: "#94A3B8" }, { t: "UserController", c: "#059669" }, { t: " {", c: "#64748B" }],
      [{ t: "  @GetMapping", c: "#8B5CF6" }, { t: '("/users")', c: "#EA580C" }],
      [{ t: "  public ", c: "#94A3B8" }, { t: "List", c: "#059669" }, { t: "<User> ", c: "#94A3B8" }, { t: "getAll", c: "#2563EB" }, { t: "() {", c: "#64748B" }],
      [{ t: "    return ", c: "#94A3B8" }, { t: "userService", c: "#DB2777" }, { t: ".findAll();", c: "#64748B" }],
      [{ t: "  }", c: "#64748B" }],
      [{ t: "}", c: "#64748B" }],
    ],
  },
  {
    lang: "Kafka Producer",
    accentVar: "--accent-green",
    lines: [
      [{ t: "@Service", c: "#8B5CF6" }],
      [{ t: "public class ", c: "#94A3B8" }, { t: "EventProducer", c: "#059669" }, { t: " {", c: "#64748B" }],
      [{ t: "  @Autowired", c: "#8B5CF6" }],
      [{ t: "  private ", c: "#94A3B8" }, { t: "KafkaTemplate", c: "#059669" }, { t: "<String, Event>", c: "#94A3B8" }],
      [{ t: "    ", c: "#94A3B8" }, { t: "kafka", c: "#DB2777" }, { t: ";", c: "#64748B" }],
      [{ t: "  public void ", c: "#94A3B8" }, { t: "publish", c: "#2563EB" }, { t: "(Event e) {", c: "#64748B" }],
      [{ t: "    kafka", c: "#DB2777" }, { t: '.send("events", e);', c: "#64748B" }],
      [{ t: "  }", c: "#64748B" }],
      [{ t: "}", c: "#64748B" }],
    ],
  },
  {
    lang: "Docker Compose",
    accentVar: "--accent-cyan",
    lines: [
      [{ t: "version", c: "#2563EB" }, { t: ': "3.9"', c: "#059669" }],
      [{ t: "services", c: "#2563EB" }, { t: ":", c: "#64748B" }],
      [{ t: "  app", c: "#DB2777" }, { t: ":", c: "#64748B" }],
      [{ t: "    build", c: "#2563EB" }, { t: ": .", c: "#059669" }],
      [{ t: "    ports", c: "#2563EB" }, { t: ': ["8080:8080"]', c: "#EA580C" }],
      [{ t: "    env_file", c: "#2563EB" }, { t: ': [".env"]', c: "#EA580C" }],
      [{ t: "  db", c: "#DB2777" }, { t: ":", c: "#64748B" }],
      [{ t: "    image", c: "#2563EB" }, { t: ": postgres:16", c: "#059669" }],
    ],
  },
];

const TAGS = ["Optimized APIs", "Cloud-ready", "Microservices", "Event-driven", "Kafka"];
const STATS: [string, string][] = [["3.5+", "Years exp"], ["20+", "APIs shipped"], ["99.9%", "Uptime SLA"]];

export default function HeroSection() {
  const [cur, setCur] = useState(0);
  const [dispLines, setDispLines] = useState(0);
  const [exitDir, setExitDir] = useState<"l" | "r" | null>(null);
  const [cursorOn, setCursorOn] = useState(true);
  const busy = useRef(false);

  const go = useCallback(
    (idx: number) => {
      if (busy.current || idx === cur) return;
      busy.current = true;
      setExitDir(idx > cur ? "l" : "r");
      setTimeout(() => {
        setCur(idx);
        setDispLines(0);
        setExitDir(null);
        busy.current = false;
      }, 250);
    },
    [cur]
  );

  const next = useCallback(() => go((cur + 1) % SNIPPETS.length), [cur, go]);
  const prev = useCallback(() => go((cur - 1 + SNIPPETS.length) % SNIPPETS.length), [cur, go]);

  useEffect(() => {
    setDispLines(0);
    let n = 0;
    const t = setInterval(() => {
      n++;
      setDispLines(n);
      if (n >= SNIPPETS[cur].lines.length) clearInterval(t);
    }, 70);
    return () => clearInterval(t);
  }, [cur]);

  useEffect(() => {
    const t = setInterval(next, 4200);
    return () => clearInterval(t);
  }, [next]);

  useEffect(() => {
    const t = setInterval(() => setCursorOn((v) => !v), 500);
    return () => clearInterval(t);
  }, []);

  const s = SNIPPETS[cur];
  const accent = `var(${s.accentVar})`;
  const accentSoft = `var(${s.accentVar}-soft)`;

  const slideStyle: React.CSSProperties = {
    opacity: exitDir ? 0 : 1,
    transform: exitDir ? `translateX(${exitDir === "l" ? "-14px" : "14px"})` : "translateX(0)",
    transition: "opacity 0.25s ease, transform 0.25s ease",
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-base"
    >
      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-line) 1px,transparent 1px),linear-gradient(90deg,var(--grid-line) 1px,transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      {/* Glow orbs */}
      <div
        className="pointer-events-none absolute"
        style={{ top: -160, left: -100, width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle, var(--glow-violet) 0%, transparent 65%)" }}
      />
      <div
        className="pointer-events-none absolute"
        style={{ bottom: -100, right: -80, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, var(--glow-cyan) 0%, transparent 65%)" }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1060px] flex-col items-center gap-14 px-10 py-16 lg:flex-row">

        {/* LEFT */}
        <div className="flex flex-1 flex-col gap-[22px]">

          <div
            className="inline-flex w-fit items-center gap-2 rounded-full"
            style={{ padding: "5px 14px 5px 8px", border: "1px solid var(--accent-green-border)", background: "var(--accent-green-soft)" }}
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full" style={{ background: "var(--accent-green-soft)" }}>
              <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: "var(--accent-green)" }} />
            </span>
            <span style={{ fontSize: 11.5, fontWeight: 500, letterSpacing: ".08em", color: "var(--accent-green-text)" }}>
              Open to opportunities
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-violet" style={{ fontSize: 10.5, fontWeight: 500, letterSpacing: ".22em", textTransform: "uppercase" }}>
            <span style={{ display: "inline-block", width: 20, height: 1, background: "var(--accent-violet)", opacity: 0.6 }} />
            Backend Engineer
          </div>

          <div style={{ lineHeight: ".98", letterSpacing: "-.04em" }}>
            <div className="text-text-primary" style={{ fontSize: "clamp(3rem,5.5vw,4.8rem)", fontWeight: 900 }}>
              Rajat
            </div>
            <div
              className="text-transparent"
              style={{ fontSize: "clamp(3rem,5.5vw,4.8rem)", fontWeight: 900, WebkitTextStroke: "1.5px var(--accent-violet-border)" }}
            >
              Gupta
            </div>
          </div>

          <div style={{ width: 32, height: 1.5, background: "linear-gradient(90deg, var(--accent-violet), transparent)", borderRadius: 2 }} />

          <p className="text-text-secondary" style={{ fontSize: 14.5, lineHeight: 1.75, maxWidth: 380 }}>
            Building <span className="font-medium text-text-primary">scalable, high-throughput systems</span> with
            Java and Spring Boot — from optimized REST APIs to event-driven microservices on cloud-native infrastructure.
          </p>

          <div className="flex">
            {STATS.map(([val, lbl], i) => (
              <div
                key={lbl}
                className="flex flex-col gap-[3px]"
                style={{ padding: i === 0 ? "0 24px 0 0" : "0 24px", borderLeft: i > 0 ? "1px solid var(--border-subtle)" : "none" }}
              >
                <span className="font-mono text-text-primary" style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-.02em" }}>{val}</span>
                <span className="text-text-tertiary" style={{ fontSize: 11, letterSpacing: ".04em" }}>{lbl}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-[10px] pt-1">
            <a
              href="#projects"
              className="cursor-pointer rounded-[10px] text-white no-underline"
              style={{ padding: "11px 26px", fontSize: 13.5, fontWeight: 600, letterSpacing: ".01em", background: "var(--accent-violet)", transition: "transform .15s, box-shadow .2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1.5px)"; e.currentTarget.style.boxShadow = "0 10px 30px var(--accent-violet-soft)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              View Projects
            </a>
            <a
              href="/resume.pdf"
              download
              className="cursor-pointer rounded-[10px] text-text-secondary no-underline"
              style={{ padding: "11px 26px", fontSize: 13.5, fontWeight: 500, letterSpacing: ".01em", background: "transparent", border: "1px solid var(--border-default)", transition: "all .15s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent-violet-border)"; e.currentTarget.style.color = "var(--accent-violet-text)"; e.currentTarget.style.background = "var(--accent-violet-soft)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-default)"; e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.background = "transparent"; }}
            >
              Download Resume
            </a>
          </div>
        </div>

        {/* RIGHT — terminal carousel */}
        <div className="flex w-full flex-1 max-w-[500px] flex-col gap-[10px]">
          <div
            className="relative overflow-hidden rounded-2xl"
            style={{ background: "var(--bg-surface)", border: "1px solid var(--border-default)", boxShadow: `0 0 0 1px var(--accent-violet-soft), 0 24px 60px var(--shadow-color)` }}
          >
            <div className="flex items-center justify-between px-4" style={{ height: 42, background: "var(--bg-muted)", borderBottom: "1px solid var(--border-subtle)" }}>
              <div className="flex items-center gap-[6px]">
                {["#FF5F56", "#FFBD2E", "#27C93F"].map((bg) => (
                  <span key={bg} style={{ width: 11, height: 11, borderRadius: "50%", background: bg, display: "block" }} />
                ))}
              </div>

              <div className="flex items-center gap-[7px] font-mono" style={{ fontSize: 11, fontWeight: 500, letterSpacing: ".05em" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: accent, display: "block", transition: "background .3s" }} />
                <span style={{ color: accent, transition: "color .3s" }}>{s.lang}</span>
              </div>

              <div className="flex gap-px">
                {[prev, next].map((fn, i) => (
                  <button
                    key={i}
                    onClick={fn}
                    aria-label={i === 0 ? "Previous snippet" : "Next snippet"}
                    className="flex items-center justify-center rounded-md text-text-quaternary"
                    style={{ width: 26, height: 26, background: "transparent", border: "none", fontSize: 18, lineHeight: 1, cursor: "pointer", fontWeight: 300, transition: "all .15s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-surface-hover)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-quaternary)"; }}
                  >
                    {i === 0 ? "‹" : "›"}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ padding: "20px 0 4px", minHeight: 230, overflow: "hidden" }}>
              <div style={{ padding: "0 20px", ...slideStyle }}>
                <table style={{ borderCollapse: "separate", borderSpacing: "0 0" }}>
                  <tbody>
                    {s.lines.slice(0, dispLines).map((row, li) => (
                      <tr key={li}>
                        <td className="select-none text-right font-mono text-text-quaternary" style={{ fontSize: 11.5, paddingRight: 16, width: 28, verticalAlign: "top", paddingTop: 1, paddingBottom: 1 }}>
                          {li + 1}
                        </td>
                        <td className="font-mono" style={{ fontSize: 12.5, lineHeight: 1.75, letterSpacing: ".01em", whiteSpace: "nowrap" }}>
                          {row.map((tok, ti) => (
                            <span key={ti} style={{ color: tok.c }}>{tok.t}</span>
                          ))}
                          {li === dispLines - 1 && (
                            <span
                              className="inline-block align-middle"
                              style={{ width: 1.5, height: 14, background: "var(--accent-violet)", marginLeft: 1, borderRadius: 1, opacity: cursorOn ? 1 : 0, transition: "opacity .1s" }}
                            />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex items-center justify-center gap-[5px]" style={{ padding: "10px 0 12px", borderTop: "1px solid var(--border-subtle)" }}>
              {SNIPPETS.map((snap, i) => (
                <button
                  key={i}
                  aria-label={`Show ${snap.lang} snippet`}
                  onClick={() => go(i)}
                  style={{
                    height: 5,
                    width: i === cur ? 20 : 5,
                    borderRadius: 100,
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    background: i === cur ? accent : "var(--border-default)",
                    opacity: i === cur ? 1 : 0.6,
                    transition: "all .35s cubic-bezier(.4,0,.2,1)",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-[6px]">
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="font-mono"
                style={{ fontSize: 10.5, fontWeight: 500, padding: "4px 11px", borderRadius: 100, letterSpacing: ".06em", color: "var(--accent-violet-text)", background: "var(--accent-violet-soft)", border: "1px solid var(--accent-violet-border)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
