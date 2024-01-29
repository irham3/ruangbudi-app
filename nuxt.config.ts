// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/supabase',
    'nuxt-icon',
    '@vueuse/sound/nuxt',
    'nuxt-primevue',
    'vue3-carousel-nuxt',
    "@pinia/nuxt"
  ],
  css: [
    '~/assets/css/main.css',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  // https://supabase.nuxtjs.org/get-started#options
  supabase: {
    redirect: false,
    redirectOptions: {
      login: '/auth/signin',
      callback: '/auth/confirm',
      exclude: ['/', '/auth/signup'],
    },
    clientOptions: {

    },
  },
  sound: {
    sounds: {
      scan: true,
    },
  },
})