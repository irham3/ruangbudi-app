<template>
  <div class="card">
    <Carousel :num-visible="1" :num-scroll="1">
      <template #item>
        <div class="border-1 surface-border border-round m-2 text-center py-5 px-3">
          <Image v-for="i in 10" :key="i" class="w-6 shadow-2" src="https://primefaces.org/cdn/primevue/images/galleria/galleria10.jpg" alt="Image" preview />
        </div>
      </template>
    </Carousel>
  </div>
</template>
