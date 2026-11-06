import { site } from "@/lib/site";

import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={`wrap ${styles.footer}`}>
      <div className={styles.inner}>
        <div className={`grid ${styles.top}`}>
          <div className={styles.who}>
            <p className={styles.name}>{site.name}</p>
            <p className={styles.place}>
              {site.role} · {site.location}
            </p>
          </div>
          <nav aria-label="Profiles" className={styles.profiles}>
            {site.profiles.map((p) => (
              <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer">
                {p.label}
              </a>
            ))}
          </nav>
          <div className={styles.contact}>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={site.resumeUrl} target="_blank" rel="noopener noreferrer">
              Résumé (PDF)
            </a>
          </div>
        </div>
        <div className={styles.bottom}>
          <p className="meta">
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="meta">Set in Newsreader and IBM Plex. Margin notes name the file they describe.</p>
        </div>
      </div>
    </footer>
  );
}
