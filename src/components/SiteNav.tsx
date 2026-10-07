"use client";

import { MobileNav } from "@/components/MobileNav";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useActiveSection } from "@/components/useActiveSection";

export type NavItem = { href: string; label: string };

export function SiteNav({ items, observe }: { items: NavItem[]; observe: string[] }) {
  const active = useActiveSection(observe);

  return (
    <div className="flex items-center gap-2">
      <nav aria-label="Primary" className="hidden lg:block">
        <ul className="flex items-center gap-0.5 rounded-full border border-border bg-surface/60 p-1">
          {items.map((item) => {
            const current = active === item.href.slice(1);
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={current ? "true" : undefined}
                  className="block rounded-full px-3.5 py-1.5 text-sm text-muted transition-colors hover:text-foreground aria-[current=true]:bg-accent-soft aria-[current=true]:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      <ThemeToggle />
      <MobileNav items={items} active={active} />
    </div>
  );
}
