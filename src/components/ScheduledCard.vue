<script setup lang="ts">
import { eachDayOfInterval, format } from 'date-fns';
import { getDay, usePlan, deletePlan, addPlan, plans, planId as currentPlanId, hours } from '~/composables/days';

const props = defineProps<{
  planId: number
  deletable?: boolean
}>()

const plan = computed(() => plans.value.get(props.planId)!)
const using = computed(() => props.planId === currentPlanId.value)
const selectedDays = computed(() => {
  const inRangeDays = plan.value.start && plan.value.end ? eachDayOfInterval({
    start: plan.value.start,
    end: plan.value.end,
  }) : []
  return inRangeDays.map(day => getDay(day.valueOf()))
})
const workingDays = computed(() => selectedDays.value.filter(day => day.work).length)
const peaceDays = computed(() => selectedDays.value.filter(day => day.peace).length)
// const inputHours = ref(8)
const workingHours = computed(() => workingDays.value * hours.value)

// const inputRef = ref<HTMLInputElement>()
</script>

<template>
  <section @click="usePlan(planId)" shrink-0 text-xl px-2 py-3 border-b space-y-sm :class="{'bg-red/10': using}">
    <div flex items-center>
      <div i-carbon:time mr-2 />
      <h5 v-if="plan.start && plan.end" flex items-center>
        {{format(plan.start, 'MM.dd')}}
        <div v-if="plan.start !== plan.end" i-carbon:direction-straight-right mx-1 />
        <span v-if="plan.start !== plan.end">{{format(plan.end, 'MM.dd')}}</span>
      </h5>
      <div ml-auto text-2xl flex items-center op-50 hover:op-100>
        <button v-if="!deletable" i-carbon:add @click.stop="addPlan({...plan})" title="Add this plan." />
        <button v-if="deletable" i-carbon:close @click.stop="deletePlan(planId)" title="Remove this plan!" />
      </div>
    </div>

    <!-- <div flex items-center mt-2 mb-4 text-gray>
      <label :for="`input_${planId}`" i-carbon:pen class="mr-2" />
      <input
        ref="inputRef"
        :id="`input_${planId}`"
        :modelValue="plan.note" 
        placeholder="notes..."
        @update:modelValue="plan.note = $event" 
        @keyup.enter="inputRef?.blur()"
        bg-transparent outline-none w-50 />
    </div> -->

    <div x-between gap-2 text-2xl>
      <div y-center gap-2>
        <div text-white bg-red wh-12 rounded-2 center>
          <div i-carbon:face-dizzy />
        </div>
        <div>
          <div font-bold>{{workingDays}}</div>
          <div op-60 text-sm>Working days</div>
        </div>
      </div>

      <div y-center gap-2>
        <div text-white bg-red wh-12 rounded-2 center>
          <div i-carbon:face-dizzy />
        </div>
        <div>
          <div font-bold>{{workingHours}}</div>
          <div op-60 text-sm>Working hours</div>
        </div>
      </div>

      <div y-center gap-2>
        <div text-white bg-green wh-12 rounded-2 center>
          <div i-carbon:face-cool />
        </div>
        <div>
          <div font-bold>{{peaceDays}}</div>
          <div op-60 text-sm>Rest days</div>
        </div>
      </div>
    </div>

  </section>
</template>

<style scoped lang="scss">
</style>
