<template>
  <div class="user">
    <userSearch />
    <userContent ref="contentRef" @new-click="handleNewClick" />
    <userModal ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import userSearch from './c-cpns/user-search.vue'
import userContent from './c-cpns/user-content.vue'
import userModal from './c-cpns/user-modal.vue'
import { ref } from 'vue'

const contentRef = ref<InstanceType<typeof userContent>>()
const modalRef = ref<InstanceType<typeof userModal>>()
function handleNewClick() {
  modalRef.value?.setModalVisible()
}
</script>

<style lang="less" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
