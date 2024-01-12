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
    .from('v_videos')
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
          <StudyCard
            v-for="(studyVideo, index) in studyVideos" :key="index"
            :to="studyVideo.slug"
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
          <div class="relative flex cursor-pointer max-w-[16rem] flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md hover:shadow-md hover:shadow-blue-700 transform active:scale-90 transition-transform">
            <div class="relative m-0 overflow-hidden text-gray-700 bg-transparent rounded-none shadow-none bg-clip-border">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80"
                alt="ui/ux review check"
              >
            </div>
            <div class="p-4">
              <div class="flex items-center justify-between">
                <h5 class="block font-sans text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
                  Wooden House, Florida
                </h5>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </NuxtLayout>
</template>
