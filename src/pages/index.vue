<script setup lang="ts">
import { focusToday, plans } from '~/composables/days'
const planList = computed(() => {
  const list = [...plans.entries()]
  const orderedList = [list.shift()!, ...list.reverse()]
  return orderedList
})
</script>

<template>
  <div inline-flex mx-auto>
    <Calender />
    <div h-screen flex="~ col" w-100 border-x shrink-0>
      <Header />
      <div p-2 flex items-center justify-center text-2xl>
        <button i-carbon:location-person-filled @click="focusToday" title="Go Today!" color-yellow />
      </div>
      <section grow-1 overflow-auto>
        <ScheduledCard 
          v-for="([id], idx) in planList" 
          :key="id"
          :planId="id"
          :deletable="idx !== 0" />
      </section>
    </div>
  </div>
</template>
