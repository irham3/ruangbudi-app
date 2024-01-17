<script lang="ts" setup>
import type { StudyVideo } from '~/utils/types'

definePageMeta({
  title: 'Belajar Bahasa Isyarat',
})

const client = useSupabaseClient()
const studyVideos = ref<StudyVideo[]>()

async function fetchCardData() {
  const { data } = await client
    .from('videos')
    .select('*')
    .eq('item_category_id', 1) as { data: StudyVideo[] }
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
        Belajar Bahasa Isyarat
      </h1>

      <div class="flex gap-4">
        <VideoCard
          v-for="(studyVideo, index) in studyVideos" :key="index"
          :to="`video-belajar/${studyVideo.slug}`"
          :title="studyVideo.title"
          :img-filename="`${studyVideo.slug}.png`"
        />

        <VideoCard
          v-for="(studyVideo, index) in studyVideos" :key="index * 2"
          :to="`video-belajar/${studyVideo.slug}`"
          :title="studyVideo.title"
          :img-filename="`${studyVideo.slug}.png`"
        />
      </div>
    </div>
  </NuxtLayout>
</template>
