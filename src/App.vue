<script setup lang="ts">
import { ref } from 'vue'
import Frame from './phone/Frame.vue'
import Screen from './video/Screen.vue'
import Lyrics from './lyrics/Lyrics.vue'

const showVideo = ref(false)
</script>

<template>
  <div class="min-h-screen bg-black text-white flex flex-col items-center justify-center relative">
    <Transition name="fade" mode="out-in">
      <Frame v-if="!showVideo" @trigger-video="showVideo = true" />
      <Screen v-else />
    </Transition>
    <Lyrics
      v-if="!showVideo"
      class="absolute bottom-13 left-10 w-full max-w-3xl h-32 flex flex-col justify-end items-start group"
      lyricsPath="/music/music1.json"
      musicPath="/music/music1.mp3"
    />
    <Lyrics
      v-if="showVideo"
      class="absolute bottom-13 left-10 w-full max-w-3xl h-32 flex flex-col justify-end items-start group"
      lyricsPath="/music/video.json"
      musicPath="/music/video.mp3"
    />
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
