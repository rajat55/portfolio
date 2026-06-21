import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      colors: {
        base: "var(--bg-base)",
        surface: "var(--bg-surface)",
        "surface-hover": "var(--bg-surface-hover)",
        muted: "var(--bg-muted)",

        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-tertiary": "var(--text-tertiary)",
        "text-quaternary": "var(--text-quaternary)",

        "border-subtle": "var(--border-subtle)",
        "border-default": "var(--border-default)",
        "border-strong": "var(--border-strong)",

        violet: {
          DEFAULT: "var(--accent-violet)",
          soft: "var(--accent-violet-soft)",
          border: "var(--accent-violet-border)",
          text: "var(--accent-violet-text)",
        },
        cyan: {
          DEFAULT: "var(--accent-cyan)",
          soft: "var(--accent-cyan-soft)",
          border: "var(--accent-cyan-border)",
          text: "var(--accent-cyan-text)",
        },
        green: {
          DEFAULT: "var(--accent-green)",
          soft: "var(--accent-green-soft)",
          border: "var(--accent-green-border)",
          text: "var(--accent-green-text)",
        },
        amber: {
          DEFAULT: "var(--accent-amber)",
          soft: "var(--accent-amber-soft)",
          border: "var(--accent-amber-border)",
          text: "var(--accent-amber-text)",
        },
        pink: {
          DEFAULT: "var(--accent-pink)",
          soft: "var(--accent-pink-soft)",
          border: "var(--accent-pink-border)",
          text: "var(--accent-pink-text)",
        },
        orange: {
          DEFAULT: "var(--accent-orange)",
          soft: "var(--accent-orange-soft)",
          border: "var(--accent-orange-border)",
          text: "var(--accent-orange-text)",
        },
        red: {
          DEFAULT: "var(--accent-red)",
          soft: "var(--accent-red-soft)",
          border: "var(--accent-red-border)",
          text: "var(--accent-red-text)",
        },

        "grid-line": "var(--grid-line)",
        "glow-violet": "var(--glow-violet)",
        "glow-cyan": "var(--glow-cyan)",
      },
    },
  },
  plugins: [],
};

export default config;
