<script setup lang="ts">
defineProps<{
    dateList: { date: string; time: string }[]
}>()


</script>

<template>
    <div>
        <div v-for="(date, index) in dateList" :key="index">
            <div class="year">{{ date.date }}</div>
            <div class="month">{{ date.date }}</div>
            <div>{{ date.time }}</div>
        </div>
    </div>
</template>