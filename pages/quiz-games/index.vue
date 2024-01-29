<script lang="ts" setup>
import type { QuizCategory } from '~/utils/types'

definePageMeta({
  title: 'Belajar Membuat Kerajinan',
})

const quizes = ref<QuizCategory[]>()

async function fetchQuizes() {
  const supabase = useSupabaseClient()
  const { data } = await supabase
    .schema('quiz' as never)
    .from('quizes')
    .select('*') as { data: QuizCategory[] }

  return Promise.all(data)
}

onMounted(async () => {
  quizes.value = await fetchQuizes()
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
          :to="`quiz-games/${quiz.slug}`"
          :title="quiz.title"
          :img-path="`quizes/category/${quiz.slug}.png`"
        />
      </div>
    </div>
  </NuxtLayout>
</template>
