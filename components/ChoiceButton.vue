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
    class="btn text-left w-fit transition-transform hover:scale-105 text-white hover:bg-amber-700 h-fit py-4"
    :class="{ 'bg-amber-700': isSelected && !isChecked, 'bg-green-600': isChecked && isRight, 'bg-red-600': isSelected && isChecked && !isRight, 'bg-blue-600': !isSelected }"
  >
    <div class="flex flex-col gap-2 items-center">
      <NuxtImg
        preload
        width="200"
        :src="`https://igdhuwnfxnlgnizlnjjc.supabase.co/storage/v1/object/public/assets/gif/${choice.text}.gif`"
      />
      <p>{{ choice.text }}</p>
    </div>
  </button>
</template>
