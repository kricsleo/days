<script setup lang="ts">
import { format } from 'date-fns'
import { days, toggleSelect, toggleMark } from '~/composables/days';
</script>

<template>
  <div grid="~ cols-[1fr_800px_1fr]">
  <div grid="~ cols-7 gap-2 col-start-2 col-end-2">
    <div
      v-for="[day, info] in days.days.entries()"
      :key="String(day)"
      h-20
      :bg="info.selected ? info.peace ? ' ~ red-1' : '~ red' 
          : info.peace ? '~ green-1' : '~ green-3'"
      @click="toggleSelect(day)"
      @contextmenu.prevent="toggleMark(day)">
      {{ format(day, 'LLL/d') }}
      <br />
      <button v-if="info.current" i-carbon-home />
      <br />
      <button v-if="info.marked" i-carbon-star-filled text-orange />
      <!-- {{info.tip}} -->
    </div>
  </div>
  <Sidebar />
  </div>
</template>
