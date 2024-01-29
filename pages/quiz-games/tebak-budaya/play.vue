<script lang="ts" setup>
const user = useSupabaseUser()
const tebakBudaya = useTebakBudayaStore()
const { $toast: toast } = useNuxtApp()

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

watch(isSubmitted, () => {
  navigateTo('/quiz-games/tebak-budaya')
  toast('Selamat, kamu telah menyelesaikan quiz tebak budaya', {
    type: toast.TYPE.SUCCESS,
  })
})
</script>

<template>
  <NuxtLayout
    name="quiz"
  >
    <template #title>
      <div class="text-center text-2xl font-bold text-slate-100 drop-shadow-[0_0_10px_rgba(0,255,255,0.7)] mb-2">
        Quiz Tebak Budaya
      </div>
    </template>
    <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-7xl bg-white shadow-lg rounded px-8 pt-6 pb-8">
      <button
        class="flex gap-1 font-semibold transition-transform hover:scale-105 "
        onclick="stop_modal.showModal()"
      >
        <Icon name="mdi:keyboard-backspace" class="text-2xl" />
        Kembali ke menu
      </button>
      <progress class="progress progress-info w-full" :value="completedQuiz" :max="quizzes.length" />
      <div class="flex justify-between mb-4">
        <div class="flex flex-col text-base">
          Soal {{ currentQuestionIndex + 1 }}
        </div>
        <div>
          <b>Skor:</b> {{ score }}
        </div>
      </div>

      <div class="flex justify-between items-center">
        <!-- Question Section -->
        <div>
          <div class="text-2xl font-bold mb-2">
            {{ quizzes[currentQuestionIndex].question_text }}
          </div>
          <img
            class="max-h-72"
            :src="`https://igdhuwnfxnlgnizlnjjc.supabase.co/storage/v1/object/public/images/quizes/tebak-budaya/${quizzes[currentQuestionIndex].question_img_filename}`"
          >
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
      <div class="flex justify-between mt-8">
        <button v-if="!getIsChecked() && currentQuestionIndex !== quizzes.length - 1" class="btn btn-sm" @click="tebakBudaya.nextQuestion">
          Lewati
        </button>
        <div v-else />
        <div class="flex justify-end gap-2">
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
          <button v-else :disabled="!getSelectedChoiceId()" class="btn btn-sm btn-neutral">
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
          <button class="btn btn-outline btn-sm" @click="navigateTo('/quiz-games/tebak-budaya')">
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
  </NuxtLayout>
</template>
