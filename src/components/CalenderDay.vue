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
    :text="info.selected ? info.peace ? 'gray-1/50' : 'white'
      : info.peace ? 'gray/50 dark:gray-2/50' : 'red'"
    text-2xl
    :class="[{
      'bg-red': info.selected,
      'rounded-l-full': isStart, 
      'rounded-r-full': isEnd,
    }]"
    flex="~ col" justify-center items-center
    wh-14
    cursor-pointer
    select-none
    @click="toggleSelect(day)"
    @contextmenu.prevent="toggleMark(day)">
    <div v-if="info.current" i-carbon:location-person-filled text-3xl color-yellow />
    <template v-else>
      <span leading-none text-sm scale-70>{{ info.tip || format(day, 'MMM').toUpperCase() }}</span>
      <span leading-none font-bold>{{ format(day, 'd') }}</span>
    </template>
    <button v-if="info.marked" i-carbon-star-filled text-yellow />
  </div>
</template>
