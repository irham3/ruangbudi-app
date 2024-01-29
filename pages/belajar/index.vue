<script lang="ts" setup>
import VerticalCard from '~/components/VerticalCard.vue'
import type { Craft, Culture, SignLanguage } from '~/utils/types'

definePageMeta({
  title: 'Belajar Budaya',
})

const client = useSupabaseClient()
const studyVideos = ref<SignLanguage[]>()
const cultures = ref<Culture[]>()
const crafts = ref<Craft[]>()

async function fetchSignLanguages() {
  const { data } = await client
    .from('signlanguages')
    .select('*') as { data: SignLanguage[] }
  return Promise.all(data)
}

async function fetchCultures() {
  const { data: tableCultures } = await client
    .from('v_cultures')
    .select('*')
    .limit(3) as { data: Culture[] }
  return Promise.all(tableCultures)
}

async function fetchCrafts() {
  const { data } = await client
    .from('v_crafts')
    .select('slug, title, id')
    .limit(3) as { data: Craft[] }
  return Promise.all(data)
}

const loading = ref(true)

onMounted(async () => {
  studyVideos.value = await fetchSignLanguages()
  cultures.value = await fetchCultures()
  crafts.value = await fetchCrafts()
  loading.value = false
})
</script>

<template>
  <NuxtLayout>
    <img
      src="/images/background/batik-2.png"
      alt=""
      class="w-[8rem] md:w-[15rem] absolute right-0 top-[30%] md:top-[12%]"
    >
    <img
      src="/images/background/batik.png"
      alt=""
      class="w-[8rem] md:w-[15rem] absolute left-0 top-[50%] md:top-[25%]"
    >
    <img
      src="/images/background/beok.png"
      alt=""
      class="w-[15rem] absolute left-0 top-[300%] md:top-[120%]"
    >
    <img
      src="/images/background/buku2.png"
      alt=""
      class="w-[15rem] absolute right-0 top-[240%] md:top-[120%]"
    >
    <div class="container flex flex-col px-10 md:px-36 py-8">
      <div class="text-4xl font-bold self-center text-center md:text-start">
        Daftar Pembelajaran
      </div>
    </div>
  </NuxtLayout>
</template>
