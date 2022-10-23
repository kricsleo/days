<script setup lang="ts">
import { days } from '~/composables/days';
</script>

<template>
  <div grid="~ cols-7 gap-2">
    <CalenderDay
      v-for="[day, info] in days.days.entries()"
      :key="String(day)"
      :day="day"
      :info="info" />
  </div>
</template>
