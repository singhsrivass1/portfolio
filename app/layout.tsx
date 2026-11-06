import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Newsreader } from "next/font/google";

import Footer from "@/components/site/Footer";
import Header from "@/components/site/Header";
import { site } from "@/lib/site";

import "./globals.css";

const serif = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--nf-serif",
  display: "swap",
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--nf-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--nf-mono",
  display: "swap",
});

const description =
  "I build backend systems and AI-powered products. B.Tech in AI and ML at BIT Mesra, graduating June 2028.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}, software engineer`,
    template: `%s · ${site.name}`,
  },
  description,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: site.name,
    title: `${site.name}, software engineer`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name}, software engineer`,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#f3f0e8",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
