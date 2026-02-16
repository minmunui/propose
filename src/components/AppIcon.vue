<script setup lang="ts">
defineProps<{
  image: string
  name?: string
}>()
</script>

<template>
  <button class="flex flex-col items-center gap-1 group">
    <div
      class="w-[55px] h-[55px] rounded-[30px] overflow-hidden bg-white shadow-sm transition-transform active:scale-95 group-hover:brightness-90"
    >
      <img :src="image" :alt="name || 'App Icon'" class="w-full h-full object-cover" />
    </div>
    <span v-if="name" class="text-[11px] text-white font-medium drop-shadow-md select-none">
      {{ name }}
    </span>
  </button>
</template>
