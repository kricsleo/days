<script setup lang="ts">
import { eachDayOfInterval, format } from 'date-fns';
import { getDay, usePlan, deletePlan, addPlan, plans, planId as currentPlanId } from '~/composables/days';

const props = defineProps<{
  planId: string
  deletable?: boolean
}>()

const plan = computed(() => plans.get(props.planId)!)
const using = computed(() => props.planId === currentPlanId.value)
const selectedDays = computed(() => {
  const inRangeDays = plan.value.start && plan.value.end ? eachDayOfInterval({
    start: plan.value.start,
    end: plan.value.end,
  }) : []
  return inRangeDays.map(day => getDay(day))
})
const workingDays = computed(() => selectedDays.value.filter(day => day.work).length)
const peaceDays = computed(() => selectedDays.value.filter(day => day.peace).length)
// const inputHours = ref(8)
// const workingHours = computed(() => workingDays.value * inputHours.value)

const inputRef = ref<HTMLInputElement>()
</script>

<template>
  <section @click="usePlan(planId)" p-2 border-b :class="{'bg-gray-200/20': using}">
    <div flex items-center>
      <div i-carbon:calendar-heat-map mr-2 />
      <h5 v-if="plan.start && plan.end" flex items-center>
        {{format(plan.start, 'MM.dd')}}
        <div v-if="plan.start !== plan.end" i-carbon:direction-straight-right mx-1 />
        <span v-if="plan.start !== plan.end">{{format(plan.end, 'MM.dd')}}</span>
      </h5>
      <div ml-auto text-xl flex items-center>
        <button v-if="!deletable" i-carbon:add @click="addPlan({...plan})" title="Add this plan." />
        <button v-if="deletable" i-carbon:close @click="deletePlan(planId)" title="Remove this plan!" />
      </div>
    </div>
    <div flex items-center mt-2>
      <label :for="`input_${planId}`" i-carbon:pen class="mr-2" />
      <input 
        ref="inputRef"
        :id="`input_${planId}`"
        :modelValue="plan.note" 
        placeholder="note..."
        @update:modelValue="plan.note = $event" 
        @keyup.enter="inputRef?.blur()"
        bg-transparent outline-none w-50 />
    </div>
    <div flex items-center gap-2 mt-2>
      <div wh-15 text-3xl rounded-2 bg-red flex items-center justify-center>
        <div i-carbon:face-pending-filled />
      </div>
      <div mt-1>
        <div>{{workingDays}}</div>
        <div op-60>Working days</div>
      </div>
    </div>

    <div flex items-center gap-2 mt-2>
      <div wh-15 text-3xl rounded-2 bg-green flex items-center justify-center>
        <div i-carbon:face-wink-filled />
      </div>
      <div mt-1>
        <div>{{peaceDays}}</div>
        <div op-60>Peace days</div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
</style>
