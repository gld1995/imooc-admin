<template>
  <div class="">个人中心</div>
  <div>{{ $t('msg.test') }}</div>

  <el-select
    autocomplete=""
    class="m-2"
    placeholder="Select"
    size="large"
    style="width: 240px"
  >
    <el-option
      v-for="item in []"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
  <el-row>
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </el-row>
</template>

<script setup>
import {} from 'vue'
</script>

<style lang="scss" scoped></style>
