<script lang="ts" setup>
defineProps({ 
  title: String,
})
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-lg">
      <!-- <img class="mx-auto h-10 w-auto" src="~/assets/logo.svg" alt="Your Company" /> -->
      <NuxtLink to="/">Kembali ke beranda</NuxtLink>
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">{{ title ??'' }}</h2>
    </div>
    <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-lg">
      <slot/>
    </div>
  </div>
</template>