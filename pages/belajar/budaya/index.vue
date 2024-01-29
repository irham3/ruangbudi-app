<script lang="ts" setup>
import { useSound } from '@vueuse/sound'
import HorizontalCard from '~/components/HorizontalCard.vue'
import type { City, CultureCategory } from '~/utils/types'

definePageMeta({
  title: 'Belajar Budaya',
})

const client = useSupabaseClient()
const cultures = ref<Culture[]>()

const cities = ref<City[]>()
const categories = ref<CultureCategory[]>()

const selectedCategoryId = ref<number>(0)
const selectedCityId = ref<number>(0)

// Load Image
// https://igdhuwnfxnlgnizlnjjc.supabase.co/storage/v1/object/public/images/cultures/1/Baju_Tari_Jaipong.jpg

async function fetchCultures(category_id: number, city_id: number) {
  let query = client.from('v_cultures').select('*')

  if (category_id !== 0 && city_id !== 0) {
    query = query.eq('category_id', category_id).eq('city_id', city_id)
  }
  else if (category_id !== 0 || city_id !== 0) {
    if (category_id !== 0)
      query = query.eq('category_id', category_id)
    if (city_id !== 0)
      query = query.eq('city_id', city_id)
  }

  const { data: tableCultures } = await query as { data: Culture[] }
  return Promise.all(tableCultures)
}

async function fetchCities() {
  const { data: cities } = await client
    .from('cities')
    .select('id, city_name')
    .neq('id', 1) as { data: City[] }
  return Promise.all(cities)
}

async function fetchCategories() {
  const { data: cities } = await client
    .from('culture_categories')
    .select('id, category_name') as { data: CultureCategory[] }
  return Promise.all(cities)
}

const { play } = useSound('sounds/button-onclick.mp3')

async function search() {
  play()
  cultures.value = await fetchCultures(selectedCategoryId.value, selectedCityId.value)
}

onMounted(async () => {
  cultures.value = await fetchCultures(selectedCategoryId.value, selectedCityId.value)
  cities.value = await fetchCities()
  categories.value = await fetchCategories()
})
</script>

<template>
  <NuxtLayout>
    <img 
      src="/images/background/batik-2.png" 
      alt="" 
      class="w-[15rem] absolute right-0 top-[12%] -z-10"
    >
    <img 
      src="/images/background/batik.png" 
      alt="" 
      class="w-[15rem] absolute left-0 top-[12%] -z-10"
    >
    <img 
      src="/images/background/komodo.png" 
      alt="" 
      class="w-[15rem] absolute left-0 top-[200%] -z-10"
    >
    <img 
      src="/images/background/wayang-bg.png" 
      alt="" 
      class="w-[15rem] absolute right-0 top-[200%] -z-10"
    >
    <div class="flex flex-col py-14">
      <h1 class="text-4xl text-amber-900 font-bold self-center mb-6">
        Belajar Budaya
      </h1>
      <div class="h-[35vh] sm:h-[80vh] flex flex-col w-full items-center px-[2rem]">
        <div
          class="w-11/12 flex-1 bg-contain bg-center bg-no-repeat transition-transform duration-700 hover:scale-105"
          style="background-image: url('/images/indonesia.png');"
        />
      </div>
      <div class="sm:px-32 px-4">
        <!-- Filter Section -->
        <div class="flex justify-center mb-12">
          <div class="flex gap-6 border border-stone-400 sm:w-fit w-full px-4 py-2.5 rounded-md items-center">
            <div class="flex items-center gap-4">
              <div class="flex gap-3 items-center hover:scale-105 transition-all">
                <Icon name="icon-park-outline:city" class="rotate-180 text-stone-600" />
                <select v-model="selectedCityId" type="number" class="placeholder:text-stone-500 sm:text-base text-sm w-full sm:w-fit border-transparent focus:border-transparent focus:ring-0 focus:outline-none">
                  <option :value="0" selected disabled>
                    -Pilih Kota-
                  </option>
                  <option :value="0">
                    Semua Kota
                  </option>
                  <option
                    v-for="city in cities" :key="city.id"
                    :value="city.id"
                  >
                    {{ city.city_name }}
                  </option>
                </select>
              </div>
              <div class="w-[1px] h-[32px] bg-stone-300" />
              <div class="flex gap-3 items-center hover:scale-105 transition-all">
                <Icon name="material-symbols:category" class=" text-stone-600" />
                <select v-model="selectedCategoryId" type="text" class="placeholder:text-stone-500 sm:text-base text-sm w-full sm:w-fit border-transparent focus:border-transparent focus:ring-0 focus:outline-none">
                  <option :value="0" selected disabled>
                    -Pilih Kategori-
                  </option>
                  <option :value="0">
                    Semua Kategori
                  </option>
                  <option
                    v-for="category in categories" :key="category.id"
                    :value="category.id"
                  >
                    {{ category.category_name }}
                  </option>
                </select>
              </div>
            </div>
            <button class="px-6 py-1 bg-[#aa6c4a] rounded-sm text-white font-semibold sm:text-base text-sm transition-transform hover:scale-105" @click="search">
              Telusuri
            </button>
          </div>
        </div>

        <!-- Culture Card List -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8 px-8">
          <NuxtLink
            v-for="culture in cultures"
            :key="culture.id"
            :to="`/belajar/budaya/${culture.culture_slug}`"
            class="max-w-sm w-full lg:max-w-full lg:flex cursor-pointer transition-all hover:shadow-md hover:bg-slate-50 hover:scale-105 rounded-md"
          >
            <HorizontalCard :culture="culture" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
