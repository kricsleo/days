<script setup lang="ts">
  import { backHome, plans, planId } from '~/composables/days'
  const planList = computed(() => {
    const list = [...plans.entries()]
    const orderedList = [list.shift()!, ...list.reverse()]
    return orderedList
  })
</script>

<template>
  <div>
    <button i-carbon-home @click="backHome" />
    <div flex items-center text-2xl>
      I work
      <!-- <InputHours v-model="hoursPerDay" /> -->
      hours a day.
    </div>

    <section overflow-auto>
      <ScheduledCard 
        v-for="([id], idx) in planList" 
        :key="id"
        :planId="id"
        :deletable="idx !== 0" />
    </section>
  </div>
</template>
