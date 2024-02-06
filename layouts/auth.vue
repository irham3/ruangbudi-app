<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8">
    <div class="mt-5 sm:mx-auto w-full sm:max-w-lg bg-slate-50 shadow-2xl rounded px-8 pt-6 pb-8">
      <NuxtLink to="/" class="text-center transition-transform hover:scale-110">
        <img src="/images/logo.png" alt="Logo Ruang Budi">
      </NuxtLink>
      <h2 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 mb-10">
        {{ title }}
      </h2>
      <slot />
    </div>
  </div>
</template>
