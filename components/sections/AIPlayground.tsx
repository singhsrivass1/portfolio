"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { Search, Eye, BarChart2, Zap, TrendingUp } from "lucide-react";
const CONCEPT_CARDS = [
  {
    id: "rag",
    title: "RAG Pipeline",
    subtitle: "Retrieval-Augmented Generation",
    icon: <Search size={20} strokeWidth={1.5} />,
    color: "#4F46E5",
    desc: "How Krafti retrieves context before generating product descriptions, embedding similarity search over a vector store, then LLM generation with retrieved context injected.",
    steps: ["Embed query", "Vector similarity search", "Retrieve top-k chunks", "LLM generates with context"],
  },
  {
    id: "cv",
    title: "Vision Pipeline",
    subtitle: "Computer Vision → Structured Output",
    icon: <Eye size={20} strokeWidth={1.5} />,
    color: "#059669",
    desc: "How product images get processed: background removal via U²-Net, feature extraction via BLIP captioning, then constrained LLM prompting to produce structured JSON listings.",
    steps: ["Input image", "U²-Net background removal", "BLIP image captioning", "Constrained LLM output"],
  },
  {
    id: "ml",
    title: "ML Inference",
    subtitle: "Financial Prediction Pipeline",
    icon: <BarChart2 size={20} strokeWidth={1.5} />,
    color: "#D97706",
    desc: "How the Smart Financial Agent processes transactions: Pandas preprocessing → feature engineering → Scikit-learn model inference → natural language summary generation.",
    steps: ["Raw transactions", "Pandas preprocessing", "Feature engineering", "Scikit-learn inference", "NL summary"],
  },
];

const PROJECT_DEMOS = [
  {
    id: "krafti",
    name: "Krafti",
    tag: "AI Product",
    color: "#4F46E5",
    icon: <Zap size={24} strokeWidth={1.5} />,
    metrics: [
      { label: "Images processed", value: "50+" },
      { label: "Avg pipeline time", value: "~3s" },
      { label: "Fallback success", value: "100%" },
    ],
    architecture: "Image → U²-Net → BLIP → Groq LLM → Structured JSON",
    insight: "The key insight was using constrained prompting with a strict JSON schema, this eliminated hallucinated fields entirely.",
  },
  {
    id: "finagent",
    name: "Financial Agent",
    tag: "ML Analytics",
    color: "#059669",
    icon: <TrendingUp size={24} strokeWidth={1.5} />,
    metrics: [
      { label: "Transactions analyzed", value: "10K+" },
      { label: "Model accuracy", value: "80%+" },
      { label: "Data cleaning reduction", value: "40%" },
    ],
    architecture: "CSV → Pandas → Feature Eng → Scikit-learn → Insights",
    insight: "Automated feature engineering from raw transaction timestamps caught spending patterns that manual analysis missed.",
  },
];

function ConceptCard({ card, isActive, onClick }: { card: typeof CONCEPT_CARDS[0]; isActive: boolean; onClick: () => void }) {
  return (
    <motion.div onClick={onClick} whileHover={{ y: -2 }}
      style={{ padding: "22px 24px", borderRadius: "var(--radius-lg)", border: `1px solid ${isActive ? card.color + "60" : "var(--color-border)"}`, background: isActive ? `${card.color}08` : "var(--color-surface)", cursor: "pointer", transition: "all 0.2s ease", boxShadow: isActive ? `0 0 0 2px ${card.color}20` : "none" }}>
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
<span style={{ color: card.color }}>{card.icon}</span>        <div>
          <p style={{ fontSize: 14, fontWeight: 700, color: isActive ? card.color : "var(--color-ink)", letterSpacing: "-0.01em" }}>{card.title}</p>
          <p style={{ fontSize: 11, color: "var(--color-ink-4)", marginTop: 2 }}>{card.subtitle}</p>
        </div>
      </div>
      <p style={{ fontSize: 13, color: "var(--color-ink-3)", lineHeight: 1.6, letterSpacing: "-0.005em" }}>{card.desc}</p>

      <AnimatePresence>
        {isActive && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginTop: 16, overflow: "hidden" }}>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--color-ink-4)", marginBottom: 10 }}>Pipeline steps</p>
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
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--color-ink)", marginBottom: 10 }}>Exploring AI Workflows</h2>
            <p style={{ fontSize: 15, color: "var(--color-ink-3)", letterSpacing: "-0.01em" }}>Interactive deep-dives into the architecture and insights behind real projects.</p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }} className="playground-grid">

            {/* Left — AI Concept Cards */}
            <motion.div variants={staggerContainer} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-ink-4)", marginBottom: 6 }}>AI Concepts, click to expand</p>
              {CONCEPT_CARDS.map((card) => (
                <ConceptCard key={card.id} card={card} isActive={activeCard === card.id}
                  onClick={() => setActiveCard(activeCard === card.id ? null : card.id)} />
              ))}
            </motion.div>

            {/* Right — Project deep-dive */}
            <motion.div variants={fadeUp} style={{ display: "flex", flexDirection: "column", gap: 12, position: "sticky", top: 100 }}>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-ink-4)", marginBottom: 6 }}>Project deep-dive</p>

              {/* Tab switcher */}
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
<span style={{ color: demo.color }}>{demo.icon}</span>                    <div>
                      <span style={{ fontSize: 10, fontWeight: 600, color: demo.color, letterSpacing: "0.06em", textTransform: "uppercase" }}>{demo.tag}</span>
                      <h3 style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--color-ink)" }}>{demo.name}</h3>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                    {demo.metrics.map((m) => (
                      <div key={m.label} style={{ padding: "14px", borderRadius: "var(--radius-md)", background: "var(--color-bg-subtle)", border: "1px solid var(--color-border)", textAlign: "center" }}>
                        <p style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", color: demo.color }}>{m.value}</p>
                        <p style={{ fontSize: 10, color: "var(--color-ink-4)", marginTop: 3, lineHeight: 1.4 }}>{m.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Architecture */}
                  <div style={{ padding: "14px 16px", borderRadius: "var(--radius-md)", background: "var(--color-bg-muted)", border: "1px solid var(--color-border)" }}>
                    <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--color-ink-4)", marginBottom: 8 }}>Architecture</p>
                    <p style={{ fontSize: 13, color: demo.color, fontFamily: "var(--font-mono, monospace)", letterSpacing: "0.01em", lineHeight: 1.6 }}>{demo.architecture}</p>
                  </div>

                  {/* Key insight */}
                  <div style={{ padding: "16px 18px", borderRadius: "var(--radius-md)", background: `${demo.color}08`, border: `1px solid ${demo.color}25` }}>
                    <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: demo.color, marginBottom: 8 }}>Key Insight</p>
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
