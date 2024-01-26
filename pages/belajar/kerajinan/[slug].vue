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
    <div class="px-32 flex flex-col items-center gap-10 py-16 relative">
      <p class="text-4xl font-bold text-amber-800">
        {{ craft?.title }}
      </p>

      <div id="player" class="plyr__video-embed w-full h-[32rem] image-full object-cover">
        <iframe
          class="w-full h-[32rem]" :src="`https://www.youtube.com/embed/${craft?.youtube_id}?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1`"
          :title="craft?.title" frameborder="0"
          allow="autoplay"
          allowfullscreen
          allowtransparency
        />
      </div>
      <div class="flex px-36 gap-12 items-center">
        <div class="items-center flex flex-col w-fit">
          <div class="group transition ease-in-out hover:translate-y-[-4px]">
            <div class="flex items-center justify-between translate-y-5 px-6">
              <h2 class="text-3xl font-bold bg-white px-2">
                Deskripsi
              </h2>
            </div>
            <div
              class="group-hover:border-slate-400 group-hover:shadow-xl border px-6 py-2 text-justify flex gap-2 flex-col pb-3 rounded-md pt-7 relative overflow-hidden z-[-2]"
            >
              <pre class="z-[1] font-sans">{{ craft?.description }}</pre>
              <div
                class="absolute bottom-[-13rem] rotate-[-14deg] right-[-5rem] w-[40rem] translate-x-[7rem] translate-y-[3rem] group-hover:translate-x-0 group-hover:translate-y-0 transition-transform ease-in-out duration-1000 h-56 bg-gradient-to-t from-orange-300 to-transparent z-[-1]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
