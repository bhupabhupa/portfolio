"use client";

import { useEffect, useState } from "react";
import { CheckIcon, CopyIcon } from "@/components/icons";

type Status = "idle" | "copied" | "failed";

export function CopyEmail({ email, className = "" }: { email: string; className?: string }) {
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (status === "idle") return;
    const t = window.setTimeout(() => setStatus("idle"), 2200);
    return () => window.clearTimeout(t);
  }, [status]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }

  return (
    <>
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy email address ${email}`}
      className={`relative inline-flex h-11 items-center gap-2.5 rounded-full border border-border-strong bg-background/40 pl-5 pr-4 font-mono text-sm transition-colors hover:border-accent ${className}`}
    >
      <span>{email}</span>
      <span className="grid h-7 w-7 place-items-center rounded-full bg-accent-soft text-accent">
        {status === "copied" ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
      </span>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-md bg-foreground px-2 py-1 font-sans text-xs whitespace-nowrap text-background transition-opacity ${status === "idle" ? "opacity-0" : "opacity-100"}`}
      >
        {status === "failed" ? "Couldn't copy" : "Copied"}
      </span>
    </button>
    <span role="status" aria-live="polite" className="sr-only">
      {status === "copied" ? "Email address copied" : status === "failed" ? "Couldn't copy. Select the address instead." : ""}
    </span>
    </>
  );
}
