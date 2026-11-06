import { site } from "@/lib/site";

import styles from "./Contact.module.css";

/** Profiles live in the footer directly below, so they are not repeated here. */
export default function Contact() {
  return (
    <section id="contact" className={`section grid ${styles.contact}`} aria-labelledby="contact-title">
      <h2 id="contact-title" className={`label ${styles.label}`}>
        Contact
      </h2>
      <p className={`serif ${styles.email}`}>
        <a href={`mailto:${site.email}`} className="link">
          {site.email}
        </a>
      </p>
      <p className={styles.line}>Open to internships in software engineering, backend and applied AI.</p>
      <p className={styles.links}>
        <a href={site.resumeUrl} className="link" target="_blank" rel="noopener noreferrer">
          Résumé (PDF)
        </a>
      </p>
    </section>
  );
}
