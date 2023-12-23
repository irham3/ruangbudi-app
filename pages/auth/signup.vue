<script setup lang="ts">
definePageMeta({
  title: 'Daftar'
})

const supabase = useSupabaseClient()
const { $toast: toast } = useNuxtApp()

// Form Data
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const gender = ref(0)

const selectedClass = ref(0)
const classOptions = ref([
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
  { text: '12 SMA', value: 12 }
])


const signUp = async () => {
  const { error } = await supabase.auth.signUp(
    {
      email: email.value,
      password: password.value,
      options: {
        // emailRedirectTo: 'http://localhost:3000/auth/confirm',
        data: {
          first_name: firstName.value,
          last_name: lastName.value,
          gender: gender.value,
          class: selectedClass.value,
        }
      }
    }
  )

  if (error) {
    alert(error)
    return
  }
  
  await navigateTo('/auth/signin');
  toast("Berhasil! Akunmu telah dibuat", {
    type: toast.TYPE.SUCCESS,
  });
}
</script>

<template>
  <NuxtLayout name="auth" title="Daftar Akun">
    <form @submit.prevent="signUp" class="w-full max-w-lg" method="post">
      <div class="flex flex-wrap -mx-3 md:mb-4">
        <div class="w-full md:w-1/2 px-3">
          <!-- <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
            Nama Depan
          </label> -->
          <TextInput v-model="firstName" id="grid-first-name" type="text" placeholder="Nama Depan" required/>
        </div>
        <div class="w-full md:w-1/2 px-3">
          <!-- <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
            Nama Belakang
          </label> -->
          <TextInput v-model="lastName" id="grid-last-name" type="text" placeholder="Nama Belakang" required/>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 md:mb-4">
        <div class="w-full px-3">
          <!-- <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-email">
            Email
          </label> -->
          <TextInput v-model="email" id="grid-email" type="email" placeholder="Email" required/>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 md:mb-4">
        <div class="w-full md:w-1/2 px-3">
          <!-- <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
            Password
          </label> -->
          <TextInput v-model="password" id="grid-password" type="password" placeholder="Password" required/>
        </div>
        <div class="w-full md:w-1/2 px-3">
          <!-- <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-confirm-password">
            Konfirmasi Password
          </label> -->
          <TextInput v-model="confirmPassword" id="grid-confirm-password" type="password" placeholder="Konfirmasi Password" required/>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 md:mb-4">
        <div class="w-full md:w-1/2 px-3">
          <!-- <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
            Password
          </label> -->
          <select v-model="selectedClass" class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" required>
            <option value=0 selected disabled>-Pilih Kelas-</option>
            <option v-for="option in classOptions" :value="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
        <div class="w-full md:w-1/2 px-3">
          <!-- <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-confirm-password">
            Konfirmasi Password
          </label> -->
          <select v-model="gender" class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" required>
            <option value=0 selected disabled>-Pilih Jenis Kelamin-</option>
            <option value=1>Laki - laki</option>
            <option value=2>Perempuan</option>
          </select>
        </div>
      </div>
      <button class="w-full bg-blue-700 hover:bg-blue-900
      rounded-lg shadow-xl font-medium text-white my-10
      py-2.5 px-5 focus:outline-none" type="submit">Daftar</button>
    </form>
    <span>
      Sudah punya akun?
      <NuxtLink to="/auth/signin" class="text-blue-800 font-bold">Masuk</NuxtLink>
    </span>
  </NuxtLayout>
</template>
