"use client";

import { useRef, useState } from "react";

import styles from "./oasis.module.css";

/*
 * The five finding states, as enforced by oasis_backend:
 * schemas/finding.py (ALLOWED_TRANSITIONS) and services/findings.py.
 */

type StateId = "open" | "awaiting_approval" | "approved" | "resolved" | "dismissed";

type State = {
  id: StateId;
  /** Who moves a finding into this state. */
  actor: "Oasis" | "Person";
  who: string;
  what: string;
  next: StateId[];
  files: string[];
};

const STATES: State[] = [
  {
    id: "open",
    actor: "Oasis",
    who: "Oasis, when a pull request arrives.",
    what: "The finding is created before analysis, with no patch. If analysis fails, the finding stays here and the ingestion record is marked failed.",
    next: ["awaiting_approval", "dismissed"],
    files: ["services/webhook.py"],
  },
  {
    id: "awaiting_approval",
    actor: "Oasis",
    who: "Oasis, after a parsed analysis.",
    what: "Severity, file, line and a proposed patch are attached, and a comment is posted on the pull request. Then it waits.",
    next: ["approved", "dismissed"],
    files: ["services/webhook.py"],
  },
  {
    id: "approved",
    actor: "Person",
    who: "A person, in the dashboard.",
    what: "The approval is timestamped, and Oasis immediately branches from the pull request’s head, commits the patch and opens a separate fix pull request. If that fails, the approval stands, and the error is recorded on the finding and shown.",
    next: ["resolved"],
    files: ["services/findings.py", "services/patch_apply.py"],
  },
  {
    id: "resolved",
    actor: "Person",
    who: "A person.",
    what: "Terminal.",
    next: [],
    files: ["services/findings.py"],
  },
  {
    id: "dismissed",
    actor: "Person",
    who: "A person, from open or awaiting_approval.",
    what: "Terminal. No patch is applied.",
    next: [],
    files: ["services/findings.py"],
  },
];

const MAIN_PATH: StateId[] = ["open", "awaiting_approval", "approved", "resolved"];

export default function Lifecycle({ repo }: { repo: string }) {
  const [selected, setSelected] = useState<StateId>("open");
  const tabRefs = useRef<Partial<Record<StateId, HTMLButtonElement | null>>>({});
  const current = STATES.find((s) => s.id === selected) ?? STATES[0];

  function select(id: StateId, focus = false) {
    setSelected(id);
    if (focus) tabRefs.current[id]?.focus();
  }

  function onKeyDown(event: React.KeyboardEvent, index: number) {
    const last = STATES.length - 1;
    let target: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") target = index === last ? 0 : index + 1;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") target = index === 0 ? last : index - 1;
    else if (event.key === "Home") target = 0;
    else if (event.key === "End") target = last;
    if (target === null) return;
    event.preventDefault();
    select(STATES[target].id, true);
  }

  return (
    <div className={styles.lifecycle}>
      <div role="tablist" aria-label="Finding states" className={styles.chips}>
        {STATES.map((state, i) => (
          <Chip
            key={state.id}
            state={state}
            selected={state.id === selected}
            arrowBefore={i > 0 && MAIN_PATH.includes(state.id)}
            gapBefore={state.id === "dismissed"}
            onSelect={() => select(state.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
            buttonRef={(el) => {
              tabRefs.current[state.id] = el;
            }}
          />
        ))}
      </div>

      <div
        role="tabpanel"
        id="state-panel"
        aria-labelledby={`state-tab-${current.id}`}
        className={styles.panel}
      >
        <p className={styles.panelTitle}>{current.id}</p>
        <dl className={styles.panelList}>
          <dt className="meta">Who acts</dt>
          <dd>
            <span className={current.actor === "Person" ? styles.actorPerson : undefined}>{current.who}</span>
          </dd>
          <dt className="meta">What happens</dt>
          <dd>{current.what}</dd>
          <dt className="meta">Can move to</dt>
          <dd>
            {current.next.length === 0 ? (
              "Nothing. This state is final."
            ) : (
              <span className={styles.nextList}>
                {current.next.map((id) => (
                  <button key={id} type="button" className={styles.nextButton} onClick={() => select(id, true)}>
                    {id}
                  </button>
                ))}
              </span>
            )}
          </dd>
          <dt className="meta">Code</dt>
          <dd className={styles.files}>
            {current.files.map((file) => (
              <a
                key={file}
                href={`${repo}/blob/main/${file}`}
                title={`oasis_backend/${file}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {file}
              </a>
            ))}
          </dd>
        </dl>
      </div>
    </div>
  );
}

type ChipProps = {
  state: State;
  selected: boolean;
  arrowBefore: boolean;
  gapBefore: boolean;
  onSelect: () => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
  buttonRef: (el: HTMLButtonElement | null) => void;
};

function Chip({ state, selected, arrowBefore, gapBefore, onSelect, onKeyDown, buttonRef }: ChipProps) {
  return (
    <>
      {arrowBefore && (
        <span className={styles.chipArrow} aria-hidden="true">
          →
        </span>
      )}
      {gapBefore && (
        <span className={styles.chipGap} aria-hidden="true">
          or
        </span>
      )}
      <button
        ref={buttonRef}
        type="button"
        role="tab"
        id={`state-tab-${state.id}`}
        aria-selected={selected}
        aria-controls="state-panel"
        tabIndex={selected ? 0 : -1}
        className={`${styles.chip} ${state.actor === "Person" ? styles.person : ""}`}
        onClick={onSelect}
        onKeyDown={onKeyDown}
      >
        {state.id}
      </button>
    </>
  );
}
