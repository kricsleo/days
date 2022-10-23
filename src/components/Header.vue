<script setup lang="ts">
import { toggleDark } from '~/composables';

</script>

<template>
  <nav z-1 text-2xl py-3 px-3 flex justify-end gap-2 sticky top-0 bg-white dark:bg-dark>
    <button icon-btn @click="toggleDark()">
      <div dark:i-carbon-moon i-carbon-sun />
    </button>
    <a
      icon-btn i-carbon-logo-github
      rel="noreferrer"
      href="https://github.com/kricsleo/days"
      target="_blank"
      title="GitHub"
    />
  </nav>
</template>
