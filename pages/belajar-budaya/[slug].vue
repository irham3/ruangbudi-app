<script lang="ts" setup>
import Image from 'primevue/image'

// const route = useRoute()

// const slug = route.params.slug

definePageMeta({
  title: 'Belajar Budaya',
})
</script>

<template>
  <!-- <NuxtLayout>
    <h1>Halaman Belajar Budaya</h1>
    <ul>
      <li v-for="{ id, culture_name } in cultures" :key="id">{{id}}. {{culture_name}}</li>
    </ul>
  </NuxtLayout> -->

  <div class="px-32 flex flex-col items-center gap-10 py-16 relative">
    <MyCarousel />
    <div class="absolute w-[20rem] h-[40rem] bg-contain bg-no-repeat top-[-5rem] left-0" style="background-image: url('/images/background/batik.png');" />
    <div class="absolute w-[20rem] h-[40rem] bg-contain bg-no-repeat top-[-5rem] right-0 bg-right" style="background-image: url('/images/background/batik-2.png');" />
    <div class="absolute w-[20rem] h-[20rem] bg-contain bg-no-repeat bottom-0 left-0" style="background-image: url('/images/background/komodo.png');" />

    <h1 class="text-5xl font-semibold">
      {{ $route.params.slug }}
    </h1>

    <div class="card flex justify-content-center">
      <Image src="https://primefaces.org/cdn/primevue/images/galleria/galleria10.jpg" alt="Image" width="250" preview />
    </div>

    <!-- <div class="w-[46rem] h-[30rem] bg-contain bg-center bg-no-repeat" style="background-image: url('/images/budaya_jawa-barat.png');" />
      <div class="w-[46rem] h-[30rem] bg-contain bg-center bg-no-repeat" style="background-image: url('/images/budaya_jawa-timur.png');" /> -->
  </div>
</template>
