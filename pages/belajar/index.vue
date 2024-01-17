<script lang="ts" setup>
import StudyCard from '~/components/StudyCard.vue'
import type { Culture, StudyVideo } from '~/utils/types'

definePageMeta({
  title: 'Belajar Budaya',
})

const client = useSupabaseClient()
const studyVideos = ref<StudyVideo[]>()
async function fetchSignLanguages() {
  const { data } = await client
    .from('videos')
    .select('*')
    .eq('category_id', 1) as { data: StudyVideo[] }
  return Promise.all(data)
}

onMounted(async () => {
  studyVideos.value = await fetchSignLanguages()
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
            Mengenal Budaya Indonesia
          </h3>
          <NuxtLink
            class="text-amber-900 font-semibold"
            to="belajar/budaya"
          >
            Lihat Semua &rarr;
          </NuxtLink>
        </div>
        <div class="flex gap-4">
          <StudyCard
            v-for="(studyVideo, index) in studyVideos" :key="index"
            :to="`video-belajar/${studyVideo.slug}`"
            :title="studyVideo.title"
            :img-filename="`${studyVideo.slug}.png`"
          />
        </div>
      </section>

      <!-- Bahasa Isyarat -->
      <section id="bahasa-isyarat" class="my-6">
        <div class="flex justify-between">
          <h3 class="text-2xl font-semibold mb-4">
            Meningkatkan Kemampuan Bahasa Isyarat
          </h3>
          <NuxtLink
            class="text-amber-900 font-semibold"
            to="belajar/isyarat"
          >
            Lihat Semua &rarr;
          </NuxtLink>
        </div>
        <div class="flex gap-4">
          <StudyCard
            v-for="(studyVideo, index) in studyVideos" :key="index"
            :to="`video-belajar/${studyVideo.slug}`"
            :title="studyVideo.title"
            :img-filename="`${studyVideo.slug}.png`"
          />
        </div>
      </section>

      <!-- Membuat kerajinan -->
      <section id="membuat-kerajinan" class="my-6">
        <div class="flex justify-between">
          <h3 class="text-2xl font-semibold mb-4">
            Mengasah Keterampilan dengan Membuat Kerajinan
          </h3>
          <NuxtLink
            class="text-amber-900"
            to="belajar/kerajinan font-semibold"
          >
            Lihat Semua &rarr;
          </NuxtLink>
        </div>
        <div class="flex gap-4">
          <StudyCard
            v-for="(studyVideo, index) in studyVideos?.filter(item => item.category_id === 2)" :key="index"
            :to="`video-belajar/${studyVideo.slug}`"
            :title="studyVideo.title"
            :img-filename="`${studyVideo.slug}.png`"
          />
        </div>
      </section>
    </div>
  </NuxtLayout>
</template>
