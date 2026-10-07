"use client";

import { useEffect, useId, useRef, useState } from "react";

import type { NavItem } from "@/components/SiteNav";

export function MobileNav({ items, active }: { items: NavItem[]; active: string | null }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    // Close if the viewport grows past the breakpoint where the desktop nav shows.
    const mq = window.matchMedia("(min-width: 64rem)");
    function onChange(e: MediaQueryListEvent) {
      if (e.matches) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((o) => !o)}
        className="grid h-11 w-11 place-items-center rounded-full border border-border-strong text-foreground transition-colors hover:border-accent hover:text-accent"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      <nav
        id={panelId}
        aria-label="Primary"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-border bg-background shadow-xl"
      >
        <ul className="mx-auto flex max-w-6xl flex-col px-4 py-3 sm:px-6">
          {items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active === item.href.slice(1) ? "true" : undefined}
                className="flex min-h-12 items-center rounded-xl px-3 text-base text-foreground transition-colors hover:bg-surface aria-[current=true]:bg-accent-soft"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
