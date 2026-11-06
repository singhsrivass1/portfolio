import styles from "./case.module.css";

type Props = {
  id: string;
  number: number;
  title: string;
  /** One serif sentence that states the section's point. */
  statement?: React.ReactNode;
  children: React.ReactNode;
};

/** A numbered case-study section: the shared ink rule, a mono label, a serif statement. */
export default function Section({ id, number, title, statement, children }: Props) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className={`label ${styles.h2}`}>
        <span className={styles.secNo}>{number}</span>
        {title}
      </h2>
      {statement && <p className={`serif ${styles.statement}`}>{statement}</p>}
      {children}
    </section>
  );
}

/** Body copy, held to a readable measure. */
export function Prose({ children }: { children: React.ReactNode }) {
  return <div className={styles.prose}>{children}</div>;
}

export function H3({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h3 id={id} className={`serif ${styles.h3}`}>
      {children}
    </h3>
  );
}
