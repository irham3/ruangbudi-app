<script lang="ts" setup>
definePageMeta({
  title: 'Beranda',
})

// const user = useSupabaseUser()
// const userData = ref(user.value?.user_metadata)
</script>

<template>
  <NuxtLayout>
    <!-- Hero Section -->
    <section class="flex items-center h-screen -mt-14">
      <div class="absolute top-[42%] right-0 w-[230px] h-[450px] bg-contain bg-no-repeat bg-center z-[-1]" style="background-image: url('/images/background/wayang-bg.png');" />
      <div class="bg-contain bg-no-repeat bg-center w-3/5 h-[60vh] bg-[url('/images/hero-left.png')] transition-transform hover:scale-110" />
      <div class="w-1/2 flex flex-col">
        <h1 class="text-[2.8rem] w-10/12 font-bold mb-4">
          Belajar Budaya dan Bahasa Isyarat dengan Menyenangkan!
        </h1>
        <p class="w-10/12 mb-4">
          Kamu dapat belajar banyak hal melalui RuangBudi dengan cara yang seru dan menyenangkan terutama tentang budaya dan bahasa isyarat
        </p>
        <button class="btn max-w-44 text-center bg-orange-800 text-white hover:bg-orange-900">
          Yuk Belajar Sekarang!
        </button>
      </div>
    </section>

    <!-- Feature Section -->
    <section
      class="flex flex-col h-screen gap-16 items-center px-20 text-center py-20 relative"
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
      <div class="flex gap-8">
        <div class="flex flex-col items-center">
          <div style="background-image: url('/images/wayang.png');" class="w-40 h-48 bg-contain bg-center bg-no-repeat transition-transform hover:scale-110" />
          <h3 class="text-xl font-bold mt-3">
            Belajar Budaya Indonesia
          </h3>
          <p>Kekayaan Budaya Indonesia sangat beragam dan menarik loh!</p>
        </div>
        <div class="flex flex-col items-center">
          <div style="background-image: url('/images/belajar-bahasa-isyarat.png');" class="w-40 h-48 bg-contain bg-center bg-no-repeat transition-transform hover:scale-110" />
          <h3 class="text-xl font-bold mt-3">
            Belajar Bahasa Isyarat
          </h3>
          <p>Belajar menyusun kalimat sederhana dengan menyenangkan. Adik-adik pasti suka!</p>
        </div>
        <div class="flex flex-col items-center">
          <div style="background-image: url('/images/kerajinan.png');" class="w-40 h-48 bg-contain bg-center bg-no-repeat transition-transform hover:scale-110" />
          <h3 class="text-xl font-bold mt-3">
            Belajar Membuat Kerajinan
          </h3>
          <p>Belajar menyusun kalimat sederhana dengan menyenangkan. Adik-adik pasti suka!</p>
        </div>
        <div class="flex flex-col items-center">
          <div style="background-image: url('/images/kuis-games.png');" class="w-40 h-48 bg-contain bg-center bg-no-repeat transition-transform hover:scale-110" />
          <h3 class="text-xl font-bold mt-3">
            Kuis dan Games
          </h3>
          <p>Kuis untuk melatih pemahaman adik-adik, permainan untuk bersenang-senang!</p>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="flex items-center justify-center -mt-16 gap-28 h-screen px-40 relative">
      <div class="absolute top-4 left-0 w-[13rem] h-[16rem] bg-contain bg-no-repeat" style="background-image: url('/images/background/beok.png');" />

      <div class="w-2/5">
        <h2 class="text-4xl mb-5 font-bold">
          Tentang RuangBudi
        </h2>
        <p class="max-w-md">
          RuangBudi membantu siswa/i SD SLB Negeri Sukapura Bandung untuk mempelajari budaya Indonesia sekaligus  meningkatkan kemampuan komunikasi siswa/i dengan pembelajaran yang seru dan menyenangkan
        </p>
      </div>
      <div class="w-4/12 rounded-md border-8 border-white shadow-lg transition-transform hover:scale-105">
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
            <button class="btn max-w-44 text-center bg-orange-800 text-white hover:bg-orange-900 px-4 py-2 rounded-md flex gap-2">
              <Icon name="material-symbols-light:play-arrow-rounded" class="text-2xl" />
              Tonton Videonya
            </button>
          </div>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>
