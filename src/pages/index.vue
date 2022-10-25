<script setup lang="ts">
// import { observerManager } from '@kricsleo/observer'
// const homeRef = ref<HTMLElement>()
// function backHome() {
//   homeRef.value?.scrollIntoView()
// }
</script>

<template>
  <div grid="~ cols-[1fr_60vw_1fr] gap-5">
    <Calender col-start-2 />
    <Sidebar />
  </div>
</template>
