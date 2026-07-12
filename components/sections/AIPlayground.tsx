"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { Search, Eye, Shield, Zap, Package } from "lucide-react";

const CONCEPT_CARDS = [
  {
    id: "cv",
    title: "Vision to Structured Output",
    subtitle: "How Krafti processes images",
    icon: <Eye size={18} strokeWidth={1.5} />,
    color: "#4F46E5",
    desc: "I learned that captioning quality depends almost entirely on preprocessing. The image goes through background removal first with U\u00b2-Net, then BLIP generates a caption. Garbage in, garbage out applies more here than anywhere else I have worked.",
    steps: ["Raw image", "U\u00b2-Net background removal", "BLIP captioning", "Strict JSON prompt", "Structured listing"],
  },
  {
    id: "webhook",
    title: "Event-Driven Security Review",
    subtitle: "How Oasis handles PR analysis",
    icon: <Shield size={18} strokeWidth={1.5} />,
    color: "#0891B2",
    desc: "GitHub sends a webhook on every pull request. Oasis verifies the HMAC signature, extracts the diff, and passes it to Gemini with a structured prompt asking for security issues. The hardest part was making this async without dropping events under load.",
    steps: ["GitHub webhook", "HMAC verification", "Diff extraction", "Gemini analysis", "Structured JSON review"],
  },
  {
    id: "schema",
    title: "Constrained LLM Output",
    subtitle: "Getting models to return consistent JSON",
    icon: <Search size={18} strokeWidth={1.5} />,
    color: "#D97706",
    desc: "Getting LLMs to return consistent JSON is harder than it sounds. The model will invent fields, skip fields, or return malformed responses. Strict schema enforcement in the prompt fixed most of it. Pydantic validation caught the rest. I use this pattern in both Krafti and Oasis now.",
    steps: ["Define JSON schema", "Inject schema into prompt", "Parse response", "Pydantic validation", "Fallback on failure"],
  },
];

const PROJECT_DEMOS = [
  {
    id: "oasis",
    name: "Oasis",
    tag: "Backend / DevSecOps",
    color: "#0891B2",
    icon: <Shield size={24} strokeWidth={1.5} />,
    metrics: [
      { label: "Trigger", value: "Webhook" },
      { label: "Verification", value: "HMAC" },
      { label: "Output", value: "JSON" },
    ],
    architecture: "GitHub PR → Webhook → HMAC verify → Diff extract → Gemini → Security review",
    insight: "AI is one component inside a larger system here. The webhook ingestion, verification, and async handling matter just as much as the model output.",
  },
  {
    id: "krafti",
    name: "Krafti",
    tag: "AI / Computer Vision",
    color: "#4F46E5",
    icon: <Zap size={24} strokeWidth={1.5} />,
    metrics: [
      { label: "Images processed", value: "50+" },
      { label: "Avg time", value: "~3s" },
      { label: "Schema enforced", value: "Yes" },
    ],
    architecture: "Image → U\u00b2-Net → BLIP caption → Groq LLM → Structured JSON listing",
    insight: "Constrained prompting with a strict JSON schema eliminated hallucinated fields entirely. The preprocessing step before the model matters more than the model itself.",
  },
  {
    id: "kajal",
    name: "Kajal Cartel",
    tag: "Full-Stack AI",
    color: "#059669",
    icon: <Package size={24} strokeWidth={1.5} />,
    metrics: [
      { label: "Stack", value: "Next.js" },
      { label: "Database", value: "MongoDB" },
      { label: "AI", value: "Gemini" },
    ],
    architecture: "User input → Gemini recommendation → MongoDB vendor lookup → Booking flow",
    insight: "The recommendation worked better when I constrained the prompt to return ranked vendor IDs rather than free text. Easier to handle downstream and less likely to hallucinate.",
  },
];

