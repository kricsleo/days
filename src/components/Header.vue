<script setup lang="ts">
import { toggleDark } from '~/composables';

</script>

<template>
  <nav relative p-2 border-b>
    <h1 text-center>Schedule Your Days</h1>
    <div absolute right-3 top-3 flex gap3>
      <button @click="toggleDark()" dark:i-carbon-moon i-carbon-sun />
      <a
        i-carbon-logo-github
        rel="noreferrer"
        href="https://github.com/kricsleo/days"
        target="_blank"
        title="GitHub"
      />
    </div>
  </nav>
</template>
