import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Srivass Software Developer & AI/ML Engineer",
  description: "Software developer building AI-powered systems, backend infrastructure, and scalable products. B.Tech AI/ML student at BIT Mesra.",
  openGraph: {
    title: "Srivass Software Developer & AI/ML Engineer",
    description: "Building scalable software systems and practical AI-driven applications.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body style={{ fontFamily: "var(--font-geist-sans, var(--font-sans))" }}>{children}</body>
    </html>
  );
}
