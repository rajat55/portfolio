"use client";

import { FiCheck } from "react-icons/fi";
import { SectionGrid, GlowOrb, SectionEyebrow, SectionHeading, Reveal } from "./section-decor";

/* ────────────────────────────────────────────────────────────────────
   Combined LeetCode + GeeksforGeeks totals.
   Edit here if your counts change or you add another platform.
   ──────────────────────────────────────────────────────────────────── */

const DIFFICULTY = [
  { label: "Easy",   solved: 250, color: "var(--accent-green)", textColor: "var(--accent-green-text)", soft: "var(--accent-green-soft)", border: "var(--accent-green-border)" },
  { label: "Medium", solved: 414, color: "var(--accent-amber)", textColor: "var(--accent-amber-text)", soft: "var(--accent-amber-soft)", border: "var(--accent-amber-border)" },
  { label: "Hard",   solved: 45,  color: "var(--accent-red)",   textColor: "var(--accent-red-text)",   soft: "var(--accent-red-soft)",   border: "var(--accent-red-border)" },
];

const TOTAL_SOLVED = DIFFICULTY.reduce((sum, d) => sum + d.solved, 0);

interface Platform {
  id: string;
  shortLabel: string; // 2-3 char badge
  name: string;
  solved: number;
  color: string;
  soft: string;
}

const PLATFORMS: Platform[] = [
  { id: "leetcode", shortLabel: "LC",  name: "LeetCode",      solved: 253, color: "var(--accent-amber)", soft: "var(--accent-amber-soft)" },
  { id: "gfg",      shortLabel: "GfG", name: "GeeksforGeeks", solved: 456, color: "var(--accent-green)", soft: "var(--accent-green-soft)" },
];

interface TagGroup {
  label: string;
  theme: "violet" | "cyan";
  tags: string[];
}

const TAG_GROUPS: TagGroup[] = [
  {
    label: "Data structures",
    theme: "violet",
    tags: ["Arrays & Strings", "Linked List", "Stack", "Queue", "Trees & Graphs", "Trie", "BST", "Heap"],
  },
  {
    label: "Algorithms & concepts",
    theme: "violet",
    tags: ["Recursion", "Dynamic Programming", "Backtracking", "Greedy", "Binary Search", "SQL"],
  },
  {
    label: "System design",
    theme: "cyan",
    tags: ["LLD", "HLD", "Scalability"],
  },
];

/* ──────────────────────────────────────────────────────────────────── */

