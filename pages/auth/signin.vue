<script setup lang="ts">
definePageMeta({
  title: 'Masuk'
})

const supabase = useSupabaseClient()

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
    alert(error)
    return
  }
  
  await navigateTo('/');
}
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <!-- <img class="mx-auto h-10 w-auto" src="~/assets/logo.svg" alt="Your Company" /> -->
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Masuk</h2>
    </div>

    <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-lg">
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
    </div>
  </div>
</template>