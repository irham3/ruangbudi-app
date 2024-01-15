<script lang="ts" setup>
import type { CultureScore, Slide, Student } from '~/utils/types'

const route = useRoute()
const slug = route.params.slug as string
const client = useSupabaseClient()

const user = useSupabaseUser()
const studentMetadata = ref<Student>()
const cultureScore = ref<CultureScore>()

const cultureDetail = ref<Culture>()
const slides = ref<Slide[]>([])
const cdnUrl = 'https://igdhuwnfxnlgnizlnjjc.supabase.co/storage/v1/object/public/images/cultures'

async function fetchCultureDetail(slug: string) {
  const { data } = await client
    .from('v_cultures')
    .select('*')
    .eq('culture_slug', slug)
    .limit(1)
    .single() as { data: Culture }
  return data
}

async function fetchCultureScore(culture_id: number) {
  const { data } = await client
    .from('culture_scores')
    .select('culture_id, student_score, student_evaluation')
    .eq('culture_id', culture_id)
    .limit(1)
    .single() as { data: CultureScore }

  return data
}

onMounted(async () => {
  cultureDetail.value = await fetchCultureDetail(slug)
  cultureDetail.value.image_filenames.forEach((image_filename, index) => {
    slides.value.push({
      image: `${cdnUrl}/${cultureDetail.value!.id}/${image_filename}`,
      description: `${cultureDetail.value!.culture_name}-${index + 1}`,
    })
  })
  slides.value.push()

  // User Data
  if (user.value) {
    studentMetadata.value = user.value.user_metadata as Student
    cultureScore.value = await fetchCultureScore(cultureDetail.value.id)
  }
})

definePageMeta({
  title: 'Belajar Budaya',
})
</script>

<template>
  <NuxtLayout>
    <div class="px-32 flex flex-col items-center gap-10 py-16 relative">
      <ImageCarousel :slides="slides" />
      <div class="absolute w-[20rem] h-[40rem] bg-contain bg-no-repeat top-[-5rem] left-0" style="background-image: url('/images/background/batik.png');" />
      <div class="absolute w-[20rem] h-[40rem] bg-contain bg-no-repeat top-[-5rem] right-0 bg-right" style="background-image: url('/images/background/batik-2.png');" />
      <div class="absolute w-[20rem] h-[20rem] bg-contain bg-no-repeat bottom-0 left-0" style="background-image: url('/images/background/komodo.png');" />

      <h1 class="text-5xl font-bold">
        {{ cultureDetail?.culture_name }}
      </h1>
      <ul>
        <li v-if="cultureDetail?.city_name">
          <b>Kota asal budaya: </b> {{ cultureDetail?.city_name }}
        </li>
        <li><b>Deskripsi budaya: </b> {{ cultureDetail?.culture_description }}</li>
        <li><b>Nilai budaya: </b> {{ cultureDetail?.culture_value }}</li>
      </ul>

      <div class="card w-96 h-64 bg-base-100 shadow-xl">
        <figure><iframe class="w-full h-64" src="https://www.youtube.com/embed/kqk1k_ISx_8?si=0RE0WFmtCOmwnRu_&rel=0" title="Video Ruang Budi" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen /></figure>
      </div>

      <div v-if="user">
        <div class="text-4xl font-semibold">
          Nilai siswa
        </div>
        <ul>
          <li><b>Nilai: </b> {{ cultureScore?.student_score ?? 'belum ada nilai' }}</li>
          <li><b>Evaluasi: </b> {{ cultureScore?.student_evaluation ?? 'belum ada evaluasi' }}</li>
        </ul>
      </div>

      <!-- <div class="w-[46rem] h-[30rem] bg-contain bg-center bg-no-repeat" style="background-image: url('/images/budaya_jawa-barat.png');" />
        <div class="w-[46rem] h-[30rem] bg-contain bg-center bg-no-repeat" style="background-image: url('/images/budaya_jawa-timur.png');" /> -->
    </div>
  </NuxtLayout>
</template>
