<script setup lang="ts">
import { weeks, focusToday, daysRef } from '~/composables/days';
import { observerManager } from '@kricsleo/observer'
import { ref, onMounted } from 'vue';
import CalenderDay from './CalenderDay.vue'

const prevLoader = ref<HTMLElement>()
const nextLoader = ref<HTMLElement>()
const container = ref<HTMLElement>()

onMounted(() => focusToday())

onMounted(() => {
  observerManager.registerObserver('loader', {
    root: container.value,
  });
  observerManager.observe('loader', prevLoader.value!, () => {
    daysRef.dayManager.addPrevDays()
    // scroll down a litte so that prev loader can be triggerred again
    container.value!.scrollTop = 10
  })
  observerManager.observe('loader', nextLoader.value!, () => daysRef.dayManager.addNextDays())
  return () => observerManager.deleteObserver('loader')
})
</script>

<template>
  <div flex="~ col" shrink-0 class="h-70vh max-w-300 mx-auto">
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
          v-for="day in daysRef.dayManager.days"
          :key="day.id"
          :day="day"
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
