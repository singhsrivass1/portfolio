import CaseHeader from "@/components/case/CaseHeader";
import Contents from "@/components/case/Contents";
import Figure from "@/components/case/Figure";
import Section, { H3, Prose } from "@/components/case/Section";
import Source from "@/components/case/Source";
import styles from "@/components/case/case.module.css";
import { pageMetadata } from "@/lib/metadata";
import { getProject } from "@/lib/projects";
import oasisOverview from "@/public/images/work/oasis-overview.webp";
import oasisReviewsPhone from "@/public/images/work/oasis-reviews-phone.webp";
import oasisReviews from "@/public/images/work/oasis-reviews.webp";

import Lifecycle from "./Lifecycle";
import own from "./oasis.module.css";
import SystemFlow, { PersonLegend, type FlowStep } from "./SystemFlow";

/*
 * Oasis case study. Facts come from oasis_backend and oasis_frontend (main),
 * as listed in docs/portfolio-2/HANDOFF.md, Stage 2. Nothing else.
 */

const project = getProject("oasis");
const backend = "https://github.com/singhsrivass1/oasis_backend";
const dashboard = "https://github.com/singhsrivass1/oasis_frontend";

const lede =
  "A GitHub App that reviews pull requests for security problems, proposes a patch, and waits for a person before it changes anything.";

export const metadata = pageMetadata({
  title: "Oasis",
  description: `Case study. ${lede} Built alone with FastAPI, PostgreSQL on Supabase and a Flutter web dashboard.`,
  path: "/work/oasis",
  type: "article",
});

const contents = [
  { id: "problem", title: "Problem" },
  { id: "system", title: "System" },
  { id: "lifecycle", title: "Lifecycle" },
  { id: "decisions", title: "Decisions" },
  { id: "evidence", title: "Evidence" },
  { id: "limits", title: "Limits" },
];

const intake: FlowStep[] = [
  { kicker: "GitHub", title: <code>pull_request</code>, detail: "event: opened or synchronize" },
  { kicker: "Oasis", title: <code>POST /webhook</code> },
  { kicker: "Oasis", title: "Fetch the diff", detail: "with an installation token" },
  { kicker: "Gemini", title: "Analysis", detail: "with a response schema, at temperature 0" },
  { kicker: "Oasis", title: "PostgreSQL and the PR", detail: "a finding and an activity row; a comment on the pull request" },
];

const decision: FlowStep[] = [
  { kicker: "Person", title: "Flutter dashboard", detail: "signed in with Supabase Auth", person: true },
  {
    kicker: "Oasis",
    // Break opportunities after the slashes, not inside a segment.
    title: <code>PATCH /api/v1/<wbr />findings/<wbr />{"{id}"}</code>,
    detail: "transition check, owner check",
  },
  { kicker: "Oasis", title: "Patch apply", detail: "branch from the PR head, commit, open a fix PR" },
  { kicker: "GitHub", title: "Fix PR", detail: "plus a comment on the original PR" },
  { kicker: "Person", title: "Merge", detail: "or not", person: true },
];

const transitions = [
  { from: "open", to: "awaiting_approval or dismissed" },
  { from: "awaiting_approval", to: "approved or dismissed" },
  { from: "approved", to: "resolved" },
  { from: "dismissed", to: "None, terminal" },
  { from: "resolved", to: "None, terminal" },
];

const fixSteps = [
  { text: "A person approves the finding in the dashboard.", actor: "Person" },
  { text: "Oasis creates a branch from the original pull request’s head.", actor: "Oasis" },
  { text: "It commits the proposed patch to that branch.", actor: "Oasis" },
  { text: "It opens the branch as a separate fix pull request.", actor: "Oasis" },
  { text: "It comments on the original pull request.", actor: "Oasis" },
  { text: "A person reviews the fix pull request, and merges it or not.", actor: "Person" },
];

