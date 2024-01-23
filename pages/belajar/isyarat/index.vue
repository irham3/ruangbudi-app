<script lang="ts" setup>
import type { SignLanguage } from '~/utils/types'

definePageMeta({
  title: 'Belajar Bahasa Isyarat',
})

const client = useSupabaseClient()
const signLanguages = ref<SignLanguage[]>()

async function fetchSignLanguages() {
  const { data } = await client
    .from('signlanguages')
    .select('*') as { data: SignLanguage[] }
  return Promise.all(data)
}

onMounted(async () => {
  signLanguages.value = await fetchSignLanguages()
})
</script>

<template>
  <NuxtLayout>
    <div class="container flex flex-col px-36 py-8">
      <h1 class="text-4xl text-amber-900 font-bold self-center mb-6">
        Belajar Bahasa Isyarat
      </h1>

      <div class="grid grid-cols-1 sm:grid-cols-4 gap-x-10 gap-y-8 px-8">
        <VerticalCard
          v-for="(studyVideo, index) in signLanguages" :key="index"
          :to="`isyarat/${studyVideo.slug}`"
          :title="studyVideo.title"
          :img-path="`video/${studyVideo.slug}.png`"
        />
      </div>
    </div>
  </NuxtLayout>
</template>
