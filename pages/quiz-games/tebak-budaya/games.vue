<script setup>
const currentQuestion = ref(0)
const score = ref(0)
const isCorrect = reactive([])

const questions = reactive([
  {
    question: 'What is 2 + 2?',
    answers: ['2', '3', '4', '5'],
    correctAnswer: 2,
  },
  {
    question: 'What is the capital of France?',
    answers: ['London', 'Berlin', 'Paris', 'Madrid'],
    correctAnswer: 2,
  },
  // Add more questions here
])

function checkAnswer(index) {
  isCorrect[index] = index === questions[currentQuestion.value].correctAnswer
}

function nextQuestion() {
  checkAnswer(currentQuestion.value)
  score.value += isCorrect[currentQuestion.value] ? 1 : 0
  currentQuestion.value++
}
</script>

<template>
  <NuxtLayout
    name="quiz"
  >
    <h2 class="text-2xl font-bold mb-4">
      Soal {{ currentQuestion + 1 }}
    </h2>
    <p class="mb-4">
      {{ questions[currentQuestion].question }}
    </p>
    <div class="flex flex-col gap-2">
      <button
        v-for="(answer, index) in questions[currentQuestion].answers"
        :key="index"
        class="btn text-left w-full" :class="{ 'bg-green-200': isCorrect[index], 'bg-red-200': !isCorrect[index] }" @click="checkAnswer(index)"
      >
        {{ answer }}
      </button>
    </div>
    <p class="mt-4">
      Score: {{ score }}
    </p>
    <button class="mt-4" @click="nextQuestion">
      Next
    </button>
  </NuxtLayout>
</template>
