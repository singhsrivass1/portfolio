"use client";
import { Brain, Code2, Cpu, Monitor, Database, Layers } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const LEARNING = [
  {
    title: "Advanced DSA",
    note: "Working through graph problems and DP patterns on Codeforces. Slowly getting less wrong.",
    icon: <Brain size={18} strokeWidth={1.5} />,
    tag: "CS Foundations",
    color: "#4F46E5",
    resources: ["LeetCode", "Codeforces", "Striver A2Z"],
  },
  {
    title: "Backend Development",
    note: "Building Oasis pushed me toward understanding how backend systems actually fit together. Still learning.",
    icon: <Code2 size={18} strokeWidth={1.5} />,
    tag: "Engineering",
    color: "#0891B2",
    resources: ["FastAPI docs", "Oasis project", "PostgreSQL"],
  },
  {
    title: "LLM Engineering",
    note: "Prompt engineering, structured outputs, and fallback handling. Krafti and Kajal Cartel were the practical side of this.",
    icon: <Cpu size={18} strokeWidth={1.5} />,
    tag: "AI Engineering",
    color: "#D97706",
    resources: ["LangChain docs", "OpenAI Cookbook", "Papers"],
  },
  {
    title: "Next.js Ecosystem",
    note: "Kajal Cartel is where most of this came from. TypeScript and App Router are starting to click.",
    icon: <Layers size={18} strokeWidth={1.5} />,
    tag: "Frontend",
    color: "#7C3AED",
    resources: ["Next.js docs", "Kajal Cartel project"],
  },
  {
    title: "Operating Systems",
    note: "Going through Gate Smashers and university coursework. The chapter on virtual memory took three reads.",
    icon: <Monitor size={18} strokeWidth={1.5} />,
    tag: "CS Foundations",
    color: "#059669",
    resources: ["Gate Smashers", "University coursework"],
  },
  {
    title: "Database Systems",
    note: "SQL basics, normalization, indexing. PostgreSQL in Oasis made a lot of this practical rather than theoretical.",
    icon: <Database size={18} strokeWidth={1.5} />,
    tag: "CS Foundations",
    color: "#BE185D",
    resources: ["Gate Smashers", "PostgreSQL docs"],
  },
];

export default function CurrentlyLearning() {
  return (
    <section style={{ padding: "100px 24px", background: "var(--color-bg-subtle)", borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <motion.div variants={fadeUp} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: 10 }}>Currently Learning</p>
              <h2 style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--color-ink)" }}>What I'm studying right now</h2>
            </div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--color-ink-4)", padding: "6px 12px", borderRadius: "var(--radius-full)", border: "1px solid var(--color-border)", background: "var(--color-surface)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block", animation: "pulse 2s ease-in-out infinite" }} />
              Active
            </span>
          </motion.div>

          <motion.div variants={staggerContainer} style={{ display: "grid", gridTemplateColumns: "1fr", gap: 0 }} className="learn-grid">
            {LEARNING.map((item, i) => (
              <motion.div key={item.title} variants={fadeUp} custom={i}
                style={{ padding: "20px 0", borderBottom: i < LEARNING.length - 1 ? "1px solid var(--color-border)" : "none", display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                  <span style={{ color: item.color, flexShrink: 0 }}>{item.icon}</span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: item.color, letterSpacing: "0.07em", textTransform: "uppercase", padding: "2px 8px", borderRadius: "var(--radius-full)", border: `1px solid ${item.color}30`, background: `${item.color}10` }}>{item.tag}</span>
                  <p style={{ fontSize: 15, fontWeight: 600, color: "var(--color-ink)", letterSpacing: "-0.01em" }}>{item.title}</p>
                </div>
                <p style={{ fontSize: 13, color: "var(--color-ink-3)", lineHeight: 1.65, letterSpacing: "-0.005em", paddingLeft: 28 }}>{item.note}</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", paddingLeft: 28 }}>
                  {item.resources.map((r) => (
                    <span key={r} style={{ fontSize: 11, fontWeight: 500, color: "var(--color-ink-4)", padding: "2px 8px", borderRadius: "var(--radius-sm)", background: "var(--color-bg-muted)", letterSpacing: "-0.005em" }}>{r}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @media (max-width: 640px) { .learn-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}