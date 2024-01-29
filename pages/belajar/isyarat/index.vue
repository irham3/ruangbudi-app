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
    <img 
      src="/images/background/batik-2.png" 
      alt="" 
      class="w-[10rem] absolute right-0 top-[12%] -z-10"
    >
    <img 
      src="/images/background/batik.png" 
      alt="" 
      class="w-[10rem] absolute left-0 top-[12%] -z-10"
    >
    <!-- <img 
      src="/images/background/komodo.png" 
      alt="" 
      class="w-[15rem] absolute left-0 top-[200%] -z-10"
    >
    <img 
      src="/images/background/wayang-bg.png" 
      alt="" 
      class="w-[15rem] absolute right-0 top-[200%] -z-10"
    > -->
    <div class="container flex flex-col px-10 md:px-36 py-8">
      <h1 class="text-4xl text-amber-900 font-bold self-center mb-6">
        Belajar Bahasa Isyarat
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-4 justify-items-center md:justify-items-start gap-x-10 gap-y-8 md:px-8">
        <VerticalCard
          v-for="(studyVideo, index) in signLanguages" :key="index"
          :to="`isyarat/${studyVideo.slug}`"
          :title="studyVideo.title"
          :img-path="`video/${studyVideo.slug}.png`"
          class="!max-w-[80%] md:!max-w-[16rem]"
        />
      </div>
    </div>
  </NuxtLayout>
</template>
