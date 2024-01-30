<script lang="ts" setup>
import type { Slide } from '~/utils/types'

const props = defineProps<{
  slides: Slide[]
  previewYtVideoId?: string
}>()
</script>

<template>
  <section class="container mx-auto">
    <div class="carousel w-full">
      <!-- Preview Video -->
      <div
        id="slide1"
        :key="1"
        class="carousel-item relative w-full"
      >
        <figure class="w-full h-[32rem] image-full object-cover">
          <iframe
            class="w-full h-[32rem]" :src="`https://www.youtube.com/embed/${previewYtVideoId ?? 'kqk1k_ISx_8'}`"
            title="Video Ruang Budi" frameborder="0"
            allow="autoplay"
            allowfullscreen
          />
        </figure>

        <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a :href="props.slides.length === 0 ? `#slide1` : `#slide${props.slides.length + 1}`" class="btn btn-circle">❮</a>
          <a :href="props.slides.length === 0 ? `#slide1` : `#slide2`" class="btn btn-circle">❯</a>
        </div>
      </div>

      <!-- Image Slides -->
      <div
        v-for="(slide, index) in props.slides" :id="`slide${index + 2}`" :key="index + 1"
        class="carousel-item relative w-full"
      >
        <img :src="slide.image" class="w-full h-[32rem] image-full object-cover" onclick="my_modal_1.showModal()">
        <dialog id="my_modal_1" class="modal">
          <div class="modal-box aspect-auto w-11/12 max-w-5xl">
            <form method="dialog">
              <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <img :src="slide.image" class="w-screen aspect-video mt-5" alt="">
          </div>
        </dialog>

        <div
          class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"
        >
          <a :href="index === 0 ? `#slide1` : `#slide${index + 1}`" class="btn btn-circle">❮</a>
          <a :href="index === props.slides.length - 1 ? `#slide1` : `#slide${index + 3}`" class="btn btn-circle">❯</a>
        </div>
      </div>
    </div>

    <div class="flex">
      <div class="flex justify-center w-full py-2 gap-2">
        <a
          v-for="(_, index) in slides" :key="index"
          :href="`#slide${index + 1}`" class="btn btn-xs"
        >
          {{ index + 1 }}
        </a>
        <a
          :href="`#slide${props.slides.length + 1}`" class="btn btn-xs"
        >
          {{ props.slides.length + 1 }}
        </a>
      </div>
    </div>
  </section>
</template>
