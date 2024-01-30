<template>
  <Header />
  <div class="flex flex-col transition-opacity duration-500" :style="{opacity: loading?'0%': '100%'}">
    <slot />
  </div>
  <Footer />
</template>

<script setup lang="ts">
const loading = ref(true)

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 300)
})
</script>