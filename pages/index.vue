<script lang="ts" setup>
import { useSound } from '@vueuse/sound'

definePageMeta({
  title: 'Beranda',
})

// const user = useSupabaseUser()
// const userData = ref(user.value?.user_metadata)
const { play } = useSound('sounds/button-onclick.mp3')
function playButtonSound() {
  play()
  navigateTo('/belajar')
}
</script>

<template>
  <NuxtLayout>
    <!-- Hero Section -->
    <div class="overflow-hidden">
      <section class="flex flex-col-reverse sm:flex-row items-center h-screen sm:-mt-14">
        <div class="absolute top-[25%] sm:top-[42%] right-0 w-[230px] h-[450px] bg-contain bg-no-repeat bg-center z-[-1]" style="background-image: url('/images/background/wayang-bg.png');" />
        <div class="bg-contain bg-no-repeat bg-center w-3/5 h-[60vh] bg-[url('/images/hero-left.png')] transition-transform hover:scale-110" />
        <div class=" w-full px-2 text-center items-center sm:text-left sm:items-start py-4 sm:py-0 sm:w-1/2 flex flex-col">
          <h1 class="text-[2.8rem] w-10/12 font-bold mb-4">
            Belajar Budaya dan Bahasa Isyarat dengan Menyenangkan!
          </h1>
          <p class="w-10/12 mb-4">
            Kamu dapat belajar banyak hal melalui RuangBudi dengan cara yang seru dan menyenangkan terutama tentang budaya dan bahasa isyarat
          </p>
          <button class="btn max-w-44 text-center bg-orange-800 text-white hover:bg-orange-900" @click="playButtonSound">
            Yuk Belajar Sekarang!
          </button>
        </div>
      </section>

      <!-- Feature Section -->
      <section
        class="flex flex-col sm:h-screen gap-16 items-center px-20 text-center py-20 relative"
        style="background: linear-gradient(180deg, #F4E8E0 0%, #FFF 100%);
      "
      >
        <div
          class="absolute top-4 -left-4 w-[30%] h-[35%] bg-no-repeat bg-contain"
          style="background-image: url('/images/background/buku.png');"
        />
        <div
          class="absolute bottom-0 -right-16 w-[15%] h-[29%] bg-no-repeat bg-contain"
          style="background-image: url('/images/background/buku2.png');"
        />

        <div class="">
          <h2 class="text-4xl font-bold mb-3">
            Di RuangBudi, Kita Belajar Apa Aja Ya?
          </h2>
          <p>Belajar sambil bermain akan lebih asyik dengan RuangBudi!</p>
        </div>
        <div class="sm:flex-row flex flex-col gap-8">
          <div class="flex flex-col items-center">
            <div style="background-image: url('/images/wayang.png');" class="tooltip w-40 h-48 bg-contain bg-center bg-no-repeat transition-transform hover:scale-110" data-tip="Wayang" />

            <h3 class="text-xl font-bold mt-3">
              Belajar Budaya Indonesia
            </h3>
            <p>Kekayaan Budaya Indonesia sangat beragam dan menarik loh!</p>
          </div>
          <div class="flex flex-col items-center">
            <div style="background-image: url('/images/belajar-bahasa-isyarat.png');" class="tooltip w-40 h-48 bg-contain bg-center bg-no-repeat transition-transform hover:scale-110" data-tip="Papan Tulis" />
            <h3 class="text-xl font-bold mt-3">
              Belajar Bahasa Isyarat
            </h3>
            <p>Belajar menyusun kalimat sederhana dengan menyenangkan. Adik-adik pasti suka!</p>
          </div>
          <div class="flex flex-col items-center">
            <div style="background-image: url('/images/kerajinan.png');" class="tooltip w-40 h-48 bg-contain bg-center bg-no-repeat transition-transform hover:scale-110" data-tip="Kerajinan Tangan" />
            <h3 class="text-xl font-bold mt-3">
              Belajar Membuat Kerajinan
            </h3>
            <p>Belajar menyusun kalimat sederhana dengan menyenangkan. Adik-adik pasti suka!</p>
          </div>
          <div class="flex flex-col items-center">
            <div style="background-image: url('/images/kuis-games.png');" class="tooltip w-40 h-48 bg-contain bg-center bg-no-repeat transition-transform hover:scale-110" data-tip="Mobil Mainan" />
            <h3 class="text-xl font-bold mt-3">
              Kuis dan Games
            </h3>
            <p>Kuis untuk melatih pemahaman adik-adik, permainan untuk bersenang-senang!</p>
          </div>
        </div>
      </section>

      <!-- About Section -->
      <section class="flex flex-col sm:flex-row items-center justify-center -mt-16 sm:gap-28 gap-6 h-screen sm:px-40 px-2 relative">
        <div class="absolute top-4 left-0 w-[13rem] h-[16rem] bg-contain bg-no-repeat" style="background-image: url('/images/background/beok.png');" />

        <div class="sm:w-2/5 w-full text-center sm:text-start">
          <h2 class="text-4xl mb-5 font-bold">
            Tentang RuangBudi
          </h2>
          <p class="max-w-md">
            RuangBudi membantu siswa/i SD SLB Negeri Sukapura Bandung untuk mempelajari budaya Indonesia sekaligus  meningkatkan kemampuan komunikasi siswa/i dengan pembelajaran yang seru dan menyenangkan
          </p>
        </div>
        <div class="sm:w-4/12 w-11/12 rounded-md border-8 border-white shadow-lg transition-transform hover:scale-105">
          <div class="bg-[#CA855F] rounded-sm flex flex-col items-center">
            <div class="h-64 bg-no-repeat w-11/12 bg-center bg-contain" style="background-image: url('/images/illustration.png');" />
            <div class="bg-white w-full rounded-t-md flex flex-col gap-2 items-center py-6">
              <h3 class="text-xl font-semibold">
                RuangBudi
              </h3>
              <div class="flex items-center gap-2">
                <p>Belajar</p>
                <div class="w-1 h-1 bg-black rounded-full" />
                <p>Budaya</p>
                <div class="w-1 h-1 bg-black rounded-full" />
                <p>Isyarat</p>
              </div>
              <button class="btn max-w-44 text-center bg-orange-800 text-white hover:bg-orange-900 px-4 py-2 rounded-md flex gap-2" onclick="video_modal.showModal()" @click="playButtonSound">
                <Icon name="material-symbols-light:play-arrow-rounded" class="text-2xl" />
                Tonton Videonya
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>

    <dialog id="video_modal" class="modal flex justify-center">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/kqk1k_ISx_8?si=0RE0WFmtCOmwnRu_&rel=0" title="Video Ruang Budi" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen />

      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  </NuxtLayout>
</template>
