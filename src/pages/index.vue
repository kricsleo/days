<script setup lang="ts">
import { format } from 'date-fns'
import { days, toggleSelect, toggleMark } from '~/composables/days';
</script>

<template>
  <div grid="~ cols-7 gap-2">
    <div
      v-for="[day, info] in days.days.entries()"
      :key="String(day)"
      h-20
      :bg="info.current ? '~ #F8C6B5' : info.peace ? '~ #D4D3CA' : '~ #5AA4AE'"
      :border="info.selected ? '~ 4px red' : ''"
      @click="toggleSelect(day)"
      @contextmenu.prevent="toggleMark(day)">
      {{ format(day, 'LLL/d') }}
      <br />
      <button v-if="info.marked" i-carbon-star-filled text-red />
      <!-- {{info.tip}} -->
    </div>
  </div>
</template>
