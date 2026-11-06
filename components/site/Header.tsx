"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { nav, site } from "@/lib/site";

import NavLink from "./NavLink";
import styles from "./Header.module.css";

function isCurrent(pathname: string, href: string) {
  return href === "/work" && pathname.startsWith("/work");
}

export default function Header() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // While the menu is open: lock page scroll, move focus into the menu,
  // close on Escape and keep Tab inside the menu.
  useEffect(() => {
    if (!open) return;
    const menu = menuRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menu?.querySelector<HTMLElement>("a, button")?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab" || !menu) return;
      const items = Array.from(menu.querySelectorAll<HTMLElement>("a, button"));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  // Close the menu after client-side navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="wrap">
      <div className={`${styles.bar} ${styles.rule}`}>
        <Link href="/" className={styles.name}>
          {site.name}
        </Link>

        <nav aria-label="Primary" className={styles.desktop}>
          {nav.map((item) => (
            <NavLink
              key={item.label}
              href={item.href}
              external={"external" in item ? item.external : undefined}
              className={isCurrent(pathname, item.href) ? styles.current : undefined}
              aria-current={isCurrent(pathname, item.href) ? (pathname === "/work" ? "page" : "true") : undefined}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen(true)}
        >
          Menu
        </button>
      </div>

      {open && (
        <div
          id="site-menu"
          ref={menuRef}
          className={styles.sheet}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className={`wrap ${styles.bar} ${styles.sheetBar}`}>
            <Link href="/" className={styles.name} onClick={() => setOpen(false)}>
              {site.name}
            </Link>
            <button type="button" className={styles.toggle} onClick={close}>
              Close
            </button>
          </div>
          <nav aria-label="Primary" className={`wrap ${styles.sheetNav}`}>
            {nav.map((item) => (
              <NavLink
                key={item.label}
                href={item.href}
                external={"external" in item ? item.external : undefined}
                className={`serif ${styles.sheetLink}`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <p className={`meta ${styles.sheetProfiles}`}>
              {site.profiles.map((p, i) => (
                <span key={p.label}>
                  {i > 0 && " · "}
                  <a href={p.href} target="_blank" rel="noopener noreferrer">
                    {p.label}
                  </a>
                </span>
              ))}
            </p>
          </nav>
        </div>
      )}
    </header>
  );
}
