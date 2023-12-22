<script setup lang="ts">
const supabase = useSupabaseClient()
const email = ref('')
const password = ref('')

const signInWithOtp = async () => {
  const { error } = await supabase.auth.signInWithOtp({
    email: email.value,
    options: {
      emailRedirectTo: 'http://localhost:3000/auth/confirm',
    }
  })
  if (error) console.log(error)
}
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="~/assets/logo.svg" alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Masuk ke akunmu</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <TextInput v-model="email" id="email" name="email" type="email" autocomplete="email" required/>
        
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
        <TextInput v-model="password" id="password" name="password" type="password" required/>

        <div>
          <button type="submit" @click="signInWithOtp" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Daftar Menggunakan E-Mail</button>
        </div>
      </form>
    </div>
  </div>
</template>
