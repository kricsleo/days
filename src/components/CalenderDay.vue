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
    }, isOddMonth ? 'text-red' : 'text-blue']"
    p-1
    h-30
    cursor-pointer
    select-none
    @click="toggleSelect(date)"
    @contextmenu.prevent="toggleMark(date)">
    <div flex items-center gap-1 leading-none text-sm>
      <div p-1 rounded :class="{'bg-yellow': info.current}">
        <span>{{ format(date, 'L月d号') }}</span>
        <span v-if="info.tip">({{ info.tip }})</span>
      </div>
      <span v-if="marks.has(date)">
        <button i-carbon-star-filled color-yellow />
      </span>
    </div>
  </div>
</template>

<style scoped>
.peace {
  background-image: radial-gradient(#5A7886 15%, transparent 15%), radial-gradient(#5A7886 15%, transparent 15%);
  background-position: 0px 0px, 8px 8px;
  background-size: 16px 16px;
}
.peace span {
  background-color: #121212;
}
</style>
