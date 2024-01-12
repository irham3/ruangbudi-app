<script lang="ts" setup>
defineProps<{
  to: string
  title: string
  imgSrc: string
}>()
</script>

<template>
  <NuxtLink
    class="relative flex cursor-pointer max-w-[16rem] flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 hover:shadow-md hover:shadow-blue-700 focus:ring- shadow-lg transform active:scale-90 transition-transform"
    :to="to"
  >
    <div class="relative m-0 overflow-hidden text-gray-700 bg-transparent rounded-none shadow-none bg-clip-border">
      <img
        :src="imgSrc"
        :alt="title"
      >
    </div>
    <div class="p-4">
      <div class="flex items-center justify-between w-full">
        <h5 class="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          {{ title }}
        </h5>
      </div>
    </div>
  </NuxtLink>
</template>
