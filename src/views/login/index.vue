<script setup>
// 导入组件之后无需注册可直接使用
import { Avatar } from '@element-plus/icons-vue'
// import SvgIcon from '@/components/SvgIcon/index'
import { ref } from 'vue'

const loginForm = ref({
  username: '',
  password: ''
})
</script>

<template>
  <div class="login-container">
    <el-form :model="loginForm" class="login-form">
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>

      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          placeholder="username"
          name="username"
          type="text"
          :prefix-icon="Avatar"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          placeholder="password"
          type="password"
          name="password"
          show-password
        >
          <template #prefix><svg-icon icon="password"></svg-icon> </template>
        </el-input>
      </el-form-item>
      <el-button type="primary" style="width: 100%; margin-bottom: 30px"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    ::v-deep .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep .el-input {
      display: inline-block;
      height: 47px;

      .el-input__wrapper {
        background: transparent;
        box-shadow: none;
        width: 100%;
      }

      input {
        background: transparent;
        appearance: none;
        -webkit-appearance: none;
        border-radius: 0px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }
    }
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>
