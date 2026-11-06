import { site } from "@/lib/site";

import styles from "./About.module.css";

export default function About() {
  return (
    <section id="about" className={`section grid ${styles.about}`} aria-labelledby="about-title">
      <h2 id="about-title" className={`label ${styles.label}`}>
        About
      </h2>
      <p className={`serif ${styles.statement}`}>
        I study AI and machine learning, and most of what I build is the part around the model: the API, the data, the
        permissions, and the fallback.
      </p>
      <div className={styles.body}>
        <p>I like knowing why something broke before I fix it. Jumping straight to the fix usually creates a different problem.</p>
        <p>
          The first version should do one thing correctly. I’ve learned more from stripping projects down than from
          adding to them.
        </p>
        <p>Outside projects I solve algorithm problems, mostly to think more clearly under constraints.</p>
      </div>
      <dl className={styles.record}>
        {site.record.map((row) => (
          <div key={row.label} className={styles.row}>
            <dt>{row.label}</dt>
            <dd className="meta">
              {row.value.map((v) => (
                <span key={v}>{v}</span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
