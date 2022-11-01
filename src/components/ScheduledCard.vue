<script setup lang="ts">
import { eachDayOfInterval, format } from 'date-fns';
import { getDay, usePlan, deletePlan, addPlan } from '~/composables/days';

const props = defineProps<{
  planId?: string
  start?: Date
  end?: Date
  using?: boolean
  useable?: boolean
}>()

// const input = ref('')

const selectedDays = computed(() => {
  const inRangeDays = props.start && props.end ? eachDayOfInterval({
    start: props.start,
    end: props.end,
  }) : []
  return inRangeDays.map(day => getDay(day))
})
const workingDays = computed(() => selectedDays.value.filter(day => day.work).length)
const peaceDays = computed(() => selectedDays.value.filter(day => day.peace).length)
const inputHours = ref(8)
const workingHours = computed(() => workingDays.value * inputHours.value)
</script>

<template>
  <section p-2 border-b :class="{'bg-gray-200/20': using}">
    <div flex items-center>
      <h5 flex items-center>
        {{start ? format(start, 'MM.dd') : '?'}}
        <div i-carbon:floating-ip />
        {{end ? format(end, 'MM.dd') : '?'}}
      </h5>
      <div ml-auto text-xl flex items-center>
        <button v-if="useable || planId" i-carbon:calendar-heat-map @click="usePlan(planId!)" title="Plan it!" />
        <button v-if="!planId && start && end" i-carbon:add @click="addPlan(start!, end!)" title="Add this plan." />
        <button v-if="planId" i-carbon:close @click="deletePlan(planId!)" title="Remove this plan!" />
      </div>
    </div>
    <div flex items-center gap-2 mt-2>
      <div wh-15 text-3xl rounded-2 bg-red flex items-center justify-center>
        <div i-carbon:face-pending-filled />
      </div>
      <div mt-1>
        <div>{{workingDays}} d x {{inputHours}} h/d = {{workingHours}} hours</div>
        <div op-60>Working</div>
      </div>
    </div>

    <div flex items-center gap-2 mt-2>
      <div wh-15 text-3xl rounded-2 bg-green flex items-center justify-center>
        <div i-carbon:face-wink-filled />
      </div>
      <div mt-1>
        <div>{{peaceDays}} d</div>
        <div op-60>Peace</div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
</style>
