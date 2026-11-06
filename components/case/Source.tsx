import styles from "./case.module.css";

type Props = {
  /** GitHub repository URL, without a trailing slash. */
  repo: string;
  /** Repository-relative paths. A path ending in "/" is a folder. */
  files: string[];
  branch?: string;
  /** Shown before the paths; name the repository when a page cites two. */
  label?: string;
};

/** The files a passage describes, each linked to its source on GitHub. */
export default function Source({ repo, files, branch = "main", label = "Code" }: Props) {
  const name = repo.split("/").pop();
  return (
    <p className={`meta ${styles.source}`}>
      <span>{label}</span>
      {files.map((file) => (
        <a
          key={file}
          href={file.endsWith("/") ? `${repo}/tree/${branch}/${file.slice(0, -1)}` : `${repo}/blob/${branch}/${file}`}
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
