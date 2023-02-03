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
    px-1
    h-30
    cursor-pointer
    select-none
    @click="toggleSelect(date)"
    @contextmenu.prevent="toggleMark(date)">
    <!-- <span text-xl leading-none>{{ format(date, 'd') }}</span>
      <span text-xs leading-none>/{{ format(date, 'L月') }}</span> -->
      <div inline-block px-1 rounded leading-none :class="{'bg-yellow': info.current}">
        <span text-xs>{{ format(date, 'L月d号') }}</span>
        <span v-if="info.tip" text-xs>({{ info.tip }})</span>
      </div>
      <button v-if="marks.has(date)" i-carbon-star-filled class="!bg-yellow" />
      <!-- <div v-if="info.current" i-carbon:user-avatar-filled inline-block text-xs color-yellow /> -->
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
