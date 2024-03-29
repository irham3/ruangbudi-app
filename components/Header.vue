<script lang="ts" setup>
import type { Student } from '~/utils/types'

const supabase = useSupabaseClient()
const { $toast: toast } = useNuxtApp()
const profileImage = ref('/images/profile/')

const user = useSupabaseUser()
const studentMetadata = ref<Student>()
if (user.value) {
  studentMetadata.value = user.value.user_metadata as Student

  if (studentMetadata.value!.gender === 'l')
    profileImage.value += 'boy.jpg'
  else
    profileImage.value += 'girl.jpg'
}

async function logout() {
  const { error } = await supabase.auth.signOut()

  if (error) {
    toast(error.message, {
      type: toast.TYPE.ERROR,
    })
    return
  }

  await navigateTo('/')
  toast('Anda telah keluar', {
    type: toast.TYPE.INFO,
  })
}
</script>

<template>
  <div class="w-full mx-auto sticky top-0 backdrop-filter backdrop-blur-lg bg-opacity-30 border-b border-gray-200 z-10">
    <nav class="navbar sm:px-0 lg:px-36">
      <div class="navbar-start">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[3] p-2 shadow bg-base-100 rounded-box w-52 font-semibold">
            <li>
              <NuxtLink to="/" class="font-bold">
                Beranda
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/belajar">
                Belajar
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/quiz-games">
                Quiz & Games
              </NuxtLink>
            </li>
          </ul>
        </div>
        <NuxtLink to="/" class="transition-transform hover:scale-110">
          <img src="/images/logo.png" alt="Logo Ruang Budi">
        </NuxtLink>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1 font-sans text-base antialiased font-semibold leading-relaxed ">
          <li>
            <NuxtLink to="/">
              Beranda
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/belajar">
              Belajar
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/quiz-games">
              Quiz & Games
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div class="navbar-end">
        <div v-if="!user" class="flex space-x-2">
          <NuxtLink
            to="/auth/signin"
            class="btn btn-outline btn-sm hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85]"
          >
            <span>Masuk</span>
          </NuxtLink>
          <NuxtLink
            to="/auth/signup"
            class="btn btn-neutral btn-sm hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85]"
            type="button"
          >
            <span>Daftar</span>
          </NuxtLink>
        </div>
        <div v-if="user" class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img alt="Profile Image" :src="profileImage">
            </div>
          </div>

          <ul tabindex="0" class="menu dropdown-content z-[1] p-2 shadow-lg bg-white ring-1 ring-black ring-opacity-5 w-32 mt-4 divide-y divide-slate-200">
            <div class="flex flex-row">
              <div class="flex flex-col items-start ml-4">
                <div class="text-xl font-semibold ">
                  {{ studentMetadata?.first_name }}
                </div>
                <div class="text-sm font-medium text-gray-400">
                  Kelas {{ studentMetadata?.student_class! }} {{ getStudentLevel(studentMetadata?.student_class!) }}
                </div>
              </div>
            </div>
            <li class="mt-4">
              <button onclick="logout_modal.showModal()">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Logout Confirmation -->
    <dialog id="logout_modal" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg mb-5">
          Kamu yakin ingin keluar?
        </h3>
        <form class="flex space-x-2 w-full justify-end" method="dialog">
          <button class="btn btn-outline btn-sm" @click="logout">
            Ya
          </button>
          <button class="btn btn-neutral btn-sm">
            Tidak
          </button>
        </form>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  </div>
</template>
