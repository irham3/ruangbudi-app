<script lang="ts" setup>
import type { SignLanguageDetail, SignLanguageDetailScore } from '~/utils/types'

definePageMeta({
  title: 'Belajar Isyarat',
})

const route = useRoute()
const client = useSupabaseClient()
const user = useSupabaseUser()
const { $toast: toast } = useNuxtApp()

const videoDetails = ref<SignLanguageDetail[]>()
const videoDetailId = ref<number>()

// Student Score
const studentMetadata = ref<Student>()
const videoDetailScore = ref<SignLanguageDetailScore>()

// Student Video Recording
const videoLive = ref<HTMLVideoElement | null>(null)
const videoRecorded = ref<HTMLVideoElement>()
let stream: MediaStream | null = null
let mediaRecorder: MediaRecorder | null = null
const isRecording = ref(false)
const videoUploaded = ref<ArrayBuffer>()

async function fetchVideos(slug: string) {
  const { data } = await client
    .from('v_signlanguage_details')
    .select('id, title, youtube_id')
    .eq('slug', slug) as { data: SignLanguageDetail[] }

  return data
}

async function fetchScore(videoDetailId: number) {
  const { data } = await client
    .from('signlanguage_detail_scores')
    .select('video_detail_id, student_score, student_evaluation')
    .eq('video_detail_id', videoDetailId)
    .limit(1)
    .single() as { data: SignLanguageDetailScore }

  return data
}

async function getVideoData(youtube_id: string) {
  await navigateTo(`#${youtube_id}`)
  videoDetailId.value = videoDetails.value!.find(item => item.youtube_id === youtube_id)!.id!

  // User Data
  if (user.value) {
    studentMetadata.value = user.value.user_metadata as Student
    videoDetailScore.value = await fetchScore(videoDetailId.value)
  }
}

async function startRecording() {
  stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  })

  mediaRecorder = new MediaRecorder(stream, {
    mimeType: 'video/webm',
  })

  videoLive.value!.srcObject = stream

  if (!MediaRecorder.isTypeSupported('video/webm')) {
    toast('video/webm is not supported', {
      type: toast.TYPE.WARNING,
    })
  }

  mediaRecorder = new MediaRecorder(stream, {
    mimeType: 'video/webm',
  })

  mediaRecorder.addEventListener('dataavailable', (event) => {
    videoRecorded.value!.src = URL.createObjectURL(event.data)

    // Convert Blob to ArrayBuffer
    if (mediaRecorder!.state === 'inactive' && videoRecorded.value && videoRecorded.value.src) {
      fetch(videoRecorded.value.src)
        .then(response => response.blob())
        .then(blob => blob.arrayBuffer())
        .then((arrayBuffer) => {
          videoUploaded.value = arrayBuffer
        })
    }
  })

  mediaRecorder!.start()
  isRecording.value = true
}

function stopRecording() {
  mediaRecorder!.stop()
  isRecording.value = false

  stream!
    .getTracks()
    .forEach(track => track.stop())
}

async function uploadVideo() {
  const { error } = await client
    .storage
    .from('videos')
    .upload(`sign-languages/${route.hash.substring(1)}/${user.value?.id}.webm`, videoUploaded.value!, {
      cacheControl: '3600',
      upsert: true,
    })

  if (error) {
    toast(error.message, {
      type: toast.TYPE.ERROR,
    })

    return
  }

  toast(`Video-mu berhasil diupload`, {
    type: toast.TYPE.SUCCESS,
  })
}
onMounted(async () => {
  const slug = route.params.slug as string
  videoDetails.value = await fetchVideos(slug)

  // User logged in
  if (user.value) {
    studentMetadata.value = user.value.user_metadata as Student
    videoDetailScore.value = await fetchScore(videoDetailId.value!)
  }
})

enum Navigasi {
  KirimVideo,
  PenilaianGuru,
}

const navigasi = ref<Navigasi>(Navigasi.KirimVideo)

