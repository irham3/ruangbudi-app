<template>
  <div class="">
    <Header />
    <div class="flex flex-col transition-all duration-1000" :style="{opacity: show?'100%':'0%'}">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<script setup>
const show = ref(false)
onMounted(() => {
  setTimeout(() => {
    show.value = true
  }, 200)
})
</script>