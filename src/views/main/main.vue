<template>
  <div class="main">
    <h2>main: {{ counterStore.count }} -- {{ counterStore.double }}</h2>
    <button @click="changeCount">修改count</button>
  </div>
</template>

<script setup lang="ts">
import useCounterStore from '@/store/counter'

const counterStore = useCounterStore()

function changeCount() {
  counterStore.changeCounterAction(500)
}
</script>

<style lang="less" scoped>
.main {
  color: red;
}
</style>
