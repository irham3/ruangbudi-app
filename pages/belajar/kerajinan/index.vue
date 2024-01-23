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
    <div class="container flex flex-col px-36 py-8">
      <h1 class="text-4xl text-amber-900 font-bold self-center mb-6">
        Belajar Membuat Kerajinan
      </h1>

      <div class="grid grid-cols-1 sm:grid-cols-4 gap-x-10 gap-y-8 px-8">
        <VerticalCard
          v-for="(craft, index) in crafts" :key="index"
          :to="`kerajinan/${craft.slug}`"
          :title="craft.title"
          :img-path="`crafts/${craft.id}.png`"
        />
      </div>
    </div>
  </NuxtLayout>
</template>
