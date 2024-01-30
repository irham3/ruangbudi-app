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
    :class="{ 'bg-amber-600': isSelected && !isChecked, 'bg-green-600': isChecked && isRight, 'bg-red-600': isSelected && isChecked && !isRight }"
    class="btn text-left w-fit transition-transform hover:scale-105 bg-blue-600 text-white hover:bg-amber-700 h-fit py-4"
  >
    <div class="flex flex-col gap-2 items-center">
      <img
        class="max-h-32"
        :src="`https://igdhuwnfxnlgnizlnjjc.supabase.co/storage/v1/object/public/assets/gif/${choice.text}.gif`"
      >
      {{ choice.text }}
    </div>
  </button>
</template>
