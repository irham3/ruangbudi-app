<script lang="ts" setup>
definePageMeta({
  title: 'Beranda'
})

const user = useSupabaseUser()
</script>

<template>
  <NuxtLayout>
    <h1 class="font-bold">
      Halaman Beranda
    </h1>
    <h3 v-if="user"> Anda berhasil login dengan email {{user.email}}</h3>
  </NuxtLayout>
</template>