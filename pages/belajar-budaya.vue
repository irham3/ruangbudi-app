<script lang="ts" setup>
definePageMeta({
  title: 'Belajar Budaya',
})

// Test koneksi data ke db
const client = useSupabaseClient()

const { data: cultures } = await useAsyncData('cultures', async () => {
  const { data } = await client.from('cultures').select('*')
  return data
})

// console.log(cultures.value)
</script>

<template>
  <NuxtLayout>
    <!-- Testing -->
    <h1>Halaman Belajar Budaya</h1>
    <ul>
      <li
        v-for="{ id, culture_name } in cultures"
        :key="id"
      >
        {{ id }}. {{ culture_name }}
      </li>
    </ul>
  </NuxtLayout>
</template>
