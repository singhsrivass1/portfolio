import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{
      minHeight: "100svh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      background: "var(--color-bg)",
    }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 480 }}>
        <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-accent)", margin: 0 }}>
          404
        </p>

        <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, letterSpacing: "-0.035em", color: "var(--color-ink)", lineHeight: 1.1, margin: 0 }}>
          Nothing here.
        </h1>

        <p style={{ fontSize: 16, color: "var(--color-ink-3)", lineHeight: 1.7, letterSpacing: "-0.01em", margin: 0 }}>
          This page does not exist. Might have been moved, deleted, or you typed something wrong.
        </p>

        <Link href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 14,
            fontWeight: 600,
            color: "#fff",
            background: "var(--color-accent)",
            padding: "11px 22px",
            borderRadius: "var(--radius-lg)",
            letterSpacing: "-0.01em",
            textDecoration: "none",
            width: "fit-content",
          }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M13 8H3M7 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to home
        </Link>
      </div>
    </main>
  );
}