<script setup lang="ts">
import { onMounted, ref, watch, nextTick } from 'vue'
import gsap from 'gsap'

interface Album {
  image: string
  date: string
  description: string
  time: number
}

const container = ref<HTMLElement | null>(null)
const video = ref<Album[] | null>(null)
const currentIndex = ref(0)
const ddayCount = ref(0) // Animated value for display

const isVideoEnded = ref(false)
const showFinalText = ref(false)

// calculate D-Day relative to 2024-06-06
const calculateDday = (dateString: string) => {
  const targetDate = new Date(dateString)
  const baseDate = new Date('2023-06-06')
  const diffTime = targetDate.getTime() - baseDate.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

// animate D-Day number
const animateDday = (newValue: number, duration = 1, onComplete?: () => void) => {
  const obj = { val: ddayCount.value }
  gsap.to(obj, {
    val: newValue,
    duration: duration,
    ease: 'power1.out',
    onUpdate: () => {
      ddayCount.value = Math.floor(obj.val)
    },
    onComplete: onComplete,
  })
}

const emit = defineEmits(['video-end'])

// slideshow logic
const startSlideshow = () => {
  if (!video.value || video.value.length === 0) return

  const currentSlide = video.value[currentIndex.value]
  if (!currentSlide) return
  const delay = (currentSlide.time || 1) * 5000 // default 5 seconds if time is missing

  setTimeout(() => {
    if (!video.value) return
    if (currentIndex.value === video.value.length - 1) {
      emit('video-end')
      // Start final animation sequence
      isVideoEnded.value = true
      setTimeout(() => {
        animateDday(10000, 6, () => {
          setTimeout(() => {
            showFinalText.value = true
          }, 1000)
        })
      }, 2000)
      return
    }
    currentIndex.value = currentIndex.value + 1
    startSlideshow()
  }, delay)
}

// Watch index change to trigger animation
watch(currentIndex, () => {
  const currentSlide = video.value?.[currentIndex.value]
  if (!isVideoEnded.value && currentSlide) {
    const nextDday = calculateDday(currentSlide.date)
    animateDday(nextDday)
  }
})

onMounted(async () => {
  if (container.value) {
    gsap.fromTo(container.value, { opacity: 0 }, { opacity: 1, duration: 2 })
  }

  try {
    const response = await fetch('/album/album.json')
    const data = await response.json()
    video.value = data

    // Initial setup
    if (video.value && video.value.length > 0) {
      const initialDday = calculateDday(video.value[0]!.date)
      ddayCount.value = initialDday
      startSlideshow()
    }
  } catch (error) {
    console.error('Failed to load album data:', error)
  }
})
</script>

<template>
  <div ref="container" class="fixed inset-0 flex items-center justify-center text-white z-50 p-10">
    <div
      v-if="video && video.length > 0"
      class="flex flex-col items-center transition-all duration-1000 relative"
      :class="{ 'scale-[2]': isVideoEnded }"
    >
      <div class="flex flex-col items-center">
        <div class="date relative h-20 w-full flex justify-center transition-all duration-1000">
          <div class="w-140 absolute top-0 text-6xl text-center">
            {{ ddayCount < 0 ? `D${ddayCount}` : `D+${ddayCount}` }}
          </div>
        </div>
        <Transition name="fade" mode="out-in">
          <div v-if="!isVideoEnded" :key="currentIndex" class="flex flex-col items-center">
            <div class="image w-140 h-120">
              <img
                v-if="video?.[currentIndex]?.image"
                :src="video[currentIndex]?.image"
                alt=""
                class="w-full h-full object-contain"
              />
            </div>
          </div>
        </Transition>
      </div>
      <Transition name="slide-down" mode="out-in">
        <div v-if="showFinalText" class="inset-0 z-10 w-100 bottom-0 text-2xl text-center">
          함께 맞이해 줄래?
        </div>
      </Transition>
      <Transition name="fade" mode="out-in">
        <div v-if="!isVideoEnded" :key="currentIndex" class="w-full mt-4">
          <div class="description text-gray-400 flex flex-col gap-4 w-full p-2 text-center">
            <span class="text-lg">
              {{ video?.[currentIndex]?.description }}
            </span>
            <span class="text-md text-gray-500">
              {{ video?.[currentIndex]?.date }}
            </span>
          </div>
        </div>
      </Transition>
    </div>
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

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 1s ease-out;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
