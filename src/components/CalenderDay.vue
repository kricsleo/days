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
      'bg-red': info.selected,
      'rounded-l-full': isStart, 
      'rounded-r-full': isEnd,
      'peace': info.peace,
    }, isOddMonth ? 'text-red' : 'text-blue']"
    p-1
    wh-20
    cursor-pointer
    select-none
    @click="toggleSelect(date)"
    @contextmenu.prevent="toggleMark(date)">
    <div v-if="info.current" i-carbon:user-avatar-filled text-3xl color-yellow />
    <template v-else>
      <span leading-none text-6>{{ format(date, 'd') }}</span>
      <span leading-none text-2 text-center>/{{ info.tip || format(date, 'L月') }}</span>
    </template>
    <button v-if="marks.has(date)" i-carbon-star-filled text-yellow />
  </div>
</template>

<style scoped>
.peace {
  background-image: radial-gradient(#9ca3af 1px,transparent 0);
  background-size: 10px 10px;
}
.peace * {
  background-color: #121212;
}
</style>
