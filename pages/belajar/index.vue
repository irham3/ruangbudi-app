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

const loadingFetch = ref(true)

onMounted(async () => {
  studyVideos.value = await fetchSignLanguages()
  cultures.value = await fetchCultures()
  crafts.value = await fetchCrafts()
  setTimeout(() => {
    loadingFetch.value = false
  }, 500)
})
</script>

<template>
  <NuxtLayout>
    <img
      src="/images/background/batik-2.png"
      alt=""
      class="w-[8rem] md:w-[15rem] absolute right-0 top-[30%] md:top-[12%] -z-10"
    >
    <img
      src="/images/background/batik.png"
      alt=""
      class="w-[8rem] md:w-[15rem] absolute left-0 top-[50%] md:top-[25%] -z-10"
    >
    <img
      src="/images/background/beok.png"
      alt=""
      class="w-[15rem] absolute left-0 top-[300%] md:top-[120%] -z-10"
    >
    <img
      src="/images/background/buku2.png"
      alt=""
      class="w-[15rem] absolute right-0 top-[240%] md:top-[120%] -z-10"
    >
    <div class="container flex flex-col px-10 md:px-36 py-8">
      <div class="text-4xl font-bold self-center text-center md:text-start">
        Daftar Pembelajaran
      </div>
      <div class="text-xl font-normal self-center mb-12 text-center md:text-start">
        Belajar semakin menyenangkan dengan bantuan video pembelajaran yang menarik dan seru
      </div>

      <!-- Budaya -->
      <section id="bahasa-isyarat" class="mb-6">
        <div class="flex justify-between flex-col md:flex-row pb-4 md:pb-0">
          <h3 class="text-2xl font-semibold mb-4">
            Mengenal <span class="text-amber-800">Budaya Indonesia</span>
          </h3>
          <NuxtLink
            class="text-amber-900 font-semibold transition-transform hover:scale-105 "
            to="belajar/budaya"
          >
            Lihat Semua &rarr;
          </NuxtLink>
        </div>
        <div v-if="!loadingFetch" class="flex gap-4 flex-col items-center md:items-stretch md:flex-row">
          <VerticalCard
            v-for="(culture, index) in cultures" :key="index"
            :to="`belajar/budaya/${culture.culture_slug}`"
            :title="culture.culture_name"
            :img-path="`cultures/${culture.id}/${culture.image_filenames[0]}`"
          />
        </div>
        <div v-else class="flex gap-4 flex-col items-center md:items-stretch md:flex-row">
          <div v-for="i in 4" :key="i" class="w-full h-[11.5rem] rounded-lg animate-pulse bg-slate-200" />
        </div>
      </section>

      <!-- Bahasa Isyarat -->
      <section id="bahasa-isyarat" class="my-6">
        <div class="flex justify-between flex-col md:flex-row pb-4 md:pb-0">
          <h3 class="text-2xl font-semibold mb-4">
            Meningkatkan Kemampuan <span class="text-amber-800">Bahasa Isyarat</span>
          </h3>
          <NuxtLink
            class="text-amber-900 font-semibold transition-transform hover:scale-105"
            to="belajar/isyarat"
          >
            Lihat Semua &rarr;
          </NuxtLink>
        </div>
        <div v-if="!loadingFetch" class="flex gap-4 flex-col items-center md:items-baseline md:flex-nowrap md:flex-row">
          <VerticalCard
            v-for="(studyVideo, index) in studyVideos" :key="index"
            :to="`belajar/isyarat/${studyVideo.slug}`"
            :title="studyVideo.title"
            :img-path="`video/${studyVideo.slug}.png`"
          />
        </div>
        <div v-else class="flex gap-4 flex-col items-center md:items-stretch md:flex-row">
          <div v-for="i in 4" :key="i" class="w-full h-[11.5rem] rounded-lg animate-pulse bg-slate-200" />
        </div>
      </section>

      <!-- Membuat kerajinan -->
      <section id="membuat-kerajinan" class="my-6">
        <div class="flex justify-between flex-col md:flex-row pb-4 md:pb-0">
          <h3 class="text-2xl font-semibold mb-4">
            Mengasah Keterampilan dengan <span class="text-amber-800">Membuat Kerajinan</span>
          </h3>
          <NuxtLink
            class="text-amber-900 font-semibold transition-transform hover:scale-105"
            to="belajar/kerajinan"
          >
            Lihat Semua &rarr;
          </NuxtLink>
        </div>
        <div v-if="!loadingFetch" class="flex gap-4 flex-col items-center md:items-start md:flex-row">
          <VerticalCard
            v-for="(craft, index) in crafts" :key="index"
            :to="`belajar/kerajinan/${craft.slug}`"
            :title="craft.title"
            :img-path="`crafts/${craft.id}.png`"
          />
        </div>
        <div v-else class="flex gap-4 flex-col items-center md:items-stretch md:flex-row">
          <div v-for="i in 4" :key="i" class="w-full h-[11.5rem] rounded-lg animate-pulse bg-slate-200" />
        </div>
      </section>
    </div>
  </NuxtLayout>
</template>
