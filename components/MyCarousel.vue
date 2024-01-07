<script setup>
const slideIndex = ref(1)
const slides = ref([
  { image: 'andrea-de-santis-g6nPslCoXDs-unsplash', description: 'Dog\'s Nose' },
  { image: 'genevieve-perron-migneron-VeqNYxZQlro-unsplash', description: 'Lawnmower' },
  { image: 'luisa-kilani-WsNTdvjhiAc-unsplash', description: 'Globe' },
  { image: 'neom-mPHOMhm45wk-unsplash', description: 'Optical Illusion' },
  // { image: 'neom-sn9A10W1Lmk-unsplash', description: 'Lips' },
])
const caption = ref('')

function plusSlides(n) {
  showSlides(slideIndex.value += n)
}

function currentSlide(n) {
  showSlides(slideIndex.value = n)
}

function showSlides(n) {
  if (n > slides.value.length)
    slideIndex.value = 1

  if (n < 1)
    slideIndex.value = slides.value.length

  slides.value.forEach((slide, index) => {
    if (index === slideIndex.value - 1) {
      slide.style = 'block'
      caption.value = slide.description
    }
    else {
      slide.style = 'none'
    }
  })
}
</script>

<template>
  <section class="container mx-auto">
    <div class="carousel w-full">
      <div :id="`slide${index+1}`" class="carousel-item relative w-full" :key="index" v-for="(slide, index) in slides">
        <img :src="`/images/tes-detail-belajar-budaya/${slide.image}.jpg`" class="w-full h-[20rem] image-full" />
        <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a :href="index+1 == 1 ? `#slide${slides.length}`: `#slide${index}`" class="btn btn-circle">❮</a>
          <a :href="index+1 == slides.length ? `#slide1`: `#slide${index+2}`" class="btn btn-circle">❯</a>
        </div>
      </div>
    </div>
    <div class="flex justify-center w-full py-2 gap-2">
      <a :href="`#slide${index+1}`" class="btn btn-xs" :key="index" v-for="(slide, index) in slides">{{ index+1 }}</a>
    </div>
  </section>
</template>