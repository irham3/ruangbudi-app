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
    <NuxtLoadingIndicator />
    <NuxtPage />
  </div>
</template>

<style>
body {
  cursor: url(https://cur.cursors-4u.net/cursors/cur-2/cur116.cur), auto !important;
}
</style>
