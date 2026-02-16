<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue'
import ChatMessage from './ChatMessage.vue'

const resolvePath = (path: string) => {
  if (!path) return ''
  if (path.startsWith('/')) {
    return import.meta.env.BASE_URL + path.slice(1)
  }
  return path
}

const emit = defineEmits(['close', 'trigger-video'])

const isTyping = ref(false)
const chatContainer = ref<HTMLElement | null>(null)
const inputText = ref('')
const end = ref(true)

const handleSendMessage = () => {
  if (inputText.value === '사랑해') {
    emit('trigger-video')
    inputText.value = ''
  }
}

const scrollToBottom = async () => {
  await nextTick()
  setTimeout(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTo({
        top: chatContainer.value.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, 100)
}

const startTypingSimulation = async () => {
  for (const msg of newMessages.value) {
    isTyping.value = true
    scrollToBottom()
    // Calculate delay based on length (1s per 8 chars)
    const delay = Math.max(1000, Math.ceil(msg.text.length / 8) * 1800)
    await new Promise((resolve) => setTimeout(resolve, delay))
    isTyping.value = false
    currentMessages.value.push(msg)
    scrollToBottom()
    // Delay between messages (1 second)
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }
  end.value = true
}

onMounted(async () => {
  const now = new Date()
  const hour = now.getHours()
  const minute = now.getMinutes()
  const ampm = hour >= 12 ? '오후' : '오전'
  const formattedHour = hour % 12 || 12
  const formattedMinute = minute.toString().padStart(2, '0')
  currentTime.value = `${ampm} ${formattedHour}:${formattedMinute}`

  scrollToBottom()
  setTimeout(scrollToBottom, 300)

  await loadExternalMessages()

  // Start simulation after component mount
  setTimeout(startTypingSimulation, 8000)
})

const currentTime = ref('')

const currentMessages = ref([
  { id: 'date-1', type: 'date', text: '2월 13일 오전 12:17' },
  {
    id: 1,
    image: resolvePath('/reels.jpeg'),
    isMe: true,
    time: '방금',
    avatar: resolvePath('/instagram.png'),
  },
  { id: 2, text: '기대가 된다', isMe: true, time: '방금', avatar: resolvePath('/instagram.png') },
  { id: 3, text: '박동진의 청혼', isMe: true, time: '방금', avatar: resolvePath('/instagram.png') },
  {
    id: 4,
    text: '내가 잘 해보께...',
    isMe: false,
    time: '방금',
    avatar: resolvePath('/djavatar.jpeg'),
  },

  { id: 'today-1', type: 'today' },

  { id: 5, text: '자기야 뭐해?', isMe: false, time: '방금', avatar: resolvePath('/djavatar.jpeg') },
  { id: 6, text: '이것 좀 봐봐', isMe: false, time: '방금', avatar: resolvePath('/djavatar.jpeg') },
])

const newMessages = ref<
  { id: number; text: string; isMe: boolean; time: string; avatar: string }[]
>([])

const loadExternalMessages = async () => {
  try {
    const response = await fetch(import.meta.env.BASE_URL + 'messages.txt')
    const text = await response.text()
    const lines = text.split('\n').filter((line) => line.trim() !== '')

    newMessages.value = lines.map((line, index) => {
      const isMe = line.startsWith(':')
      const text = isMe ? line.substring(1).trim() : line.trim()

      return {
        id: 10 + index, // Starting ID from 10 to avoid conflict with existing static IDs
        text,
        isMe,
        time: '방금',
        avatar: isMe ? resolvePath('/instagram.png') : resolvePath('/djavatar.jpeg'),
      }
    })
  } catch (e) {
    console.error('Failed to load messages:', e)
  }
}

watch(
  currentMessages,
  () => {
    scrollToBottom()
  },
  { deep: true },
)
</script>

<template>
  <div class="absolute inset-0 bg-black flex flex-col z-30">
    <!-- Header -->
    <div class="flex items-center justify-between px-4 py-3 border-b border-zinc-800 mt-[20px]">
      <div class="flex items-center gap-3">
        <button class="text-white" @click="$emit('close')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </button>
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-full overflow-hidden">
            <img
              :src="resolvePath('/djavatar.jpeg')"
              alt="profile"
              class="w-full h-full object-cover"
            />
          </div>
          <span class="text-white font-bold text-sm">jinee_dong</span>
        </div>
      </div>
      <div class="flex items-center gap-4 text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
      </div>
    </div>

    <!-- Chat Area -->
    <div ref="chatContainer" class="flex-1 overflow-y-auto p-4 flex flex-col gap-2 scrollbar-hide">
      <template v-for="(msg, index) in currentMessages" :key="msg.id">
        <div v-if="msg.type === 'date'" class="flex justify-center my-4">
          <span class="text-xs text-zinc-500 bg-zinc-900/50 px-2 py-1 rounded-lg">{{
            msg.text
          }}</span>
        </div>
        <div v-else-if="msg.type === 'today'" class="text-zinc-500 text-xs w-full text-center my-4">
          오늘 {{ currentTime }}
        </div>
        <ChatMessage
          v-else
          :text="msg.text"
          :image="msg.image"
          :is-me="msg.isMe"
          :avatar="msg.avatar"
          :show-avatar="
            !msg.isMe &&
            (index === currentMessages.length - 1 || currentMessages[index + 1]?.isMe !== msg.isMe)
          "
          @image-load="scrollToBottom"
        />
      </template>

      <!-- Typing Indicator -->
      <div v-if="isTyping" class="flex items-end gap-2">
        <div class="w-5 h-5 rounded-full overflow-hidden shrink-0">
          <img
            :src="resolvePath('/djavatar.jpeg')"
            alt="avatar"
            class="w-full h-full object-cover"
          />
        </div>
        <div
          class="px-4 py-2 rounded-2xl bg-zinc-800 text-white rounded-bl-none flex gap-1 items-center h-[34px]"
        >
          <div class="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce"></div>
          <div class="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce delay-75"></div>
          <div class="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce delay-150"></div>
        </div>
      </div>
    </div>

    <!-- Input Area -->
    <div class="px-4 py-3 bg-black border-t border-zinc-800 flex items-center gap-3 mb-0">
      <div class="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
          />
        </svg>
      </div>
      <div class="relative flex-1 bg-zinc-800 rounded-full px-4 py-2">
        <input
          v-model="inputText"
          type="text"
          placeholder="메시지 보내기..."
          class="bg-transparent text-white text-sm w-full outline-none placeholder-zinc-500"
          @keyup.enter="handleSendMessage"
        />
      </div>
      <div class="text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H3.75A2.25 2.25 0 001.5 6v12a2.25 2.25 0 002.25 2.25z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
