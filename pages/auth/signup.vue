<script setup lang="ts">
definePageMeta({
  title: 'Daftar',
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

  const studentMetadata: StudentData = {
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
    <form class="w-full max-w-lg" method="post" @submit.prevent="signUp">
      <div class="flex flex-wrap -mx-3 md:mb-4">
        <div class="w-full md:w-1/2 px-3">
          <!-- <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
            Nama Depan
          </label> -->
          <TextInput id="grid-first-name" v-model="firstName" type="text" placeholder="Nama Depan" required />
        </div>
        <div class="w-full md:w-1/2 px-3">
          <!-- <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
            Nama Belakang
          </label> -->
          <TextInput id="grid-last-name" v-model="lastName" type="text" placeholder="Nama Belakang" required />
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 md:mb-4">
        <div class="w-full px-3">
          <!-- <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-email">
            Email
          </label> -->
          <TextInput id="grid-email" v-model="email" type="email" placeholder="Email" required />
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 md:mb-4">
        <div class="w-full md:w-1/2 px-3">
          <!-- <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
            Password
          </label> -->
          <TextInput id="grid-password" v-model="password" type="password" placeholder="Password" required />
        </div>
        <div class="w-full md:w-1/2 px-3">
          <!-- <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-confirm-password">
            Konfirmasi Password
          </label> -->
          <TextInput id="grid-confirm-password" v-model="confirmPassword" type="password" placeholder="Konfirmasi Password" required />
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 md:mb-4">
        <div class="w-full md:w-1/2 px-3">
          <!-- <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
            Password
          </label> -->
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
        <div class="w-full md:w-1/2 px-3">
          <!-- <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-confirm-password">
            Konfirmasi Password
          </label> -->
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
        class="btn w-full bg-blue-700 hover:bg-blue-900
      rounded-lg shadow-xl font-bold text-white my-10
      py-2.5 px-5 focus:outline-none items-center"
        type="submit"
      >
        Daftar
        <span v-if="isLoading" class="loading loading-spinner loading-xs" />
      </button>
    </form>
    <span>
      Sudah punya akun?
      <NuxtLink to="/auth/signin" class="text-blue-800 font-bold">Masuk</NuxtLink>
    </span>
  </NuxtLayout>
</template>
