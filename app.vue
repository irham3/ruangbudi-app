<script lang="ts" setup>
const route = useRoute()

useHead({
  title: route.meta.title ? `Ruang Budi - ${route.meta.title}` : 'Ruang Budi',
  meta: [{ property: 'og:title', content: route.meta.title ? `Ruang Budi - ${route.meta.title}` : 'Ruang Budi' }],
  link: [{ rel: 'icon', type: 'image/png', href: '/favicon.ico' }],
})
</script>

<template>
  <div>
    <NuxtLoadingIndicator color="" />
    <NuxtPage />
  </div>
</template>
