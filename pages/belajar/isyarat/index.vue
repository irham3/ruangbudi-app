<script lang="ts" setup>
import type { SignLanguage } from '~/utils/types'

definePageMeta({
  title: 'Belajar Bahasa Isyarat',
})

const client = useSupabaseClient()
const signLanguages = ref<SignLanguage[]>()

async function fetchSignLanguages() {
  const { data } = await client
    .from('signLanguages')
    .select('*')
    .eq('category_id', 1) as { data: SignLanguage[] }
  return Promise.all(data)
}

onMounted(async () => {
  signLanguages.value = await fetchSignLanguages()
})
</script>

<template>
  <NuxtLayout>
    <div class="container flex flex-col px-36 py-8">
      <h1 class="text-4xl font-bold self-center mb-6">
        Belajar Bahasa Isyarat
      </h1>

      <div class="flex gap-4">
        <VerticalCard
          v-for="(studyVideo, index) in signLanguages" :key="index"
          :to="`isyarat/${studyVideo.slug}`"
          :title="studyVideo.title"
          :img-path="`video/${studyVideo.slug}.png`"
        />

        <VerticalCard
          v-for="(studyVideo, index) in signLanguages" :key="index * 2"
          :to="`isyarat/${studyVideo.slug}`"
          :title="studyVideo.title"
          :img-path="`video/${studyVideo.slug}.png`"
        />
      </div>
    </div>
  </NuxtLayout>
</template>
