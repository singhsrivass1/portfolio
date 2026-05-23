"use client";
import { Brain, BarChart2, Bot, Settings, Monitor, Database } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const LEARNING = [
  {
    title: "Advanced DSA",
    desc: "Advanced data structures & algorithms for scalable problem solving, graphs, segment trees, DP optimizations.",
    icon: <Brain size={20} strokeWidth={1.5} />,
    tag: "CS Foundations",
    progress: 60,
    color: "#4F46E5",
    resources: ["LeetCode", "Codeforces", "Striver A2Z Sheet"],
  },
  {
    title: "ML Pipelines",
    desc: "Machine learning fundamentals and practical ML pipelines, from data preprocessing to model deployment.",
    icon: <BarChart2 size={20} strokeWidth={1.5} />,
    tag: "Machine Learning",
    progress: 55,
    color: "#059669",
    resources: ["campus-x yt", "Scikit-learn docs", "Kaggle"],
  },
  {
    title: "LLM Engineering",
    desc: "Large language model workflows and AI application engineering, RAG, agents, prompt engineering, evaluation.",
    icon: <Bot size={20} strokeWidth={1.5} />,
    tag: "AI Engineering",
    progress: 0,
    color: "#D97706",
    resources: ["LangChain docs", "OpenAI Cookbook", "Papers"],
  },
  {
    title: "Full-Stack Systems",
    desc: "Building performant full-stack applications with modern developer tooling, Next.js, TypeScript, system design.",
    icon: <Settings size={20} strokeWidth={1.5} />,
    tag: "Engineering",
    progress: 10,
    color: "#7C3AED",
    resources: ["Next.js docs", "System Design Primer", "Building projects"],
  },
  {
    title: "Operating Systems",
    desc: "Core OS concepts, processes, threads, memory management, scheduling, and file systems. Essential CS foundations.",
    icon: <Monitor size={20} strokeWidth={1.5} />,
    tag: "CS Foundations",
    progress: 80,
    color: "#0891B2",
    resources: ["Gate Smashers", "University coursework"],
  },
  {
    title: "Database Systems",
    desc: "Relational databases, SQL, normalization, indexing, and query optimization. Building a strong data engineering foundation.",
    icon: <Database size={20} strokeWidth={1.5} />,
    tag: "CS Foundations",
    progress: 80,
    color: "#BE185D",
    resources: ["Gate Smashers", "University coursework", "Practice projects"],
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

          <motion.div variants={staggerContainer} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }} className="learn-grid">
            {LEARNING.map((item, i) => (
              <motion.div key={item.title} variants={fadeUp} custom={i}
                style={{ padding: "28px", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", background: "var(--color-surface)", display: "flex", flexDirection: "column", gap: 16, cursor: "default" }}
                whileHover={{ y: -2, boxShadow: "var(--shadow-md)", borderColor: "var(--color-border-strong)" }}>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
<span style={{ color: item.color }}>{item.icon}</span>                    <div>
                      <span style={{ fontSize: 10, fontWeight: 600, color: item.color, letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 3 }}>{item.tag}</span>
                      <h3 style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--color-ink)" }}>{item.title}</h3>
                    </div>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: item.color }}>{item.progress}%</span>
                </div>

                <p style={{ fontSize: 14, color: "var(--color-ink-3)", lineHeight: 1.65, letterSpacing: "-0.005em" }}>{item.desc}</p>

                {/* Progress bar */}
                <div>
                  <div style={{ height: 4, borderRadius: 2, background: "var(--color-bg-muted)", overflow: "hidden" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.progress}%` }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                      viewport={{ once: true }}
                      style={{ height: "100%", borderRadius: 2, background: item.color }}
                    />
                  </div>
                </div>

                {/* Resources */}
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {item.resources.map((r) => (
                    <span key={r} style={{ fontSize: 11, fontWeight: 500, color: "var(--color-ink-4)", padding: "3px 8px", borderRadius: "var(--radius-sm)", background: "var(--color-bg-muted)", letterSpacing: "-0.005em" }}>{r}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @media (max-width: 900px) { .learn-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px) { .learn-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
