# Portfolio 2.0 handoff

Read this before changing anything for Portfolio 2.0. It records what is built,
what is verified, what is still open, and the rules every change must follow.
Also read `AGENTS.md`: this repo runs Next.js 16, so check
`node_modules/next/dist/docs/` before using any Next API.

Approved design: Phase 4 boards on the "Portfolio 2.0 · Design" canvas
(Direction A, Annotated). Audit and fact checks: "Portfolio 2.0, Phase 1 & 2
Audit" doc. Both are private to Srivass.

## Rules

1. No em dashes and no en dashes in any user-facing text. Use a comma, a colon
   or a full stop. Ranges use "to" (2024 to 2028).
2. Every claim describes the code as it is today and can be traced to a file,
   a profile or a recorded run. Planned work is labelled planned.
3. Roles are explicit. Oasis and Kajal Cartel: built alone. DocuQuery: team
   project with Shreya and Rishu, shared contributions. Krafti: hackathon
   team; Srivass built the FastAPI AI service.
4. No unverified numbers. Not publishable today: DocuQuery "4/14 to 11/14",
   Krafti "50+ images" and "~3s", WhatsApp analyzer "100K+ messages",
   Kajal Cartel "16 APIs and 4 pages".
5. Kajal Cartel's 40 photographs are AI-generated (C2PA credentials: 16 OpenAI,
   24 Google). Lead with UI screenshots. Any photograph shown is captioned
   "AI-generated illustration" and the page states the data is demonstration
   data. Never present an image as a real artist's work or real customers.
6. No new dependencies without a reason written in the commit message. No
   production deploy or domain change without Srivass's explicit approval.
7. One theme (light), no radius, no shadows, no gradients. Oxide (`--oxide`)
   is the only accent and marks evidence and human decisions only.

## Stage 1: done on branch `portfolio-2/stage-1`

Built:

- `app/globals.css`: tokens (colour, type, spacing, layout, motion) and shared
  roles (`.wrap`, `.grid`, `.label`, `.meta`, `.link`, `.section`).
