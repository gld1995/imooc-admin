<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import SvgIcon from '../SvgIcon'

const store = useStore()

const icon = computed(() =>
  store.getters.sidebarOpened ? 'hamburger-opened' : 'hamburger-closed'
)

const triggerClick = () => {
  console.log('app/triggerSidebarOpened', store.getters.sidebarOpened)
  store.commit('app/triggerSidebarOpened')
}
</script>
<template>
  <div class="hamburger-container" @click="triggerClick">
    <svg-icon id="guide-hamburger" :icon="icon" class="hamburger"></svg-icon>
  </div>
</template>
<style scoped lang="scss">
.hamburger-container {
  padding: 0 16px;
  .hamburger {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
}
</style>
