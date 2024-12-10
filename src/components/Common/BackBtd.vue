<script setup lang="ts">

import {Back} from "@element-plus/icons-vue";
</script>

<template>
  <el-button class="btn" :icon="Back">
    返回
  </el-button>
</template>

<style scoped lang="scss">
.btn {
  background-color: rgb(226, 243, 255);
  color: #1890FF;
  height: 30px;
  border-radius: 30px;
  border: 1px solid #1890FF;
}
</style>
