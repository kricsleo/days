<script setup lang="ts">
import { focusToday, plans, hours } from '~/composables/days'
const planList = computed(() => {
  const list = [...plans.value.entries()]
  const orderedList = [list.shift()!, ...list.reverse()]
  return orderedList
})
</script>

<template>
  <div flex w-270 h-130 mx-auto border rounded-1 overflow-hidden>
    <Calender />
    <div flex="~ col" border-r grow-1>
      <Header />
      <div p-2 flex justify-end gap3 justify-items-center text-3xl border-b>
        <button i-carbon:user-avatar-filled @click="focusToday" title="Go Today!" color-yellow />
        <InputHours v-model="hours" />
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
