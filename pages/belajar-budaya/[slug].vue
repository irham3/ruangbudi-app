<script lang="ts" setup>
definePageMeta({
  title: 'Belajar Budaya',
})

const navItem = [
  'Beranda',
  'Belajar Budaya',
  'Belajar Isyarat',
  'Buat Kerajinan',
  'Kuis % Game',
  'Tentang Kami',
]
</script>

<template>
  <!-- <NuxtLayout>
    <h1>Halaman Belajar Budaya</h1>
    <ul>
      <li v-for="{ id, culture_name } in cultures" :key="id">{{id}}. {{culture_name}}</li>
    </ul>
  </NuxtLayout> -->

  <div class="">
    <header class="flex items-center justify-between px-[4rem] py-[1rem]">
      <div class="">
        <img src="/images/logo.png" alt="">
      </div>
      <nav class="flex items-center gap-9">
        <a v-for="nav in navItem" :key="nav" href="#">{{ nav }}</a>
      </nav>
      <button>Masuk</button>
    </header>
    <div class="px-32 flex flex-col items-center gap-10 py-16 relative">
      <div class="absolute w-[20rem] h-[40rem] bg-contain bg-no-repeat top-[-5rem] left-0" style="background-image: url('/images/background/batik.png');" />
      <div class="absolute w-[20rem] h-[40rem] bg-contain bg-no-repeat top-[-5rem] right-0 bg-right" style="background-image: url('/images/background/batik-2.png');" />
      <div class="absolute w-[20rem] h-[20rem] bg-contain bg-no-repeat bottom-0 left-0" style="background-image: url('/images/background/komodo.png');" />

      <h1 class="text-5xl font-semibold">
        {{ $route.params.slug }}
      </h1>
      <div class="w-[46rem] h-[30rem] bg-contain bg-center bg-no-repeat" style="background-image: url('/images/budaya_jawa-barat.png');" />
      <div class="w-[46rem] h-[30rem] bg-contain bg-center bg-no-repeat" style="background-image: url('/images/budaya_jawa-timur.png');" />
    </div>

    <footer class="px-36 flex flex-col gap-52 relative py-16">
      <div
        class="absolute w-[230px] h-[450px] left-0 top-16"
        style="background-image: url('/images/background/wayang-bg-2.png');"
      />
      <div
        class="absolute w-[230px] h-[450px] right-0 top-16"
        style="background-image: url('/images/background/wayang-bg.png');"
      />

      <div class="flex justify-between">
        <div v-for="i in 5" :key="i" class="flex flex-col gap-1">
          <h4 class="font-semibold">
            Belajar Budaya
          </h4>
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
