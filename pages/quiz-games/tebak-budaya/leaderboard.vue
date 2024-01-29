<script lang="ts" setup>
const tebakBudaya = useTebakBudayaStore()
onMounted(async () => {
  await useAsyncData('tebakBudaya', () => tebakBudaya.fetchLeaderboard().then(() => true))
})

// console.log(tebakBudaya.leaderboard)
</script>

<template>
  <NuxtLayout
    name="quiz"
  >
    <!-- List of users and their scores -->
    <div class="flex flex-col gap-4">
      <button
        class="flex gap-1 font-semibold transition-transform hover:scale-105 "
        @click="navigateTo('/quiz-games/tebak-budaya/')"
      >
        <Icon name="mdi:keyboard-backspace" class="text-2xl" />
        Kembali ke menu
      </button>
      <h1 class="text-3xl font-bold text-center">
        Skor Tertinggi
      </h1>
      <div class="overflow-x-auto">
        <table class="table">
          <!-- head -->
          <thead>
            <tr class="text-xl text-amber-800">
              <th>Peringkat</th>
              <th>Nama</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in tebakBudaya.leaderboard" :key="index" class="hover">
              <th>{{ index + 1 }}</th>
              <td>{{ item.student_name }}</td>
              <td>{{ item.score }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </NuxtLayout>
</template>
