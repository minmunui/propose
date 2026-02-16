<script setup lang="ts">
defineProps<{
  message: string
  sender?: string
  time?: string
  avatar?: string
}>()

const resolvePath = (path: string) => {
  if (!path) return ''
  if (path.startsWith('/')) {
    return import.meta.env.BASE_URL + path.slice(1)
  }
  return path
}
</script>

<template>
  <div
    class="bg-black/85 bg-blur-md rounded-full absolute left-2 p-2 z-10 w-[295px] cursor-pointer"
  >
    <div class="flex items-center gap-2">
      <div class="avatar rounded-full w-[45px] h-[45px] overflow-hidden">
        <img
          :src="avatar || resolvePath('/instagram.png')"
          alt="avatar"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="flex flex-col gap-2">
        <div class="flex items-center gap-4">
          <span class="text-white text-sm font-bold">{{ sender || 'jinee_dong' }}</span>
          <span class="text-white/70 text-xs">{{ time || '방금' }}</span>
        </div>
        <span class="text-white text-xs">{{ message }}</span>
      </div>
    </div>
  </div>
</template>
