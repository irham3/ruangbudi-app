<script lang="ts" setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
  <input 
    :value="modelValue"
    @input="$emit('update:modelValue', (($event!.target!) as HTMLInputElement).value)"
    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
</template>