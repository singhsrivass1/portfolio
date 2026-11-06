import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="wrap" style={{ paddingTop: "var(--s-9)", minHeight: "50vh" }}>
      <p className="label" style={{ margin: 0, color: "var(--muted)" }}>
        404
      </p>
      <h1
        className="serif"
        style={{ margin: "var(--s-5) 0 0", fontSize: "clamp(40px, 6vw, 76px)", fontWeight: 300, lineHeight: 1.06 }}
      >
        Nothing at this address.
      </h1>
      <p style={{ margin: "var(--s-5) 0 0", maxWidth: 520, color: "var(--ink-2)" }}>
        It may have moved while the site was being rebuilt.
      </p>
      <p style={{ margin: "var(--s-6) 0 0", fontSize: 15, display: "flex", gap: "var(--s-6)", flexWrap: "wrap" }}>
        <Link href="/" className="link">
          Home
        </Link>
        <Link href="/work" className="link">
          All work
        </Link>
      </p>
    </main>
  );
}
