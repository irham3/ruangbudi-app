<script lang="ts" setup>
import type { CultureDetail, CultureScore, Slide, Student } from '~/utils/types'

definePageMeta({
  title: 'Belajar Budaya',
})

const route = useRoute()
const slug = route.params.slug as string
const client = useSupabaseClient()

const user = useSupabaseUser()
const studentMetadata = ref<Student>()
const cultureScore = ref<CultureScore>()

const cultureDetail = ref<CultureDetail>()
const slides = ref<Slide[]>([])
const cdnUrl = 'https://igdhuwnfxnlgnizlnjjc.supabase.co/storage/v1/object/public/images/cultures'

async function fetchCultureDetail(slug: string) {
  const { data } = await client
    .from('v_cultures')
    .select('*')
    .eq('culture_slug', slug)
    .limit(1)
    .single() as { data: CultureDetail }
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
</script>

<template>
  <NuxtLayout>
    <div class="px-5 lg:px-32 flex flex-col items-center gap-5 lg:gap-10 py-16 relative">
      <ImageCarousel
        :slides="slides"
        :preview-yt-video-id="cultureDetail?.preview_yt_id"
      />
      <div class="flex flex-col items-center gap-2">
        <div class="text-4xl font-bold text-amber-800">
          {{ cultureDetail?.culture_name }}
        </div>

        <p v-if="cultureDetail?.city_name" class="text-nowrap text-xl">
          Asal Budaya: <b>{{ cultureDetail?.city_name! }}</b>
        </p>
        <button v-if="user" class="btn" onclick="lihat_nilai_siswa.showModal()">
          Lihat Nilai
        </button>
        <dialog id="lihat_nilai_siswa" class="modal">
          <div class="modal-box">
            <form method="dialog">
              <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <div v-if="user">
              <div class="text-4xl font-semibold">
                Nilai siswa
              </div>
              <ul>
                <li><b>Nilai: </b> {{ cultureScore?.student_score ?? 'belum ada nilai' }}</li>
                <li><b>Evaluasi: </b> {{ cultureScore?.student_evaluation ?? 'belum ada evaluasi' }}</li>
              </ul>
            </div>
          </div>
        </dialog>
      </div>
      <div class="flex justify-end w-full">
        <!-- <p class="text-stone-600 text-sm bg-white px-2">Kota asal budaya: <b class="text-lg">{{ cultureDetail?.city_name }}</b></p> -->
      </div>
      <div
        class="absolute z-[-1] w-[8rem] lg:w-[20rem] h-[40rem] bg-contain bg-no-repeat lg:top-[-5rem] left-0"
        style="background-image: url('/images/background/batik.png');"
      />
      <div
        class="absolute z-[-1] w-[8rem] lg:w-[20rem] h-[40rem] bg-contain bg-no-repeat top-[-3rem] lg:top-[-5rem] right-0 bg-right"
        style="background-image: url('/images/background/batik-2.png');"
      />
      <div
        class="absolute w-[10rem] lg:w-[20rem] h-[20rem] bg-contain bg-no-repeat bottom-0 left-0"
        style="background-image: url('/images/background/komodo.png');"
      />

      <div class="flex flex-col lg:flex-row px-2 lg:px-36 gap-12 items-center">
        <div class="items-center flex flex-col w-fit">
          <div class="group transition ease-in-out hover:translate-y-[-4px]">
            <div class="flex items-center justify-between translate-y-5 px-6">
              <h2 class="text-3xl font-bold bg-white px-2">
                Deskripsi Budaya
              </h2>
              <!-- <p class="text-stone-600 text-sm bg-white px-2">Kota asal budaya: <b class="text-lg">{{ cultureDetail?.city_name }}</b></p> -->
            </div>
            <div
              class="group-hover:border-slate-400 group-hover:shadow-xl border px-6 py-2 text-justify flex gap-2 flex-col pb-3 rounded-md pt-7 relative overflow-hidden z-[-2]"
            >
              <p class="z-[1]">
                {{ cultureDetail?.culture_description }}
              </p>
              <div
                class="absolute bottom-[-13rem] rotate-[-14deg] right-[-5rem] w-[40rem] translate-x-[7rem] translate-y-[3rem] group-hover:translate-x-0 group-hover:translate-y-0 transition-transform ease-in-out duration-1000 h-56 bg-gradient-to-t from-orange-300 to-transparent z-[-1]"
              />
            </div>
          </div>
          <div class="group transition ease-in-out hover:translate-y-[-4px]">
            <div class="flex items-center justify-between translate-y-5 px-6">
              <h2 class="text-3xl font-bold bg-white px-2">
                Nilai Budaya
              </h2>
              <!-- <p class="text-stone-600 text-sm bg-white px-2">Kota asal budaya: <b class="text-lg">{{ cultureDetail?.city_name }}</b></p> -->
            </div>
            <div
              class="group-hover:border-slate-400 group-hover:shadow-xl border px-6 py-2 text-justify flex gap-2 flex-col pb-3 rounded-md pt-7 relative overflow-hidden z-[-2]"
            >
              <p class="z-[1]">
                {{ cultureDetail?.culture_value }}
              </p>
              <div
                class="absolute bottom-[-13rem] rotate-[-14deg] right-[-5rem] w-[40rem] translate-x-[7rem] translate-y-[3rem] group-hover:translate-x-0 group-hover:translate-y-0 transition-transform ease-in-out duration-1000 h-56 bg-gradient-to-t from-orange-300 to-transparent z-[-1]"
              />
            </div>
          </div>
        </div>

        <div class="card w-full lg:w-3/4 rounded-lg overflow-hidden lg:h-64 bg-base-100 shadow-xl">
          <figure>
            <iframe
              class="w-full aspect-video lg:h-64" :src="`https://www.youtube.com/embed/${cultureDetail?.signlanguage_yt_id ?? 'kqk1k_ISx_8'}`"
              title="Penjelasan versi bahasa isyarat" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            />
          </figure>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
