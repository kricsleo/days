<script setup lang="ts">
import { toggleDark } from '~/composables';

</script>

<template>
  <nav flex gap-2 p-2 border="b gray-200/50">
    <h1 grow-1 text-center>Schedule Your Days</h1>
    <button @click="toggleDark()" dark:i-carbon-moon i-carbon-sun />
    <a
      i-carbon-logo-github
      rel="noreferrer"
      href="https://github.com/kricsleo/days"
      target="_blank"
      title="GitHub"
    />
  </nav>
</template>
