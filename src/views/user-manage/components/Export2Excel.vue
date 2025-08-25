<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { watchSwitchLang } from '@/utils/i18n'
import { getUserManageAllList } from '@/api/user-manage'
import { formatJson, USER_RELATIONS } from './Export2ExcelConstants'

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])

const i18n = useI18n()
const excelName = ref()
const loading = ref(false)
excelName.value = i18n.t('msg.excel.defaultName')

const onConfirm = async () => {
  loading.value = true
  const allUser = (await getUserManageAllList()).list
  console.log('allUser', allUser)
  const excel = await import('@/utils/Export2Excel')
  const data = formatJson(allUser)
  console.log('allUser', allUser, data, excel, USER_RELATIONS)
  // excel.export_json_to_excel({
  //   // excel 表头
  //   header: Object.keys(USER_RELATIONS),
  //   // excel 数据（二维数组结构）
  //   data,
  //   // 文件名称
  //   filename: excelName.value || i18n.t('msg.excel.defaultName'),
  //   // 是否自动列宽
  //   autoWidth: true,
  //   // 文件类型
  //   bookType: 'xlsx'
  // })
  closed()
}

const closed = () => {
  loading.value = false
  emits('update:modelValue', false)
}

watchSwitchLang(() => {
  excelName.value = i18n.t('msg.excel.defaultName')
})
</script>

<template>
  <el-dialog
    :title="$t('msg.excel.title')"
    :model-value="modelValue"
    @close="closed"
    width="30%"
  >
    <el-input
      v-model="excelName"
      :placeholder="$t('msg.excel.placeholder')"
    ></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.excel.close') }}</el-button>
        <el-button type="primary" @click="onConfirm">{{
          $t('msg.excel.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>
