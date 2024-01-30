<script lang="ts" setup>
import type { CraftDetail } from '~/utils/types'

definePageMeta({
  title: 'Belajar Membuat Kerajinan',
})

const route = useRoute()
const slug = route.params.slug as string
const client = useSupabaseClient()

const craft = ref<CraftDetail>()

async function fetchcraft(slug: string) {
  const { data } = await client
    .from('v_crafts')
    .select('*')
    .eq('slug', slug)
    .limit(1)
    .single() as { data: CraftDetail }
  return data
}

onMounted(async () => {
  craft.value = await fetchcraft(slug)
})
</script>

<template>
  <NuxtLayout>
    <div class="px-5 lg:px-32 flex flex-col w-[100dvw] items-center gap-10 py-6 lg:py-16 relative">
      <p class="text-4xl text-center lg:text-start font-bold text-amber-800">
        {{ craft?.title }}
      </p>

      <div id="player" class="plyr__video-embed w-full h-[32rem] image-full object-cover">
        <iframe
          class="w-full aspect-video rounded-md" :src="`https://www.youtube.com/embed/${craft?.youtube_id}`"
          :title="craft?.title" frameborder="0"
          allow="autoplay"
          allowfullscreen
          allowtransparency
        />
      </div>
      <div class="flex px-36 gap-12 items-center">
        <div class="w-full lg:w-fit">
          <div class="group w-full transition ease-in-out hover:translate-y-[-4px]">
            <div class="flex items-center justify-between translate-y-5 px-6">
              <h2 class="text-3xl font-bold bg-white px-2">
                Deskripsi
              </h2>
            </div>
            <div
              class="group-hover:border-slate-400 w-full group-hover:shadow-xl border px-6 py-2 text-justify flex gap-2 flex-col pb-3 rounded-md pt-7 relative overflow-hidden z-[-2]"
            >
              <pre class="z-[1] font-sans w-full text-wrap">{{ craft?.description }}</pre>
              <div
                class="absolute bottom-[-13rem] rotate-[-14deg] right-[-5rem] w-full lg:w-[40rem] translate-x-[7rem] translate-y-[3rem] group-hover:translate-x-0 group-hover:translate-y-0 transition-transform ease-in-out duration-1000 h-56 bg-gradient-to-t from-orange-300 to-transparent z-[-1]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
