<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const currentTime = ref('')
let interval: number

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

onMounted(() => {
  updateTime()
  interval = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<template>
  <div class="topbar absolute w-full h-[40px] top-0 flex items-center justify-between px-7 z-50">
    <div>
      <span class="text-white text-sm font-bold">{{ currentTime }}</span>
    </div>
    <div class="flex items-center gap-1">
      <img src="/battery.svg" alt="battery" class="w-[20px] h-[20px] brightness-0 invert" />
      <img src="/wifi.webp" alt="wifi" class="w-[20px] h-[20px] brightness-0 invert" />
    </div>
  </div>
</template>
