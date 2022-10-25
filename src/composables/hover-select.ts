import { clearSelected, days, selectPeriod } from './days'
// @ts-ignore
import ArrowLine from 'arrow-line'

export const pressedDay = ref<Date>()
export const hoveredDay = ref<Date>()
let arrowLine: any

watch([pressedDay, hoveredDay], () => {
  if(pressedDay.value && hoveredDay.value && pressedDay.value !== hoveredDay.value) {
    clearSelected()
    selectPeriod(pressedDay.value, hoveredDay.value)
    const [sourceId, targetId] = [pressedDay.value, hoveredDay.value].map(day => days.days.get(day)!.id)
    if(arrowLine) {
      arrowLine.update({source: `#${sourceId}`, destination: `#${targetId}`})
    } else {
      arrowLine = new ArrowLine(
        `#${sourceId}`, 
        `#${targetId}`, 
        {
          curvature: 0, 
          endpoint: {type: 'circles' }, 
          style: 'dot',
          color: '#7f1d1d'
        }
      )
    }
  } else if (!pressedDay.value){
    arrowLine?.remove()
    arrowLine = undefined
  }
})

