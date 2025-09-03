<script setup>
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <div>
    <el-tooltip :content="$t('msg.navBar.guide')">
      <svg-icon id="guide-start" icon="guide" @click="open = true" />
    </el-tooltip>
    <el-tour v-model="open">
      <el-tour-step target="#guide-start" :title="$t('msg.guide.guideTitle')">
        <div>{{ $t('msg.guide.guideDesc') }}</div>
      </el-tour-step>
      <el-tour-step
        target="#guide-hamburger"
        :title="$t('msg.guide.hamburgerTitle')"
        :description="$t('msg.guide.hamburgerDesc')"
      />
      <el-tour-step
        target="#guide-breadcrumb"
        :title="$t('msg.guide.breadcrumbTitle')"
        :description="$t('msg.guide.breadcrumbDesc')"
      />
    </el-tour>
  </div>
</template>
