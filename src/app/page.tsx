import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { BackToTop } from "@/components/BackToTop";
import { CopyEmail } from "@/components/CopyEmail";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  BookIcon,
  CheckIcon,
  CodeIcon,
  PlayIcon,
  ChevronDownIcon,
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  PinIcon,
  principleIcons,
} from "@/components/icons";
import { SiteNav } from "@/components/SiteNav";
import {
  education,
  experience,
  type Job,
  openSource,
  principles,
  profile,
  projects,
  sections,
  skills,
  stats,
} from "@/data/profile";

const nav = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#leadership", label: "Leadership" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

const container = "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8";

// h-11 = 44px, the minimum comfortable touch target.
const buttonBase =
  "inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium whitespace-nowrap transition-[color,background-color,border-color,box-shadow,transform] duration-200 active:translate-y-px";
const buttonPrimary = `${buttonBase} bg-accent text-background shadow-lg shadow-accent/20 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/30`;
const buttonGhost = `${buttonBase} border border-border-strong bg-background/40 hover:border-accent hover:text-accent`;
const iconButton =
  "grid h-11 w-11 place-items-center rounded-full border border-border-strong bg-background/40 text-foreground transition-colors hover:border-accent hover:text-accent";
const textLink =
  "inline-flex h-11 items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 hover:underline";
const footerLink =
  "inline-flex h-11 items-center px-3 text-sm text-muted transition-colors hover:text-accent";

const currentJob = experience.find((j) => j.current) ?? experience[0];
const pastJobs = experience.filter((j) => j !== currentJob && !j.early);
const earlyJobs = experience.filter((j) => j.early);
const earlyYears = earlyJobs.flatMap((j) => j.period.match(/\d{4}/g) ?? []).map(Number);
const earlyRange = earlyYears.length ? `${Math.min(...earlyYears)} – ${Math.max(...earlyYears)}` : "";

/** Splits "~60%" into ["~", "60", "%"] so the number can carry the weight. */
function splitStat(value: string) {
  const m = value.match(/^(\D*)(\d[\d.,]*)(.*)$/);
  return m ? [m[1], m[2], m[3]] : ["", value, ""];
}

function Eyebrow({ children, center = false }: { children: ReactNode; center?: boolean }) {
  return (
    <p
      className={`flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-accent uppercase ${center ? "justify-center" : ""}`}
    >
      <span className="h-px w-6 bg-accent" aria-hidden="true" />
      {children}
      {center && <span className="h-px w-6 bg-accent" aria-hidden="true" />}
    </p>
  );
}

function Section({
  id,
  eyebrow,
  title,
  intro,
  split = false,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  split?: boolean;
  children: ReactNode;
}) {
  const header = (
    <div className={split ? "md:sticky md:top-28" : "max-w-2xl"}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={`${id}-title`} className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {intro && <p className="mt-3 text-base leading-7 text-muted sm:text-lg">{intro}</p>}
    </div>
  );

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-border/70 py-20 sm:py-28">
      <div className={container}>
        {split ? (
          <div className="grid gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-4">{header}</div>
            <div className="md:col-span-8">{children}</div>
          </div>
        ) : (
          <>
            <div className="mb-10 sm:mb-14">{header}</div>
            {children}
          </>
        )}
      </div>
    </section>
  );
}

function Tag({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-full border border-accent/25 bg-accent-soft/60 px-2.5 py-0.5 text-xs font-medium text-accent">
      {children}
    </li>
  );
}

