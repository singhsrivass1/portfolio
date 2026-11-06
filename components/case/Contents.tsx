import styles from "./case.module.css";

export type ContentsItem = { id: string; title: string };

/** Contents rail: sticky beside the sections from 1024 px up, a plain list above them below that. */
export default function Contents({ items }: { items: ContentsItem[] }) {
  return (
    <nav className={styles.rail} aria-labelledby="contents-title">
      <h2 id="contents-title" className="label">
        Contents
      </h2>
      <ol>
        {items.map((item, i) => (
          <li key={item.id}>
            <a href={`#${item.id}`}>
              <span className={styles.railNo} aria-hidden="true">
                {i + 1}
              </span>
              <span>{item.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
