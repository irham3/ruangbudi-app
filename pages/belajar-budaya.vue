<script lang="ts" setup>
import type { Culture } from '~/utils/types'

definePageMeta({
  title: 'Belajar Budaya',
})

// Test koneksi data ke db
const client = useSupabaseClient()
const cultures = ref<Culture[]>()
// Load Image
// https://igdhuwnfxnlgnizlnjjc.supabase.co/storage/v1/object/public/images/cultures/1/Baju_Tari_Jaipong.jpg

async function getImages(culture_id: number) {
  const { data } = await client
    .storage
    .from('images')
    .list(`cultures/${culture_id}`, {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' },
    })
  return data
}

async function fetchCultures() {
  const cdnUrl = 'https://igdhuwnfxnlgnizlnjjc.supabase.co/storage/v1/object/public/images/cultures'
  const { data: tableCultures } = await client.from('v_cultures').select('*') as { data: Culture[] }

  const fetchPromises = tableCultures.map(async (tableCulture) => {
    const imageFiles = await getImages(tableCulture.id)

    tableCulture.image_paths = imageFiles!.map((imageFile) => {
      return `${cdnUrl}/${tableCulture.id}/${imageFile.name}`
    })

    return tableCulture
  })

  return Promise.all(fetchPromises)
}

onMounted(async () => {
  cultures.value = await fetchCultures()
})
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
        <p>Image: </p>
        <div class="flex flex-wrap gap-2">
          <p v-if="culture.image_paths!.length === 0">
            Belum ada gambar
          </p>
          <img
            v-for="(path, index) in culture.image_paths"
            :key="index"
            :src="path"
            fit="cover"
            height="60px"
            width="70px"
          >
        </div>

        <!-- <NuxtImg v-for="(imagePath, index) in culture.image_paths" :key="index" :src="imagePath" /> -->
        <hr>
      </li>
    </ul>
  </NuxtLayout>
</template>
