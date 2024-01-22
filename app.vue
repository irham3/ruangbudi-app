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
  cursor: url(https://cdn.custom-cursor.com/db/8310/32/material-chocolate-bar-cursor.png), default !important;
}

select:hover, img:hover, a:hover, button:hover {
  cursor: url(https://cdn.custom-cursor.com/db/8309/32/material-chocolate-bar-pointer.png), pointer !important
}
</style>
