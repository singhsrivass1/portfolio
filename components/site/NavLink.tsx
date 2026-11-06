import Link from "next/link";

type Props = {
  href: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  "aria-current"?: "page" | "true";
};

/** Internal routes use next/link; mail and off-site links use a plain anchor. */
export default function NavLink({ href, external, className, children, onClick, ...rest }: Props) {
  const isInternal = href.startsWith("/") && !external;
  if (isInternal) {
    return (
      <Link href={href} className={className} onClick={onClick} aria-current={rest["aria-current"]}>
        {children}
      </Link>
    );
  }
  const opensTab = external || href.startsWith("http");
  return (
    <a
      href={href}
      className={className}
      onClick={onClick}
      {...(opensTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
