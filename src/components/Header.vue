<script setup lang="ts">
import { toggleDark } from '~/composables';

</script>

<template>
  <nav grid="~ cols-3 gap-2" content-center z-1 text-2xl px-6 bg-white dark:bg-dark
    border="b gray-100 dark:gray-700">
    <h1 text-center col-start-2>Schedule Days</h1>
    <div flex="~ gap-4" justify-end>
      <button dark:i-carbon-moon i-carbon-sun @click="toggleDark()" />
      <a
        icon-btn i-carbon-logo-github
        rel="noreferrer"
        href="https://github.com/kricsleo/days"
        target="_blank"
        title="GitHub"
      />
    </div>
  </nav>
</template>
