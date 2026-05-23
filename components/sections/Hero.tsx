"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";

const CHIPS = ["Python", "C++", "Machine Learning", "Computer Vision", "NLP", "FastAPI", "REST APIs", "DSA"];

export default function Hero() {
  return (
    <section id="hero" style={{ minHeight: "100svh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 24px 80px", position: "relative", overflow: "hidden" }}>

      <div aria-hidden style={{ position: "absolute", top: -120, right: -80, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(79,70,229,0.06) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div aria-hidden style={{ position: "absolute", bottom: -80, left: -120, width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle, rgba(79,70,229,0.04) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" style={{ display: "flex", flexDirection: "column", gap: 28 }}>

          <motion.div variants={fadeUp}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 500, color: "var(--color-accent)", letterSpacing: "0.05em", textTransform: "uppercase", padding: "5px 12px", borderRadius: "var(--radius-full)", border: "1px solid var(--color-accent-muted)", background: "var(--color-accent-soft)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-accent)", display: "inline-block", animation: "pulse 2s ease-in-out infinite" }} />
              Open to internships & collaborations
            </span>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h1 style={{ fontSize: "clamp(52px, 8vw, 96px)", fontWeight: 700, letterSpacing: "-0.045em", lineHeight: 1.02, color: "var(--color-ink)" }}>
              Srivass
            </h1>
          </motion.div>

          <motion.div variants={fadeUp}>
            <p style={{ fontSize: "clamp(15px, 1.8vw, 18px)", fontWeight: 600, color: "var(--color-ink-3)", letterSpacing: "-0.01em" }}>
              Software Developer · AI/ML · Problem Solver
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <p style={{ fontSize: "clamp(20px, 3vw, 36px)", fontWeight: 700, color: "var(--color-ink-2)", letterSpacing: "-0.025em", lineHeight: 1.35, maxWidth: 680 }}>
              I build AI/ML projects, solve problems, and learn by {" "}
              <em style={{ fontStyle: "normal", color: "var(--color-accent)" }}>
                turning ideas into working software.
              </em>
            </p>
          </motion.div>

          <motion.div variants={fadeUp} style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {CHIPS.map((chip) => (
              <span key={chip} style={{ fontSize: 13, fontWeight: 500, color: "var(--color-ink-3)", padding: "6px 14px", borderRadius: "var(--radius-full)", border: "1px solid var(--color-border)", background: "var(--color-surface)", letterSpacing: "-0.01em" }}>
                {chip}
              </span>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} style={{ display: "flex", gap: 12, flexWrap: "wrap", paddingTop: 4 }}>
            <a href="#work"
              onClick={(e) => { e.preventDefault(); document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" }); }}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 15, fontWeight: 600, color: "#fff", background: "var(--color-accent)", padding: "12px 24px", borderRadius: "var(--radius-lg)", letterSpacing: "-0.01em", transition: "all 0.2s ease", boxShadow: "0 2px 8px rgba(79,70,229,0.25)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--color-accent-hover)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(79,70,229,0.35)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--color-accent)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(79,70,229,0.25)"; }}>
              View my projects
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            <a href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 15, fontWeight: 600, color: "var(--color-ink-2)", background: "var(--color-surface)", padding: "12px 24px", borderRadius: "var(--radius-lg)", letterSpacing: "-0.01em", border: "1px solid var(--color-border)", transition: "all 0.2s ease", boxShadow: "var(--shadow-xs)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--color-bg-subtle)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--color-surface)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
              Get in touch
            </a>
          </motion.div>

        </motion.div>


      </div>

      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
    </section>
  );
}
