<script lang="ts" setup>
const tebakBudaya = useTebakBudayaStore()
onMounted(async () => {
  await useAsyncData('tebakBudaya', () => tebakBudaya.fetchLeaderboard().then(() => true))
})
</script>

<template>
  <NuxtLayout
    name="quiz"
  >
    <!-- List of users and their scores -->
    <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-lg bg-white shadow-lg rounded px-8 pt-6 pb-8 flex flex-col gap-4">
      <button
        class="flex gap-1 font-semibold transition-transform hover:scale-105 "
        @click="navigateTo('/quiz-games/tebak-budaya/')"
      >
        <Icon name="mdi:keyboard-backspace" class="text-2xl" />
        Kembali ke menu
      </button>
      <h1 class="text-3xl font-bold text-center text-purple-700">
        Skor Tertinggi Tebak Budaya
      </h1>
      <div class="max-h-96 overflow-auto">
        <table class="table table-xs text-center">
          <!-- head -->
          <thead>
            <tr class="text-xl text-amber-800">
              <th>Peringkat</th>
              <th>Nama</th>
              <th>Skor</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in tebakBudaya.leaderboard" :key="index" class="hover font-base">
              <th class="text-xl">
                <div v-if="index < 3" class="text-3xl">
                  <Icon v-if="index === 0" name="fluent-emoji-flat:1st-place-medal" />
                  <Icon v-if="index === 1" name="fluent-emoji-flat:2nd-place-medal" />
                  <Icon v-if="index === 2" name="fluent-emoji-flat:3rd-place-medal" />
                </div>
                <div v-else class="text-base">
                  {{ index + 1 }}
                </div>
              </th>
              <td class="max-w-48 truncate text-base">
                {{ item.student_name }}
              </td>
              <td class="max-w-48 truncate text-base">
                {{ item.score }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </NuxtLayout>
</template>
