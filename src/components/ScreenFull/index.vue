<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import screenfull from 'screenfull'

const isFullscreen = ref(false)

const onToggle = () => {
  screenfull.toggle()
}

const onChange = () => {
  isFullscreen.value = screenfull.isFullscreen
}

onMounted(() => {
  screenfull.on('change', onChange)
})

onUnmounted(() => {
  screenfull.off('change', onChange)
})

</script>

<template>
  <div>
    <svg-icon
      id="guide-full"
      :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
      @click="onToggle"
    ></svg-icon>
  </div>
</template>
<style scoped lang="scss"></style>
