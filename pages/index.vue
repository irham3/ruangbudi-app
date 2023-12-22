<script lang="ts" setup>
definePageMeta({
  title: 'Beranda'
})

const user = useSupabaseUser()
const userData = ref(user.value?.user_metadata)
</script>

<template>
  <NuxtLayout>
    <h1 class="font-bold">
      Halaman Beranda
    </h1>
    <p v-if="user"> Anda berhasil login dengan email {{user.email}}</p>
    <p v-if="user"> Halo {{userData!.first_name}} {{userData!.last_name}}</p>
  </NuxtLayout>
</template>