<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import { useStore } from 'vuex'
import { watchSwitchLang } from '@/utils/i18n'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'

const store = useStore()
generateNewStyle(store.getters.mainColor).then((newStyleText) => {
  writeNewStyle(newStyleText)
})

watchSwitchLang(() => {
  if (store.getters.token) {
    store.dispatch('user/getUserInfo')
  }
})
</script>

<template>
  <el-config-provider :locale="$store.getters.language === 'en' ? en : zhCn">
    <router-view />
  </el-config-provider>
</template>

<style lang="scss"></style>
