<script setup lang="ts">
import { Day, toggleSelect, toggleMark, start, end } from '~/composables/days';
import { pressedDay, hoveredDay } from '~/composables/hover-select';
import { format, isSameDay } from 'date-fns'

const props = defineProps<{
  day: Date
  info: Day
}>()

const nodeRef = ref<HTMLDivElement>()
const { pressed } = useMousePressed({target: nodeRef})
const hovered = useElementHover(nodeRef)
const isStart = computed(() => start.value && isSameDay(start.value, props.day))
const isEnd = computed(() => end.value && isSameDay(end.value, props.day))

watch(pressed, () => pressedDay.value = pressed.value ? props.day : undefined)
watch(hovered, () => hoveredDay.value = hovered.value ? props.day : undefined)
</script>

<template>
  <div
    ref="nodeRef"
    :id="info.id"
    :text="info.selected ? info.peace ? 'gray-1/30' : 'white'
      : info.peace ? 'gray/50 dark:gray-2/50' : 'rose-4'"
    :class="[{
      'bg-rose-4': info.selected,
      'rounded-lt-4': isStart, 
      'rounded-rb-4': isEnd, 
      'rounded-4': isStart && isEnd
    }]"
    h-18
    flex="~ col" justify-center items-center
    cursor-pointer
    select-none
    @click="toggleSelect(day)"
    @contextmenu.prevent="toggleMark(day)">
    <span text-xs leading-none>{{ format(day, 'MMM').toUpperCase() }}</span>
    <span font-bold text-2xl leading-none wh-7 flex items-center justify-center :class="{'outline': info.current}" rounded-full my-1>{{ format(day, 'd') }}</span>
    <button v-if="info.marked" i-carbon-star-filled text-yellow />
  </div>
</template>
