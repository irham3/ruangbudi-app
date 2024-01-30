<script lang="ts" setup>
const user = useSupabaseUser()
const { $toast: toast } = useNuxtApp()

async function navigateToPlay() {
  if (user.value) {
    await navigateTo('/quiz-games/susun-kalimat/play')
  }
  else {
    await navigateTo({
      path: '/auth/signin',
      query: {
        from: 'susun-kalimat',
      },
    })
    toast('Masuk ke akun kamu dulu ya...', {
      type: toast.TYPE.WARNING,
    })
  }
}
</script>

<template>
  <NuxtLayout
    name="quiz"
  >
    <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-lg bg-white shadow-lg rounded px-8 pt-6 pb-8">
      <button
        class="flex gap-1 font-semibold transition-transform hover:scale-105"
        @click="navigateTo('/quiz-games')"
      >
        <Icon name="mdi:keyboard-backspace" class="text-2xl" />
        Kembali
      </button>
      <div class="text-center text-2xl font-bold leading-9 tracking-tight text-amber-800 mb-4">
        Susun Kalimat
      </div>
      <div class="flex flex-col gap-2">
        <button
          class="btn w-full bg-amber-700 hover:bg-amber-900
rounded-lg shadow-xl font-bold text-white focus:outline-none"
          @click="navigateToPlay"
        >
          <Icon name="mdi:controller" class="text-2xl" />
          Mulai Bermain
        </button>
        <button
          class="btn w-full bg-yellow-400 hover:bg-yellow-500
rounded-lg shadow-xl font-bold text-slate-800 focus:outline-none"
          @click="navigateTo('/quiz-games/susun-kalimat/leaderboard')"
        >
          <Icon name="mdi:crown" class="text-2xl" />
          Lihat Skor Tertinggi
        </button>
      </div>
    </div>
  </NuxtLayout>
</template>
