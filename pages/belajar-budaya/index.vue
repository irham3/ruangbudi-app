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
    <div class="pb-16">
      <div class="h-[80vh] flex flex-col w-full items-center px-[2rem]">
        <div
          class="w-11/12 flex-1 bg-contain bg-center bg-no-repeat transition-transform duration-700 hover:scale-105"
          style="background-image: url('/images/indonesia.png');"
        />
      </div>
      <div class="px-32">
        <div class="flex justify-center mb-12">
          <div class="flex gap-6 border border-stone-400 w-fit px-4 py-2.5 rounded-md items-center">
            <div class="flex items-center gap-4">
              <div class="flex gap-3 items-center hover:scale-105 transition-all">
                <Icon name="pepicons-pop:pinpoint-filled" class=" text-stone-600" />
                <input id="" type="text" name="" class="placeholder:text-stone-500 border-transparent focus:border-transparent focus:ring-0 focus:outline-none" placeholder="Provinsi">
              </div>
              <div class="w-[1px] h-[32px] bg-stone-300" />
              <div class="flex gap-3 items-center hover:scale-105 transition-all">
                <Icon name="mdi:leaf" class="rotate-180 text-stone-600" />
                <input id="" type="text" name="" class="placeholder:text-stone-500 border-transparent focus:border-transparent focus:ring-0 focus:outline-none" placeholder="Kota/Kabupaten">
              </div>
            </div>
            <button class="px-6 py-1 bg-[#CA855F] rounded-sm text-white font-semibold transition-transform hover:scale-105">
              Telusuri
            </button>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-x-10 gap-y-8 px-8">
          <NuxtLink
            v-for="culture in cultures"
            :key="culture.id"
            :to="`belajar-budaya/${culture.culture_slug}`"
            class="max-w-sm w-full lg:max-w-full lg:flex cursor-pointer transition-all hover:shadow-md hover:bg-slate-50 hover:scale-105 rounded-md"
          >
            <div
              class="h-52 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
              :style="{ backgroundImage: `url(${culture.image_paths![0]})` }"
              title="Gambar Budaya"
            />
            <div class="max-w-sm w-full lg:max-w-full border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
              <div class="mb-8">
                <div class="text-gray-900 font-bold text-xl mb-2">
                  {{ culture.culture_name }}
                </div>
                <p class="text-gray-700 text-base line-clamp-2">
                  {{ culture.culture_description }}
                </p>
              </div>
              <div class="flex gap-4">
                <div class="badge badge-accent">
                  {{ culture.province_name }}
                </div>
                <div v-if="culture.city_name" class="badge badge-neutral">
                  {{ culture.city_name }}
                </div>
              </div>
            </div>
          </NuxtLink>
          <!-- <NuxtLink
            v-for="culture in cultures"
            :key="culture.id"
            :to="`belajar-budaya/${culture.culture_slug}`"
            class="flex items-center gap-3 cursor-pointer transition-all hover:shadow-lg hover:bg-slate-50 hover:scale-105 rounded-md"
          >
            <div
              class="w-[14rem] h-[7rem] bg-cover rounded-md bg-no-repeat"
              style="background-image: url('/images/aceh-jalur-rempah.png');"
            />
            <div class="">
              <h4 class="text-xl font-semibold">
                {{ culture.culture_name }}
              </h4>
              <p class="line-clamp-1">
                {{ culture.culture_description }}
              </p>
            </div>
          </NuxtLink> -->
        </div>
      </div>
    </div>
  </NuxtLayout>

  <!-- <NuxtLayout>
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

        <NuxtImg v-for="(imagePath, index) in culture.image_paths" :key="index" :src="imagePath" />
  <hr>
  </li>
  </ul>
  </NuxtLayout> -->
</template>
