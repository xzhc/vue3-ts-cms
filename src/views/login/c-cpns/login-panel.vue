<template>
  <div class="login-panel">
    <!-- 顶部的标题-->
    <h1 class="title">Charles后台管理系统</h1>
    <!-- 中间的tabs-->
    <div class="tabs">
      <el-tabs
        type="border-card"
        class="demo-tabs"
        stretch
        v-model="activeName"
      >
        <!--账号登录区域-->
        <el-tab-pane name="account">
          <template #label>
            <div class="label">
              <el-icon>
                <UserFilled />
              </el-icon>
              <span class="text">帐户登录</span>
            </div>
          </template>
          <PaneAccount ref="accountRef" />
        </el-tab-pane>

        <!--手机登录区域-->
        <el-tab-pane name="phone">
          <template #label>
            <div class="label">
              <el-icon>
                <Cellphone />
              </el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <PanePhone />
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--底部区域-->
    <div class="controls">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button
      class="login-btn"
      type="primary"
      size="large"
      @click="handleLoginBtnClick"
    >
      立即登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import PaneAccount from './pane-account.vue'
import PanePhone from './pane-phone.vue'
const activeName = ref('account')
const isRemPwd = ref(false)
const accountRef = ref<InstanceType<typeof PaneAccount>>()
function handleLoginBtnClick() {
  if (activeName.value === 'account') {
    accountRef.value?.loginAction()
  } else {
    console.log('用户在进行手机登录')
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }

  .controls {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    //--el-button-size: 50px;
    margin-top: 15px;
    width: 100%;
  }
}
</style>
