"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export default function LeetCodeStats() {
  return (
    <section style={{ padding: "100px 24px", background: "var(--color-bg-subtle)", borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>

          <motion.div variants={fadeUp} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: 10 }}>Competitive Programming</p>
              <h2 style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--color-ink)" }}>Algorithmic problem solving</h2>
            </div>
            <a href="https://codolio.com/profile/dumbcat" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: "var(--color-ink-3)", padding: "8px 16px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", background: "var(--color-surface)", letterSpacing: "-0.01em", transition: "all 0.2s ease" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--color-bg-subtle)"; (e.currentTarget as HTMLElement).style.color = "var(--color-ink)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--color-surface)"; (e.currentTarget as HTMLElement).style.color = "var(--color-ink-3)"; }}>
              @dumbcat →
            </a>
          </motion.div>

          <motion.div variants={fadeUp}>
            <a href="https://codolio.com/profile/dumbcat" target="_blank" rel="noopener noreferrer"
style={{ display: "block", borderRadius: "var(--radius-xl)", overflow: "hidden", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-md)", transition: "all 0.25s ease", maxWidth: 600, margin: "0 auto" }}              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-xl)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)"; }}>
              <img
                src="https://codolio.com/api/og/dumbcat"
                alt="Codolio profile — dumbcat"
                style={{ width: "100%", display: "block" }}
              />
            </a>
           <div style={{ display: "flex", gap: 16, marginTop: 12, flexWrap: "wrap" }}>
  <p style={{ fontSize: 12, color: "var(--color-ink-4)", letterSpacing: "-0.01em" }}>
    Click to view my leetcode profile →
  </p>
  <a href="https://leetcode.com/dumbbcat" target="_blank" rel="noopener noreferrer"
    style={{ fontSize: 12, color: "var(--color-accent)", letterSpacing: "-0.01em", fontWeight: 500, borderBottom: "1px solid var(--color-accent-muted)" }}>
    LeetCode @dumbbcat →
  </a>
</div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}