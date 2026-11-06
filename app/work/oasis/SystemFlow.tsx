import styles from "./oasis.module.css";

export type FlowStep = {
  /** Who or what acts: "GitHub", "Oasis", "Gemini", "Person". */
  kicker: string;
  title: React.ReactNode;
  detail?: React.ReactNode;
  /** A step a person takes, marked in oxide. */
  person?: boolean;
};

/** One flow, drawn as boxes joined by arrows. An ordered list underneath, so it reads in order without the drawing. */
export default function SystemFlow({ label, steps }: { label: string; steps: FlowStep[] }) {
  return (
    <ol className={styles.flow} aria-label={label}>
      {steps.map((step, i) => (
        <li key={i} className={`${styles.node} ${step.person ? styles.person : ""}`}>
          <span className={`label ${styles.nodeKicker}`}>{step.kicker}</span>
          <span className={styles.nodeTitle}>{step.title}</span>
          {step.detail && <span className={styles.nodeDetail}>{step.detail}</span>}
        </li>
      ))}
    </ol>
  );
}

export function PersonLegend() {
  return (
    <p className={`meta ${styles.legend}`}>
      <span className={styles.legendSwatch} aria-hidden="true" />
      Oxide marks a step a person takes.
    </p>
  );
}
