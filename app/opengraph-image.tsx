import { ImageResponse } from "next/og";

import { shareImage } from "@/lib/metadata";
import { site } from "@/lib/site";

/*
 * The site's share image, in the site's own style: paper ground, ink type,
 * a 1 px ink rule, Newsreader for the line and IBM Plex for the name.
 * No accent, no pills, nothing rounded. Generated once, at build time.
 */

export const alt = shareImage.alt;
export const size = { width: shareImage.width, height: shareImage.height };
export const contentType = "image/png";

const PAPER = "#f3f0e8";
const INK = "#16140f";
const MUTED = "#645f55";

const NAME = site.name;
const LINES = ["I build backend systems and", "AI-powered products."];
const DOMAIN = new URL(site.url).host;

/**
 * A TrueType subset of a Google font holding only the glyphs in `text`.
 * ImageResponse reads TTF or OTF, and next/font only ships WOFF2, so this
 * asks the Google Fonts CSS API directly. Returns null on any failure; the
 * image then falls back to the default sans instead of failing the build.
 */
async function googleFont(family: string, text: string): Promise<ArrayBuffer | null> {
  try {
    const cssUrl = `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(cssUrl)).text();
    const fontUrl = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!fontUrl) return null;
    const response = await fetch(fontUrl);
    return response.ok ? await response.arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function Image() {
  const [serif, sans, mono] = await Promise.all([
    googleFont("Newsreader:opsz,wght@72,300", LINES.join(" ")),
    googleFont("IBM+Plex+Sans:wght@500", NAME),
    googleFont("IBM+Plex+Mono:wght@400", DOMAIN),
  ]);

  const fonts = [
    serif && { name: "Newsreader", data: serif, weight: 300 as const, style: "normal" as const },
    sans && { name: "Plex Sans", data: sans, weight: 500 as const, style: "normal" as const },
    mono && { name: "Plex Mono", data: mono, weight: 400 as const, style: "normal" as const },
  ].filter((font) => font !== null);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px 76px",
          background: PAPER,
          color: INK,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            paddingTop: 22,
            borderTop: `1px solid ${INK}`,
          }}
        >
          <div style={{ display: "flex", fontFamily: "Plex Sans", fontSize: 30, fontWeight: 500 }}>{NAME}</div>
          <div style={{ display: "flex", fontFamily: "Plex Mono", fontSize: 22, color: MUTED, letterSpacing: "0.02em" }}>
            {DOMAIN}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "Newsreader",
            fontSize: 84,
            fontWeight: 300,
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
          }}
        >
          {LINES.map((line) => (
            <div key={line} style={{ display: "flex" }}>
              {line}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
