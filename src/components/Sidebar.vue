<script setup lang="ts">
  import { workingDays, peaceDays, selectedDays } from '~/composables/days'
</script>

<template>
  <div>
    <span text="~ xl red">{{workingDays.size}}</span><span> working </span> +
    <span text="~ xl gray">{{peaceDays.size}}</span><span> peace </span> =
    <span text="~ xl blue">{{selectedDays.size}}</span><span> total </span>
  </div>
</template>
