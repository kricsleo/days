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
    :bg="info.selected ? info.peace ? ' ~ red-1' : '~ red' 
        : info.peace ? '~ green-1' : '~ green-3'"
    rounded-2
    grid="~ rows-3"
    cursor-pointer
    text-center
    select-none
    @click="toggleSelect(day)"
    py-2
    @contextmenu.prevent="toggleMark(day)">
    <span text-xs>{{ format(day, 'MMM').toUpperCase() }}</span>
    <span font-bold text-2xl>{{ format(day, 'd') }}</span>
    <button ref="home" v-if="info.current" i-carbon-home />
    <button v-if="info.marked" i-carbon-star-filled text-orange />
  </div>
</template>
