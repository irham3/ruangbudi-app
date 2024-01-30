<script lang="ts" setup>
import type { CraftDetail } from '~/utils/types'

definePageMeta({
  title: 'Belajar Membuat Kerajinan',
})

const client = useSupabaseClient()
const crafts = ref<CraftDetail[]>()

async function fetchCrafts() {
  const { data } = await client
    .from('v_crafts')
    .select('slug, title, id') as { data: CraftDetail[] }
  return Promise.all(data)
}

onMounted(async () => {
  crafts.value = await fetchCrafts()
})
</script>

<template>
  <NuxtLayout>
    <img
      src="/images/background/batik-2.png"
      alt=""
      class="w-[10rem] absolute right-0 top-[50%] -z-10"
    >
    <img
      src="/images/background/batik.png"
      alt=""
      class="w-[10rem] absolute left-0 top-[50%] -z-10"
    >
    <div class="flex flex-col px-10 md:px-36 py-8">
      <div class="w-full object-center overflow-hidden h-[16rem] md:h-[20rem] bg-pink-300 absolute left-0 top-0">
        <img
          class="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1682686578601-e7851641d52c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        >
      </div>
      <div class="mt-[11rem] md:mt-[15rem] space-y-4">
        <h1 class="text-4xl text-amber-900 font-bold self-center text-center">
          Belajar Membuat Kerajinan
        </h1>
        <p class="text-center md:px-[10%]">
          Anak-anak sekarang memiliki banyak potensi yang dapat dikembangkan melalui berbagai kegiatan. Salah satu kegiatan yang mengasah kreativitas mereka adalah membuat kerajinan tangan.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-8 px-8">
          <VerticalCard
            v-for="(craft, index) in crafts"
            :key="index" class="!max-w-full"
            :to="`kerajinan/${craft.slug}`"
            :title="craft.title"
            :img-path="`crafts/${craft.id}.png`"
          />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