function TimelineJob({ job }: { job: Job }) {
  return (
    <li className="reveal relative grid gap-1 pb-10 pl-8 last:pb-0 sm:grid-cols-[9.5rem_1fr] sm:gap-0 sm:pl-0">
      {/* rail + dot */}
      <span className="absolute top-2 bottom-0 left-[5px] w-px bg-border sm:left-[calc(9.5rem+2rem+5px)]" aria-hidden="true" />
      <span
        className="absolute top-1.5 left-0 h-[11px] w-[11px] rounded-full border-2 border-accent bg-background sm:left-[calc(9.5rem+2rem)]"
        aria-hidden="true"
      />
      <p className="font-mono text-xs leading-6 text-muted sm:text-right">{job.period}</p>
      <div className="sm:pl-16">
        <h3 className="text-base font-semibold sm:text-lg">
          {job.role}
          <span className="block text-sm font-medium text-accent sm:inline sm:text-base">
            <span className="hidden sm:inline"> · </span>
            {job.company}
          </span>
        </h3>
        <ul className="mt-2 space-y-1.5 text-sm leading-6 text-muted">
          {job.points.map((pt) => (
            <li key={pt.slice(0, 30)}>{pt}</li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export default function Home() {
  const [firstName, ...rest] = profile.name.split(" ");
  const lastName = rest.join(" ");
  const roles = profile.headline.split(" · ");
  const featured = projects.find((p) => p.featured);
  const otherProjects = projects.filter((p) => p !== featured);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-background"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-20 border-b border-border/60 bg-background/75 backdrop-blur-md">
        <div className={`${container} flex h-16 items-center justify-between`}>
          <a href="#top" className="-mx-1 inline-flex h-11 items-center rounded px-1 font-mono text-sm font-semibold">
            bhupendra<span className="text-accent">.</span>tandel
          </a>
          <SiteNav items={nav} observe={["intro", ...nav.map((n) => n.href.slice(1))]} />
        </div>
      </header>

      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        {/* ---------- Hero ---------- */}
        <section id="intro" aria-label="Introduction" className="relative isolate overflow-hidden">
          <div className="bg-glow absolute inset-0 -z-10" aria-hidden="true" />
          <div className="bg-dots absolute inset-0 -z-10" aria-hidden="true" />

          <div className={`${container} pt-8 pb-20 sm:pt-20 sm:pb-28`}>
            <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:gap-12 lg:gap-20">
              <div className="order-2 md:order-1">
                <p className="inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent-soft/50 py-1 pr-3.5 pl-3 text-xs font-medium sm:text-sm">
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="status-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>
                  {profile.availabilityShort}
                </p>

                <h1 className="mt-5 text-[2.75rem] leading-[1.02] sm:mt-6 font-semibold tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                  <span className="block">{firstName}</span>
                  <span className="inline-block bg-linear-to-r from-foreground from-30% to-accent bg-clip-text pr-1 pb-1 text-transparent">
                    {lastName}
                  </span>
                </h1>

                <p className="mt-5 flex flex-col gap-y-1 text-lg font-medium sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:text-xl">
                  {roles.map((r, i) => (
                    <span key={r} className="inline-flex items-center gap-3">
                      {i > 0 && <span className="hidden h-1 w-1 rounded-full bg-accent sm:block" aria-hidden="true" />}
                      {i > 0 && <span className="sr-only">, </span>}
                      {r}
                    </span>
                  ))}
                </p>

                <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
                  {profile.tagline}
                </p>

                <p className="mt-5 flex items-start gap-2 text-sm leading-6 text-muted">
                  <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>
                    {profile.location} · {profile.workPreference}
                  </span>
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a href={`mailto:${profile.email}`} className={`${buttonPrimary} flex-1 sm:flex-none`}>
                    <MailIcon className="h-4 w-4" />
                    Email me
                  </a>
                  <a href={profile.resume} className={`${buttonGhost} flex-1 sm:flex-none`} download>
                    <DownloadIcon className="h-4 w-4" />
                    Download resume
                  </a>
                  <span className="flex gap-3">
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn profile (opens in a new tab)"
                      className={iconButton}
                    >
                      <LinkedInIcon className="h-[18px] w-[18px]" />
                    </a>
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub profile (opens in a new tab)"
                      className={iconButton}
                    >
                      <GitHubIcon className="h-[18px] w-[18px]" />
                    </a>
                  </span>
                </div>
              </div>

              {/* Portrait */}
              <div className="order-1 md:order-2">
                <div className="relative w-28 sm:w-40 md:w-64 lg:w-80">
                  <div className="absolute -inset-3 rounded-[2.5rem] bg-accent/20 blur-2xl md:-inset-8" aria-hidden="true" />
                  <div className="relative rounded-[1.5rem] bg-linear-to-br from-accent via-border-strong/40 to-border p-px shadow-2xl md:rounded-[2.25rem]">
                    <Image
                      src={profile.photo}
                      alt={`Portrait of ${profile.name}`}
                      width={800}
                      height={800}
                      priority
                      sizes="(min-width: 1024px) 320px, (min-width: 768px) 256px, (min-width: 640px) 160px, 112px"
                      className="aspect-square w-full rounded-[calc(1.5rem-1px)] bg-surface object-cover md:rounded-[calc(2.25rem-1px)]"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-10 hidden max-w-[16rem] rounded-2xl border border-border bg-surface/90 px-4 py-3 shadow-xl backdrop-blur md:block lg:-left-14">
                    <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">Currently</p>
                    <p className="mt-1 text-sm leading-snug font-semibold">{currentJob.role}</p>
                    <p className="text-xs text-muted">{currentJob.company}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Impact stats */}
            <dl className="mt-16 grid grid-cols-2 gap-3 sm:mt-24 sm:gap-4 lg:grid-cols-4">
              {stats.map((s) => {
                const [pre, num, post] = splitStat(s.value);
                return (
                  <div
                    key={s.label}
                    className="relative flex flex-col-reverse justify-end overflow-hidden rounded-2xl border border-border bg-surface/70 p-5 backdrop-blur-sm sm:p-6"
                  >
                    <span
                      className="absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-accent to-transparent opacity-70"
                      aria-hidden="true"
                    />
                    <dt className="mt-2 text-sm leading-5 text-muted">{s.label}</dt>
                    <dd className="text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl">
                      <span className="text-accent">{pre}</span>
                      {num}
                      <span className="text-accent">{post}</span>
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </section>

        {/* ---------- About ---------- */}
        <Section id="about" eyebrow={sections.about.eyebrow} title={sections.about.title} split>
          <div className="space-y-5 text-base leading-7 text-muted sm:text-lg sm:leading-8">
            {profile.about.map((p, i) => (
              <p
                key={p.slice(0, 20)}
                className={i === 0 ? "text-lg leading-8 text-foreground sm:text-xl sm:leading-9" : ""}
              >
                {p}
              </p>
            ))}
          </div>
        </Section>

        {/* ---------- Projects (GitHub) ---------- */}
        <Section
          id="projects"
          eyebrow={sections.openSource.eyebrow}
          title={sections.openSource.title}
          intro={sections.openSource.intro}
        >
          <div className="grid gap-4 md:grid-cols-2">
            {openSource
              .filter((p) => p.kind === "code")
              .map((p) => {
                const links = (
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
                    {p.caseStudy && (
                      <Link
                        href={`/projects/${p.caseStudy}`}
                        className={p.featured ? `${buttonPrimary} mr-1` : `${textLink} font-semibold`}
                      >
                        {p.featured ? sections.openSource.writeUp : "Architecture write-up"}
                        <ArrowRightIcon className="h-4 w-4" />
                        <span className="sr-only">: {p.name}</span>
                      </Link>
                    )}
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className={textLink}>
                      <GitHubIcon className="h-4 w-4" />
                      Code
                      <ArrowUpRightIcon className="h-3.5 w-3.5" />
                      <span className="sr-only">: {p.name} on GitHub (opens in a new tab)</span>
                    </a>
                    {p.demo && (
                      <a href={p.demo} target="_blank" rel="noopener noreferrer" className={textLink}>
                        <PlayIcon className="h-4 w-4" />
                        Demo
                        <span className="sr-only">: {p.name} (animated GIF, opens in a new tab)</span>
                      </a>
                    )}
                  </div>
                );
                const highlights = (
                  <ul className={`space-y-2 leading-6 ${p.featured ? "text-base" : "text-sm"}`}>
                    {p.highlights.map((h) => (
                      <li
                        key={h}
                        className={`flex gap-2.5 ${p.featured ? "rounded-xl border border-border bg-background/70 px-4 py-3" : ""}`}
                      >
                        <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-accent" />
                        {h}
                      </li>
                    ))}
                  </ul>
                );
                const tags = (
                  <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
                    {p.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </ul>
                );

                return p.featured ? (
                  <article
                    key={p.name}
                    className="reveal relative isolate grid gap-8 overflow-hidden rounded-3xl border border-accent/40 bg-surface p-6 sm:p-8 md:col-span-2 lg:grid-cols-2 lg:gap-12"
                  >
                    <div className="bg-glow absolute inset-0 -z-10" aria-hidden="true" />
                    <div className="bg-dots absolute inset-0 -z-10 opacity-70" aria-hidden="true" />
                    <div className="flex flex-col">
                      <div className="flex items-center gap-3">
                        <span className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-background text-accent">
                          <CodeIcon className="h-5 w-5" />
                        </span>
                        <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent">
                          GenAI · Featured
                        </span>
                      </div>
                      <h3 className="mt-5 font-mono text-xl font-semibold sm:text-2xl">
                        <span className="font-normal text-muted">bhupabhupa/</span>
                        {p.name}
                      </h3>
                      <p className="mt-3 text-base leading-7 text-muted">{p.summary}</p>
                      <div className="mt-6">{tags}</div>
                      <div className="mt-8 lg:mt-auto lg:pt-8">{links}</div>
                    </div>
                    <div className="self-center">{highlights}</div>
                  </article>
                ) : (
                  <article key={p.name} className="reveal flex flex-col rounded-2xl border border-border bg-surface p-6">
                    <div className="flex items-center justify-between gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-background text-accent">
                        <CodeIcon className="h-5 w-5" />
                      </span>
                      <span className="rounded-full border border-border-strong px-2.5 py-0.5 font-mono text-xs text-muted">
                        Code
                      </span>
                    </div>
                    <h3 className="mt-5 font-mono text-lg font-semibold">
                      <span className="font-normal text-muted">bhupabhupa/</span>
                      {p.name}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{p.summary}</p>
                    <div className="mt-4 flex-1">{highlights}</div>
                    <div className="mt-5">{tags}</div>
                    <div className="mt-4 border-t border-border pt-3">{links}</div>
                  </article>
                );
              })}
          </div>

          {openSource
            .filter((p) => p.kind === "guide")
            .map((p) => (
              <article
                key={p.name}
                className="reveal relative isolate mt-4 grid gap-6 overflow-hidden rounded-2xl border border-dashed border-accent/50 bg-accent-soft/25 p-6 sm:p-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-10"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-background">
                      <BookIcon className="h-5 w-5" />
                    </span>
                    <span className="rounded-full bg-accent-soft px-2.5 py-0.5 font-mono text-xs text-accent">
                      Guide · Writing
                    </span>
                  </div>
                  <h3 className="mt-5 font-mono text-lg font-semibold">
                    <span className="font-normal text-muted">bhupabhupa/</span>
                    {p.name}
                  </h3>
                  <p className="mt-2 text-base leading-7 text-muted">{p.summary}</p>
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className={`${textLink} mt-3`}>
                    Read the playbook
                    <ArrowUpRightIcon className="h-3.5 w-3.5" />
                    <span className="sr-only"> on GitHub (opens in a new tab)</span>
                  </a>
                </div>
                <ul className="space-y-3 self-center text-sm leading-6">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex gap-2.5 rounded-xl border border-border bg-surface px-4 py-3">
                      <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-accent" />
                      {h}
                    </li>
                  ))}
                </ul>
              </article>
            ))}

          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonGhost} mt-8`}
          >
            <GitHubIcon className="h-4 w-4" />
            {sections.openSource.more}
            <ArrowUpRightIcon className="h-3.5 w-3.5" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </Section>

        {/* ---------- How I lead ---------- */}
        <Section
          id="leadership"
          eyebrow={sections.leadership.eyebrow}
          title={sections.leadership.title}
          intro={sections.leadership.intro}
        >
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => {
              const Icon = principleIcons[p.icon];
              return (
                <li key={p.title} className="reveal flex flex-col rounded-2xl border border-border bg-surface p-6">
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-xs text-muted" aria-hidden="true">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{p.body}</p>
                </li>
              );
            })}
          </ul>
        </Section>

        {/* ---------- Selected work ---------- */}
        <Section id="work" eyebrow={sections.work.eyebrow} title={sections.work.title} intro={sections.work.intro}>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featured && (
              <article className="reveal relative isolate flex flex-col overflow-hidden rounded-3xl border border-accent/40 bg-surface p-6 sm:p-8 md:col-span-2 lg:row-span-2">
                <div className="bg-glow absolute inset-0 -z-10" aria-hidden="true" />
                <div className="bg-dots absolute inset-0 -z-10 opacity-70" aria-hidden="true" />
                <div className="flex items-center gap-3">
                  <p className="font-mono text-xs text-muted">{featured.org}</p>
                  <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent">
                    Flagship
                  </span>
                </div>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{featured.title}</h3>
                <p className="mt-3 max-w-lg text-base leading-7 text-muted">{featured.description}</p>
                {featured.metrics && (
                  <dl className="mt-8 grid grid-cols-2 gap-6 sm:mt-auto sm:pt-10">
                    {featured.metrics.map((m) => (
                      <div key={m.label} className="flex flex-col-reverse border-l border-accent/40 pl-4">
                        <dt className="mt-1 text-sm text-muted">{m.label}</dt>
                        <dd className="text-5xl font-semibold tracking-tight text-accent tabular-nums sm:text-6xl">
                          {m.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}
                <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies">
                  {featured.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </ul>
              </article>
            )}
            {otherProjects.map((p) => (
              <article
                key={p.title}
                className="reveal flex flex-col rounded-2xl border border-border bg-surface p-6 md:last:col-span-2 lg:last:col-span-1"
              >
                <p className="font-mono text-xs text-muted">{p.org}</p>
                <h3 className="mt-2 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted">{p.description}</p>
                {p.metrics?.map((m) => (
                  <p key={m.label} className="mt-4 flex items-baseline gap-2">
                    <span className="text-2xl font-semibold text-accent">{m.value}</span>
                    <span className="text-sm text-muted">{m.label}</span>
                  </p>
                ))}
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
                  {p.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        {/* ---------- Experience ---------- */}
        <Section
          id="experience"
          eyebrow={sections.experience.eyebrow}
          title={sections.experience.title}
          intro={sections.experience.intro}
        >
          {/* Current role */}
          <article className="reveal relative isolate overflow-hidden rounded-3xl border border-accent/40 bg-surface p-6 sm:p-10">
            <div className="bg-glow absolute inset-0 -z-10 opacity-80" aria-hidden="true" />
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                Current role
              </span>
              <span className="font-mono text-xs text-muted">{currentJob.period}</span>
            </div>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">{currentJob.role}</h3>
            <p className="mt-1 text-lg font-medium text-accent">{currentJob.company}</p>
            {currentJob.context && (
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{currentJob.context}</p>
            )}

            {currentJob.promotions && (
              <div className="mt-8">
                <p id="promotion-path" className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
                  Promotion path
                </p>
                <ol aria-labelledby="promotion-path" className="mt-3 flex flex-wrap items-center gap-2">
                  {currentJob.promotions.map((step, i, all) => {
                    const last = i === all.length - 1;
                    return (
                      <li key={step} className="flex items-center gap-2">
                        <span
                          className={
                            last
                              ? "rounded-full bg-accent px-3.5 py-1.5 text-sm font-medium text-background"
                              : "rounded-full border border-border-strong bg-background/50 px-3.5 py-1.5 text-sm"
                          }
                        >
                          {step}
                        </span>
                        {!last && <ArrowRightIcon className="h-4 w-4 text-accent" />}
                      </li>
                    );
                  })}
                </ol>
              </div>
            )}

            <ul className="mt-8 grid gap-x-10 gap-y-3 border-t border-border pt-8 text-sm leading-6 text-muted md:grid-cols-2">
              {currentJob.points.map((pt) => (
                <li key={pt.slice(0, 30)} className="flex gap-3">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {pt}
                </li>
              ))}
            </ul>
          </article>

          {/* Previous roles */}
          <ol className="mt-14" aria-label="Previous roles">
            {pastJobs.map((job) => (
              <TimelineJob key={`${job.company}-${job.period}`} job={job} />
            ))}
          </ol>

          {earlyJobs.length > 0 && (
            <details className="group mt-10">
              <summary className="inline-flex h-11 cursor-pointer list-none items-center gap-2 rounded-full border border-border-strong px-5 text-sm font-medium transition-colors hover:border-accent hover:text-accent">
                <span className="group-open:hidden">Show {sections.experience.earlier}</span>
                <span className="hidden group-open:inline">Hide {sections.experience.earlier}</span>
                <span className="font-mono text-xs text-muted">{earlyRange}</span>
                <ChevronDownIcon className="chevron h-4 w-4 transition-transform duration-200" />
              </summary>
              <ol className="mt-10" aria-label="Earlier roles">
                {earlyJobs.map((job) => (
                  <TimelineJob key={`${job.company}-${job.period}`} job={job} />
                ))}
              </ol>
            </details>
          )}
        </Section>

        {/* ---------- Skills ---------- */}
        <Section id="skills" eyebrow={sections.skills.eyebrow} title={sections.skills.title} split>
          <div className="grid gap-4 sm:grid-cols-2">
            {skills.map((s) => (
              <div key={s.group} className="reveal rounded-2xl border border-border bg-surface p-5">
                <h3 className="text-sm font-semibold">{s.group}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {s.items.map((i) => (
                    <li key={i} className="rounded-lg border border-border bg-background px-2.5 py-1 text-sm text-muted">
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="reveal rounded-2xl border border-border bg-surface p-5">
              <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">Education</p>
              <p className="mt-3 font-semibold">{education.degree}</p>
              <p className="mt-1 text-sm text-muted">
                {education.school} · {education.period}
              </p>
            </div>
            <div className="reveal rounded-2xl border border-border bg-surface p-5">
              <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">Languages</p>
              <p className="mt-3 font-semibold">{profile.languages.join(" · ")}</p>
              <p className="mt-1 text-sm text-muted">{profile.location}</p>
            </div>
          </div>
        </Section>

        {/* ---------- Contact ---------- */}
        <section id="contact" aria-labelledby="contact-title" className="border-t border-border/70 pt-20 pb-16 sm:pt-28 sm:pb-20">
          <div className={container}>
            <div className="reveal relative isolate overflow-hidden rounded-[2rem] border border-border bg-surface px-6 py-14 text-center sm:px-12 sm:py-20">
              <div className="bg-glow absolute inset-0 -z-10" aria-hidden="true" />
              <div className="bg-dots absolute inset-0 -z-10" aria-hidden="true" />
              <Eyebrow center>{sections.contact.eyebrow}</Eyebrow>
              <h2
                id="contact-title"
                className="mx-auto mt-5 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-5xl"
              >
                {sections.contact.title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted sm:text-lg">
                {sections.contact.intro}
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
                <a href={`mailto:${profile.email}`} className={buttonPrimary}>
                  <MailIcon className="h-4 w-4" />
                  Email me
                </a>
                <CopyEmail email={profile.email} />
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={buttonGhost}>
                  <LinkedInIcon className="h-4 w-4" />
                  LinkedIn
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className={`${container} flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between`}>
          <div>
            <p className="font-mono text-sm font-semibold">
              bhupendra<span className="text-accent">.</span>tandel
            </p>
            <p className="mt-1 text-sm text-muted">{profile.headline}</p>
          </div>
          <nav aria-label="Contact links">
            <ul className="-mx-3 flex flex-wrap">
              <li>
                <a href={`mailto:${profile.email}`} className={footerLink}>
                  Email
                </a>
              </li>
              <li>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={footerLink}>
                  LinkedIn<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className={footerLink}>
                  GitHub<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a href={profile.resume} download className={footerLink}>
                  Resume (PDF)
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className={container}>
          <p className="border-t border-border/60 py-6 text-xs text-muted">© 2026 {profile.fullName}</p>
        </div>
      </footer>

      <BackToTop />
    </>
  );
}