function ConceptCard({ card, isActive, onClick }: { card: typeof CONCEPT_CARDS[0]; isActive: boolean; onClick: () => void }) {
  return (
    <motion.div onClick={onClick} whileHover={{ y: -2 }}
      style={{ padding: "22px 24px", borderRadius: "var(--radius-lg)", border: `1px solid ${isActive ? card.color + "60" : "var(--color-border)"}`, background: isActive ? `${card.color}08` : "var(--color-surface)", cursor: "pointer", transition: "all 0.2s ease", boxShadow: isActive ? `0 0 0 2px ${card.color}20` : "none" }}>
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
        <span style={{ color: isActive ? card.color : "var(--color-ink-3)", flexShrink: 0, marginTop: 1 }}>{card.icon}</span>
        <div>
          <p style={{ fontSize: 14, fontWeight: 700, color: isActive ? card.color : "var(--color-ink)", letterSpacing: "-0.01em" }}>{card.title}</p>
          <p style={{ fontSize: 11, color: "var(--color-ink-4)", marginTop: 2 }}>{card.subtitle}</p>
        </div>
      </div>
      <p style={{ fontSize: 13, color: "var(--color-ink-3)", lineHeight: 1.6, letterSpacing: "-0.005em" }}>{card.desc}</p>

      <AnimatePresence>
        {isActive && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginTop: 16, overflow: "hidden" }}>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--color-ink-4)", marginBottom: 10 }}>Steps</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
              {card.steps.map((step, i) => (
                <span key={step} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 12, fontWeight: 500, color: card.color, padding: "4px 10px", borderRadius: "var(--radius-full)", background: `${card.color}12`, border: `1px solid ${card.color}25` }}>{step}</span>
                  {i < card.steps.length - 1 && <span style={{ color: "var(--color-ink-4)", fontSize: 12 }}>→</span>}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function AIPlayground() {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [activeDemo, setActiveDemo] = useState(PROJECT_DEMOS[0].id);

  const demo = PROJECT_DEMOS.find((d) => d.id === activeDemo)!;

  return (
    <section style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>

          <motion.div variants={fadeUp} style={{ marginBottom: 48 }}>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: 10 }}>AI Playground</p>
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--color-ink)", marginBottom: 10 }}>What I learned while building</h2>
            <p style={{ fontSize: 15, color: "var(--color-ink-3)", letterSpacing: "-0.01em" }}>Not documentation. Things that came up while actually building these projects.</p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }} className="playground-grid">

            <motion.div variants={staggerContainer} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-ink-4)", marginBottom: 6 }}>Click to expand</p>
              {CONCEPT_CARDS.map((card) => (
                <ConceptCard key={card.id} card={card} isActive={activeCard === card.id}
                  onClick={() => setActiveCard(activeCard === card.id ? null : card.id)} />
              ))}
            </motion.div>

            <motion.div variants={fadeUp} style={{ display: "flex", flexDirection: "column", gap: 12, position: "sticky", top: 100 }}>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-ink-4)", marginBottom: 6 }}>Project breakdown</p>

              <div style={{ display: "flex", gap: 6, padding: 4, borderRadius: "var(--radius-lg)", background: "var(--color-bg-muted)", border: "1px solid var(--color-border)" }}>
                {PROJECT_DEMOS.map((d) => (
                  <button key={d.id} onClick={() => setActiveDemo(d.id)}
                    style={{ flex: 1, padding: "8px 12px", borderRadius: "var(--radius-md)", border: "none", background: activeDemo === d.id ? "var(--color-surface)" : "transparent", color: activeDemo === d.id ? "var(--color-ink)" : "var(--color-ink-4)", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s ease", boxShadow: activeDemo === d.id ? "var(--shadow-sm)" : "none", letterSpacing: "-0.01em" }}>
                    {d.name}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div key={activeDemo} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{ padding: "28px", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", background: "var(--color-surface)", boxShadow: "var(--shadow-sm)", display: "flex", flexDirection: "column", gap: 20 }}>

                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <span style={{ color: demo.color }}>{demo.icon}</span>
                    <div>
                      <span style={{ fontSize: 10, fontWeight: 600, color: demo.color, letterSpacing: "0.06em", textTransform: "uppercase" }}>{demo.tag}</span>
                      <h3 style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--color-ink)" }}>{demo.name}</h3>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                    {demo.metrics.map((m) => (
                      <div key={m.label} style={{ padding: "14px", borderRadius: "var(--radius-md)", background: "var(--color-bg-subtle)", border: "1px solid var(--color-border)", textAlign: "center" }}>
                        <p style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--color-ink)" }}>{m.value}</p>
                        <p style={{ fontSize: 10, color: "var(--color-ink-4)", marginTop: 3, lineHeight: 1.4 }}>{m.label}</p>
                      </div>
                    ))}
                  </div>

                  <div style={{ padding: "14px 16px", borderRadius: "var(--radius-md)", background: "var(--color-bg-muted)", border: "1px solid var(--color-border)" }}>
                    <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--color-ink-4)", marginBottom: 8 }}>How it works</p>
                    <p style={{ fontSize: 13, color: "var(--color-ink-3)", fontFamily: "var(--font-mono, monospace)", letterSpacing: "0.01em", lineHeight: 1.6 }}>{demo.architecture}</p>
                  </div>

                  <div style={{ padding: "16px 18px", borderRadius: "var(--radius-md)", background: `${demo.color}08`, border: `1px solid ${demo.color}25` }}>
                    <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: demo.color, marginBottom: 8 }}>What I learned</p>
                    <p style={{ fontSize: 13, color: "var(--color-ink-2)", lineHeight: 1.65, letterSpacing: "-0.005em" }}>{demo.insight}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <style>{`@media (max-width: 768px) { .playground-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}