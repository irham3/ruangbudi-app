<script lang="ts" setup>
const user = useSupabaseUser()
const tebakBudaya = useTebakBudayaStore()

await useAsyncData('tebakBudaya', () => tebakBudaya.fetchQuizzes())
tebakBudaya.setStudentUUID(user.value!.id)

const {
  quizzes,
  currentQuestionIndex,
  score,
  completedQuiz,
  getSelectedChoiceId,
  getRightChoiceId,
  getIsChecked,
  isSubmitted,
} = storeToRefs(tebakBudaya)

function exitQuiz() {
  navigateTo('/quiz-games/tebak-budaya')
  tebakBudaya.$reset()
}

function refreshPage() {
  window.location.reload()
}
</script>

<template>
  <NuxtLayout
    name="quiz"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-7xl shadow-lg rounded p-8 bg-slate-50">
      <button
        class="flex gap-1 font-semibold transition-transform hover:scale-105 "
        onclick="stop_modal.showModal()"
      >
        <Icon name="mdi:keyboard-backspace" class="text-2xl" />
        Kembali ke menu
      </button>
      <div class="text-center text-2xl font-bold text-amber-700 mb-4">
        Quiz Tebak Budaya
      </div>
      <progress class="progress progress-success w-full h-4" :value="completedQuiz" :max="quizzes.length" />
      <div class="flex justify-between mb-4">
        <div class="flex flex-col text-base">
          Soal {{ currentQuestionIndex + 1 }}
        </div>
        <div>
          <b>Skor:</b> {{ score }}
        </div>
      </div>

      <div class="flex flex-col gap-2 lg:flex-row justify-between items-center">
        <!-- Question Section -->
        <div>
          <div class="text-2xl font-bold mb-2">
            {{ quizzes[currentQuestionIndex].question_text }}
          </div>
          <NuxtImg
            preload
            class="max-w-md max-h-60"
            :src="`https://igdhuwnfxnlgnizlnjjc.supabase.co/storage/v1/object/public/images/quizes/tebak-budaya/${encodeURIComponent(quizzes[currentQuestionIndex].question_img_filename)}`"
            placeholder
          />
        </div>
        <div class="grid grid-cols-2 grid-rows-2 gap-2 w-fit">
          <!-- Choices Section -->
          <ChoiceButton
            v-for="choice in quizzes[currentQuestionIndex].choices"
            :key="choice.id"
            :choice="choice"
            :is-selected="getSelectedChoiceId() === choice.id"
            :is-right="choice.id === getRightChoiceId()"
            :is-checked="quizzes[currentQuestionIndex].isChecked"
            @click="tebakBudaya.selectChoice(choice.id)"
          />
        </div>
      </div>
      <!-- Question Control Flow Section -->
      <div class="flex flex-col-reverse gap-2 lg:gap-0 lg:flex-row justify-between mt-8">
        <button v-if="!getIsChecked() && currentQuestionIndex !== quizzes.length - 1" class="btn btn-sm" @click="tebakBudaya.nextQuestion">
          Lewati
        </button>
        <div v-else />
        <div class="flex justify-between lg:justify-end gap-2">
          <button
            v-if="currentQuestionIndex !== 0"
            class="btn btn-sm btn-neutral" @click="tebakBudaya.prevQuestion"
          >
            <Icon name="material-symbols:arrow-left-alt" />
            Kembali
          </button>
          <button
            v-if="currentQuestionIndex === quizzes.length - 1 && getIsChecked()"
            class="btn btn-sm bg-amber-700 hover:bg-amber-800 text-white"
            :disabled="completedQuiz !== quizzes.length"
            @click="tebakBudaya.submit()"
          >
            Kumpulkan
          </button>
          <button v-else :disabled="!getSelectedChoiceId()" class="btn btn-sm lg:w-fit btn-neutral" :class="{ '!w-full': currentQuestionIndex === 0 }">
            <div v-if="!getIsChecked()" @click="tebakBudaya.checkChoice()">
              Cek Jawaban
              <Icon name="material-symbols:search-rounded" class="text-xl" />
            </div>
            <div v-else @click="tebakBudaya.nextQuestion()">
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
          Skor kamu adalah <span class="text-amber-700">{{ score }}</span>/{{ quizzes.length * 100 }}
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
