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
    :text="info.selected ? info.peace ? 'gray-2' : 'white-4'
      : info.peace ? 'gray' : 'red-2'"
    :bg="info.selected ? 'red-4' : ''"
    :op="info.peace ? '50' : ''"
    :class="{'rounded-lt-4': isStart, 'rounded-rb-4': isEnd, 'rounded-4': isStart && isEnd}"
    h-15
    flex="~ col"
    justify-center
    items-center
    cursor-pointer
    select-none
    @click="toggleSelect(day)"
    @contextmenu.prevent="toggleMark(day)">
    <span text-xs leading-none mb-1>{{ format(day, 'MMM').toUpperCase() }}</span>
    <span font-bold text-2xl leading-none>{{ format(day, 'd') }}</span>
    <button ref="home" v-if="info.current" i-carbon-home text-orange />
    <button v-if="info.marked" i-carbon-star-filled text-orange />
  </div>
</template>
