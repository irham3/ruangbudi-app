// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/supabase', 'nuxt-icon'],
  
  css: [
    '~/assets/css/main.css'
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
      exclude: ['/','/auth/signup'],
    },
    clientOptions: {
      
    }
  },

})