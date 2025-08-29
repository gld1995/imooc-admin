<script setup>
import { roleList } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'
import DistributePermission from './components/DistributePermission.vue'
import { ref } from 'vue'

const allRoles = ref([])
const selectRoleId = ref('')

const distributePermissionVisible = ref(false)

const onDistributePermissionClick = (row) => {
  selectRoleId.value = row.id
  distributePermissionVisible.value = true
}

const getRoleList = async () => {
  allRoles.value = await roleList()
}
getRoleList()
watchSwitchLang(getRoleList)
</script>

<template>
  <div class="">
    <el-card
      ><el-table :data="allRoles" border style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column
          prop="title"
          :label="$t('msg.role.name')"
        ></el-table-column>
        <el-table-column
          prop="describe"
          :label="$t('msg.role.desc')"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.role.action')"
          prop="action"
          width="260"
        >
          <template #default="{row}">
            <el-button v-permission="['distributePermission']" type="primary" size="mini" @click="onDistributePermissionClick(row)">
              {{ $t('msg.role.assignPermissions') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <distribute-permission
      v-model="distributePermissionVisible"
      :roleId="selectRoleId"
    ></distribute-permission>
  </div>
</template>

<style lang="scss" scoped></style>
