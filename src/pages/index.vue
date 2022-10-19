<script setup lang="ts">
import { format } from 'date-fns'
import { days } from '~/composables/days';
</script>

<template>
  <div grid="~ cols-7 gap-2">
    <div
      v-for="day in days.days.entries()"
      :key="String(day)"
      h-20
      :bg="day[1].current ? '~ #F8C6B5' : day[1].peace ? '~ #D4D3CA' : '~ #5AA4AE'"
    >
      {{ format(day[0], 'LLL/d') }}
      <br />
      {{day[1].tip}}
    </div>
  </div>
</template>
