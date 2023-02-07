<script setup lang="ts">
import { Day, planRef, toggleMark, marks } from '~/composables/days';
import { format, getMonth, isSameDay, isWithinInterval, max, min } from 'date-fns'
import { computed } from 'vue';
import { noop } from 'unocss';

const props = defineProps<{
  day: Day
}>()

const isOddMonth = computed(() => getMonth(props.day.date) % 2 === 0)
const currentDayPlans = computed(() => {
  const includedPlans = planRef.planner.plans.filter(
    plan => isWithinInterval(props.day.date, { start: plan.start, end: plan.end })
  )
  const formattedPlans = includedPlans.map(plan => ({
    ...plan,
    isStart: isSameDay(props.day.date, plan.start),
    isEnd: isSameDay(props.day.date, plan.end),
  }))
  const maxLane = formattedPlans.reduce((lane, plan) => Math.max(lane, plan.lane), -1)
  const filledPlans = Array.from(
    {length: maxLane + 1}, (_, lane) => formattedPlans.find(plan => plan.lane === lane) || {id: null, lane}
    ).sort((a, b) => b.lane - a.lane)
  return filledPlans;
})

function mousedown() {
  const newPlanId = planRef.planner.add(props.day.date, props.day.date)
  planRef.editingPlanId = newPlanId
}
function mouseup() {
  planRef.editingPlanId = null
}
function mouseover() {
  if(!planRef.editingPlanId) {
    return
  }
  const editingPlan = planRef.planner.get(planRef.editingPlanId)
  if(editingPlan) {
    const start = min([props.day.date, editingPlan.start, editingPlan.end]).valueOf()
    const end = max([props.day.date, editingPlan.start, editingPlan.end]).valueOf()
    planRef.planner.delete(planRef.editingPlanId)
    const newPlanId = planRef.planner.add(start, end)
    planRef.editingPlanId = newPlanId
  }
}
</script>

<template>
  <div
    :id="String(day.id)"
    :class="[{ 'peace': day.peace, }]"
    flex flex-col h-35 cursor-pointer select-none leading-none
    @contextmenu.prevent="toggleMark(day.date)"
    @mousedown="mousedown"
    @mouseup="mouseup"
    @mouseover="mouseover">

    <div inline-block whitespace-nowrap p-2px m-1 :class="[
      {'border rounded border-yellow': day.current}, 
      day.current ? 'text-yellow-5' : isOddMonth ? 'text-rose' : 'text-emerald-5']">
      <span text-5>{{ format(day.date, 'd') }}</span>
      <span text-2> /{{ format(day.date, 'L月') }}</span>
      <span v-if="day.tip" text-2>({{ day.tip }})</span>
    </div>
    <div v-if="marks.has(day.date)" i-carbon-star-filled text-yellow-5 />

    <div mt-auto />
    <template v-for="(plan, idx) in currentDayPlans" :key="idx">
      <div v-if="plan.id" :class="[
        'mb-1 h-5 whitespace-nowrap overflow-hidden bg-sky-5 text-light y-center px-2', {
          'rounded-l': plan.isStart,
          'rounded-r mr-2': plan.isEnd,
        }]" :style="{backgroundColor: plan.color}">
        <div v-if="plan.isStart" z-1 y-center>
          <button i-carbon:close title="delete" @mousedown.stop="planRef.planner.delete(plan.id)" />
          working: {{ plan.workDays }}d = {{ plan.workHours }}h
          peace: {{ plan.offDays }}d
        </div>
      </div>
      <div v-else class="mb-1 h-5 pointer-events-none" />
    </template>

  </div>
</template>

<style scoped>
.peace {
  background-image: radial-gradient(#5a788650 15%, transparent 15%), radial-gradient(#5A788650 15%, transparent 15%);
  background-position: 0px 0px, 8px 8px;
  background-size: 16px 16px;
}
</style>
