<script lang="ts" setup>
import type { User } from '@supabase/supabase-js'
import type { SignLanguageDetail, SignLanguageDetailScore } from '~/utils/types'

definePageMeta({
  title: 'Belajar Isyarat',
})

const route = useRoute()
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const { $toast: toast } = useNuxtApp()

const title = ref<string>()
const videoDetails = ref<SignLanguageDetail[]>()
const videoDetailId = ref<number>()
const videoPath = ref<string>()

// Student Score
const studentMetadata = ref<Student>()
const videoDetailScore = ref<SignLanguageDetailScore>()

// Student Video Recording
const videoLive = ref<HTMLVideoElement | null>(null)
const videoRecorded = ref<HTMLVideoElement>()
const videoUploaded = ref<HTMLVideoElement>()

const submittedVideo = ref<ArrayBuffer>()
const tempRecordedVideoUrl = ref<string>()
const uploadedVideoUrl = ref<string>()

const isRecording = ref<boolean>(false)
const isUploading = ref<boolean>(false)

let stream: MediaStream | null = null
let mediaRecorder: MediaRecorder | null = null

async function fetchTitle(slug: string) {
  const { data } = await supabase
    .from('signlanguages')
    .select('title')
    .eq('slug', slug)
    .single() as { data: { title: string } }
  return data.title
}

async function fetchVideos(slug: string) {
  const { data } = await supabase
    .from('v_signlanguage_details')
    .select('id, title, youtube_id')
    .eq('slug', slug) as { data: SignLanguageDetail[] }

  return data
}

async function fetchScore(videoDetailId: number) {
  const { data } = await supabase
    .from('signlanguage_detail_scores')
    .select('video_detail_id, student_score, student_evaluation')
    .eq('video_detail_id', videoDetailId)
    .limit(1)
    .single() as { data: SignLanguageDetailScore }

  return data
}

function fetchVideoUploadedUrl(videoPath: string) {
  const { data } = supabase
    .storage
    .from('videos')
    .getPublicUrl(videoPath)

  return data.publicUrl
}

async function uploadVideo(submittedVideo: ArrayBuffer, videoPath: string) {
  isUploading.value = true
  // Delete video if exist
  const { error: deleteError } = await supabase
    .storage
    .from('videos')
    .remove([videoPath])

  if (deleteError) {
    toast(deleteError.message, {
      type: toast.TYPE.ERROR,
    })

    isUploading.value = false
    return
  }

  // Upload new recorded video
  const { error } = await supabase
    .storage
    .from('videos')
    .upload(videoPath, submittedVideo, {
      upsert: true,
    })
  if (error) {
    toast(error.message, {
      type: toast.TYPE.ERROR,
    })

    isUploading.value = false
    return
  }

  isUploading.value = false
  uploadedVideoUrl.value = tempRecordedVideoUrl.value!
  videoUploaded.value!.src = tempRecordedVideoUrl.value!
  toast(`Video-mu berhasil diupload`, {
    type: toast.TYPE.SUCCESS,
  })
}

async function getUserData(videoDetailId: number, userData: User) {
  videoPath.value = `sign-languages/${route.hash.substring(1)}/${userData.id}.webm`
  studentMetadata.value = userData.user_metadata as Student
  videoDetailScore.value = await fetchScore(videoDetailId)

  uploadedVideoUrl.value = fetchVideoUploadedUrl(videoPath.value)

  // Video exists
  const { status } = await useFetch(uploadedVideoUrl.value)
  if (status.value !== 'error')
    videoUploaded.value!.src = uploadedVideoUrl.value
  else
    uploadedVideoUrl.value = undefined
}

