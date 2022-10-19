<script setup lang="ts">
import { format, isToday, isWeekend } from 'date-fns';

</script>

<template>
  <div grid="~ cols-7 gap-2">
    <div h-20 :border="isToday(day) ? '~ red' : isWeekend(day) ? '~ gray' : '~ blue'" v-for="day in days.days" :key="String(day)">{{format(day, 'LLL/d')}}</div>
  </div>
</template>
