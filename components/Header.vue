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
          <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[3] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <NuxtLink to="/">
                Beranda
              </NuxtLink>
            </li>
            <li>
              <a>Belajar</a>
              <ul class="p-2 z-[3]">
                <li>
                  <NuxtLink to="/belajar-budaya">
                    Belajar Budaya
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/">
                    Buat Kerajinan
                  </NuxtLink>
                </li>
              </ul>
            </li>
            <li>
              <NuxtLink to="/">
                Kuis & Games
              </NuxtLink>
            </li>
          </ul>
        </div>
        <NuxtLink to="/" class="transition-transform hover:scale-110">
          <img src="/images/logo.png" alt="Logo Ruang Budi">
        </NuxtLink>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1 font-sans text-base antialiased font-normal leading-relaxed">
          <li class="">
            <NuxtLink to="/">
              Beranda
            </NuxtLink>
          </li>
          <li class="">
            <details>
              <summary>Belajar</summary>
              <ul class="p-2 z-[3]">
                <li>
                  <NuxtLink to="/belajar-budaya">
                    Belajar Budaya
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/belajar-isyarat">
                    Belajar Bahasa Isyarat
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/">
                    Buat Kerajinan
                  </NuxtLink>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <NuxtLink to="/">
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
  <!-- <div class="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
    <div class="-m-6 max-h-[768px] w-[calc(100%+48px)] overflow-scroll">
      <nav
        class="sticky top-0 z-10 block w-full max-w-full px-4 py-2 text-black bg-white border rounded-none shadow-md h-max border-white/80 bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
        <div class="flex items-center justify-center text-blue-gray-900">
          <a href="#"
            class="mr-4 block cursor-pointer py-1.5 font-sans text-base  leading-relaxed font-bold antialiased">
            Ruang Budi
          </a>
          <div class="flex items-center gap-4">
            <div class="hidden mr-4 lg:block">
              <ul class="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                <li class="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  <NuxtLink to="/" class="flex items-center">
                    Beranda
                  </NuxtLink>
                </li>
                <li class="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  <NuxtLink to="/belajar-budaya" class="flex items-center">
                    Belajar Budaya
                  </NuxtLink>
                </li>
                <li class="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  <a href="#" class="flex items-center">
                    Blocks
                  </a>
                </li>
                <li class="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  <a href="#" class="flex items-center">
                    Docs
                  </a>
                </li>
              </ul>
            </div>
            <div class="flex items-center gap-x-1">
              <div v-if="!user">
                <NuxtLink
                  to="/auth/signin"
                  class="cursor-pointer hidden px-4 py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block">
                  <span>Masuk</span>
                </NuxtLink>
                <NuxtLink
                  to="/auth/signup"
                  class="cursor-pointer hidden select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                  type="button">
                  <span>Daftar</span>
                </NuxtLink>
              </div>
              <button
                v-else
                @click="logout"
                class="cursor-pointer hidden select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                type="button">
                <span>Keluar</span>
              </button>
            </div>
            <button
              class="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
              type="button">
              <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" stroke="currentColor"
                  stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  </div> -->
</template>
