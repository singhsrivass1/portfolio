import CaseHeader from "@/components/case/CaseHeader";
import Contents from "@/components/case/Contents";
import Figure from "@/components/case/Figure";
import Section, { H3, Prose } from "@/components/case/Section";
import Source from "@/components/case/Source";
import styles from "@/components/case/case.module.css";
import { pageMetadata } from "@/lib/metadata";
import { getProject } from "@/lib/projects";
import kajalBookingPhone from "@/public/images/work/kajal-booking-phone.webp";
import kajalBooking from "@/public/images/work/kajal-booking.webp";
import kajalHome from "@/public/images/work/kajal-home.webp";
import kajalMatch from "@/public/images/work/kajal-match.webp";

/*
 * Kajal Cartel case study. Every claim is traced to a file in
 * github.com/singhsrivass1/Kajal-Cartel (main) and named in a Source note.
 * See docs/portfolio-2/HANDOFF.md, Stage 3. The Kajal Cartel code is not
 * being changed, so nothing here promises a fix.
 */

const project = getProject("kajal-cartel");
const repo = project.repo;

export const metadata = pageMetadata({
  title: "Kajal Cartel",
  description:
    "Case study: a bridal makeup-artist marketplace, built alone in Next.js and MongoDB. Photo matching against the active roster, server-side pricing, and where its booking checks stop.",
  path: "/work/kajal-cartel",
  type: "article",
});

const contents = [
  { id: "problem", title: "Problem" },
  { id: "match-price-book", title: "Match, price, book" },
  { id: "booking-consistency", title: "Booking consistency" },
  { id: "accounts-and-admin", title: "Accounts and admin" },
  { id: "limits", title: "Limits" },
];

const consistency = [
  {
    case: "Sequential overlap: a request overlaps a booking that is already saved, for any service",
    result: "Refused",
    why: "The re-check on submit reads every active booking the artist has that day.",
  },
  {
    case: "Identical slot: two requests for the same artist, service, date and start time",
    result: "One is saved, the other refused",
    why: "A partial unique index on artist, service, date and start time, over active bookings.",
  },
  {
    case: "Simultaneous requests for different services, or for times that overlap but start differently",
    result: "Both can succeed",
    why: "Both requests read the day as free before either writes, and the index matches identical slots only.",
  },
];

