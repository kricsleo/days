import { max, min } from 'date-fns'
import { start, end } from './days'

export const pressedDay = ref<number>()
export const hoveredDay = ref<number>()

watch([pressedDay, hoveredDay], () => {
  if(pressedDay.value && hoveredDay.value && pressedDay.value !== hoveredDay.value) {
    start.value = min([
      pressedDay.value,
      hoveredDay.value
    ]).valueOf()
    end.value = max([
      pressedDay.value,
      hoveredDay.value
    ]).valueOf()
  }
})
