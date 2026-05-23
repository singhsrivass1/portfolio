"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const PROJECTS = [
  {
    tag: "AI Product",
    title: "Krafti — AI-assisted Product Listing Generator",
    desc: "End-to-end AI pipeline that transforms raw product images into structured marketplace-ready listings using computer vision and LLM workflows. Processed 50+ product images automatically with deterministic preprocessing and rule-based pricing logic.",
    stack: ["Python", "FastAPI", "BLIP", "Groq API", "U²-Net", "Pillow", "Transformers"],
    year: "2026",
    status: "Hackathon",
    accent: "#4F46E5",
    highlights: ["50+ images processed automatically", "Constrained prompting to reduce hallucinations", "Fallback handling for API reliability"],
    hurdle: "LLM kept hallucinating extra fields until I locked the output to a strict JSON schema. Obvious in hindsight, painful to debug.",
  },
  {
    tag: "ML / Analytics",
    title: "Smart Financial Agent",
    desc: "ML-powered financial assistant analyzing 10,000+ transactions to generate predictive insights and personalized recommendations. Built preprocessing pipelines that reduced data cleaning effort by 40%, with predictive models achieving 80%+ accuracy.",
    stack: ["Python", "Pandas", "NumPy", "Scikit-learn", "Machine Learning"],
    year: "2025",
    status: "Completed",
    accent: "#059669",
    highlights: ["10,000+ transactions analyzed", "80%+ model accuracy", "40% reduction in data cleaning effort"],
  },
  {
    tag: "Python / Data",
    title: "WhatsApp Chat Analyzer",
    desc: "Analytics platform extracting conversational patterns and engagement insights from large-scale messaging datasets. Applied NLP-based word and emoji analysis, with visualization dashboards for timelines, activity metrics, and participation trends.",
    stack: ["Python", "Pandas", "Matplotlib", "Data Visualization"],
    year: "2025",
    status: "Completed",
    accent: "#D97706",
    highlights: ["100K+ messages processed", "NLP word & emoji analysis", "Engagement & timeline dashboards"],
  },
];

export default function Work() {
  return (
    <section id="work" style={{ padding: "120px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>

          <motion.div variants={fadeUp} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64, flexWrap: "wrap", gap: 16 }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: 12 }}>Selected Projects</p>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--color-ink)" }}>Things I've built</h2>
            </div>
            <p style={{ fontSize: 15, color: "var(--color-ink-3)", maxWidth: 300, lineHeight: 1.6, letterSpacing: "-0.01em" }}>
              
            </p>
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {PROJECTS.map((project, i) => (
              <motion.div key={project.title} variants={fadeUp} custom={i}
style={{ padding: "36px 40px", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", background: "var(--color-surface)", cursor: "pointer", position: "relative", overflow: "hidden", gridColumn: i === 0 ? "1 / -1" : "auto" }}                whileHover={{ scale: 1.003, boxShadow: "var(--shadow-lg)", borderColor: "var(--color-border-strong)" }}
                className="work-card">
                <div style={{ position: "absolute", left: 0, top: "20%", bottom: "20%", width: 3, borderRadius: "0 3px 3px 0", background: project.accent, opacity: 0.8 }} />

                <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "start" }} className="card-inner">
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: project.accent, padding: "3px 10px", borderRadius: "var(--radius-full)", border: `1px solid ${project.accent}33`, background: `${project.accent}11` }}>{project.tag}</span>
                      <span style={{ fontSize: 12, color: "var(--color-ink-4)" }}>{project.year}</span>
                      <span style={{ fontSize: 11, fontWeight: 500, color: "#059669", padding: "2px 8px", borderRadius: "var(--radius-full)", background: "#05966912", border: "1px solid #05966933" }}>{project.status}</span>
                    </div>

                    <h3 style={{ fontSize: "clamp(17px, 2vw, 22px)", fontWeight: 700, letterSpacing: "-0.025em", color: "var(--color-ink)", lineHeight: 1.2 }}>{project.title}</h3>
                    <p style={{ fontSize: 14, color: "var(--color-ink-3)", lineHeight: 1.72, letterSpacing: "-0.005em", maxWidth: 600 }}>{project.desc}</p>

                    {/* Highlights */}
                    <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                      {project.highlights.map((h) => (
                        <div key={h} style={{ display: "flex", gap: 6, alignItems: "center" }}>
                          <span style={{ color: project.accent, fontSize: 8 }}>◆</span>
                          <span style={{ fontSize: 12, color: "var(--color-ink-3)", letterSpacing: "-0.005em" }}>{h}</span>
                        </div>
                      ))}
                    </div>
                    {project.hurdle && (
  <div style={{ padding: "12px 16px", borderRadius: "var(--radius-md)", background: "var(--color-bg-subtle)", borderLeft: "2px solid var(--color-border-strong)" }}>
    <p style={{ fontSize: 11, fontWeight: 600, color: "var(--color-ink-4)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>Technical hurdle</p>
    <p style={{ fontSize: 13, color: "var(--color-ink-3)", lineHeight: 1.6 }}>{project.hurdle}</p>
  </div>
)}

                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {project.stack.map((s) => (
                        <span key={s} style={{ fontSize: 11, fontWeight: 500, color: "var(--color-ink-4)", padding: "4px 10px", borderRadius: "var(--radius-sm)", background: "var(--color-bg-muted)", letterSpacing: "-0.01em", fontFamily: "var(--font-mono, monospace)" }}>{s}</span>
                      ))}
                    </div>
                  </div>

                  <div style={{ width: 40, height: 40, borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-ink-4)", flexShrink: 0, marginTop: 4 }} className="card-arrow">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M12 4H6M12 4v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} style={{ textAlign: "center", marginTop: 48 }}>
            <p style={{ fontSize: 14, color: "var(--color-ink-4)", letterSpacing: "-0.01em" }}>
              More on{" "}
              <a href="https://github.com/singhsrivass1" target="_blank" rel="noopener noreferrer"
                style={{ color: "var(--color-accent)", fontWeight: 500, borderBottom: "1px solid var(--color-accent-muted)" }}>
                github.com/singhsrivass1 →
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
      <style>{`
        @media (max-width: 640px) { .work-card { padding: 24px 20px !important; } .card-inner { grid-template-columns: 1fr !important; } .card-arrow { display: none !important; } }
      `}</style>
    </section>
  );
}