export default function KajalCartelPage() {
  return (
    <main id="main" className="wrap">
      <CaseHeader
        project={project}
        facts={[
          { label: "Stack", value: "Next.js 14, TypeScript, MongoDB with Mongoose" },
          { label: "Services", value: "NextAuth, Gemini, Resend" },
          { label: "Status", value: project.status },
        ]}
      />

      <aside className={styles.disclosure} aria-labelledby="disclosure-title">
        <p id="disclosure-title" className="label">
          Note
        </p>
        <p>
          Kajal Cartel runs on demonstration data: its artists, services and prices are seeded for the demo, not a
          real business. Its 40 photographs are AI-generated (C2PA content credentials: 16 OpenAI, 24 Google) and show
          no real artists, customers or work. This page uses interface screenshots, and the one photograph shown is
          labelled.
        </p>
      </aside>

      <div className={`grid ${styles.body}`}>
        <Contents items={contents} />

        <div className={styles.content}>
          <Figure
            number={1}
            className={styles.leadFigure}
            src={kajalBooking}
            small={kajalBookingPhone}
            crop={{ aspect: "1 / 1", position: "79% 50%" }}
            captionSide
            sizes="(max-width: 1023px) 100vw, 640px"
            alt="Kajal Cartel booking panel: a selected bridal look at 75,000 rupees, three bridesmaids with a 10 percent party discount, and a date and time picker."
            caption="Booking panel: a selected look, three bridesmaids at the 10 percent party tier, then a date and a time. Demonstration data."
          />

          <Section
            id="problem"
            number={1}
            title="Problem"
            statement="Choosing a bridal makeup artist means matching a look, pricing a whole wedding party and finding a free date, usually across separate conversations."
          >
            <Prose>
              <p>
                Kajal Cartel puts the three steps on one site. A customer uploads a photo of a look they like and gets
                artists from the roster, picks a service and adds the party, sees the price, and requests a free slot.
              </p>
              <p>
                The work that matters is on the server. It prices every booking itself, checks the slot again before
                it accepts a request, and drops any artist the AI suggests who is not on the active roster. This page
                describes those parts, and where they stop.
              </p>
            </Prose>
          </Section>

          <Section
            id="match-price-book"
            number={2}
            title="Match, price, book"
            statement="The browser asks. The server decides who matches, what it costs and whether the slot is free."
          >
            <H3>Match</H3>
            <Prose>
              <p>
                The customer uploads a reference photo. The server builds the prompt from the active roster only and
                asks Gemini for three artists. If a model call fails or returns nothing, it tries the next of three
                Gemini models in order.
              </p>
              <p>
                The reply is checked before anyone sees it. An artist the model names who is not in the active roster
                is dropped, and each confidence score is clamped to the range 0 to 1.
              </p>
            </Prose>
            <Source repo={repo} files={["src/app/api/match/route.ts", "src/lib/ai/gemini.ts", "src/lib/ai/rosterBrief.ts"]} />
            <Figure
              number={2}
              src={kajalMatch}
              crop={{ aspect: "1524 / 812", position: "50% 100%" }}
              alt="Kajal Cartel style-matching page: the heading Find Your Artist, a line inviting an upload of any look the customer loves, and an upload panel titled Show us what inspires you."
              caption="Style matching. The uploaded photo goes to the server, which asks Gemini to choose from the active roster."
            />

            <H3>Price</H3>
            <Prose>
              <p>
                The browser sends which services and how many people, never a price. The server looks up each service
                and applies the largest party discount whose head count the request reaches: the three bridesmaids in
                Fig. 1 reach the 10 percent tier. The booking stores the server’s figures as a price snapshot.
              </p>
            </Prose>
            <Source repo={repo} files={["src/lib/db/controllers/ServiceManager.ts", "src/app/api/estimate/route.ts"]} />

            <H3>Book</H3>
            <Prose>
              <p>
                A day’s free slots come from the artist’s working hours, blocked dates and every active booking that
                artist has that day, whatever the service. Each slot lasts as long as the service plus its buffer.
              </p>
              <p>
                On submit the server works out the day’s slots again and refuses the request if the chosen slot is no
                longer among them. Each request also carries an idempotency key: sending the same key again returns
                the booking already made instead of creating a second one, and no second email goes out.
              </p>
            </Prose>
            <Source
              repo={repo}
              files={[
                "src/lib/db/controllers/AvailabilityManager.ts",
                "src/lib/db/controllers/BookingManager.ts",
                "src/app/api/book/route.ts",
              ]}
            />
          </Section>

          <Section
            id="booking-consistency"
            number={3}
            title="Booking consistency"
            statement="Whether a clash is refused depends on timing."
          >
            <Prose>
              <p>
                Two booking requests for the same artist on the same day can clash in three ways. The server refuses
                two of them.
              </p>
            </Prose>
            <table className={styles.table}>
              <caption className="meta">Active bookings are those pending or confirmed.</caption>
              <thead>
                <tr>
                  <th scope="col" style={{ width: "40%" }}>
                    Case
                  </th>
                  <th scope="col" style={{ width: "20%" }}>
                    Result
                  </th>
                  <th scope="col">What decides it</th>
                </tr>
              </thead>
              <tbody>
                {consistency.map((row) => (
                  <tr key={row.case}>
                    <th scope="row" data-label="Case">
                      <span>{row.case}</span>
                    </th>
                    <td data-label="Result">
                      <span>{row.result}</span>
                    </td>
                    <td data-label="Decided by">
                      <span>{row.why}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Prose>
              <p>
                Nothing makes two requests wait for each other: the booking code uses no database transactions and no
                scheduling locks. So an artist can receive two overlapping pending bookings if the requests arrive
                together.
              </p>
            </Prose>
            <Source
              repo={repo}
              files={[
                "src/lib/db/controllers/BookingManager.ts",
                "src/lib/db/models/Booking.ts",
                "src/lib/db/controllers/AvailabilityManager.ts",
              ]}
            />
          </Section>

          <Section
            id="accounts-and-admin"
            number={4}
            title="Accounts and admin"
            statement="A password account needs a confirmed email. Admin needs two separate conditions."
          >
            <Prose>
              <p>
                <strong>Password sign-up is confirmed by email.</strong> The link works once and expires after 24
                hours, and only its hash is stored. It is consumed in one atomic find-and-delete, and only in the
                browser that started the sign-up, which holds a matching cookie. If the confirmation email cannot be
                sent, the pending sign-up is deleted and the request fails.
              </p>
            </Prose>
            <Source
              repo={repo}
              files={[
                "src/lib/auth/passwordSignup.ts",
                "src/app/api/auth/signup/route.ts",
                "src/app/api/auth/verify-email/route.ts",
              ]}
            />
            <Prose>
              <p>
                <strong>Admin access needs an admin role in the database and a linked Google account.</strong> Every
                admin API route checks both on the server before it runs.
              </p>
              <p>
                <strong>Rate limits</strong> cover 12 customer and sign-in API routes directly, including sign-up,
                email confirmation, password reset, matching, estimates and booking. Every admin route has a limit too,
                applied by the same wrapper that checks admin access.
              </p>
            </Prose>
            <Source repo={repo} files={["src/lib/auth/admin.ts", "src/lib/api/adminRoute.ts", "src/lib/api/rateLimit.ts"]} />
          </Section>

          <Section id="limits" number={5} title="Limits" statement="Where it stops.">
            <Prose>
              <ul>
                <li>
                  <strong>Simultaneous booking requests.</strong> Overlapping requests that arrive together can both
                  be accepted, as set out in section 3. There are no transactions or scheduling locks.
                </li>
                <li>
                  <strong>Rate limits live in memory.</strong> Each server instance keeps its own counts and a cold
                  start resets them, so on serverless hosting the limits slow casual abuse but are not a hard ceiling.
                </li>
                <li>
                  <strong>Demonstration data.</strong> The artists, services and prices are seeded for the demo.
                </li>
                <li>
                  <strong>AI-generated photographs.</strong> All 40 photographs on the site are AI-generated: their
                  C2PA content credentials name OpenAI for 16 and Google for 24. None shows a real artist’s work or
                  real customers.
                </li>
              </ul>
            </Prose>
            <Source repo={repo} files={["src/lib/api/rateLimit.ts", "src/lib/db/seed/data.ts"]} />
            <Figure
              number={3}
              src={kajalHome}
              alt="Kajal Cartel homepage: the heading Find Your Artist and a Start matching button over an AI-generated photograph of women in bridal wear."
              caption="Homepage. The photograph is an AI-generated illustration (C2PA: OpenAI). It shows no real people and no real work."
            />
          </Section>
        </div>
      </div>
    </main>
  );
}
