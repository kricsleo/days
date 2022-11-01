<script setup lang="ts">
import { Day, toggleSelect, toggleMark } from '~/composables/days';
import { pressedDay, hoveredDay } from '~/composables/hover-select';
import { format } from 'date-fns'

const props = defineProps<{
  day: Date
  info: Day
}>()

const nodeRef = ref<HTMLDivElement>()
const { pressed } = useMousePressed({target: nodeRef})
const hovered = useElementHover(nodeRef)

watch(pressed, () => pressedDay.value = pressed.value ? props.day : undefined)
watch(hovered, () => hoveredDay.value = hovered.value ? props.day : undefined)
</script>

<template>
  <div
    ref="nodeRef"
    :id="info.id"
    h-20
    :text="info.selected ? info.peace ? ' red-200' : 'red-400' 
        : info.peace ? 'green-50' : 'green-200'"
    rounded-2
    grid="~ rows-3"
    justify-items-center
    items-center
    cursor-pointer
    select-none
    @click="toggleSelect(day)"
    @contextmenu.prevent="toggleMark(day)">
    <span text-xs leading-none>{{ format(day, 'MMM').toUpperCase() }}</span>
    <span font-bold text-2xl leading-none>{{ format(day, 'd') }}</span>
    <button ref="home" v-if="info.current" i-carbon-home text-orange />
    <button v-if="info.marked" i-carbon-star-filled text-orange />
  </div>
</template>
