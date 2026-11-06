import Link from "next/link";

import { pageMetadata } from "@/lib/metadata";
import { projects, type Project } from "@/lib/projects";

import styles from "./work.module.css";

export const metadata = pageMetadata({
  title: "Work",
  description:
    "A GitHub security reviewer, a bridal booking marketplace, a document question-answering system and a hackathon listing generator.",
  path: "/work",
});

function ProjectName({ project }: { project: Project }) {
  const className = `serif ${styles.name}`;
  if (project.caseStudy?.ready) {
    return (
      <Link href={project.caseStudy.href} className={className}>
        {project.name}
      </Link>
    );
  }
  return (
    <a href={project.repo} className={className} target="_blank" rel="noopener noreferrer">
      {project.name}
    </a>
  );
}

export default function WorkPage() {
  return (
    <main id="main" className="wrap">
      <section className={`grid ${styles.intro}`}>
        <h1 className={`serif ${styles.title}`}>Work</h1>
        <p className={styles.lead}>
          Four projects, ordered by depth of engineering rather than date. Each row says what I built and who I built it
          with.
        </p>
      </section>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <caption className={`meta ${styles.caption}`}>
            The project name opens its case study when one is published, otherwise its code.
          </caption>
          <thead>
            <tr>
              <th scope="col" className={styles.colNo}>No.</th>
              <th scope="col" className={styles.colProject}>Project</th>
              <th scope="col" className={styles.colRole}>My role</th>
              <th scope="col" className={styles.colStack}>Built with</th>
              <th scope="col" className={styles.colYear}>Year</th>
              <th scope="col" className={styles.colStatus}>Status</th>
              <th scope="col">Links</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.slug}>
                <td className={`serif ${styles.no}`} data-label="No.">
                  {p.number}
                </td>
                <td data-label="Project">
                  {/* One wrapper, so the phone layout's label grid sees one value. */}
                  <div>
                    <ProjectName project={p} />
                    <span className={styles.short}>{p.short}</span>
                  </div>
                </td>
                <td data-label="My role">{p.role}</td>
                <td data-label="Built with">{p.stack.join(", ")}</td>
                <td data-label="Year" className="meta">
                  {p.year}
                </td>
                <td data-label="Status">{p.status}</td>
                <td data-label="Links">
                  <span className={styles.links}>
                    {p.caseStudy?.ready && (
                      <Link href={p.caseStudy.href} className="link">
                        Case study
                      </Link>
                    )}
                    {p.links.map((l) => (
                      <a key={l.href} href={l.href} className="link" target="_blank" rel="noopener noreferrer">
                        {l.label}
                      </a>
                    ))}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
