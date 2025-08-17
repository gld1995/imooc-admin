<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { generateTitle } from '@/utils/i18n'

const route = useRoute()
const store = useStore()

const breadcrumbData = ref([])
const linkHoverColor = store.getters.cssVar.menuBg
console.log('linkHoverColor', linkHoverColor)
const getBreadcrumbData = () => {
  breadcrumbData.value = route.matched.filter(
    (route) => route.meta && route.meta.title
  )
  console.log('breadcrumbData.value', breadcrumbData.value)
}

watch(
  route,
  () => {
    getBreadcrumbData(route.matched)
  },
  { immediate: true }
)
</script>
<template>
  <el-breadcrumb class="breadcrumb" :separator-icon="ArrowRight">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(route, index) in breadcrumbData"
        :key="route.path"
        :to="
          index === breadcrumbData.length - 1 ? undefined : { path: route.path }
        "
        :class="{ 'no-redirect': index === breadcrumbData.length - 1 }"
        >{{ generateTitle(route.meta.title)  }}</el-breadcrumb-item
      >
    </transition-group>
  </el-breadcrumb>
</template>
<style scoped lang="scss">
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  ::v-deep .el-breadcrumb__inner.is-link {
    color: #666666;
    &:hover {
      color: v-bind(linkHoverColor);
    }
  }
}
.no-redirect {
  ::v-deep .el-breadcrumb__inner {
    color: #97a8be !important;
  }
}
</style>
