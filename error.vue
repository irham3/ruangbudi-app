<template>
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
        <div class="text-center">
            <img src="/images/background/error-img.svg" width="400" alt="404" />
          <h2 class="text-6xl font-bold text-gray-600">Opps!!!</h2>
          <p class="text-2xl font-semibold text-gray-600 mt-2">Halaman tidak ditemukan.</p>
          <button class="bg-orange-700 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded mt-4">
            <NuxtLink to="/">
                Kembali ke Beranda
            </NuxtLink>
          </button>
        </div>
     </div>
</template>
