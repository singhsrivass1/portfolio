"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const LINKS = [
  { label: "GitHub", handle: "github.com/singhsrivass1", href: "https://github.com/singhsrivass1", icon: "GH" },
  { label: "LinkedIn", handle: "linkedin.com/in/srivasskr", href: "https://linkedin.com/in/srivasskr", icon: "in" },
];

export default function Contact() {
  return (
    <section id="contact" style={{ padding: "120px 24px 80px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} style={{ display: "flex", flexDirection: "column", gap: 64 }}>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="contact-grid">
            <motion.div variants={fadeUp}>
              <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: 16 }}>Contact</p>
              <h2 style={{ fontSize: "clamp(30px, 5vw, 56px)", fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.08, color: "var(--color-ink)", marginBottom: 20 }}>
                Open to internships, collaborations, and learning opportunities.
              </h2>
              <p style={{ fontSize: 16, color: "var(--color-ink-3)", lineHeight: 1.75, letterSpacing: "-0.01em", maxWidth: 420, marginBottom: 12 }}>
                I'm open to internships, AI/ML project collaborations, and software engineering opportunities where I can contribute and grow.
              </p>
              <p style={{ fontSize: 15, color: "var(--color-ink-4)", lineHeight: 1.7, letterSpacing: "-0.01em", maxWidth: 420, marginBottom: 36 }}>
                Based in Ranchi, Jharkhand, India, Working remotely.
              </p>
              <a href="mailto:singhsrivass881@gmail.com"
                style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 15, fontWeight: 600, color: "#fff", background: "var(--color-accent)", padding: "14px 28px", borderRadius: "var(--radius-lg)", letterSpacing: "-0.01em", transition: "all 0.2s ease", boxShadow: "0 2px 8px rgba(79,70,229,0.25)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--color-accent-hover)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(79,70,229,0.35)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--color-accent)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(79,70,229,0.25)"; }}>
                singhsrivass881@gmail.com
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8h12M10 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
              <a href="tel:+91-8292779195"
  style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 15, fontWeight: 600, color: "var(--color-ink-2)", background: "var(--color-surface)", padding: "14px 28px", borderRadius: "var(--radius-lg)", letterSpacing: "-0.01em", transition: "all 0.2s ease", boxShadow: "var(--shadow-xs)", border: "1px solid var(--color-border)", marginTop: 12 }}
  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--color-bg-subtle)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--color-surface)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.64 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.64a16 16 0 0 0 5.45 5.45l.98-.98a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
   +91-8292779195
</a>
            </motion.div>

            <motion.div variants={fadeUp} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {/* Availability card */}
              <div style={{ padding: 28, borderRadius: "var(--radius-xl)", border: "1px solid var(--color-accent-muted)", background: "var(--color-accent-soft)", marginBottom: 4 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", display: "inline-block", boxShadow: "0 0 0 3px rgba(34,197,94,0.2)" }} />
                  <p style={{ fontSize: 13, fontWeight: 600, color: "var(--color-accent)", letterSpacing: "0.02em" }}>Available for opportunities</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {["Internships", "AI/ML collaborations", "Software engineering roles"].map((item) => (
                    <div key={item} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <span style={{ color: "var(--color-accent)", fontSize: 8 }}>◆</span>
                      <p style={{ fontSize: 14, color: "var(--color-ink-2)", letterSpacing: "-0.01em" }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social links */}
              <div style={{ padding: 28, borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", background: "var(--color-surface)", boxShadow: "var(--shadow-sm)" }}>
                <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-ink-4)", marginBottom: 16 }}>Find me online</p>
                {LINKS.map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderRadius: "var(--radius-md)", transition: "all 0.2s ease", color: "var(--color-ink-2)", border: "1px solid transparent", marginBottom: 4 }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--color-bg-subtle)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.borderColor = "transparent"; }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ width: 34, height: 34, borderRadius: "var(--radius-md)", background: "var(--color-bg-muted)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "var(--color-ink-2)", flexShrink: 0 }}>{link.icon}</span>
                      <div>
                        <p style={{ fontSize: 14, fontWeight: 600, color: "var(--color-ink)", letterSpacing: "-0.01em" }}>{link.label}</p>
                        <p style={{ fontSize: 12, color: "var(--color-ink-4)", letterSpacing: "-0.005em" }}>{link.handle}</p>
                      </div>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ color: "var(--color-ink-4)" }}><path d="M4 12L12 4M12 4H6M12 4v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.div variants={fadeUp} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 32, borderTop: "1px solid var(--color-border)", flexWrap: "wrap", gap: 12 }}>
            <p style={{ fontSize: 13, color: "var(--color-ink-4)", letterSpacing: "-0.01em" }}>
              © {new Date().getFullYear()} Srivass Kumar · Ranchi, India
            </p>
            <p style={{ fontSize: 15, color: "var(--color-ink-4)", letterSpacing: "-0.01em" }}>
              Built with <span style={{ color: "#ef4444", margin: "0 2px" }}>♥</span> by Srivass
            </p>
          </motion.div>
        </motion.div>
      </div>
      <style>{`@media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }`}</style>
    </section>
  );
}
