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
      <div
        v-for="(slide, index) in props.slides" :id="`slide${index + 1}`" :key="index"
        class="carousel-item relative w-full"
      >
        <img :src="slide.image" class="w-full h-[32rem] image-full object-cover">

        <div
          v-if="previewYtVideoId"
          class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"
        >
          <a :href="index + 1 === 1 ? `#slide${props.slides.length}` : `#slide${index}`" class="btn btn-circle">❮</a>
          <a :href="index + 1 === props.slides.length ? `#slide2` : `#slide${index + 2}`" class="btn btn-circle">❯</a>
        </div>
      </div>
      <div
        :id="`slide${props.slides.length + 1}`" :key="props.slides.length"
        class="carousel-item relative w-full"
      >
        <figure class="w-full h-[32rem] image-full object-cover">
          <iframe
            class="w-full h-[32rem]" :src="`https://www.youtube.com/embed/${previewYtVideoId}`"
            title="Video Ruang Budi" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          />
        </figure>

        <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a :href="props.slides.length + 1 === 1 ? `#slide${props.slides.length}` : `#slide${props.slides.length}`" class="btn btn-circle">❮</a>
          <a :href="props.slides.length + 1 === props.slides.length ? `#slide1` : `#slide${props.slides.length + 2}`" class="btn btn-circle">❯</a>
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