async function getVideoData(youtube_id: string) {
  await navigateTo(`#${youtube_id}`)
  videoDetailId.value = videoDetails.value!.find(item => item.youtube_id === youtube_id)!.id!

  if (user.value) {
    getUserData(videoDetailId.value, user.value)

    if (tempRecordedVideoUrl.value)
      URL.revokeObjectURL(tempRecordedVideoUrl.value)

    tempRecordedVideoUrl.value = undefined
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
    tempRecordedVideoUrl.value = URL.createObjectURL(event.data)
    videoRecorded.value!.src = tempRecordedVideoUrl.value

    // Convert Blob to ArrayBuffer
    if (mediaRecorder!.state === 'inactive' && videoRecorded.value && videoRecorded.value.src) {
      fetch(videoRecorded.value.src)
        .then(response => response.blob())
        .then(blob => blob.arrayBuffer())
        .then((arrayBuffer) => {
          submittedVideo.value = arrayBuffer
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

const loadingFetch = ref(true)

onBeforeMount(async () => {
  const slug = route.params.slug as string
  const youtubeId = route.hash.substring(1)

  title.value = await fetchTitle(slug)
  videoDetails.value = await fetchVideos(slug)
  const firstYtVideoId = videoDetails.value![0].youtube_id

  if (youtubeId.length !== 0)
    await getVideoData(youtubeId)
  else
    await getVideoData(firstYtVideoId)

  setTimeout(() => {
    loadingFetch.value = false
  }, 500)
})

enum Navigasi {
  KirimVideo,
  PenilaianGuru,
}

const navigasi = ref<Navigasi>(Navigasi.KirimVideo)
</script>

<template>
  <NuxtLayout>
    <div class="flex flex-col-reverse lg:flex-row items-center lg:items-start justify-between px-5 lg:px-20 py-8 gap-6 rtl:mr-3 w-full">
      <div class="ml-4 w-full">
        <div v-if="$route.hash.substring(1).length !== 0">
          <!-- Video was selected -->
          <div class="plyr__video-embed">
            <iframe
              class="aspect-video w-full rounded-xl"
              :src="`https://www.youtube.com/embed/${$route.hash.substring(1)}?rel=0&modestbranding=1`"
              allowfullscreen allowtransparency allow="autoplay"
              v-if="!loadingFetch"
            />
            <div class="w-full aspect-video bg-slate-200 animate-pulse rounded-lg" v-else></div>
          </div>

          <div v-if="user" class="space-y-4 mt-4">
            <div class="bg-[#CA855F1A] px-4 py-2 rounded-xl" v-if="!loadingFetch">
              <h4 class="font-semibold">
                {{ videoDetails?.find(item => item.youtube_id === $route.hash.substring(1))?.title }}
              </h4>
            </div>
            <div class="h-[40px] w-full bg-slate-200 animate-pulse" v-else></div>

            <div class="w-full flex border-y divide-x">
              <button class="w-full text-center py-3 border-b-stone-500" :class="{ 'border-b-2 font-semibold': navigasi === Navigasi.KirimVideo }" @click="navigasi = Navigasi.KirimVideo">
                Kirim video belajar kamu ya!
              </button>
              <button class="w-full text-center py-3 border-b-stone-500" :class="{ 'border-b-2 font-semibold': navigasi === Navigasi.PenilaianGuru }" @click="navigasi = Navigasi.PenilaianGuru">
                Penilaian oleh Guru
              </button>
            </div>

            <div class="" v-if="!loadingFetch">
              <div v-show="navigasi === Navigasi.KirimVideo" class="w-full flex">
                <div class="w-full px-4 py-2 border rounded-md">
                  <div class="flex justify-center gap-2 mb-4">
                    <button :disabled="isRecording" class="btn btn-sm btn-neutral" @click="startRecording">
                      {{ tempRecordedVideoUrl ? 'Rekam Ulang' : 'Mulai Merekam' }}
                    </button>
  
                    <button class="btn btn-sm btn-error" :disabled="!isRecording" @click="stopRecording">
                      Berhenti Merekam
                    </button>
                  </div>
                  <div class="flex flex-col items-center">
                    <!-- When Recording -->
                    <div v-show="isRecording" class="mt-2">
                      <div class="flex gap-2 font-semibold text-base sm:text-lg xl:text-2xl text-red-800">
                        Sedang Merekam...
                        <Stopwatch v-if="isRecording" />
                      </div>
                      <video ref="videoLive" autoplay muted playsinline />
                    </div>
  
                    <!-- After Recording -->
                    <div v-show="!isRecording && tempRecordedVideoUrl && videoUploaded?.src !== tempRecordedVideoUrl">
                      <div class="flex justify-between font-semibold text-base sm:text-lg xl:text-3xl">
                        Hasil Rekaman Kamu
                        <button class="btn btn-sm bg-amber-700 text-slate-200 hover:bg-amber-800" :disabled="!tempRecordedVideoUrl || isRecording" @click="uploadVideo(submittedVideo!, videoPath!)">
                          Kumpulkan Video
                          <span v-if="isUploading" class="loading loading-spinner loading-xs" />
                        </button>
                      </div>
                      <video ref="videoRecorded" controls playsinline />
                    </div>
  
                    <!-- Uploaded Video -->
                    <div v-show="!isRecording && uploadedVideoUrl" class="mt-4">
                      <div class="font-semibold text-base sm:text-lg xl:text-3xl mb-2">
                        Video yang sudah kamu kumpulkan
                      </div>
                      <video ref="videoUploaded" controls playsinline />
                    </div>
                  </div>
                </div>
              </div>
              <div v-show="navigasi === Navigasi.PenilaianGuru" class="w-full flex">
                <div class="flex flex-col w-full px-4 py-2 border rounded-md">
                  <p><b>Nilai Siswa:</b></p>
                  <p>{{ videoDetailScore?.student_score ?? 'belum ada nilai' }}</p>
                  <p><b>Evaluasi:</b></p>
                  <p>{{ videoDetailScore?.student_evaluation ?? 'belum ada evaluasi' }}</p>
                </div>
              </div>
            </div>
            <div class="w-full h-[20rem] bg-slate-200 animate-pulse" v-else></div>
          </div>
        </div>

        <div v-else>
          <!-- Video is not selected yet -->
          <div class="mb-4 text-4xl font-bold">
            Belum ada video pembelajaran yang tersedia
          </div>
        </div>
      </div>
      <aside
        class="flex flex-col rounded-xl lg:w-5/12 lg:h-screen px-4 py-4 overflow-y-auto bg-[#DAAA8F66] border-r rtl:border-r-0 rtl:border-l dark:bg-[#DAAA8F66] dark:border-gray-300"
        v-if="!loadingFetch"
      >
        <div class="flex flex-col flex-1 w-full">
          <div class="text-2xl font-bold">
            {{ title }}
          </div>
          <nav class="w-full">
            <ul class="steps steps-vertical w-full">
              <li v-for="(videoDetail, index) in videoDetails" :key="index" class="step step-coklat w-full">
                <button
                  :class="videoDetails!.findIndex(obj => obj.id === videoDetailId) === index ? 'bg-gray-800' : 'bg-gray-500'"
                  class="flex items-center px-4 py-2 w-full rounded-md text-gray-200 hover:bg-gray-800 mt-4"
                  @click="getVideoData(videoDetail.youtube_id)"
                >
                  <span class="mx-4 font-medium line-clamp-2">{{ videoDetail.title }}</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      <div class="rounded-xl lg:w-5/12 lg:h-screen bg-slate-200 animate-pulse" v-else></div>
    </div>
  </NuxtLayout>
</template>

<style scoped>
.steps .step-coklat + .step-coklat:before,
  .steps .step-coklat:after {
  --tw-bg-opacity: 1;
  background-color: #d97706;
  --tw-text-opacity: 1;
  color: #d97706;
}
.steps .step-coklat + .step-coklat:before,
  .steps .step-coklat:after {
  --tw-bg-opacity: 1;
  background-color: #d97706;
  --tw-text-opacity: 1;
  color: #d97706;
}
.steps .step-coklat + .step-coklat:before,
  .steps .step-coklat:after {
  --tw-bg-opacity: 1;
  background-color: #d97706;
  --tw-text-opacity: 1;
  color: white
}
</style>