// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true },
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/supabase',
    'nuxt-icon',
    '@vueuse/sound/nuxt',
    '@pinia/nuxt',
    'nuxt-aos',
    "@nuxt/image"
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