import { Fragment } from "react";
import type { CaseStudy } from "@/data/caseStudies";
import { ArrowRightIcon } from "@/components/icons";

/**
 * Architecture diagram built from plain lists, so it reads correctly to screen
 * readers and reflows: steps stack vertically on phones, run left to right on
 * large screens.
 */
export function FlowDiagram({ study }: { study: CaseStudy }) {
  return (
    <div className="space-y-8">
      {study.lanes.map((lane) => (
        <figure key={lane.title} className="rounded-3xl border border-border bg-surface p-5 sm:p-6">
          <figcaption className="mb-5 font-mono text-xs tracking-[0.15em] text-accent uppercase">{lane.title}</figcaption>
          <ol className="flex flex-col gap-2 lg:flex-row lg:items-stretch lg:gap-0">
            {lane.steps.map((step, i) => (
              <Fragment key={step.name}>
                {i > 0 && (
                  <li aria-hidden="true" className="flex justify-center text-accent lg:items-center lg:px-1.5">
                    <ArrowRightIcon className="h-4 w-4 rotate-90 lg:rotate-0" />
                  </li>
                )}
                <li className="flex-1 rounded-2xl border border-border-strong/60 bg-background p-4 lg:min-w-0">
                  <p className="flex items-center gap-2 text-sm font-semibold">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-soft font-mono text-xs text-accent">
                      {i + 1}
                    </span>
                    {step.name}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted">{step.detail}</p>
                </li>
              </Fragment>
            ))}
          </ol>
        </figure>
      ))}

      <div className={`grid gap-6 ${study.aside ? "lg:grid-cols-2" : ""}`}>
        <figure className="rounded-3xl border border-dashed border-accent/60 bg-accent-soft/20 p-5 sm:p-6">
          <figcaption className="mb-4 font-mono text-xs tracking-[0.15em] text-accent uppercase">
            {study.branch.title}
          </figcaption>
          <ol className="space-y-3">
            {study.branch.steps.map((s, i) => (
              <li key={s} className="flex gap-3 text-sm leading-6">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-accent/60 font-mono text-xs text-accent">
                  {String.fromCharCode(97 + i)}
                </span>
                {s}
              </li>
            ))}
          </ol>
        </figure>

        {study.aside && (
          <figure className="rounded-3xl border border-border bg-surface p-5 sm:p-6">
            <figcaption className="mb-4 font-mono text-xs tracking-[0.15em] text-accent uppercase">
              {study.aside.title}
            </figcaption>
            <dl className="divide-y divide-border text-sm leading-6">
              {study.aside.rows.map(([k, v]) => (
                <div key={k} className="grid gap-1 py-2.5 first:pt-0 last:pb-0 sm:grid-cols-[9rem_1fr] sm:gap-4">
                  <dt className="font-medium">{k}</dt>
                  <dd className="text-muted">{v}</dd>
                </div>
              ))}
            </dl>
          </figure>
        )}
      </div>
    </div>
  );
}
