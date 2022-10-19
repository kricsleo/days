import { addDays, addWeeks, differenceInCalendarDays, eachDayOfInterval, endOfWeek, startOfWeek }  from 'date-fns'

const weeks = [
  {name: 'Mon'},
  {name: 'Tue'},
  {name: 'Wed'},
  {name: 'Thu'},
  {name: 'Fri'},
  {name: 'Sat'},
  {name: 'Sun'},
]
const current = shallowRef(new Date())
const initPrevDays = computed(() => differenceInCalendarDays(
  current.value,
  startOfWeek(addWeeks(current.value, -2), { weekStartsOn: 1}),
))
const initNextDays = computed(() => differenceInCalendarDays(
  endOfWeek(addWeeks(current.value, 7), { weekStartsOn: 1}),
  current.value,
))

export const days = reactive({
  days: getNearbyDays(current.value, initPrevDays.value, initNextDays.value),
})

export function getNearbyDays(current: Date, prev: number, next: number): Date[] {
  const prevDays = getPrevDays(current, prev)
  const nextDays = getNextDays(current, next)
  return [...prevDays, current, ...nextDays]
}

export function getPrevDays(current: Date, prev: number): Date[] {
  const days = eachDayOfInterval({
    start: addDays(current, -prev),
    end: addDays(current, -1)
  })
  return days
}

export function getNextDays(current: Date, next: number): Date[] {
  const days = eachDayOfInterval({
    start: addDays(current, 1),
    end: addDays(current, next)
  })
  return days
}
