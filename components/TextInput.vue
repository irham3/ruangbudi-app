<script lang="ts" setup>
defineProps(['modelValue', 'disabled'])
defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="modelValue"
    :disabled="disabled"
    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
    @input="$emit('update:modelValue', (($event!.target!) as HTMLInputElement).value)"
  >
</template>
