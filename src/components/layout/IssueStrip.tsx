import type { IssueSummary } from '../../types/content'

interface IssueStripProps {
  issue: IssueSummary
}

export function IssueStrip({ issue }: IssueStripProps) {
  return (
    <section id="issue" className="border-b border-white/10 bg-white/4">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 text-sm text-white/62 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-white/45">
            Issue {issue.issueNumber}
          </span>
          <span className="hidden h-px w-14 bg-white/12 sm:block" />
          <p className="font-medium text-white/82">{issue.issueLabel}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <p>{issue.strapline}</p>
          <span className="hidden h-1 w-1 rounded-full bg-white/25 sm:block" />
          <p className="text-white/45">{issue.releaseDate}</p>
        </div>
      </div>
    </section>
  )
}
