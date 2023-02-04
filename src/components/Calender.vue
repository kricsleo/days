<script setup lang="ts">
import { days, weeks, focusToday, addPrevDays, addNextDays } from '~/composables/days';
import { observerManager } from '@kricsleo/observer'

const prevLoader = ref<HTMLElement>()
const nextLoader = ref<HTMLElement>()
const container = ref<HTMLElement>()

onMounted(() => focusToday())

onMounted(() => {
  observerManager.registerObserver('loader', {
    root: container.value,
  });
  observerManager.observe('loader', prevLoader.value!, () => {
    addPrevDays(14)
    // scroll down a litte so that prev loader can be triggerred again
    container.value!.scrollTop = 10
  })
  observerManager.observe('loader', nextLoader.value!, () => addNextDays(14))
  return () => {
    observerManager.deleteObserver('loader')
  }
})
</script>

<template>
  <div flex="~ col" shrink-0 class="h-60vh mx-5">
    <div py-2 grid="~ cols-7" justify-items-center>
      <h5 
        v-for="week in weeks" 
        :key="week.name" 
        :op="week.peace ? '60' : ''">
        {{week.name}}
      </h5>
    </div>
    <div class="grow-1 overflow-auto border rounded" ref="container">
      <div h-1px ref="prevLoader" />
      <div grid="~ cols-7">
        <CalenderDay
          v-for="[date, info] in days.days.entries()"
          :key="info.id"
          :date="date"
          :info="info"
          class="day" />
      </div>
      <div h-1px ref="nextLoader" />
    </div>
  </div>
</template>

<style scoped>
.day {
  box-shadow: inset -1px 0px 0px #3a3e41,
    inset 0px -1px 0px #3a3e41;
}
.day:nth-of-type(7n) {
  border-right: none;

  box-shadow: inset 0px -1px 0px #3a3e41;
}
</style>
