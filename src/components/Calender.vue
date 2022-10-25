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
    // rootMargin: '30% 0px 30% 0px',
  });
  observerManager.observe('loader', prevLoader.value!, () => addPrevDays(14))
  observerManager.observe('loader', nextLoader.value!, () => addNextDays(14))
  return () => {
    observerManager.deleteObserver('loader')
  }
})
</script>

<template>
  <div ref="container" h-90vh overflow-auto px-4>
    <div sticky top-0 py-2 bg-white dark:bg-dark grid="~ cols-7 gap-2" justify-items-center>
      <h5 v-for="week in weeks" :key="week.name">{{week.name}}</h5>
    </div>
    <div h-1px ref="prevLoader" />
    <div grid="~ cols-7 gap-2">
      <CalenderDay
        v-for="[day, info] in days.days.entries()"
        :key="info.id"
        :day="day"
        :info="info" />
    </div>
    <div h-1px ref="nextLoader" />
  </div>
</template>
