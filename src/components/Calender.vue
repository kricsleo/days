<script setup lang="ts">
import { backHome, days, weeks, addPrevDays, addNextDays } from '~/composables/days';
import { observerManager } from '@kricsleo/observer'

const prevLoader = ref<HTMLElement>()
const nextLoader = ref<HTMLElement>()
const container = ref<HTMLElement>()

onMounted(() => backHome())

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
  <div h-screen flex="~ col">
    <div px-2 py-2 border="b gray-200/50" grid="~ cols-7 gap-2" justify-items-center>
      <h5 v-for="week in weeks" :key="week.name">{{week.name}}</h5>
    </div>
    <div grow-1 overflow-auto ref="container" pl-3 pr-2>
      <div h-1px ref="prevLoader" />
      <div grid="~ cols-7">
        <CalenderDay
          v-for="[day, info] in days.days.entries()"
          :key="info.id"
          :day="day"
          :info="info" />
      </div>
      <div h-1px ref="nextLoader" />
    </div>
  </div>
</template>
