<script setup lang="ts">

definePageMeta({
  title: 'Masuk'
})

const supabase = useSupabaseClient()
const { $toast: toast } = useNuxtApp()

// Form Data
const email = ref('')
const password = ref('')

const signIn = async () => {
  const { error } = await supabase.auth.signInWithPassword(
    {
      email: email.value,
      password: password.value
    }
  )

  if (error) {
    toast(error.message, {
      type: toast.TYPE.ERROR,
    });
    return
  }
  
  await navigateTo('/');
  toast("Berhasil masuk!", {
    type: toast.TYPE.SUCCESS,
  });
}
</script>

<template>
<NuxtLayout name="auth" title="Masuk">
  <form @submit.prevent="signIn" class="w-full max-w-lg" method="post">
    <div class="flex flex-wrap -mx-3 md:mb-4">
      <div class="w-full px-3">
        <!-- <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-email">
          Email
        </label> -->
        <TextInput v-model="email" id="grid-email" type="email" placeholder="Email" required/>
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 md:mb-4">
      <div class="w-full px-3">
        <!-- <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
          Password
        </label> -->
        <TextInput v-model="password" id="grid-password" type="password" placeholder="Password" required/>
      </div>
    </div>
    <button class="w-full bg-blue-700 hover:bg-blue-900
    rounded-lg shadow-xl font-medium text-white my-10
    py-2.5 px-5 focus:outline-none" type="submit">Masuk</button>
  </form>
  <span>
    Belum punya akun?
    <NuxtLink to="/auth/signup" class="text-blue-800 font-bold">Daftar</NuxtLink>
  </span>
</NuxtLayout>
</template>