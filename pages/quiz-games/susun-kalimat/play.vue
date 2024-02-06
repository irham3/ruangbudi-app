<script lang="ts" setup>
import { useSusunKalimatStore } from '~/stores/susun-kalimat'

const user = useSupabaseUser()
const susunKalimat = useSusunKalimatStore()

await useAsyncData('susunKalimat', () => susunKalimat.fetchSentences())
susunKalimat.setStudentUUID(user.value!.id)

const {
  sentences,
  currentQuestionIndex,
  score,
  completedSentence,
  getUserAnswer,
  getRightAnswer,
  getIsChecked,
  isSubmitted,
} = storeToRefs(susunKalimat)

function exitQuiz() {
  navigateTo('/quiz-games/susun-kalimat')
  susunKalimat.$reset()
}

function refreshPage() {
  window.location.reload()
}
</script>

<template>
  <NuxtLayout
    name="quiz"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-7xl bg-white shadow-lg rounded px-8 pt-6 pb-8">
      <button
        class="flex gap-1 font-semibold transition-transform hover:scale-105 "
        onclick="stop_modal.showModal()"
      >
        <Icon name="mdi:keyboard-backspace" class="text-2xl" />
        Kembali ke menu
      </button>
      <div class="text-center text-2xl font-bold text-amber-700 mb-4">
        Yuk Susun Kalimat Berikut
      </div>
      <progress class="progress progress-success w-full h-4" :value="completedSentence" :max="sentences.length" />
      <div class="flex justify-between mb-4">
        <div class="flex flex-col text-base">
          Soal {{ currentQuestionIndex + 1 }}
        </div>
        <div>
          <b>Skor:</b> {{ score }}
        </div>
      </div>

      <div class="flex flex-col justify-center items-center gap-4">
        <!-- Question Section -->
        <div class="text-2xl font-bold">
          {{ sentences[currentQuestionIndex].question_text }}
        </div>
        <NuxtImg
          preload
          :src="`https://igdhuwnfxnlgnizlnjjc.supabase.co/storage/v1/object/public/images/quizes/susun-kalimat/${sentences[currentQuestionIndex].question_img_filename}`"
          class="max-w-md lg:max-h-60 max-h-40"
        />
        <div class="w-full">
          <TextInput
            v-model="sentences[currentQuestionIndex].userAnswerText"
            :disabled="!!getIsChecked()"
            class="w-full"
            placeholder="Masukkan jawaban kamu di sini"
          />
        </div>
      </div>
      <!-- Question Control Flow Section -->
      <div class="flex justify-between mt-8">
        <button v-if="!getIsChecked() && currentQuestionIndex !== sentences.length - 1" class="btn btn-sm" @click="susunKalimat.nextQuestion">
          Lewati
        </button>
        <div v-else-if="!getIsChecked() && currentQuestionIndex === sentences.length - 1" />
        <div v-else class="font-semibold text-lg">
          <div v-if="getRightAnswer() === getUserAnswer()" class="text-green-600">
            ✅ Benar, Kamu Hebat
          </div>
          <div v-else class="text-red-600">
            ❌ Jawaban benar: {{ getRightAnswer() }}
          </div>
        </div>
        <div class="flex justify-end gap-2">
          <button
            v-if="currentQuestionIndex !== 0"
            class="btn btn-sm btn-neutral" @click="susunKalimat.prevQuestion"
          >
            <Icon name="material-symbols:arrow-left-alt" />
            Kembali
          </button>
          <button
            v-if="currentQuestionIndex === sentences.length - 1 && getIsChecked()"
            class="btn btn-sm bg-amber-700 hover:bg-amber-800 text-white"
            :disabled="completedSentence !== sentences.length"
            @click="susunKalimat.submit()"
          >
            Kumpulkan
          </button>
          <button v-else :disabled="!getUserAnswer()" class="btn btn-sm btn-neutral">
            <div v-if="!getIsChecked()" @click="susunKalimat.checkAnswer()">
              Cek Jawaban
              <Icon name="material-symbols:search-rounded" class="text-xl" />
            </div>
            <div v-else @click="susunKalimat.nextQuestion()">
              Lanjut
              <Icon name="material-symbols:arrow-right-alt" class="text-xl" />
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Stop Quuiz Confirmation -->
    <dialog id="stop_modal" class="modal">
      <div class="modal-box">
        <div class="font-bold text-lg mb-2">
          Kamu yakin ingin berhenti bermain?
        </div>
        <div class="font-normal text-base mb-5">
          Progres kamu tidak tersimpan loh...
        </div>
        <form class="flex space-x-2 w-full justify-end" method="dialog">
          <button class="btn btn-outline btn-sm" @click="exitQuiz">
            Ya
          </button>
          <button class="btn btn-neutral btn-sm">
            Tidak
          </button>
        </form>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>

    <!-- After Finishing Quiz -->
    <dialog v-if="isSubmitted" class="w-screen h-screen flex justify-center items-center bg-slate-700 bg-opacity-25">
      <div class="modal-box flex flex-col items-center">
        <div class="font-bold text-xl mb-2 text-center">
          Selamat, kamu telah menyelesaikan quiz 🎉
        </div>
        <div class="font-semibold text-base mt-2 mb-5">
          Skor kamu adalah <span class="text-amber-700">{{ score }}</span>/{{ sentences.length * 200 }}
        </div>
        <form class="flex flex-col gap-2 w-full justify-center" method="dialog">
          <button class="btn btn-sm bg-amber-700 text-white hover:bg-amber-800" @click="refreshPage">
            Main  Lagi
          </button>
          <button class="btn btn-outline border-amber-700 hover:bg-amber-800 btn-sm" @click="exitQuiz">
            Kembali ke menu
          </button>
        </form>
      </div>
    </dialog>
  </NuxtLayout>
</template>

<!-- <style scoped>
progress::-moz-progress-bar
{
  background-color: #b45309 !important;
}
</style> -->
