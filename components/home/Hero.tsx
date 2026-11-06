import { site } from "@/lib/site";

import styles from "./Hero.module.css";

// Shown in the margin note; the full repository path is in the link title.
const sources = [
  {
    repo: "oasis_backend",
    path: "services/patch_apply.py",
    href: "https://github.com/singhsrivass1/oasis_backend/blob/main/services/patch_apply.py",
  },
  {
    repo: "Kajal-Cartel",
    path: "lib/db/controllers/BookingManager.ts",
    href: "https://github.com/singhsrivass1/Kajal-Cartel/blob/main/src/lib/db/controllers/BookingManager.ts",
  },
];

export default function Hero() {
  return (
    <section className={`grid ${styles.hero}`} aria-labelledby="hero-title">
      <p className={`label ${styles.kicker}`}>
        <span>{site.role}</span>
        <span>
          {site.education.degree}, {site.education.school}
        </span>
        <span>{site.location}</span>
      </p>

      <h1 id="hero-title" className={`serif ${styles.title}`}>
        I build backend systems and <br className={styles.br} />
        <span className={styles.nowrap}>AI-powered</span> products. <br className={styles.br} />
        <em>
          And I care about what happens <br className={styles.br} />
          when they fail.
        </em>
        <sup className={styles.marker}>
          <a href="#note-1" id="ref-1" aria-label="Note 1: two examples">
            1
          </a>
        </sup>
      </h1>

      <aside id="note-1" className={styles.note} aria-label="Note 1">
        <p className={styles.noteText}>
          <span className={styles.noteNumber}>1 </span>
          Two examples. Oasis attaches no patch when it can’t parse a model’s reply, and its fixes reach a repository
          only as pull requests a person merges. Kajal Cartel re-checks a slot on the server before it accepts a
          booking.
        </p>
        <p className={`meta ${styles.paths}`}>
          {sources.map((s) => (
            <a key={s.path} href={s.href} title={`${s.repo}/${s.path}`} target="_blank" rel="noopener noreferrer">
              {s.path}
            </a>
          ))}
        </p>
      </aside>

      <p className={styles.support}>
        Third-year B.Tech student, graduating {site.education.graduation}. Open to software engineering, backend and
        applied-AI internships.
      </p>

      <p className={styles.actions}>
        <a href="#work" className="link">
          Selected work
        </a>
        <a href={site.resumeUrl} className="link" target="_blank" rel="noopener noreferrer">
          Résumé (PDF)
        </a>
      </p>
    </section>
  );
}
