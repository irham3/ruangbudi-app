<script lang="ts" setup>
/* __placeholder__ */
import type { StudyVideo } from '~/utils/types'

definePageMeta({
  title: 'Belajar Budaya',
})

const client = useSupabaseClient()
const studyVideos = ref<StudyVideo[]>()

async function fetchCardData() {
  const { data } = await client
    .from('videos')
    .select('*') as { data: StudyVideo[] }
  return Promise.all(data)
}

onMounted(async () => {
  studyVideos.value = await fetchCardData()
})
</script>

<template>
  <NuxtLayout>
    <div class="container flex flex-col px-36 py-8">
      <h1 class="text-4xl font-bold self-center mb-6">
        Konten Pembelajaran
      </h1>

      <!-- Belajar Bahasa Isyarat -->
      <section id="bahasa-isyarat" class="mb-6">
        <h3 class="text-2xl font-semibold mb-4">
          Bahasa Isyarat
        </h3>
        <div class="flex gap-4">
          <VideoCard
            v-for="(studyVideo, index) in studyVideos?.filter(item => item.category_id === 1)" :key="index"
            :to="`video-belajar/${studyVideo.slug}`"
            :title="studyVideo.title"
            :img-filename="`${studyVideo.slug}.png`"
          />
        </div>
      </section>

      <!-- Membuat kerajinan -->
      <section id="membuat-kerajinan">
        <h3 class="text-2xl font-semibold mb-4">
          Membuat kerajinan
        </h3>
        <div class="flex gap-4">
          <VideoCard
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
