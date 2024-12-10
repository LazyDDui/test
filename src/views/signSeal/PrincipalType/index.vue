<script setup lang="ts">
import {ref} from "vue"

const radio1 = ref('1')
</script>

<template>
  <div>
    <el-radio-group v-model="radio1">
      <el-radio value="1" size="large">个人认证</el-radio>
      <el-radio value="2" size="large">企业认证</el-radio>
    </el-radio-group>
  </div>
</template>

<style scoped lang="scss">

</style>
