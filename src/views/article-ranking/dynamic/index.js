import getDynamicData from './DynamicData'
import { watchSwitchLang } from '@/utils/i18n'
import { watch, ref } from 'vue'

export const dynamicData = ref(getDynamicData())
export const selectDynamicLabel = ref([])
export const tableColumns = ref([])

const initSelectDynamicLabel = () => {
  selectDynamicLabel.value = dynamicData.value.map(item => item.prop)
}
initSelectDynamicLabel()

watchSwitchLang(() => {
  // 重新获取国际化的值
  dynamicData.value = getDynamicData()
  // 重新处理被勾选的列数据
  initSelectDynamicLabel()
})

watch(
  selectDynamicLabel,
  val => {
    tableColumns.value = []
    // 遍历选中项
    const selectData = dynamicData.value.filter(item => {
      return val.includes(item.prop)
    })
    tableColumns.value.push(...selectData)
  },
  {
    immediate: true
  }
)
