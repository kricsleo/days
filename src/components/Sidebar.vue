<script setup lang="ts">
  import { backHome, start, end, plans, planId } from '~/composables/days'
  
</script>

<template>
  <div>
    <button i-carbon-home @click="backHome" />
    <div flex items-center text-2xl>
      I work
      <!-- <InputHours v-model="hoursPerDay" /> -->
      hours a day.
    </div>
    
    <ScheduledCard :start="start" :end="end" :using="!planId" :useable="plans.size !== 0" />
    <ScheduledCard 
      v-for="[id, [start, end]] in [...plans.entries()].reverse()" 
      :key="id"
      :planId="id"
      :start="start"
      :using="planId === id"
      :end="end" />
  </div>
</template>
