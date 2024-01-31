<script setup lang="ts">
const loading = ref(true)

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 300)
})
</script>

<template>
  <Header />
  <div class="flex flex-col transition-opacity duration-100" :style="{ opacity: loading ? '0%' : '100%' }">
    <slot />
  </div>
  <Footer />
</template>
