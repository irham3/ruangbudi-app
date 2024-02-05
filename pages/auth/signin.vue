<script setup lang="ts">
definePageMeta({
  title: 'Masuk',
  middleware: [
    // Check if user has logged in
    function () {
      const user = useSupabaseUser()

      if (user.value)
        return navigateTo('/')
    },
  ],
})

const supabase = useSupabaseClient()
const { $toast: toast } = useNuxtApp()
const route = useRoute()

// Form Data
const email = ref('')
const password = ref('')
const isLoading = ref(false)

async function signIn() {
  isLoading.value = true
  const { error } = await supabase.auth.signInWithPassword(
    {
      email: email.value,
      password: password.value,
    },
  )

  if (error) {
    isLoading.value = false
    toast(error.message, {
      type: toast.TYPE.ERROR,
    })
    return
  }

  isLoading.value = false

  if (route.query.from === 'tebak-budaya')
    await navigateTo('/quiz-games/tebak-budaya/')
  else if (route.query.from === 'susun-kalimat')
    await navigateTo('/quiz-games/susun-kalimat/')
  else
    await navigateTo('/')

  toast('Berhasil masuk!', {
    type: toast.TYPE.SUCCESS,
  })
}
</script>

<template>
  <NuxtLayout
    name="auth"
    title="Masuk"
  >
    <form
      class="w-full max-w-lg"
      method="post"
      @submit.prevent="signIn"
    >
      <div class="flex flex-wrap -mx-3 md:mb-4">
        <div class="w-full px-3">
          <TextInput
            id="grid-email"
            v-model="email"
            type="email"
            placeholder="Email"
            required
          />
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 md:mb-4">
        <div class="w-full px-3">
          <TextInput
            id="grid-password"
            v-model="password"
            type="password"
            placeholder="Password"
            required
          />
        </div>
      </div>
      <button
        class="btn w-full bg-amber-700 hover:bg-amber-900
      rounded-lg shadow-xl font-bold text-white my-10
      py-2.5 px-5 focus:outline-none"
        type="submit"
      >
        Masuk
        <span v-if="isLoading" class="loading loading-spinner loading-xs" />
      </button>
    </form>
    <span>
      Belum punya akun?
      <NuxtLink
        to="/auth/signup"
        class="text-amber-800 font-bold"
      > Daftar
      </NuxtLink>
    </span>
  </NuxtLayout>
</template>
