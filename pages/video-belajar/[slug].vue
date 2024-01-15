<script lang="ts" setup>
import type { StudyVideoDetail } from '~/utils/types'

definePageMeta({
  title: 'Belajar Isyarat',
})

const route = useRoute()
const client = useSupabaseClient()
const videoDetails = ref<StudyVideoDetail[]>()

async function fetchVideos(slug: string) {
  const { data } = await client
    .from('v_video_details')
    .select('title, youtube_id')
    .eq('slug', slug) as { data: StudyVideoDetail[] }

  return data
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
                <NuxtLink
                  class="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-800 max-w-48 mt-4"
                  :to="`#${videoDetail.youtube_id}`"
                >
                  <span class="mx-4 font-medium line-clamp-2">{{ videoDetail.title }}</span>
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      <div class="ml-4">
        <div v-if="$route.hash.substring(1).length !== 0">
          <div class="text-xl font-bold">
            {{ videoDetails?.find(item => item.youtube_id === $route.hash.substring(1))?.title }}
          </div>
          <iframe
            width="420" height="315"
            :src="`https://www.youtube.com/embed/${$route.hash.substring(1)}`"
          />
        </div>
        <div v-else>
          <h1 class="mb-4 text-4xl font-bold">
            Belum ada video yang dipilih
          </h1>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
