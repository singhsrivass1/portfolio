import Link from "next/link";

import type { Project } from "@/lib/projects";

import styles from "./case.module.css";

type Fact = { label: string; value: React.ReactNode };

type Props = {
  project: Project;
  /** The case study's own lede, when it differs from the homepage line. */
  lede?: string;
  /** Rows after Year and Role, such as the stack split by layer. */
  facts: Fact[];
};

/** Kicker, title, lede and a facts list. Year, role and links come from lib/projects.ts. */
export default function CaseHeader({ project, lede, facts }: Props) {
  return (
    <header className={`grid ${styles.head}`}>
      <p className={`label ${styles.kicker}`}>
        <Link href="/work">Work</Link>
        <span>Case study {project.number}</span>
      </p>
      <h1 className={`serif ${styles.title}`}>{project.name}</h1>
      <p className={`serif ${styles.lede}`}>{lede ?? project.lede}</p>
      <dl className={styles.facts}>
        <dt className="meta">Year</dt>
        <dd>{project.year}</dd>
        <dt className="meta">Role</dt>
        <dd>{project.role}</dd>
        {facts.map((f) => (
          <Fact key={f.label} label={f.label} value={f.value} />
        ))}
        <dt className="meta">Links</dt>
        <dd className={styles.factLinks}>
          {project.links.map((l) => (
            <a key={l.href} href={l.href} className="link" target="_blank" rel="noopener noreferrer">
              {l.label}
            </a>
          ))}
        </dd>
      </dl>
    </header>
  );
}

function Fact({ label, value }: Fact) {
  return (
    <>
      <dt className="meta">{label}</dt>
      <dd>{value}</dd>
    </>
  );
}
