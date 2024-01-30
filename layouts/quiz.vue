<template>
  <div class="flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8 bg-amber-700">
    <slot name="title" />
    <slot />
  </div>
</template>

<style scoped>
* {
  font-family: 'Nova Square', cursive;
}
</style>
