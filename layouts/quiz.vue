<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8 bg-amber-700">
    <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-lg bg-white shadow-lg rounded px-8 pt-6 pb-8">
      <button
        class="flex gap-1 font-semibold transition-transform hover:scale-105"
        @click="$router.back()"
      >
        <Icon name="mdi:keyboard-backspace" class="text-2xl" />
        Kembali
      </button>
      <h2 class="text-center text-2xl font-bold leading-9 tracking-tight text-amber-800 mb-4">
        {{ title }}
      </h2>
      <slot />
    </div>
  </div>
</template>
