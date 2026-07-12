import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Srivass Kumar — Software Engineer & AI/ML Developer",
  description: "Third-year AI/ML student at BIT Mesra building backend systems, full-stack AI products, and solving problems through code.",
  keywords: "Srivass Kumar, AI ML developer, BIT Mesra, software engineering intern, Python FastAPI Next.js, machine learning, computer vision",
  authors: [{ name: "Srivass Kumar" }],
  creator: "Srivass Kumar",
  openGraph: {
    title: "Srivass Kumar — Software Engineer & AI/ML Developer",
    description: "Third-year AI/ML student at BIT Mesra building backend systems, full-stack AI products, and solving problems through code.",
    type: "website",
    locale: "en_IN",
    url: "https://srivxdev.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Srivass Kumar — Software Engineer & AI/ML Developer",
    description: "Third-year AI/ML student at BIT Mesra building backend systems and full-stack AI products.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body style={{ fontFamily: "var(--font-geist-sans, var(--font-sans))" }}>{children}</body>
    </html>
  );
}
