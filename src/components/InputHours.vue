<script setup lang="ts">
defineProps<{
  modelValue: number
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', v: number): void
}>()
</script>

<template>
  <div grid="~ cols-[2.25rem_2.25rem_2.25rem]" text-3xl>
    <button 
      i-carbon-chevron-left 
      :disabled="modelValue <= 4"
      @click="emits('update:modelValue', modelValue - 1)" 
      :class="modelValue <= 4 ? 'text-gray' : ''" />
    <div flex="~ nowrap" overflow-hidden text-red>
      <span :style="{marginLeft: `-${modelValue - 4}00%`}" shrink-0 i-carbon-number-4 />
      <span shrink-0 i-carbon-number-5 />
      <span shrink-0 i-carbon-number-6 />
      <span shrink-0 i-carbon-number-7 />
      <span shrink-0 i-carbon-number-8 />
    </div>
    <button 
      i-carbon-chevron-right 
      :disabled="modelValue >= 8"
      @click="emits('update:modelValue', modelValue + 1)"
      :class="modelValue >= 8 ? 'text-gray' : ''" />
  </div>
</template>
