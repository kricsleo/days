import { max, min } from 'date-fns'
import { start, end } from './days'

export const pressedDay = ref<Date>()
export const hoveredDay = ref<Date>()

watch([pressedDay, hoveredDay], () => {
  if(pressedDay.value && hoveredDay.value && pressedDay.value !== hoveredDay.value) {
    start.value = min([
      pressedDay.value,
      hoveredDay.value
    ])
    end.value = max([
      pressedDay.value,
      hoveredDay.value
    ])
  }
})
