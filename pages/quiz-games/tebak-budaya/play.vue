<script lang="ts" setup>
const currentQuestionIndex = ref(0)
const score = ref(0)
const isChecked = ref<boolean>(false)
const selectedChoiceId = ref<number>()
const correctChoiceId = ref<number>()

const questions = reactive([
  {
    question: 'Berapa 2 + 2?',
    choices: [
      { id: 1, text: '1', isCorrect: false },
      { id: 2, text: '2', isCorrect: false },
      { id: 3, text: '3', isCorrect: false },
      { id: 4, text: '4', isCorrect: true },
    ],
  },
  {
    question: 'What is the capital of France?',
    choices: [
      { id: 1, text: 'London', isCorrect: false },
      { id: 2, text: 'Berlin', isCorrect: false },
      { id: 3, text: 'Paris', isCorrect: true },
      { id: 4, text: 'Madrid', isCorrect: false },
    ],
  },
  // Add more questions here
])

function checkChoice() {
  isChecked.value = true

  correctChoiceId.value = questions[currentQuestionIndex.value].choices.find(choice => choice.isCorrect === true)?.id
  score.value += (correctChoiceId.value === selectedChoiceId.value && isChecked.value) ? 100 : 0
}

function nextQuestion() {
  // checkAnswer(currentQuestionIndex.value)
  // score.value += isSelected[currentQuestionIndex.value] ? 1 : 0
  currentQuestionIndex.value++
}

function prevQuestion() {
  // checkAnswer(currentQuestionIndex.value)
  // score.value += isSelected[currentQuestionIndex.value] ? 1 : 0
  currentQuestionIndex.value--
}

function selectChoice(choiceId: number) {
  if (!isChecked.value)
    selectedChoiceId.value = choiceId
}

onMounted(() => {
  // console.log(selectedChoiceId.value)
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
    <div>
      <button
        class="flex gap-1 font-semibold transition-transform hover:scale-105 mb-3"
        onclick="stop_modal.showModal()"
      >
        <Icon name="mdi:keyboard-backspace" class="text-2xl" />
        Kembali ke menu
      </button>
      <div class="flex justify-between mb-4">
        <div class="text-base">
          Soal {{ currentQuestionIndex + 1 }}
        </div>
        <div>
          <b>Skor:</b> {{ score }}
        </div>
      </div>
      <p class="text-xl font-bold mb-4">
        {{ questions[currentQuestionIndex].question }}
      </p>

      <!-- Choices Section -->
      <div class="flex flex-col gap-2">
        <div class="grid grid-cols-2 gap-4">
          <ChoiceButton
            v-for="choice in questions[currentQuestionIndex].choices"
            :key="choice.id"
            :choice="choice"
            :is-selected="selectedChoiceId === choice.id"
            :is-correct="choice.id === correctChoiceId"
            :is-checked="isChecked"
            @click="selectChoice(choice.id)"
          />
        </div>
      </div>
      <!-- Question Control Flow Section -->
      <div class="flex justify-between mt-8">
        <button class="btn btn-sm" @click="nextQuestion">
          Lewati
        </button>
        <div class="flex justify-end gap-2">
          <button
            v-if="currentQuestionIndex !== 0"
            class="btn btn-sm btn-neutral" @click="prevQuestion"
          >
            <Icon name="material-symbols:arrow-left-alt" />
            Kembali
          </button>
          <button :disabled="!selectedChoiceId" class="btn btn-sm btn-neutral">
            <div v-if="!isChecked" @click="checkChoice">
              Cek Jawaban
              <Icon name="material-symbols:search-rounded" class="text-xl" />
            </div>
            <div v-else @click="nextQuestion">
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
