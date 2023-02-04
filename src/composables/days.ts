import { StorageSerializers } from '@vueuse/core'
import { addDays, addWeeks, differenceInCalendarDays, eachDayOfInterval, endOfWeek, isToday, isWeekend, isWithinInterval, max, min, previousSunday, startOfDay, startOfWeek } from 'date-fns'
import { isChineseWorkingDay, isChineseHoliday, findChineseDay } from './chinese-holidays'

export interface Day {
  date: number
  id: number
  work: boolean
  peace: boolean
  current: boolean
  today: boolean
  selected: boolean
  tip: string
}

export interface Plan {
  id: number
  start: number | null
  end: number | null
  note?: string
}

export interface Mark {
  date: number
  note?: string
}

export const weeks = [
  { name: '周一', peace: false },
  { name: '周二', peace: false },
  { name: '周三', peace: false},
  { name: '周四', peace: false },
  { name: '周五', peace: false },
  { name: '周六', peace: true },
  { name: '周日', peace: true },
]

export const current = ref(startOfDay(Date.now() - 7*24*60*60*1000).valueOf())
export const start = useLocalStorage<number>('start', null, { serializer: StorageSerializers.object })
export const end = useLocalStorage<number>('end', null, { serializer: StorageSerializers.object })
export const hours = useLocalStorage('hours', 8)
export const planId = useLocalStorage('planId', Date.now())
export const plans = useLocalStorage<Map<number, Plan>>('plans', new Map(
  [[planId.value, {
    id: planId.value,
    start: start.value,
    end: end.value,
    note: ''
  }]]
))

const initStartDay = min(
  [...plans.value.values()]
  .map(plan => plan.start!)
  .concat(current.value)
  .filter(Boolean)
).valueOf()
const initPrevDays = differenceInCalendarDays(
  initStartDay,
  startOfWeek(addWeeks(initStartDay, -12), { weekStartsOn: 1 }),
)
const initNextDays = differenceInCalendarDays(
  endOfWeek(addWeeks(initStartDay, 24), { weekStartsOn: 1 }),
  initStartDay,
)
export const days = reactive({
  days: getNearbyDays(initStartDay, initPrevDays, initNextDays),
})

export const marks = useLocalStorage<Map<number, Mark>>('marks', new Map())

watch([start, end], () => {
  clearSelected()
  selectPeriod(start.value, end.value)
  const plan = plans.value.get(planId.value)!
  plan.start = start.value
  plan.end = end.value
}, { immediate: true })

watch(planId, () => {
  focusDay(start.value)
})

export function addPlan(plan: Plan) {
  const id = Date.now()
  plan.id = id
  plans.value.set(id, plan)
}

export function deletePlan(id: number) {
  plans.value.delete(id)
  if(id === planId.value) {
    planId.value = [...plans.value.keys()][0]
  }
}

export function usePlan(id: number) {
  if(planId.value === id) {
    focusDay(start.value)
  } else {
    planId.value = id
    const plan = plans.value.get(id)!
    start.value = plan.start
    end.value = plan.end
  }
}

export function toggleSelect(day: number) {
  if(start.value && end.value) {
    const isInPlan = isWithinInterval(day, {
      start: start.value,
      end: end.value
    })
    if(isInPlan) {
      if(start.value === end.value) {
        start.value = end.value = null
      } else {
        start.value = end.value = day
      }
    } else {
      if(start.value === end.value) {
        end.value = max([day, start.value]).valueOf()
        start.value = min([day, start.value]).valueOf()
      } else {
        start.value = end.value = day
      }
    }
  } else {
    start.value = end.value = day
  }
}

export function selectPeriod(day1?: number, day2?: number) {
  if(day1 && day2) {
    days.days.forEach((info, date) => {
      info.selected = isWithinInterval(date, {
        start: min([day1, day2]),
        end: max([day1, day2])
      })
    })
  } else if(day1 || day2) {
    const day = (day1 || day2)!
    days.days.get(day)!.selected = true
  }
}

export function clearSelected() {
  days.days.forEach(info => info.selected = false)
}

export function toggleMark(day: number) {
  if(marks.value.has(day)) {
    marks.value.delete(day)
  } else {
    marks.value.set(day, { date: day })
  }
}

export function addNextDays(count: number) {
  const lastDay = [...days.days][days.days.size - 1][0]
  const nextDays = getNextDays(lastDay, count)
  days.days = new Map([...days.days, ...nextDays])
}

export function addPrevDays(count: number) {
  const firstDay = [...days.days][0][0]
  const prevDays = getPrevDays(firstDay, count)
  days.days = new Map([...prevDays, ...days.days])
}

export function getNearbyDays(current: number, prev: number, next: number): Map<number, Day> {
  const prevDays = getPrevDays(current, prev)
  const nextDays = getNextDays(current, next)
  return new Map([...prevDays, [current, getDay(current)], ...nextDays])
}

export function getPrevDays(current: number, prev: number): Map<number, Day> {
  const days = eachDayOfInterval({
    start: addDays(current, -prev),
    end: addDays(current, -1),
  })
  return new Map(days.map(day => [day.valueOf(), getDay(day.valueOf())]))
}

export function getNextDays(current: number, next: number): Map<number, Day> {
  const days = eachDayOfInterval({
    start: addDays(current, 1),
    end: addDays(current, next),
  })
  return new Map(days.map(day => [day.valueOf(), getDay(day.valueOf())]))
}

export function focusDay(day: number) {
  const targetId = getDay(previousSunday(day).valueOf()).id
  const targetDayNode = document.getElementById(String(targetId))
  targetDayNode?.scrollIntoView()
}

export function focusToday() {
  focusDay(current.value)
}

export function getDay(day: number): Day {
  const chineseDay = findChineseDay(day)
  const tip = chineseDay ? chineseDay.type === 'holiday' 
    ? chineseDay.name
    : chineseDay.type === 'workingday'
    ? `补班`
    : '' : ''
  return {
    id: day,
    date: day,
    current: current.value === day,
    today: isToday(day),
    work: isWorkingDay(day),
    peace: isPeaceDay(day),
    selected: false,
    tip
  }
}

export function isWorkingDay(day: number | Date): boolean {
  return isWeekend(day) ? isChineseWorkingDay(day)
  : !isChineseHoliday(day)
}

export function isPeaceDay(day: number | Date): boolean {
  return isWeekend(day) ? !isChineseWorkingDay(day)
    : isChineseHoliday(day)
}
