<script setup>
import {} from 'vue'
import UploadExcel from '@/components/UploadExcel'
import { generateData } from './utils'
import { userBatchImport } from '@/api/user-manage'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

/**
 * 数据解析成功之后的回调
 */

const i18n = useI18n()
const router = useRouter()
const onSuccess = async ({ results }) => {
  console.log(results)
  const updateData = generateData(results)
  await userBatchImport(updateData)
  ElMessage.success({
    message: results.length + i18n.t('msg.excel.importSuccess'),
    type: 'success'
  })
  router.push('/user/manage')
}
</script>

<template>
  <upload-excel :onSuccess="onSuccess"></upload-excel>
</template>

<style lang="scss" scoped></style>
