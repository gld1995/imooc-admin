<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue'
import { roleList } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'
import { userRoles, updateRole } from '@/api/user-manage'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['update:modelValue', 'updateRole'])

const i18n = useI18n()
const allRoleList = ref([])
const userRoleTitleList = ref([])

const getListData = async () => {
  allRoleList.value = await roleList()
}

const getUserRoles = async () => {
  const res = await userRoles(props.userId)
  userRoleTitleList.value = res.role.map((item) => item.title)
}

const onConfirm = async () => {
  const roles = userRoleTitleList.value.map((id) =>
    allRoleList.value.find((role) => role.id === id)
  )
  console.log('props.userId', props.userId, userRoleTitleList.value, roles)
  await updateRole(props.userId, roles)

  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  closed()
  emits('updateRole')
}

const closed = () => {
  emits('update:modelValue', false)
}

watch(
  () => props.userId,
  (userId) => userId && getUserRoles()
)

getListData()
watchSwitchLang(getListData)
</script>

<template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed"
  >
    <el-checkbox-group v-model="userRoleTitleList">
      <el-checkbox
        v-for="role in allRoleList"
        :key="role.id"
        :label="role.title"
        :value="role.id"
      />
    </el-checkbox-group>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button type="primary" @click="onConfirm">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
