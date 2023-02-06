<script setup lang="ts">
import Calender from '~/components/Calender.vue';
import Header from '~/components/Header.vue';
import InputHours from '~/components/InputHours.vue';
import { focusToday, hours } from '~/composables/days'
</script>

<template>
  <Calender />
  <div flex="~ col" border-r grow-1>
    <Header />
    <div p-2 flex justify-end gap3 justify-items-center text-3xl border-b>
      <button @click="focusToday" title="Go Today!" color-yellow text-sm border rounded px-4 leading-none>今天</button>
      <InputHours v-model="hours" />
    </div>
    <!-- <section grow-1 overflow-auto>
      <ScheduledCard 
        v-for="([id], idx) in planList" 
        :key="id"
        :planId="id"
        :deletable="idx !== 0" />
    </section> -->
  </div>
</template>
