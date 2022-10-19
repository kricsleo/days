import { addDays, addWeeks, differenceInCalendarDays, eachDayOfInterval, endOfWeek, isToday, isWeekend, startOfWeek } from 'date-fns'
import { isChineseWorkingDay, isChineseHoliday, findChineseDay } from './chinese-holidays'

interface Day {
  work: boolean
  peace: boolean
  current: boolean
  today: boolean
  tip: string
}

export const weeks = [
  { name: 'Mon' },
  { name: 'Tue' },
  { name: 'Wed' },
  { name: 'Thu' },
  { name: 'Fri' },
  { name: 'Sat' },
  { name: 'Sun' },
]

const current = ref(new Date())
const initPrevDays = computed(() => differenceInCalendarDays(
  current.value,
  startOfWeek(addWeeks(current.value, -2), { weekStartsOn: 1 }),
))
const initNextDays = computed(() => differenceInCalendarDays(
  endOfWeek(addWeeks(current.value, 7), { weekStartsOn: 1 }),
  current.value,
))

export const days = reactive({
  days: getNearbyDays(current.value, initPrevDays.value, initNextDays.value),
})

export function getNearbyDays(current: Date, prev: number, next: number): Map<Date, Day> {
  const prevDays = getPrevDays(current, prev)
  const nextDays = getNextDays(current, next)
  return new Map([...prevDays, [current, getDay(current)], ...nextDays])
}

export function getPrevDays(current: Date, prev: number): Map<Date, Day> {
  const days = eachDayOfInterval({
    start: addDays(current, -prev),
    end: addDays(current, -1),
  })
  return new Map(days.map(day => [day, getDay(day)]))
}

export function getNextDays(current: Date, next: number): Map<Date, Day> {
  const days = eachDayOfInterval({
    start: addDays(current, 1),
    end: addDays(current, next),
  })
  return new Map(days.map(day => [day, getDay(day)]))
}

function getDay(day: Date): Day {
  const chineseDay = findChineseDay(day)
  const tip = chineseDay ? chineseDay.type === 'holiday' 
    ? chineseDay.name
    : chineseDay.type === 'workingday'
    ? `补班(${chineseDay.name})`
    : '' : ''
  return {
    current: current.value === day,
    today: isToday(day),
    work: isWorkingDay(day),
    peace: isPeaceDay(day),
    tip
  }
}

export function isWorkingDay(day: Date): boolean {
  return isWeekend(day) ? isChineseWorkingDay(day)
  : !isChineseHoliday(day)
}

export function isPeaceDay(day: Date): boolean {
  return isWeekend(day) ? !isChineseWorkingDay(day)
    : isChineseHoliday(day)
}
