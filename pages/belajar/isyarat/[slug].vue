<script lang="ts" setup>
import type { SignLanguageDetail, SignLanguageDetailScore } from '~/utils/types'

definePageMeta({
  title: 'Belajar Isyarat',
})

const route = useRoute()
const client = useSupabaseClient()
const videoDetails = ref<SignLanguageDetail[]>()
const user = useSupabaseUser()
const studentMetadata = ref<Student>()
const videoDetailScore = ref<SignLanguageDetailScore>()

async function fetchVideos(slug: string) {
  const { data } = await client
    .from('v_signlanguage_details')
    .select('id, title, youtube_id')
    .eq('slug', slug) as { data: SignLanguageDetail[] }

  return data
}

async function fetchScore(videoDetailId: number) {
  const { data } = await client
    .from('video_detail_scores')
    .select('video_detail_id, student_score, student_evaluation')
    .eq('video_detail_id', videoDetailId)
    .limit(1)
    .single() as { data: SignLanguageDetailScore }

  return data
}

async function getVideoData(youtube_id: string) {
  await navigateTo(`#${youtube_id}`)

  // User Data
  if (user.value) {
    const videoDetailId = videoDetails.value!.find(item => item.youtube_id === route.hash.substring(1))!.id!

    studentMetadata.value = user.value.user_metadata as Student
    videoDetailScore.value = await fetchScore(videoDetailId)
  }
}

onMounted(async () => {
  const slug = route.params.slug as string
  videoDetails.value = await fetchVideos(slug)
})
</script>

<template>
  <NuxtLayout>
    <div class="container flex flex-row px-36 py-8 rtl:mr-3">
      <aside class="flex flex-col w-64 h-screen px-4 py-2 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-200 dark:border-gray-300">
        <div class="flex flex-col justify-between flex-1 mt-6">
          <nav>
            <ul class="steps steps-vertical">
              <li v-for="(videoDetail, index) in videoDetails" :key="index" class="step step-primary">
                <button
                  class="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-800 max-w-48 mt-4"
                  @click="getVideoData(videoDetail.youtube_id)"
                >
                  <span class="mx-4 font-medium line-clamp-2">{{ videoDetail.title }}</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      <div class="ml-4">
        <div v-if="$route.hash.substring(1).length !== 0">
          <!-- Video Selected -->
          <div class="text-xl font-bold">
            {{ videoDetails?.find(item => item.youtube_id === $route.hash.substring(1))?.title }}
          </div>
          <iframe
            width="420" height="315"
            :src="`https://www.youtube.com/embed/${$route.hash.substring(1)}`"
          />

          <div v-if="user">
            <div class="text-4xl font-semibold">
              Nilai siswa
            </div>
            <ul>
              <li><b>Nilai: </b> {{ videoDetailScore?.student_score ?? 'belum ada nilai' }}</li>
              <li><b>Evaluasi: </b> {{ videoDetailScore?.student_evaluation ?? 'belum ada evaluasi' }}</li>
            </ul>
          </div>
        </div>
        <div v-else>
          <!-- Video is not selected yet -->
          <h1 class="mb-4 text-4xl font-bold">
            Belum ada video yang dipilih
          </h1>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
