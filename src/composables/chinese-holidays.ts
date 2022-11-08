import { isWithinInterval } from 'date-fns'

interface Holiday {
  name: string
  range: [string, string?]
  type: 'workingday' | 'holiday'
}

const holidayJson: Record<string, Holiday[]> = import.meta.glob([
  '/chinese-holidays-data/data/*.json',
  '!**/index.json',
], { eager: true, import: 'default' })

export const holidays = Object.values(holidayJson).flat()

export function isChineseHoliday(day: number | Date): boolean {
  const holiday = findChineseDay(day)
  return holiday?.type === 'holiday'
}

export function isChineseWorkingDay(day: number | Date): boolean {
  const holiday = findChineseDay(day)
  return holiday?.type === 'workingday'
}

export function findChineseDay(day: number | Date): Holiday | undefined {
  return holidays.find(holiday => isWithinInterval(day, {
    // `T00:00` converts date to local timezone
    start: new Date(holiday.range[0] + 'T00:00'),
    end: new Date((holiday.range[1] || holiday.range[0]) + 'T00:00'),
  }))
}
