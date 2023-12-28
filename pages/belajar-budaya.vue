<script lang="ts" setup>
import type { Cultures } from '~/utils/types'

definePageMeta({
  title: 'Belajar Budaya',
})

// Test koneksi data ke db
const client = useSupabaseClient()
const imageUrl = 'https://igdhuwnfxnlgnizlnjjc.supabase.co/storage/v1/object/public/images/cultures/'
const images = ref()

const { data: cultures } = await useAsyncData('cultures', async () => {
  const { data } = await client.from('v_cultures').select('*')
  return data as Cultures[]
})

// Load Image
// https://igdhuwnfxnlgnizlnjjc.supabase.co/storage/v1/object/public/images/cultures/1/Baju_Tari_Jaipong.jpg

async function getImages(culture_id: number) {
  const { data, error } = await client
    .storage
    .from('images')
    .list(`cultures/${culture_id}`, {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' },
    })
  images.value = data
}

onMounted(async () => {
  await getImages(1)
})

// console.log(cultures.value)
</script>

<template>
  <NuxtLayout>
    <!-- Testing -->
    <h1>Halaman Belajar Budaya</h1>
    <ul>
      <li
        v-for="culture in cultures"
        :key="culture.id"
      >
        <p>id: {{ culture.id }}</p>
        <p>name: {{ culture.culture_name }}</p>
        <p>city: {{ culture.city ?? 'umum' }}</p>
        <p>Provinsi: {{ culture.province }}</p>
        <p>Deskripsi: {{ culture.culture_description }}</p>
        <p>Value: {{ culture.culture_value }}</p>
        <hr>
      </li>
      <li
        v-for="image in images"
        :key="image.bucket_id"
      >
        <p>image: {{ image.name }}</p>
      </li>
    </ul>
  </NuxtLayout>
</template>
