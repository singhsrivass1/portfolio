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

Case-study links are gated by `caseStudy.ready` in `lib/projects.ts`. While
it is `false`, the homepage and index link to the code instead. It is now
`true` for both Oasis and Kajal Cartel (Stages 2 and 3).

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

Decision change (6 November 2026): the Oasis and Kajal Cartel codebases will
not be modified. The earlier publish conditions (webhook signature patch,
a passing `pytest` run pasted into the page, a Render redeploy, a replaced
finding screenshot) are dropped. The case study describes the code as it is
today, using only the facts below, which were checked in `oasis_backend`
(5affe31) and `oasis_frontend` (53ea098) on `main`.

Done: `app/work/oasis/page.tsx`, with `Lifecycle.tsx` (client component),
`SystemFlow.tsx` and `oasis.module.css` beside it. `caseStudy.ready` is
`true`.

- Lede: "A GitHub App that reviews pull requests for security problems,
  proposes a patch, and waits for a person before it changes anything."
- Facts: 2026; built alone; backend Python, FastAPI, Pydantic, PostgreSQL on
  Supabase; integrations GitHub App API, Gemini; dashboard Flutter web.
- Fig. 1 `oasis-overview.webp`; Fig. 2 `oasis-reviews.webp` with the phone
  crop `oasis-reviews-phone.webp`.
- Sections: Problem; System (intake and decision flows drawn in HTML and
  CSS, the two person steps in oxide); Lifecycle (state tabs with a detail
  panel, the `ALLOWED_TRANSITIONS` table, the six-step approval-gated fix);
  Decisions (structured model reply, server-side state machine, two install
  paths, no merge path, each with its file); Evidence; Limits.
- Evidence: 16 endpoints under `/api/v1` plus health and the webhook; 57
  backend test functions in 12 files, run against an in-memory database
  fake; 17 test files in the Flutter dashboard. The page does not say the
  tests pass: no run was recorded.
- Limits: webhooks handled inside the request with async I/O, no queue and
  no retry; one finding per pull request; the model's severity is not
  checked against the five allowed values before it is stored.
- Webhook signatures are not mentioned anywhere on the page.

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
- Kajal Cartel concurrency gap and Oasis webhook signatures: the codebases
  will not be changed, so neither is planned work for the portfolio.
