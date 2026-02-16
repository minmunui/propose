<script setup lang="ts">
defineProps<{
    year?: number
    month?: number
    day?: number
    images?: string[]
    title?: string
    description?: string
}>()
</script>

<template>
  <div
    class="fixed inset-0 bg-black flex items-center justify-center text-white z-50"
  >
    <h1 class="text-4xl font-bold animate-pulse">나두 사랑해</h1>
  </div>
</template>