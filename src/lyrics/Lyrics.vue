<script setup lang="ts">
import LyricItem from './LyricItem.vue'
import { ref, onMounted, computed, onUnmounted } from 'vue'

const props = defineProps<{
  lyricsPath: string
  musicPath: string
}>()

const lyricsJson = ref<{ lyric: string; time: number }[]>([])
const currentTime = ref(0)
const audioRef = ref<HTMLAudioElement | null>(null)
const volume = ref(0.5)
const isHovering = ref(false)

const onVolumeChange = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  volume.value = parseFloat(value)
  if (audioRef.value) {
    audioRef.value.volume = volume.value
  }
}

// Current active lyric index based on time
const currentIndex = computed(() => {
  // Find the last lyric that has started
  let index = -1
  for (let i = 0; i < lyricsJson.value.length; i++) {
    if (currentTime.value >= lyricsJson.value[i].time) {
      index = i
    } else {
      break
    }
  }
  return index
})

const onTimeUpdate = () => {
  if (audioRef.value) {
    currentTime.value = audioRef.value.currentTime * 1000
  }
}

onMounted(async () => {
  try {
    const lyrics = await fetch(props.lyricsPath).then((res) => res.json())
    lyricsJson.value = lyrics
    // Audio autoplay handled by the tag, but we can also try explicitly
    if (audioRef.value) {
      audioRef.value.volume = volume.value
      audioRef.value.play().catch(() => {
        console.log('Autoplay blocked, waiting for interaction')
        window.addEventListener('click', () => audioRef.value?.play(), { once: true })
      })
    }
  } catch (e) {
    console.error('Failed to load lyrics:', e)
  }
})
</script>

<template>
  <div @mouseenter="isHovering = true" @mouseleave="isHovering = false">
    <audio ref="audioRef" :src="musicPath" @timeupdate="onTimeUpdate" autoplay></audio>

    <!-- Volume Control -->
    <div class="absolute left-0 flex items-center gap-2 transition-opacity duration-300 z-100">
      <div class="text-white/50 w-4 h-4 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
        </svg>
      </div>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        :value="volume"
        @input="onVolumeChange"
        class="w-24 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:scale-110 transition-all"
      />
    </div>
    <div class="top-0 absolute w-full h-full z-10">
      <LyricItem
        v-for="(lyric, index) in lyricsJson"
        :key="index"
        :lyrics="lyric.lyric"
        :now="index === currentIndex"
        :gone="index < currentIndex"
        :notYet="index === currentIndex + 1"
      />
    </div>
  </div>
</template>
