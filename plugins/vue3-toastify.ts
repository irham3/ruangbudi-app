import Vue3Toastify, { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

// https://vue3-toastify.js-bridge.com/
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Toastify, {
    theme: toast.THEME.COLORED,
    position: toast.POSITION.TOP_RIGHT,
    pauseOnHover: false,
    pauseOnFocusLoss: false,
    autoClose: 3000,
  })

  return {
    provide: { toast },
  }
})
