import { clearSelected, selectPeriod } from './days'

export const pressedDay = ref<Date>()
export const hoveredDay = ref<Date>()

watch([pressedDay, hoveredDay], () => {
  if(pressedDay.value && hoveredDay.value && pressedDay.value !== hoveredDay.value) {
    clearSelected()
    selectPeriod(pressedDay.value, hoveredDay.value)
  }
})
