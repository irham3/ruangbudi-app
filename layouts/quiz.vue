<template>
  <div class="flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8 bg-amber-700">
    <slot name="title" />
    <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-lg bg-white shadow-lg rounded px-8 pt-6 pb-8">
      <slot />
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: 'Nova Square', cursive;
}
</style>
