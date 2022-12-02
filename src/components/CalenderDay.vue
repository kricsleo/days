<script setup lang="ts">
import { Day, toggleSelect, toggleMark, start, end, marks, current } from '~/composables/days';
import { pressedDay, hoveredDay } from '~/composables/hover-select';
import { format, isSameDay } from 'date-fns'

const props = defineProps<{
  date: number
  info: Day
}>()

const nodeRef = ref<HTMLDivElement>()
const { pressed } = useMousePressed({target: nodeRef})
const hovered = useElementHover(nodeRef)
const isStart = computed(() => start.value && isSameDay(start.value, props.date))
const isEnd = computed(() => end.value && isSameDay(end.value, props.date))

watch(pressed, () => pressedDay.value = pressed.value ? props.date : undefined)
watch(hovered, () => hoveredDay.value = hovered.value ? props.date : undefined)
</script>

<template>
  <div
    ref="nodeRef"
    :id="String(info.id)"
    :text="info.selected ? info.peace ? 'gray-1/50' : 'white'
      : info.peace ? 'gray/50 dark:gray-2/50' : 'red'"
    :class="[{
      'bg-red': info.selected,
      'rounded-l-full': isStart, 
      'rounded-r-full': isEnd,
    }]"
    flex="~ col" justify-center items-center
    wh-20
    cursor-pointer
    select-none
    @click="toggleSelect(date)"
    @contextmenu.prevent="toggleMark(date)">
    <div v-if="info.current" i-carbon:location-person-filled text-3xl color-yellow />
    <template v-else>
      <span leading-none text-sm>{{ info.tip || format(date, 'L月') }}</span>
      <span leading-none text-3xl font-bold>{{ format(date, 'd') }}</span>
    </template>
    <button v-if="marks.has(date)" i-carbon-star-filled text-yellow />
  </div>
</template>
