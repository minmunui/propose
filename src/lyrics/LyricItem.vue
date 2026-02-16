<script setup lang="ts">
defineProps<{
  lyrics?: string
  notYet?: boolean
  before?: boolean
  now?: boolean
  gone?: boolean
}>()
</script>

<template>
  <div
    class="transition-all duration-700 ease-in-out absolute left-0 w-full text-left"
    :class="{
      'opacity-0 -translate-y-16 scale-90': gone,
      'opacity-100 translate-y-0 scale-100 text-white text-lg font-bold': now,
      'opacity-60 translate-y-16 scale-95 text-white/60 text-md font-medium': notYet,
      'opacity-0 translate-y-32 scale-90': !gone && !now && !notYet,
    }"
  >
    <p class="whitespace-pre-wrap">{{ lyrics }}</p>
  </div>
</template>
 