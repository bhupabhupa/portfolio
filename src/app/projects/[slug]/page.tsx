import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import { FlowDiagram } from "@/components/FlowDiagram";
import { ArrowRightIcon, ArrowUpRightIcon, CheckIcon, GitHubIcon, PlayIcon } from "@/components/icons";
import { ThemeToggle } from "@/components/ThemeToggle";
import { caseStudies, getCaseStudy } from "@/data/caseStudies";
import { profile } from "@/data/profile";

const container = "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8";
const buttonBase =
  "inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium whitespace-nowrap transition-[color,background-color,border-color,box-shadow,transform] duration-200 active:translate-y-px";
const buttonPrimary = `${buttonBase} bg-accent text-background shadow-lg shadow-accent/20 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/30`;
const buttonGhost = `${buttonBase} border border-border-strong bg-background/40 hover:border-accent hover:text-accent`;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  const title = `${study.name}: architecture write-up · ${profile.name}`;
  return {
    title,
    description: study.tagline,
    openGraph: { title, description: study.tagline, type: "article" },
  };
}

function Block({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-border/70 py-16 sm:py-20">
      <div className={container}>
        <p className="flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-accent uppercase">
          <span className="h-px w-6 bg-accent" aria-hidden="true" />
          {eyebrow}
        </p>
        <h2 id={id} className="mt-4 mb-8 text-2xl font-semibold tracking-tight sm:mb-10 sm:text-3xl">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

// Reading params is wrapped in Suspense so client-side navigation to a write-up stays instant.
export default function CaseStudyPage({ params }: PageProps<"/projects/[slug]">) {
  return (
    <Suspense fallback={null}>
      <CaseStudy params={params} />
    </Suspense>
  );
}

async function CaseStudy({ params }: { params: PageProps<"/projects/[slug]">["params"] }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const index = caseStudies.indexOf(study);
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-background"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-20 border-b border-border/60 bg-background/75 backdrop-blur-md">
        <div className={`${container} flex h-16 items-center justify-between gap-3`}>
          <Link href="/" className="-mx-1 inline-flex h-11 items-center rounded px-1 font-mono text-sm font-semibold">
            bhupendra<span className="text-accent">.</span>tandel
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/#projects"
              className="inline-flex h-11 items-center gap-1.5 rounded-full px-3 text-sm text-muted transition-colors hover:text-foreground"
            >
              <ArrowRightIcon className="h-4 w-4 rotate-180" />
              All projects
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        {/* Intro */}
        <section className="relative isolate overflow-hidden">
          <div className="bg-glow absolute inset-0 -z-10" aria-hidden="true" />
          <div className="bg-dots absolute inset-0 -z-10" aria-hidden="true" />
          <div className={`${container} py-16 sm:py-24`}>
            <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">Architecture write-up</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">{study.name}</h1>
            <p className="mt-3 text-sm font-medium text-muted sm:text-base">{study.category}</p>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-foreground sm:text-xl sm:leading-9">{study.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={study.repo} target="_blank" rel="noopener noreferrer" className={buttonPrimary}>
                <GitHubIcon className="h-4 w-4" />
                View the code
                <ArrowUpRightIcon className="h-3.5 w-3.5" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              {study.demo && (
                <a href={study.demo} target="_blank" rel="noopener noreferrer" className={buttonGhost}>
                  <PlayIcon className="h-4 w-4" />
                  Watch demo
                  <span className="sr-only">(animated GIF, opens in a new tab)</span>
                </a>
              )}
            </div>
            <ul className="mt-8 flex flex-wrap gap-1.5" aria-label="Technologies">
              {study.stack.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-accent/25 bg-accent-soft/60 px-2.5 py-0.5 text-xs font-medium text-accent"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Block id="problem" eyebrow="Context" title="The problem">
          <div className="max-w-3xl space-y-4 text-base leading-7 text-muted sm:text-lg sm:leading-8">
            {study.problem.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </Block>

        <Block id="architecture" eyebrow="Architecture" title="How it works">
          <FlowDiagram study={study} />
        </Block>

        <Block id="decisions" eyebrow="Design decisions" title="Key decisions and trade-offs">
          <ol className="grid gap-4 md:grid-cols-2">
            {study.decisions.map((d, i) => (
              <li key={d.title} className="reveal rounded-2xl border border-border bg-surface p-6">
                <p className="font-mono text-xs text-accent" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-lg font-semibold">{d.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{d.body}</p>
              </li>
            ))}
          </ol>
        </Block>

        <Block id="quality" eyebrow="Quality" title="Testing, and the road to production">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-border bg-surface p-6">
              <h3 className="font-semibold">How it&apos;s tested</h3>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
                {study.testing.map((t) => (
                  <li key={t} className="flex gap-2.5">
                    <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-accent" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-dashed border-border-strong p-6">
              <h3 className="font-semibold">What production would add</h3>
              <p className="mt-1 text-sm text-muted">Deliberately out of scope for the demo:</p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
                {study.production.map((t) => (
                  <li key={t} className="flex gap-2.5">
                    <ArrowRightIcon className="mt-1 h-4 w-4 shrink-0 text-accent" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Block>

        {/* Next project */}
        <section className="border-t border-border/70 py-16 sm:py-20">
          <div className={`${container} flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between`}>
            <Link href="/#projects" className={buttonGhost}>
              <ArrowRightIcon className="h-4 w-4 rotate-180" />
              Back to portfolio
            </Link>
            <Link
              href={`/projects/${next.slug}`}
              className="group rounded-2xl border border-border bg-surface px-5 py-4 transition-colors hover:border-accent sm:text-right"
            >
              <span className="block font-mono text-xs text-muted">Next write-up</span>
              <span className="mt-1 inline-flex items-center gap-2 text-lg font-semibold group-hover:text-accent">
                {next.name}
                <ArrowRightIcon className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className={container}>
          <p className="py-6 text-xs text-muted">© 2026 {profile.fullName}</p>
        </div>
      </footer>
    </>
  );
}
