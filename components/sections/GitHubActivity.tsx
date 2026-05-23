"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { Pin } from "lucide-react";
interface Repo {
  name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  html_url: string;
  updated_at: string;
  fork: boolean;
}

interface GitHubStats {
  public_repos: number;
  followers: number;
  following: number;
  name: string;
}

const LANG_COLORS: Record<string, string> = {
  Python: "#3572A5",
  TypeScript: "#2b7489",
  JavaScript: "#f1e05a",
  "C++": "#f34b7d",
  C: "#555555",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Jupyter: "#DA5B0B",
};

export default function GitHubActivity() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch("https://api.github.com/users/singhsrivass1"),
          fetch("https://api.github.com/users/singhsrivass1/repos?sort=updated&per_page=6"),
        ]);
        if (!userRes.ok || !reposRes.ok) throw new Error("fetch failed");
        const userData = await userRes.json();
        const reposData: Repo[] = await reposRes.json();
        setStats(userData);
        setRepos(reposData.filter((r) => !r.fork).slice(0, 6));
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section style={{ padding: "100px 24px", borderTop: "1px solid var(--color-border)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <motion.div variants={fadeUp} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: 10 }}>GitHub</p>
              <h2 style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--color-ink)" }}>What I'm building</h2>
            </div>
            <a href="https://github.com/singhsrivass1" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: "var(--color-ink-3)", padding: "8px 16px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", background: "var(--color-surface)", letterSpacing: "-0.01em", transition: "all 0.2s ease" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--color-bg-subtle)"; (e.currentTarget as HTMLElement).style.color = "var(--color-ink)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--color-surface)"; (e.currentTarget as HTMLElement).style.color = "var(--color-ink-3)"; }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>
              View all repos →
            </a>
          </motion.div>

          {/* Stats row */}
          {!loading && !error && stats && (
            <motion.div variants={fadeUp} style={{ display: "flex", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
              {[
                { label: "Public repos", value: stats.public_repos },
                { label: "Followers", value: stats.followers },
                { label: "Following", value: stats.following },
              ].map((s) => (
                <div key={s.label} style={{ padding: "14px 20px", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", background: "var(--color-surface)", minWidth: 100 }}>
                  <p style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.03em", color: "var(--color-ink)" }}>{s.value}</p>
                  <p style={{ fontSize: 12, color: "var(--color-ink-4)", marginTop: 2 }}>{s.label}</p>
                </div>
              ))}
            </motion.div>
          )}

          {/* Repo grid */}
          {loading && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 12 }}>
              {[...Array(6)].map((_, i) => (
                <div key={i} style={{ height: 140, borderRadius: "var(--radius-lg)", background: "var(--color-bg-muted)", animation: "shimmer 1.5s ease-in-out infinite", opacity: 0.6 }} />
              ))}
            </div>
          )}

          {error && (
            <div style={{ padding: 32, textAlign: "center", color: "var(--color-ink-4)", fontSize: 14, border: "1px dashed var(--color-border)", borderRadius: "var(--radius-xl)" }}>
              Could not load GitHub data. <a href="https://github.com/singhsrivass1" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-accent)" }}>View on GitHub →</a>
            </div>
          )}



          {!loading && !error && repos.length > 0 && (
            <motion.div variants={staggerContainer} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 12 }}>
              {repos.map((repo) => (
                <motion.a key={repo.name} variants={fadeUp} href={repo.html_url} target="_blank" rel="noopener noreferrer"
                  style={{ padding: "22px 24px", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", background: "var(--color-surface)", display: "flex", flexDirection: "column", gap: 10, transition: "all 0.2s ease", cursor: "pointer", textDecoration: "none" }}
                  whileHover={{ y: -2, boxShadow: "var(--shadow-md)", borderColor: "var(--color-border-strong)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "var(--color-ink)", letterSpacing: "-0.01em", fontFamily: "var(--font-mono, monospace)" }}>{repo.name}</p>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ color: "var(--color-ink-4)", flexShrink: 0 }}><path d="M4 12L12 4M12 4H6M12 4v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <p style={{ fontSize: 13, color: "var(--color-ink-3)", lineHeight: 1.55, letterSpacing: "-0.005em", flex: 1 }}>{repo.description || "No description"}</p>
                  <div style={{ display: "flex", gap: 14, alignItems: "center", marginTop: 4 }}>
                    {repo.language && (
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ width: 10, height: 10, borderRadius: "50%", background: LANG_COLORS[repo.language] || "#ccc", flexShrink: 0 }} />
                        <span style={{ fontSize: 12, color: "var(--color-ink-4)" }}>{repo.language}</span>
                      </div>
                    )}
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ color: "var(--color-ink-4)" }}><path d="M8 1l1.9 3.8L14 5.6l-3 2.9.7 4.1L8 10.8l-3.7 1.8.7-4.1L2 5.6l4.1-.8L8 1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /></svg>
                      <span style={{ fontSize: 12, color: "var(--color-ink-4)" }}>{repo.stargazers_count}</span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          )}

          <motion.div variants={fadeUp} style={{ marginTop: 16, padding: "16px 20px", borderRadius: "var(--radius-lg)", border: "1px dashed var(--color-border-strong)", display: "flex", alignItems: "center", gap: 10, color: "var(--color-ink-4)" }}>
<Pin size={16} strokeWidth={1.5} color="var(--color-ink-4)" />            <p style={{ fontSize: 13, letterSpacing: "-0.01em" }}>Projects coming soon, Actively building in 2026.</p>
          </motion.div>

        </motion.div>
      </div>
      <style>{`@keyframes shimmer { 0%,100% { opacity:0.4 } 50% { opacity:0.7 } }`}</style>
    </section>
  );
}
