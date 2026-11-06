import Image from "next/image";
import Link from "next/link";

import { brief, featured, type Project } from "@/lib/projects";

import styles from "./SelectedWork.module.css";

function ProjectLink({ project }: { project: Project }) {
  if (project.caseStudy?.ready) {
    return (
      <Link href={project.caseStudy.href} className="link">
        Read the case study →
      </Link>
    );
  }
  return (
    <a href={project.repo} className="link" target="_blank" rel="noopener noreferrer">
      View the code on GitHub ↗
    </a>
  );
}

function Shot({ project, sizes }: { project: Project; sizes: string }) {
  const f = project.figure;
  if (!f) return null;
  return (
    <figure className={styles.figure}>
      <div
        className={`${styles.frame} ${f.small ? styles.largeOnly : ""}`}
        style={{ "--aspect": f.aspect, "--pos": f.position } as React.CSSProperties}
      >
        <Image src={f.src} alt={f.alt} fill sizes={sizes} className={styles.img} />
      </div>
      {f.small && (
        <div className={`${styles.frame} ${styles.smallOnly}`}>
          <Image src={f.small.src} alt={f.alt} sizes="100vw" className={styles.smallImg} />
        </div>
      )}
      <figcaption className={`meta ${styles.caption}`}>{f.caption}</figcaption>
    </figure>
  );
}

function Facts({ project }: { project: Project }) {
  return (
    <dl className={styles.facts}>
      <dt className="meta">Year</dt>
      <dd>{project.year}</dd>
      <dt className="meta">Role</dt>
      <dd>{project.role}</dd>
      <dt className="meta">Stack</dt>
      <dd>{project.stack.slice(0, 4).join(", ")}</dd>
      <dt className="meta">Status</dt>
      <dd>{project.status}</dd>
    </dl>
  );
}

/** First featured project: title row, full-width screenshot, then summary and numbers. */
function WideFeature({ project }: { project: Project }) {
  return (
    <article className={`grid ${styles.wide}`} aria-labelledby={`${project.slug}-title`}>
      <p className={`serif ${styles.number}`}>{project.number}</p>
      <div className={styles.wideHead}>
        <h3 id={`${project.slug}-title`} className={`serif ${styles.name}`}>
          {project.name}
        </h3>
        <p className={`serif ${styles.lede}`}>{project.lede}</p>
      </div>
      <div className={styles.wideFacts}>
        <Facts project={project} />
      </div>
      <div className={styles.wideShot}>
        <Shot project={project} sizes="(max-width: 1440px) 100vw, 1280px" />
      </div>
      <p className={styles.wideSummary}>{project.summary}</p>
      {project.facts && (
        <dl className={styles.numbers}>
          {project.facts.map((f) => (
            <div key={f.label}>
              <dt className="serif">{f.value}</dt>
              <dd className="meta">{f.label}</dd>
            </div>
          ))}
        </dl>
      )}
      <p className={styles.wideLink}>
        <ProjectLink project={project} />
      </p>
    </article>
  );
}

/** Second featured project: screenshot left, text right. */
function SplitFeature({ project }: { project: Project }) {
  return (
    <article className={`grid ${styles.split}`} aria-labelledby={`${project.slug}-title`}>
      <div className={styles.splitShot}>
        <Shot project={project} sizes="(max-width: 1023px) 100vw, 58vw" />
      </div>
      <div className={styles.splitText}>
        <p className={`serif ${styles.number}`}>{project.number}</p>
        <h3 id={`${project.slug}-title`} className={`serif ${styles.name}`}>
          {project.name}
        </h3>
        <p className={`serif ${styles.lede} ${styles.ledeSmall}`}>{project.lede}</p>
        <p className={styles.splitSummary}>{project.summary}</p>
        <p className={`meta ${styles.splitMeta}`}>
          {project.year} · {project.role} · {project.status}
        </p>
        <p className={styles.splitLink}>
          <ProjectLink project={project} />
        </p>
      </div>
    </article>
  );
}

export default function SelectedWork() {
  const [first, second] = featured;
  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className={styles.head}>
        <h2 id="work-title" className="label">
          Selected work
        </h2>
        <Link href="/work" className="meta link">
          All projects →
        </Link>
      </div>

      {first && <WideFeature project={first} />}
      {second && <SplitFeature project={second} />}

      <div className={`grid ${styles.briefs}`}>
        {brief.map((p) => (
          <article key={p.slug} className={styles.brief} aria-labelledby={`${p.slug}-title`}>
            <p className="meta">
              {p.number} · {p.role} · {p.year}
            </p>
            <h3 id={`${p.slug}-title`} className={`serif ${styles.briefName}`}>
              {p.name}
            </h3>
            <p className={styles.briefText}>
              {p.short} {p.summary}
            </p>
            <p className={styles.briefLink}>
              <a href={p.repo} className="link" target="_blank" rel="noopener noreferrer">
                Code on GitHub ↗
              </a>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
