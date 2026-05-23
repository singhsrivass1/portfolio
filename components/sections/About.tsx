"use client";
import { Settings, Bot, Target } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const STATS = [
  { value: "8.51", label: "CGPA at BIT Mesra" },
  { value: "200+", label: "DSA problems solved" },
  { value: "99.4%", label: "Physics percentile, JEE" },
];

const TRAITS = [
  {
    icon: <Settings size={20} strokeWidth={1.5} />,
   title: "I like systems that fail gracefully",
desc: "When something breaks, I want it to break in a way that is obvious and recoverable. That mindset shapes how I structure projects from the start.",
},
  {
    icon: <Bot size={20} strokeWidth={1.5} />,
    title: "Practical AI engineering",
    desc: "I build AI/ML projects to understand how the pieces fit together. Less about showcasing models, more about figuring out what actually works when real data shows up.",
  },
  {
    icon: <Target size={20} strokeWidth={1.5} />,
    title: "Problem-first approach",
    desc: "Competitive programming sharpened my instinct to reach for the simplest correct solution first. I don't over-engineer.",
  },
];

const EDUCATION = [
  {
    school: "Birla Institute of Technology, Mesra",
    degree: "B.Tech - Artificial Intelligence & Machine Learning",
    period: "2024 — 2028",
    detail: "CGPA: 8.51",
  },
  {
    school: "DAV Koylanagar, Dhanbad",
    degree: "CBSE Class 12 — PCM + Informatics Practices",
    period: "2024",
    detail: "Score: 93%",
  },
];

export default function About() {
  return (
    <section id="about" style={{ padding: "120px 24px", background: "var(--color-bg-subtle)", borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>

          <motion.p variants={fadeUp} style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: 24 }}>About</motion.p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }} className="about-grid">

            {/* Left — bio + stats + education */}
            <motion.div variants={fadeUp} style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.12, color: "var(--color-ink)" }}>
Third-year AI/ML student who learns best by building things.              </h2>
              <p style={{ fontSize: 16, color: "var(--color-ink-3)", lineHeight: 1.78, letterSpacing: "-0.01em" }}>
I'm a B.Tech student in AI/ML at BIT Mesra. I got into programming because I liked breaking problems into smaller parts and figuring out why things work. That curiosity pushed me toward machine learning, where the problems are rarely clean and the debugging is never obvious.              </p>
              <p style={{ fontSize: 16, color: "var(--color-ink-3)", lineHeight: 1.78, letterSpacing: "-0.01em" }}>
Right now I am focused on DSA, applied ML, and building small but complete projects. I like taking something from a rough idea to something that actually runs. Outside class I solve problems on LeetCode and Codeforces, mostly to get better at thinking clearly under constraints.              </p>

              {/* Stats */}
              <div style={{ display: "flex", gap: 32, paddingTop: 4, flexWrap: "wrap" }}>
                {STATS.map((s) => (
                  <div key={s.label}>
                    <p style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.03em", color: "var(--color-ink)" }}>{s.value}</p>
                    <p style={{ fontSize: 12, color: "var(--color-ink-4)", letterSpacing: "-0.005em", marginTop: 2 }}>{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Education */}
              <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: 24 }}>
                <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-ink-4)", marginBottom: 16 }}>Education</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {EDUCATION.map((ed) => (
                    <div key={ed.school} style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                      <div>
                        <p style={{ fontSize: 14, fontWeight: 600, color: "var(--color-ink)", letterSpacing: "-0.01em" }}>{ed.school}</p>
                        <p style={{ fontSize: 13, color: "var(--color-ink-3)", marginTop: 2, letterSpacing: "-0.005em" }}>{ed.degree}</p>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <p style={{ fontSize: 12, color: "var(--color-ink-4)" }}>{ed.period}</p>
                        <p style={{ fontSize: 12, color: "var(--color-ink)", fontWeight: 600, marginTop: 2 }}>{ed.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right — trait cards */}
            <motion.div variants={staggerContainer} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {TRAITS.map((t) => (
                <motion.div key={t.title} variants={fadeUp}
                  style={{ padding: "24px", borderRadius: "var(--radius-lg)", background: "var(--color-surface)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-xs)", cursor: "default" }}
                  whileHover={{ y: -2, boxShadow: "var(--shadow-md)" }}>
                  <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
<span style={{ flexShrink: 0, marginTop: 1, color: "var(--color-ink-3)" }}>{t.icon}</span>                    <div>
                      <p style={{ fontSize: 15, fontWeight: 600, color: "var(--color-ink)", letterSpacing: "-0.01em", marginBottom: 6 }}>{t.title}</p>
                      <p style={{ fontSize: 14, color: "var(--color-ink-3)", lineHeight: 1.65, letterSpacing: "-0.005em" }}>{t.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Achievements card */}
              <motion.div variants={fadeUp}
                style={{ padding: "24px", borderRadius: "var(--radius-lg)", background: "var(--color-accent-soft)", border: "1px solid var(--color-accent-muted)", cursor: "default" }}>
                <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: 14 }}>Highlights</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    "99.4 percentile in Physics — JEE Main 2024",
                    "200+ problems solved on LeetCode, HackerRank & Codeforces",
                    "Built AI/ML projects using LLMs, Computer Vision, and NLP workflows",
                  ].map((a) => (
                    <div key={a} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ color: "var(--color-accent)", flexShrink: 0, marginTop: 5, fontSize: 8 }}>◆</span>
                      <p style={{ fontSize: 13, color: "var(--color-ink-2)", lineHeight: 1.6, letterSpacing: "-0.005em" }}>{a}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <style>{`@media (max-width: 768px) { .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }`}</style>
    </section>
  );
}