export default function OasisPage() {
  return (
    <main id="main" className="wrap">
      <CaseHeader
        project={project}
        lede={lede}
        facts={[
          { label: "Backend", value: "Python, FastAPI, Pydantic, PostgreSQL on Supabase" },
          { label: "Integrations", value: "GitHub App API, Gemini" },
          { label: "Dashboard", value: "Flutter web" },
        ]}
      />

      <div className={`grid ${styles.body}`}>
        <Contents items={contents} />

        <div className={styles.content}>
          <Figure
            number={1}
            className={styles.leadFigure}
            src={oasisOverview}
            crop={{ aspect: "1535 / 829", position: "50% 100%" }}
            eager
            alt="Oasis dashboard overview: one protected repository, one open issue, a repository health table listing singhsrivass1/limca as reviewing, and a recent activity entry reading Security scan completed: Direct SQL concatenation leads to injection."
            caption="Overview for one connected repository after its first scan."
          />

          <Section
            id="problem"
            number={1}
            title="Problem"
            statement="Scanners hand you a list and leave the fixing to you. Automatic fixers change code nobody reviewed."
          >
            <Prose>
              <p>
                Oasis sits between the two. It finds a problem in a pull request, writes a fix and stops. A person
                approves the fix in the dashboard. Only then does Oasis open it, as a separate pull request, and a
                person decides whether to merge it.
              </p>
            </Prose>
          </Section>

          <Section
            id="system"
            number={2}
            title="System"
            statement="Two flows: one that finds and proposes, one that waits for a person."
          >
            <H3>Intake</H3>
            <SystemFlow label="Intake flow" steps={intake} />
            <Source repo={backend} files={["routes/webhook.py", "services/webhook.py", "services/analysis.py"]} />

            <H3>Decision</H3>
            <SystemFlow label="Decision flow" steps={decision} />
            <PersonLegend />
            <Source repo={backend} files={["routes/findings.py", "services/findings.py", "services/patch_apply.py"]} />
          </Section>

          <Section
            id="lifecycle"
            number={3}
            title="Lifecycle"
            statement="Every finding is in one of five states, and the server decides which moves are allowed."
          >
            <Prose>
              <p>Select a state to see who moves a finding into it, what happens there and where it can go next.</p>
            </Prose>
            <Lifecycle repo={backend} />

            <H3>Transitions</H3>
            <table className={styles.table}>
              <caption className="meta">
                From <code className={styles.code}>ALLOWED_TRANSITIONS</code> in schemas/finding.py. Any other move
                returns 422 <code className={styles.code}>INVALID_TRANSITION</code>. Asking for the state a finding is
                already in returns it unchanged.
              </caption>
              <thead>
                <tr>
                  <th scope="col" style={{ width: "40%" }}>
                    From
                  </th>
                  <th scope="col">Allowed next</th>
                </tr>
              </thead>
              <tbody>
                {transitions.map((t) => (
                  <tr key={t.from}>
                    <th scope="row" data-label="From">
                      <code className={styles.code}>{t.from}</code>
                    </th>
                    <td data-label="Next">
                      <span>{t.to}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <H3>The approval-gated fix</H3>
            <ol className={own.steps}>
              {fixSteps.map((step) => (
                <li key={step.text} className={`${own.step} ${step.actor === "Person" ? own.personStep : ""}`}>
                  <span>{step.text}</span>
                  <span className={own.stepActor}>{step.actor}</span>
                </li>
              ))}
            </ol>
            <Source repo={backend} files={["services/patch_apply.py", "routes/findings.py"]} />
            <Figure
              number={2}
              src={oasisReviews}
              small={oasisReviewsPhone}
              crop={{ aspect: "1525 / 330", position: "50% 0%" }}
              alt="Oasis reviews list. Pull request 1, Create qwe.py, approved with high severity. Pull request 2, titled Oasis fix: Direct SQL concatenation leads to injection, opened by the Oasis bot and still open."
              caption="PR #1 was approved; PR #2 is the fix Oasis opened as its own pull request, still open for a person."
            />
          </Section>

          <Section
            id="decisions"
            number={4}
            title="Decisions"
            statement="Four choices, each with the file that makes it."
          >
            <H3>The model replies with structured data</H3>
            <Prose>
              <p>
                Gemini is called with a response schema at temperature 0, and the reply is parsed into a Pydantic
                model: severity, file, line, title, description and patch. If parsing fails, the record is marked
                failed and the finding carries no patch.
              </p>
            </Prose>
            <Source repo={backend} files={["services/analysis.py", "schemas/webhook.py"]} />

            <H3>The state machine lives on the server</H3>
            <Prose>
              <p>
                The dashboard asks for a status. The server checks the move against the allowed transitions and checks
                that the finding belongs to the person asking, before it writes anything.
              </p>
            </Prose>
            <Source repo={backend} files={["services/findings.py", "schemas/finding.py"]} />

            <H3>Two install paths, one record</H3>
            <Prose>
              <p>
                The browser callback and the installation webhook both write the same installation record, so it does
                not matter which arrives first.
              </p>
            </Prose>
            <Source repo={backend} files={["routes/github.py", "routes/webhook.py"]} />

            <H3>No merge path</H3>
            <Prose>
              <p>Fixes ship as their own pull request. Nothing in Oasis merges.</p>
            </Prose>
            <Source repo={backend} files={["services/patch_apply.py"]} />
          </Section>

          <Section id="evidence" number={5} title="Evidence" statement="What the code contains, counted.">
            <dl className={own.numbers}>
              <div>
                <dt className="serif">16</dt>
                <dd>Endpoints under /api/v1, plus health and the webhook.</dd>
              </div>
              <div>
                <dt className="serif">57</dt>
                <dd>Backend test functions in 12 files, run against an in-memory database fake.</dd>
              </div>
              <div>
                <dt className="serif">17</dt>
                <dd>Test files in the Flutter dashboard.</dd>
              </div>
            </dl>
            <Source repo={backend} files={["main.py", "routes/", "tests/", "tests/conftest.py"]} label="Backend" />
            <Source repo={dashboard} files={["test/"]} label="Dashboard" />
          </Section>

          <Section id="limits" number={6} title="Limits" statement="Where it stops.">
            <Prose>
              <ul>
                <li>
                  <strong>No queue.</strong> Webhooks are handled inside the request with async I/O. There is no queue
                  and no retry.
                </li>
                <li>
                  <strong>One finding per pull request.</strong>
                </li>
                <li>
                  <strong>Severity is not checked.</strong> The model’s severity is not checked against the five allowed
                  values before it is stored.
                </li>
              </ul>
            </Prose>
            <Source repo={backend} files={["routes/webhook.py", "services/webhook.py", "schemas/webhook.py"]} />
          </Section>
        </div>
      </div>
    </main>
  );
}
