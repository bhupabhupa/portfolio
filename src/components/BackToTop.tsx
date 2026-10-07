"use client";

import { useEffect, useState } from "react";
import { ArrowUpIcon } from "@/components/icons";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setVisible(window.scrollY > 900));
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <a
      href="#main"
      aria-label="Back to top"
      className={`fixed right-4 bottom-4 z-30 grid h-11 w-11 place-items-center rounded-full border border-border-strong bg-surface/90 text-foreground shadow-lg backdrop-blur transition-[opacity,transform,color,border-color] duration-200 hover:border-accent hover:text-accent sm:right-6 sm:bottom-6 ${
        visible ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0"
      }`}
    >
      <ArrowUpIcon className="h-5 w-5" />
    </a>
  );
}
