<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuIconClick">
      <el-icon size="28px">
        <component :is="isFold ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>

    <div class="content">
      <headerCrumb />
      <headerInfo />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import headerCrumb from './c-cpns/header-crumb.vue'
import headerInfo from './c-cpns/header-info.vue'
//0.内部定义菜单是否折叠的事件
const emit = defineEmits(['foldChange'])

//1.记录菜单是否折叠的状态
const isFold = ref(false)
function handleMenuIconClick() {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}
</script>

<style lang="less" scoped>
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
