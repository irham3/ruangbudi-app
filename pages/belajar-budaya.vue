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
  
  <div class="">
    <div class="h-screen flex flex-col">
      <header class="flex items-center justify-between px-[4rem] py-[1rem]">
        <div class="">
          <img src="/images/logo.png" alt="">
        </div>
        <nav class="flex items-center gap-9">
          <a href="#" v-for="nav in navItem" :key="nav">{{ nav }}</a>
        </nav>
        <button>Masuk</button>
      </header>
      <div class="flex-1 flex flex-col items-center px-[2rem]">
        <div class="w-11/12 flex-1 bg-contain bg-center bg-no-repeat" style="background-image: url('/images/indonesia.png');"></div>
      </div>
    </div>
    <div class="px-32">
      <div class="flex justify-center mb-12">
        <div class="flex gap-6 border border-stone-400 w-fit px-4 py-2.5 rounded-md items-center">
          <div class="flex items-center gap-4">
            <div class="flex gap-3 items-center">
              <Icon name="pepicons-pop:pinpoint-filled" class=" text-stone-600" />
              <input type="text" name="" id="" class="placeholder:text-stone-500" placeholder="Pulau Jawa">
            </div>
            <div class="w-[1px] h-[32px] bg-stone-300"></div>
            <div class="flex gap-3 items-center">
              <Icon name="mdi:leaf" class="rotate-180 text-stone-600" />
              <input type="text" name="" id="" class="placeholder:text-stone-500" placeholder="Jawa Barat">
            </div>
          </div>
          <button class="px-6 py-1 bg-[#CA855F] rounded-sm text-white font-semibold">Telusuri</button>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-x-10 gap-y-8">
        <div class="flex items-center gap-3" v-for="i in 5">
          <div class="w-[14rem] h-[7rem] bg-contain rounded-md bg-no-repeat" style="background-image: url('/images/aceh-jalur-rempah.png');"></div>
          <div class="">
            <h4 class="text-xl font-semibold">Keragaman Budaya di Pulau Sumatera</h4>
            <p>Kenali berbagai macam kebudayaan Indonesia di Pulau Sumatra!</p>
          </div>
        </div>
      </div>
    </div>
  
    <footer class="px-36 flex flex-col gap-52 relative py-16">
      <div class="absolute w-[230px] h-[450px] left-0 top-16" style="background-image: url('/images/background/wayang-bg-2.png');"></div>
      <div class="absolute w-[230px] h-[450px] right-0 top-16" style="background-image: url('/images/background/wayang-bg.png');"></div>

      <div class="flex justify-between">
        <div class="flex flex-col gap-1" v-for="i in 5">
          <h4 class="font-semibold">Belajar Budaya</h4>
          <a href="" class="text-stone-400">Jawa Barat</a>
          <a href="" class="text-stone-400">Jawa Barat</a>
          <a href="" class="text-stone-400">Jawa Barat</a>
        </div>
      </div>
      <div class="flex flex-col items-center">
        <div class="">
          <img src="/images/logo.png" alt="">
        </div>
        <p>Innovillage 2023 - Ruang Budi - Universitas Telkom</p>
      </div>
    </footer>
  </div>

</template>
