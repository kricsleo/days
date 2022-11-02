<script setup lang="ts">
import { focusToday, plans } from '~/composables/days'
const planList = computed(() => {
  const list = [...plans.entries()]
  const orderedList = [list.shift()!, ...list.reverse()]
  return orderedList
})
// import { observerManager } from '@kricsleo/observer'
// const homeRef = ref<HTMLElement>()
// function backHome() {
//   homeRef.value?.scrollIntoView()
// }
</script>

<template>
  <div grid="~ cols-2" w-230 mx-auto border-x>
    <Calender />
    <div h-screen flex="~ col" border="l gray-200/50">
      <Header />
      <div p-2 flex items-center justify-center text-2xl>
        <button i-carbon:circle-filled @click="focusToday" title="Go Today!" />
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