- `app/layout.tsx`: Newsreader, IBM Plex Sans and IBM Plex Mono via
  `next/font/google` (CSS variables `--nf-serif`, `--nf-sans`, `--nf-mono`,
  named to avoid Tailwind 4's `--font-*` theme variables), metadata with
  `metadataBase`, skip link, header, footer.
- `components/site/`: `Header` (client: current-page marking, full-screen
  phone menu with focus trap, Escape, scroll lock and focus return),
  `NavLink`, `Footer`.
- `components/home/`: `Hero`, `SelectedWork`, `About`, `Contact`.
- `app/work/page.tsx`: project index (a table on wide screens, labelled
  blocks under 768 px).
- `lib/site.ts` and `lib/projects.ts`: every fact in one place. Change facts
  there, not in components.
- `public/images/work/`: WebP screenshots, including tighter phone crops cut
  from the same screenshots.
- Restyled `app/not-found.tsx`.
- Removed: all old `components/sections/*`, `components/layout/Navbar.tsx`,
  `components/ui/AIVisual.tsx`, `lib/motion.ts`, `app/api/leetcode` (unused,
  and its fallback returned invented numbers).

Case-study links are gated: `caseStudy.ready` is `false` for Oasis and Kajal
Cartel, so the homepage and index link to the code until each case study is
published.

Verified in the cloud workspace (Next.js was not installable there):

- Compiled every file with esbuild and server-rendered `/` and `/work` with
  React 19, using stand-ins for `next/link`, `next/image`, `next/navigation`
  and `next/font/google`.
- In Chromium at 320, 390, 640, 834, 1024 and 1440 px: no horizontal
  overflow, one `h1` per page, all images load with alt text, no dash
  characters in visible text, standalone links at least 24 px tall (44 px for
  touch targets on phones).
- Phone menu, using the real `Header` component: opens, focus moves in, page
  scroll locks, Tab wraps, Escape closes and returns focus to "Menu".

Verified locally with the real Next.js 16.2.6 (Windows, 6 November 2026):

- `npm run lint`, `npm run build` and `npx tsc --noEmit` all pass.
  `Newsreader({ axes: ["opsz"] })` is accepted by `next/font`.
- `framer-motion`, `lucide-react` and `geist` uninstalled (none imported).
- `Header`: the `react-hooks/set-state-in-effect` lint error is fixed by
  storing the pathname the menu was opened on (`openOn`); the menu counts as
  open only on that pathname, so navigation closes it without an effect.
- In Chrome, `/` and `/work` at 390, 834 and 1440 px: no horizontal scroll,
  one `h1`, no dash characters, all images load. Phone menu opens, moves
  focus in, locks scroll, wraps Tab both ways, closes on Escape with focus
  back on "Menu", and closes after navigating. Skip link shows on first Tab.
- Fixed on `/work` under 768 px: the table caption shrank to a narrow
  column and the project description fell into the label column. The table
  is now a flex column with the caption last, and the project cell has one
  wrapper.

## Stage 2: Oasis case study (`/work/oasis`), board 7

Publish only when all of these hold, then set `caseStudy.ready = true`:

- [ ] Webhook signature patch merged in `oasis_backend` (missing secret 503,
      missing or bad signature 401, constant-time comparison kept).
- [ ] Full backend `pytest` run passes; paste its last line into section 5.
- [ ] Deployed to Render; a request with no signature now returns 401
      (before the fix it returned 200).
- [ ] The finding screenshot replaced with a real parameterised-query patch,
      or the figure dropped. The current one builds a string instead.

Content and layout: board 7. Sections: Problem, System (two flows drawn),
Lifecycle (client component: state chips with detail panel, transition table
from `ALLOWED_TRANSITIONS`, approval-gated fix flow), Decisions (each with its
file), Evidence (16 endpoints under `/api/v1`; backend test count after the
patch, 64 functions in 12 files; 17 dashboard test files), Limits (inline
webhook processing with no queue or retry; one finding per pull request;
severity not checked against the five values). The dashboard is Flutter web.

## Stage 3: Kajal Cartel case study (`/work/kajal-cartel`), board 8

Done: `app/work/kajal-cartel/page.tsx`, with shared case-study parts in
`components/case/` and `lib/metadata.ts`. `caseStudy.ready` is `true`.
Every passage names its files (checked against Kajal-Cartel `main`,
commit cf27762). Two corrections to the brief below, both checked in code:

- Rate limits: 12 customer and sign-in routes call the limiter directly,
  and all 9 admin routes are limited through `withAdmin`
  (`src/lib/api/adminRoute.ts`). The page says that, not "12 routes".
- The Kajal Cartel code will not be changed, so the page states the
  concurrency gap and does not promise a fix.

Original brief:

- Disclosure note at the top (demonstration data, AI-generated imagery).
- Match, price, book: three-model Gemini fallback, matches outside the
  active roster dropped, confidence clamped to 0 to 1; server-side pricing
  with tiered party discounts; availability from hours, blocked dates and
  every active booking across services; re-check on submit; idempotency key.
- Booking consistency table. Say exactly this: sequential overlaps are
  refused; an identical slot is blocked by a partial unique index on artist,
  service, date and start time; two simultaneous requests for different
  services or overlapping times can both succeed. No transactions, no
  scheduling locks. Fix is planned, not built.
- Accounts: email-verified password sign-up (hashed single-use 24-hour link,
  consumed atomically, only in the browser that started sign-up); pending
  sign-up deleted if the email cannot be sent; admin needs a database role
  and a linked Google account; 12 rate-limited API routes.

## Stage 4 onward

- Responsive pass on case studies; contents rail sticky from 1024 px.
- SEO: `app/sitemap.ts`, `app/robots.ts`, Person JSON-LD on `/`, redesigned
  `app/opengraph-image.tsx` (no pills, no indigo), per-page metadata.
- Host the final résumé at `public/resume.pdf` and set `site.resumeUrl` to
  `/resume.pdf`.
- README rewrite.
- QA: build, lint, types, Lighthouse, axe, link check, screenshots against
  the boards. Then ask before deploying.

## Open items

- DocuQuery: its history is one commit, so the code cannot show who wrote
  what. Keep it a credited team entry with no metrics and no case study.
- Smart Financial Agent: no repository found; needs a link before review.
- IEEE contest: name and year unconfirmed; keep unpublished.
- Kajal Cartel concurrency fix: optional, separate from the portfolio.
