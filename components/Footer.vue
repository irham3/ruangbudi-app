<script lang="ts" setup>
const date = new Date()
const currentYear = date.getFullYear()
</script>

<template>
  <footer class="relative w-full backdrop-filter backdrop-blur-lg bg-opacity-30 border-t border-gray-200">
    <div class="w-full mx-auto max-w-7xl flex-col">
      <div class="grid w-full grid-cols-1 gap-8 py-12 mx-auto md:grid-cols-2 lg:grid-cols-4 content pl-24">
        <div class="w-full">
          <p
            class="block mb-4 font-sans text-sm antialiased font-bold leading-normal uppercase opacity-50 text-blue-gray-900"
          >
            Belajar Budaya
          </p>
          <ul class="space-y-1">
            <li class="block font-sans text-base antialiased font-normal leading-relaxed text-blue-gray-900">
              <NuxtLink to="" class="inline-block py-1 pr-2 transition-transform hover:scale-105">
                Daerah Asal budaya
              </NuxtLink>
            </li>
            <li class="block font-sans text-base antialiased font-normal leading-relaxed text-blue-gray-900">
              <NuxtLink to="" class="inline-block py-1 pr-2 transition-transform hover:scale-105">
                Jenis Budaya
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div class="w-full">
          <p
            class="block mb-4 font-sans text-sm antialiased font-bold leading-normal uppercase opacity-50 text-blue-gray-900"
          >
            Belajar Bahasa Isyarat
          </p>
          <ul class="space-y-1">
            <li class="block font-sans text-base antialiased font-normal leading-relaxed text-blue-gray-900">
              <NuxtLink to="" class="inline-block py-1 pr-2 transition-transform hover:scale-105">
                SIBI
              </NuxtLink>
            </li>
            <li class="block font-sans text-base antialiased font-normal leading-relaxed text-blue-gray-900">
              <NuxtLink to="" class="inline-block py-1 pr-2 transition-transform hover:scale-105">
                Buat Kalimat
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div class="w-full">
          <p
            class="block mb-4 font-sans text-sm antialiased font-bold leading-normal uppercase opacity-50 text-blue-gray-900"
          >
            Media Sosial Kami
          </p>
          <ul class="space-y-1">
            <li class="block font-sans text-base antialiased font-normal leading-relaxed text-blue-gray-900">
              <NuxtLink to="https://www.youtube.com/@RuangBudi" target="_blank" class="inline-block py-1 pr-2 transition-transform hover:scale-105">
                Youtube
              </NuxtLink>
            </li>
            <li class="block font-sans text-base antialiased font-normal leading-relaxed text-blue-gray-900">
              <NuxtLink to="https://www.instagram.com/ruang_budi/" target="_blank" class="inline-block py-1 pr-2 transition-transform hover:scale-105">
                Instagram
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div class="w-full">
          <p
            class="block mb-4 font-sans text-sm antialiased font-bold leading-normal uppercase opacity-50 text-blue-gray-900"
          >
            Tentang Kami
          </p>
          <ul class="space-y-1">
            <li class="block font-sans text-base antialiased font-normal leading-relaxed text-blue-gray-900">
              <NuxtLink to="https://innovillage.id/" target="_blank" class="inline-block py-1 pr-2 transition-transform hover:scale-105">
                Innovillage
              </NuxtLink>
            </li>
            <li class="block font-sans text-base antialiased font-normal leading-relaxed text-blue-gray-900">
              <NuxtLink to="" class="inline-block py-1 pr-2 transition-transform hover:scale-105">
                Ruang Budi
              </NuxtLink>
            </li>
            <li class="block font-sans text-base antialiased font-normal leading-relaxed text-blue-gray-900">
              <NuxtLink to="" class="inline-block py-1 pr-2 transition-transform hover:scale-105">
                Our Team
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <div class="flex flex-col justify-center items-center">
        <div class="mb-4">
          <NuxtImg src="/images/logo.png" class="transition-transform hover:scale-110" alt="Logo" />
        </div>
        <p>Innovillage - Ruang Budi - HearWeAre Team</p>
        <p>Copyright © 2023-{{ currentYear }}</p>
      </div>
    </div>
    <div class="absolute w-[230px] h-[450px] left-0 -top-7" style="background-image: url('/images/background/wayang-bg-2.png');" />
    <div class="absolute w-[230px] h-[450px] right-0 -top-7" style="background-image: url('/images/background/wayang-bg.png');" />
  </footer>
</template>
