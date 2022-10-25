<script setup lang="ts">
  import { workingDays, peaceDays, selectedDays, backHome } from '~/composables/days'
</script>

<template>
  <div w-45 flex="~ col gap-3" items-stretch>
    <div relative leading-18 text="~ 20 red center" font-bold>
      {{workingDays.size}}
      <span z--1 absolute bottom-0 left-1 text="~ 12 red-300 center" italic op-35>Working</span>
    </div>

    <div relative leading-10 text="~ 10 green center" font-bold>
      {{peaceDays.size}}
      <span z--1 absolute left-11 bottom-0 text="~ 8 green-300" italic op-35>Peace</span>
    </div>

    <div relative leading-10 text="~ 10 gray center" font-bold>
      {{selectedDays.size}}
      <span z--1 absolute left-13 bottom-0 text="~ 8 gray-300" italic op-35>Total</span>
    </div>

    <button i-carbon-home @click="backHome" />
  </div>
</template>
