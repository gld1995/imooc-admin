<script setup>
import { ref, onActivated, onMounted } from 'vue'
import { getArticleList, deleteArticle } from '@/api/article'
import { watchSwitchLang } from '@/utils/i18n'
import { tableRef, initSortable } from './sortable'
import { dynamicData, selectDynamicLabel, tableColumns } from './dynamic'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'

const i18n = useI18n()
const router = useRouter()
const tableData = ref([])
const page = ref(1)
const size = ref(10)
const total = ref(0)

const getTableData = async () => {
  const res = await getArticleList({
    page: page.value,
    size: size.value
  })
  tableData.value = res.list
  total.value = res.total
}

const handleSizeChange = (currentSize) => {
  size.value = currentSize
  getTableData()
}

const handleCurrentChange = (currentPage) => {
  page.value = currentPage
  getTableData()
}

const onShow = (row) => router.push(`/article/${row._id}`)
const onRemove = (row) => {
  ElMessageBox.confirm(
    i18n.t('msg.article.dialogTitle1') +
      row.title +
      i18n.t('msg.article.dialogTitle2'),
    {
      type: 'warning'
    }
  ).then(async () => {
    await deleteArticle(row._id)
    ElMessage.success(i18n.t('msg.article.removeSuccess'))
    // 重新渲染数据
    getTableData()
  })
}

getTableData()

onMounted(() => {
  initSortable(tableData, getTableData)
})
// 监听语言切换
watchSwitchLang(getTableData)
// 处理数据不重新加载的问题
onActivated(getTableData)
</script>

<template>
  <div class="article-ranking-container">
    <el-card>
      <div class="dynamic-box">
        <span class="title">{{ $t('msg.article.dynamicTitle') }}</span>
        <el-checkbox-group v-model="selectDynamicLabel">
          <el-checkbox
            v-for="(item, index) in dynamicData"
            :label="item.label"
            :value="item.prop"
            :key="index"
            >{{ item.label }}</el-checkbox
          >
        </el-checkbox-group>
      </div>
      <el-table ref="tableRef" :data="tableData" border style="width: 100%">
        <el-table-column
          v-for="item in tableColumns"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
        >
          <template v-if="item.prop === 'publicDate'" #default="{ row }">{{
            $filters.relativeTime(row.publicDate)
          }}</template>

          <template v-else-if="item.prop === 'action'" #default="{ row }">
            <el-button type="primary" size="mini" @click="onShow(row)">{{
              $t('msg.article.show')
            }}</el-button>
            <el-button type="danger" size="mini" @click="onRemove(row)">{{
              $t('msg.article.remove')
            }}</el-button>
          </template>
        </el-table-column>

        <!-- <el-table-column
          :label="$t('msg.article.ranking')"
          prop="ranking"
        ></el-table-column>
        <el-table-column :label="$t('msg.article.title')" prop="title">
        </el-table-column>
        <el-table-column
          :label="$t('msg.article.author')"
          prop="author"
        ></el-table-column>
        <el-table-column :label="$t('msg.article.publicDate')">
          <template #default="{ row }">{{
            $filters.relativeTime(row.publicDate)
          }}</template>
        </el-table-column>
        <el-table-column
          :label="$t('msg.article.desc')"
          prop="desc"
        ></el-table-column>
        <el-table-column :label="$t('msg.article.action')">
          <template #default="{ row }">
            <el-button type="primary" size="mini" @click="onShow(row)">{{
              $t('msg.article.show')
            }}</el-button>
            <el-button type="danger" size="mini" @click="onRemove(row)">{{
              $t('msg.article.remove')
            }}</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5, 10, 50, 100, 200]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.article-ranking-container {
  .header {
    margin-bottom: 20px;
    .dynamic-box {
      display: flex;
      align-items: center;
      .title {
        margin-right: 20px;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }

  ::v-deep .el-table__row {
    cursor: pointer;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}

::v-deep .sortable-ghost {
  opacity: 0.6;
  color: #fff !important;
  background: #304156 !important;
}
</style>
