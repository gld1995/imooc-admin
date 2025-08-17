<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
</script>

<template>
  <el-config-provider :locale="$store.getters.language === 'en' ? en : zhCn">
    <router-view />
  </el-config-provider>
</template>

<style lang="scss"></style>
