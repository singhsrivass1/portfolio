"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const ROLES = [
  {
    company: "Independent Project Development",
    role: "AI/ML Project Development",
    period: "2025 — Present",
    type: "Active",
    bullets: [
      "Building AI-powered applications emphasizing scalable architectures and machine learning workflows",
      "Developed end-to-end AI pipelines integrating computer vision, LLMs, and structured data systems",
      "Built AI/ML projects involving preprocessing, model experimentation, and automation. Learned more from debugging than from writing the first version.",
    ],
  },
  {
    company: "Competitive Programming",
    role: "Algorithmic Problem Solving",
    period: "2024 — Present",
    type: "Ongoing",
    bullets: [
      "Solved 200+ problems across LeetCode, HackerRank, and Codeforces",
      "Focus areas: data structures, dynamic programming, graph algorithms, and system design patterns",
      "Sharpened instinct for efficient, minimal solutions before reaching for complexity",
    ],
  },
  {
    company: "Birla Institute of Technology, Mesra",
    role: "B.Tech Student — AI & Machine Learning",
    period: "2024 — 2028",
    type: "Current",
    bullets: [
      "Maintaining 8.51 CGPA while building real-world projects alongside coursework",
      "Studying AI/ML foundations: deep learning, NLP, computer vision, and backend system design",
    ],
  },
];

const SKILLS = [
  { category: "Languages", items: ["Python", "C++", "C", "SQL", "JavaScript"] },
  { category: "Backend & APIs", items: ["FastAPI", "REST APIs", "Backend Architecture"] },
  { category: "AI / ML", items: ["Scikit-learn", "Transformers", "NLP", "Computer Vision", "Pandas", "NumPy"] },
  { category: "Tools", items: ["Git", "GitHub", "Linux", "VS Code"] },
  { category: "CS Foundations", items: ["DSA", "OOP","OS","DBMS", "System Design Fundamentals"] },
];

export default function Journey() {
  return (
    <section id="Journey" style={{ padding: "120px 24px", background: "var(--color-bg-subtle)", borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <motion.p variants={fadeUp} style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: 12 }}>Journey</motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--color-ink)", marginBottom: 64 }}>What I've been doing</motion.h2>

          <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 80, alignItems: "start" }} className="exp-grid">
            {/* Timeline */}
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 0, top: 8, bottom: 0, width: 1, background: "var(--color-border)" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {ROLES.map((role, i) => (
                  <motion.div key={role.company} variants={fadeUp} custom={i}
                    style={{ paddingLeft: 32, paddingBottom: i < ROLES.length - 1 ? 48 : 0, position: "relative" }}>
                    <div style={{ position: "absolute", left: -5, top: 6, width: 11, height: 11, borderRadius: "50%", background: i === 0 ? "var(--color-accent)" : "var(--color-border-strong)", border: "2px solid var(--color-bg-subtle)", boxShadow: "none" }} />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 4 }}>
                      <div>
                        <h3 style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--color-ink)" }}>{role.role}</h3>
                        <p style={{ fontSize: 13, color: "var(--color-ink-3)", letterSpacing: "-0.01em", marginTop: 2 }}>{role.company}</p>
                      </div>
                      <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
                        <span style={{ fontSize: 12, color: "var(--color-ink-4)" }}>{role.period}</span>
                        <span style={{ fontSize: 11, fontWeight: 600, color: i === 0 ? "var(--color-accent)" : "var(--color-ink-4)", padding: "2px 8px", borderRadius: "var(--radius-full)", border: `1px solid ${i === 0 ? "var(--color-accent-muted)" : "var(--color-border)"}`, background: i === 0 ? "var(--color-accent-soft)" : "transparent", letterSpacing: "0.02em" }}>{role.type}</span>
                      </div>
                    </div>
                    <ul style={{ margin: "14px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                      {role.bullets.map((b) => (
                        <li key={b} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                          <span style={{ color: "var(--color-accent)", marginTop: 6, flexShrink: 0, fontSize: 8 }}>◆</span>
                          <span style={{ fontSize: 13, color: "var(--color-ink-3)", lineHeight: 1.65, letterSpacing: "-0.005em" }}>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Skills panel */}
            <motion.div variants={fadeUp} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ padding: 28, borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", background: "var(--color-surface)", boxShadow: "var(--shadow-sm)" }}>
                <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-ink-4)", marginBottom: 20 }}>Technical Skills</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {SKILLS.map((group) => (
                    <div key={group.category}>
                      <p style={{ fontSize: 11, fontWeight: 600, color: "var(--color-ink-3)", letterSpacing: "0.04em", marginBottom: 8, textTransform: "uppercase" }}>{group.category}</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {group.items.map((item) => (
                          <span key={item} style={{ fontSize: 12, fontWeight: 500, color: "var(--color-ink-2)", padding: "4px 10px", borderRadius: "var(--radius-sm)", background: "var(--color-bg-muted)", letterSpacing: "-0.01em", fontFamily: "var(--font-mono, monospace)" }}>{item}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Competitive programming card */}
              <div style={{ padding: 24, borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", background: "var(--color-surface)", boxShadow: "var(--shadow-xs)" }}>
                <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-ink-4)", marginBottom: 14 }}>Competitive Programming</p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {["LeetCode", "Codeforces", "HackerRank"].map((p) => (
                    <span key={p} style={{ fontSize: 12, fontWeight: 500, color: "var(--color-ink-2)", padding: "6px 12px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", background: "var(--color-bg-subtle)" }}>{p}</span>
                  ))}
                </div>
                <p style={{ fontSize: 13, color: "var(--color-ink-3)", marginTop: 12, letterSpacing: "-0.005em" }}>200+ problems solved across all platforms</p>
              </div>

              {/* Resume placeholder */}
              <a href="https://drive.google.com/file/d/1AJTuIfbveXCT1B5Yvikv7A4HN0nAAXXh/view?usp=drivesdk" target="_blank" rel="noopener noreferrer"
  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px 24px", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", background: "var(--color-surface)", fontSize: 14, fontWeight: 600, color: "var(--color-ink-2)", letterSpacing: "-0.01em", transition: "all 0.2s ease", boxShadow: "var(--shadow-xs)", textDecoration: "none" }}
  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--color-bg-subtle)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--color-surface)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v8M5 7l3 3 3-3M3 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  View Resume
</a>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <style>{`@media (max-width: 768px) { .exp-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }`}</style>
    </section>
  );
}
