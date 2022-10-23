import { clearSelected, selectPeriod } from './days'

export const anyDayPressed = ref(false)

export const pressedDay = ref<Date>()
export const hoveredDay = ref<Date>()

watch(hoveredDay, () => {
  if(pressedDay.value && hoveredDay.value) {
    clearSelected()
    selectPeriod(pressedDay.value, hoveredDay.value)
  }
})

