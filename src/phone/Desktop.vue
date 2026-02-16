<script setup lang="ts">
import AppIcon from '../components/AppIcon.vue'
</script>

<template>
  <div class="w-full h-full relative">
    <img src="/background.jpeg" alt="background" class="w-full h-full object-cover absolute" />

    <div class="w-[200px] h-[200px] rounded-2xl absolute top-10 left-4 p-2">
      <img src="/sunny.png" alt="sun" class="w-[100px] h-[100px] brightness-150" />
      <div class="flex flex-col">
        <span class="text-white text-2xl font-bold">12°</span>
        <span class="text-white text-sm font-bold">오늘 기온은 어제보다 높습니다.</span>
      </div>
    </div>

    <div
      class="docker rounded-[24px] absolute w-full h-[84px] bottom-0 flex items-center justify-evenly pb-1"
    >
      <AppIcon image="/call.png" />
      <AppIcon image="/message.png" />
      <AppIcon image="/chrome.svg" />
      <AppIcon image="/kakao.jpg" />
    </div>
  </div>
</template>
