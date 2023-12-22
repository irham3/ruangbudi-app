<script lang="ts" setup>
const route = useRoute()

useHead({
  title: `Ruang Budi - ${route.meta.title}`,
  meta: [{ property: 'og:title', content: `Ruang Budi - ${route.meta.title}` }],
  link: [{ rel: 'icon', type: 'image/png', href: '/favicon.ico' }]
})
</script>

<template>
  <NuxtPage />
</template>
