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
        <hr>
      </li>
      <li
        v-for="image in images"
        :key="image.bucket_id"
      >
        <p>image: {{ image.name }}</p>
      </li>
    </ul>
  </NuxtLayout> -->
  <NuxtLayout>
    <div class="pb-16">
      <div class="h-[80vh] flex flex-col w-full items-center px-[2rem]">
        <div class="w-11/12 flex-1 bg-contain bg-center bg-no-repeat transition-transform duration-700 hover:scale-105"
          style="background-image: url('/images/indonesia.png');" />
      </div>
      <div class="px-32">
        <div class="flex justify-center mb-12">
          <div class="flex gap-6 border border-stone-400 w-fit px-4 py-2.5 rounded-md items-center">
            <div class="flex items-center gap-4">
              <div class="flex gap-3 items-center hover:scale-105 transition-all">
                <Icon name="pepicons-pop:pinpoint-filled" class=" text-stone-600" />
                <input type="text" name="" id="" class="placeholder:text-stone-500 border-transparent focus:border-transparent focus:ring-0 focus:outline-none" placeholder="Provinsi">
              </div>
              <div class="w-[1px] h-[32px] bg-stone-300"></div>
              <div class="flex gap-3 items-center hover:scale-105 transition-all">
                <Icon name="mdi:leaf" class="rotate-180 text-stone-600" />
                <input type="text" name="" id="" class="placeholder:text-stone-500 border-transparent focus:border-transparent focus:ring-0 focus:outline-none" placeholder="Kota/Kabupaten">
              </div>
            </div>
            <button class="px-6 py-1 bg-[#CA855F] rounded-sm text-white font-semibold transition-transform hover:scale-105">Telusuri</button>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-x-10 gap-y-8">
          <div class="flex items-center gap-3 transition-all hover:shadow-lg hover:bg-slate-50 hover:scale-105 rounded-md" v-for="i in 5">
            <div class="w-[14rem] h-[7rem] bg-contain rounded-md bg-no-repeat"
              style="background-image: url('/images/aceh-jalur-rempah.png');"></div>
            <div class="">
              <h4 class="text-xl font-semibold">Keragaman Budaya di Pulau Sumatera</h4>
              <p>Kenali berbagai macam kebudayaan Indonesia di Pulau Sumatra!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
