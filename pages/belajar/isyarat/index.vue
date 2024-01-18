<script lang="ts" setup>
import type { StudyVideo } from '~/utils/types'

definePageMeta({
  title: 'Belajar Bahasa Isyarat',
})

const client = useSupabaseClient()
const studyVideos = ref<StudyVideo[]>()

const kirimVideo = ref(true);

async function fetchCardData() {
  const { data } = await client
    .from('videos')
    .select('*')
    .eq('item_category_id', 1) as { data: StudyVideo[] }
  return Promise.all(data)
}

onMounted(async () => {
  studyVideos.value = await fetchCardData()
})
</script>

<template>
  <NuxtLayout>
    <div class="flex flex-col px-16 py-8">
      <div class="flex w-full gap-5">
        <div class="w-2/3">
          <div class="flex flex-col gap-4">
            <!-- Video -->
            <div class="w-full aspect-video rounded-md bg-slate-200"></div>
            <div class="bg-[#CA855F1A] px-4 py-2 rounded-md">
              <h3 class="font-semibold">Belajar Membuat Kalimat Sederhana Yuk!</h3>
              <p>Bagaimana membuat kalimat sederhana sesuai dengan kaidah SPOK?</p>
            </div>
            <div class="flex flex-col divide-y">
              <div class=""></div>
              <div class="flex">
                <div @click="kirimVideo = true" :class="!kirimVideo? '':'border-slate-400'" class="border-b-2 w-full text-center h-12 flex justify-center items-center transition-all duration-300 ease-in-out hover:bg-slate-100">
                  <p>
                    Kirim video belajar kamu ya!
                  </p>
                </div>
                <div @click="kirimVideo = false" :class="kirimVideo? '':'border-slate-400'" class="border-b-2 w-full text-center h-12 flex justify-center items-center transition-all duration-300 ease-in-out hover:bg-slate-100">
                  <p>
                    Penilaian oleh Guru
                  </p>
                </div>
              </div>
              <div class=""></div>
            </div>
            <div class="w-full flex">
              <div class="w-1/2 flex border-slate-300 border aspect-[2/1] divide-slate-300 divide-x-2 *:text-sm transition-opacity duration-300 ease-in-out" :class="!kirimVideo? 'opacity-0':''">
                <div class="w-full bg-slate-50 flex flex-col items-center justify-center gap-2">
                  <div class="size-8 rounded-full outline-4 outline outline-slate-300 bg-red-600"></div>
                  <p>Rekam Video</p>
                </div>
                <div class="w-full bg-slate-50 flex flex-col items-center justify-center">
                  <p>Drag & Drop files here</p>
                </div>
              </div>
              <div class="w-1/2 flex flex-col gap-4 border-slate-300 px-8 py-5 border rounded-md aspect-[2/1] text-sm transition-opacity duration-300 ease-in-out" :class="kirimVideo? 'opacity-0':''">
                <div class="flex items-center gap-4">
                  <img src="/images/profile/boy.jpg" alt="" class="size-10 rounded-full outline-2 outline outline-blue-400 outline-offset-2">
                  <h3 class="font-semibold text-lg">Asep Rodriguez</h3>
                </div>
                <div class="flex items-center gap-[6px]">
                  <Icon name="ic:twotone-star-half" size="1.6rem" v-for="i in 10" :class="i < 5 ? 'text-orange-600': 'text-slate-400'" />
                </div>
                <div class="">
                  <h3 class="font-semibold text-base">Evaluasi</h3>
                  <p>Asep sudah bisa memahami satu kalimat. Selanjutnya akan dicoba dua kalimat</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="h-10 flex-1 bg-[#DAAA8F66] min-h-[80vh] rounded-md flex flex-col gap-2 px-5 py-4">
          <h3 class="font-semibold">Belajar Membuat Kalimat Sederhana Yuk!</h3>
          <div class="">
            <img src="/images/icon/time.png" />
            <p>Total Durasi Video 11:01 menit</p>
          </div>
          <div class="flex gap-4">
            <div class="w-5 flex justify-center relative">
              <div class="h-full w-1 bg-orange-500 rounded-md"></div>
              <div class="size-3 outline-2 outline outline-orange-500 bg-orange-900 absolute top-[11rem] rounded-full">
              </div>
            </div>
            <div class="w-full flex flex-col py-4 gap-5">
              <div class="flex gap-3 items-center">
                <div class="w-1/2 aspect-video bg-slate-500 rounded-sm"></div>
                <div class="flex-1 text-sm">
                  <h3 class="font-semibold">Belajar membuat kalimat sesuai SPOK, yuk!</h3>
                  <p>RuangBudi</p>
                </div>
              </div>
              <div class="flex gap-3 items-center">
                <div class="w-1/2 aspect-video bg-slate-500 rounded-sm"></div>
                <div class="flex-1 text-sm">
                  <h3 class="font-semibold">Belajar membuat kalimat sesuai SPOK, yuk!</h3>
                  <p>RuangBudi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <h1 class="text-4xl font-bold self-center mb-6">
        Belajar Bahasa Isyarat
      </h1> -->

      <!-- <div class="flex gap-4">
        <VideoCard
          v-for="(studyVideo, index) in studyVideos" :key="index"
          :to="`video-belajar/${studyVideo.slug}`"
          :title="studyVideo.title"
          :img-filename="`${studyVideo.slug}.png`"
        />

        <VideoCard
          v-for="(studyVideo, index) in studyVideos" :key="index * 2"
          :to="`video-belajar/${studyVideo.slug}`"
          :title="studyVideo.title"
          :img-filename="`${studyVideo.slug}.png`"
        />
      </div> -->
    </div>
  </NuxtLayout>
</template>