</script>

<template>
  <NuxtLayout>
    <div class="flex flex-row justify-between px-20 py-8 gap-6 rtl:mr-3 w-full">
      <div class="ml-4 w-full">
        <div v-if="$route.hash.substring(1).length !== 0">
          <!-- Video Selected -->

          <iframe class="aspect-video w-full rounded-xl"
            :src="`https://www.youtube.com/embed/${$route.hash.substring(1)}`" />

          <div v-if="user" class="space-y-4 mt-4">
            <div class="bg-[#CA855F1A] px-4 py-2 rounded-xl">
              <h4 class="font-semibold">Belajar Membuat Kalimat Sederhana Yuk!</h4>
              <p>Bagaimana membuat kalimat sederhana sesuai dengan kaidah SPOK?</p>
            </div>

            <div class="w-full flex border-y divide-x">
              <div class="w-full text-center py-3 border-b-stone-500" @click="navigasi = Navigasi.KirimVideo" :class="{'border-b-2 font-semibold': navigasi == Navigasi.KirimVideo}">
                Kirim video belajar kamu ya!
              </div>
              <div class="w-full text-center py-3 border-b-stone-500" @click="navigasi = Navigasi.PenilaianGuru" :class="{'border-b-2 font-semibold': navigasi == Navigasi.PenilaianGuru}">
                Penilaian oleh Guru
              </div>
            </div>

            <div class="w-full flex" v-show="navigasi == Navigasi.KirimVideo">
              <div class="w-full px-4 py-2 border rounded-md">
                <div class="flex gap-2 mb-4">
                  <button class="btn btn-sm btn-neutral" @click="startRecording">
                    Start
                  </button>

                  <button class="btn btn-sm btn-error" :disabled="!isRecording" @click="stopRecording">
                    Stop
                  </button>

                  <button class="btn btn-sm btn-primary" :disabled="!videoUploaded" @click="uploadVideo">
                    Upload
                  </button>
                </div>

                <div>
                  <video ref="videoLive" autoplay muted playsinline />
                </div>

                <div>
                  <video v-show="videoUploaded" ref="videoRecorded" controls playsinline />
                </div>

              </div>
              <div class="w-full">

              </div>
            </div>
            <div class="w-full flex" v-show="navigasi == Navigasi.PenilaianGuru">
              <div class="w-full">
              </div>
              <div class="w-full px-4 py-2 border rounded-md">
                <p><b>Nilai: </b> {{ videoDetailScore?.student_score ?? 'belum ada nilai' }}</p>
                <p><b>Evaluasi</b></p>
                <p>{{ videoDetailScore?.student_evaluation ?? 'belum ada evaluasi' }}</p>

              </div>
            </div>


          </div>
        </div>
        <div v-else>
          <!-- Video is not selected yet -->
          <h1 class="mb-4 text-4xl font-bold">
            Belum ada video yang dipilih
          </h1>
        </div>
      </div>
      <aside
        class="flex flex-col rounded-xl w-5/12 h-screen px-4 py-4 overflow-y-auto bg-[#DAAA8F66] border-r rtl:border-r-0 rtl:border-l dark:bg-[#DAAA8F66] dark:border-gray-300">
        <div class="flex flex-col flex-1 w-full">
          <div class="text-lg font-bold">
            {{ videoDetails?.find(item => item.youtube_id === $route.hash.substring(1))?.title }}
          </div>
          <nav class="w-full">
            <ul class="steps steps-vertical w-full">
              <li v-for="(videoDetail, index) in videoDetails" :key="index" class="step step-primary w-full">
                <button
                  class="flex items-center px-4 py-2 w-full text-gray-700 bg-gray-100 rounded-md dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-800 mt-4"
                  @click="getVideoData(videoDetail.youtube_id)">
                  <span class="mx-4 font-medium line-clamp-2">{{ videoDetail.title }}</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  </NuxtLayout>
</template>
