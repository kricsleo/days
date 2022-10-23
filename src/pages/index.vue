<script setup lang="ts">
// import { observerManager } from '@kricsleo/observer'
// const homeRef = ref<HTMLElement>()
// function backHome() {
//   homeRef.value?.scrollIntoView()
// }
</script>

<template>
  <div grid="~ cols-[1fr_4fr_1fr]">
    <div grid="col-start-2 col-end-2">
      <Calender />
    </div>
    <Sidebar />
  </div>
</template>
