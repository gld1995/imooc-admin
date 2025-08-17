<script setup>
import { computed, defineProps } from 'vue'
import { isExternal } from '@/utils/validate'
const props = defineProps({
  icon: {
    type: String,
    requried: true
  },
  className: {
    type: String,
    default: ''
  }
})

const external = computed(() => isExternal(props.icon))
/**
 * 外部图标样式
 */
const styleExternalIcon = computed(() => ({
  mask: `url(${props.icon}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`
}))
/**
 * 项目内图标
 */
const iconName = computed(() => `#icon-${props.icon}`)
</script>
<template>
  <div
    v-if="external"
    :style="styleExternalIcon"
    :class="className"
    class="svg-external-icon svg-icon"
  ></div>
  <svg v-else :class="className" class="svg-icon" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<style scoped lang="scss">
.svg-icon {
  min-width: 14px;
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
