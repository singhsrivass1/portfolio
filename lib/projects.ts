import type { StaticImageData } from "next/image";

import kajalBookingPhone from "@/public/images/work/kajal-booking-phone.webp";
import kajalBooking from "@/public/images/work/kajal-booking.webp";
import oasisReviewsPhone from "@/public/images/work/oasis-reviews-phone.webp";
import oasisReviews from "@/public/images/work/oasis-reviews.webp";

/**
 * Projects, in order of engineering depth (not date).
 *
 * Rules for this file:
 * - Every sentence must describe the code as it is today. Planned work is
 *   labelled planned, and lives in the case studies, not here.
 * - Roles are explicit. Never imply sole ownership of team work.
 * - `caseStudy.ready` stays false until that case study's evidence is
 *   verified (see docs/portfolio-2/HANDOFF.md). While false, links point
 *   to the code instead of an unfinished page.
 */

export type Link = { label: string; href: string };

export type Figure = {
  src: StaticImageData;
  alt: string;
  caption: string;
  /** CSS aspect-ratio of the frame the screenshot is cropped into. */
  aspect: string;
  /** CSS object-position for that crop. */
  position: string;
  /**
   * A tighter crop of the same screenshot for screens under 640 px, where a
   * full dashboard would be unreadable. Cut from the original, not redrawn.
   */
  small?: { src: StaticImageData };
};

export type Project = {
  slug: string;
  number: string;
  name: string;
  tier: "feature" | "brief";
  /** One line, set in italic serif on the homepage. */
  lede: string;
  /** Short description for the project index and brief entries. */
  short: string;
  /** Homepage paragraph for featured projects. */
  summary?: string;
  role: string;
  year: string;
  status: string;
  stack: string[];
  facts?: { value: string; label: string }[];
  links: Link[];
  repo: string;
  caseStudy?: { href: string; ready: boolean };
  figure?: Figure;
};

export const projects: Project[] = [
  {
    slug: "oasis",
    number: "01",
    name: "Oasis",
    tier: "feature",
    lede: "Security review for GitHub pull requests that proposes a patch, then waits for a person.",
    short: "Security review for GitHub pull requests that waits for a person.",
    summary:
      "A GitHub App receives pull-request webhooks, fetches the diff with a short-lived installation token and asks Gemini for a finding in a fixed schema. Each finding moves through five states the server enforces. Nothing reaches the repository until a person approves it, and even then Oasis opens a separate pull request instead of merging.",
    role: "Built alone",
    year: "2026",
    status: "Live",
    stack: ["Python", "FastAPI", "PostgreSQL on Supabase", "GitHub App API", "Gemini", "Flutter web"],
    facts: [
      { value: "16", label: "API endpoints" },
      { value: "5", label: "Finding states" },
      { value: "0", label: "Merges by Oasis" },
    ],
    links: [
      { label: "Live", href: "https://oasis-cra.vercel.app" },
      { label: "Backend code", href: "https://github.com/singhsrivass1/oasis_backend" },
      { label: "Dashboard code", href: "https://github.com/singhsrivass1/oasis_frontend" },
    ],
    repo: "https://github.com/singhsrivass1/oasis_backend",
    caseStudy: { href: "/work/oasis", ready: true },
    figure: {
      src: oasisReviews,
      alt: "Oasis reviews list. Pull request 1, Create qwe.py, approved with high severity. Pull request 2, titled Oasis fix: Direct SQL concatenation leads to injection, opened by the Oasis bot and still open.",
      caption:
        "Fig. 1. A pull request with a high-severity finding, and the separate fix PR Oasis opened after a person approved it.",
      aspect: "1525 / 330",
      position: "50% 0%",
      small: { src: oasisReviewsPhone },
    },
  },
  {
    slug: "kajal-cartel",
    number: "02",
    name: "Kajal Cartel",
    tier: "feature",
    lede: "A bridal makeup-artist marketplace: match a reference photo to artists, price a wedding party, book a slot.",
    short: "Bridal makeup-artist marketplace: match, price, book.",
    summary:
      "Built alone in Next.js and MongoDB. The server prices every booking itself, re-checks the slot before accepting it, and drops any artist the AI suggests who isn’t in the active roster.",
    role: "Built alone",
    year: "2026",
    status: "Live, demonstration data",
    stack: ["Next.js 14", "TypeScript", "MongoDB with Mongoose", "NextAuth", "Gemini", "Resend"],
    links: [
      { label: "Live", href: "https://kajal-cartel.vercel.app" },
      { label: "Code", href: "https://github.com/singhsrivass1/Kajal-Cartel" },
    ],
    repo: "https://github.com/singhsrivass1/Kajal-Cartel",
    caseStudy: { href: "/work/kajal-cartel", ready: true },
    figure: {
      src: kajalBooking,
      alt: "Kajal Cartel booking panel: a selected bridal look at 75,000 rupees, three bridesmaids with a 10 percent party discount, and a date and time picker.",
      caption: "Fig. 2. Booking panel: service, party pricing, date and time. Demonstration data.",
      aspect: "1 / 1",
      position: "79% 50%",
      small: { src: kajalBookingPhone },
    },
  },
  {
    slug: "docuquery",
    number: "03",
    name: "DocuQuery",
    tier: "brief",
    lede: "Questions over long technical PDFs, answered with page citations.",
    short: "Questions over long technical PDFs, answered with page citations.",
    summary:
      "Keyword and vector search combined by reciprocal rank fusion. Without an API key it still returns the best matching passage.",
    role: "Team project with Shreya and Rishu, shared contributions",
    year: "2026",
    status: "Code",
    stack: ["Python", "Streamlit", "LangChain", "FAISS", "BM25", "sentence-transformers", "Groq"],
    links: [{ label: "Code", href: "https://github.com/singhsrivass1/DocuQuery" }],
    repo: "https://github.com/singhsrivass1/DocuQuery",
  },
  {
    slug: "krafti",
    number: "04",
    name: "Krafti",
    tier: "brief",
    lede: "One product photo in, a marketplace listing out.",
    short: "One product photo in, a marketplace listing out.",
    summary:
      "I built the FastAPI service: background removal, image clean-up, a BLIP caption, then a title and description from a Groq-hosted model. If background removal or the model call fails, it falls back instead of erroring.",
    role: "Hackathon team; I built the FastAPI AI service",
    year: "2026",
    status: "Code",
    stack: ["FastAPI", "rembg (U2-Net)", "Pillow", "BLIP", "Groq"],
    links: [{ label: "Code", href: "https://github.com/singhsrivass1/Krafti-Digital-Merchandising-Gap" }],
    repo: "https://github.com/singhsrivass1/Krafti-Digital-Merchandising-Gap",
  },
];

export const featured = projects.filter((p) => p.tier === "feature");
export const brief = projects.filter((p) => p.tier === "brief");

/** A project by slug. Throws at build time if the slug is wrong. */
export function getProject(slug: string): Project {
  const project = projects.find((p) => p.slug === slug);
  if (!project) throw new Error(`Unknown project: ${slug}`);
  return project;
}
