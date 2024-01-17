<script lang="ts" setup>
import { useSound } from '@vueuse/sound'

const props = defineProps<{
  to: string
  title: string
  imgPath: string
}>()

const client = useSupabaseClient()
const imageUrl = ref<string>()

const { play } = useSound('sounds/button-onclick.mp3')
function playButtonSound() {
  play()
}

onMounted(async () => {
  const { data: { publicUrl } } = client
    .storage
    .from('images')
    .getPublicUrl(props.imgPath)
  imageUrl.value = publicUrl

  const { status } = await useFetch(imageUrl.value)

  if (status.value === 'error')
    imageUrl.value = '/images/placeholder.jpg'
})
</script>

<template>
  <div
    class="relative flex cursor-pointer max-w-[16rem] flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 hover:shadow-md hover:shadow-amber-900 focus:ring- shadow-lg transform active:scale-90 transition-transform"
    @click="playButtonSound"
  >
    <NuxtLink
      :to="to"
    >
      <div class="relative w-full overflow-hidden text-gray-700 bg-transparent rounded-none shadow-none bg-clip-border">
        <img
          :src="imageUrl"
          :alt="title"
        >
      </div>
      <div class="p-4">
        <div class="flex items-center justify-between w-full">
          <h5 class="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            {{ title }}
          </h5>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
