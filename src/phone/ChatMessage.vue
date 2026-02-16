<script setup lang="ts">
defineProps<{
  text?: string
  isMe?: boolean
  avatar?: string
  image?: string
  showAvatar?: boolean
}>()

defineEmits(['image-load'])
</script>

<template>
  <div class="flex items-end gap-2" :class="{ 'flex-row-reverse': isMe }">
    <!-- Avatar (only for others) -->
    <div
      v-if="!isMe"
      class="w-5 h-5 rounded-full overflow-hidden shrink-0"
      :class="{ 'opacity-0': !showAvatar }"
    >
      <img :src="avatar || '/instagram.png'" alt="avatar" class="w-full h-full object-cover" />
    </div>

    <!-- Message Bubble -->
    <div
      v-if="text"
      class="px-4 py-1 rounded-2xl max-w-[70%]"
      :class="
        isMe
          ? 'bg-gradient-to-l from-purple-500 to-indigo-500 text-white rounded-br-none'
          : 'bg-zinc-800 text-white rounded-bl-none'
      "
    >
      <span class="text-xs">{{ text }}</span>
    </div>

    <!-- Image Attachment -->
    <div v-if="image" class="max-w-[70%] rounded-2xl overflow-hidden bg-zinc-800">
      <img :src="image" alt="attachment" class="w-full h-auto" @load="$emit('image-load')" />
    </div>
  </div>
</template>
