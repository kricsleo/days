<script setup lang="ts">
import { Day, toggleSelect, toggleMark, start, end, marks, current, hours, getDay, plans, deletePlan } from '~/composables/days';
import { pressedDay, hoveredDay } from '~/composables/hover-select';
import { eachDayOfInterval, format, getMonth, isBefore, isSameDay, isSameMonth, isWithinInterval } from 'date-fns'

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

const includedPlans = computed(() => Array.from(plans.value.values()).filter(
  plan => plan.start && plan.end && isWithinInterval(props.date, { start: plan.start, end: plan.end })
))

const selectedDays = computed(() => {
  const inRangeDays = start.value && end.value ? eachDayOfInterval({
    start: start.value,
    end: end.value,
  }) : []
  return inRangeDays.map(day => getDay(day.valueOf()))
})
const workingDays = computed(() => selectedDays.value.filter(day => day.work).length)
const peaceDays = computed(() => selectedDays.value.filter(day => day.peace).length)
// const inputHours = ref(8)
const workingHours = computed(() => workingDays.value * hours.value)

watch(pressed, () => pressedDay.value = pressed.value ? props.date : undefined)
watch(hovered, () => hoveredDay.value = hovered.value ? props.date : undefined)
</script>

<template>
  <div
    ref="nodeRef"
    :id="String(info.id)"
    :class="[{ 'peace': info.peace, }]"
    flex flex-col h-30 cursor-pointer select-none leading-none
    @click="toggleSelect(date)"
    @contextmenu.prevent="toggleMark(date)">
    <div inline-block whitespace-nowrap p-2px m-1 :class="[
      {'border rounded border-yellow': info.current}, 
      info.current ? 'text-yellow-5' : isOddMonth ? 'text-rose' : 'text-emerald-5']">
      <span text-5>{{ format(date, 'd') }}</span>
      <span text-2> /{{ format(date, 'L月') }}</span>
      <span v-if="info.tip" text-2>({{ info.tip }})</span>
    </div>
    <div v-if="marks.has(date)" i-carbon-star-filled text-yellow-5 />

    <div mt-auto />
    <div v-for="plan in includedPlans" :key="plan.id" :class="['mb-1 h-20% whitespace-nowrap bg-sky-5 text-light y-center px-2', {
      'rounded-l': isStart,
      'rounded-r mr-2': isEnd,
    }]">
      <div v-if="isStart" z-1 y-center>
        <button i-carbon:close title="Remove" @click="deletePlan(plan.id)" />
        working: {{ workingDays }}d = {{ workingHours }}h
        peace: {{ peaceDays }}d
      </div>
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
