<script lang="ts" setup>
import type { Slide } from '~/utils/types'

const props = defineProps<{
  slides: Slide[],
  asalBudaya: string,
}>()
</script>

<template>
  <section class="container mx-auto">
    <div class="carousel w-full">
      <div v-for="(slide, index) in props.slides" :id="`slide${index + 1}`" :key="index"
        class="carousel-item relative w-full">
        <img :src="slide.image" class="w-full h-[32rem] image-full object-cover">
        <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a :href="index + 1 === 1 ? `#slide${props.slides.length}` : `#slide${index}`" class="btn btn-circle">❮</a>
          <a :href="index + 1 === props.slides.length ? `#slide1` : `#slide${index + 2}`" class="btn btn-circle">❯</a>
        </div>
      </div>
    </div>
    <div class="flex">
      <div class="flex justify-center w-full py-2 gap-2">
        <a v-for="(slide, index) in slides" :key="index" :href="`#slide${index + 1}`" class="btn btn-xs">{{ index + 1
        }}</a>
      </div>
    </div>
    <p class="text-nowrap text-xl float-right" v-show="asalBudaya">Asal Budaya: <b>{{ asalBudaya }}</b></p>
  </section>
</template>
