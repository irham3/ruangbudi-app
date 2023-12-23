<script setup>
const navItem = [
  "Beranda",
  "Belajar Budaya",
  "Belajar Isyarat",
  "Buat Kerajinan",
  "Kuis % Game",
  "Tentang Kami",
]
</script>

<template>
  <div class="">
    <div class="h-screen flex flex-col">
      <div class="">
        <div class="absolute top-[23%] left-[9%] w-2/5 h-[65%] bg-contain bg-no-repeat bg-center z-[-1]" style="background-image: url('/images/background/bgIllustration.png');"></div>
        <div class="absolute top-[42%] right-0 w-[230px] h-[450px] bg-contain bg-no-repeat bg-center z-[-1]" style="background-image: url('/images/background/wayang-bg.png');"></div>
      </div>
      <header class="flex items-center justify-between px-[4rem] py-[1rem]">
        <div class="">
          <img src="/images/logo.png" alt="">
        </div>
        <nav class="flex items-center gap-9">
          <a href="#" v-for="nav in navItem" :key="nav">{{ nav }}</a>
        </nav>
        <button>Masuk</button>
      </header>
      <div class="flex-1 flex items-center px-[2rem]">
        <div class="bg-contain bg-no-repeat bg-center w-3/5 h-[60vh]" style="background-image: url('/images/gambar1.png');"></div>
        <div class="w-1/2">
          <h1 class="text-[2.8rem] w-10/12 font-bold mb-4">Belajar Budaya dan Bahasa Isyarat dengan Menyenangkan!</h1>
          <p>Kamu dapat belajar banyak hal melalui RuangBudi dengan cara yang seru dan menyenangkan terutama tentang budaya dan bahasa isyarat</p>
        </div>
      </div>
    </div>
    <div 
      class="flex flex-col gap-16 items-center px-20 text-center py-20 relative" 
      style="background: linear-gradient(180deg, #F4E8E0 0%, #FFF 100%);
      ">
      <div 
        class="absolute top-0 left-0 w-[40%] h-[45%] bg-no-repeat bg-contain" 
        style="background-image: url('/images/background/buku.png');"
      ></div>
      <div 
        class="absolute bottom-0 right-0 w-[15%] h-[29%] bg-no-repeat bg-contain" 
        style="background-image: url('/images/background/buku2.png');"
      ></div>

      <div class="">
        <h2 class="text-4xl font-semibold mb-3">Di RuangBudi, Kita Belajar Apa Aja Ya?</h2>
        <p>Belajar sambil bermain akan lebih asyik dengan RuangBudi!</p>
      </div>
      <div class="flex gap-8">
        <div class="flex flex-col items-center" v-for="i in 4" >
          <div style="background-image: url('/images/wayang.png');" class="w-40 h-48 bg-contain bg-center	 bg-no-repeat	"></div>
          <h3 class="text-xl font-semibold">Belajar Budaya Indonesia</h3>
          <p>Kekayaan Budaya Indonesia sangat beragam dan menarik loh!</p>
        </div>
      </div>
    </div>
    <div class="flex items-center gap-28 h-screen px-40 relative">
      <div class="absolute bottom-0 left-0 w-[13rem] h-[16rem] bg-contain bg-no-repeat" style="background-image: url('/images/background/beok.png');"></div>

      <div class="">
        <h2 class="text-4xl mb-5">Tentang RuangBudi</h2>
        <p>RuangBudi membantu siswa/i SD SLB Negeri Sukapura Bandung untuk mempelajari budaya Indonesia sekaligus  meningkatkan kemampuan komunikasi siswa/i dengan pembelajaran yang seru dan menyenangkan</p>
      </div>
      <div class="w-[70%] rounded-md border-8 border-white shadow-md">
        <div class="bg-[#CA855F] rounded-sm flex flex-col items-center">
          <div class="h-64 bg-no-repeat w-11/12 bg-center bg-contain" style="background-image: url('/images/illustration.png');"></div>
          <div class="bg-white w-full rounded-t-md flex flex-col gap-2 items-center py-6">
            <h3 class="text-xl font-semibold">RuangBudi</h3>
            <div class="flex items-center gap-2">
              <p>Belajar</p>
              <div class="w-1 h-1 bg-black rounded-full"></div>
              <p>Budaya</p>
              <div class="w-1 h-1 bg-black rounded-full"></div>
              <p>Isyarat</p>
            </div>
            <button class="bg-[#CA855F] px-4 py-2 rounded-md text-white flex gap-2">
              <Icon name="material-symbols-light:play-arrow-rounded" class="text-2xl" />
              <span>Tonton Videonya</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <footer class="px-36 flex flex-col gap-52 relative py-16">
      <div class="absolute w-[230px] h-[450px] left-0 top-16" style="background-image: url('/images/background/wayang-bg-2.png');"></div>
      <div class="absolute w-[230px] h-[450px] right-0 top-16" style="background-image: url('/images/background/wayang-bg.png');"></div>

      <div class="flex justify-between">
        <div class="flex flex-col gap-1" v-for="i in 5">
          <h4 class="font-semibold">Belajar Budaya</h4>
          <a href="" class="text-stone-400">Jawa Barat</a>
          <a href="" class="text-stone-400">Jawa Barat</a>
          <a href="" class="text-stone-400">Jawa Barat</a>
        </div>
      </div>
      <div class="flex flex-col items-center">
        <div class="">
          <img src="/images/logo.png" alt="">
        </div>
        <p>Innovillage 2023 - Ruang Budi - Universitas Telkom</p>
      </div>
    </footer>
  </div>
</template>