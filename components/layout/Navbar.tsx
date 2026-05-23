"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Journey", href: "#Journey" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(prefersDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "16px 24px" }}      >
        <div
  style={{
    maxWidth: 1100, margin: "0 auto",
    padding: "0",
    display: "flex", alignItems: "center", justifyContent: "flex-end",
    background: "transparent",
    border: "none",
    boxShadow: "none",
  }}
>
          

<nav style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: "auto" }} className="nav-desktop">            {navLinks.map((link) => (
              <a key={link.label} href={link.href}
                onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
style={{ fontSize: 16, fontWeight: 500, color: "var(--color-ink-3)", padding: "10px 16px", borderRadius: "var(--radius-md)", transition: "all 0.2s ease", letterSpacing: "-0.01em" }}                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "var(--color-ink)"; (e.target as HTMLElement).style.background = "var(--color-bg-subtle)"; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "var(--color-ink-3)"; (e.target as HTMLElement).style.background = "transparent"; }}
              >{link.label}</a>
            ))}
            <button onClick={() => setDark(!dark)} aria-label="Toggle dark mode"
              style={{ marginLeft: 8, width: 34, height: 34, borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", background: "var(--color-surface)", color: "var(--color-ink-3)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, transition: "all 0.2s ease", boxShadow: "var(--shadow-xs)", flexShrink: 0 }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--color-bg-subtle)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--color-surface)"; }}
            >{dark ? (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
) : (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
)}</button>
          </nav>

          <button onClick={() => setMenuOpen(!menuOpen)} className="nav-mobile-btn" aria-label="Toggle menu"
            style={{ width: 34, height: 34, borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", background: "var(--color-surface)", cursor: "pointer", display: "none", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 5, padding: 8 }}>
            <span style={{ display: "block", width: 16, height: 1.5, background: "var(--color-ink)", borderRadius: 2, transition: "all 0.2s ease", transform: menuOpen ? "rotate(45deg) translateY(3.5px)" : "none" }} />
            <span style={{ display: "block", width: 16, height: 1.5, background: "var(--color-ink)", borderRadius: 2, transition: "all 0.2s ease", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: "block", width: 16, height: 1.5, background: "var(--color-ink)", borderRadius: 2, transition: "all 0.2s ease", transform: menuOpen ? "rotate(-45deg) translateY(-3.5px)" : "none" }} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ position: "fixed", top: 80, left: 16, right: 16, zIndex: 99, background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-xl)", padding: 16, boxShadow: "var(--shadow-lg)" }}>
            {navLinks.map((link) => (
              <a key={link.label} href={link.href}
                onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                style={{ display: "block", padding: "12px 16px", fontSize: 15, fontWeight: 500, color: "var(--color-ink-2)", borderRadius: "var(--radius-md)", letterSpacing: "-0.01em" }}>
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 640px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
