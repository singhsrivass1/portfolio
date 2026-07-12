import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Srivass - Software Engineer & AI/ML Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#FAFAF8",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle top border accent */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "#4F46E5", display: "flex" }} />

        {/* Availability badge */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 32,
        }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", display: "flex" }} />
          <span style={{ fontSize: 14, fontWeight: 600, color: "#4F46E5", letterSpacing: "0.05em", textTransform: "uppercase" }}>
            Open to internships
          </span>
        </div>

        {/* Name */}
        <div style={{ fontSize: 80, fontWeight: 700, color: "#18181A", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 16, display: "flex" }}>
          Srivass Kumar
        </div>

        {/* Role */}
        <div style={{ fontSize: 24, fontWeight: 500, color: "#6B6B6F", letterSpacing: "-0.01em", marginBottom: 40, display: "flex" }}>
          Software Engineer · AI/ML · Backend
        </div>

        {/* Chips */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {["Python", "FastAPI", "Next.js", "Machine Learning", "Computer Vision"].map((chip) => (
            <div key={chip} style={{
              fontSize: 14,
              fontWeight: 500,
              color: "#3A3A3C",
              padding: "6px 16px",
              borderRadius: 999,
              border: "1px solid #E5E4E0",
              background: "#FFFFFF",
              display: "flex",
            }}>
              {chip}
            </div>
          ))}
        </div>

        {/* Bottom — URL */}
        <div style={{ position: "absolute", bottom: 48, left: 80, fontSize: 14, color: "#9A9A9E", letterSpacing: "0.02em", display: "flex" }}>
          srivxdev.vercel.app
        </div>

        {/* Bottom right — BIT Mesra */}
        <div style={{ position: "absolute", bottom: 48, right: 80, fontSize: 14, color: "#9A9A9E", letterSpacing: "0.02em", display: "flex" }}>
          BIT Mesra · 2024-2028
        </div>
      </div>
    ),
    { ...size }
  );
}