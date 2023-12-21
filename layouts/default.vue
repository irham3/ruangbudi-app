<script lang="ts" setup>
const route = useRoute()

useHead({
  title: `Ruang Budi - ${route.meta.title}`,
  meta: [{ property: 'og:title', content: `Ruang Budi - ${route.meta.title}` }]
})
</script>

<template>
  <Header/>
  <div class="md:container md:mx-auto">
    <slot/>
  </div>
  <Footer/>
</template>