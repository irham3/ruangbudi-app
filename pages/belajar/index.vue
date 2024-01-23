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

onMounted(async () => {
  studyVideos.value = await fetchSignLanguages()
  cultures.value = await fetchCultures()
  crafts.value = await fetchCrafts()
})
</script>

<template>
  <NuxtLayout>
    <div class="container flex flex-col px-36 py-8">
      <div class="text-4xl font-bold self-center">
        Daftar Pembelajaran
      </div>
      <div class="text-xl font-normal self-center mb-12">
        Belajar semakin menyenangkan dengan bantuan video pembelajaran yang menarik dan seru
      </div>

      <!-- Budaya -->
      <section id="bahasa-isyarat" class="mb-6">
        <div class="flex justify-between">
          <h3 class="text-2xl font-semibold mb-4">
            Mengenal <span class="text-amber-800">Budaya Indonesia</span>
          </h3>
          <NuxtLink
            class="text-amber-900 font-semibold transition-transform hover:scale-105"
            to="belajar/budaya"
          >
            Lihat Semua &rarr;
          </NuxtLink>
        </div>
        <div class="flex gap-4">
          <VerticalCard
            v-for="(culture, index) in cultures" :key="index"
            :to="`belajar/budaya/${culture.culture_slug}`"
            :title="culture.culture_name"
            :img-path="`cultures/${culture.id}/${culture.image_filenames[0]}`"
          />
        </div>
      </section>

      <!-- Bahasa Isyarat -->
      <section id="bahasa-isyarat" class="my-6">
        <div class="flex justify-between">
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
        <div class="flex gap-4">
          <VerticalCard
            v-for="(studyVideo, index) in studyVideos" :key="index"
            :to="`belajar/isyarat/${studyVideo.slug}`"
            :title="studyVideo.title"
            :img-path="`video/${studyVideo.slug}.png`"
          />
        </div>
      </section>

      <!-- Membuat kerajinan -->
      <section id="membuat-kerajinan" class="my-6">
        <div class="flex justify-between">
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
        <div class="flex gap-4">
          <VerticalCard
            v-for="(craft, index) in crafts" :key="index"
            :to="`belajar/kerajinan/${craft.slug}`"
            :title="craft.title"
            :img-path="`crafts/${craft.id}.png`"
          />
        </div>
      </section>
    </div>
  </NuxtLayout>
</template>
