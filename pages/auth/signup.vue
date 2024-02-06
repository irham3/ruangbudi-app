<script setup lang="ts">
definePageMeta({
  title: 'Daftar',
  middleware: [
    // Check if user has logged in
    function () {
      const user = useSupabaseUser()

      if (user.value) {
        return navigateTo('/', {
          redirectCode: 301,
        })
      }
    },
  ],
})

const supabase = useSupabaseClient()
const { $toast: toast } = useNuxtApp()
const isLoading = ref(false)

// Form Data
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const gender = ref('')
const studentClass = ref(0)

const classOptions = [
  { text: '1 SD', value: 1 },
  { text: '2 SD', value: 2 },
  { text: '3 SD', value: 3 },
  { text: '4 SD', value: 4 },
  { text: '5 SD', value: 5 },
  { text: '6 SD', value: 6 },
  { text: '7 SMP', value: 7 },
  { text: '8 SMP', value: 8 },
  { text: '9 SMP', value: 9 },
  { text: '10 SMA', value: 10 },
  { text: '11 SMA', value: 11 },
  { text: '12 SMA', value: 12 },
]

async function signUp() {
  isLoading.value = true

  const studentMetadata: Student = {
    first_name: firstName.value,
    last_name: lastName.value,
    gender: gender.value,
    student_class: studentClass.value,
  }

  const { error } = await supabase.auth.signUp(
    {
      email: email.value,
      password: password.value,
      options: {
        // emailRedirectTo: 'http://localhost:3000/auth/confirm',
        data: studentMetadata,
      },
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
  await navigateTo('/auth/signin')
  toast('Akunmu berhasil dibuat', {
    type: toast.TYPE.SUCCESS,
  })
}
</script>

<template>
  <NuxtLayout name="auth" title="Daftar Akun">
    <form class="flex flex-col w-full max-w-lg gap-4" method="post" @submit.prevent="signUp">
      <div class="flex flex-wrap lg:-mx-3">
        <div class="w-full lg:w-1/2 lg:px-3 lg:mb-0 mb-4">
          <TextInput id="grid-first-name" v-model="firstName" type="text" placeholder="Nama Depan" required />
        </div>
        <div class="w-full lg:w-1/2 lg:px-3">
          <TextInput id="grid-last-name" v-model="lastName" type="text" placeholder="Nama Belakang" required />
        </div>
      </div>
      <div class="flex flex-wrap lg:-mx-3">
        <div class="w-full lg:px-3">
          <TextInput id="grid-email" v-model="email" type="email" placeholder="Email" required />
        </div>
      </div>
      <div class="flex flex-wrap lg:-mx-3">
        <div class="w-full md:w-1/2 lg:px-3 lg:mb-0 mb-4">
          <TextInput id="grid-password" v-model="password" type="password" placeholder="Password" required />
        </div>
        <div class="w-full md:w-1/2 lg:px-3">
          <TextInput id="grid-confirm-password" v-model="confirmPassword" type="password" placeholder="Konfirmasi Password" required />
        </div>
      </div>
      <div class="flex flex-wrap lg:-mx-3">
        <div class="w-full md:w-1/2 lg:px-3 lg:mb-0 mb-4">
          <select
            v-model="studentClass"
            class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            required
          >
            <option
              value="0"
              selected
              disabled
            >
              -Pilih Kelas-
            </option>
            <option
              v-for="option in classOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.text }}
            </option>
          </select>
        </div>
        <div class="w-full md:w-1/2 lg:px-3">
          <select v-model="gender" class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" required>
            <option value="" selected disabled>
              -Pilih Jenis Kelamin-
            </option>
            <option value="l">
              Laki - laki
            </option>
            <option value="p">
              Perempuan
            </option>
          </select>
        </div>
      </div>
      <button
        class="btn w-full bg-amber-700 hover:bg-amber-900
      rounded-lg shadow-xl font-bold text-white my-6
      focus:outline-none items-center text-base"
        type="submit"
      >
        Daftar
        <span v-if="isLoading" class="loading loading-spinner loading-xs" />
      </button>
    </form>
    <span>
      Sudah punya akun?
      <NuxtLink to="/auth/signin" class="text-amber-800 font-bold">Masuk</NuxtLink>
    </span>
  </NuxtLayout>
</template>
