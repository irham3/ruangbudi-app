<script lang="ts" setup>

definePageMeta({
  title: 'Beranda'
})

// const user = useSupabaseUser()
// const userData = ref(user.value?.user_metadata)
</script>

<template>
  <NuxtLayout>
    <div class="flex items-center h-auto mt-14">
      <div class="">
        <div class="absolute top-[42%] right-0 w-[230px] h-[450px] bg-contain bg-no-repeat bg-center z-[-1]" style="background-image: url('/images/background/wayang-bg.png');"></div>
      </div>
      <div class="bg-contain bg-no-repeat bg-center w-3/5 h-[60vh] bg-[url('/images/hero-left.png')]">
        
      </div>
      <div class="w-1/2 flex flex-col">
        <h1 class="text-[2.8rem] w-10/12 font-bold mb-4">Belajar Budaya dan Bahasa Isyarat dengan Menyenangkan!</h1>
        <p class="w-10/12 mb-4">Kamu dapat belajar banyak hal melalui RuangBudi dengan cara yang seru dan menyenangkan terutama tentang budaya dan bahasa isyarat</p>
        <button class="btn w-1/4 text-center bg-orange-800 text-white hover:bg-orange-900 flex justify-end">Yuk Belajar Sekarang!</button>
      </div>
    </div>
  </NuxtLayout>
</template>