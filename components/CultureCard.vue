<script lang="ts" setup>
import type { Culture } from '~/utils/types'

defineProps<{
  culture: Culture
}>()

const cdnUrl = 'https://igdhuwnfxnlgnizlnjjc.supabase.co/storage/v1/object/public/images/cultures'
</script>

<template>
  <div class="w-full lg:max-w-full lg:flex shadow-lg">
    <div
      v-if="culture.image_filenames.length !== 0"
      class="h-52 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
      :style="{ backgroundImage: `url(${cdnUrl}/${culture.id}/${culture.image_filenames[0]})` }"
      title="Gambar Budaya"
    />
    <div class="max-w-sm w-full lg:max-w-full border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
      <div class="mb-8">
        <div class="text-gray-900 font-bold text-xl mb-2">
          {{ culture.culture_name }}
        </div>
        <p class="text-gray-700 text-base line-clamp-2">
          {{ culture.culture_description }}
        </p>
      </div>
      <div class="flex gap-2">
        <div class="badge badge-accent">
          {{ culture.province_name }}
        </div>
        <div v-if="culture.city_name" class="badge badge-neutral">
          {{ culture.city_name }}
        </div>
      </div>
    </div>
  </div>
</template>
