<script setup lang="ts">
definePageMeta({
  title: 'Masuk',
})

const supabase = useSupabaseClient()
const { $toast: toast } = useNuxtApp()
const isLoading = ref(false)

// Form Data
const email = ref('')
const password = ref('')

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
          <!-- <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-email">
            Email
          </label> -->
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
          <!-- <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
            Password
          </label> -->
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
        class="btn w-full bg-blue-700 hover:bg-blue-900
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
        class="text-blue-800 font-bold"
      > Daftar
      </NuxtLink>
    </span>
  </NuxtLayout>
</template>
