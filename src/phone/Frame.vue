<script setup>
import { ref, onMounted, nextTick } from 'vue'

const emit = defineEmits(['trigger-video'])
import gsap from 'gsap'
import Desktop from './Desktop.vue'
import Notification from './Notification.vue'
import StatusBar from '../components/StatusBar.vue'
import Instagram from './Instagram.vue'

const notif1 = ref(null)
const notif2 = ref(null)
const instagramRef = ref(null)
const isInstagramOpen = ref(false)

onMounted(() => {
  const tl = gsap.timeline()

  if (notif1.value) {
    tl.fromTo(
      notif1.value.$el || notif1.value,
      { y: -150, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.2)' },
      3,
    )
  }

  if (notif2.value) {
    tl.fromTo(
      notif2.value.$el || notif2.value,
      { y: -150, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.2)' },
      6,
    )
  }
})

const openApp = async () => {
  isInstagramOpen.value = true
  await nextTick()
  if (instagramRef.value) {
    gsap.fromTo(
      instagramRef.value.$el || instagramRef.value,
      { y: 700 },
      { y: 0, duration: 0.5, ease: 'power3.out' },
    )
  }
}

const closeApp = () => {
  if (instagramRef.value) {
    gsap.to(instagramRef.value.$el || instagramRef.value, {
      y: 700,
      duration: 0.5,
      ease: 'power3.in',
      onComplete: () => {
        isInstagramOpen.value = false
      },
    })
  }
}
</script>

<template>
  <div
    class="bg-none relative w-[330px] h-[720px] rounded-[35px] border-[10px] border-zinc-900 ring-1 ring-white/10 flex items-center justify-center shadow-[inset_0_0_2px_rgba(255,255,255,0.3)] overflow-hidden"
  >
    <Desktop />
    <StatusBar />
    <Notification ref="notif1" class="top-10" message="자기야 뭐해?" />
    <Notification ref="notif2" class="top-10" message="이것 좀 봐봐 (클릭)" @click="openApp" />
    <Instagram
      v-if="isInstagramOpen"
      ref="instagramRef"
      @close="closeApp"
      @trigger-video="$emit('trigger-video')"
    />
  </div>
</template>
