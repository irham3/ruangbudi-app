<script lang="ts" setup>
import type { Quiz } from '~/utils/types'

definePageMeta({
  title: 'Belajar Membuat Kerajinan',
})

const client = useSupabaseClient()
const quizes = ref<Quiz[]>()

async function fetchQuizes() {
  const { data } = await client
    // .schema('quiz')
    .from('quizes')
    .select('*') as { data: Quiz[] }
  return Promise.all(data)
}

onMounted(async () => {
  quizes.value = await fetchQuizes()
  // console.log(quizes.value)
})
</script>

<template>
  <NuxtLayout>
    <div class="container flex flex-col px-36 py-8">
      <h1 class="text-4xl text-amber-900 font-bold self-center mb-6">
        Quiz & Games
      </h1>

      <div class="grid grid-cols-1 sm:grid-cols-4 gap-x-10 gap-y-8 px-8">
        <VerticalCard
          v-for="(quiz, index) in quizes" :key="index"
          :to="`kerajinan/${quiz.slug}`"
          :title="quiz.title"
          :img-path="`quizes/category/${quiz.id}.png`"
        />
      </div>
    </div>
  </NuxtLayout>
</template>
