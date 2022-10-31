<script setup lang="ts">
// import { observerManager } from '@kricsleo/observer'
// const homeRef = ref<HTMLElement>()
// function backHome() {
//   homeRef.value?.scrollIntoView()
// }
</script>

<template>
  <div grid="~ cols-2">
    <Calender />
    <div border="l gray-200/50">
      <Header />
      <Sidebar />
    </div>
  </div>
</template>
