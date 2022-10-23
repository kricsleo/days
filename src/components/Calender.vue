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
      :bg="info.selected ? info.peace ? ' ~ red-1' : '~ red' 
          : info.peace ? '~ green-1' : '~ green-3'"
      rounded-2
      grid="~ rows-3"
      justify-center
      items-center
      cursor-pointer
      select-none
      @click="toggleSelect(day)"
      @contextmenu.prevent="toggleMark(day)">
      <span text-xs>{{ format(day, 'MMM').toUpperCase() }}</span>
      <span font-bold text-2xl>{{ format(day, 'd') }}</span>
      <button ref="home" v-if="info.current" i-carbon-home />
      <button v-if="info.marked" i-carbon-star-filled text-orange />
      <!-- {{info.tip}} -->
    </div>
  </div>
</template>
