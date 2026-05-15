import type { IssueSummary } from '../types/content'

const issueStartYear = 2026
const issueStartMonthIndex = 3

const issueLabelByNumber: Record<string, string> = {
  '001': 'Signals From The Human Layer',
  '002': 'Fintech AI and annotation intelligence',
}

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const issueStrapline =
  'A monthly field guide to the people, products, and patterns shaping applied AI.'

export function getIssueSummaryForDate(value: Date | string | null | undefined): IssueSummary {
  const publishedDate = value ? new Date(value) : new Date()
  const safeDate = Number.isNaN(publishedDate.getTime()) ? new Date() : publishedDate
  const monthDelta =
    (safeDate.getFullYear() - issueStartYear) * 12 +
    (safeDate.getMonth() - issueStartMonthIndex)
  const issueNumber = String(Math.max(0, monthDelta) + 1).padStart(3, '0')

  return {
    issueNumber,
    issueLabel: issueLabelByNumber[issueNumber] ?? `Issue ${issueNumber}`,
    releaseDate: `${monthNames[safeDate.getMonth()]} ${safeDate.getFullYear()}`,
    strapline: issueStrapline,
  }
}
