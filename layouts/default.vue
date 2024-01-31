<template>
  <div class="">
    <Header />
    <div class="flex flex-col transition-opacity duration-500" :style="{opacity: loading?'0%': '100%'} transition-all duration-1000" :style="{opacity: show?'100%':'0%'}">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
const loading = ref(true)

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 300)
})
</script>