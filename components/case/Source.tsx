import styles from "./case.module.css";

type Props = {
  /** GitHub repository URL, without a trailing slash. */
  repo: string;
  /** Repository-relative file paths. */
  files: string[];
  branch?: string;
};

/** The files a passage describes, each linked to its source on GitHub. */
export default function Source({ repo, files, branch = "main" }: Props) {
  const name = repo.split("/").pop();
  return (
    <p className={`meta ${styles.source}`}>
      <span>Code</span>
      {files.map((file) => (
        <a
          key={file}
          href={`${repo}/blob/${branch}/${file}`}
          title={`${name}/${file}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {file}
        </a>
      ))}
    </p>
  );
}
