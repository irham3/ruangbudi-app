<script lang="ts" setup>

</script>

<template>
  <NuxtLayout
    name="quiz"
    title="Tebak Budaya"
  >
    <div class="flex flex-col gap-2">
      <button
        class="btn w-full bg-amber-700 hover:bg-amber-900
rounded-lg shadow-xl font-bold text-white focus:outline-none"
        @click="navigateTo('/quiz-games/tebak-budaya/games')"
      >
        <Icon name="mdi:controller" class="text-2xl" />
        Mulai Bermain
      </button>
      <button
        class="btn w-full bg-yellow-400 hover:bg-yellow-500
rounded-lg shadow-xl font-bold text-slate-800 focus:outline-none"
        @click="navigateTo('/quiz-games/tebak-budaya/leaderboard')"
      >
        <Icon name="mdi:crown" class="text-2xl" />
        Lihat Skor Tertinggi
      </button>
    </div>
  </NuxtLayout>
</template>