const RADIUS = 86;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function DsaStatsSection() {
  // Build proportional arc segments for the ring based on each difficulty's
  // share of TOTAL_SOLVED.
  const solvedSum = TOTAL_SOLVED || 1;
  let cumulativeOffset = 0;
  const arcs = DIFFICULTY.map((d) => {
    const fraction = d.solved / solvedSum;
    const arcLength = fraction * CIRCUMFERENCE;
    const rotation = (cumulativeOffset / CIRCUMFERENCE) * 360;
    cumulativeOffset += arcLength;
    return { ...d, arcLength, rotation };
  });

  const maxDifficultySolved = Math.max(...DIFFICULTY.map((d) => d.solved));

  return (
    <section id="dsa-stats" className="relative overflow-hidden bg-base" style={{ padding: "88px 48px 96px" }}>
      <SectionGrid />
      <GlowOrb color="violet" style={{ top: -90, right: -70, width: 420, height: 420 }} />

      <div className="relative z-10 mx-auto max-w-[1060px]">
        <SectionEyebrow>Problem solving</SectionEyebrow>
        <SectionHeading lead="DSA &" outline="system design practice" className="mb-3" />
        <Reveal delay={140}>
          <p className="mb-11 text-text-secondary" style={{ fontSize: 14, lineHeight: 1.7, maxWidth: 520 }}>
            Consistent practice across multiple platforms — building intuition for data structures, algorithms,
            and the trade-offs behind scalable system design.
          </p>
        </Reveal>

        <div className="grid gap-6" style={{ gridTemplateColumns: "1.1fr 1fr" }}>

          {/* Ring + difficulty breakdown + platform mini-cards */}
          <Reveal delay={200} direction="right">
            <div
              className="flex h-full flex-col"
              style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)", borderRadius: 18, padding: 28 }}
            >
              <div className="flex items-center gap-7">
                <div className="relative flex-shrink-0" style={{ width: 170, height: 170 }}>
                  <svg viewBox="0 0 200 200" style={{ transform: "rotate(-90deg)" }}>
                    <circle cx="100" cy="100" r={RADIUS} fill="none" stroke="var(--border-subtle)" strokeWidth="14" />
                    {arcs.map((arc) => (
                      <circle
                        key={arc.label}
                        cx="100" cy="100" r={RADIUS} fill="none"
                        stroke={arc.color}
                        strokeWidth="14"
                        strokeLinecap="round"
                        strokeDasharray={`${arc.arcLength} ${CIRCUMFERENCE}`}
                        strokeDashoffset="0"
                        transform={`rotate(${arc.rotation} 100 100)`}
                        style={{ transition: "stroke-dasharray 0.8s cubic-bezier(.16,1,.3,1)" }}
                      />
                    ))}
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="font-mono text-text-primary" style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-.02em", lineHeight: 1 }}>
                      {TOTAL_SOLVED}
                    </div>
                    <div className="mt-[5px] flex items-center gap-[5px]" style={{ fontSize: 12, fontWeight: 600, color: "var(--accent-green-text)" }}>
                      <FiCheck size={13} />
                      Solved
                    </div>
                    <div className="mt-[3px] text-center text-text-quaternary" style={{ fontSize: 10, lineHeight: 1.4, maxWidth: 110 }}>
                      across LeetCode &amp; GfG
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-2">
                  {DIFFICULTY.map((d) => {
                    // Bar reflects this difficulty's volume relative to the
                    // largest bucket (Medium) — not a fake "out of" total.
                    const pct = maxDifficultySolved > 0 ? (d.solved / maxDifficultySolved) * 100 : 0;
                    return (
                      <div
                        key={d.label}
                        className="rounded-[11px]"
                        style={{ padding: "10px 14px", border: `1px solid ${d.border}`, background: d.soft }}
                      >
                        <div className="flex items-baseline justify-between">
                          <span style={{ fontSize: 12.5, fontWeight: 600, color: d.textColor }}>{d.label}</span>
                          <span className="font-mono" style={{ fontSize: 13, fontWeight: 700, color: d.color }}>
                            {d.solved}
                          </span>
                        </div>
                        <div className="mt-[7px] h-[3px] overflow-hidden rounded" style={{ background: "var(--border-subtle)" }}>
                          <div
                            className="h-full rounded transition-all duration-700"
                            style={{ width: `${Math.min(pct, 100)}%`, background: d.color }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="my-5" style={{ height: 1, background: "var(--border-subtle)" }} />

              <div className="mb-3 font-mono text-text-tertiary" style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase" }}>
                By platform
              </div>
              <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 1fr" }}>
                {PLATFORMS.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-[10px] rounded-xl"
                    style={{ padding: "12px 14px", background: "var(--bg-muted)", border: "1px solid var(--border-subtle)" }}
                  >
                    <div
                      className="flex flex-shrink-0 items-center justify-center font-bold"
                      style={{ width: 32, height: 32, borderRadius: 9, background: p.soft, color: p.color, fontSize: 11.5 }}
                    >
                      {p.shortLabel}
                    </div>
                    <span
                      className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-text-primary"
                      style={{ fontSize: 12.5, fontWeight: 600 }}
                    >
                      {p.name}
                    </span>
                    <span className="font-mono text-text-secondary" style={{ fontSize: 16, fontWeight: 700 }}>
                      {p.solved}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Topics practiced */}
          <Reveal delay={260} direction="left">
            <div
              className="flex h-full flex-col"
              style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)", borderRadius: 18, padding: 24 }}
            >
              <div className="mb-1 font-mono text-text-tertiary" style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase" }}>
                Topics practiced
              </div>

              <div className="mt-4 flex flex-1 flex-col gap-4">
                {TAG_GROUPS.map((group) => {
                  const tagStyle = group.theme === "violet"
                    ? { background: "var(--accent-violet-soft)", border: "1px solid var(--accent-violet-border)", color: "var(--accent-violet-text)" }
                    : { background: "var(--accent-cyan-soft)", border: "1px solid var(--accent-cyan-border)", color: "var(--accent-cyan-text)" };
                  return (
                    <div key={group.label}>
                      <div
                        className="mb-2 font-mono text-text-quaternary"
                        style={{ fontSize: 9.5, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase" }}
                      >
                        {group.label}
                      </div>
                      <div className="flex flex-wrap gap-[6px]">
                        {group.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono"
                            style={{ fontSize: 10.5, fontWeight: 500, padding: "4px 10px", borderRadius: 100, ...tagStyle }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}