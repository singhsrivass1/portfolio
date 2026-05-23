"use client";
import { Zap, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const HACKATHONS = [
  {
    name: "Krafti Hackathon",
    project: "AI Product Listing Generator",
    year: "2026",
    outcome: "Prototype Shipped",
    outcomeColor: "#4F46E5",
    desc: "Built an end-to-end AI pipeline under hackathon time constraints — transforming raw product images into structured, marketplace-ready listings using computer vision and LLM workflows.",
    stack: ["Python", "FastAPI", "BLIP", "Groq API", "U²-Net"],
    highlights: [
      "Processed 50+ product images in the pipeline",
      "Integrated BLIP captioning + Groq-hosted LLM",
      "Built deterministic preprocessing with failure-safe fallbacks",
      "Shipped a working prototype end-to-end",
    ],
    icon: <Zap size={24} strokeWidth={1.5} />,
  },
];

export default function Hackathons() {
  return (
    <section style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <motion.div variants={fadeUp} style={{ marginBottom: 48 }}>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: 10 }}>Hackathons</p>
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--color-ink)" }}>Hackathon Projects</h2>
          </motion.div>

          {HACKATHONS.map((h) => (
            <motion.div key={h.name} variants={fadeUp}
              style={{ padding: "40px", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", background: "var(--color-surface)", boxShadow: "var(--shadow-sm)", position: "relative", overflow: "hidden" }}
              whileHover={{ boxShadow: "var(--shadow-lg)" }}>
              {/* Background accent */}
              <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(79,70,229,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }} className="hack-grid">
                {/* Left */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
<span style={{ color: "var(--color-accent)" }}>{h.icon}</span>                    <div>
                      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                        <span style={{ fontSize: 11, fontWeight: 600, color: h.outcomeColor, padding: "2px 8px", borderRadius: "var(--radius-full)", background: `${h.outcomeColor}15`, border: `1px solid ${h.outcomeColor}30`, letterSpacing: "0.04em" }}>{h.outcome}</span>
                        <span style={{ fontSize: 12, color: "var(--color-ink-4)" }}>{h.year}</span>
                      </div>
                      <h3 style={{ fontSize: "clamp(18px, 2.5vw, 26px)", fontWeight: 700, letterSpacing: "-0.025em", color: "var(--color-ink)", lineHeight: 1.15 }}>{h.name}</h3>
                      <p style={{ fontSize: 14, color: "var(--color-ink-3)", marginTop: 2, letterSpacing: "-0.01em" }}>{h.project}</p>
                    </div>
                  </div>

                  <p style={{ fontSize: 15, color: "var(--color-ink-3)", lineHeight: 1.72, letterSpacing: "-0.01em" }}>{h.desc}</p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {h.stack.map((s) => (
                      <span key={s} style={{ fontSize: 11, fontWeight: 500, color: "var(--color-ink-4)", padding: "4px 10px", borderRadius: "var(--radius-sm)", background: "var(--color-bg-muted)", fontFamily: "var(--font-mono, monospace)" }}>{s}</span>
                    ))}
                  </div>
                </div>

                {/* Right — highlights */}
                <div>
                  <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-ink-4)", marginBottom: 16 }}>What got shipped</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {h.highlights.map((item, i) => (
                      <motion.div key={item} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }} viewport={{ once: true }}
                        style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 16px", borderRadius: "var(--radius-md)", background: "var(--color-bg-subtle)", border: "1px solid var(--color-border)" }}>
                        <span style={{ width: 20, height: 20, borderRadius: "var(--radius-sm)", background: "var(--color-accent)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 10, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
                        <p style={{ fontSize: 13, color: "var(--color-ink-2)", lineHeight: 1.55, letterSpacing: "-0.005em" }}>{item}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* More coming soon */}
          <motion.div variants={fadeUp} style={{ marginTop: 16, padding: "24px 32px", borderRadius: "var(--radius-xl)", border: "1px dashed var(--color-border-strong)", display: "flex", alignItems: "center", gap: 12, color: "var(--color-ink-4)" }}>
<Rocket size={20} strokeWidth={1.5} color="var(--color-ink-4)" />            <p style={{ fontSize: 14, letterSpacing: "-0.01em" }}>More hackathon projects in progress, actively participating in 2026.</p>
          </motion.div>
        </motion.div>
      </div>
      <style>{`@media (max-width: 768px) { .hack-grid { grid-template-columns: 1fr !important; gap: 28px !important; } }`}</style>
    </section>
  );
}
