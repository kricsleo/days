import { addDays, addWeeks, differenceInCalendarDays, eachDayOfInterval, endOfWeek, format, isSameDay, isToday, isWeekend, isWithinInterval, max, min, previousSunday, startOfDay, startOfWeek } from 'date-fns'
import { isChineseWorkingDay, isChineseHoliday, findChineseDay } from './chinese-holidays'

export interface Day {
  id: string
  work: boolean
  peace: boolean
  current: boolean
  today: boolean
  selected: boolean
  marked: boolean
  tip: string
}

export interface Plan {
  start?: Date
  end?: Date
  note?: string
}

export const weeks = [
  { name: 'Mo', peace: false },
  { name: 'Tu', peace: false },
  { name: 'We', peace: false},
  { name: 'Th', peace: false },
  { name: 'Fr', peace: false },
  { name: 'Sa', peace: true },
  { name: 'Su', peace: true },
]

export const current = ref(startOfDay(new Date()))

const initPrevDays = computed(() => differenceInCalendarDays(
  current.value,
  startOfWeek(addWeeks(current.value, -12), { weekStartsOn: 1 }),
))
const initNextDays = computed(() => differenceInCalendarDays(
  endOfWeek(addWeeks(current.value, 24), { weekStartsOn: 1 }),
  current.value,
))

export const days = reactive({
  days: getNearbyDays(current.value, initPrevDays.value, initNextDays.value),
})

export const start = ref<Date>()
export const end = ref<Date>()
export const planId = ref(Date.now().toString())

export const plans = reactive<Map<string, Plan>>(new Map(
  [[planId.value, {
    start: start.value,
    end: end.value,
    note: ''
  }]]
))

export function addPlan(plan: Plan) {
  const id = Date.now().toString()
  plans.set(id, plan)
}

export function deletePlan(id: string) {
  plans.delete(id)
  if(id === planId.value) {
    planId.value = [...plans.keys()][0]
  }
}

export function usePlan(id: string) {
  planId.value = id
  const plan = plans.get(id)!
  start.value = plan.start
  end.value = plan.end
}

watch([start, end], () => {
  clearSelected()
  selectPeriod(start.value, end.value)
  const plan = plans.get(planId.value)!
  plan.start = start.value
  plan.end = end.value
})

watch(planId, () => {
  start.value && focusDay(start.value)
})

export function toggleSelect(day: Date) {
  if(start.value && end.value) {
    const isInPlan = isWithinInterval(day, {
      start: start.value,
      end: end.value
    })
    if(isInPlan) {
      if(start.value === end.value) {
        start.value = end.value = undefined
      } else {
        start.value = end.value = day
      }
    } else {
      if(start.value === end.value) {
        end.value = max([day, start.value])
        start.value = min([day, start.value])
      } else {
        start.value = end.value = day
      }
    }
  } else {
    start.value = end.value = day
  }
}

// export function toggleSelect(day: Date) {
//   const info  = days.days.get(day)!
//   const selectedDates = [...selectedDays.value.keys()]
//   if(info.selected) {
//     const hasPeriod = selectedDates.length > 1
//     if(hasPeriod) {
//       clearSelected()
//       info.selected = true
//     } else {
//       info.selected = false
//     }
//   } else {
//     const hasPeriodStart = selectedDates.length === 1
//     if(hasPeriodStart) {
//       selectPeriod(selectedDates[0], day)
//     } else {
//       clearSelected()
//       info.selected = true
//     }
//   }
// }

export function selectPeriod(day1?: Date, day2?: Date) {
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

export function toggleMark(day: Date) {
  const info  = days.days.get(day)!
  info.marked = !info.marked
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

export function focusDay(day: Date) {
  const targetId = getDay(previousSunday(day)).id
  const targetDayNode = document.getElementById(targetId)
  targetDayNode?.scrollIntoView()
}

export function focusToday() {
  focusDay(current.value)
}

export function getDay(day: Date): Day {
  const chineseDay = findChineseDay(day)
  const tip = chineseDay ? chineseDay.type === 'holiday' 
    ? chineseDay.name
    : chineseDay.type === 'workingday'
    ? `补班`
    : '' : ''
  return {
    id: `day_${day.valueOf()}`,
    current: current.value === day,
    today: isToday(day),
    work: isWorkingDay(day),
    peace: isPeaceDay(day),
    selected: false,
    marked: false,
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
