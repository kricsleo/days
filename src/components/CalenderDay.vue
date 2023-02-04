<script setup lang="ts">
import { Day, toggleSelect, toggleMark, start, end, marks, current } from '~/composables/days';
import { pressedDay, hoveredDay } from '~/composables/hover-select';
import { format, getMonth, isBefore, isSameDay, isSameMonth } from 'date-fns'

const props = defineProps<{
  date: number
  info: Day
}>()

const nodeRef = ref<HTMLDivElement>()
const { pressed } = useMousePressed({target: nodeRef})
const hovered = useElementHover(nodeRef)
const isStart = computed(() => start.value && isSameDay(start.value, props.date))
const isEnd = computed(() => end.value && isSameDay(end.value, props.date))
const isOddMonth = computed(() => getMonth(props.date) % 2 === 0)

watch(pressed, () => pressedDay.value = pressed.value ? props.date : undefined)
watch(hovered, () => hoveredDay.value = hovered.value ? props.date : undefined)
</script>

<template>
  <div
    ref="nodeRef"
    :id="String(info.id)"
    :class="[{
      'bg-gray-700': info.selected,
      'peace': info.peace,
    }]"
    p-1
    h-30
    cursor-pointer
    select-none
    @click="toggleSelect(date)"
    @contextmenu.prevent="toggleMark(date)">
    <div flex flex-wrap items-center gap-1 leading-none>
      <div whitespace-nowrap p-2px :class="[
        {'border rounded border-yellow': info.current}, 
        info.current ? 'text-yellow-5' : isOddMonth ? 'text-rose' : 'text-emerald-5']">
        <span text-5>{{ format(date, 'd') }}</span>
        <span text-2> /{{ format(date, 'L月') }}</span>
        <span v-if="info.tip" text-2>({{ info.tip }})</span>
      </div>
      <button v-if="marks.has(date)" i-carbon-star-filled text-yellow-5 />
    </div>
  </div>
</template>

<style scoped>
.peace {
  background-image: radial-gradient(#5a788650 15%, transparent 15%), radial-gradient(#5A788650 15%, transparent 15%);
  background-position: 0px 0px, 8px 8px;
  background-size: 16px 16px;
}
</style>
