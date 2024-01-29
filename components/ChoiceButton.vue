<script lang="ts" setup>
import type { QuizChoice } from '~/utils/types'

defineProps<{
  choice: QuizChoice
  isSelected: boolean
  isChecked: boolean
  isRight: boolean
}>()
</script>

<template>
  <button
    :class="{ 'bg-purple-600': isSelected && !isChecked, 'bg-green-600': isChecked && isRight, 'bg-red-600': isSelected && isChecked && !isRight }"
    class="btn text-left w-full transition-transform hover:scale-105 bg-blue-600 text-white hover:bg-purple-700"
  >
    {{ choice.text }}
  </button>
</template>
