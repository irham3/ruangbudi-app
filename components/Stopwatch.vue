<script lang="ts" setup>
const startTime = ref(0)
const elapsedTime = ref(0)
const isRunning = ref(false)

const formattedTime = computed(() => {
  const minutes = Math.floor(elapsedTime.value / 60000)
  const seconds = Math.floor((elapsedTime.value % 60000) / 1000)
  // const milliseconds = elapsedTime.value % 1000

  return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
})

function start() {
  if (!isRunning.value) {
    startTime.value = Date.now() - elapsedTime.value
    isRunning.value = true

    requestAnimationFrame(update)
  }
}

function stop() {
  isRunning.value = false
}

function reset() {
  elapsedTime.value = 0
}

function update() {
  if (isRunning.value) {
    elapsedTime.value = Date.now() - startTime.value

    requestAnimationFrame(update)
  }
}
onMounted (() => start())
onBeforeUnmount(() => {
  reset()
  stop()
})
</script>

<template>
  <div>
    <p>{{ formattedTime }}</p>
    <!--
    <button @click="start">
      Start
    </button>

    <button @click="stop">
      Stop
    </button>

    <button @click="reset">
      Reset
    </button> -->
  </div>
</template>
