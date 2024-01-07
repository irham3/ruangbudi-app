<script lang="ts" setup>
import Image from 'primevue/image'

const route = useRoute()
const slug = route.params.slug
const client = useSupabaseClient()

const cultureDetail = ref<Culture>()
const cdnUrl = 'https://igdhuwnfxnlgnizlnjjc.supabase.co/storage/v1/object/public/images/cultures'

async function fetchDetailCulture() {
  const { data: cultures_view } = await client.from('v_cultures').select('*') as { data: Culture[] }
  return Promise.all((cultures_view.filter(culture => culture.culture_slug === slug)))
}

onMounted(async () => {
  cultureDetail.value = (await fetchDetailCulture())[0]
})

definePageMeta({
  title: 'Belajar Budaya',
})
</script>

<template>
  <!-- <NuxtLayout>
    <h1>Halaman Belajar Budaya</h1>
    <ul>
      <li v-for="{ id, culture_name } in cultures" :key="id">{{id}}. {{culture_name}}</li>
    </ul>
  </NuxtLayout> -->

  <div class="px-32 flex flex-col items-center gap-10 py-16 relative">
    <MyCarousel />
    <!-- <div class="absolute w-[20rem] h-[40rem] bg-contain bg-no-repeat top-[-5rem] left-0" style="background-image: url('/images/background/batik.png');" />
    <div class="absolute w-[20rem] h-[40rem] bg-contain bg-no-repeat top-[-5rem] right-0 bg-right" style="background-image: url('/images/background/batik-2.png');" />
    <div class="absolute w-[20rem] h-[20rem] bg-contain bg-no-repeat bottom-0 left-0" style="background-image: url('/images/background/komodo.png');" /> -->

    <h1 class="text-5xl font-semibold">
      {{ cultureDetail?.culture_name }}
    </h1>

    <div v-for="(image_filename, index) in cultureDetail?.image_filenames" :key="index" class="card flex justify-content-center">
      <Image :src="`${cdnUrl}/${cultureDetail?.id}/${image_filename}`" alt="Image" width="250" preview />
    </div>

    <!-- <div class="w-[46rem] h-[30rem] bg-contain bg-center bg-no-repeat" style="background-image: url('/images/budaya_jawa-barat.png');" />
      <div class="w-[46rem] h-[30rem] bg-contain bg-center bg-no-repeat" style="background-image: url('/images/budaya_jawa-timur.png');" /> -->
  </div>
</template>
